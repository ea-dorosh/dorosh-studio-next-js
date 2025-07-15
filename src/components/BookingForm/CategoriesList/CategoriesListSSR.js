import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

export default function CategoriesListSSR({
  categories,
}) {
  return (
    <Box
      sx={{
        display: `flex`,
        flexDirection: `column`,
        gap: `2rem`,
        mt: `2rem`,
      }}
    >
      {categories.map((category) => (
        <Card
          key={category.categoryId}
          sx={{
            backgroundColor: `primary.main`,
            position: `relative`,
            overflow: `hidden`,
            transition: `transform 0.3s, box-shadow 0.3s`,
            cursor: `pointer`,
            height: `100%`,
            '&:hover': {
              transform: `scale(1.02)`,
              boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15)`,
            },
          }}
        >
          <Link
            href={`/booking/${slugify(category.categoryName)}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: `flex`,
                alignItems: `center`,
                flexDirection: `column`,
                gap: `1rem`,
                padding: `1rem`,
              }}
            >
              <CardContent sx={{ padding: 0, flex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: `1.2rem !important`,
                    fontWeight: `bold`,
                    color: `secondary.main`,
                  }}
                >
                  {category.categoryName}
                </Typography>
              </CardContent>

              <CardMedia
                component="img"
                sx={{
                  width: `100%`,
                  height: `150px`,
                  borderRadius: `12px`,
                  objectFit: `cover`,
                  flexShrink: 0,
                }}
                image={category.categoryImage}
                alt={category.categoryName}
              />
            </Box>
          </Link>
        </Card>
      ))}
    </Box>
  );
}