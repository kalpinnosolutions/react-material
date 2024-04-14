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
                        <TextField disabled id="outlined-disabled" fullWidth  label="Nationality"   defaultValue={(formData?.nationality?.value)? formData?.nationality?.value : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Religion "   defaultValue={(formData?.religion)? formData?.religion : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Marital Status"   defaultValue={(formData?.maritalStatus)? formData?.maritalStatus : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Occupation "   defaultValue={(formData?.occupation)? formData?.occupation : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Community"   defaultValue={(formData?.community)? formData?.community : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Education"   defaultValue={(formData?.education)? formData?.education : '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Height"   defaultValue={(formData?.height)? formData?. height: '-'}  sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Units"   defaultValue={(formData?.heightUnits)? formData?.heightUnits : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Weight"   defaultValue={(formData?.weight)? formData?.weight : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Units"   defaultValue={(formData?.weightUnits)? formData?.weightUnits : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Blood Group"   defaultValue={(formData?.bloodGroup?.value)? formData?.bloodGroup?.value : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="RH Factor"  defaultValue={(formData?.rhFactor)? formData?.rhFactor : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Aadhaar Card No"  defaultValue={(formData?.aadhaarCardNo)? formData?.aadhaarCardNo : '-'} sx={disabled}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default SocialDetails;