"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import Link from "next/link";
import { formattedTime } from "@/utils/formatters";

dayjs.locale('de');

export default function Confirmation({
  appointment,
}) {
  return (<>
    <Divider sx={{mb: 2}} />

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

      <Box mt={2}>
        Datum: <b>{dayjs(appointment.date).format('D. MMMM YYYY')}</b>
      </Box>

      <Box mt={2}>
        Uhrzeit: <b>{formattedTime(appointment.timeStart)} Uhr</b>
      </Box>

      <Box mt={2}>
        Behandlung: <b>{appointment.serviceName}</b>
      </Box>

      <Box mt={2}>
        Wir freuen uns, Sie bald bei uns begrüßen zu dürfen. Bei Fragen oder Änderungen zu Ihrem Termin stehen wir Ihnen jederzeit gerne zur Verfügung.
        <br />
        <br />

        Mit freundlichen Grüßen,
        <br />
        {appointment.company.name}
        <br />
        {appointment.company.branches[0].email}
        <br />
        {appointment.company.branches[0].phone}
        <br />
        {appointment.company.branches[0].addressStreet}, {appointment.company.branches[0].addressZip} {appointment.company.branches[0].addressCity}
      </Box>
    </Box>

    <Divider sx={{mt: 2, mb: 2}} />

    <Button
      component={Link}
      href="/"
      sx={{margin: `20px auto`}}
      variant="contained"
    >
      Zurück zur Startseite
    </Button>
  </>
  );
}
