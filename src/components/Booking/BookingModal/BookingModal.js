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
} from "@mui/material";
import { useTheme } from "@mui/material";
import { forwardRef } from "react";
import { useState, useMemo } from "react";
import FORM_STEPS from "./formSteps";
import ServiceOverview from "./Services/ServiceOverview";
import ServicesList from "./Services/ServicesList";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookingModal({ open, handleClose, category, services }) {
  const theme = useTheme();

  // state
  const [selectedService, setSelectedService] = useState(null);
  const [formStep, setFormStep] = useState(FORM_STEPS.SERVICES);

  //computed
  const filteredServices = services.filter(
    (service) => service.categoryId === category.id
  );

  const hasServices = useMemo(() => formStep === FORM_STEPS.SERVICES, [formStep]);
  const hasServiceOverview = useMemo(() => formStep > FORM_STEPS.SERVICES && formStep < FORM_STEPS.FINISH, [formStep]);

  // methods
  const onSelectServiceClick = (service) => {
    setSelectedService(service);
    setFormStep(FORM_STEPS.EMPLOYEES);
  }

  const onChangeServiceClick = () => {
    setSelectedService(null);
    // setSelectedEmployeeFromTimeSlotAvailability(null);
    // setSelectedEmployeeIds([]);

    setFormStep(FORM_STEPS.SERVICES);
  }

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
        <Toolbar sx={{ justifyContent: `flex-start`}}>
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

        {hasServices && <ServicesList 
          services={filteredServices}
          theme={theme}
          selectService={onSelectServiceClick}
        />}

        {hasServiceOverview && <ServiceOverview
          service={selectedService}
          changeService={onChangeServiceClick}
        />}

      </Box>
    </Dialog>
  );
}
