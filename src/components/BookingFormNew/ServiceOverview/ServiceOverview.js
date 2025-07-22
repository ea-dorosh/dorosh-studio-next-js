import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";

export default function ServiceOverview({ service, serviceNumber, onRemove }) {
  return (
    <Card sx={{
      mb: 2,
      border: '1px solid',
      borderColor: 'grey.300',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Service {serviceNumber} - Ausgewählt
            </Typography>

            <Box sx={{ mb: 1 }}>
              <Chip
                label={service.categoryName || "Kategorie"}
                size="small"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip
                label={service.subCategoryName || "Unterkategorie"}
                size="small"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            </Box>

            <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
              {service.name}
            </Typography>

            {service.bookingNote && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {service.bookingNote}
              </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography variant="body2">
                <strong>Dauer:</strong> {service.durationTime}
              </Typography>

              {service.employees && service.employees.length > 0 && (
                <Typography variant="body2">
                  <strong>Preis:</strong> {service.employees[0].price || 0}€
                </Typography>
              )}
            </Box>
          </Box>

          <IconButton
            onClick={onRemove}
            color="error"
            sx={{ ml: 2 }}
            title="Service entfernen"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}