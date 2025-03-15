import {
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function CustomerForm({
  createAppointment,
  formErrors,
}) {
  const [formData, setFormData] = useState({
    salutation: null,
    firstName: ``,
    lastName: ``,
    phone: ``,
    email: ``,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if(formErrors && formErrors[name]) {
      delete formErrors[name];
    }

    if (name === `salutation`) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createAppointment({
      ...formData,
    });
  };

  return (<Box>
    <Typography
      variant="formSubtitle"
    >
      Kundendetails
    </Typography>

    <Box
      sx={{
        display: `flex`,
        flexDirection: `column`,
        width: `100%`,
        gap: 2.5,
        mt: 2,
      }}
    >
      <FormControl error={Boolean(formErrors?.salutation)}>
        <Box sx={{
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          gap: 3,
        }}>
          <FormLabel 
            id="salutation-group-label"
            sx={{ mr: 4 }}
          >
            Anrede
          </FormLabel>

          <RadioGroup
            row
            name="salutation"
            value={formData.salutation}
            onChange={handleChange}
          >
            <FormControlLabel value={1} control={<Radio color="info" />} label="Frau"  />
            <FormControlLabel value={0} control={<Radio color="info"/>} label="Herr" />
          </RadioGroup>
        </Box>

        {formErrors?.salutation && 
          <FormHelperText>
            {formErrors.salutation}
          </FormHelperText>
        }
      </FormControl>
    
      <FormControl error={Boolean(formErrors?.firstName)}>
        <TextField
          value={formData.firstName}
          label="Vorname"
          variant="outlined"
          name="firstName"
          onChange={handleChange}
        />
        {formErrors?.firstName && 
          <FormHelperText>
            {formErrors.firstName}
          </FormHelperText>
        }
      </FormControl>

      <FormControl error={Boolean(formErrors?.lastName)}>
        <TextField
          value={formData.lastName}
          label="Nachname"
          variant="outlined"
          name="lastName"
          onChange={handleChange}
        />
        {formErrors?.lastName && 
            <FormHelperText>
              {formErrors.lastName}
            </FormHelperText>
        }
      </FormControl>

      <FormControl
        error={Boolean(formErrors?.phone)}
      >
        <TextField
          value={formData.phone}
          label="Telefon"
          variant="outlined"
          name="phone"
          type="tel"
          placeholder="+49 111 111 11111"
          onChange={handleChange}
        />
        {formErrors?.phone && 
            <FormHelperText>
              {formErrors.phone}
            </FormHelperText>
        }
      </FormControl>

      <FormControl error={Boolean(formErrors?.email)}>
        <TextField
          value={formData.email}
          label="E-Mail"
          variant="outlined"
          name="email"
          type="email"
          onChange={handleChange}
        />
        {formErrors?.email && 
          <FormHelperText>
            {formErrors.email}
          </FormHelperText>
        }
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Termin Buchen
      </Button>
    </Box>
  </Box>
  );
}
