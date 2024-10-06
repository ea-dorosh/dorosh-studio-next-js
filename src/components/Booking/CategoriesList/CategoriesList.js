"use client";

import { 
  Box, 
  Typography,
  Card, 
  CardContent, 
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import BookingModal from "@/components/Booking/BookingModal/BookingModal";

export default function CategoryList({ categories, services }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <Box
        sx={{
          display: `flex`,
          flexDirection: `column`,
          gap: `2rem`,
          mt: `2rem`,
        }}
      >
        {categories.map((category) => (
          <Card
            key={category.id}
            sx={{
              backgroundColor: `background.secondary`,
              position: `relative`,
              overflow: `hidden`,
              transition: `transform 0.3s`,
              cursor: `pointer`,
              '&:hover': {
                transform: `scale(1.02)`,
              },
            }}
            onClick={() => handleCardClick(category)}
          >
            <CardMedia
              component="img"
              height="200"
              image={category.image}
              alt={category.name}
              sx={{
                objectFit: `cover`,
              }}
            />
            <CardContent>
              <Typography
                variant="h3"
                sx={{ 
                  textAlign: `left`, 
                  fontSize: `1.2rem`,
                }}
              >
                {category.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ 
                  textAlign: `left`, 
                  fontSize: `1rem`,
                }}
              >
                Permanent Make-up
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {selectedCategory && (
        <BookingModal
          open={open}
          handleClose={handleClose}
          category={selectedCategory}
          services={services}
        />
      )}
    </>
  );
}
