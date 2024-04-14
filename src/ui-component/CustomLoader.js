import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomLoader() {
  return (
    <div>
      <Backdrop sx={{ color: '#17A54A', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#000000c7' }} open={true}>
        <CircularProgress color="inherit" size={80}/>
      </Backdrop>
    </div>
  );
}
