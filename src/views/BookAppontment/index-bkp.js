import { useEffect, useState } from 'react';

// material-ui
import { Grid, Box, Card, CardHeader, CardContent } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import { gridSpacing } from 'store/constant';
import { useSelector } from "react-redux";
// import BookingAppointmentCard from 'views/dashboard/Default/Cards/BookingAppointmentCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomLoader from '../../ui-component/CustomLoader';


import {
  // checkIsUserAlreadyBooked,
  // fetchAppointmentBook,
  fetchAppointmentDropDown,
  // fetchCalenderDateAV,
  // fetchCalenderSchedule,
  fetchDoctorList,
  // fetchLoginUserID,
  // fetchPay,
  // fetchSlote,
  fetchSpeciality,
  // getPaymentTerms,
  // getSlotAvailabilityStatus,
  // checkIsApptAllowed,
  // getPmtGatewayKey
} from "../../assets/data";

// import DoctorsCard from './DoctorsCard';



// ==============================|| DEFAULT DASHBOARD ||============================== //

const searchDepartment = 1;
const searchDoctor = 0;

const Dashboard = () => {
  const ptn_no = useSelector((state) => state.userData.userpnno);
  const [tabValue, setTabValue] = useState(0);
  const [appointment, setAppointment] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  // const [allDocData, setAllDocData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentList = await fetchAppointmentDropDown();

        if (appointmentList?.length > 0) {
          setAppointment(
            appointmentList?.filter(
              (item) => item?.dcd !== "Manual Appointment"
            )
          );
        } else {
          console.error("appointment data is not an array:", appointment);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      if (!doctorList.length > 0) {
        try {
          setIsLoading(true);
          const doctorListData = await fetchDoctorList();

          if (doctorListData?.length > 0) {
            doctorListData.sort(compareDocNames)
            let doctorOption = [];
            doctorListData.map(function (object, i) {
              doctorOption[i] = { label: object.DocName, id: object.DocCd };
            })
            setDoctorList(doctorOption);

          } else {
            setDoctorList([]);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
      console.log(ptn_no);
    })();
  }, []);

  const compareDocNames = (a, b) => {
    const nameA = a.DocName.replace(/^DR\./, "").trim();
    const nameB = b.DocName.replace(/^DR\./, "").trim();

    return nameA.localeCompare(nameB);
  };

  const handleTabChange = async (event, newValue) => {
    console.log(event);
    setTabValue(newValue);

    //speciality
    if (newValue === searchDepartment) {

      try {
        setIsLoading(true);
        const specialityList = await fetchSpeciality();

        if (specialityList?.length > 0) {

          specialityList?.sort((a, b) => a.SpltyDcd.localeCompare(b.SpltyDcd))

          let specialityOption = [];
          specialityList.map(function (object, i) {
            specialityOption[i] = { label: object.SpltyDcd, id: object.SpltyCd };
          })

          if (specialityOption.length > 0) {
            setSpeciality(specialityOption);
          }

        } else {
          setSpeciality([]);
        }

        console.log(speciality);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    //doctors
    if (newValue === searchDoctor) {
      try {
        setIsLoading(true);
        const doctorListData = await fetchDoctorList();

        if (doctorListData?.length > 0) {

          doctorListData.sort(compareDocNames)

          let doctorOption = [];
          doctorListData.map(function (object, i) {
            doctorOption[i] = { label: object.DocName, id: object.DocCd };
          })

          if (doctorOption.length > 0) {
            setDoctorList(doctorOption);
          }

        } else {
          setDoctorList([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const handleItemClick = async (tab) => {
    // setSearchValue("");
    // clearKeyboardValue('specilaity')

    if (tab?.allDocData?.DocName?.length > 0) {
      const doctor = tab?.allDocData;
      handleOpenModal(doctor.DocName, doctor);
      setIsModalOpen(true);
    } else {

      setDoctorList([]);
      setSpeciality([]);

      try {
        setIsLoading(true);
        // const doctorListData = await fetchDoctorList();
        const doctorListData = await fetchDoctorList(tab?.id);

        const specialityData = doctorListData?.map((item) => {
          const { SpltyCd = "", DocName = "" } = item;
          return {
            SpltyCd: SpltyCd,
            SpltyDcd: DocName,
            allDocData: item,
          };
        });

        let specialityOption = [];
        specialityData.map(function (object, i) {
          specialityOption[i] = { label: object.SpltyDcd, id: object.SpltyCd };
        })

        console.log(specialityOption);

        if (specialityOption?.length > 0) {
          setDoctorList(specialityOption);
          setTabValue(searchDoctor);
        } else {
          setDoctorList([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };


  return (
    <Grid container spacing={gridSpacing} >
      <Grid item xs={12}>
        <Card>
          <CardHeader title={''} />
          <CardContent>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="Tabs where selection follows focus" selectionFollowsFocus centered>
                <Tab label="All Doctors" />
                <Tab label="Speciality" />
              </Tabs>
              <Box sx={{ width: '100%', justifyContent: 'center' }} display="flex" alignItems="center" p={2}>
                {tabValue === searchDepartment && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={speciality}
                    sx={{ width: 300 }}
                    onChange={(event, value) => handleItemClick(value)}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                  />
                )}

                {tabValue === searchDoctor && (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={doctorList}
                    sx={{ width: 300 }}
                    onChange={(event, value) => console.log(value)}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                  />
                )}
              </Box>
            </Box>

            {/* <DoctorsCard/> */}
            
          </CardContent>
        </Card>
      </Grid>
      {loading && (<CustomLoader />)}
    </Grid>
  );
};

export default Dashboard;
