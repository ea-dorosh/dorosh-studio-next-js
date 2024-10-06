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
        variant="formOverview"
        mr={1}
      >
        {service.name}
      </Typography>

      <Button
        onClick={changeService}
        variant="outlined"
        size="small"
        color="info"
      >
        ändern
      </Button>
    </Box>

    <Divider sx={{mt: 2, mb: 1}} />
  </>
  );
}
