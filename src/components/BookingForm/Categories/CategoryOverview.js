"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export default function CategoryOverview({ category, changeCategory }) {

  return (<>
    <Box sx={{
      display: `flex`,
      alignItems: `flex-start`,
      justifyContent: `space-between`,
    }}>
      <Typography
        variant="formSubtitle"
      >
        Behandlung und Dauer
      </Typography>

      <Button
        onClick={changeCategory}
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
      {category.categoryName}
    </Typography>

    <Divider sx={{mt: 2, mb: 1}} />
  </>
  );
}
