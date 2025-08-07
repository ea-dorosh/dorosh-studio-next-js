import { Badge, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CalendarDay({
  isHighlighted, day, onClick, selectedDay, 
}) {
  const theme = useTheme();
  const isSelected = selectedDay?.day === day.format(`YYYY-MM-DD`);

  return (
    <Badge
      overlap="circular"
      badgeContent={isHighlighted ? `●` : undefined}
      sx={{
        '& .MuiBadge-badge': {
          padding: 0,
          width: `100%`,
          transform: `none`,
          top: `-1px`,
          left: 0,
          transition: `none`,
          color: isSelected ? `info.contrastText` : `info.main`,
        },
      }}
    >
      <Button
        variant="text"
        onClick={() => onClick(day)}
        sx={{
          minWidth: `36px`,
          width: `38px`,
          height: `44px`,
          margin: 0,
          padding: `20px 0 8px 0`,
          borderRadius: 0,
          color: isHighlighted
            ? isSelected
              ? `info.contrastText`
              : `info.main`
            : isSelected
              ? `info.contrastText`
              : `gray`,
          backgroundColor: `${isSelected ? theme.palette.info.main : `initial`} !important`,
        }}
      >
        {day.date()}
      </Button>
    </Badge>
  );
}