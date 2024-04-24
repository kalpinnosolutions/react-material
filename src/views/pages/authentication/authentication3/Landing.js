

// material-ui
import { Grid, Box } from '@mui/material';

// project imports

import LandingSection from '../auth-forms/LandingSection';

// import AuthFooter from 'ui-component/cards/AuthFooter';

import BackGroundImg from '../../../../assets/images/login/bgimg.jpg';



import React, { useEffect, useCallback, useState } from "react";
import { getPanelTextList } from "../../../../assets/data";
import CustomLoader from '../../../../ui-component/CustomLoader';
// import Marquee from "react-fast-marquee";


import AuthWrapper1 from '../AuthWrapper1';

const boxStyle = {
  marginTop: "30%",
  height: "320px",
  width: "420px",
  display: "flex",
  alignItems: "center",
  padding: "2px",
  textAlign: "left"
}

const boxStyle2 = {
  marginTop: "30%",
  height: "320px",
  width: "420px",
  display: "flex",
  alignItems: "center",
  padding: "12px",
  textAlign: "left"
}

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const [rightPanelText, setRightPanelText] = useState("");
  const [leftPanelText, setleftPanelText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPanelData = useCallback(async () => {


    try {
      setLoading(false)
      const rightpanelTextList = await getPanelTextList('R');
      const leftpanelTextList = await getPanelTextList('L');

      if (rightpanelTextList?.ReturnVal) {
        setRightPanelText(rightpanelTextList?.ReturnData)
      }

      if (leftpanelTextList?.ReturnVal) {
        setleftPanelText(leftpanelTextList?.ReturnData)
      }

      console.log(rightPanelText)
      console.log(leftPanelText)

      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.error("Error fetching patient data:", error);
    }

  }, []);

  useEffect(() => {
    fetchPanelData()
  }, [fetchPanelData])

  return (
    <AuthWrapper1>
      <Grid container direction="row" sx={{ minHeight: '100vh', backgroundImage: `url(${BackGroundImg})`, backgroundSize: '100% 100%', backgroundPosition: "center", backgroundRepeat: "no-repeat, repeat" }} >
        <Grid item xs={4} display={{ xs: 'block', md: 'block', sm: 'none' }}>
          <Box style={boxStyle2} >
            <div className="marquee-container">
              <div className="marquee" style={{ color: "#fff", backgroundColor: '#06ae92d4', fontSize: "18px", lineHeight: "30px", padding: "20px" }}>
              {(rightPanelText !== "")? rightPanelText.replace(/\n/g, ". ") : ""}
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <LandingSection />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} display={{ xs: 'block', md: 'block', sm: 'none' }}>
          <Box style={boxStyle} >
            <div className="marquee-container">
              <div className="marquee" style={{ color: "#fff", backgroundColor: '#06ae92d4', fontSize: "18px", lineHeight: "30px", padding: "20px"}}>
              {(leftPanelText !== "")? leftPanelText.replace(/\n/g, ". ") : ""}
              </div>
            </div>
          </Box>
        </Grid>

      </Grid>

      {loading && (<CustomLoader />)}
    </AuthWrapper1>
  );
};

export default Login;
