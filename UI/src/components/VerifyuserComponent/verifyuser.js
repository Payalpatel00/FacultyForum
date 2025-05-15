import axios from "axios"
import {Navigate, useParams } from "react-router-dom";
import {_userapiurl} from '../../ApiUrl.js';
import { useEffect,useState } from "react";

function Verifyuser(){
    const params =useParams();
    
    useEffect(()=>{
    
        axios.get(_userapiurl+"fetch?email="+params.email).then((response)=>{
            if(response.data[0].__v==0){
                var updateDeatails={"condition_obj":{"email":params.email},
                "content_obj":{"status":1,"__v":1}};
            axios.patch(_userapiurl+"update",updateDeatails).then((response)=>{
                console.log("user verified successfully");
            });
            }
        });
    },[]);

return(
<div>
    <Navigate to='/login'/>
</div>
)
}
export default Verifyuser;