import {
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState, forwardRef } from "react";

const CustomerForm = forwardRef(function CustomerForm({
  createAppointment,
  formErrors,
}, ref) {
  const [formData, setFormData] = useState({
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

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createAppointment({
      ...formData,
    });
  };

  return (<Box ref={ref} mt={3} mb={3}>
      <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '1.5rem', fontFamily: `cormorantGaramond`}}>
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
      <FormControl error={Boolean(formErrors?.firstName)}>
        <Typography variant="selectLabel">
          Vorname
        </Typography>
        <TextField
          value={formData.firstName}
          variant="outlined"
          name="firstName"
          onChange={handleChange}
          error={Boolean(formErrors?.firstName)}
        />
        {formErrors?.firstName &&
          <FormHelperText>
            {formErrors.firstName}
          </FormHelperText>
        }
      </FormControl>

      <FormControl error={Boolean(formErrors?.lastName)}>
        <Typography variant="selectLabel">
          Nachname
        </Typography>
        <TextField
          value={formData.lastName}
          variant="outlined"
          name="lastName"
          onChange={handleChange}
          error={Boolean(formErrors?.lastName)}
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
        <Typography variant="selectLabel">
          Telefon
        </Typography>
        <TextField
          value={formData.phone}
          variant="outlined"
          name="phone"
          type="tel"
          placeholder="+49 111 111 11111"
          onChange={handleChange}
          error={Boolean(formErrors?.phone)}
        />
        {formErrors?.phone &&
            <FormHelperText>
              {formErrors.phone}
            </FormHelperText>
        }
      </FormControl>

      <FormControl error={Boolean(formErrors?.email)}>
        <Typography variant="selectLabel">
          E-Mail
        </Typography>
        <TextField
          value={formData.email}
          variant="outlined"
          name="email"
          type="email"
          onChange={handleChange}
          error={Boolean(formErrors?.email)}
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
        size="large"
        onClick={handleSubmit}
        sx={{
          paddingTop: `12px`,
          paddingBottom: `12px`,
          mt: 2,
        }}
      >
        Termin Buchen
      </Button>
    </Box>
  </Box>
  );
});

export default CustomerForm;
