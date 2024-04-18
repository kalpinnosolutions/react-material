import { useState } from 'react';
// import { useSelector } from 'react-redux';

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
// import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo2';
import { PrimeGreenButton, PrimeBlueButton } from '../../../../ui-component/Button';
import config from '../../../../config';

const ChangePin = (props, { ...others }) => {
  
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const scriptedRef = useScriptRef();

  const { handleCancel, formData, changedPin } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    handleCancel();
  };

  return (
    <>
      <AuthCardWrapper>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item><Logo /></Grid>
          <Grid item xs={12}>
            <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
              <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography color={config.color.prime} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                    Change Pin
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
                  <Typography variant="subtitle1"></Typography>
                </Box>
              </Grid>
            </Grid>

            <Formik
              initialValues={{
                mobilenumber: '',
                currentPin: '',
                newPin: '',
                confirmPin: '',
                submit: null
              }}

              validationSchema={Yup.object().shape({
                // mobilenumber: Yup.string().max(10).required('Mobile No is required'),
                currentPin: Yup.string().max(4).required('Current Pin is required'),
                newPin: Yup.string().max(4).required('New Pin is required'),
                confirmPin: Yup.string().oneOf([Yup.ref('newPin'), null], "Confirm Pin don't match").required('Confirm Pin is required')
              })}

              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                try {
                  const MobileNum = values.mobilenumber;

                  const data = await getChangePin(MobileNum, values?.currentPin, values?.confirmPin);

                  if (data?.RecordSaved) {

                    toast.success("PIN Changed Successfully!", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    changedPin()
                  } else {
                    toast.error("Please add correct details", {
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

                  <FormControl fullWidth error={Boolean(touched.mobilenumber && errors.mobilenumber)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-email-login">Mobile No</InputLabel>
                    <OutlinedInput
                      value={formData.phoneno}
                      id="outlined-adornment-email-login"
                      type="number"
                      name="mobilenumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Mobile No"
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                      }}
                      inputProps={{ maxLength: 10 }}
                      disabled={true}
                    />
                    {touched.mobilenumber && errors.mobilenumber && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.mobilenumber}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth error={Boolean(touched.currentPin && errors.currentPin)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-password-login">Enter Pin</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-login"
                      type={showPassword ? 'text' : 'password'}
                      name="currentPin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Enter Pin"
                      inputProps={{ maxLength: 4 }}
                    />

                    {touched.currentPin && errors.currentPin && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.currentPin}
                      </FormHelperText>
                    )}

                  </FormControl>

                  <FormControl fullWidth error={Boolean(touched.newPin && errors.newPin)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-password-login">Enter New Pin</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-login"
                      type={showPassword ? 'text' : 'password'}
                      name="newPin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Enter New Pin"
                      inputProps={{ maxLength: 4 }}
                    />

                    {touched.newPin && errors.newPin && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.newPin}
                      </FormHelperText>
                    )}

                  </FormControl>

                  <FormControl fullWidth error={Boolean(touched.confirmPin && errors.confirmPin)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="outlined-adornment-password-login">Confirm New Pin</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-login"
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {/* {showPassword ? <Visibility /> : <VisibilityOff />} */}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm New Pin"
                      inputProps={{ maxLength: 4 }}
                    />

                    {touched.confirmPin && errors.confirmPin && (
                      <FormHelperText error id="standard-weight-helper-text-password-login">
                        {errors.confirmPin}
                      </FormHelperText>
                    )}

                  </FormControl>

                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                  )}

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6} sm={6}>
                      <PrimeBlueButton disableElevation fullWidth size="large" variant="contained" color="primary" onClick={(e) => handleCancelClick(e)}>
                        Cancel
                      </PrimeBlueButton>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <PrimeGreenButton disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="success">
                        Ok
                      </PrimeGreenButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </AuthCardWrapper>
    </>
  );
};

export default ChangePin;
