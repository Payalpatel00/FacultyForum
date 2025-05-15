import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout(){
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem('_id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('address');
        localStorage.removeItem('mobile');
        localStorage.removeItem('city');
        localStorage.removeItem('statud');
        localStorage.removeItem('role');
        localStorage.removeItem('gender');
        localStorage.removeItem('info');

        navigate("/login");
    })
    return(
     <>
     
     </>
    );
}
export default Logout;