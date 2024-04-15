// material-ui
import { Grid, TextField, Avatar } from '@mui/material';
import image from '../../assets/images/login/female_icon_new.png';
import React, { useEffect, useState } from "react";

const disabled = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000a1 !important",
    },
}

const Demographic = (props) => {
    const { imageUrl, formData } = props;
    const [baseU4Image, setBaseU4Image] = useState(imageUrl);
    const [data, setData] = useState(formData);


    useEffect(() => {
        setBaseU4Image(imageUrl);
    }, [imageUrl]);

    useEffect(() => {
        setData(formData)
    });

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 10, md: 10 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={2} >
                    {baseU4Image?.length > 0 ? (
                        <Avatar
                            src={
                                baseU4Image?.length > 0
                                    ? `data:image/png;base64,${baseU4Image}`
                                    : URL.createObjectURL(selectedPhoto)
                            }
                            alt="Patient"
                            sx={{ width: 150, height: 155 }}
                        />
                    ) : (
                        <>
                            <Avatar
                                src={image}
                                alt="Patient"
                                sx={{ width: 150, height: 155 }}
                            />
                        </>
                    )}
                </Grid>
                <Grid item xs={8} >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="Title"
                                value={formData.title}
                             sx={disabled}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="Last Name"
                                value={(data?.lastName) ? data?.lastName : '-'}
                                sx={disabled}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="First Name"
                                value={(data?.firstName) ? data?.firstName : '-'}
                                sx={disabled}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="Middle Name" value={(data?.middleName) ? data?.middleName : '-'} sx={disabled} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="Gender" value={(data?.gender.label) ? data?.gender.label : '-'} sx={disabled} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="Birth Date" value={(data?.birthDate) ? data?.birthDate : '-'} sx={disabled}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined" fullWidth label="Age" value={(data?.age) ? data?.age : '-'} sx={disabled}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Demographic;