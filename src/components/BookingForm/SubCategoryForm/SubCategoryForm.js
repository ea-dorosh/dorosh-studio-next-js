import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
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
        backgroundColor: `background.alternate`,
        overflow: `hidden`,
        borderRadius: `16px`,
      }}
    >
      <List disablePadding>
        {subCategories.map((subCategory, index) => {
          const isSelected = selectedSubCategory?.subCategoryId === subCategory.subCategoryId;
          return (
            <ListItemButton
              key={subCategory.subCategoryId}
              onClick={() => onSubCategorySelect(subCategory)}
              selected={isSelected}
              sx={{
                py: 1.5,
                px: 3,
                mb: index !== subCategories.length - 1 ? 0.5 : 0,
                borderRadius: `12px`,
                backgroundColor: isSelected ? (theme) => alpha(theme.palette.primary.main, 0.1) : `transparent`,
                '&:hover': { backgroundColor: isSelected ? (theme) => alpha(theme.palette.primary.main, 0.1) : `transparent` },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isSelected ? `primary.main` : `text.secondary`,
                }}
              >
                {isSelected ? <CheckCircleRounded /> : <RadioButtonUnchecked />}
              </ListItemIcon>

              <ListItemText
                primary={subCategory.subCategoryName}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: isSelected ? 700 : 500,
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
