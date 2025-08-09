import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function CategoryForm({
  categories,
  onCategorySelect,
  selectedCategory,
}) {

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} key={category.categoryId}>
          <Card
            sx={{
              boxShadow: `none`,
              borderRadius: `16px`,
              backgroundColor: `background.alternate`,
              border: `1px solid`,
              borderColor: selectedCategory?.categoryId === category.categoryId
                ? (theme) => alpha(theme.palette.primary.main, 0.25)
                : `rgba(0,0,0,0.06)`,
              overflow: `hidden`,
              transition: `transform .15s ease, border-color .15s ease`,
              '&:hover': { transform: `translateY(-1px)` },
            }}
          >
            <CardActionArea
              onClick={() => onCategorySelect(category)}
              disabled={selectedCategory?.categoryId === category.categoryId}
              sx={{
                alignItems: `stretch`,
                position: `relative`,
                display: `block`,
              }}>
              {category.categoryImage && (
                <CardMedia
                  component="img"
                  height="180"
                  image={category.categoryImage}
                  alt={category.categoryName}
                  sx={{ objectFit: `cover` }}
                />
              )}

              {/* Overlay label */}
              <Box sx={{
                position: `absolute`,
                left: 0,
                right: 0,
                bottom: 0,
                px: 2,
                py: 1.2,
                display: `flex`,
                alignItems: `center`,
                backgroundColor: `rgba(255,255,255,0.75)`,
              }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: `.01em`,
                    color: `text.primary`,
                  }}
                >
                  {category.categoryName}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
