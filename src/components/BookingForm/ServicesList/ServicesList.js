import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
} from '@mui/material';
import { formatTimeToString } from '@/utils/formatters';

export default function ServicesList({
  services,
  onServiceSelect,
  selectedServicesIds,
  selectedServiceId,
}) {
  if (services.length === 0) {
    return (
      <Box sx={{
        textAlign: `center`,
        py: 3,
      }}>
        <Typography variant="body1" color="text.secondary">
          Alle Services aus dieser Kategorie wurden bereits ausgewählt.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid item xs={12} key={service.id}>
          <Card
            sx={{
              boxShadow: `none`,
              borderBottom: `1px solid`,
              pb: `16px`,
              borderColor: `grey.300`,
              backgroundColor: `background.alternate`,
              borderRadius: 0,
            }}
          >
            <CardContent sx={{
              p: `0`,

              '&:last-child': { p: `0` },
            }}>
              <Box>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  {service.name}
                </Typography>

                <Box sx={{
                  display: `flex`,
                  gap: 1,
                  mb: 2,
                  flexWrap: `wrap`,
                }}>
                  <Chip
                    label={<>Dauer: <b>{formatTimeToString(service.durationTime)}</b></>}
                    size="small"
                    variant="outlined"
                  />

                  {service.employees && (
                    <Chip
                      label={<>Mitarbeiter: <b>{service.employees.length}</b></>}
                      size="small"
                      variant="outlined"
                    />
                  )}

                  {service.employees && service.employees.length > 0 && (
                    <Chip
                      label={<>Preis: <b>{service.employees[0].price || 0}€</b></>}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Box>

                {service.bookingNote && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.bookingNote}
                  </Typography>
                )}

                <Box sx={{
                  display: `flex`,
                  justifyContent: `space-between`,
                  alignItems: `flex-start`,
                  gap: 2,
                }}>


                  <Button
                    variant={selectedServicesIds.includes(service.id) ? `outlined` : `contained`}
                    size="small"
                    onClick={() => onServiceSelect(service)}
                    sx={{ minWidth: 140 }}
                    disabled={selectedServicesIds.includes(service.id) && selectedServiceId !== service.id}
                  >
                    {selectedServiceId === service.id ?
                      `Ausgewählt` :
                      selectedServicesIds.includes(service.id) ? `Ausgewählt in anderem Service` : `Auswählen`
                    }
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
