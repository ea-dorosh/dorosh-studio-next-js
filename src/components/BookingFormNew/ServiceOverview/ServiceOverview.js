import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { formatTimeToString } from "@/utils/formatters";

export default function ServiceOverview({ service, onRemove, onChange, selectedServices }) {
  return (
    <Card sx={{
      mb: 2,
      border: 'none',
      boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.1)`,
      borderRadius: '12px',
      backgroundColor: `background.default`,
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <Button
            onClick={onChange}
            sx={{ ml: 1.5, fontWeight: 'bold', p: 0, minWidth: '0' }}
            size="small"
            color="success"
          >
            ändern
          </Button>

          {selectedServices.length > 1 && <Button
            onClick={onRemove}
            sx={{ ml: 1.5, fontWeight: 'bold', p: 0, minWidth: '0' }}
            size="small"
            color="error"
          >
            entfernen
          </Button>}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1, color: 'text.primary',fontSize: '1.1rem' }}>
            {service.categoryName}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, color: 'text.primary', fontSize: '1.1rem' }}>
            {service.subCategoryName}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1, color: 'text.primary', fontSize: '1rem', fontWeight: 'bold' }}>
            {service.name}
          </Typography>

          <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
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
        </Box>

      </CardContent>
    </Card>
  );
}
