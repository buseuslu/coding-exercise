import { Box } from '@mui/material';
import PatientsTable from './PatientsTable';
import Header from './Header';

export default function Home() {
  return (
    <Box>
      <Header />
      <PatientsTable />
    </Box>
  );
}
