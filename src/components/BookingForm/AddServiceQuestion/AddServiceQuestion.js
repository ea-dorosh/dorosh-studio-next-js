import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';

export default function AddServiceQuestion({ onAddService }) {
  return (
    <Box sx={{
      mt: 1,
    }}>
      <Box sx={{ textAlign: 'center', p: 0, }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography sx={{ color: 'success.main' }}>
            Service hinzufügen?
          </Typography>

          <IconButton
            variant="outlined"
            size="small"
            onClick={onAddService}
            color="success"
            sx={{ borderRadius: '50%', border: '1px solid', width: 40, height: 40, }}
          >
            <AddIcon fontSize='inherit' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}