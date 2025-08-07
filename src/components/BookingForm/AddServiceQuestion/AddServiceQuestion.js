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
      justifyContent: `flex-end`,
      alignItems: `center`,
      mt: 1, 
    }}>
      <Button
        variant="outlined"
        size="small"
        onClick={onAddService}
        color="success"
        endIcon={<AddIcon />}
        sx={{ textTransform: `uppercase` }}
      >
        Service hinzufügen?
      </Button>
    </Box>
  );
}