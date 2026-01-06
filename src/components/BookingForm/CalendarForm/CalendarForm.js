"use client";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useEffect, useState, forwardRef, useRef } from 'react';
import CalendarGrid from './CalendarGrid/CalendarGrid';
import EmployeeSelector from './EmployeeSelector/EmployeeSelector';
import TimeSlotSection from './TimeSlotSection/TimeSlotSection';
import TimeSlotSkeleton from './TimeSlotSkeleton/TimeSlotSkeleton';
import calendarService from '@/services/calendar.service';
import 'dayjs/locale/de';

dayjs.locale(`de`);

// initial value for the calendar is today
const initialValue = dayjs(new Date());

const CalendarForm = forwardRef(function CalendarForm({
  services,
  selectedDay,
  setSelectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  serviceEmployees,
  setServiceEmployees,
  hideEmployeeSelector = false,
  onNextStep,
}, ref) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [isCalendarDaysLoading, setIsCalendarDaysLoading] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    selectedDay?.day ? dayjs(selectedDay.day).startOf(`week`) : initialValue.startOf(`week`)
  );
  const [fetchCalendarDaysError, setFetchCalendarDaysError] = useState(null);
  const [timeSlotError, setTimeSlotError] = useState(null);
  const [openSelects, setOpenSelects] = useState({});
  const [shimmerSlotCount, setShimmerSlotCount] = useState(12);
  const previousPayloadRef = useRef(null);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (services.length > 0) {
      const newServiceEmployees = { ...serviceEmployees };
      let hasChanges = false;

      services.forEach(service => {
        const currentSelection = newServiceEmployees[service?.id] || [];

        const needsInit = currentSelection.length === 0;
        const needsCorrection = service?.employees?.length === 1 && currentSelection.includes(`all`);

        if (needsInit || needsCorrection) {
          if (service?.employees?.length === 1) {
            newServiceEmployees[service?.id] = [service.employees[0].id.toString()];
          } else {
            newServiceEmployees[service?.id] = [`all`];
          }
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setServiceEmployees(newServiceEmployees);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, setServiceEmployees]);

  const createServicesPayload = () => {
    const payload = services?.map(service => {
      const selectedEmployees = serviceEmployees[service?.id] || [`all`];

      const employeeIds = selectedEmployees.includes(`all`) || selectedEmployees.length === 0
        ? service?.employees?.map(emp => emp.id)
        : selectedEmployees.filter(id => id !== `all`).map(id => parseInt(id));

      return {
        serviceId: service.id,
        employeeIds: employeeIds.sort(), // Sort for consistent comparison
      };
    });

    return payload;
  };

  const isPayloadChanged = (newPayload, previousPayload) => {
    if (!previousPayload) return true;

    if (newPayload.length !== previousPayload.length) return true;

    return JSON.stringify(newPayload) !== JSON.stringify(previousPayload);
  };

  const fetchCalendarDays = async (date, servicesPayloadOverride = null) => {
    setFetchCalendarDaysError(null);
    setIsCalendarDaysLoading(true);

    try {
      if (services?.length === 0) return [];

      const payload = servicesPayloadOverride || createServicesPayload();
      if (payload.length === 0) return [];

      const { daysToHighlight } = await calendarService.fetchTimeSlots(date, payload);

      return daysToHighlight;
    } catch (error) {
      console.error(error);
      setFetchCalendarDaysError(`Es ist ein Fehler aufgetreten, bitte versuchen Sie es später noch einmal`);
    } finally {
      setIsCalendarDaysLoading(false);
    }
  };

  const isAnySelectOpen = Object.values(openSelects).some(Boolean);
  const areEmployeesInitialized = services.length > 0 && services.every(service => {
    const selected = serviceEmployees[service.id];
    return selected && selected.length > 0;
  });

  useEffect(() => {
    async function updateCalendar() {
      if (services.length === 0 || isAnySelectOpen || !areEmployeesInitialized) return;

      const currentPayload = createServicesPayload();

      // Only fetch if payload has changed
      if (!isPayloadChanged(currentPayload, previousPayloadRef.current)) {
        return;
      }

      previousPayloadRef.current = JSON.parse(JSON.stringify(currentPayload)); // Deep copy

      // Reset selected time slot when payload changes to prevent using outdated slot data
      // BUT only if we don't have a valid selectedTimeSlot that matches current payload
      if (selectedTimeSlot) {
        // Check if current selectedTimeSlot is still valid for the new payload
        const matchingService = currentPayload.find(p => p.serviceId === selectedTimeSlot.serviceId);
        if (!matchingService || !selectedTimeSlot.employeeIds?.every(id => matchingService.employeeIds.includes(id))) {
          setSelectedTimeSlot(null);
        }
      }

      // Reset first load flag when services/employees change so auto-next-week works again
      isFirstLoadRef.current = true;

      // Save current selected day before clearing
      const previousSelectedDay = selectedDay?.day;

      // Save current timeslots count for shimmer before clearing
      setShimmerSlotCount(selectedDay?.availableTimeslots?.length || 12);

      // Clear selected day to hide old time slots during loading
      setSelectedDay(null);

      const daysToHighlight = await fetchCalendarDays(currentWeekStart);

      // If first load and no available days, try next week
      if (isFirstLoadRef.current && (!daysToHighlight || daysToHighlight.length === 0)) {
        isFirstLoadRef.current = false;
        handleWeekChange(1);
        return;
      }

      isFirstLoadRef.current = false;
      setCalendarDays(daysToHighlight || []);

      // Restore selected day after loading
      if (daysToHighlight && daysToHighlight.length > 0) {
        // Try to find the previously selected day
        const previousDayStillAvailable = previousSelectedDay
          ? daysToHighlight.find(d => d.day === previousSelectedDay)
          : null;

        if (previousDayStillAvailable) {
          // Restore the same day with updated timeslots
          setSelectedDay(previousDayStillAvailable);
        } else {
          // Select first available day
          const firstAvailable = daysToHighlight[0];
          setSelectedDay(firstAvailable);
        }
      }
    }

    updateCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, serviceEmployees, isAnySelectOpen]);

  // Update selectedDay when calendarDays change to ensure it has the latest timeslot data
  useEffect(() => {
    if (calendarDays.length > 0) {
      setSelectedDay(prevSelectedDay => {
        if (prevSelectedDay) {
          const updatedDay = calendarDays.find(day => day.day === prevSelectedDay.day);
          if (updatedDay && JSON.stringify(updatedDay) !== JSON.stringify(prevSelectedDay)) {
            return updatedDay;
          }
        }
        return prevSelectedDay;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDays]);

  const handleWeekChange = async (direction) => {
    const newStart = currentWeekStart.add(direction, `week`);
    setCurrentWeekStart(newStart);
    setCalendarDays([]);
    setShimmerSlotCount(selectedDay?.availableTimeslots?.length || 12);
    setSelectedDay(null);
    setSelectedTimeSlot(null);
    setTimeSlotError(null);

    const daysToHighlight = await fetchCalendarDays(newStart);

    setCalendarDays(daysToHighlight || []);

    if (daysToHighlight && daysToHighlight.length > 0) {
      setSelectedDay(daysToHighlight[0]);
    } else {
      const defaultDate = newStart;
      const formattedDate = defaultDate.format(`YYYY-MM-DD`);
      setSelectedDay({
        day: formattedDate,
        availableTimeslots: [],
      });
    }
  };

  return (
    <Box
      ref={ref}
      mt={2}
      sx={{
        display: `flex`,
        flexDirection: `column`,
        // alignItems: `center`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: `center`,
          fontSize: `1.5rem`,
          fontFamily: `cormorantGaramond`,
        }}
      >
        Datum und Zeit auswählen
      </Typography>

      {/* Employee Selection for each service (only if not selected on previous step) */}
      {!hideEmployeeSelector && (
        <EmployeeSelector
          services={services}
          serviceEmployees={serviceEmployees}
          setServiceEmployees={setServiceEmployees}
          openSelects={openSelects}
          setOpenSelects={setOpenSelects}
        />
      )}

      {/* Calendar Grid */}
      <CalendarGrid
        currentWeekStart={currentWeekStart}
        calendarDays={calendarDays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setSelectedTimeSlot={setSelectedTimeSlot}
        setTimeSlotError={setTimeSlotError}
        onWeekChange={handleWeekChange}
        fetchCalendarDaysError={fetchCalendarDaysError}
      />

      {/* Loading skeleton */}
      {isCalendarDaysLoading && (
        <Box sx={{ mt: 2 }}>
          <TimeSlotSkeleton
            count={shimmerSlotCount}
            showDateText={true}
            showButton={false}
          />
        </Box>
      )}

      {/* Time slots section */}
      {!isCalendarDaysLoading && (
        <TimeSlotSection
          selectedDay={selectedDay}
          selectedTimeSlot={selectedTimeSlot}
          setSelectedTimeSlot={setSelectedTimeSlot}
          setTimeSlotError={setTimeSlotError}
        />
      )}

      {/* Error message */}
      {timeSlotError && (
        <Box>
          <Typography
            variant="body1"
            mt={2}
            color="error"
          >
            {timeSlotError}
          </Typography>
        </Box>
      )}

      {/* Next button */}
      <Button
        variant="contained"
        size="medium"
        disabled={isCalendarDaysLoading}
        onClick={() => {
          if (selectedDay && selectedTimeSlot) {
            onNextStep();
          } else {
            setTimeSlotError(`Bitte wählen Sie ein Datum und eine Uhrzeit.`);
          }
        }}
        sx={{
          mt: 2,
          ml: `auto`,
          mr: `auto`,
          width: `300px`,
          maxWidth: `100%`,
        }}
      >
        Weiter
      </Button>
    </Box>
  );
});

export default CalendarForm;
