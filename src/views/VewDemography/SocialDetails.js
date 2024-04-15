// material-ui
import { Grid, TextField  } from '@mui/material';

const disabled = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000a1",
    },
}


const SocialDetails = ({formData}) => {
    return(
        <>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 10, md: 10 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth  label="Nationality"   value={(formData?.nationality?.value)? formData?.nationality?.value : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Religion "   value={(formData?.religion)? formData?.religion : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Marital Status"   value={(formData?.maritalStatus)? formData?.maritalStatus : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Occupation "   value={(formData?.occupation)? formData?.occupation : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Community"   value={(formData?.community)? formData?.community : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Education"   value={(formData?.education)? formData?.education : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Height"   value={(formData?.height)? formData?. height: '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Units"   value={(formData?.heightUnits)? formData?.heightUnits : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Weight"   value={(formData?.weight)? formData?.weight : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Units"   value={(formData?.weightUnits)? formData?.weightUnits : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Blood Group"   value={(formData?.bloodGroup?.value)? formData?.bloodGroup?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="RH Factor"  value={(formData?.rhFactor)? formData?.rhFactor : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  id="outlined" fullWidth label="Aadhaar Card No"  value={(formData?.aadhaarCardNo)? formData?.aadhaarCardNo : '-'} sx={disabled}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default SocialDetails;