"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo/Logo";

export default function LogoLink() {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <Box 
      sx={{ 
        width: "250px", 
        maxWidth: "90%", 
        height: "90px", 
        position: "relative" 
      }}
    >
      {isMainPage ? (
        <Logo 
          style={{ 
            position: "absolute", 
            top: "50%", 
            transform: "translateY(-50%)" 
          }} 
        />
      ) : (
        <Link 
          href="/" 
          sx={{ 
            textDecoration: "none" 
          }}>
          <Logo 
            style={{ 
              position: "absolute", 
              top: "50%", 
              transform: "translateY(-50%)" 
            }}
          />
        </Link>
      )}
    </Box>
  );
}
