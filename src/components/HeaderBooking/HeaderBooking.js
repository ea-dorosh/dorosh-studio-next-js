import {
  Box,
  Typography,
} from "@mui/material";

export default function HeaderBooking({
  title,
}) {
  return (
    <Box
      sx={{
        padding: `1.2rem`,
        borderRadius: `12px`,
        border: `1px solid #e0e0e0`,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: `1.4rem !important`,
          fontWeight: `bold`,
          textAlign: `center`,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}