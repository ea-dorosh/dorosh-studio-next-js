"use client";

import {
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay';
import { MOCK_TIME_SLOTS } from './mockTimeSlots';
import TimeSlotButton from './TimeSlotButton';
import 'dayjs/locale/de';

dayjs.locale(`de`);

// initial value for the calendar is tomorrow
const initialValue = dayjs(new Date()).add(1, `day`);

const weekDays = [`Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`, `So`];

async function fetchTimeSlots(date, servicesWithEmployees) {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar?date=${date.format(`YYYY-MM-DD`)}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(servicesWithEmployees),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return { daysToHighlight: data };
}

const formatMonthYear = (start) => {
  const end = start.add(6, `days`);
  const startMonth = start.format(`MMMM YYYY`);

  // Check if the months are different
  if (start.month() === end.month()) {
    return startMonth; // Same month
  } else {
    // Return the abbreviated months and the year
    return `${start.format(`MMM`)}-${end.format(`MMM`)} ${start.year()}`;
  }
};

export default function CalendarForm({
  services,
  onEmployeesChange,
  selectedDay,
  setSelectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  onNextStepClick
}) {
  const [calendarDays, setCalendarDays] = useState([]);
  const [isCalendarDaysLoading, setIsCalendarDaysLoading] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    selectedDay?.day ? dayjs(selectedDay.day).startOf(`week`) : initialValue.startOf(`week`)
  );
  const [error, setError] = useState(null);
  // State для селектов: объект где ключ - ID сервиса, значение - выбранные мастера
  const [serviceEmployees, setServiceEmployees] = useState({});

  // Инициализируем выбор мастеров для всех сервисов
  useEffect(() => {
    if (services.length > 0) {
      setServiceEmployees(prevServiceEmployees => {
        const newServiceEmployees = { ...prevServiceEmployees };
        let hasChanges = false;

        services.forEach(service => {
          if (!newServiceEmployees[service.id] || newServiceEmployees[service.id].length === 0) {
            // По умолчанию выбираем всех мастеров именно для этого сервиса
            newServiceEmployees[service.id] = service.employees.map(emp => emp.id);
            hasChanges = true;
          }
        });

        return hasChanges ? newServiceEmployees : prevServiceEmployees;
      });
    }
  }, [services]);

  // Создаем payload для API запроса
  const createServicesPayload = () => {
    const payload = services.map(service => ({
      serviceId: service.id,
      employeeIds: serviceEmployees[service.id] || service.employees.map(emp => emp.id)
    }));

    console.log('createServicesPayload - serviceEmployees:', serviceEmployees);
    console.log('createServicesPayload - payload:', payload);

    return payload;
  };

  const fetchCalendarDays = async (date, servicesPayloadOverride = null) => {
    setError(null);
    setIsCalendarDaysLoading(true);

    try {
      if (services.length === 0) return [];

      const payload = servicesPayloadOverride || createServicesPayload();
      if (payload.length === 0) return [];

      const { daysToHighlight } = await fetchTimeSlots(date, payload);
      return daysToHighlight;
    } catch (error) {
      console.error(error);
      setError(`Es ist ein Fehler aufgetreten, bitte versuchen Sie es später noch einmal`);
    } finally {
      setIsCalendarDaysLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (services.length === 0) return;

      const daysToHighlight = await fetchCalendarDays(currentWeekStart);
      setCalendarDays(daysToHighlight || []);

      if (!selectedDay?.day && daysToHighlight && daysToHighlight.length > 0) {
        setSelectedDay(daysToHighlight[0]);
      }
    }

    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  // Update calendar when employees selection changes
  useEffect(() => {
    async function updateCalendar() {
      if (services.length === 0) return;

      const daysToHighlight = await fetchCalendarDays(currentWeekStart);
      setCalendarDays(daysToHighlight || []);

      // Reset selected day if current selection is no longer available
      if (selectedDay && daysToHighlight) {
        const stillAvailable = daysToHighlight.find(d => d.day === selectedDay.day);
        if (!stillAvailable) {
          setSelectedDay(daysToHighlight.length > 0 ? daysToHighlight[0] : null);
        }
      }
    }
    updateCalendar();
  }, [serviceEmployees]);

  const handleWeekChange = async (direction) => {
    const newStart = currentWeekStart.add(direction, `week`);
    setCurrentWeekStart(newStart);
    setCalendarDays([]);
    setSelectedDay(null);

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

  // Helper functions for employee selection for specific service
  const getEmployeeLabel = (service) => {
    const selectedEmployees = serviceEmployees[service.id] || [];

    if (selectedEmployees.length === service.employees.length) {
      return 'Alle Mitarbeiter';
    }
    if (selectedEmployees.length === 1) {
      const selectedEmployee = service.employees.find(emp => emp.id === selectedEmployees[0]);
      return selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : 'Mitarbeiter';
    }
    if (selectedEmployees.length > 1) {
      const selectedNames = selectedEmployees.map(empId => {
        const emp = service.employees.find(e => e.id === empId);
        return emp ? `${emp.firstName} ${emp.lastName}` : '';
      }).filter(name => name).join(', ');
      return selectedNames;
    }
    return 'Mitarbeiter auswählen';
  };

  const handleEmployeeSelectionChange = (serviceId, event) => {
    const selectedValues = event.target.value;
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    // Обновляем выбор для конкретного сервиса
    const newServiceEmployees = { ...serviceEmployees };
    newServiceEmployees[serviceId] = selectedValues.map(id => parseInt(id));
    setServiceEmployees(newServiceEmployees);

    // Уведомляем родительский компонент о всех выбранных сотрудниках
    if (onEmployeesChange) {
      const allSelectedEmployees = [];
      Object.values(newServiceEmployees).forEach(employees => {
        employees.forEach(empId => {
          if (!allSelectedEmployees.includes(empId)) {
            allSelectedEmployees.push(empId);
          }
        });
      });
      onEmployeesChange(allSelectedEmployees);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Datum und Zeit auswählen
      </Typography>

      {/* Employee Selection for each service */}
      {services.map((service) => (
        <Box key={service.id} sx={{ mb: 3, mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Mitarbeiter für: {service.name}
          </Typography>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Mitarbeiter</InputLabel>
            <Select
              multiple
              value={(serviceEmployees[service.id] || []).map(id => id.toString())}
              onChange={(event) => handleEmployeeSelectionChange(service.id, event)}
              renderValue={() => getEmployeeLabel(service)}
              label="Mitarbeiter"
            >
              {/* Отдельные сотрудники для этого сервиса */}
              {service.employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id.toString()}>
                  <Checkbox checked={(serviceEmployees[service.id] || []).includes(employee.id)} />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>{`${employee.firstName} ${employee.lastName}`}</span>
                        <Chip
                          label={`${employee.price || 0}€`}
                          size="small"
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    }
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}

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

        <Box display="grid" gridTemplateColumns="repeat(7, 0fr)" mt={1}>
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

        {error ? <Box>
          <Typography variant="body1" mt={2} color="error">
            {error}
          </Typography>
        </Box> :
          <Box display="grid" gridTemplateColumns="repeat(7, 0fr)" mt={1}>
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
                  }}
                />
              );
            })}
          </Box>
        }
      </Box>

      {isCalendarDaysLoading && <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress color="info" />
      </Box>}

      {selectedDay && selectedDay.availableTimeslots.length > 0 && <Box
        sx={{
          display:`flex`,
          flexDirection:`column`,
        }}
        mt={3}
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
              setSelectedTimeSlot={setSelectedTimeSlot}
            />
          ))}
        </Box>

        {onNextStepClick && (
          <Button
            variant="contained"
            color="info"
            size="medium"
            onClick={onNextStepClick}
            sx={{
              margin: `auto`,
              mt: 2,
            }}
          >
            Weiter
          </Button>
        )}
      </Box>}

      {selectedDay && selectedDay.availableTimeslots.length === 0 && <>
        <Box mt={3}>
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
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
            />
          ))}
        </Box>
      </>}
    </Box>
  );
}