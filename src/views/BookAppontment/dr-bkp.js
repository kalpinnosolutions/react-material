import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

import Ortho from '../../assets/images/department/ortho.jpg';
import { Grid } from '@mui/material';

import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// import DeleteIcon from '@mui/icons-material/Delete';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import image from '../../assets/images/patient/avatar.jpg';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#17a54a96' : '#17a54a96',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DepartmentCard() {


    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Item>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    alt="Remy Sharp"
                                    src={image}
                                    sx={{ width: 56, height: 56 }}
                                />
                            }
                            title="DR. ARUNKUMAR.K"
                            subheader="DENTAL"
                        />
                        <CardMedia
                            sx={{ height: '100%', width: '100%' }}
                            image={Ortho}
                            title="green iguana"
                        />
                        {/* <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        
                    </CardContent> */}
                        <CardActions>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" startIcon={<PersonPinOutlinedIcon />} style={{ justifyContent: "flex-start" }}>
                                    View
                                </Button>
                                <Button variant="contained" endIcon={<CalendarMonthOutlinedIcon />} style={{ justifyContent: "flex-end" }}>
                                    Book
                                </Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </Item>
            </Grid>
        </Grid>
    );
}