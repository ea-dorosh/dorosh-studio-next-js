import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
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
              border: `1px solid`,
              borderColor: (theme) => alpha(theme.palette.common.black, 0.08),
              backgroundColor: `background.alternate`,
              borderRadius: `16px`,

            }}
          >
            <CardContent
              sx={{
                p: 2,
                '&:last-child': { p: 2 },
              }}
            >
              <Box>

                <Typography
                  sx={{
                    mb: 1.25,
                    fontWeight: 800,
                    letterSpacing: `.01em`,
                    fontSize: {
                      xs: `1rem`,
                      md: `1.4rem`,
                    },
                  }}
                >
                  {service.name}
                </Typography>

                <Box
                  sx={{
                    display: `flex`,
                    gap: 1,
                    mb: service.bookingNote ? 1.5 : 2,
                    flexWrap: `wrap`,
                  }}
                >
                  <Chip
                    label={<>Dauer: <b>{formatTimeToString(service.durationTime)}</b></>}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: `9999px`,
                      px: 1,
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                      borderColor: (theme) => alpha(theme.palette.primary.main, 0.25),
                      color: `text.primary`,
                    }}
                  />

                  {service.employees && service.employees.length > 0 && (
                    <Chip
                      label={<>Preis: <b>{service.employees[0].price || 0}€</b></>}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: `9999px`,
                        px: 1,
                        backgroundColor: (theme) => alpha(theme.palette.success.main, 0.06),
                        borderColor: (theme) => alpha(theme.palette.success.main, 0.25),
                        color: `primary.main`,
                      }}
                    />
                  )}
                </Box>

                {service.bookingNote && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {service.bookingNote}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    alignItems: `center`,
                    gap: 2,
                  }}
                >


                  <Button
                    variant={selectedServicesIds.includes(service.id) ? `outlined` : `contained`}
                    size="small"
                    onClick={() => onServiceSelect(service)}
                    sx={{
                      width: {
                        xs: `100%`,
                        sm: `auto`,
                      },
                    }}
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
