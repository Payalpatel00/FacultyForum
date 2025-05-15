import './CpFaculty.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {_userapiurl} from '../../ApiUrl'

function CpFaculty() {
    const [output,setOutput]=useState();
    const [opass,setOPass]=useState();
    const [npass,setNPass]=useState();
    const [cnpass,setCnPass]=useState();   

    const handleSubmit =()=>{
        axios.get(_userapiurl+"fetch?email="+localStorage.getItem('email')+"&password="+opass).then((response)=>{
            if(npass==cnpass)
            {
                let updateDetail= {"condition_obj":{"email":localStorage.getItem('email')},"content_obj":{"password":npass}};
                axios.patch(_userapiurl+"update",updateDetail).then((response)=>{
                    setOutput("Password change Successfully");
                    setOPass("");
                    setNPass("");
                    setCnPass("");
                }).catch((error)=>{
                    setOutput("Password not change Successfully")
                    setOPass("");
                    setNPass("");
                    setCnPass("");
                });
            }
            else
            {
                setOutput("new password and confrim password are not matched");
                setNPass("");
                setCnPass("");
            }    


        });

    }
    return (
    <>
    
                    <div id='box1'>
                    <h1>Change Password Here!!</h1>
                        <br />
                        <span style={{"color":"red"}}>{output}</span>
                        <br />
                        <form>
                            <div class="form-group">
                              <label for="Opass">Old Password :</label>  
                              <input type="password" class="form-control" value={opass} onChange={e=>setOPass(e.target.value)}/>
                            </div>
                            <br />
                            <div class="form-group">
                              <label for="Npass">New Password :</label>  
                              <input type="password" class="form-control" value={npass} onChange={e=>setNPass(e.target.value)}/>
                              </div>
                              <br />
                              <div class="form-group">
                              <label for="Cnpass">Confirm New Password :</label>  
                              <input type="password" class="form-control" value={cnpass} onChange={e=>setCnPass(e.target.value)}/>
                              </div>
                         
                              <br />
                             
                            <button type="button" class="btn btn-info" onClick={handleSubmit}>Change Password</button>

                        </form>
  
                    </div>
                

    </>
    );
}

export default CpFaculty;