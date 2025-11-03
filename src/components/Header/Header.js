"use client";

import { AppBar, Box, Toolbar } from '@mui/material';
import { usePathname } from 'next/navigation';
import LogoLink from '@/components/LogoLink/LogoLink';
import Menu from '@/components/Menu/Menu';

const LINKS = [
  {
    text: `Home`,
    href: `/`,
  },
  {
    text: `Über uns`,
    href: `/ueber-uns`,
  },
  {
    text: `Unsere Services`,
    href: `/services`,
  },
  {
    text: `Preisliste`,
    href: `/preisliste`,
  },
  {
    text: `Online Termin`,
    href: `/booking`,
  },
  {
    text: `Datenschutz`,
    href: `/datenschutz`,
    subLink: true,
  },
  {
    text: `Impressum`,
    href: `/impressum`,
    subLink: true,
  },
];

export default function Header() {
  const pathname = usePathname();
  const isBooking = pathname?.startsWith(`/booking`);

  return (
    <>
      <AppBar
        position={isBooking ? `static` : `sticky`}
        color="transparent"
      >
        <Toolbar sx={{ px: 2 }}>
          <Box
            sx={{
              maxWidth: `1200px`,
              margin: `0 auto`,
              width: `100%`,
              display: `flex`,
              alignItems: `center`,
            }}
          >
            <LogoLink />
            <Box sx={{ marginLeft: `auto` }}>
              <Menu links={LINKS} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}


