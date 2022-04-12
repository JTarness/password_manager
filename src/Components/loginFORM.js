import React from 'react'
import { useState } from "react"
import './loginFORM.css';
import accountImage from '../images/accountsymbol.png';
import inPortalHome from './home.js';

function Popup(props) {
   
    const initialValues = {username:"",password:""};
    const [inputs, setInputs] = useState(initialValues);
    const [inPortal,setInPortal] = useState({});

    const handleChange = (event) => { 
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
   async function checkValidation(event) {
        event.preventDefault();
        fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs)
        })
        .then((response) => response.json())
        .then(setInPortal(true))
        if(inPortal)
            {
                console.log("in the portal")

            }
        props.setTrigger(false)
        if(props.trigger == true)
            {
                setInputs(initialValues);
            }
      }


    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className='closebutton_section'>
                <button className="close-btn" onClick={() => props.setTrigger(false)} > X </button>
                {props.children} 
                <div className='accountImage'>
                <img src={accountImage} className="App-AccountLogo" alt="logo" />
                </div>
                </div>
               
                <div className='login_section'>
                <form onSubmit={checkValidation}>
                    <ul>
                 <li>   <label>Username:
                        <input
                            type="text"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                        />
                    </label> </li> 
                  <li>  
                      <label>Password:
                        <input
                            type="text"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </label> 
                    </li>
                 <li>   <input type="submit" /> </li> 
                    </ul>
                    
                </form>
                </div>
            </div>


        </div>

    ) : "";
}

export default Popup