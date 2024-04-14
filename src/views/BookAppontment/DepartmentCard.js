import * as React from 'react';
import { Grid } from '@mui/material';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import Link from '@mui/material/Link';

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     "&.hover": {
//         background:'black',
//     }
// }));

const ALink = styled(Chip)(({ theme }) => ({
    padding: theme.spacing(1.5),
    textAlign: 'center',
    border: 1, 
    backgroundColor: '#17A54A',
    color: '#fff',
    margin: "10px",
    borderRadius: "30px",
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: "#17A54A",
        color: "#17A54A",
        borderColor: "#17A54A",
        border: 2,
        fontWeight: 600
    }
     
}));


export default function DepartmentCard({departmentList, searchDoctorList}) {

    const handleClick = (code) => {
        searchDoctorList(code)
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                <ALink label='All' variant="outlined" clickable={true} onClick={ () => handleClick("") } />
                {departmentList && departmentList.length > 0 && (
                    departmentList.map((dept, index) => (
                        <ALink label={dept?.label} variant="outlined" clickable={true} key={index} onClick={ () => handleClick(dept?.id) } />
                    ))
                )}
            </Grid>
        </Paper>
    );
}