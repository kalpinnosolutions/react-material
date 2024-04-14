import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
//import { useSelector } from 'react-redux';

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
  // IconButton,
  // InputAdornment,
  InputLabel,
  OutlinedInput,
  // TextField,
  Typography,
  useMediaQuery,
  Stack
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
//import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
//import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
//import Visibility from '@mui/icons-material/Visibility';
//import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo2';
import { Link } from 'react-router-dom';

import RegisterOTP from './RegisterOTP';

import {
  fetchGenerateOTP,
  fetchptnExist,
  isPtnExistInHosp,
} from "../../../../assets/data";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrimeGreenButton } from '../../../../ui-component/Button';
import config from '../../../../config';

import { useDispatch } from "react-redux";
import { setUserData } from "../../../../store/userDataSlice";

const action = { setUserData }

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const scriptedRef = useScriptRef();
  const [isOtp, setIsOtp] = useState(false);
  const [generateOTPData, setGenerateOTPData] = useState({});
  const [registerData, setRegisterData] = useState({ phonenumbers: "9987905901", firstname: "", middlename : "", lastname: ""});

  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  const generateOtp = async () => {

      const data = "MobileNo=" + registerData?.phonenumbers + "&PatientNo=" + 0;
      const mobileNumber = registerData?.phonenumbers;

      try {
        const rsisPtnExistInHosp = await isPtnExistInHosp(mobileNumber);
        if (rsisPtnExistInHosp?.ReturnData) {
          const checkptnNumber = await fetchptnExist(mobileNumber);
          if (!checkptnNumber?.ReturnData) {
            const handlegenerateOtpData = await fetchGenerateOTP(data);
            if (handlegenerateOtpData?.RecordSaved) {
              toast.success(handlegenerateOtpData?.ReturnMsg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setIsOtp(true);
              setGenerateOTPData(handlegenerateOtpData);
              dispatch(action.setUserData(registerData?.phonenumbers));
            }
          } else {
            toast.error(checkptnNumber?.ReturnMsg, {
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
        } else {
          toast.error(rsisPtnExistInHosp?.ReturnMsg, {
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
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      { isOtp ? (
        <RegisterOTP
          allData={registerData}
          Number={registerData?.phonenumbers}
          setIsOtp={setIsOtp}
          generateOTPData={generateOTPData}
          setRegisterData={setRegisterData}
          generateOtp={generateOtp}
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
                    Sign up
                  </Typography>
                  <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                    Enter your credentials to continue
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                phonenumbers: '',
                firstname: '',
                lastname: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                phonenumbers: Yup.number().required('Mobile No is required'),
                firstname: Yup.string().required('First Name is required'),
                lastname: Yup.string().required('Last Name is required')
              })}
              onSubmit={async (registerData, { setErrors, setStatus, setSubmitting }) => {

                const data = "MobileNo=" + registerData?.phonenumbers + "&PatientNo=" + 0;
                const mobileNumber = registerData?.phonenumbers;
                try {
                  const rsisPtnExistInHosp = await isPtnExistInHosp(mobileNumber);
                  if (rsisPtnExistInHosp?.ReturnData) {
                    const checkptnNumber = await fetchptnExist(mobileNumber);
                    if (!checkptnNumber?.ReturnData) {
                      const handlegenerateOtpData = await fetchGenerateOTP(data);
                      if (handlegenerateOtpData?.RecordSaved) {
                        toast.success(handlegenerateOtpData?.ReturnMsg, {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });

                        setIsOtp(true);
                        setGenerateOTPData(handlegenerateOtpData);
                        dispatch(action.setUserData(registerData?.phonenumbers));
                      }
                    } else {
                      toast.error(checkptnNumber?.ReturnMsg, {
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
                  } else {
                    toast.error(rsisPtnExistInHosp?.ReturnMsg, {
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

                  if (scriptedRef.current) {
                    setStatus({ success: true });
                    setSubmitting(false);
                  }
                } catch (error) {
                  console.log(error);

                  if (scriptedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: error.message });
                    setSubmitting(false);
                  }
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (

                <form noValidate onSubmit={handleSubmit} {...others}>

                  <FormControl fullWidth error={Boolean(touched.phonenumbers && errors.phonenumbers)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-register">Mobile No</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="number"
                      value={values.phonenumbers}
                      name="phonenumbers"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        if (e.target.value) {
                          setRegisterData(() => ({
                            ...registerData,
                            ['phonenumbers']: e.target.value,
                          }));
                        }
                      }}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                      inputProps={{}}
                    />
                    {touched.phonenumbers && errors.phonenumbers && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.phonenumbers}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-register">First Name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        if (e.target.value) {
                          setRegisterData(() => ({
                            ...registerData,
                            ['firstname']: e.target.value,
                          }));
                        }
                      }}
                      inputProps={{}}
                    />
                    {touched.firstname && errors.firstname && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.firstname}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-register">Middle Name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.middlename}
                      name="middlename"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        if (e.target.value) {
                          setRegisterData(() => ({
                            ...registerData,
                            ['middlename']: e.target.value,
                          }));
                        }
                      }}
                      inputProps={{}}
                    />
                  </FormControl>

                  <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-register">Last Name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-register"
                      type="text"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        if (e.target.value) {
                          setRegisterData(() => ({
                            ...registerData,
                            ['lastname']: e.target.value,
                          }));
                        }
                      }}
                      inputProps={{}}
                    />
                    {touched.lastname && errors.lastname && (
                      <FormHelperText error id="standard-weight-helper-text--register">
                        {errors.lastname}
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
                      <PrimeGreenButton disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" >
                        Generate OTP
                      </PrimeGreenButton>
                    </AnimateButton>
                  </Box>
                </form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                Already have an account?
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AuthCardWrapper>
      )}
    </>
  );
};

export default FirebaseRegister;
