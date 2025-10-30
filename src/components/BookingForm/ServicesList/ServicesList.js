import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
          py: 4,
          backgroundColor: `background.alternate`,
          borderRadius: `16px`,
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontStyle: `italic` }}
        >
          Alle Services aus dieser Kategorie wurden bereits ausgewählt.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: `flex`,
        flexDirection: `column`,
        gap: 3,
      }}
    >
      {services.map((service) => (
        <Card
          key={service.id}
          sx={{
            boxShadow: `0 2px 8px rgba(0,0,0,0.05)`,
            border: `1px solid rgba(0,0,0,0.1)`,
            borderRadius: `20px`,
            overflow: `hidden`,
            backgroundColor: `background.paper`,
          }}
        >
          {service.serviceImage && (
            <CardMedia
              component="img"
              height="140"
              image={service.serviceImage}
              alt={service.name}
              sx={{
                objectFit: `cover`,
              }}
            />
          )}
          <CardContent
            sx={{
              p: 2.5,
              '&:last-child': { p: 2.5 },
            }}
          >
            <Typography
              sx={{
                mb: 1,
                fontWeight: 700,
                letterSpacing: `.01em`,
                fontSize: {
                  xs: `1.2rem`,
                  md: `1.4rem`,
                },
              }}
            >
              {service.name}
            </Typography>

            <Box
              sx={{
                display: `flex`,
                justifyContent: `space-between`,
                mb: 1.5,
                color: `text.secondary`,
                fontSize: `0.9rem`,
                fontWeight: 500,
              }}
            >
              <Typography component="span">
                Dauer: <b>{formatTimeToString(service.durationTime)}</b>
              </Typography>
              {service.employees && service.employees.length > 0 && (
                <Typography component="span">
                  Preis: <b>{service.employees[0].price || 0}€</b>
                </Typography>
              )}
            </Box>

            {service.bookingNote && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  lineHeight: 1.6,
                  fontSize: `0.9rem`,
                  fontStyle: `italic`,
                }}
              >
                {service.bookingNote}
              </Typography>
            )}

            <Button
              variant={selectedServicesIds.includes(service.id) ? `outlined` : `contained`}
              color={selectedServicesIds.includes(service.id) ? `success` : `primary`}
              size="medium"
              onClick={() => onServiceSelect(service)}
              sx={{
                borderRadius: `9999px`,
                py: 0.75,
                px: 3,
                fontWeight: 600,
                mt: 1,
                mx: `auto`,
                display: `block`,
                textTransform: `none`,
                minWidth: `140px`,
                ...(selectedServicesIds.includes(service.id) && {
                  backgroundColor: `rgba(0, 171, 85, 0.04)`,
                }),
              }}
              disabled={selectedServicesIds.includes(service.id) && selectedServiceId !== service.id}
            >
              {selectedServiceId === service.id ?
                `Ausgewählt` :
                selectedServicesIds.includes(service.id) ? `Ausgewählt` : `Auswählen`
              }
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
