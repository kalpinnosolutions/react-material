import { useEffect, useState  } from 'react';

// material-ui
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// project imports
// import EarningCard from './EarningCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { useSelector } from "react-redux";

import BILL from './BILL';
import RECEIPT from './RECEIPT';
import REFUND from './REFUND';
import DEPOSITE from './DEPOSITE';

const gridSpacing = 10;

// ==============================|| DEFAULT DASHBOARD ||============================== //

const ViewReceipts = () => {

  const ptn_no = useSelector((state) => state.userData.userpnno);

  const [tabValue, setTabValue] = useState('bill');

  useEffect(() => {
    console.log(ptn_no)
  }, []);

  const handleChange = (event, newValue) => {
    console.log(event)
    setTabValue(newValue);
  };



  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
              <TabContext value={tabValue} aria-label="Tabs where selection follows focus"  variant="fullWidth" selectionFollowsFocus >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example" centered spacing={gridSpacing}>
                    <Tab label="BILL" value="bill" />
                    <Tab label="RECEIPT" value="receipt" />
                    <Tab label="DEPOSITE" value="deposite" />
                    <Tab label="REFUND" value="refund" />
                  </TabList>
                </Box>
                <TabPanel value="bill"><BILL/></TabPanel>
                <TabPanel value="receipt"><RECEIPT /></TabPanel>
                <TabPanel value="deposite"><DEPOSITE /></TabPanel>
                <TabPanel value="refund"><REFUND /></TabPanel>
              </TabContext>
              </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewReceipts;
