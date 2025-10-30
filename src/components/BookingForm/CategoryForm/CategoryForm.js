import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function CategoryForm({
  categories,
  onCategorySelect,
}) {

  return (
    <Grid
      container
      spacing={2}
    >
      {categories.map((category) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={category.categoryId}
        >
          <Card
            sx={{
              boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
              borderRadius: `20px`,
              backgroundColor: `background.paper`,
              border: `none`,
              overflow: `hidden`,
            }}
          >
            <CardActionArea
              onClick={() => onCategorySelect(category)}
              sx={{
                alignItems: `stretch`,
                position: `relative`,
                display: `block`,
                '&:hover': { backgroundColor: `transparent` },
              }}
            >
              {category.categoryImage ? (
                <CardMedia
                  component="img"
                  image={category.categoryImage}
                  alt={category.categoryName}
                  sx={{
                    aspectRatio: `16 / 9`,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: 180,
                    backgroundColor: (theme) => theme.palette.grey[100],
                    backgroundImage: `linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)`,
                  }}
                />
              )}

              {/* Overlay label */}
              <Box
                sx={{
                  position: `absolute`,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  px: 3,
                  py: 1.5,
                  display: `flex`,
                  alignItems: `center`,
                  background: `linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)`,
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: `.02em`,
                    color: `#ffffff`,
                    textShadow: `0 1px 2px rgba(0,0,0,0.3)`,
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
