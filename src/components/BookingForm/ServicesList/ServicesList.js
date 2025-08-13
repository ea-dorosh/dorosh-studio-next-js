import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { formatTimeToString } from '@/utils/formatters';

export default function ServicesList({
  services,
  onServiceSelect,
  selectedServicesIds,
  selectedServiceId,
}) {
  if (services.length === 0) {
    return (
      <Box
        sx={{
          textAlign: `center`,
          py: 3,
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
        >
          Alle Services aus dieser Kategorie wurden bereits ausgewählt.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={2}
    >
      {services.map((service) => (
        <Grid
          item
          xs={12}
          key={service.id}
          sx={{
            '&:last-child .MuiCard-root': { borderBottom: `none` },
          }}
        >
          <Card
            sx={{
              boxShadow: `none`,
              borderBottom: `1px solid`,
              pb: `16px`,
              borderColor: `grey.300`,
              backgroundColor: `transparent`,
              borderRadius: 0,

            }}
          >
            <CardContent
              sx={{
                p: `0`,

                '&:last-child': { p: `0` },
              }}
            >
              <Box>

                <Typography
                  // variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    letterSpacing: `.01em`,
                    fontSize: `1.2rem`,
                  }}
                >
                  {service.name}
                </Typography>

                <Box
                  sx={{
                    display: `flex`,
                    gap: 1,
                    mb: 2,
                    flexWrap: `wrap`,
                  }}
                >
                  <Chip
                    label={<>Dauer: <b>{formatTimeToString(service.durationTime)}</b></>}
                    size="medium"
                    variant="filled"
                    sx={{
                      borderRadius: `9999px`,
                      color: `text.primary`,
                    }}
                  />

                  {service.employees && service.employees.length > 0 && (
                    <Chip
                      label={<>Preis: <b>{service.employees[0].price || 0}€</b></>}
                      size="medium"
                      variant="filled"
                      sx={{
                        borderRadius: `9999px`,
                        color: `primary.main`,
                      }}
                    />
                  )}
                </Box>

                {service.bookingNote && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {service.bookingNote}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `flex-start`,
                    gap: 2,
                  }}
                >


                  <Button
                    variant={selectedServicesIds.includes(service.id) ? `outlined` : `contained`}
                    size="medium"
                    onClick={() => onServiceSelect(service)}
                    sx={{ minWidth: 180 }}
                    disabled={selectedServicesIds.includes(service.id) && selectedServiceId !== service.id}
                  >
                    {selectedServiceId === service.id ?
                      `Ausgewählt` :
                      selectedServicesIds.includes(service.id) ? `Ausgewählt` : `Auswählen`
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
