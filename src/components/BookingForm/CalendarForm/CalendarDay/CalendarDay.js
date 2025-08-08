import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CalendarDay({
  isHighlighted, day, onClick, selectedDay,
}) {
  const theme = useTheme();
  const isSelected = selectedDay?.day === day.format(`YYYY-MM-DD`);

  return (
    <Box sx={{ textAlign: `center` }}>
      <Button
        variant="text"
        onClick={() => onClick(day)}
        sx={{
          minWidth: `40px`,
          width: `42px`,
          height: `46px`,
          margin: 0,
          padding: `20px 0 6px 0`,
          borderRadius: 0,
          color: isHighlighted
            ? isSelected
              ? `info.contrastText`
              : `info.main`
            : isSelected
              ? `info.contrastText`
              : `gray`,
          backgroundColor: `${isSelected ? theme.palette.info.main : `initial`} !important`,
          '&:hover': {
            backgroundColor: `${isSelected ? theme.palette.info.main : `rgba(0,0,0,0.04)`} !important`,
          },
        }}
      >
        {day.date()}
      </Button>

      <Box
        sx={{
          width: `6px`,
          height: `6px`,
          borderRadius: `50%`,
          backgroundColor: isHighlighted ? `info.main` : `transparent`,
          margin: `2px auto 0`,
        }}
      />
    </Box>
  );
}
