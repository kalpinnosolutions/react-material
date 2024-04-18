import { useState, useEffect } from 'react';
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

const ALink = styled(Chip)(() => ({
    padding: "2px",
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
    }
}));

const tabClass = {
    padding: "2px",
    textAlign: 'center',
    border: 1,
    backgroundColor: '#2F3490',
    color: '#fff',
    margin: "10px",
    borderRadius: "30px",
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: "#17A54A",
        color: "#17A54A",
        borderColor: "#17A54A",
        border: 2,
    }
}

const activeTabClass = {
    padding: "2px",
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
    }
}


export default function DepartmentCard({ departmentList, searchDoctorList }) {

    const [activeTab, setActiveTab] = useState('CARDIOLOGY');


    useEffect(() => {

        if (departmentList.length > 0) {
            departmentList.map((dept) => {
                if(dept?.label === activeTab){
                    searchDoctorList(dept?.id)
                }
            })
        }
    }, []);

    const handleClick = (code, tab) => {
        setActiveTab(tab)
        searchDoctorList(code)
    }

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 6, sm: 8, md: 12 }}>
                {/* <ALink label='All' variant="outlined" clickable={true} onClick={ () => handleClick("", "All") } style={activeTab === "All" ? activeTabClass : tabClass} /> */}
                {departmentList && departmentList.length > 0 && (
                    departmentList.map((dept, index) => (
                        <ALink label={dept?.label} variant="outlined" clickable={true} key={index} onClick={() => handleClick(dept?.id, dept?.label)} style={activeTab === dept?.label ? activeTabClass : tabClass} />
                    ))
                )}
            </Grid>
        </Paper>
    );
}