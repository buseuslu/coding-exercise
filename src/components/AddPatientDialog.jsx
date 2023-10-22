import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPatient } from '../store/patients';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { colors } from '../utils/colors';
import './AddPatientDialog.scss';

export default function AddPatientDialog() {
  const [open, setOpen] = useState(false);
  const [hospitalNumber, setHospitalNumber] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    hospitalNumber && firstName && surname && gender && dateOfBirth
      ? setDisable(false)
      : setDisable(true);
  }, [hospitalNumber, firstName, surname, gender, dateOfBirth]);

  const addPatient = () => {
    dispatch(
      addNewPatient({
        hospitalNumber,
        firstName,
        surname,
        gender,
        dateOfBirth,
      })
    );
  };

  const handleHospitalNumberChange = (event) => {
    setHospitalNumber(Number(event.target.value));
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value.trimStart());
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateOfBirthChange = (newValue) => {
    const formattedDate = newValue?.format('DD/MM/YYYY');

    setDateOfBirth(formattedDate);
  };

  const onKeyDownIntTypeHandler = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        className="add-patient-button"
        variant="outlined"
        sx={{ my: 2 }}
        onClick={handleClickOpen}
      >
        Add Patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">Add new patient</DialogTitle>

        <DialogContent className="dialog-content">
          <TextField
            margin="dense"
            id="hospital-number"
            label="Hospital Number"
            type="Number"
            required
            onWheel={(event) => event.target.blur()}
            onKeyDown={onKeyDownIntTypeHandler}
            onChange={handleHospitalNumberChange}
          />

          <TextField
            margin="dense"
            id="first-name"
            label="First Name"
            required
            onChange={handleFirstNameChange}
          />

          <TextField
            margin="dense"
            id="surname"
            label="Surname"
            required
            onChange={handleSurnameChange}
          />

          <FormControl sx={{ mt: 1 }}>
            <InputLabel
              id="select-gender"
              style={{ color: colors.lightgrey }}
              required
            >
              Gender
            </InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender"
              label="Select gender"
              value={gender}
              onChange={handleGenderChange}
            >
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
            </Select>
          </FormControl>

          <InputLabel
            id="select-gender"
            style={{ color: colors.lightgrey, marginTop: '8px' }}
            required
          >
            Date of Birth
          </InputLabel>
          <DatePicker
            id="date-of-birth"
            name="dateOfBirth"
            format="DD/MM/YYYY"
            autoComplete="off"
            value={dayjs(dateOfBirth)}
            slotProps={{
              textField: {
                error: false,
                fullWidth: true,
                required: true,
              },
            }}
            onChange={(newValue) => {
              handleDateOfBirthChange(newValue);
            }}
          />

          <Typography
            variant="body2"
            style={{ color: colors.lightgrey, marginTop: '8px' }}
          >
            *Required Fields
          </Typography>
        </DialogContent>

        <DialogActions sx={{ mb: 2 }}>
          <Button
            sx={{ mr: 1 }}
            variant="outlined"
            onClick={() => {
              handleClose();
              setGender('');
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            disabled={disable}
            onClick={() => {
              addPatient();
              handleClose();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
