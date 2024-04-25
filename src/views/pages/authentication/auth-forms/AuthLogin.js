import { useState } from 'react';
// import { useSelector } from 'react-redux';

import {
  fetchForgetPin,
  fetchLogin,
  fetchLoginUserID,
} from "../../../../assets/data";

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  // Button,
  // Checkbox,
  Divider,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery

} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo2';
import { Link } from 'react-router-dom';

import ChangePin from '../auth-forms/ChangePin';
import { PrimeGreenButton, PrimeBlueButton } from '../../../../ui-component/Button';
import config from '../../../../config';

import { useDispatch } from "react-redux";
import { setUserData, setUserPassNo } from "../../../../store/userDataSlice";
import CustomLoader from '../../../../ui-component/CustomLoader';


// const action = { setUserData,  setUserPassNo };

const FirebaseLogin = ({ ...others }) => {

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phoneno: "", pin: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [loading, setLoading] = useState(false);

 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgotPin = async () => {

    const mobileNumber = formData?.phoneno;

    if (!mobileNumber) {
      toast.error("Mobile No is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (mobileNumber.length !== 10) {
      toast.error("Mobile No must be 10 digits", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const data = {
        COCD: "1",
        LOCCD: 1,
        DIVCD: 1,
        UserMobileNo: formData.phoneno,
        PINCode: "0",
      };

      const datares = JSON.stringify(data);

      const LoginData = await fetchLogin(datares);

      if (LoginData?.RecordSaved) {
        const userid = await fetchLoginUserID(mobileNumber);
        const UserID = userid?.UserID;

        const data = await fetchForgetPin(mobileNumber, UserID);

        if (data?.RecordSaved) {
          setIsModalOpen(true);
        }
      } else {
        toast.error(LoginData?.ReturnMsg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // Proceed with the rest of the logic

    }
  };

  const handleChangePin = async () => {

    const mobileNumber = formData?.phoneno;

    if (!mobileNumber) {
      toast.error("Mobile No is required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (mobileNumber.length !== 10) {
      toast.error("Mobile No must be 10 digits", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {

      const data = {
        COCD: "1",
        LOCCD: 1,
        DIVCD: 1,
        UserMobileNo: formData.phoneno,
        PINCode: "0",
      };

      const datares = JSON.stringify(data);

      const LoginData = await fetchLogin(datares);

      if (LoginData?.RecordSaved) {
        setShowChangePin(true)

      } else {
        toast.error(LoginData?.ReturnMsg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  const handleOkClick = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setShowChangePin(false);
    setFormData(() => ({
      ...formData,
      ['phoneno']: "",
    }));
  };

  const changedPin = () => {
    setShowChangePin(false);
  };

  const setValue = (formData) => {
    dispatch(setUserData(formData.phoneno));
    dispatch(setUserPassNo(formData.pin));
  }

  return (
    <>
      {showChangePin ? (
          <ChangePin
            handleCancel={handleCancel}
            formData={formData}
            changedPin={changedPin}
          />
        ) : (
          <AuthCardWrapper>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item sx={{ mb: 3 }}>
                  <Logo />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                      <Typography color={config.color.prime} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                        Hi, Welcome Back
                      </Typography>
                      <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                        Enter your credentials to continue
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column" justifyContent="center" spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">Sign in with Mobile No</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Formik
                  initialValues={{
                    phoneno: '',
                    pin: '',
                    submit: null
                  }}

                  validationSchema={Yup.object().shape({
                    phoneno: Yup.string().max(10).required('Mobile No is required'),
                    pin: Yup.string().max(4).required('Pin is required')
                  })}

                  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                    setLoading(true);

                    const data = {
                      COCD: "1",
                      LOCCD: 1,
                      DIVCD: 1,
                      UserMobileNo: values.phoneno,
                      PINCode: "0",
                    };

                    const datares = JSON.stringify(data);
                    const LoginData = await fetchLogin(datares);

                    if (LoginData?.RecordSaved) {

                      setLoading(false);
                      setValue(formData);
                      setStatus({ success: true });
                      setSubmitting(false);
                      navigate("/patientlist");

                    } else {
                      setLoading(false);

                      setStatus({ success: true });
                      setSubmitting(false);
                      // setErrors({ submit: LoginData?.ReturnMsg });
                      toast.error(LoginData?.ReturnMsg, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }

                    try {
                      if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                      }
                    } catch (err) {
                      console.error(err);
                      if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                      }
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>

                      <FormControl fullWidth error={Boolean(touched.phoneno && errors.phoneno)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">Mobile No</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-login"
                          type="number"
                          name="phoneno"
                          onBlur={handleBlur}
                          onChange={e => {
                            handleChange(e);
                            if (e.target.value) {
                              setFormData(() => ({
                                ...formData,
                                ['phoneno']: e.target.value,
                              }));
                            }
                          }}

                          label="Mobile No"
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                          }}
                          inputProps={{ maxLength: 10 }}
                          inputMode="numeric"
                        />
                        {touched.phoneno && errors.phoneno && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.phoneno}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl fullWidth error={Boolean(touched.pin && errors.pin)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">Pin</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password-login"
                          type={showPassword ? 'text' : 'password'}
                          name="pin"
                          onBlur={handleBlur}
                          onChange={e => {
                            handleChange(e);
                            if (e.target.value) {
                              setFormData(() => ({
                                ...formData,
                                ['pin']: e.target.value,
                              }));
                            }
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Pin"
                          inputProps={{ maxLength: 4 }}
                          inputMode="numeric"
                        />

                        {touched.pin && errors.pin && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.pin}
                          </FormHelperText>
                        )}

                      </FormControl>

                      {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                          <PrimeGreenButton disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                            Sign in
                          </PrimeGreenButton>
                        </AnimateButton>
                      </Box>

                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6} sm={6}>
                          <PrimeBlueButton disableElevation fullWidth size="large" variant="contained" onClick={() => handleChangePin()}>
                            Change PIN
                          </PrimeBlueButton>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <PrimeBlueButton disableElevation fullWidth size="large" variant="contained"  onClick={() => handleForgotPin()}>
                            Forgot PIN
                          </PrimeBlueButton>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid item container direction="column" alignItems="center" xs={12}>
                  <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                    Don&apos;t have an account?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </AuthCardWrapper>
      )}

      {isModalOpen && (
        <div className="overflow-y-auto fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white sm:p-6 p-2 m-3 flex flex-col gap-4  rounded-lg  xl:w-[30%]">
            <Typography>SMS sent. Please check.</Typography>
            <button
              className=" text-green-400 font-semibold cursor-pointer"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {loading && (
        <CustomLoader/>
      )}
    </>
  );
};

export default FirebaseLogin;
