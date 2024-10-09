"use client";

import {
  Box,
  Typography,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { useMemo } from "react";
import { 
  formatPrice,
} from "@/utils/formatters";

export default function ServiceOverview({ selectedEmployees, availableEmployees, changeEmployees }) {

  const filteredEmployees = useMemo(() => availableEmployees.filter(employee => selectedEmployees.includes(employee.id)), [availableEmployees, selectedEmployees]);
  console.log(`filteredEmployees`, filteredEmployees);

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
        {selectedEmployees.length === 1 ? `Ihr Spezialist und Preis` : `Ihre Spezialisten`}
      </Typography>

      {availableEmployees.length !== 1 &&       <Button
        onClick={changeEmployees}
        variant="text"
        size="small"
        color="info"
        sx={{ minHeight: 0, minWidth: 0, padding: 0,
          fontWeight: `bold`,
        }}
      >
        ändern
      </Button>}
    </Box>

    {filteredEmployees.map((employee) => <Box key={employee.id}
      sx={{
        display: `flex`,
        alignItems: `center`,
        mt: 1,
      }}
    >
      <Avatar 
        src={employee.image}
        alt={employee.firstName}
        sx={{ width: 30, height: 30, mr: 2 }}
      />

      <Typography 
        variant="formOverview"
        mr={2}
      >
        {employee.firstName} {employee.lastName}
      </Typography>

      <Typography
        variant="formOverview"
        sx={{
          ml: `auto`,
        }}
      >
        {formatPrice(employee.price)}
      </Typography>
    </Box>)}

    <Divider sx={{mt: 2, mb: 1}} />
  </>
  );
}
