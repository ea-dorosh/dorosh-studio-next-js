"use client";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useEffect, useState, useRef } from 'react';
import calendarService from '@/services/calendar.service';
import 'dayjs/locale/de';

dayjs.locale(`de`);

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

/**
 * Format nearest slot date/time for display
 * @param {Object} slot - { date: string, time: string }
 * @returns {string} - Formatted string like "Morgen, 10:00" or "Mi, 15. Jan, 14:30"
 */
const formatNearestSlot = (slot) => {
  if (!slot) return null;

  const slotDate = dayjs(slot.date);
  const today = dayjs();
  const tomorrow = today.add(1, `day`);

  // Format time (remove seconds)
  const timeParts = slot.time.split(`:`);
  const formattedTime = `${timeParts[0]}:${timeParts[1]}`;

  if (slotDate.isSame(today, `day`)) {
    return `Heute, ${formattedTime}`;
  }

  if (slotDate.isSame(tomorrow, `day`)) {
    return `Morgen, ${formattedTime}`;
  }

  // For other dates, show weekday and date
  return `${slotDate.format(`dd, D. MMM`)}, ${formattedTime}`;
};

export default function EmployeeSelectionStep({
  services,
  serviceEmployees,
  setServiceEmployees,
  onNextStep,
}) {
  const [nearestSlots, setNearestSlots] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  const servicesWithMultipleEmployees = services.filter(
    (service) => service?.employees?.length > 1
  );

  // Fetch nearest slots ONLY on first mount - not on checkbox changes
  useEffect(() => {
    // Only fetch once
    if (hasFetchedRef.current) return;
    if (servicesWithMultipleEmployees.length === 0) return;

    hasFetchedRef.current = true;

    const fetchNearestSlotsForAllServices = async () => {
      setIsLoading(true);

      try {
        const results = {};

        // For each service with multiple employees, fetch slots for each employee combination
        for (const service of servicesWithMultipleEmployees) {
          // Build combinations: "all" + each individual employee
          const employeeCombinations = [
            {
              key: `all`,
              employeeIds: service.employees.map((emp) => emp.id),
            },
            ...service.employees.map((employee) => ({
              key: employee.id.toString(),
              employeeIds: [employee.id],
            })),
          ];

          // For 2 services scenario: pass other services with "all employees" default
          const otherServicesData = services
            .filter((s) => s.id !== service.id)
            .map((s) => ({
              serviceId: s.id,
              employeeIds: s.employees.map((emp) => emp.id),
            }));

          const slotsResult = await calendarService.fetchNearestSlots(
            service.id,
            employeeCombinations,
            otherServicesData
          );

          results[service.id] = slotsResult;
        }

        setNearestSlots(results);
      } catch (error) {
        console.error(`[EmployeeSelectionStep] Error fetching nearest slots:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearestSlotsForAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getNearestSlotDisplay = (serviceId, employeeKey) => {
    const serviceSlots = nearestSlots[serviceId];

    if (isLoading) {
      return (
        <Skeleton
          variant="text"
          width={140}
          height={18}
          sx={{ mt: 0.25 }}
        />
      );
    }

    if (!serviceSlots || !serviceSlots[employeeKey]) {
      return (
        <Typography
          sx={{
            fontSize: `0.75rem`,
            color: `text.disabled`,
            fontStyle: `italic`,
            height: 18,
            mt: 0.25,
            fontWeight: `bold`,
          }}
        >
          Kein Termin verfügbar
        </Typography>
      );
    }

    const formattedSlot = formatNearestSlot(serviceSlots[employeeKey]);

    if (!formattedSlot) {
      return (
        <Typography
          sx={{
            fontSize: `0.75rem`,
            color: `text.disabled`,
            fontStyle: `italic`,
            height: 18,
            mt: 0.25,
            fontWeight: `bold`,
          }}
        >
          Kein Termin verfügbar
        </Typography>
      );
    }

    return (
      <Typography
        sx={{
          fontSize: `0.75rem`,
          fontStyle: `italic`,
          height: 18,
          mt: 0.25,
          fontWeight: `bold`,
        }}
      >
        Nächster Termin: {formattedSlot}
      </Typography>
    );
  };

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
                  : `transparent`,
                border: isEmployeeSelected(service.id, `all`)
                  ? `1px solid rgba(0, 171, 85, 0.3)`
                  : `1px solid transparent`,
                transition: `all 0.2s ease`,
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
                <Box>
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
                  {getNearestSlotDisplay(service.id, `all`)}
                </Box>
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
                  <Box>
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
                    {getNearestSlotDisplay(service.id, employee.id.toString())}
                  </Box>
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
