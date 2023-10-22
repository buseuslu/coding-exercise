import { createSlice } from '@reduxjs/toolkit';

export const patientsSlice = createSlice({
  name: 'patients',

  initialState: {
    patientData: [],
    editingPatient: null,
  },

  reducers: {
    setPatients: (state, action) => {
      state.patientData = action.payload.patientData;
    },

    addNewPatient: (state, action) => {
      let newPatient = {};
      const hospitalNumber = action.payload.hospitalNumber;
      const firstName = action.payload.firstName;
      const surname = action.payload.surname;
      const gender = action.payload.gender;
      const dateOfBirth = action.payload.dateOfBirth;

      newPatient = {
        hospitalNumber,
        firstName,
        surname,
        gender,
        dateOfBirth,
      };

      let currentPatients = state.patientData;
      currentPatients.push(newPatient);
      state.patientData = currentPatients;
    },

    deletePatient: (state, action) => {
      let hospitalNumber = action.payload.hospitalNumber;
      let patients = state.patientData.filter(
        (patient) => patient.hospitalNumber !== hospitalNumber
      );
      state.patientData = patients;
    },

    setEditingPatient: (state, action) => {
      const hospitalNumber = action.payload.hospitalNumber;

      for (let i = 0; i < state.patientData.length; i++) {
        if (state.patientData[i].hospitalNumber === hospitalNumber) {
          state.editingPatient = state.patientData[i];
          break;
        }
      }
    },

    editPatient: (state, action) => {
      const hospitalNumber = action.payload.hospitalNumber;
      const firstName = action.payload.firstName;
      const surname = action.payload.surname;
      const gender = action.payload.gender;
      const dateOfBirth = action.payload.dateOfBirth;

      for (let i = 0; i < state.patientData.length; i++) {
        if (state.patientData[i].hospitalNumber === hospitalNumber) {
          state.patientData[i].firstName = firstName;
          state.patientData[i].surname = surname;
          state.patientData[i].gender = gender;
          state.patientData[i].dateOfBirth = dateOfBirth;
          break;
        }
      }
    },
  },
});

export const {
  setPatients,
  addNewPatient,
  deletePatient,
  setEditingPatient,
  editPatient,
} = patientsSlice.actions;

export default patientsSlice.reducer;
