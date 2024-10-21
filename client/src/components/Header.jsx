import { Typography, Box, useTheme } from "@mui/material";

function Header({ title, subtitle }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.primary.main} // Use primary color by default
        fontWeight="bold"
        sx={{
          mb: "5px",
          letterSpacing: '0.5px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
          transition: 'color 0.3s ease', // Smooth transition for color change
          '&:hover': {
            color: theme.palette.secondary.main, // Change color on hover
          }
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h5" 
        color={theme.palette.secondary.main} // Use secondary main color
        sx={{ fontStyle: 'italic', opacity: 0.8 }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
