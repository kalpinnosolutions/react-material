// material-ui
import { Grid, TextField  } from '@mui/material';

const disabled = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000a1",
    },
}


const ContactDetails = ({formData}) => {
    return(
        <>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 10, md: 10 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth  label="Address 1"  defaultValue={(formData?.address1)? formData?.address1 : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Address 2"  defaultValue={(formData?.address2)? formData?.address2 : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Address 3"  defaultValue={(formData?.address3)? formData?.address3 : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="City"  defaultValue={(formData?.city?.value)? formData?.city?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Pincode"  defaultValue={(formData?.pincode)? formData?.pincode : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="State"  defaultValue={(formData?.state?.value)? formData?.state?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Country"  defaultValue={(formData?.country?.value)? formData?.lastName?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Phn(H)"  defaultValue={(formData?.phoneHome)? formData?.phoneHome : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Phn(o)"  defaultValue={(formData?.phoneOffice)? formData?.phoneOffice : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Mobile"  defaultValue={(formData?.mobile)? formData?.mobile : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Email ID"  defaultValue={(formData?.email)? formData?.email : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Passport No"  defaultValue={(formData?.passportNo)? formData?.passportNo : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Exp. Dt"  defaultValue={(formData?.expiryDate)? formData?.expiryDate : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Place Of Issue"  defaultValue={(formData?.placeOfIssue)? formData?.placeOfIssue : '-'} sx={disabled}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default ContactDetails;