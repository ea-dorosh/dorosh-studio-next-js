"use client";

import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  IconButton,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { forwardRef } from "react";
import { 
  formatTimeToString,
  formatPrice,
} from "@/utils/formatters";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookingModal({ open, handleClose, category, services }) {
  const filteredServices = services.filter(
    (service) => service.categoryId === category.id
  );

  const theme = useTheme();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: `background.white`,
        }
      }}
    >
      <AppBar
        sx={{
          position: `relative`,
          backgroundColor: `transparent`,
        }}
      >
        <Toolbar sx={{
          justifyContent: `flex-start`,
        }}>
          <IconButton
            edge="start"
            color="primary"
            bgcolor="background.main"
            onClick={handleClose}
            aria-label="close"
            size="large"
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: `-56px` }}>
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            width: `100%`,
            height: `250px`,
            objectFit: `cover`,
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h2" gutterBottom mb={4}>
          {category.name}
        </Typography>

        {filteredServices.map((service, index) => (
          <Box 
            key={service.id} 
            sx={{ 
              pb: 3,
              pt: 3,
              backgroundColor: `background.white`,
              borderBottom: index !== filteredServices.length - 1 && `1px solid ${theme.palette.primary.main}`,
              borderTop: index === 0 && `1px solid ${theme.palette.primary.main}`,
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
              {formatPrice(service.employeePrices[0].price)}
            </Typography>

            <Button
              variant="contained"
              color="info"
              sx={{
                width: `200px`,
                mt: 2,
              }}
            >
              Buchen
            </Button>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}
