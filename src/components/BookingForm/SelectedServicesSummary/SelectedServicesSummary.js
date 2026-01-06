import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Gets employee info for display in summary
 * @param {Object} service - Service object with employees array
 * @param {Array} selectedEmployeeIds - Array of selected employee IDs
 * @param {boolean} showEmployees - Whether employee selection was shown
 * @returns {Object|null} - { name: string, price: string|null } or null
 */
const getEmployeeInfo = (service, selectedEmployeeIds, showEmployees) => {
  // If service has only 1 employee, always show that employee with price
  if (service.employees?.length === 1) {
    const employee = service.employees[0];
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      price: employee.price ? `${employee.price}€` : null,
    };
  }

  // If employee selection wasn't shown, don't display employee info
  if (!showEmployees) {
    return null;
  }

  if (!selectedEmployeeIds || selectedEmployeeIds.length === 0) {
    return null;
  }

  if (selectedEmployeeIds.includes(`all`)) {
    // Calculate price range for "all"
    const prices = service.employees?.map((emp) => emp.price || 0) || [];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceStr = minPrice === maxPrice
      ? `${minPrice}€`
      : `${minPrice}€ - ${maxPrice}€`;

    return {
      name: `Alle Mitarbeiter`,
      price: priceStr,
    };
  }

  const selectedEmployees = selectedEmployeeIds
    .map((employeeId) => {
      return service.employees?.find(
        (emp) => emp.id.toString() === employeeId.toString()
      );
    })
    .filter(Boolean);

  if (selectedEmployees.length === 0) {
    return null;
  }

  if (selectedEmployees.length === 1) {
    const employee = selectedEmployees[0];
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      price: employee.price ? `${employee.price}€` : null,
    };
  }

  // Multiple employees selected
  const names = selectedEmployees
    .map((emp) => `${emp.firstName} ${emp.lastName}`)
    .join(`, `);
  const prices = selectedEmployees.map((emp) => emp.price || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceStr = minPrice === maxPrice
    ? `${minPrice}€`
    : `${minPrice}€ - ${maxPrice}€`;

  return {
    name: names,
    price: priceStr,
  };
};

export default function SelectedServicesSummary({
  services,
  categories,
  serviceEmployees = null,
  showEmployees = false,
}) {
  if (!services || services.length === 0) {
    return null;
  }

  // Group services by category using categoryId to find categoryName
  const groupedByCategory = services.reduce((accumulator, service) => {
    const category = categories.find(
      (cat) => cat.categoryId === service.categoryId
    );
    const categoryName = category?.categoryName || `Sonstiges`;
    if (!accumulator[categoryName]) {
      accumulator[categoryName] = [];
    }
    accumulator[categoryName].push(service);
    return accumulator;
  }, {});

  const categoryNames = Object.keys(groupedByCategory);
  const isSingleCategory = categoryNames.length === 1;

  return (
    <Box
      sx={{
        width: `100%`,
        p: 1.5,
        backgroundColor: `rgba(0, 171, 85, 0.06)`,
        borderRadius: 1.5,
        border: `1px solid rgba(0, 171, 85, 0.15)`,
      }}
    >
      <Typography
        sx={{
          color: `text.secondary`,
          fontWeight: 600,
          textTransform: `uppercase`,
          letterSpacing: `.05em`,
          fontSize: `0.75rem`,
          display: `block`,
          mb: 0.75,
        }}
      >
        Ausgewählte Services
      </Typography>

      {categoryNames.map((categoryName, categoryIndex) => (
        <Box
          key={categoryName}
          sx={{ mb: categoryIndex < categoryNames.length - 1 ? 1 : 0 }}
        >
          {!isSingleCategory && (
            <Typography
              variant="body2"
              sx={{
                color: `text.secondary`,
                fontStyle: `italic`,
                fontSize: `0.85rem`,
                display: `block`,
                mb: 0.25,
              }}
            >
              {categoryName}
            </Typography>
          )}
          {groupedByCategory[categoryName].map((service) => {
            const employeeInfo = getEmployeeInfo(
              service,
              serviceEmployees?.[service.id],
              showEmployees
            );

            return (
              <Box
                key={service.id}
                sx={{
                  display: `flex`,
                  flexDirection: `column`,
                  gap: 0.25,
                  py: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: `text.primary`,
                    fontSize: `1rem`,
                  }}
                >
                  {service.name}
                </Typography>
                {employeeInfo && (
                  <Typography
                    sx={{
                      fontSize: `0.9rem`,
                      color: `text.secondary`,
                      fontWeight: 500,
                      pl: 1,
                    }}
                  >
                    → {employeeInfo.name}
                    {employeeInfo.price && ` (${employeeInfo.price})`}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

