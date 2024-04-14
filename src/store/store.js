import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import patientReducer from "./patientSlice";

const rootReducer = combineReducers({
    userData: userDataSlice,
    patient: patientReducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
  });
  

export default store;