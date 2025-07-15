import servicesService from "@/services/services.service";
import { slugify } from "@/utils/slugify";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dorosh-studio.de';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const categories = await servicesService.getServices();
  const dynamicPages = [];

  categories.forEach((category) => {
    const categorySlug = slugify(category.categoryName);

    dynamicPages.push({
      url: `${baseUrl}/booking/${categorySlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    category.subCategories.forEach((subCategory) => {
      dynamicPages.push({
        url: `${baseUrl}/booking/${categorySlug}/${subCategory.subCategoryUrl}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });

      // Страницы сервисов
      subCategory.services.forEach((service) => {
        dynamicPages.push({
          url: `${baseUrl}/booking/${categorySlug}/${subCategory.subCategoryUrl}/${service.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      });
    });
  });

  return [...staticPages, ...dynamicPages];
}