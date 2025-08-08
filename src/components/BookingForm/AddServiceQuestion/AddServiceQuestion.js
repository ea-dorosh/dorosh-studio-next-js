import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
} from '@mui/material';

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
      >
        Service hinzufügen?
      </Button>
    </Box>
  );
}
