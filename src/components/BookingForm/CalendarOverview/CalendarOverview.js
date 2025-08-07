import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import { forwardRef } from 'react';
import 'dayjs/locale/de';
import { formattedTime } from '@/utils/formatters';

dayjs.locale(`de`);

const CalendarOverview = forwardRef(function CalendarOverview({
  services = [],
  selectedDay,
  selectedTimeSlot,
  onChange,
}, ref) {
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
    return formattedTime(selectedTimeSlot.startTime);
  };

  const parseTimeToMinutes = (timeString) => {
    if (!timeString) return 0;

    // Parse "HH:MM:SS" format to minutes
    const parts = timeString.split(`:`);
    if (parts.length !== 3) return 0;

    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseInt(parts[2]) || 0;

    return hours * 60 + minutes + Math.round(seconds / 60);
  };

  const getTotalDuration = () => {
    if (!services.length) return 0;
    return services.reduce((total, service) => {
      const duration = parseTimeToMinutes(service.durationTime);
      return total + duration;
    }, 0);
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

  const getServicePriceInfo = (service) => {
    if (!service.employees?.length) {
      return {
        min: 0,
        max: 0,
        isRange: false, 
      };
    }

    // Filter employees based on selectedTimeSlot.employeeIds if available
    let filteredEmployees = service.employees;

    if (selectedTimeSlot?.employeeIds?.length > 0) {
      // Filter employees that are in the selectedTimeSlot.employeeIds
      filteredEmployees = service.employees.filter(emp =>
        selectedTimeSlot.employeeIds.includes(emp.id)
      );

      // If no employees match (edge case), fall back to all employees
      if (filteredEmployees.length === 0) {
        filteredEmployees = service.employees;
      }
    }

    const prices = filteredEmployees.map(emp => emp.price || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      min: minPrice,
      max: maxPrice,
      isRange: minPrice !== maxPrice,
    };
  };

  const getTotalPriceInfo = () => {
    if (!services.length) return {
      min: 0,
      max: 0,
      isRange: false, 
    };

    let totalMin = 0;
    let totalMax = 0;
    let hasRange = false;

    services.forEach(service => {
      const priceInfo = getServicePriceInfo(service);
      totalMin += priceInfo.min;
      totalMax += priceInfo.max;
      if (priceInfo.isRange) hasRange = true;
    });

    return {
      min: totalMin,
      max: totalMax,
      isRange: hasRange || totalMin !== totalMax,
    };
  };

  const formatPrice = (priceInfo) => {
    if (priceInfo.isRange) {
      return `${priceInfo.min}€ - ${priceInfo.max}€`;
    }
    return `${priceInfo.min}€`;
  };

  return (
    <Card sx={{
      mb: 2,
      border: `none`,
      boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
      borderRadius: `12px`,
      backgroundColor: `background.default`,
      scrollMarginTop: `100px`,
    }} ref={ref}>
      <CardContent>
        <Box sx={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `flex-start`,
          mb: 2, 
        }}>
          <Typography variant="h6" sx={{
            color: `text.primary`,
            fontSize: `1.1rem`,
            fontWeight: `bold`, 
          }}>
            Gewählter Termin
          </Typography>

          {onChange && (
            <Button
              onClick={onChange}
              sx={{
                fontWeight: `bold`,
                p: 0,
                minWidth: `0`, 
              }}
              size="small"
              color="success"
            >
              ändern
            </Button>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{
            mb: 1,
            color: `text.primary`,
            fontSize: `1rem`, 
          }}>
            <b>Datum:</b> {getDateText()}
          </Typography>

          <Typography variant="body1" sx={{
            mb: 1,
            color: `text.primary`,
            fontSize: `1rem`, 
          }}>
            <b>Uhrzeit:</b> {getTimeText()}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{
            mb: 1,
            color: `text.primary`,
            fontSize: `1rem`,
            fontWeight: `bold`, 
          }}>
            Gewählte Services: ({services.length})
          </Typography>

          {services.length === 0 ? (
            <Typography variant="body2" sx={{
              color: `text.secondary`,
              ml: 1, 
            }}>
              Keine Services ausgewählt
            </Typography>
          ) : (
            services.map((service, index) => {
              const priceInfo = getServicePriceInfo(service);
              return (
                <Box key={index} sx={{
                  ml: 1,
                  mb: 0.5,
                  display: `flex`,
                  justifyContent: `space-between`,
                  alignItems: `flex-start`,
                  gap: 2, 
                }}>
                  <Typography variant="body2" sx={{ color: `text.secondary` }}>
                    {service.name || `Unnamed Service`}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: `text.primary`,
                    fontWeight: `bold`,
                    whiteSpace: `nowrap`, 
                  }}>
                    {formatPrice(priceInfo)}
                  </Typography>
                </Box>
              );
            })
          )}
        </Box>

        <Box sx={{
          gap: 1,
          display: `flex`,
          flexWrap: `wrap`, 
        }}>
          <Chip
            label={<>Services: <b>{services.length}</b></>}
            size="small"
            variant="outlined"
          />

          <Chip
            label={<>Gesamtdauer: <b>{formatDuration(getTotalDuration())}</b></>}
            size="small"
            variant="outlined"
          />

          <Chip
            label={<>Gesamtpreis: <b>{formatPrice(getTotalPriceInfo())}</b></>}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
});

export default CalendarOverview;
