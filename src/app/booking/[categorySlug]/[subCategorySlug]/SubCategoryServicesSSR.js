import {
  Box,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { formatTimeToString } from "@/utils/formatters";

export default function SubCategoryServicesSSR({ subCategory, categorySlug, subCategorySlug }) {
  return (
    <Box
      sx={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`,
        gap: `2rem`,
      }}
    >
      {subCategory.services.map((service) => (
        <Link
          key={service.id}
          href={`/booking/${categorySlug}/${subCategorySlug}/${service.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              backgroundColor: `secondary.main`,
              borderRadius: `12px`,
              padding: `1.5rem`,
              cursor: `pointer`,
              transition: `transform 0.3s, box-shadow 0.3s`,
              height: `100%`,
              '&:hover': {
                transform: `scale(1.02)`,
                boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15)`,
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: `1.4rem`,
                fontWeight: `bold`,
                color: `primary.main`,
                mb: `0.5rem`,
                wordBreak: `break-word`,
                whiteSpace: `normal`,
              }}
            >
              {service.name}
            </Typography>

            <Box sx={{ mb: `1rem` }}>
              {service.bookingNote && (
                <Typography
                  variant="body2"
                  sx={{
                    color: `primary.main`,
                    fontSize: `1rem`,
                  }}
                >
                  {service.bookingNote}
                </Typography>
              )}
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: `primary.main`,
                mb: `0.5rem`,
              }}
            >
              <strong>Dauer:</strong> {formatTimeToString(service.durationTime)}
            </Typography>

            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontSize: `1.2rem`,
                  fontWeight: `bold`,
                  color: `primary.main`,
                }}
              >
                Ab {Math.min(...service.employees.map(emp => emp.price))}€
              </Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
}