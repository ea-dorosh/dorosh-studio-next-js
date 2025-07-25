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
  // State для отслеживания открытых селектов
  const [openSelects, setOpenSelects] = useState({});

  // Инициализируем выбор мастеров для всех сервисов
  useEffect(() => {
    if (services.length > 0) {
      setServiceEmployees(prevServiceEmployees => {
        const newServiceEmployees = { ...prevServiceEmployees };
        let hasChanges = false;

        services.forEach(service => {
          if (!newServiceEmployees[service?.id] || newServiceEmployees[service?.id]?.length === 0) {
            // По умолчанию выбираем "Alle Mitarbeiter" (специальное значение "all")
            newServiceEmployees[service?.id] = ['all'];
            hasChanges = true;
          }
        });

        // Если были изменения, уведомляем родительский компонент
        if (hasChanges && onEmployeesChange) {
          const allSelectedEmployees = [];
          Object.entries(newServiceEmployees).forEach(([sId, employees]) => {
            const svc = services.find(s => s.id === parseInt(sId));
            if (!svc) return;

            if (employees.includes('all')) {
              // Если выбран "all", добавляем всех сотрудников этого сервиса
              svc.employees.forEach(emp => {
                if (!allSelectedEmployees.includes(emp.id)) {
                  allSelectedEmployees.push(emp.id);
                }
              });
            }
          });
          onEmployeesChange(allSelectedEmployees);
        }

        return hasChanges ? newServiceEmployees : prevServiceEmployees;
      });
    }
  }, [services, onEmployeesChange]);

  // Создаем payload для API запроса
  const createServicesPayload = () => {
    const payload = services?.map(service => {
      const selectedEmployees = serviceEmployees[service?.id] || ['all'];

      // Если выбран "all", используем всех сотрудников
      const employeeIds = selectedEmployees.includes('all') || selectedEmployees.length === 0
        ? service?.employees?.map(emp => emp.id)
        : selectedEmployees.filter(id => id !== 'all').map(id => parseInt(id));

      return {
        serviceId: service.id,
        employeeIds
      };
    });

    console.log('createServicesPayload - serviceEmployees:', serviceEmployees);
    console.log('createServicesPayload - payload:', payload);

    return payload;
  };

  const fetchCalendarDays = async (date, servicesPayloadOverride = null) => {
    setError(null);
    setIsCalendarDaysLoading(true);

    try {
      if (services?.length === 0) return [];

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
      console.log(`fetchData`);

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

  // Проверяем, открыт ли какой-то селект
  const isAnySelectOpen = Object.values(openSelects).some(Boolean);

  // Update calendar when employees selection changes, но только если селекты закрыты
  useEffect(() => {
    async function updateCalendar() {
      console.log(`updateCalendar`);
      if (services.length === 0 || isAnySelectOpen) return;

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
  }, [serviceEmployees, isAnySelectOpen]);

  const handleWeekChange = async (direction) => {
    console.log(`handleWeekChange`);

    const newStart = currentWeekStart.add(direction, `week`);
    setCurrentWeekStart(newStart);
    setCalendarDays([]);
    setSelectedDay(null);

    // При смене недели всегда обновляем календарь, независимо от состояния селектов
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

    // Если выбрано "all", показываем "Alle Mitarbeiter"
    if (selectedEmployees.includes('all')) {
      return 'Alle Mitarbeiter';
    }

    // Фильтруем только реальных сотрудников (исключаем 'all')
    const realEmployees = selectedEmployees.filter(id => id !== 'all');

    if (realEmployees.length === 0) {
      return 'Mitarbeiter auswählen';
    }
    if (realEmployees.length === 1) {
      const selectedEmployee = service.employees.find(emp => emp.id.toString() === realEmployees[0].toString());
      return selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : 'Mitarbeiter';
    }
    if (realEmployees.length > 1) {
      const selectedNames = realEmployees.map(empId => {
        const emp = service.employees.find(e => e.id.toString() === empId.toString());
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

    const previousValues = serviceEmployees[serviceId] || [];

    // Определяем, что было добавлено или убрано
    const newValue = selectedValues.find(val => !previousValues.includes(val));
    const removedValue = previousValues.find(val => !selectedValues.includes(val));

    let finalSelection = [...selectedValues];

    // Если выбрали "all"
    if (newValue === 'all') {
      finalSelection = ['all'];
    }
    // Если убрали "all"
    else if (removedValue === 'all') {
      finalSelection = selectedValues.filter(val => val !== 'all');
    }
    // Если выбрали конкретного сотрудника и был выбран "all"
    else if (newValue && newValue !== 'all' && previousValues.includes('all')) {
      finalSelection = [newValue];
    }
    else {
      // Убираем 'all' если выбираем отдельных сотрудников
      finalSelection = selectedValues.filter(val => val !== 'all');
    }

    // Обновляем выбор для конкретного сервиса
    const newServiceEmployees = { ...serviceEmployees };
    newServiceEmployees[serviceId] = finalSelection;
    setServiceEmployees(newServiceEmployees);

    // Уведомляем родительский компонент о всех выбранных сотрудниках
    if (onEmployeesChange) {
      const allSelectedEmployees = [];
      Object.entries(newServiceEmployees).forEach(([sId, employees]) => {
        const svc = services.find(s => s.id === parseInt(sId));
        if (!svc) return;

        if (employees.includes('all')) {
          // Если выбран "all", добавляем всех сотрудников этого сервиса
          svc.employees.forEach(emp => {
            if (!allSelectedEmployees.includes(emp.id)) {
              allSelectedEmployees.push(emp.id);
            }
          });
        } else {
          // Иначе добавляем только выбранных
          employees.forEach(empId => {
            const numId = parseInt(empId);
            if (empId !== 'all' && !allSelectedEmployees.includes(numId)) {
              allSelectedEmployees.push(numId);
            }
          });
        }
      });
      onEmployeesChange(allSelectedEmployees);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
        Datum und Zeit auswählen
      </Typography>

      {/* Employee Selection for each service */}
      {services.map((service) => {
        if (!service) return null;

        return (
          <Box key={service.id} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              {service.name}
            </Typography>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Mitarbeiter</InputLabel>

              <Select
                multiple
                value={(serviceEmployees[service.id] || []).map(id => id.toString())}
                onChange={(event) => handleEmployeeSelectionChange(service.id, event)}
                onOpen={() => setOpenSelects(prev => ({ ...prev, [service.id]: true }))}
                onClose={() => setOpenSelects(prev => ({ ...prev, [service.id]: false }))}
                renderValue={() => getEmployeeLabel(service)}
                label="Mitarbeiter"
              >
                {/* Опция "Alle Mitarbeiter" */}
                <MenuItem key="all" value="all">
                  <Checkbox checked={(serviceEmployees[service.id] || []).includes('all')} />
                  <ListItemText primary="Alle Mitarbeiter" />
                </MenuItem>

                {/* Отдельные сотрудники для этого сервиса */}
                {service.employees.map((employee) => {
                  const currentSelection = serviceEmployees[service.id] || [];
                  const isAllSelected = currentSelection.includes('all');
                  const isIndividuallySelected = currentSelection.includes(employee.id.toString()) || currentSelection.includes(employee.id);

                  return (
                    <MenuItem key={employee.id} value={employee.id.toString()}>
                      <Checkbox checked={!isAllSelected && isIndividuallySelected} />
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

        {error ? <Box>
          <Typography variant="body1" mt={2} color="error">
            {error}
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