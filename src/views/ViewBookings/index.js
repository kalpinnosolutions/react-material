import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Grid, Modal, Box, Link, Chip } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Cancel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BookingCard from './BookingCard';
import CustomLoader from '../../ui-component/CustomLoader';


import {
  fetchBookingNow,
  fetchCalenderDateAV,
  fetchCalenderSchedule,
  fetchLoginUserID,
  fetchReschedule,
  fetchUpdateReschedule,
  checkIsApptAllowed,
  checkIsUserAlreadyBooked,
} from "../../assets/data";

import { useSelector } from "react-redux";
import {addDays, differenceInYears, format, parse, parseISO } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Optionstyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, pt: 2, px: 4, pb: 3 };

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
  width: "35%",
  height: "100%",
  maxHeight: "550px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: 'block',
  overflow: 'scroll',
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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [historyAppointments, setHistoryAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalenderModalOpen, setIsCalenderModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  // const [opentag, setOpentag] = useState(false);
  const [reschedualData, setReschedualData] = useState({});
  const [activeDates, setActiveDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [showSlot, setShowSlot] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeHR, setSelectedTimeHR] = useState("");
  const [selectedSlotDetails, setSelectedSlotDetails] = useState();
  const [selectedAppointmentStatus, setSelectedAppointmentStatus] = useState("");
  const [isReShedule, setIsReShedule] = useState("reSchedule");
  const [selectedDates, setSelectedDates] = useState([]);
  const [handleLoadingSlot, setHandleLoadingSlot] = useState(false);

  const [selectedAppDate, setSelectedAppDate] = useState("");

  const userData = useSelector((state) => state.userData.userData);

  useEffect(() => {
    (async () => {
      // Get current date and time
      console.log(isReShedule)
      console.log(setIsModalOpen(''))
      console.log(selectedAppDate)
      console.log(selectedDoctor)
      console.log(reschedualData)
      console.log(isCalenderModalOpen)
      console.log(date)
      console.log(handleLoadingSlot)
      const ptnNo = userData?.PtnNo;

      /* const TodayDate = new Date();

      const year = TodayDate.getUTCFullYear().toString();
      const month = (TodayDate.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = TodayDate.getUTCDate().toString().padStart(2, "0");
       const hours = TodayDate.getUTCHours().toString().padStart(2, "0");
      const minutes = TodayDate.getUTCMinutes().toString().padStart(2, "0"); */

      const today = new Date();

      const todayDate = format(today, "yyyyMMdd");

      const formattedDate = `${todayDate}T${"00"}${"00"}Z`;

      try {
        setLoading(true);
        const data = await fetchBookingNow(ptnNo, formattedDate);

        const currentDate = new Date();
        // const currentDateString = currentDate.toISOString().slice(0, 10);
        const currentDateString = currentDate
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");
        const currentTimeString = currentDate
          .toLocaleTimeString("en-US", { hour12: false })
          .slice(0, 5);

        if (data?.length > 0) {
          const appointments = data[0]?.ArrAppt || [];

          // Filter appointments into upcoming and history based on ApptDt and ApptTm
          appointments.filter(
            (appointment) =>
              appointment.ApptDt >= currentDateString ||
              (appointment.ApptDt === currentDateString &&
                appointment.ApptToTm > currentTimeString)
          );

          appointments.filter(
            (appointment) =>
              appointment.ApptDt < currentDateString ||
              (appointment.ApptDt === currentDateString &&
                appointment.ApptToTm <= currentTimeString)
          );

          setUpcomingAppointments(appointments);
          // setHistoryAppointments(appointments);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        console.log(upcomingAppointments);
      }
    })();
  }, []);


  const handleResidual = async (data) => {

    const dateFormated = data.ApptDt + 'T' + data.ApptTm?.replace(':', '') + 'Z';
    setSelectedAppDate(dateFormated);

    setSelectedAppointmentStatus(data?.ApptStsDesc);
    setSelectedDoctor(data?.ApptDoctor);
    setReschedualData(data);
    setIsModalOpen(true);
  };

  const generateActiveDates = (inputData) =>
    inputData?.reduce(
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

  const handleTabChange = async (tab) => {

    if (tab === undefined) {
      setActiveTab(activeTab);
    } else {
      setActiveTab(tab);
    }

    const ptnNo = userData?.PtnNo;

    const today = new Date();
    const yesterday = addDays(today, -1);

    const todayDate = format(today, "yyyyMMdd");
    const yesterdayDate = format(yesterday, "yyyyMMdd");

    const formattedDate =
      tab === "history"
        ? `${yesterdayDate}T${"00"}${"00"}Z`
        : `${todayDate}T${"00"}${"00"}Z`;

    try {
      setLoading(true);
      const data = await fetchBookingNow(ptnNo, formattedDate);

      const currentDate = new Date();

      const currentDateString = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const currentTimeString = currentDate
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5);

      if (data?.length > 0) {
        const appointments = data[0]?.ArrAppt || [];

        const upcoming = appointments.filter(
          (appointment) =>
            appointment.ApptDt > currentDateString ||
            (appointment.ApptDt === currentDateString &&
              appointment.ApptToTm > currentTimeString)
        );

        const history = appointments.filter(
          (appointment) =>
            appointment.ApptDt < currentDateString ||
            (appointment.ApptDt === currentDateString &&
              appointment.ApptToTm <= currentTimeString)
        );

        if (history.length > 0 && upcoming.length > 0) {
          console.log('r')
        }

        tab === "history"
          ? setHistoryAppointments(appointments)
          : setUpcomingAppointments(appointments);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitClick = async () => {

    if (isReShedule === "reSchedule") {

      const isAppAllowed = await checkIsApptAllowed('R', selectedAppDate);

      if (isAppAllowed?.ReturnVal == false) {
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

      setIsCalenderModalOpen(true);

      const DocCd = reschedualData?.ApptDocCd;

      const response = await fetchCalenderDateAV(DocCd);

      if (response !== "Not Authorized User") {
        setActiveDates(generateActiveDates(response));
      }
    }

    if (isReShedule === "cancel") {

      const isAppAllowed = await checkIsApptAllowed('C', selectedAppDate);
      if (isAppAllowed?.ReturnVal == false) {
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

      setLoading(true);

      const userid = await fetchLoginUserID(userData?.mobileNumber);
      const userID = userid?.UserID;

      const age = calculateAge(convertDateFormat(userData?.BirthDt));

      const data = await fetchReschedule(
        reschedualData,
        userData,
        age,
        userID,
        isReShedule
      );

      if (data.RecordSaved) {
        const DocCd = reschedualData?.ApptDocCd;

        const response = await fetchCalenderDateAV(DocCd);

        setIsModalOpen(false);
        setIsCalenderModalOpen(false);

        setLoading(false);

        if (isReShedule === "cancel") {
          /* const updatedMessage = data?.ReturnMsg.replace(
            "|APPTDTTM|",
            `${formatAsDDMMYYYY(date)}  ${selectedTimeHR}${
              selectedTimeHR && ":"
            }${selectedTime} `
          ); */

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
        }

        if (response !== "Not Authorized User") {
          setActiveDates(generateActiveDates(response));
        }
      }
    }
  };

  function convertDateFormat(inputDateString) {
    const inputDate = new Date(inputDateString);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    /*  const hours = inputDate.getUTCHours().toString().padStart(2, "0");
     const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0"); */

    return `${year}${month}${day}T${"12"}${"00"}Z`;
  }

  const calculateAge = (dateString) => {
    const birthDate = parseISO(dateString);
    const currentDate = new Date();
    const age = differenceInYears(currentDate, birthDate);
    return age;
  };

  const handleCloseModal = () => {
    setIsCalenderModalOpen(false);
    setIsModalOpen(false);
  };

  const onChangeCalander = async (selectedDate) => {


    const dateFormated = convertDateFormat(selectedDate);
    const isAppAllowed = await checkIsApptAllowed('N', dateFormated);
    if (isAppAllowed?.ReturnVal == false) {

      setTimeout(() => {
        setHandleLoadingSlot(false);
      }, 3000);
      setDate(selectedDate);
      setSelectedTime(null);
      // handleAdjustedDate(selectedDate);
      setShowSlot(false);
      setHandleLoadingSlot(false);
      setTimeSlots([])


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

    setTimeout(() => {
      setHandleLoadingSlot(false);
    }, 3000);
    setDate(selectedDate);
    setSelectedTime(null);
    handleAdjustedDate(selectedDate);
    setShowSlot(true);
    setHandleLoadingSlot(true);

    setSelectedDates((prevSelectedDates) => {
      
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
    });


  };

  const handleAdjustedDate = async (selectedDate) => {
    const adjustedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedDate.getHours() + 5,
      selectedDate.getMinutes() + 30
    );


    const docCode = reschedualData?.ApptDocCd;

    try {

      const ptnNo = userData?.PtnNo;
      const response = await fetchCalenderSchedule(adjustedDate, docCode);

      const isAppointmentBooked = await checkIsUserAlreadyBooked(
        ptnNo,
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
      setTimeSlots([]);
      console.log(error);
    }
  };

  const handleResidualClick = async () => {
    const userid = await fetchLoginUserID(userData?.mobileNumber);

    const userID = userid?.UserID;

    const age = calculateAge(convertDateFormat(userData?.BirthDt));

    const data = await fetchReschedule(
      reschedualData,
      userData,
      age,
      userID,
      isReShedule
    );

    if (data?.RecordSaved) {
      const updatedMessage = data?.ReturnMsg.replace(
        "|APPTDTTM|",
        `${formatAsDDMMYYYY(date)}  ${selectedTimeHR}${selectedTimeHR && ":"
        }${selectedTime} `
      );

      const appDate = `${format(new Date(date), "yyyyMMdd")}T${"12"}${"00"}Z`;
      const { SessionCd = 0, SlotNo = 0 } = selectedSlotDetails;
      const bodyData = {
        reschedualData,
        userData,
        age,
        userID,
        appStatus: selectedAppointmentStatus === "Tentative" ? 3 : 4,
        appDate,
        SessionCd,
        SlotNo,
      };

      await fetchUpdateReschedule(bodyData);

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
      setIsModalOpen(false);
      setIsCalenderModalOpen(false);
    }
  };

  const tileClassName = ({ date }) => {
    if (
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
      return "active-tile";
    }

    return null;
  };

  const formatAsDDMMYYYY = (date) => {
    return `${format(new Date(date), "dd/MM/yyyy")}`;
  };

  const handleTimeButtonClick = async (slot, slothr, slotDetails) => {
    setSelectedTime(slot);
    setSelectedTimeHR(slothr);
    setSelectedSlotDetails(slotDetails);
  };

  const CheckStatus = (status) => {
    let changeStatus = status;
    switch (status) {
      case "Tentative":
        changeStatus = <Chip label={status} size="small" color="primary" />;
        break;
      case "Confirmed":
        changeStatus = <Chip label={status} size="small" color="success" />;
        break;
      case "Rescheduled":
        changeStatus = <Chip label={status} size="small" color="warning" />;
        break;
      case "Cancelled":
        changeStatus = <Chip label={status} size="small" color="error" />;
        break;
    }
    return changeStatus;
  }

  const AppointmentCard = (appointment) => {

    const toggleSelection = (target = "") => {
      setIsReShedule(target);
    };

    const appointmentDateTime = `${appointment.ApptDt} ${appointment.ApptTm}`;
    const parsedDate = parse(appointmentDateTime, "yyyyMMdd HH:mm", new Date());

    return (
      <Grid item xs={3} >
        <Card sx={{ border: 2, borderColor: '#17A54A' }}>
          <CardContent sx={{ p: 1 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <EventAvailableIcon />
              <Typography gutterBottom variant="h5" component="div" sx={{ pt: 1, fontSize: 'h4.fontSize' }}>
                {format(parsedDate, "dd-MM-yyyy HH:mm:ss")}
              </Typography>
            </Stack>
            <table style={{ marginTop: "5px" }}>
              <tbody>
                <tr>
                  <th align="left" style={{ fontWeight: '500' }}>App Req No</th>
                  <th align="left" style={{ fontWeight: '600' }}>: {appointment.ApptReqNo.toString()}</th>
                </tr>
                <tr>
                  <th align="left" style={{ fontWeight: '500' }}>App No</th>
                  <th align="left" style={{ fontWeight: '600' }}>: {appointment.ApptNo.toString()}</th>
                </tr>
                <tr>
                  <th align="left" style={{ paddingRight: "10px", fontWeight: '500' }}>App Type</th>
                  <th align="left" style={{ fontWeight: '600' }}>: {appointment.ApptTypDesc}</th>
                </tr>
                <tr>
                  <th align="left" style={{ fontWeight: '500' }}>Appt Status</th>
                  <th align="left" style={{ fontWeight: '600' }}>: {
                    appointment.ApptStsDesc === "Reschedule"
                      ? "RE"
                      : appointment.ApptStsDesc === "Cancel"
                        ? "Can"
                        : CheckStatus(appointment.ApptStsDesc)}</th>
                </tr>
              </tbody>
            </table>
            {/* <Typography variant="body2" sx={{ fontSize: 'h4.fontSize', fontWeight: '500' }}>
              <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>App Req No: {appointment.ApptReqNo.toString()} </Typography>
              <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>App No: {appointment.ApptNo.toString()}</Typography>
              <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>App Type: {appointment.ApptTypDesc}</Typography>
              <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>Appt Status: {" "}
                {appointment.ApptStsDesc === "Reschedule"
                  ? "Rescheduled"
                  : appointment.ApptStsDesc === "Cancel"
                    ? "Cancelled"
                    : appointment.ApptStsDesc}</Typography>
            </Typography> */}
          </CardContent>
          <CardActions spacing={1} sx={{ p: 1 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ pt: 2, fontSize: 'h4.fontSize', width: '80%', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {"Dr. "}{appointment.ApptDoctor}
            </Typography>
            <Stack direction="row">
              {appointment?.ApptTypCd === 2 ||
                appointment.ApptStsDesc === "Rescheduled" ||
                appointment.ApptStsDesc === "Cancelled"
                ? activeTab === "upcoming" && (
                  <Avatar alt={"name"} sx={{ width: 56, height: 56, cursor: 'noDrag', backgroundColor: '#90caf903' }} variant='square'
                  ><CalendarMonthOutlinedIcon sx={{ width: 45, height: 45 }} /></Avatar>
                )
                : activeTab === "upcoming" && (
                  <Avatar onClick={() => handleResidual(appointment)} alt={"name"} sx={{ width: 56, height: 56, cursor: 'pointer', backgroundColor: '#90caf903' }} variant='square'
                  ><CalendarMonthOutlinedIcon sx={{ width: 45, height: 45 }} /></Avatar>
                )}
            </Stack>
          </CardActions>
          {isModalOpen && (
            <Modal
              open={true}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...Optionstyle }}>
                <Box style={{ justifyContent: 'center' }} sx={{ mt: 3 }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel onClick={() => toggleSelection("reSchedule")} value={'reSchedule'} control={<Radio />} label="Reschedule" />
                    {selectedAppointmentStatus !== "Confirmed" && (
                      <FormControlLabel onClick={() => toggleSelection("cancel")} value={'cancel'} control={<Radio />} label="Cancle" />
                    )}
                  </RadioGroup>
                  <Stack direction="row" spacing={5}>
                    <Button variant="contained" style={{ justifyContent: "flex-start" }} color="error" onClick={() => {
                      setIsModalOpen(false);
                      setIsCalenderModalOpen(false);
                    }}>
                      Cancel
                    </Button>
                    <Button variant="contained" style={{ justifyContent: "flex-end" }} color="success" onClick={() => handleSubmitClick()} >
                      Submit
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Modal>
          )}

          {isCalenderModalOpen && (

            <Modal
              open={true}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >

              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Box sx={style} >
                  <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'right' }} >
                    <Link href="#" underline="none" color="#f3212f" onClick={() => handleCloseModal()}><CancelIcon /></Link>
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
                  
                  {showSlot && (
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
                    
                    {timeSlots?.length > 0 && (
                      <>
                        <Typography id="modal-modal-description" sx={{ textAlign: 'left', mt: 1 }}>
                          Selected Appointment Date: &nbsp;
                          {format(new Date(date), "dd/MM/yyyy")} &nbsp;
                          {/* &nbsp;{formatAsDDMMYYYY(date)}{" "} */}
                          {selectedTimeHR?.toString().padStart(2, "0")}{" "}
                          {selectedTimeHR && ":"}{" "}
                          {selectedTime?.toString().padStart(2, "0")}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, width: "100%" }}>
                          <Stack direction="row" spacing={1}>
                            <Button variant="contained" style={{ justifyContent: "flex-start" }} onClick={() => handleResidualClick()}>
                              Reschedule
                            </Button>
                          </Stack>
                        </Box>
                      </>
                    )}
                    </>
                  )}
                </Box>
              </Grid>
            </Modal>
          )}
        </Card>
      </Grid>
    );
  };

  return (
    <BookingCard title="Family Members" btn1title="History" btn2title="Refresh" btn3title="Upcomming" btnoneaction={handleTabChange} btntwoaction={handleTabChange} btnthreeaction={handleTabChange}>

      {activeTab === "upcoming" && upcomingAppointments.length > 0 && (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {upcomingAppointments.map((appointment, index) => (
            <AppointmentCard {...appointment} key={index} />
          ))}
        </Grid>
      )}

      {activeTab === "history" && historyAppointments.length > 0 && (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {historyAppointments.map((appointment, index) => (
            <AppointmentCard {...appointment} key={index} />
          ))}
        </Grid>
      )}

      {loading && (<CustomLoader />)}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </BookingCard>
  );
};

export default Dashboard;
