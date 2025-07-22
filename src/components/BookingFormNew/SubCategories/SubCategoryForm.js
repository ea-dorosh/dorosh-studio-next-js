import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

export default function SubCategoryForm({ subCategories, onSubCategorySelect, selectedSubCategory }) {
  return (
    <Grid container spacing={2}>
      {subCategories.map((subCategory) => (
        <Grid item xs={12} sm={6} md={4} key={subCategory.subCategoryId}>
          <Card
            sx={{
              cursor: 'pointer',
              border: selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                ? '3px solid'
                : '1px solid',
              borderColor: selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                ? 'primary.main'
                : 'grey.300',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              }
            }}
            onClick={() => onSubCategorySelect(subCategory)}
          >
            {subCategory.subCategoryImage && (
              <CardMedia
                component="img"
                height="140"
                image={subCategory.subCategoryImage}
                alt={subCategory.subCategoryName}
                sx={{ objectFit: 'cover' }}
              />
            )}
            <CardContent>
              <Typography
                variant="h6"
                component="h3"
                textAlign="center"
                sx={{
                  fontWeight: selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                    ? 'bold'
                    : 'normal',
                  color: selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                    ? 'primary.main'
                    : 'text.primary'
                }}
              >
                {subCategory.subCategoryName}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}