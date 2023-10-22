import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './patients';

export default configureStore({
  reducer: {
    patients: patientsReducer,
  },
});
