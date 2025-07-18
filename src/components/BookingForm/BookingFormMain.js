'use client';

import { useState, useEffect } from 'react';
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import CategoryCardBooking from "@/components/CategoryCardBooking/CategoryCardBooking";
import HeaderBooking from "@/components/HeaderBooking/HeaderBooking";
import SubCategoryCardBooking from "@/components/SubCategoryCardBooking/SubCategoryCardBooking";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import BookingFormContainer from "@/components/BookingForm/BookingFormContainer";
import { slugify } from "@/utils/slugify";

export default function BookingFormMain({ categories }) {
  const [currentView, setCurrentView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Гидрация
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleCategoryClick = (category) => {
    if (!isHydrated) return;

    setSelectedCategory(category);
    setCurrentView('subcategories');
  };

  const handleSubCategoryClick = (subCategory) => {
    if (!isHydrated) return;

    setSelectedSubCategory(subCategory);
    setCurrentView('services');
  };

  const handleServiceClick = (service) => {
    if (!isHydrated) return;

    setSelectedService(service);
    setCurrentView('booking');
  };

  const handleBackToCategories = () => {
    if (!isHydrated) return;

    setCurrentView('categories');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedService(null);
  };

  const handleBackToSubCategories = () => {
    if (!isHydrated) return;

    setCurrentView('subcategories');
    setSelectedSubCategory(null);
    setSelectedService(null);
  };

  const handleBackToServices = () => {
    if (!isHydrated) return;

    setCurrentView('services');
    setSelectedService(null);
  };

  return (
    <Box bgcolor="background.default">
      <Container>
        <Box
          sx={{
            display: `flex`,
            flexDirection: `column`,
            padding: `30px 0`,
          }}
        >
          {/* Заголовок */}
          {currentView === 'categories' && (
            <Typography
              sx={{
                textAlign: `center`,
                fontSize: `2rem !important`,
              }}
              variant="h1"
            >
              Für welche Prozedur möchten Sie sich anmelden?
            </Typography>
          )}

          {/* Кнопки назад */}
          {isHydrated && currentView === 'subcategories' && (
            <Button
              onClick={handleBackToCategories}
              sx={{
                color: `primary.main`,
                '&:hover': { backgroundColor: `rgba(0, 0, 0, 0.04)` },
                marginBottom: `1.2rem`,
                textDecoration: 'none',
                justifyContent: 'flex-start',
              }}
              startIcon={<ArrowBack />}
            >
              Zurück zur Kategorieauswahl
            </Button>
          )}

          {isHydrated && currentView === 'services' && (
            <Button
              onClick={handleBackToSubCategories}
              sx={{
                color: `primary.main`,
                '&:hover': { backgroundColor: `rgba(0, 0, 0, 0.04)` },
                marginBottom: `1.2rem`,
                textDecoration: 'none',
                justifyContent: 'flex-start',
              }}
              startIcon={<ArrowBack />}
            >
              Zurück zu {selectedCategory?.categoryName}
            </Button>
          )}

          {isHydrated && currentView === 'booking' && (
            <Button
              onClick={handleBackToServices}
              sx={{
                color: `primary.main`,
                '&:hover': { backgroundColor: `rgba(0, 0, 0, 0.04)` },
                marginBottom: `1.2rem`,
                textDecoration: 'none',
                justifyContent: 'flex-start',
              }}
              startIcon={<ArrowBack />}
            >
              Zurück zu {selectedSubCategory?.subCategoryName}
            </Button>
          )}

          {/* Заголовки для подстраниц */}
          {currentView === 'subcategories' && selectedCategory && (
            <HeaderBooking title={selectedCategory.categoryName} />
          )}

          {currentView === 'services' && selectedSubCategory && (
            <HeaderBooking title={selectedSubCategory.subCategoryName} />
          )}

          {/* Категории */}
          {currentView === 'categories' && (
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
                  onClick={isHydrated ? () => handleCategoryClick(category) : null}
                />
              ))}
            </Box>
          )}

          {/* Подкатегории */}
          {isHydrated && currentView === 'subcategories' && selectedCategory?.subCategories && (
            <Box sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
              gap: `2rem`,
              mt: `2rem`,
            }}>
              {selectedCategory.subCategories.map((subCategory) => (
                <SubCategoryCardBooking
                  key={subCategory.subCategoryId}
                  title={subCategory.subCategoryName}
                  imageSrc={subCategory.subCategoryImage}
                  imageAlt={subCategory.subCategoryName}
                  subCategory={subCategory}
                  onSubCategoryClick={() => handleSubCategoryClick(subCategory)}
                />
              ))}
            </Box>
          )}

          {/* Сервисы */}
          {isHydrated && currentView === 'services' && selectedSubCategory?.services && (
            <Box sx={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
              gap: `2rem`,
              mt: `2rem`,
            }}>
              {selectedSubCategory.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.name}
                  description={service.bookingNote}
                  price={service.employees?.length > 0 ? Math.min(...service.employees.map(emp => emp.price)) : 0}
                  duration={service.durationTime}
                  imageSrc={service.image || '/images/placeholder-service.jpg'}
                  imageAlt={service.name}
                  onClick={() => handleServiceClick(service)}
                />
              ))}
            </Box>
          )}

          {/* Форма бронирования */}
          {isHydrated && currentView === 'booking' && selectedService && (
            <BookingFormContainer
              service={selectedService}
              selectedService={selectedService}
              selectedSubCategory={selectedSubCategory}
              categorySlug={slugify(selectedCategory?.categoryName)}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}