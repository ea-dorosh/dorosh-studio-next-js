import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

export default function SubCategoryForm({ subCategories, onSubCategorySelect, selectedSubCategory }) {
  return (
    <Grid container spacing={2}>
      {subCategories.map((subCategory) => (
        <Grid item xs={12} sm={6} md={4} key={subCategory.subCategoryId}>
          <Card
            sx={{
              boxShadow: `none`,
              borderRadius: `12px`,
              backgroundColor: `background.default`,
            }}
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
                  color: selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                    ? `primary.main`
                    : `text.primary`
                }}
              >
                {subCategory.subCategoryName}
              </Typography>

              <Button
                sx={{
                  marginTop: `8px`,
                  width: `160px`,

                }}
                color={selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                  ? `primary`
                  : `info`}
                size="small"
                variant={selectedSubCategory?.subCategoryId === subCategory.subCategoryId
                  ? `outlined`
                  : `contained`}
                onClick={() => onSubCategorySelect(subCategory)}
              >
                {selectedSubCategory?.subCategoryId === subCategory.subCategoryId
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
