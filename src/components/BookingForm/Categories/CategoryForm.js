"use client";

import {
  Box,
} from "@mui/material";
import CategoryCardBooking from "@/components/CategoryCardBooking/CategoryCardBooking";

export default function CategoryForm({ categories, onCategorySelect }) {

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
        <CategoryCardBooking
          key={category.categoryId}
          title={category.categoryName}
          imageSrc={category.categoryImage}
          imageAlt={category.categoryName}
          onClick={()=> onCategorySelect(category)}
        />
      ))}
    </Box>
  );
}
