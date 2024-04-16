import { useEffect, useState, useCallback } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import { gridSpacing } from 'store/constant';
import { useSelector } from "react-redux";
// import BookingAppointmentCard from 'views/dashboard/Default/Cards/BookingAppointmentCard';

import CustomLoader from '../../ui-component/CustomLoader';


import {
  // checkIsUserAlreadyBooked,
  // fetchAppointmentBook,
  // fetchAppointmentDropDown,
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

import DoctorsCard from './DoctorsCard';
import DepartmentCard from './DepartmentCard';
import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
// import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



// ==============================|| DEFAULT DASHBOARD ||============================== //

// const searchDepartment = 1;
// const searchDoctor = 0;

const Dashboard = () => {
  const ptn_no = useSelector((state) => state.userData.userpnno);
  const [loading, setIsLoading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [searchedDoctores, setSearchedDoctores] = useState([]);
  // const [allDocData, setAllDocData] = useState("");


  const fetchListData = useCallback(async () => {
    try {
      setIsLoading(true);
      let doctorListData = [];
      let specialityList = [];
      console.log(ptn_no);

      if (!doctorList.length > 0) {
        doctorListData = await fetchDoctorList();

        if (doctorListData?.length > 0) {
          doctorListData.sort(compareDocNames)
          let doctorOption = [];
          doctorListData.map(function (object, i) {
            doctorOption[i] = { label: object.DocName, id: object.DocCd, spl: object.SpltyCd, DocCd: object.DocCd, DocName: object.DocName, SpltyCd: object.SpltyCd };
          })
          setDoctorList(doctorOption);

        } else {
          setDoctorList([]);
        }
        setIsLoading(false);
      }

      if (!speciality?.length > 0) {

        specialityList = await fetchSpeciality();

        if (specialityList.length > 0) {

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

      }

      if (doctorListData.length > 0 && specialityList.length > 0) {
        let filteredUsers = [];
        for (let i = 0; i < doctorListData.length; i++) {
          let spldata = searchSpecalityByCode(specialityList, doctorListData[i].SpltyCd);
          filteredUsers.push({
            spl: doctorListData[i].SpltyCd,
            label: doctorListData[i].DocName,
            id: doctorListData[i].DocCd,
            SpltyName: spldata.SpltyDcd,
            DocCd: doctorListData[i].DocCd, 
            DocName: doctorListData[i].DocName, 
            SpltyCd: doctorListData[i].SpltyCd
          })
        }
        setSearchedDoctores(filteredUsers)
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  
  //SEARCH NAME IN SPECIALITY LIST
  const searchSpecalityByCode = (specialityList, specialityCode) => {
    let specialityName = [];
    if (specialityList.length > 0) {
      for (let i = 0; i < specialityList.length; i++) {
        if (specialityList[i].SpltyCd == specialityCode) {
          specialityName = specialityList[i];
        }
      }
    }
    return specialityName;
  }

  const compareDocNames = (a, b) => {
    const nameA = a.DocName.replace(/^DR\./, "").trim();
    const nameB = b.DocName.replace(/^DR\./, "").trim();

    return nameA.localeCompare(nameB);
  };

  const childIsLoading = (status) => {
    setIsLoading(status);
  }

  
  //ON CHANGE FILTER DOCTOR LIST
  const handleItemClick = async (tab) => {
    if (tab !== "") {
      for (let i = 0; i < searchedDoctores.length; i++) {
        if (searchedDoctores[i].id == tab.id) {
          setSearchedDoctores([searchedDoctores[i]]);
        }
      }
    } else {
      fetchListData();
    }
  };

  //CLICK ON DEPOARTMENT NAME FILER DOCTOR LIST
  const searchDoctorList = (departmentCode) => {

    if (departmentCode !== "") {

      let specialityName = '';

      if (speciality.length > 0) {
        for (let i = 0; i < speciality.length; i++) {
          if (speciality[i].id == departmentCode) {
            specialityName = speciality[i].label;
          }
        }
      }

      if (departmentCode !== "" && doctorList.length > 0) {
        let filteredUsers = [];
        for (let i = 0; i < doctorList.length; i++) {
          if (doctorList[i].spl == departmentCode) {
            doctorList[i].SpltyName = specialityName;
            filteredUsers = [...filteredUsers, doctorList[i]];
          }
        }

        if (filteredUsers.length > 0) {
          setSearchedDoctores(filteredUsers)
        }
      }

    } else {
      fetchListData()
    }
  }

  //ON KEY PRESS AUTOSEARCH OPTION CHANGES AND ALSO CHANGE DR LIST
  const KeyPress = (searchValue) => {
    let searchValueArr = [];
    if (searchValue !== "") {
      for (let i = 0; i < speciality.length; i++) {
        if (speciality[i].label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
          if (doctorList.length > 0) {
            for (let i2 = 0; i2 < doctorList.length; i2++) {
              if (doctorList[i2].spl == speciality[i].id) {
                doctorList[i2].SpltyName = speciality[i].label;
                searchValueArr = [...searchValueArr, doctorList[i2]];
              }
            }
          }
        }
      }

      if (searchValueArr.length === 0) {
        searchValueArr = [];
        if (doctorList.length > 0) {
          for (let i3 = 0; i3 < doctorList.length; i3++) {
            if (doctorList[i3].label.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
              searchValueArr = [...searchValueArr, doctorList[i3]];
            }
          }
        }
      }
    } else {
      searchValueArr = [];
    }
    setSearchedDoctores(searchValueArr);
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={12}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={searchedDoctores}
          onChange={(event, value) => handleItemClick(value)}
          onInputChange={(event, newInputValue) => {
            KeyPress(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              placeholder='Search for doctors or departments'
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <SearchIcon />
                )
              }}
            />
          )}
        />
      </Grid>
      {speciality.length > 0 && (
        <Grid item xs={12}>
          <DepartmentCard departmentList={speciality} searchDoctorList={searchDoctorList} />
        </Grid>
      )}
      {searchedDoctores.length > 0 && (
        <DoctorsCard searchedDoctores={searchedDoctores} childIsLoading={childIsLoading} />
      )}
      {loading && (<CustomLoader />)}
    </Grid>
  );
};

export default Dashboard;
