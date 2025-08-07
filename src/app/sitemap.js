export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://moodbeauty.de`;

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.9,
    },
  ];

  return staticPages;
}