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
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ReportModal from './ReportModal';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Button from '@mui/material/Button';

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
    const [pdfData, setPdfData] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const userData = useSelector((state) => state.userData.userData);

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

    function createData(BILLAMT, BILLDT, BILLNO, CSHDEPTCD, FREEFLG, IPNO, IPOPFlg, PharmaAmt, PharmaBillType, PharmaCntrCd, PharmaCrtDtTm, PharmaDoca, PharmaDocn, PharmaDt, PharmaPayMode, PharmaStoreCd, PharmaTyp, PharmaTypCd, ReceiptAMT, ReceiptDate, ReceiptNo, VCHCHRGCD, WINGCD, YR, Report) {

        if (ReceiptDate !== "") {
            const dateObject = new Date(ReceiptDate);
            const day = dateObject.getDate().toString().padStart(2, "0");
            const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
            const year = dateObject.getFullYear();

            // Format the date as DD/MM/YYYY
            ReceiptDate = `${day}/${month}/${year}`;
        }
        return { BILLAMT, BILLDT, BILLNO, CSHDEPTCD, FREEFLG, IPNO, IPOPFlg, PharmaAmt, PharmaBillType, PharmaCntrCd, PharmaCrtDtTm, PharmaDoca, PharmaDocn, PharmaDt, PharmaPayMode, PharmaStoreCd, PharmaTyp, PharmaTypCd, ReceiptAMT, ReceiptDate, ReceiptNo, VCHCHRGCD, WINGCD, YR, Report };
    }

    //const rows = [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUploadCloseClick = () => {
        setIsOpen(false);
    }


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
                        TableData.push(createData(item.BILLAMT, item.BILLDT, item.BILLNO, item.CSHDEPTCD, item.FREEFLG, item.IPNO, item.IPOPFlg, item.PharmaAmt, item.PharmaBillType, item.PharmaCntrCd, item.PharmaCrtDtTm, item.PharmaDoca, item.PharmaDocn, item.PharmaDt, item.PharmaPayMode, item.PharmaStoreCd, item.PharmaTyp, item.PharmaTypCd, item.ReceiptAMT, item.ReceiptDate, item.ReceiptNo, item.VCHCHRGCD, item.WINGCD, item.YR, null));
                    })
                }

                if (TableData.length > 0) {
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

    const handleGeneratePdf = async (rowData) => {
        setLoading(true);
        const ptnNo = userData?.PtnNo;
        const res = await fetchbillPDF(ptnNo, rowData);
        console.log(res);
        setPdfData(res);
        setIsOpen(true);
        setLoading(false);
    };

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
                                                            : column.id !== 'Report' ? value
                                                                : <Button onClick={() => handleGeneratePdf(row)}><Tooltip title="View"><IconButton><DescriptionOutlinedIcon /></IconButton></Tooltip></Button>
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
            <ReportModal
                isOpen={isOpen}
                onClose={handleUploadCloseClick}
                height="100%"
                width="100%"
            >
                {pdfData && (
                    <iframe
                        src={`data:application/pdf;base64,${pdfData}`}
                        title="PDF Viewer"
                        width="100%"
                        height="100%"
                    />
                )}
            </ReportModal>
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
                <CustomLoader />
            )}
        </Paper>
    );
}


export default RECEIPT;