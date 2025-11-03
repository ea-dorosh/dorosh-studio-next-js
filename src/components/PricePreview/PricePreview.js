'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { formatTimeToString } from '@/utils/formatters';

/**
 * Calculate price display for a service
 */
const getPriceDisplay = (employees) => {
  if (!employees || employees.length === 0) return null;

  const prices = employees
    .map(emp => parseFloat(emp.price))
    .filter(price => !isNaN(price) && price >= 0);

  if (prices.length === 0) return null;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (maxPrice === 0) {
    return `Kostenlos`;
  }

  if (minPrice === 0 && maxPrice > 0) {
    return `Kostenlos - ${maxPrice}€`;
  }

  if (minPrice === maxPrice) {
    return `${minPrice}€`;
  }

  return `${minPrice}€ - ${maxPrice}€`;
};

/**
 * Get first N services from all categories
 */
const getFirstServices = (categories, count = 3) => {
  const allServices = [];

  categories.forEach(category => {
    if (category.hasSubCategories !== false && category.subCategories) {
      category.subCategories.forEach(subCategory => {
        if (subCategory.services) {
          subCategory.services.forEach(service => {
            allServices.push({
              ...service,
              categoryName: category.categoryName,
              subCategoryName: subCategory.subCategoryName,
            });
          });
        }
      });
    } else if (category.services) {
      category.services.forEach(service => {
        allServices.push({
          ...service,
          categoryName: category.categoryName,
        });
      });
    }
  });

  return allServices.slice(0, count);
};

/**
 * Service item for preview
 */
function ServicePreviewItem({
  service, index, isLast, 
}) {
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
        borderBottom: isLast ? `none` : `1px solid`,
        borderColor: `rgba(255, 255, 255, 0.15)`,
        opacity: index === 2 ? 0.5 : 1,
        transition: `opacity 0.3s ease`,
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
            color: `secondary.contrastText`,
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
              opacity: 0.7,
              fontWeight: 400,
              color: `secondary.contrastText`,
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
            color: `secondary.contrastText`,
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
 * Price Preview Component for Homepage
 */
export default function PricePreview({ categories }) {
  const previewServices = getFirstServices(categories, 3);

  if (!categories || categories.length === 0 || previewServices.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        mx: `calc(50% - 50vw)`,
        width: `100vw`,
        py: {
          xs: 4,
          md: 6,
        },
        backgroundColor: `secondary.main`,
      }}
    >
      <Container
        sx={{
          maxWidth: `1200px`,
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Typography
          variant="h2"
          color="secondary.contrastText"
          textAlign="center"
          sx={{
            fontWeight: 700,
            letterSpacing: `.02em`,
            mb: 2,
            fontSize: {
              xs: `1.8rem`,
              md: `2.4rem`,
            },
          }}
        >
          Unsere Preise
        </Typography>

        <Typography
          variant="body1"
          color="secondary.contrastText"
          textAlign="center"
          sx={{
            mb: 4,
            opacity: 0.85,
            maxWidth: `600px`,
            mx: `auto`,
          }}
        >
          Transparente Preise für alle unsere Beauty-Services
        </Typography>

        {/* Services Preview */}
        <Box
          sx={{
            maxWidth: `700px`,
            mx: `auto`,
            mb: 4,
            position: `relative`,
          }}
        >
          <Box
            sx={{
              backgroundColor: `rgba(0, 0, 0, 0.15)`,
              borderRadius: `16px`,
              overflow: `hidden`,
              backdropFilter: `blur(10px)`,
            }}
          >
            {previewServices.map((service, index) => (
              <ServicePreviewItem
                key={`preview-service-${index}`}
                service={service}
                index={index}
                isLast={index === previewServices.length - 1}
              />
            ))}
          </Box>

          {/* Fade overlay */}
          <Box
            sx={{
              position: `absolute`,
              bottom: 0,
              left: 0,
              right: 0,
              height: `80px`,
              background: `linear-gradient(to bottom, transparent, #ffffff)`,
              pointerEvents: `none`,
              borderRadius: `0 0 16px 16px`,
            }}
          />
        </Box>

        {/* Button */}
        <Box
          sx={{
            display: `flex`,
            justifyContent: `center`,
          }}
        >
          <Button
            component={Link}
            href="/preisliste"
            color="primary"
            variant="contained"
            size="large"
            sx={{
              px: 4,
            }}
          >
            Alle Preise ansehen
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

