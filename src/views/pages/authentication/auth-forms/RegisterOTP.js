import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    // Checkbox,
    Divider,
    FormControl,
    // FormControlLabel,
    FormHelperText,
    Grid,
    //   IconButton,
    //   InputAdornment,
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
import { PrimeGreenButton, PrimeBlueButton } from '../../../../ui-component/Button';
import config from '../../../../config';


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AuthCardWrapper from '../AuthCardWrapper';
import { Link } from 'react-router-dom';
import Logo from 'ui-component/Logo2';
import Modal from '@mui/material/Modal';

const setTimeOut = 60;

const RegisterOTP = (props, { ...others }) => {

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const scriptedRef = useScriptRef();
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(setTimeOut);
    const [isResend, setIsResend] = useState(false);
    const [isOTPResend, setIsOTPResend] = useState(false);

    const { Number, generateOTPData, allData, generateOtp } = props;

    //   const [showPassword, setShowPassword] = useState(false);

    //   const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    //   };

    //   const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    //   };

    const handleCancelClick = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 1) {
                setIsResend(true);
            }
        }, 1000)
        return () => { clearInterval(myInterval); };
    });

    const ResendOTPAgain = () => {
        generateOtp()
        setIsResend(false)
        setSeconds(setTimeOut)
        setIsOTPResend(false)
    }

    const handleRedirect = () => {
        setIsResend(false);
        setSeconds(false);
        setIsOTPResend(true)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
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
                                    <Typography align="center" color={config.color.prime} gutterBottom variant={matchDownSM ? 'h5' : 'h4'}>
                                        We have sent You an SMS On{" "} {Number?.slice(0, 2)}******{Number % 100}
                                    </Typography>
                                    <Typography align="center" color={config.color.prime} gutterBottom variant={matchDownSM ? 'h5' : 'h4'}>
                                        with verification code
                                    </Typography>
                                    <Typography color={config.color.secondary} gutterBottom variant={matchDownSM ? 'h1' : 'h2'}>
                                        Enter 4-digit OTP
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
                                otp: '',
                                submit: null
                            }}

                            validationSchema={Yup.object().shape({
                                otp: Yup.string().max(4).required('OTP is required'),
                            })}

                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                                if (generateOTPData) {
                                    const varifydata =
                                        "RecID=" + generateOTPData?.ReturnVal + "&OTPCode=" + otpString;
                                    try {
                                        fetchVerifyOTP(varifydata).then((result) => {
                                            const {
                                                phonenumbers = "",
                                                firstname = "",
                                                middlename = "",
                                                lastname = "",
                                            } = allData;

                                            const bodyData = {
                                                mobileNumber: phonenumbers,
                                                firstName: firstname,
                                                lastName: lastname,
                                                middleName: middlename,
                                            };

                                            //CHECK OTP VALIDATION IF FALSE THEN RETURN FALSE WITH ERROR OR REGISTER NEW USER
                                            if (result != null && result.isOTPVerified === false) {
                                                if (result.isOTPVerified != null && result.isOTPVerified === false) {
                                                    if (result.responseText != null && result.responseText === "INVALID_OTP") {
                                                        toast.error("OTP is invalid. Please enter correct OTP", {
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
                                                return false;
                                            }

                                            // IF OTP IS WORKING FINE THEN REGISTER USER
                                            SaveUserRegiViaSMS(bodyData).then((result) => {
                                                const { RecordSaved } = result;
                                                if (RecordSaved) {
                                                    toast.success(
                                                        "You are registered successfully. Please check your messages.",
                                                        {
                                                            position: "top-center",
                                                            autoClose: 5000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                            theme: "light",
                                                        }
                                                    );
                                                    navigate("/login");
                                                } else {
                                                    toast.error("Registration failed.Please try again.", {
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
                                            });

                                        });

                                        //
                                    } catch (error) {
                                        console.log(error);
                                    }
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

                                <FormControl fullWidth error={Boolean(touched.otp && errors.otp)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-login">OTP</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-login"
                                        type="password"
                                        name="otp"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="OTP"
                                        onInput={(e) => {
                                            const val = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4);
                                            e.target.value = (isNaN(val))? '' : val;
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.otp && errors.otp && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.otp}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}

                                {isOTPResend && (
                                    <Grid item xs={12}>
                                        <Typography align="center" color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h6' : 'h5'}>
                                            {`Didn't receive OTP?`}{" "}
                                            <Link component="button" variant="body2" onClick={() => { ResendOTPAgain() }} >Resend OTP</Link>
                                        </Typography>
                                    </Grid>
                                )}

                                {isResend && (
                                    <Modal open={isResend} onClose={!isResend} align="center" aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h4" component="h5">
                                                Your session has been expired!.
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                <Button fullWidth size="large" variant="contained" color="error" onClick={() => handleRedirect()}>Ok</Button>
                                            </Typography>
                                        </Box>
                                    </Modal>
                                )}

                                {(isResend == false && seconds > 0) && (
                                    <Grid item xs={12}>
                                        <Typography align="center" color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h6' : 'h5'}>
                                            Session timeout ({seconds})
                                        </Typography>
                                    </Grid>
                                )}

                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={6} sm={6}>
                                        <PrimeBlueButton disableElevation fullWidth size="large" variant="contained" onClick={(e) => handleCancelClick(e)}>
                                            Cancel
                                        </PrimeBlueButton>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <PrimeGreenButton disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                            VERIFY OTP
                                        </PrimeGreenButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                        </Formik>


                    </Grid>
                </Grid>
            </AuthCardWrapper>
        </>
    );
};

export default RegisterOTP;
