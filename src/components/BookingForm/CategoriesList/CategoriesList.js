"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import BookingFormContainer from "@/components/BookingForm/BookingFormContainer";
import ModalFullScreen from "@/components/ModalFullScreen/ModalFullScreen";

export default function CategoryList({
  categories,
  services,
}) {
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
              backgroundColor: `primary.main`,
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
                color="secondary.main"
              >
                {category.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: `left`,
                  fontSize: `1rem`,
                }}
                color="secondary.main"
              >
                Permanent Make-up
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {selectedCategory &&
        <ModalFullScreen
          open={open}
          handleClose={handleClose}
        >
          <BookingFormContainer
            category={selectedCategory}
            services={services}
            closeModal={handleClose}
          />
        </ModalFullScreen>
      }
    </>
  );
}
