import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { alpha } from '@mui/material/styles';

export default function SubCategoryForm({
  subCategories,
  onSubCategorySelect,
  selectedSubCategory,
}) {
  return (
    <Box
      sx={{
        borderRadius: `16px`,
        backgroundColor: `background.alternate`,
        overflow: `hidden`,
      }}
    >
      <List disablePadding>
        {subCategories.map((subCategory, index) => {
          const isSelected = selectedSubCategory?.subCategoryId === subCategory.subCategoryId;
          return (
            <ListItemButton
              key={subCategory.subCategoryId}
              onClick={() => onSubCategorySelect(subCategory)}
              divider={index !== subCategories.length - 1}
              selected={isSelected}
              sx={{
                py: 1.25,
                px: 2,
                '&:hover': { backgroundColor: `transparent` },
                '&.Mui-selected': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  '&:hover': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  },
                },
              }}
            >
              <ListItemText
                primary={subCategory.subCategoryName}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 600,
                    letterSpacing: `.01em`,
                    color: isSelected ? `primary.main` : `text.primary`,
                    fontSize: `1.1rem`,
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
