import { styled,  } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

export const PrimeGreenButton = styled(MuiButton)(() => ({
    backgroundColor: "#17A54A", color: "#fff", '&:hover': {
        background: "#17a54ac9",
    }
}));

export const PrimeBlueButton = styled(MuiButton)(() => ({
    backgroundColor: "#2F3490", color: "#fff", '&:hover': {
        background: "#2f3490de",
    }
}));