import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddPatientDialog from './AddPatientDialog';
import axios from 'axios';
import { setPatients } from '../store/patients';
import { useDispatch, useSelector } from 'react-redux';
import DeletePatientDialog from './DeletePatientDialog';
import EditPatientDialog from './EditPatientDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import './PatientsTable.scss';

export default function PatientsTable() {
  const dispatch = useDispatch();
  const patientData = useSelector((state) => state.patients.patientData);

  useEffect(() => {
    if (patientData.length === 0) {
      axios
        .get('patientData.json')
        .then((response) => {
          let data = response.data;
          dispatch(setPatients({ patientData: data }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [patientData.length, dispatch]);

  return (
    <Box className="patients-table">
      <AddPatientDialog />
      <TableContainer component={Paper}>
        <Table aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell>Hospital Number</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patientData.map((patient) => (
              <TableRow
                id={patient.hospitalNumber}
                key={patient.hospitalNumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.hospitalNumber}
                </TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.surname}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell className="actions">
                  <EditPatientDialog
                    hospitalNumberProp={patient.hospitalNumber}
                  />
                  <DeletePatientDialog
                    hospitalNumberProp={patient.hospitalNumber}
                  />
                  <Link to={`/${patient.hospitalNumber}`}>
                    <Tooltip title="View patient">
                      <IconButton aria-label="view patient">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
