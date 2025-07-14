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
  subCategories,
  services,
}) {
  const [open, setOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCardClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubCategory(null);
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
        {subCategories.map((subCategory) => (
          <Card
            key={subCategory.id}
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
            onClick={() => handleCardClick(subCategory)}
          >
            <CardMedia
              component="img"
              height="200"
              image={subCategory.image}
              alt={subCategory.name}
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
                {subCategory.name}
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

      {selectedSubCategory &&
        <ModalFullScreen
          open={open}
          handleClose={handleClose}
        >
          <BookingFormContainer
            subCategory={selectedSubCategory}
            services={services}
            closeModal={handleClose}
          />
        </ModalFullScreen>
      }
    </>
  );
}
