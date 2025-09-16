/* eslint-disable no-extra-boolean-cast */
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Link,
  TextField,
} from '@mui/material';
import { useState, forwardRef } from 'react';

const CustomerForm = forwardRef(function CustomerForm({
  createAppointment,
  formErrors,
}, ref) {
  const [formData, setFormData] = useState({
    firstName: ``,
    lastName: ``,
    phone: ``,
    email: ``,
    orderMessage: ``,
    consentPrivacy: false,
    consentMarketing: false,
  });

  const handleChange = (event) => {
    const {
      name, value,
    } = event.target;

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

    createAppointment({ ...formData });
  };

  return (
    <Box
      ref={ref}
      mt={2}
      mb={2}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: `center`,
          fontSize: `1.7rem`,
          fontFamily: `cormorantGaramond`,
          fontWeight: 600,
          letterSpacing: `.02em`,
        }}
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

        {/* Message from customer */}
        <FormControl>
          <Typography variant="selectLabel">
            Nachricht (optional)
          </Typography>

          <TextField
            value={formData.orderMessage}
            variant="outlined"
            name="orderMessage"
            onChange={handleChange}
            multiline
            minRows={3}
            placeholder="Hier können Sie uns Hinweise oder Wünsche zu Ihrer Buchung mitteilen."
            inputProps={{ style: { padding: 0 } }}
            InputProps={{
              sx: {
                p: 0,
                '& .MuiOutlinedInput-input': { p: 0 },
                '& .MuiInputBase-inputMultiline': { p: 0 },
                '& textarea': { p: 0 },
              },
            }}
          />
        </FormControl>

        {/* Privacy consent (required) */}
        <FormControl error={Boolean(formErrors?.consentPrivacy)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.consentPrivacy}
                onChange={(e) => {
                  if (formErrors?.consentPrivacy) {
                    delete formErrors.consentPrivacy;
                  }
                  setFormData((prev) => ({
                    ...prev,
                    consentPrivacy: e.target.checked,
                  }));
                }}
                name="consentPrivacy"
                inputProps={{ 'aria-required': true }}
                sx={{
                  color: Boolean(formErrors?.consentPrivacy) ? `error.main` : `primary.main`,
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ fontSize: `0.8rem` }}
              >
                * Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der{` `}
                <Link
                  href="/datenschutz"
                  target="_blank"
                  rel="noreferrer"
                >
                  Datenschutzerklärung
                </Link>{` `}zu.
              </Typography>
            }
          />
          {formErrors?.consentPrivacy && (
            <FormHelperText>
              {formErrors.consentPrivacy}
            </FormHelperText>
          )}
        </FormControl>

        {/* Marketing consent (optional) */}
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.consentMarketing}
                onChange={(e) => setFormData((prev) => ({
                  ...prev,
                  consentMarketing: e.target.checked,
                }))}
                name="consentMarketing"
                color="primary"
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ fontSize: `0.8rem` }}
              >
                Ich möchte Neuigkeiten, Angebote und Aktionen per E-Mail erhalten (optional).
              </Typography>
            }
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          size="medium"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            ml: `auto`,
            mr: `auto`,
            width: `300px`,
            maxWidth: `100%`,
          }}
        >
          Termin Buchen
        </Button>
      </Box>
    </Box>
  );
});

export default CustomerForm;
