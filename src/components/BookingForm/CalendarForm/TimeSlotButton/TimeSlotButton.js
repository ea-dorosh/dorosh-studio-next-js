import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
            ? theme.palette.primary.main
            : slot.disabled ? theme.palette.primary.contrastText : theme.palette.background.default
        } !important`,
        borderColor: `${slot.disabled ? 'lightgrey' : 'rgba(0, 0, 0, 0.2)'} !important`,
        fontSize: '1rem',
        color: `${
          slot.disabled ? `#c0c0c0` :slot.startTime === selectedTimeSlot?.startTime
            ? theme.palette.primary.contrastText
            : theme.palette.primary.main
        } !important`,
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
