import React, {
  useCallback,
  useEffect,
  useState
} from "react";

// material-ui
import { Grid } from '@mui/material';

// project imports
import ButtonCard from 'ui-component/cards/ButtonCard';
import CardList from './card';


import {
  fetchExistingMember,
  fetchLoginUserID,
  fetchPatientList
} from "../../assets/data";

import {
  useSelector,
  useDispatch
} from "react-redux";
import { setUserAllData } from "../../store/userDataSlice";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomLoader from '../../ui-component/CustomLoader';
// import Typography from '@mui/material/Typography';

// import ExistingMember from "./ExistingMember";
import CustomModal from "./Modal";
import { useNavigate } from "react-router-dom";

const gridItems = 4;

// ==============================|| SAMPLE PAGE ||============================== //

function Member() {

  const navigate = useNavigate();

  const [memberData, setMemberData] = useState({});
  const [isMemberData, setIsMemberData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const ptn_no = useSelector((state) => state.userData.userpnno);
  const dispatch = useDispatch();
  // const [timerOnSubmit, setTimerOnSubmit] = useState(10000);
  const [loading, setLoading] = useState(false);



  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      console.log(isOpen)
      const patientData = await fetchPatientList(ptn_no);
      const familyMembers =
        patientData?.length > 0
          ? patientData?.map((item) => {
            return {
              id: item?.PtnSrNo,
              name: item?.PtnNm,
              image:
                item?.Gender !== "M"
                  ? item?.PtnPhoto?.length > 0
                    ? item?.PtnPhoto
                    : `${process.env.PUBLIC_URL}/images/login/female.png`
                  : item?.PtnPhoto?.length > 0
                    ? item?.PtnPhoto
                    : `${process.env.PUBLIC_URL}/images/login/female_icon_new.png`,
              sexAgeMaritalStatus: `${item?.Gender}, ${item?.BirthDt}, ${item?.mrtl_sts_dcd}`,
              gender: item?.Gender,
              age: item?.BirthDt,
              marriedStatus: item?.mrtl_sts_dcd,
              registrationStatus: item?.RegReqStatus,
              mobileNumber: item?.mobile,

              RegReqNo: item?.RegReqNo,
              RegReqStatusCd: item?.RegReqStatusCd,
              ptn_lst_nm: item?.ptn_lst_nm,
              ptn_frst_nm: item?.ptn_frst_nm,
              ptn_mid_nm: item?.ptn_mid_nm,
              ptn_no: item?.ptn_no,
              PtnNo: item?.PtnNo,
              ptnTitle: item?.ptnTitle,
              BirthDt: item?.BirthDt,
              mrtl_sts_dcd: item?.mrtl_sts_dcd,
              email: item?.email || "NA",
              PtnPhoto: item?.PtnPhoto,
              PtnAddress: item?.PtnAddress,
            };
          })
          : [];

      setFamilyData(familyMembers);


      //CHECK IF PATIENT DOES NOT SELECTED AT LEAST ONE MEMBER THEN SHOW MEMBER LIST POPUP
      if (patientData?.length === 0 || patientData === null) {
        setTimeout(() => {
          handleOpenContactModal()
        }, 100);
      }

    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      //setTimer for loader
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }
  }, [ptn_no]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [allPtnData, setAllPtnData] = useState({});
  const mobileNumber = useSelector((state) => state?.userData?.userpnno);
  const [ptnData, setPtnData] = useState({});

  const handlePatient = (member) => {
    dispatch(setUserAllData(member));
    setMemberData(member);
    console.log(memberData)
    console.log(allPtnData);
    navigate('/dashboard')
  };

  const handleOpenContactModal = async () => {
    setLoading(true);
    setIsOpenContact(false);
    setIsMemberData(false);

    try {
      getAllPtnData().then(async (result) => {
        setPtnData(result);
        // console.log(result?.UserPtnNo, "result?.UserID");
        fetchExistingMember(mobileNumber, result?.UserPtnNo).then((result) => {
          // console.log(result, "DATA");
          setAllPtnData(result);
          setIsOpenContact(true);
          setLoading(false);
          setIsMemberData(true)
        });
      });
    } catch (error) {
      console.error("Error in handleModalOpen:", error);
    }
  };

  const handleUploadCloseClick = (type = "") => {
    setLoading(false);
    if (type === "refetch") {
      fetchData();
    }
    setIsOpen(false);
  }


  const HandleExistingMember = (data) => {
    toast.success(data?.ReturnMsg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsOpenContact(false);
  };

  //   const setTimerCallback = (timerduration) => {
  //     setTimerOnSubmit(timerduration)
  // };

  const getAllPtnData = async () => {
    try {
      const apiData = await fetchLoginUserID(mobileNumber);
      console.log(apiData, "apiData");
      return apiData;
    } catch (error) {
      // console.log(error);
      return error;
    }
  };
  /* 

   

   

   function convertDateFormat(inputDateString) {
       const inputDate = new Date(inputDateString);

       const year = inputDate.getFullYear();
       const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
       const day = inputDate.getDate().toString().padStart(2, "0");

       const hours = inputDate.getUTCHours().toString().padStart(2, "0");
       const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");

       return `${year}${month}${day}T${"12"}${"00"}Z`;
   }

   const calculateAge = (dateString) => {
       const birthDate = parseISO(dateString);
       const currentDate = new Date();
       const age = differenceInYears(currentDate, birthDate);
       return age;
   };
   */

  //REFRESH BUTTON
  const refreshList = () => {
    fetchData();
  }

  return (
    <ButtonCard title="Family Members" btn1title="Add Member" btn2title="Refresh" btnoneaction={handleOpenContactModal} btntwoaction={refreshList}>
      {(familyData.length > 0) && (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {familyData.map((object, i) =>
            <Grid item xs={gridItems} obj={object} key={i} onClick={() => handlePatient(object)} sx={{ cursor: 'pointer' }}>
              <CardList data={object} />
            </Grid>
          )}
        </Grid>
      )}

      {isMemberData && (
        <CustomModal
          height="75%"
          width="70%"
          isOpen={isOpenContact}
          onClose={handleUploadCloseClick}
          HandleExistingMember={HandleExistingMember}
          allPtnData={allPtnData}
          individualPtnData={ptnData}
        >
        </CustomModal>
      )}


      {loading && (<CustomLoader />)}
    </ButtonCard>
  )
}

export default Member;
