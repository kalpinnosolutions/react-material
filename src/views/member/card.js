import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import cardImage from '../../assets/images/patient/avatar.jpg';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { differenceInYears, parseISO } from "date-fns";


export default function CardList(props) {

    const { name, PtnNo, mobileNumber, email,  image, gender, age, marriedStatus } = props.data;

    function convertDateFormat(inputDateString) {
        const inputDate = new Date(inputDateString);

        const year = inputDate.getFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDate.getDate().toString().padStart(2, "0");

        return `${year}${month}${day}T${"12"}${"00"}Z`;
    }

    const calculateAge = (dateString) => {
        const birthDate = parseISO(dateString);
        const currentDate = new Date();
        const age = differenceInYears(currentDate, birthDate);
        return age;
    };

    return (
        <Card sx={{ border: 2, borderColor: '#17A54A' }}>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar alt={
                        (name !== "")?
                        name.replace('MR. ','').replace('MRS. ','') : "A"
                    } src={
                        image.includes(".png")
                            ? image
                            : `data:image/png;base64,${image}`
                    } sx={{ width: 56, height: 56 }} />
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 'h3.fontSize' }}>
                        {name}
                        <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>{`
                                  ${gender},
                                  
                                  ${calculateAge(convertDateFormat(age)) + "yrs"
                            },
                                  ${marriedStatus}`}</Typography>
                    </Typography>
                </Stack>
                <table style={{ marginTop: "5px" }}>
                    <tbody>
                        <tr>
                            <th align="left" style={{fontWeight: '500'}}>Patient Number:</th>
                            <th align="left" style={{fontWeight: '500'}}>{PtnNo}</th>
                        </tr>
                        <tr>
                            <th align="left" style={{fontWeight: '500'}}>Mobile Number:</th>
                            <th align="left" style={{fontWeight: '500'}}>{mobileNumber}</th>
                        </tr>
                        {/* <tr>
                            <th align="left" style={{ paddingRight: "10px", fontWeight: '500' }}>Registration Status:</th>
                            <th align="left" style={{ fontWeight: '500' }}>{registrationStatus}</th>
                        </tr> */}
                        <tr>
                            <th align="left" style={{fontWeight: '500'}}>Email Address:</th>
                            <th align="left" style={{fontWeight: '500'}}>{email}</th>
                        </tr>
                    </tbody>
                </table>
                {/* <Typography variant="body2" sx={{ fontSize: 'h4.fontSize', marginTop: 2 }}>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>Patient Number: {PtnNo}</Typography>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>Mobile Number: {mobileNumber}</Typography>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>Registration Status: {registrationStatus}</Typography>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight: '500' }}>Email Address: {email}</Typography>
                </Typography> */}
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}