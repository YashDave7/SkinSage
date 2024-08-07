import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function OrganisationRegister() {

  let navigate = useNavigate();

  // SIGNUP API.
  const [registerCredentials, setRegisterCredentials] = useState({ organisation_name: '', organisation_type: '', government_id: '', email: '', address: '', password: '',cpassword: '' });
  const onChangeRegister = (e) => {
      setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
  }

  const handleSignupSubmit = async (e) => {
      e.preventDefault();
      if(registerCredentials.password === registerCredentials.cpassword){
          try {
            const response = await fetch(`http://localhost:5000/api/authOrganisation/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ organisation_name: registerCredentials.organisation_name, organisation_type: registerCredentials.organisation_type, government_id: registerCredentials.government_id, email: registerCredentials.email, address: registerCredentials.address, password: registerCredentials.password })
            });
            const json = await response.json()
            console.log(json);
            if (json.authToken) {
                // Save the authToken and Redirect.
                localStorage.setItem('token', json.authToken);
                navigate("/organisationDashboard");
                toast.success("Organisation Registered Successfully");
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
          <h1>Organisation Register</h1>
          <form action="" onSubmit={handleSignupSubmit}>
            <div className="userdetails">
              <input type="text" name='organisation_name' placeholder='Organisation Name' defaultValue={registerCredentials.organisation_name} onChange={onChangeRegister}/>
              <input type="text" name='organisation_type' placeholder='Organisation Type' defaultValue={registerCredentials.organisation_type} onChange={onChangeRegister}/>
              <input type="text" name='government_id' placeholder='Government ID No.' defaultValue={registerCredentials.government_id} onChange={onChangeRegister}/>
              <input type="email" name='email' placeholder='Email ID' defaultValue={registerCredentials.email} onChange={onChangeRegister}/>
              <input type="password" name='password' placeholder='Password' defaultValue={registerCredentials.password} onChange={onChangeRegister}/>
              <input type="password" name='cpassword' placeholder='Confirm Password' defaultValue={registerCredentials.cpassword} onChange={onChangeRegister}/>
              <input type="text" name='address' placeholder='Address' defaultValue={registerCredentials.address} onChange={onChangeRegister}/>
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
