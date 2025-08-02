'use client'

import {
  Close as CloseIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import * as React from "react";

export default function Menu({ links }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginRight: `-4px`,}}>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,
          width: `30px`,
        }}
      >
        <MenuIcon
          fontSize='large'
          color="primary"
        />
      </IconButton>

      <Drawer
        open={open}
        sx={{
          width: `100%`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            bgcolor: `background.default`,
            width: `100%`,
            height: `auto`,
            bottom: 0,
            padding: `0 24px`,
          },
        }}
        variant="temporary"
        anchor="right"
      >
        <Box sx={{
          position: `absolute`,
          top: `8px`,
          right: `4px`,
          zIndex: 1201,
        }}>
          <IconButton onClick={handleClose}>
            <CloseIcon
              fontSize='large'
              color="primary"
            />
          </IconButton>
        </Box>

        <List sx={{
          paddingTop: `170px`,
        }}>
          {links.filter(({ subLink }) => !subLink).map(({ text, href }) => (
            <ListItem
              key={href}
              disablePadding
              onClick={handleClose}
            >
              <ListItemButton
                component={Link}
                href={href}
              >
                <ListItemText
                  primary={text}
                  color="primary"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: `1.8rem`,
                      textAlign: `center`,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List sx={{
          paddingTop: `100px`,
        }}>
          {links.filter(({ subLink }) => subLink).map(({ text, href }) => (
            <ListItem key={href} disablePadding onClick={handleClose}>
              <ListItemButton component={Link} href={href}>
                <ListItemText
                  primary={text}
                  color="primary"
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: `1.4rem`,
                      textAlign: `center`,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
