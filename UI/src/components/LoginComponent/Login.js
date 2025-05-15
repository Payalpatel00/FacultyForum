import './Login.css';
import {  useState } from 'react';
import axios from 'axios';
import {_userapiurl} from '../../ApiUrl.js';
import {useNavigate} from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const[roll,setRoll]=useState();
    const[password,setPass]=useState();
    const[output,setOutput]=useState();
    const handleSubmit=()=>{
       if(roll==" ")
       {
        setOutput("roll no required");
       }
       else if(password==" ")
       {
        setOutput("password required");
       }
       else
       {
        const userDetail={"roll":roll,"password":password};
        axios.post(_userapiurl+"login",userDetail).then((response)=>{

            //alert(response.data.userlist._id);
            const user=response.data.userlist;

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("_id",user._id); 
            localStorage.setItem("name",user.name); 
            localStorage.setItem("email",user.email); 
            localStorage.setItem("roll",user.roll); 
            localStorage.setItem("password",user.password); 
            localStorage.setItem("address",user.address); 
            localStorage.setItem("mobile",user.mobile); 
            localStorage.setItem("city",user.city); 
            localStorage.setItem("gender",user.gender); 
            localStorage.setItem("role",user.role); 
            localStorage.setItem("status",user.status); 
            localStorage.setItem("info",user.info); 
           
             (user.role=="admin")?navigate("/admin"):navigate("/user");
             
            }).catch((error)=>{
             //console.log("error");
             setOutput("login unsuccessfull check your details");
           });
       }
};
    return(
      <>
      <div id='box'>
      
      <h2> Login Here!! </h2>
       
      <br/>
           
           <span id='span'>{output}</span>
           
            <form id='form'>
                
                <div class="form-group">
                    <label for="roll">Roll Number:</label>
                    
                    <input type = 'text' 
                    class="form-control" 
                    placeholder='Enter Roll No' 
                    value={roll} 
                    onChange={e=>(setRoll(e.target.value))}/>
                </div>
               
                
                
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type = 'password' 
                    class="form-control" 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={e=>(setPass(e.target.value))}/>
                </div>
                <br/>
            
                <button type='button' onClick={handleSubmit} class="btn btn-danger">Login</button>
            </form>
        </div>
        </>
    );
    
}
export default Login;