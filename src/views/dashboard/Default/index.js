import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

// project imports
// import EarningCard from './EarningCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from "react-redux";
import BookingAppointmentCard from './Cards/BookingAppointmentCard';
import ViewDemographyCard from './Cards/ViewDemographyCard';
import ViewLabReportsCard from './Cards/ViewLabReportsCard';
import ViewBookingCard from './Cards/ViewBookingCard';
import ViewReceiptCard from './Cards/ViewReceiptCard';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const ptn_no = useSelector((state) => state.userData.userpnno);
  
  useEffect(() => {
    console.log(ptn_no)
    setLoading(false);
  }, []);

  const redirect = (link) => {
    navigate(link)
  }

  return (
    <Grid container spacing={gridSpacing} sx={{mt:"5px"}}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <BookingAppointmentCard isLoading={isLoading} redirect={redirect} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ViewLabReportsCard isLoading={isLoading} redirect={redirect} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ViewReceiptCard isLoading={isLoading} redirect={redirect} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ViewDemographyCard isLoading={isLoading} redirect={redirect} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ViewBookingCard isLoading={isLoading} redirect={redirect} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
