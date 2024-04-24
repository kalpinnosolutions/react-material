import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Link } from '@mui/material';
import { PrimeGreenButton } from '../../ui-component/Button';
import { DataGrid } from '@mui/x-data-grid';
import CancelIcon from '@mui/icons-material/Cancel';

import {
    fetchExistingMemberSubmit,
    fetchSubmitMember,
  } from "../../assets/data";
  import { useSelector } from "react-redux";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "100%",
    maxHeight: "550px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: 'block',
    //overflow: 'scroll',
    p: 4,
};

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'PtnNo', headerName: 'Patient No', width: 130 },
    { field: 'PtnNm', headerName: 'Patient Full Name', width: 250 },
    { field: 'Age', headerName: 'Age', width: 100 },
    { field: 'Gender', headerName: 'Gender', width: 100 },
];

function createData(id, Age, BirthDt, Gender, PtnAddress, PtnNm, PtnNo, PtnPhoto, PtnSrNo, RegReqNo, RegReqStatus, RegReqStatusCd, email, mobile, mrtl_sts_cd, mrtl_sts_dcd, ptnTitle, ptn_frst_nm, ptn_lst_nm, ptn_mid_nm, ptn_no) {
    Gender = Gender === "F" ? "Female" : Gender === "M" ? "Male" : "Other";
    return { id, Age, BirthDt, Gender, PtnAddress, PtnNm, PtnNo, PtnPhoto, PtnSrNo, RegReqNo, RegReqStatus, RegReqStatusCd, email, mobile, mrtl_sts_cd, mrtl_sts_dcd, ptnTitle, ptn_frst_nm, ptn_lst_nm, ptn_mid_nm, ptn_no };
}


const CustomModal = ({ isOpen, onClose, allPtnData, individualPtnData, HandleExistingMember }) => {

    const [modalOpen, setModalOpen] = useState(isOpen);
    const [rowData, setRowData] = useState([]);
    const [parentPtnNomber, setParentPtnNomber] = useState("");
    const [parentPtnNo, setParentPtnNo] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const mobileNumber = useSelector((state) => state?.userData?.userpnno);
    const PassPtnNo = useSelector((state) => state?.userData?.passNo);

    useEffect(() => {
        console.log(parentPtnNo)
        console.log(parentPtnNomber);
        if (allPtnData.length > 0) {
            let TableData = [];
            if (allPtnData.length > 0) {
                allPtnData.map((item, index) => {
                    TableData.push(createData((index + 1), item.Age, item.BirthDt, item.Gender, item.PtnAddress, item.PtnNm, item.PtnNo, item.PtnPhoto, item.PtnSrNo, item.RegReqNo, item.RegReqStatus, item.RegReqStatusCd, item.email, item.mobile, item.mrtl_sts_cd, item.mrtl_sts_dcd, item.ptnTitle, item.ptn_frst_nm, item.ptn_lst_nm, item.ptn_mid_nm, item.ptn_no));
                })
            }
            if (TableData.length > 0) {
                setRowData(TableData)
            }
        }
    }, [allPtnData]);

    useEffect(() => {
        setParentPtnNo(individualPtnData?.UserID ? individualPtnData?.UserID : "");
        if (individualPtnData?.UserPtnNo >= 0) {
            setParentPtnNomber(individualPtnData?.UserPtnNo);
        }
    }, [individualPtnData]);

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        setModalOpen(false);
        onClose();
    };

    const handleSubmit = async () => {

        if (selectedRows.length > 0) {

            try {
                if (parentPtnNomber === 0) {
                    const SubmitedData = {
                        COCD: "1",
                        LOCCD: 1,
                        DIVCD: 1,
                        PTNNO: selectedRows.map((row) => row.PtnNo).join(", "),
                        MOBILENO: mobileNumber,
                        PINCODE: PassPtnNo,
                        IsSyncToMysql: 0,
                        UserId: JSON.stringify(parentPtnNo),
                    };

                    const data = await fetchSubmitMember(SubmitedData);
                    if (data?.RecordSaved) {
                        HandleExistingMember(data);
                        fetchData();
                    }
                } else {
                    const PtnNoList = selectedRows.map((row) => row.PtnNo).join(", ");

                    const data = await fetchExistingMemberSubmit(
                        PtnNoList,
                        parentPtnNomber
                    );
                    if (data?.RecordSaved) {
                        HandleExistingMember(data);
                        fetchData();
                    }
                }
            } catch (error) {
                console.error("Error in handleSubmit:", error);
            }
        }
    };

    return (
        <Modal
            open={modalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'right' }} >
                    <Link href="#" color="#f3212f" underline="none" onClick={() => closeModal()}><CancelIcon/></Link>
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rowData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        onRowSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectRows = rowData.filter((row) =>
                                selectedIDs.has(row.id),
                            );
                            setSelectedRows(selectRows);
                        }}
                        disableMultipleRowSelection={parentPtnNomber === 0 ? true : false}
                        sx={{
                            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                                display: "none"
                            }
                        }}
                    />
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'left' }} >
                    <PrimeGreenButton size="large" variant="outlined" onClick={() => handleSubmit()}>Submit</PrimeGreenButton>
                </Typography>
            </Box>
        </Modal>
    );
};

export default CustomModal;