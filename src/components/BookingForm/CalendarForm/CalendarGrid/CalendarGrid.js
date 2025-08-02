"use client";

import {
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import CalendarDay from '@/components/BookingForm/CalendarForm/CalendarDay/CalendarDay';
import { formatMonthYear } from '@/utils/formatters';
import 'dayjs/locale/de';

dayjs.locale(`de`);

const weekDays = [`Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`, `So`];

export default function CalendarGrid({
  currentWeekStart,
  calendarDays,
  selectedDay,
  setSelectedDay,
  setSelectedTimeSlot,
  setTimeSlotError,
  onWeekChange,
  fetchCalendarDaysError
}) {
  return (
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
          onClick={() => onWeekChange(-1)}
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
          onClick={() => onWeekChange(1)}
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

      {fetchCalendarDaysError ? (
        <Box>
          <Typography variant="body1" mt={2} color="error">
            {fetchCalendarDaysError}
          </Typography>
        </Box>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(7, 0fr)">
          {Array.from({ length: 7 }).map((_, index) => {
            const day = currentWeekStart.add(index, `day`);
            const isHighlighted = calendarDays.some(({
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
      )}
    </Box>
  );
}
