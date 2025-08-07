"use client";

import {
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import TimeSlotButton from '@/components/BookingForm/CalendarForm/TimeSlotButton/TimeSlotButton';
import { MOCK_TIME_SLOTS } from '@/components/BookingForm/CalendarForm/TimeSlotSection/mockTimeSlots';
import 'dayjs/locale/de';

dayjs.locale(`de`);

export default function TimeSlotSection({
  selectedDay,
  selectedTimeSlot,
  setSelectedTimeSlot,
  setTimeSlotError,
}) {
  if (!selectedDay) {
    return null;
  }

  const dateText = dayjs(selectedDay?.day)?.isSame(dayjs(), `day`)
    ? `Heute, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
    : dayjs(selectedDay?.day)?.isSame(dayjs().add(1, `day`), `day`)
      ? `Morgen, am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)},`
      : `Am ${dayjs(selectedDay?.day)?.format(`D. MMMM`)}`;

  if (selectedDay.availableTimeslots.length > 0) {
    return (
      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
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
      </Box>
    );
  }

  // Если нет доступных временных слотов
  return (
    <>
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
    </>
  );
}
