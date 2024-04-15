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
                        <TextField id="outlined" fullWidth  label="Address 1"  value={(formData?.address1)? formData?.address1 : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined" fullWidth label="Address 2"  value={(formData?.address2)? formData?.address2 : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined" fullWidth label="Address 3"  value={(formData?.address3)? formData?.address3 : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="City"  value={(formData?.city?.value)? formData?.city?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Pincode"  value={(formData?.pincode)? formData?.pincode : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="State"  value={(formData?.state?.value)? formData?.state?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Country"  value={(formData?.country?.value)? formData?.lastName?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Phn(H)"  value={(formData?.phoneHome)? formData?.phoneHome : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Phn(o)"  value={(formData?.phoneOffice)? formData?.phoneOffice : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Mobile"  value={(formData?.mobile)? formData?.mobile : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Email ID"  value={(formData?.email)? formData?.email : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Passport No"  value={(formData?.passportNo)? formData?.passportNo : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Exp. Dt"  value={(formData?.expiryDate)? formData?.expiryDate : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined" fullWidth label="Place Of Issue"  value={(formData?.placeOfIssue)? formData?.placeOfIssue : '-'} sx={disabled}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default ContactDetails;