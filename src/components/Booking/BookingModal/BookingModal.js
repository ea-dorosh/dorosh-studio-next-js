"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
  CardMedia,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";
import { formatTimeToString } from "@/utils/formatters";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookingModal({ open, handleClose, category, services }) {
  const filteredServices = services.filter(
    (service) => service.categoryId === category.id
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: `transparent`,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: `-56px` }}>
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          {category.name}
        </Typography>

        {filteredServices.map((service) => (
          <Box key={service.id} sx={{ mb: 2 }}>
            <Typography variant="h6">{service.name}</Typography>
            <Typography variant="body1">{service.bookingNote}</Typography>
            <Typography variant="body2">
              {formatTimeToString(service.durationTime)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}
