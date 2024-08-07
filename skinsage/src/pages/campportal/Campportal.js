import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Campportal.css";

import icon_camp from "./images.jpeg";

export default function Campportal() {

  useEffect(() => {
    getCamps();
    //eslint-disable-next-line
  }, [])

  const navigate = useNavigate();

  const [premiumprice, setPremiumprice] = useState(199);

  const handlePayment = async () => {
    try {

      if (!localStorage.getItem("token")) {
        alert("You have not logged in.");
        return navigate("/");
      }
      // console.log("Hanlde")
      const orderUrl = "http://localhost:5000/api/pay/orders";
      const { data } = await axios.post(
        orderUrl,
        { amount: premiumprice },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
          },
        }
      );
      console.log("2nd")
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    console.log("In init")
    const options = {
      key: "rzp_test_zkRk5Km3mrtYWp",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/payment/verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
              'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, Origin, Authorization',
            },
          });
          console.log(data);
          if (data.status) {
            alert("Purchased PrepPro Succesfully");
            //Update in DB
            //fetch user id
            // userDetails(); 

            // navigate("") --> to a page to show order and pay id 
            navigate("/user")
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log(options)
    const rzp1 = new window.Razorpay(options);


    rzp1.open();
  };

  const [city, setCity] = useState('');

  const fetchCityName = (lat, lon) => {
    const apiKey = 'pk.3f03ec00ea0beb8a42907bc5893f9da0';

    fetch(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        const cityName = data.address.city || 'City not found';
        setCity(cityName);
      })
      .catch((error) => {
        console.error("Error occurred while fetching city name:", error);
      });
  };

  const detectLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchCityName(latitude, longitude);
      }, () => {
        console.log("Error occurred while fetching geolocation.");
      });
    } else {
      console.log("Geolocation is not supported by your browser.");
    }

    console.log(city);
  }

  const [camps, setCamps] = useState([]);

  const getCamps = async () => {
    // API call.
    const response = await fetch(
      `http://localhost:5000/api/camps/fetchallcamps`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setCamps(json);
  };

  useEffect(() => {
    getCamps();

  }, []);

  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedModule, setSelectedModule] = useState("All");
  // Filter the data based on user selections
  // const filteredData = data.filter((item) => {
  //   return (
  //     (selectedSubject === "All" || item.Subject === selectedSubject) &&
  //     (selectedModule === "All" || item.Module.toString() === selectedModule)
  //   );
  // });

  return (
    <div className="campsportal">

      {/* Table  */}
      <div className="tablePS">
        {/* {data.map((item, i) => (
        // {(data.filter(item => (item.Marks === 5  && item.Year === 'Dec-19' && item.Subject === 'ADSA'  ))).map((item, i) => (
          <tr > */}
      </div>

      <div className="camp_sec">
        <div className="camp_sec1">
          <h1>Recent Camps Posted</h1>
          <p>4 new camps posted today</p>
          <div className="all_camps">
            {/* <p key={i}>
                  {item.location}
                </p> */}
            {camps.map((item, i) => (
              <div className="camp1">
                <div className="img_camp">
                  <img src={icon_camp} style={{ width: "6vw" }} alt="" />
                </div>
                <div className="camp_text">
                  <div className="test_up">
                    <p> <b>{item.speciality}</b>  - By <b>{item.organisation_name}</b></p>
                    {/* <p>{item.organization}</p>   Missing in databse */}
                    <p><b>{item.date_of_camp} {item.location}</b></p>
                  </div>
                  <div className="test_down">
                    <p>
                      <b>Description : </b> {item.details} Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
                    </p>
                    <div className="wwdt">
                      <p ><b>Contact:</b>  {item.mobile}
                        <br />
                        {item.email}
                      </p>
                    </div>

                  </div>
                  <div className="test_down">

                    {item.payment === "Paid" ?
                      <>
                        <p>
                          <b>Registration Cost : INR 150</b>
                        </p>
                        <button className="camp-pay" onClick={handlePayment}>Pay Now</button>
                      </>
                      :
                      <>
                        <p>No registeration cost</p>
                        <button className="camp-pay" onClick={handlePayment}>Register</button>

                      </>

                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="camp_sec2">
          <div className="s2">
            <h2>Filter Camps</h2>
            <div className="user_location">
              <button onClick={detectLocation} >Camps near me</button>
            </div>
            <div className="input_location">
              <input type="text" placeholder="Search location..." />
              <button>Your Location</button>
            </div>
            <div className="input_org">
              <input type="text" placeholder="Organization Name..." />
              <button>Your Location</button>
            </div>

            {/* <div className="select2 s24">
            <input type="text" placeholder="Search" />
            <button onClick={detectLocation} >Detect Your Location</button>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
