"use client";

import {
  Badge,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { formattedTime } from '@/utils/formatters';
import 'dayjs/locale/de';

dayjs.locale('de');

const initialValue = dayjs(new Date());

function ServerDay({ highlightedDays, day, onClick }) {
  const isHighlighted = highlightedDays.some(({ day: highlightedDay }) =>
    day.format('YYYY-MM-DD') === dayjs(highlightedDay).format('YYYY-MM-DD')
  );

  const isSelected = isHighlighted; // Для выделенного дня

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '●' : undefined}
    >
      <Button
        variant="text"
        onClick={() => isHighlighted && onClick(day)}
        disabled={!isHighlighted}
        sx={{
          minWidth: `34px`,
          width: `34px`,
          // height: '100%',
          padding: 0,
          margin: 0,
          borderRadius: 0,
          backgroundColor: isSelected ? 'lightblue' : 'transparent',
          borderColor: isSelected ? 'blue' : 'grey',
        }}
      >
        {day.date()}
      </Button>
    </Badge>
  );
}

async function fetchTimeSlots(date, serviceId, employees) {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar?date=${date.format('YYYY-MM-DD')}&serviceId=${serviceId}&employeeIds=${employees.join(',')}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return { daysToHighlight: data };
}

const formatMonthYear = (start) => {
  const end = start.add(6, 'days');
  const startMonth = start.format('MMMM YYYY');
  const endMonth = end.format('MMMM YYYY');

  // Check if the months are different
  if (start.month() === end.month()) {
    return startMonth; // Same month
  } else {
    // Return the abbreviated months and the year
    return `${start.format('MMM')}-${end.format('MMM')} ${start.year()}`;
  }
};

export default function CalendarForm({
  service,
  employees,
  setSelectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(initialValue.startOf('week'));

  const fetchHighlightedDays = (date) => {
    fetchTimeSlots(date, service.id, employees)
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setAvailableTimeSlots([]);
    fetchHighlightedDays(currentWeekStart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, currentWeekStart]);

  const handleWeekChange = (direction) => {
    setIsLoading(true);
    const newStart = currentWeekStart.add(direction, 'week');
    setCurrentWeekStart(newStart);
    setHighlightedDays([]);
    setAvailableTimeSlots([]);
    fetchHighlightedDays(newStart);
  };

  return (
    <Box>
      <Typography
        variant="formSubtitle"
        color="textSecondary"
      >
        Wählen Sie Datum und Uhrzeit
      </Typography>
      
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button onClick={() => handleWeekChange(-1)}>Vorherige Woche</Button>
          <Typography variant="h6">
            {formatMonthYear(currentWeekStart)}
          </Typography>
          <Button onClick={() => handleWeekChange(1)}>Nächste Woche</Button>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mt={2}>
          {Array.from({ length: 7 }).map((_, index) => {
            const day = currentWeekStart.add(index, 'day');
            return (
              <ServerDay
                key={day.toString()}
                day={day}
                highlightedDays={highlightedDays}
                onClick={(day) => {
                  const highlightedDay = highlightedDays.find(({ day: highlightedDay }) => highlightedDay === day.format(`YYYY-MM-DD`));
                  setAvailableTimeSlots(highlightedDay.availableTimeslots);
                  setSelectedDay(highlightedDay);
                }}
              />
            );
          })}
        </Box>
      </LocalizationProvider>

      {!selectedTimeSlot && availableTimeSlots.length > 0 && <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '200px',
        gap: '10px',
      }}>
        {availableTimeSlots.map(slot => (
          <Button 
            key={slot.startTime}
            variant="outlined"
            onClick={() => setSelectedTimeSlot(slot)}
            disabled={slot.disabled}
            sx={{
              backgroundColor: slot.notActive ? `lightgrey` : `initial`,
            }}
          >
            {formattedTime(slot.startTime)}
          </Button>
        ))}
      </Box>}

      {availableTimeSlots.length === 0 && <Box>
        No available time slots
      </Box>}
    </Box>
  );
}
