import { useEffect, useRef, useState, useCallback } from 'react';

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
import { gridSpacing } from 'store/constant';

import Demographic from './Demographic';
import ContactDetails from './ContactDetails';
import SocialDetails from './SocialDetails';
import KinDetails from './KinDetails';

import { getViewDemography } from "../../assets/data";
// import { setContactData, setDemographicData, setKinData, setSocialDetailsData } from "../../store/patientSlice";
import { format, parseISO } from "date-fns";
import CustomLoader from '../../ui-component/CustomLoader';

import { setContactData, setDemographicData, setKinData, setSocialDetailsData } from "../../store/patientSlice";
import { useDispatch, useSelector } from "react-redux";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('demographic');
  const dispatch = useDispatch();

  const hasEffectRunRef = useRef(false);
  const userData = useSelector((state) => state?.userData.userData);
  const [formData, setFormData] = useState({
    title: "",
    gender: "",
    lastName: "",
    firstName: "",
    middleName: "",
    age: "",
    address1: "",
    address3: "",
    address2: "",
    city: null,
    pincode: "",
    state: null,
    country: null,
    phoneHome: "",
    phoneOffice: "",
    mobile: "",
    email: "",
    passportNo: "",
    expiryDate: "",
    placeOfIssue: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    occupation: "",
    community: "",
    education: "",
    height: "",
    heightUnits: "",
    weight: "",
    weightUnits: "",
    bloodGroup: "",
    rhFactor: "",
    aadhaarCardNo: "",
    lastNameKin: "",
    firstNameKin: "",
    middleNameKin: "",
    relation: null,
    birthDate: "",
  });

  const changeDataToLabel = (target) => {
    const data =
      target?.length > 0
        ? {
          label: target,
          value: target,
        }
        : "";
    return data;
  };

  const [baseImageUrl, setBaseImageUrl] = useState("");

  function convertDateFormat(inputDateString) {
    const inputDate = new Date(inputDateString);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    /*     const hours = inputDate.getUTCHours().toString().padStart(2, "0");
    const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0"); */

    return `${year}${month}${day}T${"12"}${"00"}Z`;
  }

  const calculateFullAge = (dateString) => {

    let fullAge = `0Y 0M 0D`;
    let monthAge = "";
    let dateAge = "";

    try {
      const startDate = new Date(parseISO(dateString));
      let dobdobYear = startDate.getYear();
      let dobdobMonth = startDate.getMonth();
      let dobdobDate = startDate.getDate();

      //get the current date from the system  
      var now = new Date();
      //extract the year, month, and date from current date  
      let currentY = now.getYear();
      let currentM = now.getMonth();
      let currentD = now.getDate();

      //get years  
      let yearAge = currentY - dobdobYear;

      //get months  
      if (currentM >= dobdobMonth)
        //get months when current month is greater  
        monthAge = currentM - dobdobMonth;
      else {
        yearAge--;
        monthAge = 12 + currentM - dobdobMonth;
      }

      //get days  
      if (currentD >= dobdobDate)
        //get days when the current date is greater  
        dateAge = currentD - dobdobDate;
      else {
        monthAge--;
        dateAge = 31 + currentD - dobdobDate;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }
      fullAge = `${yearAge}Y ${monthAge}M ${dateAge}D`;
    } catch (error) {
      fullAge = `0Y 0M 0D`;
    }
    return fullAge;
  }


  const fetchListData = useCallback(async () => {
    setLoading(true);
    try {
      const ptnNo = userData?.PtnNo;
      if (!hasEffectRunRef.current) {
        getViewDemography(ptnNo).then((result) => {
          if (result?.MaritalStsDesc?.length > 0) {
            const {
              ptnTitle = "",
              ptn_lst_nm = "",
              ptn_frst_nm = "",
              ptn_mid_nm = "",
              sex = "",
              PtnCityDesc = "",
              prmnt_pin = "",
              PtnState = "",

              mobile = "",
              email = "",
              psprt_iss_plc = "",
              PtnNationality = "",

              aadhar_no = "",
              kin_lst_nm = "",
              kin_frst_nm = "",
              kin_mid_nm = "",
              brth_dt = "",
              PtnPhoto,
              prmnt_addrs1,
              prmnt_addrs2,
              prmnt_addrs3,
              psprt_no,
              ht,
              HtUnitDesc,
              WtUnitDesc,
              wt,
              rh_fctr,
              BldGrpDesc,
              ReligionDesc,
              MaritalStsDesc,
              OccupationDesc,
              CommunityDesc,
              EducationDesc,
              KinRelDesc,
              prmnt_tel,
              psprt_vld_dt,
              work_tel,
              PtnCountryDesc = "",
            } = result;
            setBaseImageUrl(PtnPhoto);

            const parsedDate = parseISO(brth_dt);
            const parsedExpiryDate = parseISO(psprt_vld_dt);

            const BrithData = format(parsedDate, "dd/MM/yyyy");
            const expiryDate = format(parsedExpiryDate, "dd/MM/yyyy");

            setFormData((prevData) => ({
              ...prevData,
              title: ptnTitle,
              lastName: ptn_lst_nm,
              firstName: ptn_frst_nm,
              middleName: ptn_mid_nm,
              age: calculateFullAge(convertDateFormat(brth_dt)),
              sex: sex,
              address1: prmnt_addrs1,
              address2: prmnt_addrs2,
              address3: prmnt_addrs3,
              city: changeDataToLabel(PtnCityDesc),
              pincode: prmnt_pin,
              state: changeDataToLabel(PtnState),
              country: changeDataToLabel(PtnCountryDesc),
              phoneHome: prmnt_tel,
              phoneOffice: work_tel,
              mobile: mobile,
              email: email,
              passportNo: psprt_no,
              expiryDate: result?.ValidIDProofDt ? expiryDate : "",
              placeOfIssue: psprt_iss_plc,
              nationality: changeDataToLabel(PtnNationality),
              maritalStatus: MaritalStsDesc,
              occupation: OccupationDesc,
              community: CommunityDesc,
              education: EducationDesc,
              height: ht,
              heightUnits: HtUnitDesc,
              weight: wt,
              weightUnits: WtUnitDesc,
              bloodGroup: changeDataToLabel(BldGrpDesc),
              rhFactor: rh_fctr,
              aadhaarCardNo: aadhar_no,

              lastNameKin: kin_lst_nm,
              firstNameKin: kin_frst_nm,
              middleNameKin: kin_mid_nm,
              relation: KinRelDesc,
              birthDate: BrithData,
              religion: ReligionDesc,
              photo: PtnPhoto,
              gender:
                sex?.length > 0
                  ? {
                    label:
                      sex?.toLowerCase() === "m"
                        ? "Male"
                        : sex?.toLowerCase() === "f"
                          ? "Female"
                          : "other",
                    value:
                      sex?.toLowerCase() === "m"
                        ? "Male"
                        : sex?.toLowerCase() === "f"
                          ? "Female"
                          : "other",
                  }
                  : "",
            }));

          }
        });
        hasEffectRunRef.current = true;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching bill data:", error);
    }
  }, []);

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDemographicData = (data) => {
    dispatch(setDemographicData(data));
  };

  const handleKinData = (data) => {
    dispatch(setKinData(data));
  };

  const handleContactData = (data) => {
    dispatch(setContactData(data));
  };

  const handleSocialData = (data) => {
    dispatch(setSocialDetailsData(data));
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <TabContext value={tabValue} aria-label="Tabs where selection follows focus" selectionFollowsFocus centered variant="fullWidth">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Demographic Details" value="demographic" />
                    <Tab label="Contact Details" value="contact" />
                    <Tab label="Social Details" value="social" />
                    <Tab label="Kin Details" value="kin" />
                  </TabList>
                </Box>

                {tabValue === 'demographic' && (
                  <TabPanel value="demographic">
                    <Demographic
                      imageUrl={baseImageUrl}
                      formData={formData}
                      handleAllData={handleDemographicData}
                      setFormData={setFormData}
                    />
                  </TabPanel>
                )}
                {tabValue === 'contact' && (
                  <TabPanel value="contact">
                    <ContactDetails
                      formData={formData}
                      handleAllData={handleContactData}
                      setFormData={setFormData}
                    />
                  </TabPanel>
                )}
                {tabValue === 'social' && (
                  <TabPanel value="social">
                    <SocialDetails
                      formData={formData}
                      handleAllData={handleSocialData}
                      setFormData={setFormData} />
                  </TabPanel>
                )}
                {tabValue === 'kin' && (
                  <TabPanel value="kin">
                    <KinDetails
                      handleAllData={handleKinData}
                      formData={formData}
                      setFormData={setFormData}
                    /></TabPanel>
                )}
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {loading && (<CustomLoader />)}
    </Grid>
  );
};

export default Dashboard;
