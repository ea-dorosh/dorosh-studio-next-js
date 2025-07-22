import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

export default function CategoryForm({ categories, onCategorySelect, selectedCategory }) {
  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
          <Card
            sx={{
              cursor: 'pointer',
              border: selectedCategory?.categoryId === category.categoryId
                ? '3px solid'
                : '1px solid',
              borderColor: selectedCategory?.categoryId === category.categoryId
                ? 'primary.main'
                : 'grey.300',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              }
            }}
            onClick={() => onCategorySelect(category)}
          >
            {category.categoryImage && (
              <CardMedia
                component="img"
                height="140"
                image={category.categoryImage}
                alt={category.categoryName}
                sx={{ objectFit: 'cover' }}
              />
            )}
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                textAlign="center"
                sx={{
                  fontWeight: selectedCategory?.categoryId === category.categoryId
                    ? 'bold'
                    : 'normal',
                  color: selectedCategory?.categoryId === category.categoryId
                    ? 'primary.main'
                    : 'text.primary'
                }}
              >
                {category.categoryName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}