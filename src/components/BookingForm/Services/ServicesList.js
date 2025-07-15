"use client";

import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  formatTimeToString,
  formatPrice,
} from "@/utils/formatters";

export default function ServicesList({ services, theme, selectService }) {

  return (
    <>
      {services.map((service) => (
        <Box
          key={service.id}
          sx={{
            pb: 3,
            pt: 3,
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            borderTop: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: `1.3rem`,
              textAlign: `left`,
            }}
          >
            {service.name}
          </Typography>

          <Typography variant="body1" mt={1}>
            {service.bookingNote}
          </Typography>

          <Typography variant="body1" mt={1}>
            {formatTimeToString(service.durationTime)}
          </Typography>

          <Typography
            variant="caption"
            mt={1}
            sx={{display: `block`}}
          >
            {formatPrice(service.employees[0].price)}
          </Typography>

          <Button
            variant="contained"
            color="info"
            sx={{
              width: `200px`,
              mt: 2,
            }}
            onClick={() => selectService(service)}
          >
            Buchen
          </Button>
        </Box>
      ))}
    </>
  );
}
