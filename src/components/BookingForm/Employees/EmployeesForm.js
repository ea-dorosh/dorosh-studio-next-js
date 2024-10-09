"use client";

import {
  Box,
  Typography,
  Button,
  Avatar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { 
  formatPrice,
} from "@/utils/formatters";

export default function ServiceOverview({ 
  availableEmployees,
  selectedEmployeesIds,
  changeEmployees,
  selectAllEmployees,
  onNextStepClick,
}) {

  return (<Box sx={{
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    justifyContent: `space-between`,
  }}>
    <Box sx={{
      display: `flex`,
      alignItems: `flex-start`,
      justifyContent: `space-between`,
    }}>
      <Typography
        variant="formSubtitle"
        color="textSecondary"
      >
        Wählen Sie Ihren Spezialisten
      </Typography>
    </Box>

    {availableEmployees.map((employee) => <FormControlLabel 
      key={employee.id}
      sx={{
        display: `flex`,
        alignItems: `center`,
        margin: 0,
        mt: 1,
        width: `100%`,
      }}
      control={<>
        <Checkbox
          name="employeeName"
          checked={selectedEmployeesIds.includes(employee.id)}
          onChange={changeEmployees}
          value={employee.id}
        />

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
      </>
      }
    />)}

    <FormControlLabel
      sx={{
        display: `flex`,
        alignItems: `center`,
        margin: 0,
        mt: 1,
      }}
      control={<>
        <Checkbox
          name="employeeName"
          checked={selectedEmployeesIds.length === availableEmployees.length}
          onChange={selectAllEmployees}
        />

        <Typography 
          variant="formOverview"
          mr={2}
        >
        Bei jedem Spezialisten
        </Typography>
      </>
      }
    />

    <Button
      variant="contained"
      color="info"
      size="medium"
      onClick={onNextStepClick}
      sx={{
        margin: `auto`,
        mt: 2,
      }}
    >
      Weiter
    </Button>
  </Box>
  );
}
