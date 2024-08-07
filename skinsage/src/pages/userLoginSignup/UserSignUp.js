import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './User.css'
import Logo from '../../components/navbar/skinlogo.png'

export default function UserSignUp() {

  let navigate = useNavigate();

  // SIGNUP API.
  const [signupCredentials, setSignupCredentials] = useState({ name: '', email: '', gender: '', password: '',cpassword: '',age:"20" });
  const onChangeSignup = (e) => {
      setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
  }

  const handleSignupSubmit = async (e) => {
      e.preventDefault();
      if(signupCredentials.password === signupCredentials.cpassword){
          try {
            const response = await fetch(`http://localhost:5000/api/authUser/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: signupCredentials.name, email: signupCredentials.email, gender: signupCredentials.gender, password: signupCredentials.password })
            });
            const json = await response.json()
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                navigate("/");
                toast.success("Account Created Successfully");
            }
            else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
      }
      else{
        toast.error("Confirm password doesnt match");
      }
      
  }


  return (
    <>
    <div>
      <div className='User_reg_Outer'>
          <img style={{width : "20vw"}} src={Logo} alt="" />
          <h1>User Register</h1>
          <form action="" onSubmit={handleSignupSubmit}>
            <div className="userdetails">
              <input type="text" name='name' placeholder='Full Name' defaultValue={signupCredentials.name} onChange={onChangeSignup}/>
              <input type="email" name='email' placeholder='Email ID' defaultValue={signupCredentials.email} onChange={onChangeSignup}/>
              <input type="password" name='password' placeholder='Password' defaultValue={signupCredentials.password} onChange={onChangeSignup}/>
              <input type="password" name='cpassword' placeholder='Confirm Password' defaultValue={signupCredentials.cpassword} onChange={onChangeSignup}/>
              <input type="text" name='gender' placeholder='Gender' defaultValue={signupCredentials.gender} onChange={onChangeSignup}/>
            </div>
            <div className='term_cond'>
                <input type="checkbox" name='check1' id='check1' /> 
                <label htmlFor="check1">I agree to all the <span className='TC'>Terms & Conditions</span></label>
            </div>
            <button type="submit" className='Reister_but' >Register</button>
          </form>
      </div>
    </div>
    </>
  )
}
