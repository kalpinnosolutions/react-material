import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/userDataSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Logout() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    toast.success("Logout successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: "bookappointment",
      });

      dispatch(setUserData(""));
      window.history.replaceState(null, null, "/");
      navigate("/login");
  });

  return(
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
  );
}
