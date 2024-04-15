

// material-ui
import { Grid } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';

import LandingSection from '../auth-forms/LandingSection';

import AuthFooter from 'ui-component/cards/AuthFooter';

import BackGroundImg from '../../../../assets/images/login/bgimg.jpg';

import Box from '@mui/material/Box';
import Marquee from "react-fast-marquee";

import React, { useEffect, useCallback, useState } from "react";
import { getPanelTextList } from "../../../../assets/data";


// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const [rightPanelText, setRightPanelText] = useState("");
  const [leftPanelText, setleftPanelText] = useState("");

  const fetchPanelData = useCallback(async () => {


    try {
      const rightpanelTextList = await getPanelTextList('R');
      const leftpanelTextList = await getPanelTextList('L');

      if (rightpanelTextList?.ReturnVal) {
        setRightPanelText(rightpanelTextList?.ReturnData)
      }

      if (leftpanelTextList?.ReturnVal) {
        setleftPanelText(leftpanelTextList?.ReturnData)
      }


    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
    
  }, []);

  useEffect(() => {
    fetchPanelData()
  }, [fetchPanelData])

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '70vh', backgroundImage: `url(${BackGroundImg})`, backgroundSize: '100% 100%', backgroundPosition: "center", backgroundRepeat: "no-repeat, repeat" }} >
        <Box sx={{
          display: 'flex', p: 2, bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'red' : 'red',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
        >
          <Marquee>
            {rightPanelText}
          </Marquee>
        </Box>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 140px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <LandingSection />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
      <Box sx={{
        display: 'flex', p: 2, mb:1,  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'red' : 'red',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
      >
        <Marquee pauseOnHover={true} pauseOnClick={true} direction={"left"} loop={0}>
          {leftPanelText}
        </Marquee>
      </Box>
    </AuthWrapper1>
  );
};

export default Login;
