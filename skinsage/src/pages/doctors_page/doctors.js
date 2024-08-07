import React from 'react'
import "./Doctors.css";
import image2 from "../doctors_page/Doctor-1.jpeg";

export default function Doctors() {
  return (
    <>
     
      <h1 className='heading'>Doctors Portal</h1>
    <div className="d_container-0">
      <div className="c_column-1">
        <h2>Problem Detection</h2>
        <button>View</button>
      </div>
      <div className="c_column-2">
        <h2>Doctors Profile</h2>
        <button>View</button>
      </div>
    </div>

    <div className="d_container-1">
    <div className="c1_column1">
      <img className="doc_image"src={image2}></img>
      </div>
      <div className="c2_column2">
        <h1>Dr Jay Sambherkar || Senior Skin Specialist</h1>
        <h3>Qualifications: MBBS failed, Dentistry also failed</h3>
        <h3>Address : Doctors House, Opposite Jaslok Hospital, Room Number 504, Breach Candy, Mumbai-400022</h3>
        <h4>Clinic Timings : 10:00am to 2:00pm && 5:00pm to 9:00pm || Monday To Saturdays</h4>
        <button className='appointment_button'>Book An Appointment</button>
      </div>
    </div>

    <div className="d_container-2">
    
    </div>
    </>
  )
}
