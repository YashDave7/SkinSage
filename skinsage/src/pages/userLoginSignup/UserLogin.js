import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './User.css'
import Logo from '../../components/navbar/skinlogo.png'

export default function UserLogin() {

  let navigate = useNavigate();

  // LOGIN API.
  const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
      setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
  }

  const handleLoginSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(`http://localhost:5000/api/authUser/login`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ email: loginCredentials.email, password: loginCredentials.password })
          });
          const json = await response.json()
          console.log(json);
          if (json.authToken) {
              // Save the authToken and Redirect.
              localStorage.setItem('token', json.authToken);
              toast.success("Logged In Successfully");
              navigate("/");
          }
          else {
              toast.error("Wrong Credentials");
          }
      } catch (error) {
          toast.error("Something went wrong");
      }
  }

  return (
    <>
    <div>
      <div className='User_reg_Outer' onSubmit={handleLoginSubmit}>
          <img style={{width : "20vw"}} src={Logo} alt="" />
          <h1>User Login</h1>
          <form action="">
            <div className="userdetails">
                <input type="email" name='email' placeholder='Email ID' onChange={onChange} defaultValue={loginCredentials.email}/>
                <input type="password" name="password" placeholder='Password' onChange={onChange} defaultValue={loginCredentials.password}/>
            </div>
            <div>
                <label htmlFor="">Not a Registered User? <Link to="/auth/signup">SignUp Here</Link></label>
                <br />
                <br />
                <label htmlFor="">Organisation Account? <Link to="/org/login">Sign In Here</Link> </label>
            </div>
            <button  type="submit" className='Reister_but'>Log In</button>
          </form>
      </div>
    </div>
    </>
  )
}
