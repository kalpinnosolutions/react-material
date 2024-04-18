import { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import image from '../../assets/images/department/dental.jpg';
// import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack'

import { styled } from '@mui/material/styles';
import Image2 from '../../assets/images/login/doctor.png';
import { Grid, Modal, Box, Link, Chip, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { differenceInYears, format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CancelIcon from '@mui/icons-material/Cancel';



import {
  checkIsUserAlreadyBooked,
  fetchAppointmentBook,
  fetchAppointmentDropDown,
  fetchCalenderDateAV,
  fetchCalenderSchedule,
  // fetchDoctorList,
  fetchLoginUserID,
  fetchPay,
  fetchSlote,
  // fetchSpeciality,
  getPaymentTerms,
  getSlotAvailabilityStatus,
  checkIsApptAllowed,
  getPmtGatewayKey
} from "../../assets/data";


const CustomTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.2),
  textAlign: 'center',
  fontWeight: 600,
  fontSize: '16px',
  color: theme.palette.text.primary,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "38%",
  height: "100%",
  maxHeight: "620px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: 'block',
  overflowY: 'scroll',
  p: 4,
};

const disableClass = { cursor: "noDrop", backgroundColor: "#d2d2d2", color: "#fff" };
const greenClass = { cursor: "pointer", backgroundColor: "#15803d", color: "#fff" };
const blueClass = {
  cursor: "pointer", backgroundColor: "#073D85", color: "#fff", '&:hover': {
    color: "#000",
    fontWeight: 600
  }
};


// import BookModal from './BookModal';


const DoctorsCard = ({ searchedDoctores, childIsLoading }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [allDocData, setAllDocData] = useState("");
  const [docCode, setDocCode] = useState("");
  const [paymentKey, setPaymentKey] = useState(process.env.REACT_APP_RAZORPAY_ID);
  const [activeDates, setActiveDates] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeHR, setSelectedTimeHR] = useState("");
  const [showSlot, setShowSlot] = useState(false);
  // const [handleLoadingSlot, setHandleLoadingSlot] = useState(false);
  const selectedData = useSelector((state) => state?.userData?.userData);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookApp, setBookApp] = useState();
  const [selectedSlotDetails, setSelectedSlotDetails] = useState();
  const [slote, setSlote] = useState();
  const [isModalBookOpen, setIsModalBookOpen] = useState(false);
  const [isTemModal, setIsTemModal] = useState(false)
  const [termMessage, setTermMessage] = useState("");
  const [isChecked, setisChecked] = useState(false)

  const handleCloseModal = () => {
    setIsOpen(false);
    console.log(selectedDates);
    setSelectedTimeHR("")
    console.log(showSlot)
    // console.log(handleLoadingSlot)
    console.log(timeSlots)
  }

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

  const handleOpenModal = async (doctorName, doctor) => {

    setSelectedDoctor(doctorName);
    setAllDocData(doctor);
    const DocCd = doctor?.DocCd;
    setDocCode(DocCd);
    setIsLoading(true)


    // Set Payment Link on doctor selections
    if (DocCd != "" && DocCd != undefined) {
      const getPaymentKey = await getPmtGatewayKey(DocCd);
      if (getPaymentKey?.ReturnVal) {
        setPaymentKey(getPaymentKey?.ReturnData)
      } else {
        setPaymentKey("")
      }
    }

    try {
      const appointmentList = await fetchAppointmentDropDown();

      if (appointmentList?.length > 0) {
        setAppointment(
          appointmentList?.filter((item) => item?.dcd !== "Manual Appointment")
        );
      } else {
        setAppointment([]);
      }
    } catch (error) {
      console.log(error);
    }

    const response = await fetchCalenderDateAV(DocCd);

    if (response.length > 0) {
      setActiveDates(generateActiveDates(response));
    }

    setIsOpen(true);
    setIsLoading(false)

    console.log(selectedDoctor)
    console.log(allDocData)
    console.log(docCode)
    console.log(paymentKey)
    console.log(activeDates)
  };

  const generateActiveDates = (inputData) =>
    inputData.reduce(
      (
        dates,
        { SchDate, SchtimeFrmHrs, SchtimeFrmMins, SchtimeToHrs, SchtimeToMins }
      ) => {
        const date = new Date(SchDate);
        date.setHours(0, 0, 0, 0);

        for (
          let time = SchtimeFrmHrs * 60 + SchtimeFrmMins;
          time <= SchtimeToHrs * 60 + SchtimeToMins;
          time += 15
        ) {
          dates.push(new Date(date.getTime() + time * 60 * 1000));
        }

        return dates;
      },
      []
    );

  const onChangeCalander = async (selectedDate) => {

    setTimeSlots([])
    setSelectedTime(null);
    setShowSlot(false);

    const bodyData = {
      todayDate: formatDateString(selectedDate),
      DocCd: allDocData?.DocCd,
      PtnNo: allDocData?.SpltyCd,
    };

    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    const dateFormated = (formatDateString(selectedDate)?.split('T')[0])?.replace(/-/g, "") + 'T' + hours?.toString() + '0' + minutes?.toString() + '0Z';

    const isAppAllowed = await checkIsApptAllowed('N', dateFormated);
    if (isAppAllowed?.ReturnVal == false) {

      setDate(selectedDate);
      setSelectedTime(null);
      // handleAdjustedDate(selectedDate);
      setTimeSlots([])
      setShowSlot(false);


      toast.error(isAppAllowed?.ReturnMsg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: "bookappointment",
      });
      return false;
    }

    getSlotAvailabilityStatus(bodyData).then((item) => {
      if (item?.RecordSaved) {
        toast.error(item?.ReturnMsg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: "bookappointment",
        });
        setDate(selectedDate);
      } else {
        setDate(selectedDate);
        setSelectedTime(null);
        handleAdjustedDate(selectedDate);

        setTimeout(() => {
          setShowSlot(!item?.RecordSaved);
        }, 2000);
      }


    });

    setSelectedDates((prevSelectedDates) => {

      if (prevSelectedDates != null) {

        const index = prevSelectedDates.findIndex(
          (date) => date.getTime() === selectedDate.getTime()
        );

        if (index === -1) {
          // If the date is not in the array, add it
          return [selectedDate];
        } else {
          // If the date is already in the array, remove it
          return prevSelectedDates.filter((_, i) => i !== index);
        }
      }
    });

  };

  function formatDateString(inputDateString) {
    const inputDate = new Date(inputDateString);

    // Using date-fns to format the date
    const formattedDate = format(inputDate, "yyyyMMdd");

    return formattedDate;
  }

  const calculateAge = (dateString) => {
    const birthDate = parseISO(dateString);
    const currentDate = new Date();
    const age = differenceInYears(currentDate, birthDate);
    return age;
  };

  const handleBookAppointmentClick = async () => {
    try {
      const mobileNo = selectedData;

      const userid = await fetchLoginUserID(mobileNo?.mobileNumber);

      const { sexAgeMaritalStatus, PtnNo, BirthDt, mobileNumber } =
        selectedData;

      const {
        SlotNo,
        SessionCd,
        SchDate,
        FctMainCd,
        IpNo,
        PtnLstNm,
        PtnFirstNm,
        PtnMidNm,
      } = selectedSlotDetails;

      const brithdate = calculateAge(convertDateFormat(BirthDt));
      const bodyData = {
        Age: brithdate,
        ApptNo: "0",
        AptmSts: 3, // for confirm
        BirthDt: convertDateFormat(BirthDt),
        COCD: 1,
        CnclBy: "",
        ConsultationType: 1,
        FctCd: docCode,
        FctMainCd: FctMainCd,
        Gender: sexAgeMaritalStatus.split(", ")[0],
        IpNo: IpNo,
        IsPtnExist: "1",
        PtnFirstNm: PtnFirstNm,
        PtnLstNm: PtnLstNm,
        PtnMidNm: PtnMidNm,
        PtnMobile: mobileNumber,
        PtnNo: PtnNo,
        ReqUserId: userid?.UserID,
        SchDt: convertDateFormat(SchDate),
        SessionCd: SessionCd,
        SlotNo: SlotNo,
      };

      await fetchAppointmentBook(bodyData).then((result) => {
        if (result?.RecordSaved) {
          // Define the original message with the placeholder
          const originalMessage = result?.ReturnMsg;

          // Replace the placeholder with today's date
          const updatedMessage = originalMessage.replace(
            "|APPTDTTM|",
            `${formatAsDDMMYYYY(date)}  ${selectedTimeHR}${selectedTimeHR && ":"
            }${selectedTime} `
          );
          setIsLoading(true)
          setTimeout(() => {
            setIsLoading(false)
            // changeTab("viewbookings")
            setIsModalBookOpen(false);
          }, 15000);
          toast.success(updatedMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setBookApp(false);
        } else {
          toast.error("Internal server Error", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setIsModalBookOpen(false);
        }
        setIsModalBookOpen(false);
      });
    } catch (error) {
      console.error("Error booking appointment", error);
    }
  };

  const handleAdjustedDate = async (selectedDate) => {
    const adjustedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedDate.getHours() + 5,
      selectedDate.getMinutes() + 30,
      0
    );

    try {
      const PtnNo = selectedData.PtnNo;
      const response = await fetchCalenderSchedule(adjustedDate, docCode);

      const isAppointmentBooked = await checkIsUserAlreadyBooked(
        PtnNo,
        adjustedDate,
        docCode
      );

      if (
        isAppointmentBooked?.RecordSaved &&
        isAppointmentBooked?.ReturnMsg?.length > 0
      ) {
        toast.warn(isAppointmentBooked?.ReturnMsg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (
        Array.isArray(response) &&
        response?.length > 0 &&
        !isAppointmentBooked?.RecordSaved
      ) {
        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        // Get the current date in "YYYY-MM-DD" format
        const currentDateStr = currentDate.toISOString().split("T")[0];

        const filteredResponse = response.filter((item) => {
          const schDate = item.SchDate.split("T")[0];
          const schHours = item.SchtimeFrmHrs;
          const schMinutes = item.SchtimeFrmMins;

          if (schDate === currentDateStr) {
            return (
              schHours > currentHours ||
              (schHours === currentHours && schMinutes > currentMinutes)
            );
          } else {
            // Include all items for dates other than the current date
            return true;
          }
        });

        setTimeSlots(filteredResponse);
      } else {
        setTimeSlots([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tileClassName = ({ date, selected }) => {

    if (date !== undefined && selected !== undefined) {
      console.log("set")
    }
    // Check if the current date is in the array of active dates

    if (selectedDates != null &&
      selectedDates.find(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      )
    ) {
      return "selected-date"; // Apply the 'selected-date' class
    }

    if (
      activeDates.some(
        (activeDate) =>
          date.getDate() === activeDate.getDate() &&
          date.getMonth() === activeDate.getMonth() &&
          date.getFullYear() === activeDate.getFullYear()
      )
    ) {
      return "active-tile"; // Apply the 'active-tile' class for active dates
    }

    if (
      selected &&
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    ) {
      return "selected-tile"; // Apply the 'selected-tile' class for the selected date
    }
    return ""; // Return an empty string for other dates
  };

  const handleTimeButtonClick = async (slot, slothr, slotDetails) => {

    setSelectedTime(slot);
    setSelectedTimeHR(slothr);
    setSelectedSlotDetails(slotDetails);
    setBookApp(true);

    const PtnNo = selectedData.PtnNo;
    const selecteddate = formatDateString(date);

    const SchDt = `${selecteddate}T1200Z`;


    const sloteList = await fetchSlote(PtnNo, docCode, SchDt);

    setSlote(sloteList);

    // IF RAZORPAY API RETURN FALSE VALUE THEN BLANK THE KEY AND SHOW ONLY APPOINTMENT ONLY WITHOUT PAYMENT
    if (paymentKey === "") {
      setSlote(0);
    }

    if (sloteList) {
      // console.log("insiede");
    }
  };

  const handleBooking = async () => {
    setIsModalBookOpen(true);
  };

  const handleCloseBookModal = () => {
    setIsModalBookOpen(false);
  };

  function convertDateFormat(inputDateString) {
    const inputDate = new Date(inputDateString);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    // const hours = inputDate.getUTCHours().toString().padStart(2, "0");
    // const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");

    return `${year}${month}${day}T${"12"}${"00"}Z`;
  }

  const formatAsDDMMYYYY = (date) => {
    // const day = date.getDate();
    // const month = date.getMonth() + 1; // Months are zero-based
    // const year = date.getFullYear();
    return `${format(new Date(date), "dd/MM/yyyy")}`;
  };

  const setIsLoading = (status) => {
    childIsLoading(status)
  }

  const handleAlreadyBook = () => {
    toast.error("Already booked", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  const handleProcessToPay = async () => {
    const mobileNo = selectedData;

    try {
      const userid = await fetchLoginUserID(mobileNo?.mobileNumber);

      const { sexAgeMaritalStatus, PtnNo, BirthDt, mobileNumber, email } =
        selectedData;

      const {
        SlotNo,
        SessionCd,
        SchDate,
        FctMainCd,
        IpNo,
        PtnLstNm,
        PtnFirstNm,
        PtnMidNm,
      } = selectedSlotDetails;

      const brithdate = calculateAge(convertDateFormat(BirthDt));

      const bodyData = {
        Age: brithdate,
        ApptNo: "0",
        AptmSts: 4,
        BirthDt: convertDateFormat(BirthDt),
        COCD: 1,
        CnclBy: "",
        ConsultationType: 1,
        FctCd: docCode,
        FctMainCd: FctMainCd,
        Gender: sexAgeMaritalStatus.split(", ")[0],
        IpNo: IpNo,
        IsPtnExist: "1",
        PtnFirstNm: PtnFirstNm,
        PtnLstNm: PtnLstNm,
        PtnMidNm: PtnMidNm,
        PtnMobile: mobileNumber,
        PtnNo: PtnNo,
        ReqUserId: userid?.UserID,
        SchDt: convertDateFormat(SchDate),
        SessionCd: SessionCd,
        SlotNo: SlotNo,
      };

      if (bodyData) {
        try {
          await fetchAppointmentBook(bodyData).then((result) => {
            if (result?.RecordSaved) {
              const ApptReqNo = result.ReturnVal;
              const options = {
                key: paymentKey,
                amount: slote * 100.0,
                name: "G.KUPPUSWAMY NAIDU MEMORIAL HOSPITAL",
                image: "https://s3.amazonaws.com/rzp-mobile/images/rzp.png",
                handler: function (response) {
                  if (response.razorpay_payment_id) {
                    handlePayment(
                      selectedData,
                      selectedSlotDetails,
                      slote,
                      response.razorpay_payment_id,
                      ApptReqNo
                    );

                  } else {
                    console.log("Payment Failed!");
                  }
                },
                prefill: {
                  name: "",
                  contact: mobileNumber,
                  email: email,
                },
                notes: {

                },
              };
              var rzp1 = new window.Razorpay(options);
              rzp1.open();
            } else {
              toast.error("Internal server Error", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "booking-notification",
              });
            }
          });
        } catch (error) {
          console.log("payment API error", error);
        }
      }
    } catch (error) {
      console.error("Error booking appointment", error);
    }
  };

  const handleTermSubmit = () => {
    setIsTemModal(false)
    setisChecked(false)
    handleProcessToPay();
  }

  const handleCloseTermModal = () => {
    setIsTemModal(false)
    setisChecked(false)
  }

  const handleCheckChange = () => {
    setisChecked(!isChecked);
  }

  const handlePayment = async (
    selectedData,
    selectedSlotDetails,
    slote,
    razPayID,
    ApptReqNo
  ) => {
    const payment = await fetchPay(
      selectedData,
      selectedSlotDetails,
      slote,
      razPayID,
      ApptReqNo
    );

    if (payment?.RecordSaved) {
      // const msg = `Payment done successfully : Please note this transaction number for future reference :
      // ${ApptReqNo}\nRef No: ${razPayID}
      // Appt Date and time :${formatAsDDMMYYYY(date)}
      // ${selectedTimeHR}
      // ${selectedTimeHR && ":"}
      // ${selectedTime}`;

      // const msg =
      //   "Payment done successfully : Please note this transaction number for future reference : " +
      //   ApptReqNo +
      //   "Ref No: " +
      //   razPayID;

      // Define the original message with the placeholder
      const originalMessage = payment?.ReturnMsg;

      // Replace the placeholder with today's date
      const updatedMessage = originalMessage.replace(
        "|APPTDTTM|",
        `${formatAsDDMMYYYY(date)}  ${selectedTimeHR}${selectedTimeHR && ":"
        }${selectedTime} `
      );

      const updatedMessageNew = updatedMessage.replace(
        "|PMTREFNO|",
        `${razPayID} `
      );

      toast.success(updatedMessageNew, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setIsLoading(true);

      setTimeout(() => {
        setOpentag(false);
        setIsModalOpen(false);
        setIsOpen(false);
        setIsLoading(false);
        navigate("/patientlist");
        // changeTab("viewbookings")
      }, 15000);
    }
  };

  const handlePaymentClick = () => {
    try {
      getPaymentTerms().then(result => {
        if (result?.IsSuccess) {
          console.log(termMessage)
          setTermMessage(result?.ReturnData)
          setIsTemModal(true)
        } else {
          setTermMessage("")
          setIsTemModal(false)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {searchedDoctores && searchedDoctores.length > 0 && (
        searchedDoctores.map((doctor, index) => (
          <>
            <Grid item xs={3} key={index} elevation={24}>
              <Card sx={{ maxWidth: 320, minHeight: 340 }} >
                <CardMedia
                  sx={{ height: 340, objectFit: "content", width: "100%", maxHeight: "280px" }}
                  image={Image2}
                  title={doctor?.label}
                />
                <CardContent>
                  <CustomTypography gutterBottom component="div" color="secondary">{doctor?.label}</CustomTypography>
                  {/* <Typography sx={{ textAlign: 'center', pb: 2 }} variant="h5" color="text.secondary">MD, D.M (Cardiology), MNAMS</Typography> */}
                  <Typography sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="h5" color="text.secondary" >{doctor?.SpltyName}</Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Stack direction="row" spacing={2}>
                    {/* <Button variant="outlined" endIcon={<PersonPinOutlinedIcon />} style={{ justifyContent: "flex-start" }}>
                  View
              </Button> */}
                    <Button variant="contained" endIcon={<CalendarMonthOutlinedIcon />} onClick={() => { handleOpenModal(doctor?.DocName, doctor) }} style={{ justifyContent: "flex-end" }}>
                      Book Appointment
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
            <Modal
              open={isOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >

              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Box sx={style} >
                  <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'right' }} >
                    <Link href="#" color="#f3212f" underline="none" onClick={() => handleCloseModal()}><CancelIcon /></Link>
                  </Typography>

                  <Typography id="modal-modal-description" variant="h2" sx={{ textAlign: 'center', p: 2 }}>
                    {selectedDoctor}
                  </Typography>

                  <Box style={{ justifyContent: 'center' }} sx={{ mb: 2 }}>
                    <Stack direction="row">
                      <Calendar
                        style={{ width: "100% !important" }}
                        onChange={onChangeCalander}
                        tileClassName={tileClassName}
                        navigationAriaLabel=" "
                        prev2AriaLabel=" "
                        next2AriaLabel=" "
                      />
                    </Stack>
                  </Box>

                  {showSlot ? (
                    <>
                      <Grid container direction="row" spacing={{ xs: 1, md: 1 }} columns={{ xs: 6, sm: 8, md: 10 }} sx={{ mt: 2 }}>
                        {timeSlots?.length > 0 ? (
                          <>
                            {timeSlots?.map((slot, index) => {
                              const padWithZero = (num) =>
                                num.toString().padStart(2, "0");
                              return (
                                <Grid item xs={2} key={index}>
                                  <Item>
                                    <Chip
                                      label={`${padWithZero(slot?.SchtimeFrmHrs)} : ${padWithZero(slot.SchtimeFrmMins)}`}
                                      onClick={() =>
                                      (slot?.ReqStsCd === 1 ? handleAlreadyBook()
                                        : slot?.ApptNo > 0 ? (slot?.AptmSts === 3 || slot?.AptmSts === 4) ? handleAlreadyBook()
                                          : handleTimeButtonClick(
                                            slot?.SchtimeFrmMins,
                                            slot?.SchtimeFrmHrs,
                                            slot)

                                          : slot?.AptmSts === 6 ? false

                                            : handleTimeButtonClick(
                                              slot?.SchtimeFrmMins,
                                              slot?.SchtimeFrmHrs,
                                              slot))
                                      }
                                      sx={slot?.ReqStsCd === 1 ? disableClass
                                        : slot?.ApptNo > 0 ? (slot?.AptmSts === 3 || slot?.AptmSts === 4) ? disableClass
                                          : selectedTime ===
                                            slot?.SchtimeFrmMins &&
                                            selectedTimeHR ===
                                            slot?.SchtimeFrmHrs
                                            ? greenClass
                                            : blueClass

                                          : slot?.AptmSts === 6 ? disableClass

                                            : selectedTime ===
                                              slot?.SchtimeFrmMins &&
                                              selectedTimeHR ===
                                              slot?.SchtimeFrmHrs
                                              ? greenClass
                                              : blueClass
                                      }
                                    />
                                  </Item>
                                </Grid>
                              );
                            })}
                          </>
                        ) : (
                          <Grid item xs={12}>
                            <Typography id="modal-modal-description" variant="h4" sx={{ textAlign: 'left', p: 2 }}>No Slots Available</Typography>
                          </Grid>
                        )}
                      </Grid>

                      {bookApp &&
                        timeSlots?.length > 0 &&
                        selectedTime >= 0 && (
                          <>
                            <Typography id="modal-modal-description" sx={{ textAlign: 'center', mt: 2 }} >
                              Amount to be paid: {slote}.0
                            </Typography>

                            <Typography id="modal-modal-description" sx={{ textAlign: 'center' }}>
                              Selected Appointment Date: &nbsp;
                              {format(
                                new Date(date),
                                "dd/MM/yyyy"
                              )}{" "}
                              {/* &nbsp;{formatAsDDMMYYYY(date)}{" "} */}
                              ({selectedTimeHR
                                ?.toString()
                                .padStart(2, "0")}{" "}
                              {selectedTimeHR && ":"}{" "}
                              {selectedTime
                                ?.toString()
                                .padStart(2, "0")})
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, width: "100%" }}>
                              <Stack direction="row" spacing={1}>
                                <Button variant="contained" style={{ justifyContent: "flex-start" }} onClick={() => handleBooking()}>
                                  Book Appointment Only
                                </Button>
                                {(slote > 0 &&
                                  <Button variant="contained" style={{ justifyContent: "flex-end" }}
                                    onClick={() =>
                                      slote !== 0.0 && handlePaymentClick()
                                    }
                                  >
                                    Book Appointment & PAY
                                  </Button>
                                )}
                              </Stack>
                            </Box>
                          </>
                        )}
                    </>
                  ) : (
                    <Typography variant="h4" sx={{ textAlign: 'left', p: 2 }}>Loading...</Typography>
                  )}

                  {isModalBookOpen && (
                    <ChildModal
                      selectedDoctor={selectedDoctor}
                      handleBookAppointmentClick={handleBookAppointmentClick}
                      isModalBookOpen={isModalBookOpen}
                      handleCloseBookModal={handleCloseBookModal}
                      date={date}
                      selectedTimeHR={selectedTimeHR}
                      selectedTime={selectedTime}
                    />
                  )}

                  <TermsPopup isTemModal={isTemModal} handleTermSubmit={handleTermSubmit} handleCloseTermModal={handleCloseTermModal} termMessage={termMessage} handleCheckChange={handleCheckChange} />
                </Box>
              </Grid>
            </Modal>
          </>
        ))
      )}
    </>
  );
}

function ChildModal({ selectedDoctor, handleBookAppointmentClick, isModalBookOpen, handleCloseBookModal, date, selectedTimeHR, selectedTime }) {

  const [open, setOpen] = useState(isModalBookOpen);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    handleCloseBookModal()
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };


  return (
    <>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={open || isModalBookOpen}
        onClose={(_, reason) => reason === 'backdropClick' && setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Typography id="modal-modal-description" variant="h2" sx={{ textAlign: 'center', p: 2 }}>
            {selectedDoctor}
          </Typography>
          <Grid container direction="row" spacing={1} xs={12}>
            <Grid item xs={6}>
              <Typography id="modal-modal-description" sx={{ textAlign: 'right' }}>
                <Button variant="outlined" startIcon={<CalendarMonthOutlinedIcon />} style={{ cursor: 'default' }}>
                  {format(
                    new Date(date),
                    "dd/MM/yyyy"
                  )}{" "}
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography id="modal-modal-description" sx={{ textAlign: 'left' }}>
                <Button variant="outlined" startIcon={<AccessTimeIcon />} style={{ justifyContent: "flex-end", cursor: 'default' }}>{selectedTimeHR
                  ?.toString()
                  .padStart(2, "0")}{" "}
                  {selectedTimeHR && ":"}{" "}
                  {selectedTime
                    ?.toString()
                    .padStart(2, "0")}</Button>
              </Typography>
            </Grid>
          </Grid>
          <Box style={{ justifyContent: 'center' }} sx={{ mt: 3 }}>
            <Stack direction="row" spacing={5}>
              <Button variant="contained" style={{ justifyContent: "flex-start" }} color="error" onClick={() => handleClose()}>
                Cancel Appointment
              </Button>
              <Button variant="contained" style={{ justifyContent: "flex-end" }} color="success" onClick={() => handleBookAppointmentClick()} >
                Book Appointment
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

function TermsPopup({ isTemModal, handleTermSubmit, handleCloseTermModal, termMessage, handleCheckChange }) {

  const [open, setOpen] = useState(isTemModal);
  const [isChecked, setIsChecked] = useState(false)

  const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, pt: 2, px: 4, pb: 3 };

  const handleClose = () => {
    setOpen(false);
    handleCloseTermModal()
  };

  const handlesubmit = () => {
    handleTermSubmit()
  }

  const handleCheckTerms = () => {
    handleCheckChange(!isChecked);
    setIsChecked(!isChecked)
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_RAZORPAY_LINK;
    script.async = true;
    document.body.appendChild(script);
  }, []);



  return (
    <>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={open || isTemModal}
        onClose={(_, reason) => reason === 'backdropClick' && setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Box style={{ justifyContent: 'center' }} sx={{ mt: 3 }}>
            <TextField placeholder="" value={termMessage} disabled multiline rows="4" sx={{ width: "100%" }} />
            <FormGroup>
              <FormControlLabel checked={isChecked} control={<Checkbox />} onChange={handleCheckTerms} label="I accept these terms and conditions" />
            </FormGroup>
            <Stack direction="row" spacing={5}>
              <Button variant="contained" style={{ justifyContent: "flex-start" }} color="error" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button variant="contained" disabled={!(isChecked)} style={{ justifyContent: "flex-end" }} color="success" onClick={() => handlesubmit()} >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default DoctorsCard;
