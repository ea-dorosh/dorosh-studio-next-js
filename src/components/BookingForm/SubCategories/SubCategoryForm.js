"use client";

import {
  Box,
} from "@mui/material";
import SubCategoryCardBooking from "@/components/SubCategoryCardBooking/SubCategoryCardBooking";

export default function SubCategoryForm({ subCategories, onSubCategorySelect }) {

  return (
    <Box
      sx={{
      display: `flex`,
      flexDirection: `column`,
      gap: `2rem`,
      mt: `2rem`,
      }}
    >
      {subCategories.map((subCategory) => (
        <SubCategoryCardBooking
          key={subCategory.subCategoryId}
          title={subCategory.subCategoryName}
          imageSrc={subCategory.subCategoryImage}
          imageAlt={subCategory.subCategoryName}
          subCategory={subCategory}
          onClick={()=> onSubCategorySelect(subCategory)}
        />
      ))}
    </Box>
  );
}
