// material-ui
import { Grid, TextField  } from '@mui/material';

const disabled = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000a1",
    },
}


const KinDetails = ({formData}) => {
    return(
        <>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 10, md: 10 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth  label="Last Name"  defaultValue={(formData?.lastNameKin)? formData?.lastNameKin : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth label="First Name"  defaultValue={(formData?.firstNameKin)? formData?.firstNameKin : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Middle Name"  defaultValue={(formData?.middleNameKin)? formData?.middleNameKin : '-'} sx={disabled}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField disabled id="outlined-disabled" fullWidth label="Relation"  defaultValue={(formData?.relation)? formData?.relation : '-'} sx={disabled}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default KinDetails;