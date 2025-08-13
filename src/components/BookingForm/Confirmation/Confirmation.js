"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import Link from 'next/link';
import { formattedTime } from '@/utils/formatters';

dayjs.locale(`de`);

export default function Confirmation({ appointment }) {
  return (
    <>
      <Divider sx={{ mb: 2 }} />

      <Box>
        <Typography
          sx={{
            fontSize: `1.6rem`,
            fontWeight: `700`,
            textAlign: `center`,
          }}
        >
        Terminbestätigung
        </Typography>

        <Box mt={3}>
        Hallo {appointment.firstName} {appointment.lastName},
        </Box>

        <Box>
        vielen Dank für Ihre Buchung! Ihr Termin wurde erfolgreich bestätigt.
          <br />
          <br />

          <b>Details Ihres Termins:</b>
        </Box>

        {!appointment.service.secondService && (
          <Box mt={2}>
        Behandlung: <b>{appointment.service.name}</b>
          </Box>)}

        {appointment.service.secondService && (
          <Box mt={2}>
        Behandlung:
            <br />
        - <b>{appointment.service.name}</b><br />
        - <b>{appointment.service.secondService.name}</b>
          </Box>
        )}

        <Box mt={2}>
        Datum: <b>{dayjs(appointment.date).format(`D. MMMM YYYY`)}</b>
        </Box>

        <Box mt={2}>
        Uhrzeit: <b>{formattedTime(appointment.service.timeStart)} Uhr</b>
        </Box>

        <Box mt={2}>
        Wir freuen uns, Sie bald bei uns begrüßen zu dürfen. Bei Fragen oder Änderungen zu Ihrem Termin stehen wir Ihnen jederzeit gerne zur Verfügung.
          <br />
          <br />

        Mit freundlichen Grüßen,
          <br />
          {appointment.company.branches[0].name}
          <br />

          <a
            href={`mailto:${appointment.company.branches[0].email}`}
            style={{ color: `inherit` }}
          >
            {appointment.company.branches[0].email}
          </a>
          <br />

          <a
            href={`tel:${appointment.company.branches[0].phone}`}
            style={{ color: `inherit` }}
          >
            {appointment.company.branches[0].phone}
          </a>
          <br />

          {appointment.company.branches[0].addressStreet}, {appointment.company.branches[0].addressZip} {appointment.company.branches[0].addressCity}
        </Box>
      </Box>

      <Divider
        sx={{
          mt: 1,
          mb: 1,
        }}
      />

      <Button
        component={Link}
        href="/"
        sx={{ margin: `10px auto` }}
        variant="contained"
      >
        Zurück zur Startseite
      </Button>
    </>
  );
}
