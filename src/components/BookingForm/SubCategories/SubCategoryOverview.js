"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export default function SubCategoryOverview({ subCategory, changeSubCategory }) {

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
        onClick={changeSubCategory}
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
      {subCategory.subCategoryName}
    </Typography>

    <Divider sx={{mt: 2, mb: 1}} />
  </>
  );
}
