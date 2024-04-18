// material-ui
import { useTheme } from '@mui/material/styles';
import {

  Divider,

  Grid,

  Stack,
  Typography,
  useMediaQuery

} from '@mui/material';



import AuthCardWrapper from '../AuthCardWrapper';
// import Logo from 'ui-component/Logo2';
import { Link } from 'react-router-dom';

import config from '../../../../config';
import { PrimeGreenButton } from '../../../../ui-component/Button';


const FirebaseLogin = () => {

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

//  const LoginLink = config.basename+'/login';
 const RegisterLink = '/register';

  return (
    <>
      <AuthCardWrapper>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {/* <Grid item sx={{ mb: 1 }}>
            <Logo />
          </Grid> */}
          <Grid item xs={12}>
            <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
              <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography color={config.color.prime} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                    Hi, Welcome to GKNM
                  </Typography>
                  <PrimeGreenButton component={Link} to="/login" disableElevation fullWidth size="large" variant="contained">
                    Login
                  </PrimeGreenButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Typography component={Link} to={RegisterLink} variant="subtitle1" sx={{ textDecoration: 'none' }}>
                Not a registered user? click here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AuthCardWrapper>
    </>
  );
};

export default FirebaseLogin;
