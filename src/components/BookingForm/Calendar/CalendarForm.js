"use client";

import {
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState, forwardRef, useRef } from 'react';
import CalendarDay from './CalendarDay';
import { MOCK_TIME_SLOTS } from './mockTimeSlots';
import TimeSlotButton from './TimeSlotButton';
import TimeSlotSkeleton from './TimeSlotSkeleton';
import calendarService from '@/services/calendar.service';
import { formatMonthYear } from '@/utils/formatters';
import 'dayjs/locale/de';

dayjs.locale(`de`);

// initial value for the calendar is today
const initialValue = dayjs(new Date());

const weekDays = [`Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`, `So`];

const CalendarForm = forwardRef(function CalendarForm({
  services,
  selectedDay,
  setSelectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  serviceEmployees,
  setServiceEmployees,
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
        const needsCorrection = service?.employees?.length === 1 && currentSelection.includes('all');

        if (needsInit || needsCorrection) {
          if (service?.employees?.length === 1) {
            newServiceEmployees[service?.id] = [service.employees[0].id.toString()];
          } else {
            newServiceEmployees[service?.id] = ['all'];
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
      const selectedEmployees = serviceEmployees[service?.id] || ['all'];

      const employeeIds = selectedEmployees.includes('all') || selectedEmployees.length === 0
        ? service?.employees?.map(emp => emp.id)
        : selectedEmployees.filter(id => id !== 'all').map(id => parseInt(id));

      return {
        serviceId: service.id,
        employeeIds: employeeIds.sort() // Sort for consistent comparison
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

      const daysToHighlight = await fetchCalendarDays(currentWeekStart);

      // If first load and no available days, try next week
      if (isFirstLoadRef.current && (!daysToHighlight || daysToHighlight.length === 0)) {
        isFirstLoadRef.current = false;
        handleWeekChange(1);
        return;
      }

      isFirstLoadRef.current = false;
      setCalendarDays(daysToHighlight || []);

      // Set initial selected day if none is selected
      if (!selectedDay?.day && daysToHighlight && daysToHighlight.length > 0) {
        setSelectedDay(daysToHighlight[0]);
      }
      // Reset selected day if current selection is no longer available
      else if (selectedDay && daysToHighlight) {
        const stillAvailable = daysToHighlight.find(d => d.day === selectedDay.day);
        if (!stillAvailable) {
          setSelectedDay(daysToHighlight.length > 0 ? daysToHighlight[0] : null);
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
        availableTimeslots: []
      });
    }
  };

  const dateText = dayjs(selectedDay?.day)?.isSame(dayjs(), `day`)
    ? `Heute, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
    : dayjs(selectedDay?.day)?.isSame(dayjs().add(1, `day`), `day`)
      ? `Morgen, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
      : `Am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)}`;

  const getEmployeeLabel = (service) => {
    const selectedEmployees = serviceEmployees[service.id] || [];

    if (service.employees.length === 1) {
      const employee = service.employees[0];
      return `${employee.firstName} ${employee.lastName} (${employee.price || 0}€)`;
    }

    if (selectedEmployees.includes('all')) {
      const prices = service.employees.map(emp => emp.price || 0);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (minPrice === maxPrice) {
        return `Alle Mitarbeiter (${minPrice}€)`;
      } else {
        return `Alle Mitarbeiter (${minPrice}€ - ${maxPrice}€)`;
      }
    }

    const realEmployees = selectedEmployees.filter(id => id !== 'all');

    if (realEmployees.length === 0) {
      return 'Mitarbeiter auswählen';
    }
    if (realEmployees.length === 1) {
      const selectedEmployee = service.employees.find(emp => emp.id.toString() === realEmployees[0].toString());
      return selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.price || 0}€)` : 'Mitarbeiter';
    }
    if (realEmployees.length > 1) {
      const selectedEmployeeChips = realEmployees.map(empId => {
        const emp = service.employees.find(e => e.id.toString() === empId.toString());
        if (!emp) return null;

        return (
          <Chip
            key={emp.id}
            label={`${emp.firstName} ${emp.lastName} • ${emp.price || 0}€`}
            size="small"
            variant="outlined"
            sx={{ flex: 1, mr: 0.5, mb: 0.5 }}
          />
        );
      }).filter(chip => chip);

      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedEmployeeChips}
        </Box>
      );
    }
    return 'Mitarbeiter auswählen';
  };

  const handleEmployeeSelectionChange = (serviceId, event) => {
    const selectedValues = event.target.value;
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    if (service.employees.length === 1) {
      const employeeId = service.employees[0].id.toString();

      if (!selectedValues.includes(employeeId)) {
        return;
      }
    }

    const previousValues = serviceEmployees[serviceId] || [];

    const newValue = selectedValues.find(val => !previousValues.includes(val));
    const removedValue = previousValues.find(val => !selectedValues.includes(val));

    let finalSelection = [...selectedValues];

    if (newValue === 'all') {
      finalSelection = ['all'];
    } else if (removedValue === 'all') {
      finalSelection = selectedValues.filter(val => val !== 'all');
    } else if (newValue && newValue !== 'all' && previousValues.includes('all')) {
      finalSelection = [newValue];
    } else {
      finalSelection = selectedValues.filter(val => val !== 'all');
    }

    const newServiceEmployees = { ...serviceEmployees };
    newServiceEmployees[serviceId] = finalSelection;
    setServiceEmployees(newServiceEmployees);
  };

  return (
    <Box ref={ref} mt={2}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '1.5rem', fontFamily: `cormorantGaramond`}}>
        Datum und Zeit auswählen
      </Typography>

      {/* Employee Selection for each service */}
      {services.map((service) => {
        if (!service) return null;

        return (
          <Box key={service.id} sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {service.name}
            </Typography>

            <Typography variant="selectLabel">
              Mitarbeiter
            </Typography>

            <FormControl fullWidth variant="outlined">
              <Select
                multiple
                value={(() => {
                  const currentSelection = serviceEmployees[service.id] || [];

                  if (service.employees.length === 1) {
                    return currentSelection.filter(id => id !== 'all').map(id => id.toString());
                  }

                  return currentSelection.map(id => id.toString());
                })()}
                onChange={(event) => handleEmployeeSelectionChange(service.id, event)}
                onOpen={() => setOpenSelects(prev => ({ ...prev, [service.id]: true }))}
                onClose={() => setOpenSelects(prev => ({ ...prev, [service.id]: false }))}
                renderValue={() => getEmployeeLabel(service)}
              >
                {service.employees.length > 1 && (
                  <MenuItem key="all" value="all">
                    <Checkbox checked={(serviceEmployees[service.id] || []).includes('all')} />
                    <ListItemText primary="Alle Mitarbeiter" />
                  </MenuItem>
                )}

                {service.employees.map((employee) => {
                  const currentSelection = serviceEmployees[service.id] || [];
                  const isAllSelected = currentSelection.includes('all');
                  const isIndividuallySelected = currentSelection.includes(employee.id.toString()) || currentSelection.includes(employee.id);
                  const isSingleEmployee = service.employees.length === 1;

                  return (
                    <MenuItem key={employee.id} value={employee.id.toString()}>
                      {isSingleEmployee ? (
                        <Checkbox
                          checked={true}
                          disabled={true}
                        />
                      ) : (
                        <Checkbox checked={!isAllSelected && isIndividuallySelected} />
                      )}
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <span>{`${employee.firstName} ${employee.lastName}`}</span>
                            <Chip
                              label={`${employee.price || 0}€`}
                              size="small"
                              variant="outlined"
                              sx={{
                                ml: 1,
                                backgroundColor: `#f0f0f0`,
                                borderColor: `#f0f0f0`,
                              }}
                            />
                          </Box>
                        }
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )})}

      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          width: `266px`,
          margin: `auto`,
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <IconButton
            size="large"
            color="info"
            sx={{
              padding: `6px`,
              minWidth: `auto`,
            }}
            disabled={currentWeekStart.isSame(dayjs(), `week`)}
            onClick={() => handleWeekChange(-1)}
          >
            <ArrowBackIos />
          </IconButton>

          <Typography variant="h6">
            {formatMonthYear(currentWeekStart)}
          </Typography>

          <IconButton
            size="large"
            color="info"
            sx={{
              padding: `6px`,
              minWidth: `auto`,
            }}
            onClick={() => handleWeekChange(1)}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(7, 0fr)">
          {weekDays.map((day, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                width: `38px`,
                height: `36px`,
                fontSize: `1.1rem`,
              }}>
              {day}
            </Typography>
          ))}
        </Box>

        {fetchCalendarDaysError ? <Box>
          <Typography variant="body1" mt={2} color="error">
            {fetchCalendarDaysError}
          </Typography>
        </Box> :
          <Box display="grid" gridTemplateColumns="repeat(7, 0fr)">
            {Array.from({ length: 7 }).map((_, index) => {
              const day = currentWeekStart.add(index, `day`);
              const isHighlighted = calendarDays.some(({
                day: highlightedDay,
                availableTimeslots,
              }) =>
                // TODO: remove disabled logic
                highlightedDay === day.format(`YYYY-MM-DD`) && availableTimeslots.some((timeslot) => !timeslot.disabled)
              );

              return (
                <CalendarDay
                  key={day.toString()}
                  day={day}
                  isHighlighted={isHighlighted}
                  selectedDay={selectedDay}
                  onClick={(clickedDay) => {
                    const foundDay = calendarDays.find(
                      ({ day: highlightedDay }) => highlightedDay === clickedDay.format(`YYYY-MM-DD`)
                    );

                    if (foundDay) {
                      setSelectedDay(foundDay);
                    } else {
                      setSelectedDay({
                        day: clickedDay.format(`YYYY-MM-DD`),
                        availableTimeslots: [],
                      });
                    }

                    setSelectedTimeSlot(null);
                    setTimeSlotError(null);
                  }}
                />
              );
            })}
          </Box>
        }
      </Box>

      {isCalendarDaysLoading && (
        <Box sx={{ mt: 2 }}>
          <TimeSlotSkeleton count={shimmerSlotCount} showDateText={true} showButton={false} />
        </Box>
      )}

      {selectedDay && selectedDay.availableTimeslots.length > 0 && <Box
        sx={{
          display:`flex`,
          flexDirection:`column`,
        }}
        mt={2}
      >
        <Box>
          {selectedDay.availableTimeslots.some(timeslot => !timeslot.disabled) ? (
            <span><b>{dateText}</b> folgende Termine sind verfügbar</span>
          ) : (
            <span><b>{dateText}</b> gibt es keine verfügbaren Zeiten. Bitte wählen Sie ein anderes Datum.</span>
          )}
        </Box>

        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(3, 1fr)`,
            width: `100%`,
            gap: `10px`,
            mt: 2,
          }}
        >
          {selectedDay.availableTimeslots.map(slot => (
            <TimeSlotButton
              key={slot.startTime}
              slot={slot}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={(slot) => {
                setSelectedTimeSlot(slot);
                setTimeSlotError(null);
              }}
            />
          ))}
        </Box>
      </Box>}

      {selectedDay && selectedDay.availableTimeslots.length === 0 && <>
        <Box mt={2}>
          <b>{dateText}</b> gibt es keine verfügbaren Zeiten. <br />
        Bitte wählen Sie ein anderes Datum.
        </Box>

        <Box
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(3, 1fr)`,
            width: `100%`,
            gap: `10px`,
            mt: 2,
          }}
        >
          {MOCK_TIME_SLOTS.map(slot => (
            <TimeSlotButton
              key={slot.startTime}
              slot={slot}
              selectedTimeSlot={null}
              setSelectedTimeSlot={() => {}}
            />
          ))}
        </Box>
      </>}

      {timeSlotError && (
        <Box>
          <Typography variant="body1" mt={2} color="error">
            {timeSlotError}
          </Typography>
        </Box>
      )}

      <Button
        variant="contained"
        size="large"
        color="info"
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
          width: `100%`,
        }}
      >
        Weiter
      </Button>
    </Box>
  );
});

export default CalendarForm;
