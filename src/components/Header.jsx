import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box>
          <Link
            to={'/'}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button color="inherit">Patient Table</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
