'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatTimeToString } from '@/utils/formatters';

/**
 * Calculate price display for a service
 * If all employees have the same price, show single price
 * If prices differ, show range (min - max)
 * If price is 0, show "Kostenlos" (free)
 */
const getPriceDisplay = (employees) => {
  if (!employees || employees.length === 0) return null;

  const prices = employees
    .map(emp => parseFloat(emp.price))
    .filter(price => !isNaN(price) && price >= 0);

  if (prices.length === 0) return null;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // If all prices are 0, show "Kostenlos"
  if (maxPrice === 0) {
    return `Kostenlos`;
  }

  // If min is 0 but max is not, show range from "Kostenlos" to max
  if (minPrice === 0 && maxPrice > 0) {
    return `Kostenlos - ${maxPrice}€`;
  }

  // If all prices are the same
  if (minPrice === maxPrice) {
    return `${minPrice}€`;
  }

  // Show price range
  return `${minPrice}€ - ${maxPrice}€`;
};

/**
 * Service item component
 */
function ServiceItem({ service }) {
  const priceDisplay = getPriceDisplay(service.employees);

  return (
    <Box
      sx={{
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `flex-start`,
        gap: 2,
        py: {
          xs: 1.5,
          md: 2,
        },
        px: {
          xs: 2,
          md: 3,
        },
        borderBottom: `1px solid`,
        borderColor: `rgba(0, 0, 0, 0.08)`,
        '&:last-child': {
          borderBottom: `none`,
        },
        transition: `background-color 0.2s ease`,
        '&:hover': {
          backgroundColor: `rgba(0, 0, 0, 0.02)`,
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            mb: 0.5,
            lineHeight: 1.4,
            fontSize: {
              xs: `1rem`,
              md: `1.1rem`,
            },
          }}
        >
          {service.name}
        </Typography>
        {service.durationTime && (
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                xs: `0.875rem`,
                md: `0.95rem`,
              },
              opacity: 0.6,
              fontWeight: 400,
            }}
          >
            {formatTimeToString(service.durationTime)}
          </Typography>
        )}
      </Box>
      {priceDisplay && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            whiteSpace: `nowrap`,
            color: `primary.main`,
            fontSize: {
              xs: `1.05rem`,
              md: `1.15rem`,
            },
          }}
        >
          {priceDisplay}
        </Typography>
      )}
    </Box>
  );
}

/**
 * SubCategory section component
 */
function SubCategorySection({
  subCategory, categoryIndex, subCategoryIndex,
}) {
  return (
    <Box
      sx={{
        mb: {
          xs: 3,
          md: 4,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: `1.2rem`,
            md: `1.4rem`,
          },
          mb: 2,
          px: {
            xs: 2,
            md: 3,
          },
          color: `primary.main`,
        }}
      >
        {subCategory.subCategoryName}
      </Typography>
      <Box
        sx={{
          backgroundColor: `background.alternate`,
          borderRadius: `12px`,
          overflow: `hidden`,
        }}
      >
        {subCategory.services && subCategory.services.length > 0 ? (
          subCategory.services.map((service, serviceIndex) => (
            <ServiceItem
              key={`service-${categoryIndex}-${subCategoryIndex}-${serviceIndex}`}
              service={service}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{
              opacity: 0.6,
              p: 3,
              textAlign: `center`,
            }}
          >
            Keine Services verfügbar
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/**
 * Main PriceMenu component
 */
export default function PriceMenu({ categories }) {
  if (!categories || categories.length === 0) {
    return (
      <Box
        sx={{
          textAlign: `center`,
          py: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{ opacity: 0.6 }}
        >
          Keine Services verfügbar
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {categories.map((category, categoryIndex) => (
        <Box
          key={`category-${categoryIndex}`}
          sx={{
            mb: {
              xs: 5,
              md: 6,
            },
            '&:last-child': {
              mb: 0,
            },
          }}
        >
          {/* Category Header */}
          <Box
            sx={{
              mb: {
                xs: 3,
                md: 4,
              },
              pb: 2,
              borderBottom: `2px solid`,
              borderColor: `primary.main`,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: `1.75rem`,
                  md: `2.2rem`,
                  lg: `2.5rem`,
                },
                color: `primary.main`,
              }}
            >
              {category.categoryName}
            </Typography>
          </Box>

          {/* Category Content */}
          <Box>
            {/* If category has subcategories */}
            {category.hasSubCategories !== false && category.subCategories && category.subCategories.length > 0 ? (
              category.subCategories.map((subCategory, subCategoryIndex) => (
                <SubCategorySection
                  key={`subcategory-${categoryIndex}-${subCategoryIndex}`}
                  subCategory={subCategory}
                  categoryIndex={categoryIndex}
                  subCategoryIndex={subCategoryIndex}
                />
              ))
            ) : (
              /* If category has services directly */
              category.services && category.services.length > 0 ? (
                <Box
                  sx={{
                    backgroundColor: `background.alternate`,
                    borderRadius: `12px`,
                    overflow: `hidden`,
                  }}
                >
                  {category.services.map((service, serviceIndex) => (
                    <ServiceItem
                      key={`service-${categoryIndex}-${serviceIndex}`}
                      service={service}
                    />
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.6,
                    textAlign: `center`,
                    py: 4,
                  }}
                >
                  Keine Services verfügbar
                </Typography>
              )
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
