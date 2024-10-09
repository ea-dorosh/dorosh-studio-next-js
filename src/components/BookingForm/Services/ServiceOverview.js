"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export default function ServiceOverview({ service, changeService }) {

  return (<>
    <Box sx={{
      display: `flex`,
      alignItems: `flex-start`,
      justifyContent: `space-between`,
    }}>
      <Typography
        variant="formSubtitle"
        color="textSecondary"
      >
        Behandlung
      </Typography>

      <Button
        onClick={changeService}
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
      {service.name}
    </Typography>

    <Divider sx={{mt: 2, mb: 1}} />
  </>
  );
}
