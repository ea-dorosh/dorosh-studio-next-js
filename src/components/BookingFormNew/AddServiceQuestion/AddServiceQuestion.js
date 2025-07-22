import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';

export default function AddServiceQuestion({ onYes, onNo }) {
  return (
    <Card sx={{
      mb: 3,
      border: '1px solid',
      borderColor: 'grey.300',
    }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Möchten Sie noch einen Service hinzufügen?
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={onNo}
            sx={{ minWidth: 120 }}
          >
            Nein
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={onYes}
            sx={{ minWidth: 120 }}
          >
            Ja
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}