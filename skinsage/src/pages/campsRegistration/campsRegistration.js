import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './campsRegistration.css'
import { useNavigate } from 'react-router-dom';

const CampsRegistration = () => {

    const navigate = useNavigate();
    // REGISTER API.
    const [registerCredentials, setRegisterCredentials] = useState({ date_of_camp: '', location: '', speciality: '', details: '', email: '', mobile: '', payment: '' });
    const onChangeRegister = (e) => {
        setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value });
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/authCamps/createcamp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ date_of_camp: registerCredentials.date, location: registerCredentials.location, speciality: registerCredentials.speciality, details: registerCredentials.details, email: registerCredentials.email, mobile: registerCredentials.mobile, payment: registerCredentials.payment })
            });
            const json = await response.json()
            console.log(json)
            console.log(json.status)
            if(json){
                alert("Camps Created Successfully");
                navigate("/")
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <div className="form-modal">
                <div id="signup-form">
                    <div className="heading">
                    <h1>Want to hold Camps?</h1>

                    </div>
                    <form onSubmit={handleRegisterSubmit}>
                        {/* <input type="text" name='organisation_name' defaultValue={registerCredentials.name} onChange={onChangeRegister} placeholder="Organisation name" /> */}
                        <input type="email" name='email' defaultValue={registerCredentials.email} onChange={onChangeRegister} placeholder="Enter your email" />
                        <input type="number" name='mobile' defaultValue={registerCredentials.mobile} onChange={onChangeRegister} placeholder="Enter your mobile no." />
                        <input type="text" name='location' defaultValue={registerCredentials.location} onChange={onChangeRegister} placeholder="City" />
                        <input type="text" name='speciality' defaultValue={registerCredentials.speciality} onChange={onChangeRegister} placeholder="Speciality" />
                        <input type="text" name='date_of_camp' defaultValue={registerCredentials.date} onChange={onChangeRegister} placeholder="Date" />
                        <input type="text" name='details' defaultValue={registerCredentials.details} onChange={onChangeRegister} placeholder="Details" />
                        <input type="text" name='payment' defaultValue={registerCredentials.payment} onChange={onChangeRegister} placeholder="Paid/unpaid" />
                        <button type="submit" className="btn signup">Create Camp</button>
                        <hr />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CampsRegistration