// patientSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    demographicData: {},
    kinData: {},
    contactData: {},
    socialDetailsData: {},
  },
  reducers: {
    setDemographicData: (state, action) => {
      state.demographicData = action.payload;
    },
    setKinData: (state, action) => {
      state.kinData = action.payload;
    },
    setContactData: (state, action) => {
      state.contactData = action.payload;
    },
    setSocialDetailsData: (state, action) => {
      state.socialDetailsData = action.payload;
    },
  },
});

export const {
  setDemographicData,
  setKinData,
  setContactData,
  setSocialDetailsData,
} = patientSlice.actions;

export const selectPatient = (state) => state.patient;

export default patientSlice.reducer;
