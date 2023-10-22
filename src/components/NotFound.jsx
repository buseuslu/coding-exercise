import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function NotFound() {
  return (
    <Box>
      <Header />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mt: 2 }}>
          Page not found!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Sorry, this page does not exist.
        </Typography>
        <Box>
          <Link
            to={'/'}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button sx={{ mt: 2 }}>
              <Typography>Return Home</Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
