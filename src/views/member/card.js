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


export default function CardList(props) {

    const { name, PtnNo, mobileNumber, email, registrationStatus, image } = props.data;

    return (
        <Card sx={{ border: 2, borderColor: '#17A54A'  }}>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Avatar alt={name} src={
                        image.includes(".png")
                        ? image
                        : `data:image/png;base64,${image}`
                    } sx={{ width: 56, height: 56 }} />
                </Stack>
                <Typography gutterBottom variant="h5" component="div" sx={{pt:2,  fontSize: 'h3.fontSize'}}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 'h4.fontSize', fontWeight : '500' }}>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight : '500' }}>Patient Number: {PtnNo}</Typography>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight : '500' }}>Mobile Number: {mobileNumber}</Typography>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight : '500' }}>Registration Status: {registrationStatus}</Typography>
                    <Typography sx={{ fontSize: 'h5.fontSize', fontWeight : '500' }}>Email Address: {email}</Typography>
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}