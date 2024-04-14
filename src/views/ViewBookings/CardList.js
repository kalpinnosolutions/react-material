import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import cardImage from '../../assets/images/patient/avatar.jpg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Grid, Modal, Box } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { format, parse } from "date-fns";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function CardList({ appointment, activeTab }) {

    const appointmentDateTime = `${appointment.ApptDt} ${appointment.ApptTm}`;
    const parsedDate = parse(appointmentDateTime, "yyyyMMdd HH:mm", new Date());

    return (
        
    );
}

function ConfirmBox({ isTemModal }) {

    const [open, setOpen] = useState(isTemModal);
    // const [isChecked, setIsChecked] = useState(false)

    

    const handleClose = () => {
        setOpen(false);
        handleCloseTermModal()
    };

    const handlesubmit = () => {
        handleTermSubmit()
    }

    // const handleCheckTerms = () => {
    //   handleCheckChange(!isChecked);
    //   setIsChecked(!isChecked)
    // }


    return (
        <>
            <Modal
                open={open || isTemModal}
                onClose={(_, reason) => reason === 'backdropClick' && setOpen(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <Box style={{ justifyContent: 'center' }} sx={{ mt: 3 }}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel onClick={() => toggleSelection("reSchedule")} control={<Radio />} label="Reschedule" />
                            {selectedAppointmentStatus !== "Confirmed" && (
                                <FormControlLabel onClick={() => toggleSelection("cancel")} control={<Radio />} label="Cancle" />
                            )}
                        </RadioGroup>
                        <Stack direction="row" spacing={5}>
                            <Button variant="contained" style={{ justifyContent: "flex-start" }} color="error" onClick={() => handleClose(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" style={{ justifyContent: "flex-end" }} color="success" onClick={() => handlesubmit()} >
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}