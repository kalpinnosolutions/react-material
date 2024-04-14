

// material-ui
import { Grid } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';

import AuthRegister from '../auth-forms/AuthRegister';
import AuthFooter from 'ui-component/cards/AuthFooter';

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
  

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthRegister />
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

export default Register;
