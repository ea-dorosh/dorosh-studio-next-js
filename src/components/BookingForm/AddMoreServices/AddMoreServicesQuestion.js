import { Box, Typography, Button } from '@mui/material';

export default function AddMoreServicesQuestion({ onYes, onNo }) {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
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
    </Box>
  );
}