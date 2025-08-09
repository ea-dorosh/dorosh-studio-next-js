import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function AddServiceQuestion({ onAddService }) {
  return (
    <Box sx={{
      display: `flex`,
      gap: 2,
      justifyContent: `flex-start`,
      alignItems: `center`,
      mt: 2,
    }}>
      <Button
        variant="outlined"
        size="small"
        onClick={onAddService}
        color="success"
        endIcon={<AddIcon />}
        sx={{
          borderRadius: `9999px`,
          px: 2,
          py: 0.5,
          backgroundColor: `rgba(0, 171, 85, 0.04)`,
        }}
      >
        Service hinzufügen?
      </Button>
    </Box>
  );
}
