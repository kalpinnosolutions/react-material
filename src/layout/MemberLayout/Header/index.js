import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
// import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
// import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
// import { useNavigate } from 'react-router-dom';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// assets
// import { IconMenu2 } from '@tabler/icons-react';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   confirmAlert({
  //     title: 'Logout',
  //     message: 'Are you sure you want to logout?',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => navigate('/logout')
  //       },
  //       {
  //         label: 'No',
  //         onClick: () => {}
  //       }
  //     ]
  //   });
  // }

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase> */}
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      {/* <ProfileSection /> */}
      <Stack direction="row">
        {/* <Link fullWidth size="small" variant="contained" component={Link} onClick={() => {handleLogout()}}  style={{ fontWeight: 600, textDecoration: 'none', color: '#2F3490'}}> */}
        <Link fullWidth size="small" variant="contained" component={Link} to="/logout"  style={{ fontWeight: 600, textDecoration: 'none', color: '#2F3490'}}>
          <Tooltip title="Logout">
           Logout
          </Tooltip>
        </Link>
      </Stack>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
