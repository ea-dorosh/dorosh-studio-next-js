"use client";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

/**
 * Determines if employee selection step should be shown.
 * Returns true if at least one service has more than one employee.
 * @param {Array} services - Array of selected services
 * @returns {boolean}
 */
export const shouldShowEmployeeSelection = (services) => {
  if (!services || services.length === 0) return false;
  return services.some((service) => service?.employees?.length > 1);
};

export default function EmployeeSelectionStep({
  services,
  serviceEmployees,
  setServiceEmployees,
  onNextStep,
}) {
  const handleEmployeeToggle = (serviceId, employeeId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const currentSelection = serviceEmployees[serviceId] || [`all`];

    // If clicking on "all" option
    if (employeeId === `all`) {
      setServiceEmployees({
        ...serviceEmployees,
        [serviceId]: [`all`],
      });
      return;
    }

    // If currently "all" is selected and clicking on specific employee
    if (currentSelection.includes(`all`)) {
      setServiceEmployees({
        ...serviceEmployees,
        [serviceId]: [employeeId],
      });
      return;
    }

    // Toggle specific employee
    const employeeIdStr = employeeId.toString();
    const isCurrentlySelected = currentSelection.includes(employeeIdStr);

    let newSelection;
    if (isCurrentlySelected) {
      // Remove employee from selection
      newSelection = currentSelection.filter((id) => id !== employeeIdStr);
      // If no employees left, select "all"
      if (newSelection.length === 0) {
        newSelection = [`all`];
      }
    } else {
      // Add employee to selection
      newSelection = [...currentSelection.filter((id) => id !== `all`), employeeIdStr];
    }

    setServiceEmployees({
      ...serviceEmployees,
      [serviceId]: newSelection,
    });
  };

  const isEmployeeSelected = (serviceId, employeeId) => {
    const currentSelection = serviceEmployees[serviceId] || [`all`];

    if (employeeId === `all`) {
      return currentSelection.includes(`all`);
    }

    return currentSelection.includes(employeeId.toString());
  };

  const servicesWithMultipleEmployees = services.filter(
    (service) => service?.employees?.length > 1
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h5"
        sx={{
          textAlign: `center`,
          fontSize: `1.5rem`,
          fontFamily: `cormorantGaramond`,
          mb: 2,
        }}
      >
        Mitarbeiter auswählen
      </Typography>

      <Typography
        variant="body2"
        sx={{
          textAlign: `center`,
          color: `text.secondary`,
          mb: 3,
        }}
      >
        Wählen Sie Ihren bevorzugten Mitarbeiter für jeden Service
      </Typography>

      {servicesWithMultipleEmployees.map((service) => (
        <Card
          key={service.id}
          sx={{
            mb: 2,
            boxShadow: `0 2px 8px rgba(0,0,0,0.05)`,
            border: `1px solid rgba(0,0,0,0.1)`,
            borderRadius: `16px`,
            overflow: `hidden`,
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: `1.1rem`,
                mb: 1.5,
                color: `text.primary`,
              }}
            >
              {service.name}
            </Typography>

            {/* "Any employee" option */}
            <Box
              onClick={() => handleEmployeeToggle(service.id, `all`)}
              sx={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
                py: 1.25,
                px: 1.5,
                mb: 1,
                borderRadius: `12px`,
                cursor: `pointer`,
                backgroundColor: isEmployeeSelected(service.id, `all`)
                  ? `rgba(0, 171, 85, 0.08)`
                  : `rgba(0, 0, 0, 0.02)`,
                border: isEmployeeSelected(service.id, `all`)
                  ? `1px solid rgba(0, 171, 85, 0.3)`
                  : `1px solid transparent`,
                transition: `all 0.2s ease`,
                '&:hover': {
                  backgroundColor: isEmployeeSelected(service.id, `all`)
                    ? `rgba(0, 171, 85, 0.12)`
                    : `rgba(0, 0, 0, 0.04)`,
                },
              }}
            >
              <Box
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  gap: 1, 
                }}
              >
                <Checkbox
                  checked={isEmployeeSelected(service.id, `all`)}
                  sx={{
                    p: 0,
                    color: `rgba(0, 0, 0, 0.3)`,
                    '&.Mui-checked': {
                      color: `success.main`,
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: isEmployeeSelected(service.id, `all`)
                      ? `success.main`
                      : `text.primary`,
                  }}
                >
                  Egal / Alle Mitarbeiter
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: `0.875rem`,
                  color: `text.secondary`,
                }}
              >
                {(() => {
                  const prices = service.employees.map((emp) => emp.price || 0);
                  const minPrice = Math.min(...prices);
                  const maxPrice = Math.max(...prices);
                  return minPrice === maxPrice
                    ? `${minPrice}€`
                    : `${minPrice}€ - ${maxPrice}€`;
                })()}
              </Typography>
            </Box>

            {/* Individual employees */}
            {service.employees.map((employee) => (
              <Box
                key={employee.id}
                onClick={() => handleEmployeeToggle(service.id, employee.id.toString())}
                sx={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                  py: 1.25,
                  px: 1.5,
                  mb: 0.5,
                  borderRadius: `12px`,
                  cursor: `pointer`,
                  backgroundColor: isEmployeeSelected(service.id, employee.id)
                    ? `rgba(0, 171, 85, 0.08)`
                    : `transparent`,
                  border: isEmployeeSelected(service.id, employee.id)
                    ? `1px solid rgba(0, 171, 85, 0.3)`
                    : `1px solid transparent`,
                  transition: `all 0.2s ease`,
                  '&:hover': {
                    backgroundColor: isEmployeeSelected(service.id, employee.id)
                      ? `rgba(0, 171, 85, 0.12)`
                      : `rgba(0, 0, 0, 0.04)`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: `flex`,
                    alignItems: `center`,
                    gap: 1, 
                  }}
                >
                  <Checkbox
                    checked={isEmployeeSelected(service.id, employee.id)}
                    sx={{
                      p: 0,
                      color: `rgba(0, 0, 0, 0.3)`,
                      '&.Mui-checked': {
                        color: `success.main`,
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: isEmployeeSelected(service.id, employee.id) ? 500 : 400,
                      color: isEmployeeSelected(service.id, employee.id)
                        ? `success.main`
                        : `text.primary`,
                    }}
                  >
                    {employee.firstName} {employee.lastName}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: `0.875rem`,
                    fontWeight: 600,
                    color: isEmployeeSelected(service.id, employee.id)
                      ? `success.main`
                      : `text.secondary`,
                  }}
                >
                  {employee.price || 0}€
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button
        variant="contained"
        size="medium"
        onClick={onNextStep}
        sx={{
          mt: 2,
          ml: `auto`,
          mr: `auto`,
          display: `block`,
          width: `300px`,
          maxWidth: `100%`,
        }}
      >
        Weiter
      </Button>
    </Box>
  );
}

