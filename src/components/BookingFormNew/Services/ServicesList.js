import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
} from "@mui/material";

export default function ServicesList({ services, onServiceSelect }) {
  if (services.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
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
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'grey.300',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 2,
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {service.name}
                  </Typography>

                  {service.bookingNote && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {service.bookingNote}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={`Dauer: ${service.durationTime}`}
                      size="small"
                      variant="outlined"
                    />

                    {service.employees && service.employees.length > 0 && (
                      <Chip
                        label={`Preis: ${service.employees[0].price || 0}€`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}

                    {service.employees && (
                      <Chip
                        label={`Mitarbeiter: ${service.employees.length}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  {service.employees && service.employees.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Verfügbare Mitarbeiter: {service.employees.map(emp =>
                        `${emp.firstName} ${emp.lastName}`
                      ).join(', ')}
                    </Typography>
                  )}
                </Box>

                <Button
                  variant="contained"
                  onClick={() => onServiceSelect(service)}
                  sx={{ minWidth: 120 }}
                >
                  Auswählen
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}