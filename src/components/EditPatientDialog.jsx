import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPatient, setEditingPatient } from '../store/patients';
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { colors } from '../utils/colors';

export default function EditPatientDialog({ hospitalNumberProp }) {
  const [open, setOpen] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [disable, setDisable] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState('');

  const editingPatient = useSelector((state) => state.patients.editingPatient);
  const dispatch = useDispatch();

  let { firstName, surname, gender, dateOfBirth } = editingPatient || {};

  useEffect(() => {
    if (open === true) {
      setPatientData({
        ...patientData,
        newFirstName: firstName,
        newSurname: surname,
        newGender: gender,
        newDateOfBirth: dayjs(dateOfBirth, 'DD/MM/YYYY'),
      });
    } else {
      setPatientData({
        ...patientData,
        newFirstName: null,
        newSurname: null,
        newGender: null,
        newDateOfBirth: null,
      });
    }
  }, [open, firstName, surname, gender, dateOfBirth]);

  useEffect(() => {
    patientData.newFirstName &&
    patientData.newSurname &&
    patientData.newGender &&
    patientData.newDateOfBirth
      ? setDisable(false)
      : setDisable(true);
  }, [
    patientData.newFirstName,
    patientData.newSurname,
    patientData.newGender,
    patientData.newDateOfBirth,
  ]);

  const handleStringTypeDataChange = (event) => {
    const { name, value } = event.target;

    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleDateTypeDataChange = (newValue) => {
    setPatientData({
      ...patientData,
      newDateOfBirth: newValue,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditPatient = () => {
    dispatch(
      editPatient({
        hospitalNumber: hospitalNumberProp,
        firstName: patientData.newFirstName,
        surname: patientData.newSurname,
        gender: patientData.newGender,
        dateOfBirth: patientData.newDateOfBirth.format('DD/MM/YYYY'),
      })
    );

    setSuccessAlertContent('Changes saved!');
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 1000);
  };

  return (
    <Box>
      <Tooltip title="Edit patient">
        <IconButton
          aria-label="edit patient"
          onClick={() => {
            dispatch(setEditingPatient({ hospitalNumber: hospitalNumberProp }));
            handleClickOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Edit patient</DialogTitle>

        <DialogContent>
          <Typography sx={{ fontSize: 12, color: colors.blue }}>
            Hospital Number
          </Typography>
          <Typography>{hospitalNumberProp || ''}</Typography>
          <TextField
            sx={{ mt: 2 }}
            margin="dense"
            id="first-name"
            label="First Name"
            fullWidth
            variant="standard"
            value={patientData.newFirstName || ''}
            name="newFirstName"
            error={!patientData.newFirstName}
            helperText={
              patientData.newFirstName ? '' : 'First Name field is required.'
            }
            onChange={handleStringTypeDataChange}
          />

          <TextField
            sx={{ mt: 2 }}
            margin="dense"
            id="surname"
            label="Surname"
            fullWidth
            variant="standard"
            value={patientData.newSurname || ''}
            name="newSurname"
            error={!patientData.newSurname}
            helperText={
              patientData.newSurname ? '' : 'Surname field is required.'
            }
            onChange={handleStringTypeDataChange}
          />

          <InputLabel
            id="select-gender"
            style={{ color: colors.lightgrey, marginTop: '16px' }}
          >
            Gender
          </InputLabel>
          <Select
            id="gender-select"
            label="Select gender"
            fullWidth
            value={patientData.newGender || ''}
            name="newGender"
            onChange={handleStringTypeDataChange}
          >
            <MenuItem value={'Female'}>Female</MenuItem>
            <MenuItem value={'Male'}>Male</MenuItem>
          </Select>

          <InputLabel
            id="select-dob"
            style={{ color: colors.lightgrey, marginTop: '16px' }}
          >
            Date of Birth
          </InputLabel>
          <DatePicker
            format="DD/MM/YYYY"
            autoComplete="off"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !patientData.newDateOfBirth,
                helperText: patientData.newDateOfBirth
                  ? ''
                  : 'Date of Birth field is required.',
              },
            }}
            value={patientData.newDateOfBirth || null}
            name="dateOfBirth"
            onChange={(newValue) => {
              handleDateTypeDataChange(newValue);
            }}
          />
        </DialogContent>

        {successAlert && (
          <Alert sx={{ mx: 3, mb: 1 }} severity="success">
            {successAlertContent}
          </Alert>
        )}

        <DialogActions sx={{ mb: 2 }}>
          <Button sx={{ mr: 1 }} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            disabled={disable}
            onClick={handleEditPatient}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
