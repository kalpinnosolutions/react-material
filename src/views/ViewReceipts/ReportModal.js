import {useState, Fragment} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const buttonStyle = {
    position: 'absolute',
    right: 8, 
    top: 8, 
    color: "#fff", 
    backgroundColor: 'red',
    "&:hover": {
      background: "#red"
    }
}

export default function ReportModal(props) {
    const {isOpen, onClose, children} = props;
    const [open, setOpen] = useState(isOpen);

    const handleClose = () => {
        setOpen(false);
        onClose();
    };
    return (
        <Fragment>
            <BootstrapDialog onClose={handleClose}  open={open || isOpen} fullScreen>
                <IconButton aria-label="close" onClick={handleClose} sx={buttonStyle}>
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </BootstrapDialog>
        </Fragment>
    );
}