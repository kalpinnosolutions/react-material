import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
// import { fetchReceipt, fetchReceiptPDF } from "../../assets/data";
import { fetchReceipt } from "../../assets/data";
import { useSelector } from "react-redux";

import CustomLoader from '../../ui-component/CustomLoader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));



const RECEIPT = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowData, setRowData] = useState([]);
    // const [pdfData, setPdfData] = useState("");
    const [loading, setLoading] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);
    const userData = useSelector((state) => state?.userData.userData);

    const columns = [
        { id: 'IPOPFlg', label: 'IP/OP', minWidth: 150 },
        { id: 'IPNO', label: 'IP No/Ptn NO', minWidth: 100 },
        {
            id: 'BILLNO',
            label: 'Bill No',
            minWidth: 150,
            align: 'right',
        },
        {
            id: 'BILLDT',
            label: 'Bill Date',
            minWidth: 150,
            align: 'right',
        },
        {
            id: 'BILLAMT',
            label: 'Bill Amount',
            minWidth: 150,
            align: 'right',
            format: (value) => parseFloat(value).toFixed(1),
        },
        {
            id: 'ReceiptDate',
            label: 'Payment Date',
            minWidth: 150,
            align: 'right',
        },
        {
            id: 'ReceiptNo',
            label: 'Receipt No',
            minWidth: 150,
            align: 'right',
        },
        {
            id: 'ReceiptAMT',
            label: 'Amount',
            minWidth: 150,
            align: 'right',
            format: (value) => parseFloat(value).toFixed(1),
        },
        {
            id: 'Report',
            label: 'Report',
            minWidth: 150,
            align: 'right',
        }
    ];

    function createData(IPOPFlg, IPNO, BILLNO, BILLDT, BILLAMT, ReceiptDate, ReceiptNo, ReceiptAMT, Report) {

        if(ReceiptDate !== ""){
            const dateObject = new Date(ReceiptDate);
            const day = dateObject.getDate().toString().padStart(2, "0");
            const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
            const year = dateObject.getFullYear();

            // Format the date as DD/MM/YYYY
            ReceiptDate = `${day}/${month}/${year}`;
        }
        return { IPOPFlg, IPNO, BILLNO, BILLDT, BILLAMT, ReceiptDate, ReceiptNo, ReceiptAMT, Report };
    }

    //const rows = [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ptnNo = userData?.PtnNo;
        const receiptData = await fetchReceipt(ptnNo);

        if (!Array.isArray(receiptData)) {
            setLoading(false);
            return;
        }
        const formattedReceiptData = receiptData.map((item) => ({
          ...item,
          IPOPFlg: item?.IPOPFlg === "O" ? "OP" : "IP",
          BILLDT: new Date(item.BILLDT).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          PharmaDt: new Date(item.PharmaDt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        }));

        let TableData = [];
        if (formattedReceiptData.length > 0) {
            formattedReceiptData.map((item) => {
                TableData.push(createData(item.IPOPFlg, item.IPNO, item.BILLNO, item.BILLDT, item.BILLAMT, item.ReceiptDate, item.ReceiptNo, item.ReceiptAMT, item.FREEFLG));
            })
        }

        if(TableData.length > 0 ){
            setRowData(TableData)
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching bill data:", error);
      }
      setLoading(false);
    })();
  }, []);

//   const handleGeneratePdf = async (rowData) => {
//     setLoading(true);
//     const ptnNo = userData?.PtnNo;
//     const res = await fetchReceiptPDF(ptnNo, rowData);

//     setPdfData(res);
//     setIsOpen(true);
//     setLoading(false);
//   };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
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
                    {rowData.length > 0 ? (
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
                                                        : value}
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
                count={rowData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                {loading && (
                    <CustomLoader/>
                )}
        </Paper>
    );
}


export default RECEIPT;