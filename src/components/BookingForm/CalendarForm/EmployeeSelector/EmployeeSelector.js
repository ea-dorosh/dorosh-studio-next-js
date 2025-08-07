"use client";

import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
} from '@mui/material';

const truncateEmployeeName = (firstName, lastName, level = 0) => {
  switch (level) {
  case 0:
    return `${firstName} ${lastName}`;
  case 1:
    return firstName;
  case 2:
    return `${firstName.substring(0, 3)} ${lastName.substring(0, 3)}`;
  case 3:
    return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
  default:
    return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
  }
};

const createAdaptiveChips = (selectedEmployees, service) => {
  let truncationLevel = 0;
  const employeeCount = selectedEmployees.length;

  if (employeeCount >= 4) {
    truncationLevel = 3;
  } else if (employeeCount === 3) {
    truncationLevel = 2;
  } else if (employeeCount === 2) {
    truncationLevel = 1;
  }

  const createChips = (level) => {
    return selectedEmployees.map(empId => {
      const emp = service.employees.find(e => e.id.toString() === empId.toString());
      if (!emp) return null;

      const employeeName = truncateEmployeeName(emp.firstName, emp.lastName, level);

      return (
        <Chip
          key={`${emp.id}-${level}`}
          label={`${employeeName} • ${emp.price || 0}€`}
          size="small"
          variant="outlined"
          sx={{
            height: `23px`,
            fontSize: `0.75rem`,
            mr: 0.5,
            mb: 0,
            maxWidth: `fit-content`,
            '& .MuiChip-label': {
              px: 1,
              py: 0,
              lineHeight: `23px`,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
            },
          }}
        />
      );
    }).filter(chip => chip);
  };

  const chips = createChips(truncationLevel);

  return (
    <Box sx={{
      display: `flex`,
      flexWrap: `nowrap`,
      gap: 0.5,
      overflow: `hidden`,
      alignItems: `center`,
      minHeight: `23px`,
    }}>
      {chips}
    </Box>
  );
};

const getEmployeeLabel = (service, serviceEmployees) => {
  const selectedEmployees = serviceEmployees[service.id] || [];

  if (service.employees.length === 1) {
    const employee = service.employees[0];
    return `${employee.firstName} ${employee.lastName} (${employee.price || 0}€)`;
  }

  if (selectedEmployees.includes(`all`)) {
    const prices = service.employees.map(emp => emp.price || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (minPrice === maxPrice) {
      return `Alle Mitarbeiter (${minPrice}€)`;
    } else {
      return `Alle Mitarbeiter (${minPrice}€ - ${maxPrice}€)`;
    }
  }

  const realEmployees = selectedEmployees.filter(id => id !== `all`);

  if (realEmployees.length === 0) {
    return `Mitarbeiter auswählen`;
  }
  if (realEmployees.length === 1) {
    const selectedEmployee = service.employees.find(emp => emp.id.toString() === realEmployees[0].toString());
    return selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.price || 0}€)` : `Mitarbeiter`;
  }
  if (realEmployees.length > 1) {
    return createAdaptiveChips(realEmployees, service);
  }
  return `Mitarbeiter auswählen`;
};

export default function EmployeeSelector({
  services,
  serviceEmployees,
  setServiceEmployees,
  openSelects, // eslint-disable-line no-unused-vars
  setOpenSelects,
}) {
  const handleEmployeeSelectionChange = (serviceId, event) => {
    const selectedValues = event.target.value;
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    if (service.employees.length === 1) {
      const employeeId = service.employees[0].id.toString();

      if (!selectedValues.includes(employeeId)) {
        return;
      }
    }

    const previousValues = serviceEmployees[serviceId] || [];

    const newValue = selectedValues.find(val => !previousValues.includes(val));
    const removedValue = previousValues.find(val => !selectedValues.includes(val));

    let finalSelection = [...selectedValues];

    if (newValue === `all`) {
      finalSelection = [`all`];
    } else if (removedValue === `all`) {
      finalSelection = selectedValues.filter(val => val !== `all`);
    } else if (newValue && newValue !== `all` && previousValues.includes(`all`)) {
      finalSelection = [newValue];
    } else {
      finalSelection = selectedValues.filter(val => val !== `all`);
    }

    const newServiceEmployees = { ...serviceEmployees };
    newServiceEmployees[serviceId] = finalSelection;
    setServiceEmployees(newServiceEmployees);
  };

  return (
    <>
      {services.map((service) => {
        if (!service) return null;

        return (
          <Box key={service.id} sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {service.name}
            </Typography>

            <Typography variant="selectLabel">
              Mitarbeiter
            </Typography>

            <FormControl fullWidth variant="outlined">
              <Select
                multiple
                value={(() => {
                  const currentSelection = serviceEmployees[service.id] || [];

                  if (service.employees.length === 1) {
                    return currentSelection.filter(id => id !== `all`).map(id => id.toString());
                  }

                  return currentSelection.map(id => id.toString());
                })()}
                onChange={(event) => handleEmployeeSelectionChange(service.id, event)}
                onOpen={() => setOpenSelects(prev => ({
                  ...prev,
                  [service.id]: true, 
                }))}
                onClose={() => setOpenSelects(prev => ({
                  ...prev,
                  [service.id]: false, 
                }))}
                renderValue={() => getEmployeeLabel(service, serviceEmployees)}
                sx={{
                  minHeight: `43px`,
                  '& .MuiSelect-select': {
                    minHeight: `23px !important`,
                    display: `flex`,
                    alignItems: `center`,
                    py: `10px`,
                  },
                }}
              >
                {service.employees.length > 1 && (
                  <MenuItem key="all" value="all">
                    <Checkbox checked={(serviceEmployees[service.id] || []).includes(`all`)} />
                    <ListItemText primary="Alle Mitarbeiter" />
                  </MenuItem>
                )}

                {service.employees.map((employee) => {
                  const currentSelection = serviceEmployees[service.id] || [];
                  const isAllSelected = currentSelection.includes(`all`);
                  const isIndividuallySelected = currentSelection.includes(employee.id.toString()) || currentSelection.includes(employee.id);
                  const isSingleEmployee = service.employees.length === 1;

                  return (
                    <MenuItem key={employee.id} value={employee.id.toString()}>
                      {isSingleEmployee ? (
                        <Checkbox
                          checked={true}
                          disabled={true}
                        />
                      ) : (
                        <Checkbox checked={!isAllSelected && isIndividuallySelected} />
                      )}
                      <ListItemText
                        primary={
                          <Box sx={{
                            display: `flex`,
                            justifyContent: `space-between`,
                            width: `100%`, 
                          }}>
                            <span>{`${employee.firstName} ${employee.lastName}`}</span>
                            <Chip
                              label={`${employee.price || 0}€`}
                              size="small"
                              variant="outlined"
                              sx={{
                                ml: 1,
                                backgroundColor: `#f0f0f0`,
                                borderColor: `#f0f0f0`,
                              }}
                            />
                          </Box>
                        }
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        );
      })}
    </>
  );
}
