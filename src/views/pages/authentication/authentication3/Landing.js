

// material-ui
import { Grid } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';

import LandingSection from '../auth-forms/LandingSection';

import AuthFooter from 'ui-component/cards/AuthFooter';

import BackGroundImg from '../../../../assets/images/login/bgimg.jpg';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', backgroundImage: `url(${BackGroundImg})`, backgroundSize: '100% 100%', backgroundPosition: "center", backgroundRepeat: "no-repeat, repeat" }} >
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <LandingSection />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
