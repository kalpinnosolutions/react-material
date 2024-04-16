import { useState, useEffect } from 'react';

import { fetchLABTestlist } from "../../assets/data";
import { useSelector } from "react-redux";
import { format, isAfter, isBefore, sub } from "date-fns";
import { isEqual } from "date-fns";

// import { useEffect } from 'react';

// material-ui
// import { InputLabel } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import { gridSpacing } from 'store/constant';
// import { useSelector } from "react-redux";
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';?
// import MenuIcon from '@mui/icons-material/Menu';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomLoader from '../../ui-component/CustomLoader';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { InputLabel } from '@mui/material';

const inputClass = {
  "& .react-datepicker-wrapper input": {
    width: "80%",
    color: "#000",
    height: "35px",
    border: "2px solid",
    borderColor: "#17A54A",
    borderRadius: "5px",
    zIndex: 1500,
    textAlign: "center",
    fontWeight: 400,
    fontSize: "20px"
  },
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState(() => {
    return sub(new Date(), { days: 8 });
  });

  const [endDate, setEndDate] = useState(new Date());
  const [rowData, setRowData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const userData = useSelector((state) => state.userData.userData);

  const columns = [
    { id: 'TESTNAME', label: 'Test', minWidth: 170 },
    { id: 'SAMPLENO', label: 'Sample No', minWidth: 100 },
    {
      id: 'TESTORDDATE',
      label: 'Date',
      minWidth: 170,
      align: 'right'
    }
  ];

  function createData(TESTNAME, SAMPLENO, TESTORDDATE) {

    if (TESTORDDATE !== "") {
      TESTORDDATE = format(new Date(TESTORDDATE), "dd-MM-yyyy HH:mm")
    }
    return { TESTNAME, SAMPLENO, TESTORDDATE };
  }

  // const rows = [
  //   createData('India', 'IN', 1324171354),
  //   createData('China', 'CN', 1403500365),
  //   createData('Italy', 'IT', 60483973),
  // ];


  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>{value}</button>
  // ));

  const handleStartDateChange = (date) => {
    if (isEqual(date, endDate) || isBefore(date, endDate)) {
      setStartDate(date);
      console.log(rowData);
    }
  };

  const handleEndDateChange = (date) => {
    if (isEqual(date, startDate) || isAfter(date, startDate)) {
      setEndDate(date);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true)
      const ptnNo = userData?.PtnNo;
      const formattedStartDate = format(new Date(startDate), "yyyyMMdd")
      const formattedEndDate = format(new Date(endDate), "yyyyMMdd")
      const data = await fetchLABTestlist(ptnNo, formattedStartDate, formattedEndDate);

      let TableData = [];
      if (data !== null && data.length > 0) {
        data.map((item) => {
          TableData.push(createData(item.TESTNAME, item.SAMPLENO, item.TESTORDDATE));
        })
      }

      if (TableData.length > 0) {
        setRowData(TableData)
      } else {
        setRowData([]);
      }

      setLoading(false)
    })();
  }, [userData, endDate, startDate]);

  // const handleCellClicked = (params) => {
  //   // Access the row data
  //   const rowData = params.data;

  //   // Access the RadiologyRptPath property
  //   const radiologyPath = rowData?.RadiologyRptPath;

  //   // Open in web view or iframe (you may need to customize this part)
  //   if (radiologyPath) {
  //     // Open in web view or iframe based on your requirement
  //     window.open(radiologyPath, "_blank");
  //   }
  // };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ borderRadius: "12px" }}>
          <Toolbar style={{ justifyContent: 'center' }} color="#fff">
            <Box display="flex" justifyContent="center" alignItems="center" sx={inputClass}>
              <InputLabel style={{ color: "#fff", paddingRight: "10px", paddingLeft: "10px", fontWeight: "600", fontSize: '0.875rem' }}> Report from </InputLabel>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="DD-MM-YYYY"
                dateFormat="dd-MM-yyyy"
              />
              <InputLabel style={{ color: "#fff", paddingRight: "10px", paddingLeft: "10px", fontWeight: "600", fontSize: '0.875rem' }}> To </InputLabel>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="DD-MM-YYYY"
                dateFormat="dd-MM-yyyy"
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Paper style={{ width: '100%', overflow: 'hidden', marginTop: "20px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table aria-label="table" sx={{ height: "20px", minHeight: "30px" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData?.length > 0 ? (
                rowData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value
                              }
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow><TableCell colSpan={9}>No Records Found</TableCell></TableRow>
              )}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {loading && (<CustomLoader />)}
      </Paper>
    </>
  );
};

export default Dashboard;
