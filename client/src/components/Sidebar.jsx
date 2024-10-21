/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  PublicOutlined,
  AdminPanelSettingsOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/avatar.svg";
import logo from "@/assets/black.png";

const navItems = [
  {
    text: "Dashboard",
    icon: <PieChartOutlined />,
  },
  {
    text: "DATATEST",
    icon: <HomeOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
];

function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: "#d4c6b6", // Beige background
              boxSizing: "border-box", // Corrected typo from 'boxSixing'
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%" sx={{ overflowY: "scroll" }}>
            <Box m="1.5rem 2rem 1.5rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  width="fit-content"
                >
                  <Typography variant="h4" fontWeight="bold">
                    <Box
                      component="img"
                      alt="profile"
                      src={logo}
                      height="40px"
                      width="150px"
                      borderRadius="100%"
                      sx={{ objectFit: "contain" }} // Change to 'contain'
                    />
                    Dashboard
                  </Typography>
                  {!isNonMobile && (
                    <IconButton
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}
                </Box>
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 2rem" }}
                      color={theme.palette.secondary[300]}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[200] // Active background color
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[900] // Dark color for active state
                            : theme.palette.secondary[900], // Dark color for default state
                        "&:hover": {
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[200] // Active background color on hover
                              : theme.palette.secondary[300], // Darker color on hover
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600] // Dark color for active icon
                              : theme.palette.secondary[900], // Dark color for default icon
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          color:
                            active === lcText
                              ? theme.palette.primary[900] // Dark color for active text
                              : theme.palette.secondary[900], // Dark color for default text
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto", color: theme.palette.primary[600] }} /> // Active chevron color
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1.5rem 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
