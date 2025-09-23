"use client";

import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Skip breadcrumbs for main pages
  const mainPages = [`/`, `/ueber-uns`, `/services`, `/booking`];
  if (mainPages.includes(pathname)) {
    return null;
  }

  const generateBreadcrumbs = () => {
    const segments = pathname.split(`/`).filter(Boolean);
    const breadcrumbs = [
      {
        label: `Home`,
        href: `/`,
        current: false,
      },
    ];

    let currentPath = ``;

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      // Map segment to readable label
      let label = segment;
      switch (segment) {
      case `services`:
        label = `Services`;
        break;
      case `nails`:
        label = `Maniküre & Pediküre`;
        break;
      case `permanent-make-up`:
        label = `Permanent Make-Up`;
        break;
      case `powder-brows`:
        label = `Powder Brows`;
        break;
      case `hairstroke`:
        label = `Hairstroke`;
        break;
      case `velvet-lips`:
        label = `Velvet Lips`;
        break;
      case `wimpernkranz`:
        label = `Wimpernkranz`;
        break;
      case `booking`:
        label = `Termin buchen`;
        break;
      case `ueber-uns`:
        label = `Über uns`;
        break;
      case `impressum`:
        label = `Impressum`;
        break;
      case `datenschutz`:
        label = `Datenschutz`;
        break;
      default:
        // Capitalize first letter and replace hyphens with spaces
        label = segment
          .split(`-`)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(` `);
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        backgroundColor: `background.default`,
        borderBottom: 1,
        borderColor: `divider`,
        maxWidth: `1200px`,
        margin: `0 auto`,
      }}
    >
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': { color: `text.secondary` },
          fontSize: {
            xs: `0.875rem`,
            md: `1rem`,
          },
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          if (breadcrumb.current) {
            return (
              <Typography
                key={index}
                color="text.primary"
                sx={{
                  fontWeight: 500,
                  fontSize: {
                    xs: `0.875rem`,
                    md: `1rem`,
                  },
                }}
              >
                {breadcrumb.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              component={NextLink}
              href={breadcrumb.href}
              color="text.secondary"
              underline="hover"
              sx={{
                textDecoration: `none`,
                '&:hover': { textDecoration: `underline` },
                fontSize: {
                  xs: `0.875rem`,
                  md: `1rem`,
                },
              }}
            >
              {breadcrumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
