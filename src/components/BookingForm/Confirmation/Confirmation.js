"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import dayjs from 'dayjs';
import { salutationEnum } from '@/constants/enums';
import 'dayjs/locale/de';
import { formattedTime } from "@/utils/formatters";

dayjs.locale('de');

export default function Confirmation({
  appointment,
  closeConfirmation,
  company,
}) {
  return (<>
    <Divider sx={{mt: 2, mb: 2}} />

    <Box>
      <Typography
        variant="h4"
      >
        Terminbestätigung
      </Typography>

      <Box mt={4}>
        Sehr {appointment.salutation === salutationEnum.male ? 'geehrter Herr' : 'geehrte Frau'} {appointment.lastName},
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
        <br />
        {company.name} | {company.branches[0].name}
        <br />
        {company.branches[0].email}
        <br />
        {company.branches[0].phone}
        <br />
        {company.branches[0].addressStreet}, {company.branches[0].addressZip} {company.branches[0].addressCity}
      </Box>
    </Box>

    <Divider sx={{mt: 2, mb: 2}} />

    <Button
      onClick={closeConfirmation}
      sx={{margin: `20px auto`}}
      variant="contained"
    >
      Schließen
    </Button>
  </>
  );
}
