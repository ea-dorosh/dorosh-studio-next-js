"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import { formattedTime } from "@/utils/formatters";

dayjs.locale('de');

export default function CalendarOverview({ date, time, changeDate }) {

  return (<>
    <Box sx={{
      display: `flex`,
      alignItems: `flex-start`,
      justifyContent: `space-between`,
    }}>
      <Typography
        variant="formSubtitle"
      >
        Ausgewähltes Datum und Uhrzeit
      </Typography>

      <Button
        onClick={changeDate}
        variant="text"
        size="small"
        color="info"
        sx={{ minHeight: 0, minWidth: 0, padding: 0,
          fontWeight: `bold`,
        }}
      >
        ändern
      </Button>
    </Box>

    <Typography
      variant="formOverview"
      component="div"
      mt={1}
    >
      {dayjs(date).format('D. MMMM YYYY')} um {formattedTime(time)}
    </Typography>

    <Divider sx={{mt: 2, mb: 1}} />
  </>
  );
}
