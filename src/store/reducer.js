import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userDataSlice from "./userDataSlice";
import patientReducer from "./patientSlice";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  userData: userDataSlice,
  patient: patientReducer,
});

export default reducer;
