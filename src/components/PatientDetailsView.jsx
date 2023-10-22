import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { colors } from '../utils/colors';
import Header from './Header';
import './PatientDetailsView.scss';

export default function PatientDetailsView() {
  const data = useParams();

  const patientData = useSelector((state) => state.patients.patientData);

  const thisPatient = patientData.find(
    (prod) => prod.hospitalNumber === Number(data.hospitalNumber)
  );

  return (
    <Box>
      {patientData.length === 0 ? (
        <Navigate to="*" />
      ) : (
        <Box>
          <Header />
          <Box className="patient-details-container">
            <Box className="patient-detail">
              <Typography variant="h5">Patient Details</Typography>
            </Box>
            <Box className="patient-detail">
              <Typography variant="subtitle1" color={colors.blue}>
                Hospital Number
              </Typography>
              <Typography variant="body1">
                {thisPatient.hospitalNumber}
              </Typography>
            </Box>
            <Box className="patient-detail">
              <Typography variant="subtitle1" color={colors.blue}>
                First Name
              </Typography>
              <Typography variant="body1">{thisPatient.firstName}</Typography>
            </Box>
            <Box className="patient-detail">
              <Typography variant="subtitle1" color={colors.blue}>
                Surname
              </Typography>
              <Typography variant="body1">{thisPatient.surname}</Typography>
            </Box>
            <Box className="patient-detail">
              <Typography variant="subtitle1" color={colors.blue}>
                Gender
              </Typography>
              <Typography variant="body1">{thisPatient.gender}</Typography>
            </Box>
            <Box className="patient-detail">
              <Typography variant="subtitle1" color={colors.blue}>
                Date of Birth
              </Typography>
              <Typography variant="body1">{thisPatient.dateOfBirth}</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
