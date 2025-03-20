"use client";

import {
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import {
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay';
import { MOCK_TIME_SLOTS } from './mockTimeSlots';
import TimeSlotButton from './TimeSlotButton';
import 'dayjs/locale/de';

dayjs.locale(`de`);

const initialValue = dayjs(new Date());

const weekDays = [`Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`, `So`];

async function fetchTimeSlots(date, serviceId, employees) {
  const apiUrl = `${process.env.REACT_APP_API_URL}api/public/calendar?date=${date.format(`YYYY-MM-DD`)}&serviceId=${serviceId}&employeeIds=${employees.join(`,`)}`;

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
  service,
  employees,
  selectedDay,
  setSelectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  onNextStepClick,
}) {
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    selectedDay?.day ? dayjs(selectedDay.day).startOf(`week`) : initialValue.startOf(`week`)
  );

  const fetchHighlightedDays = (date) => {
    fetchTimeSlots(date, service.id, employees)
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchHighlightedDays(currentWeekStart);

    /** set today as selected day */
    if (!selectedDay?.day) {
      setSelectedDay({
        day: initialValue.format(`YYYY-MM-DD`),
        availableTimeslots: [],
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWeekChange = (direction) => {
    const newStart = currentWeekStart.add(direction, `week`);
    setCurrentWeekStart(newStart);
    setHighlightedDays([]);
    fetchHighlightedDays(newStart);
  };

  const dateText = dayjs(selectedDay?.day)?.isSame(dayjs(), `day`)
    ? `Heute, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
    : dayjs(selectedDay?.day)?.isSame(dayjs().add(1, `day`), `day`)
      ? `Morgen, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
      : `Am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)}`;

  return (
    <Box>
      <Typography
        variant="formSubtitle"
      >
        Wählen Sie Datum und Uhrzeit
      </Typography>
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

        <Box display="grid" gridTemplateColumns="repeat(7, 0fr)" mt={1}>
          {Array.from({ length: 7 }).map((_, index) => {
            const day = currentWeekStart.add(index, `day`);

            const isHighlighted = highlightedDays.some(({
              day: highlightedDay,
              availableTimeslots,
            }) =>
              highlightedDay === day.format(`YYYY-MM-DD`) && availableTimeslots.some((timeslot) => !timeslot.disabled)
            );

            return (
              <CalendarDay
                key={day.toString()}
                day={day}
                isHighlighted={isHighlighted}
                selectedDay={selectedDay}
                onClick={(clickedDay) => {
                  const foundDay = highlightedDays.find(
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

      </Box>

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
