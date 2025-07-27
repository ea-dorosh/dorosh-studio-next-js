import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/de';

dayjs.locale(`de`);

const CalendarOverview = forwardRef(function CalendarOverview({
  services = [],
  selectedDay,
  selectedTimeSlot,
  onChange,
}, ref) {
  const theme = useTheme();

  const getDateText = () => {
    if (!selectedDay?.day) return `Kein Datum ausgewählt`;

    const dayObj = dayjs(selectedDay.day);

    if (dayObj.isSame(dayjs(), `day`)) {
      return `Heute, ${dayObj.format(`D. MMMM YYYY`)}`;
    } else if (dayObj.isSame(dayjs().add(1, `day`), `day`)) {
      return `Morgen, ${dayObj.format(`D. MMMM YYYY`)}`;
    } else {
      return dayObj.format(`dddd, D. MMMM YYYY`);
    }
  };

  const getTimeText = () => {
    if (!selectedTimeSlot?.startTime) return `Keine Zeit ausgewählt`;
    return selectedTimeSlot.startTime;
  };

  const getTotalDuration = () => {
    if (!services.length) return 0;
    return services.reduce((total, service) => total + (service.durationTime || 0), 0);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}min`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}min`;
    }
  };

  const getTotalPrice = () => {
    if (!services.length) return 0;
    return services.reduce((total, service) => {
      const price = service.employees?.[0]?.price || 0;
      return total + price;
    }, 0);
  };

  return (
    <Card sx={{
      mb: 2,
      border: 'none',
      boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
      borderRadius: '12px',
      backgroundColor: `background.default`,
      scrollMarginTop: '100px',
    }} ref={ref}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'text.primary', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Gewählter Termin
          </Typography>

          {onChange && (
            <Button
              onClick={onChange}
              sx={{ fontWeight: 'bold', p: 0, minWidth: '0' }}
              size="small"
              color="success"
            >
              ändern
            </Button>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.primary', fontSize: '1rem' }}>
            <b>Datum:</b> {getDateText()}
          </Typography>

          <Typography variant="body1" sx={{ mb: 1, color: 'text.primary', fontSize: '1rem' }}>
            <b>Uhrzeit:</b> {getTimeText()}
          </Typography>
        </Box>

        {services.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.primary', fontSize: '1rem', fontWeight: 'bold' }}>
              Gewählte Services:
            </Typography>

            {services.map((service, index) => (
              <Typography key={index} variant="body2" sx={{ ml: 1, mb: 0.5, color: 'text.secondary' }}>
                • {service.name}
              </Typography>
            ))}
          </Box>
        )}

        <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
          {services.length > 0 && (
            <Chip
              label={<>Services: <b>{services.length}</b></>}
              size="small"
              variant="outlined"
            />
          )}

          {getTotalDuration() > 0 && (
            <Chip
              label={<>Gesamtdauer: <b>{formatDuration(getTotalDuration())}</b></>}
              size="small"
              variant="outlined"
            />
          )}

          {getTotalPrice() > 0 && (
            <Chip
              label={<>Gesamtpreis: <b>{getTotalPrice()}€</b></>}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default CalendarOverview;