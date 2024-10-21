/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  LinkedIn,
  GitHub,
  Phone,
  Email,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

import { setMode } from "@/state";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/avatar.svg";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        px: ".5em",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween sx={{ gap: "1em" }}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1em">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Ranish Jamode
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
          
          {/* Social Links and Contact Info */}
          <Box display="flex" alignItems="center" gap="1em">
            <IconButton onClick={() => window.open('https://www.linkedin.com/in/ranishjamode', '_blank')}>
              <LinkedIn />
            </IconButton>
            <IconButton onClick={() => window.open('https://github.com/ranishrocks', '_blank')}>
              <GitHub />
            </IconButton>
            <IconButton onClick={() => window.open('tel:+919067136802')}>
              <Phone />
            </IconButton>
            <IconButton onClick={() => window.open('mailto:ranishjamode@gmail.com')}>
              <Email />
            </IconButton>
            <Typography variant="body2" sx={{ color: theme.palette.secondary[100] }}>
              +91 90671 36802
              <Typography sx={{ color: theme.palette.secondary[100] }}>
              ranishjamode@gmail.com
            </Typography>
            </Typography>
          </Box>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
