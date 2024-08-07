import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './OrgRegister.css'
import Logo from '../../components/navbar/skinlogo.png'

export default function OrgRegister() {

  let navigate = useNavigate();

  // SIGNUP API.
  const [signupCredentials, setSignupCredentials] = useState({ organisation_name: '', email: '', password: '', cpassword: '', address: "", government_id: "", organisation_type: "" });
  const onChangeSignup = (e) => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
  }

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupCredentials.password === signupCredentials.cpassword) {
      try {
        const response = await fetch(`http://localhost:5000/api/authOrganisation/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ organisation_name: signupCredentials.organisation_name, organisation_type: signupCredentials.organisation_type, government_id: signupCredentials.government_id, email: signupCredentials.email, address: signupCredentials.address, password: signupCredentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.authToken) {
          // Save the authToken and Redirect.
          localStorage.setItem('token', json.authToken);
          // navigate("/organisationDashboard");
          navigate("/campsregister");
          toast.success("Organisation Registered Successfully");
        }
        else {
          toast.error("Invalid credentials");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    else {
      toast.error("Confirm password doesnt match");
    }

  }


  return (
    <>
      <div>
        <div className='User_reg_Outer'>
          <img style={{ width: "20vw" }} src={Logo} alt="" />
          <h1>Organizations Register </h1>
          <form action="" onSubmit={handleSignupSubmit}>
            <div className="userdetails">
              <input type="text" name='organisation_name' placeholder='Organization Name' defaultValue={signupCredentials.name} onChange={onChangeSignup}/>
              <input type="text" name='organisation_type' placeholder='Organization Type -  eg: College, NGO' defaultValue={signupCredentials.organisation_type} onChange={onChangeSignup}/>
              <input type="text" name='government_id' placeholder='Government Issued ID Number (eg - NAAC Reg No : 334539)' defaultValue={signupCredentials.government_id} onChange={onChangeSignup}/>
              <input type="email" name='email' placeholder='Email ID' defaultValue={signupCredentials.email} onChange={onChangeSignup}/>
              <input type="password" name='password' placeholder='Password' defaultValue={signupCredentials.password} onChange={onChangeSignup}/>
              <input type="password" name='cpassword' placeholder='Confirm Password' defaultValue={signupCredentials.cpassword} onChange={onChangeSignup}/>
              <input type="text" name='address' placeholder='Address' defaultValue={signupCredentials.address} onChange={onChangeSignup}/>
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
