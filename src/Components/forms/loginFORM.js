import React from 'react'
import { useState,useEffect  } from "react"
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import './loginFORM.css';
import accountImage from '../images/accountsymbol.png';

function Popup(props) {
   
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })
    
      const { email, password } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password,
        }
    
        dispatch(login(userData))
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
                      <label for="pwd">Password:
                          <input
	    		    type="password"
	    		    id="pwd"
	    		    name="pwd"
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
