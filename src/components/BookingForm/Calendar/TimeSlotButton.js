import { Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { formattedTime } from '@/utils/formatters';

export default function TimeSlotButton({ slot, selectedTimeSlot, setSelectedTimeSlot }) {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      size="medium"
      onClick={() => setSelectedTimeSlot(slot)}
      disabled={slot.disabled}
      sx={{
        backgroundColor: `${
          slot.startTime === selectedTimeSlot?.startTime
            ? alpha(theme.palette.info.main, 0.2)
            : 'initial'
        } !important`,
        borderColor: `${slot.disabled ? 'lightgrey' : theme.palette.info.main} !important`,
        fontSize: '1rem',
        fontWeight: 'bold',
        height: '40px',
        backgroundImage: slot.disabled
          ? `linear-gradient(to bottom left, transparent calc(50% - 1px), #e3e3e3 calc(50% - 1px), #e3e3e3 calc(50% + 1px), transparent calc(50% + 1px)),
             linear-gradient(to bottom right, transparent calc(50% - 1px), #e3e3e3 calc(50% - 1px), #e3e3e3 calc(50% + 1px), transparent calc(50% + 1px))`
          : 'none',
      }}
    >
      {formattedTime(slot.startTime)}
    </Button>
  );
}