import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 4, display: 'flex', fontWeight: 700 }}
          >
            Campus Notifications
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: 'white',
                borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
                borderRadius: 0
              }}
            >
              All Notifications
            </Button>
            <Button
              component={Link}
              to="/priority"
              sx={{
                color: 'white',
                borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none',
                borderRadius: 0
              }}
            >
              Priority Notifications
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
