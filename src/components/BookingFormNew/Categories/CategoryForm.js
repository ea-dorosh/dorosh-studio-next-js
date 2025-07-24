import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

export default function CategoryForm({ categories, onCategorySelect, selectedCategory }) {

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
          <Card
            sx={{
              boxShadow: `none`,
              borderRadius: `12px`,
            }}
          >
            {category.categoryImage && (
              <CardMedia
                component="img"
                height="140"
                image={category.categoryImage}
                alt={category.categoryName}
                sx={{ objectFit: `cover`, borderRadius: `12px` }}
              />
            )}
            <CardContent sx={{
              p: `8px`,

              '&:last-child': {
                p: `8px`,
              },
            }}>
              <Typography
                variant="h6"
                component="h3"
                textAlign="left"
                sx={{
                  color: selectedCategory?.categoryId === category.categoryId
                    ? `primary.main`
                    : `text.primary`
                }}
              >
                {category.categoryName}
              </Typography>

              <Button
                sx={{
                  marginTop: `8px`,
                  width: `160px`,

                }}
                color={selectedCategory?.categoryId === category.categoryId
                  ? `primary`
                  : `info`}
                size="small"
                variant={selectedCategory?.categoryId === category.categoryId
                  ? `outlined`
                  : `contained`}
                onClick={() => onCategorySelect(category)}
              >
                {selectedCategory?.categoryId === category.categoryId
                  ? `ausgewählt`
                  : `auswählen`}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
