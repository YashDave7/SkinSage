import React, { useRef, useState } from "react";
import "./Homepage.css";
import image from "../homepage/homepage-img.png";
import { toast } from 'react-toastify';

export default function Homepage() {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);


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

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl); // Set the image source
    }
  };

  const downloadImage = () => {
    if (imageSrc) {
      const a = document.createElement("a");
      a.href = imageSrc;
      const fileType = imageSrc.split("/").pop().split(".")[1];
      a.download = `downloadedimages-uploaded-image-${Date.now()}.${fileType}`;
      a.click();
      a.remove();
    };
  }


  const handleCombinedClick = () => {
    handleImageUpload();
    downloadImage();
  };

  const count = async () => {

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
    try {
      const response = await fetch(`http://localhost:5000/api/predictDisease`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          disease: "Acne",
          location: city
        })

      })
    } catch (error) {
      toast.error("Something went wrong");
    }
  }



  return (
    <div className="homepage">
      <div className="home-heading">
        <h2 className="homepage-main-heading">Drop Image to Analyze</h2>
      </div>


      <div className="section-1">
        <div className="home-img">
          <img src={image} alt="" />
        </div>
        <div className="upload-img-section">
          <div className="upload-img-1">
            <div className="home-vector">
              <svg
                style={{ marginBottom: "-10px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="79"
                height="44"
                viewBox="0 0 79 44"
                fill="none"
              >
                <path
                  d="M0.908784 23.4949L38.7405 43.2298C38.9752 43.3514 39.2357 43.4149 39.5 43.4149C39.7643 43.4149 40.0248 43.3514 40.2595 43.2298L78.0836 23.4949C78.275 23.3959 78.4449 23.2602 78.5838 23.0955C78.7226 22.9308 78.8277 22.7404 78.893 22.5351C78.9582 22.3298 78.9824 22.1136 78.9641 21.899C78.9459 21.6843 78.8855 21.4754 78.7865 21.2841C78.628 20.9836 78.3832 20.7374 78.0836 20.5774L40.2557 0.842405C40.0197 0.720756 39.758 0.657288 39.4924 0.657288C39.2269 0.657288 38.9652 0.720756 38.7291 0.842405L0.908784 20.5774C0.524386 20.7823 0.236003 21.1302 0.105916 21.546C-0.0241715 21.9617 0.0144772 22.412 0.213515 22.7995C0.372288 23.0943 0.614019 23.3361 0.908784 23.4949Z"
                  fill="#DDDFE1"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="79"
                height="27"
                viewBox="0 0 79 27"
                fill="none"
              >
                <path
                  d="M78.0748 3.50515L71.8212 0.239929L41.7697 15.916C41.0676 16.2786 40.2889 16.4678 39.4987 16.4678C38.7086 16.4678 37.9299 16.2786 37.2278 15.916L7.16495 0.239929L0.903754 3.50515C0.522838 3.70856 0.236743 4.0531 0.10678 4.46495C-0.0231835 4.8768 0.013326 5.32317 0.208484 5.70842C0.360351 6.01112 0.603591 6.25837 0.903754 6.41513L38.7355 26.1576C38.9702 26.2792 39.2306 26.3427 39.495 26.3427C39.7593 26.3427 40.0198 26.2792 40.2545 26.1576L78.0786 6.41513C78.2704 6.31615 78.4408 6.18028 78.58 6.0153C78.7192 5.85033 78.8244 5.6595 78.8897 5.45376C78.955 5.24801 78.9791 5.0314 78.9605 4.81635C78.9419 4.60129 78.8811 4.39201 78.7814 4.20052C78.6223 3.90339 78.3774 3.66108 78.0786 3.50515H78.0748Z"
                  fill="#EDEFF0"
                />
              </svg>
            </div>
            <button className="upload-btn" onClick={handleCombinedClick}>Upload Image</button>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <button className="take-photo-btn">Take Photo</button>
          </div>
          <p className="drop-photo">or drop a file</p>
          <div className="upload-img-section-lower">
            <p>Paste image or URL (ctrl + v)</p>
          </div>
        </div>
        {/* <div
          style={{
            fontWeight: "700",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <span>No image</span>
          <span>Describe it!</span>
        </div> */}
      </div>

      <div className="section-2">
        <div style={{ flexDirection: 'column' }} className="home-heading">
          <p>Don’t want to take photo? </p>
          <h2 style={{ marginTop: '0px' }} className="homepage-main-heading">Share Symptoms</h2>
        </div>
        <div className="section-2-textbox">
          <input className="textfield" type="text" name="" id="" placeholder="Your Details" />
          <button className="analyze-btn">Analyze</button>
        </div>

        <p>Mention accurate information regarding infection for accurate results</p>

        <div>
          <div className="box">
            <h2>Predicted Infection</h2>
            <div className="box-inner">
              <div>
                {/* RESULT HERE */}
              </div>
              <button className="box-btn">Translate</button>
            </div>
          </div>
          <div className="box">
            <h2>Get Description</h2>
            <div className="box-inner">
              <div>
                {/* RESULT HERE */}
              </div>
              <button className="box-btn">Chatbot</button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={count}>Disease Count</button>
      <div className="campsportal">
        <div style={{margin:"50vh auto"}} className="camp_sec">
          <div className="camp_sec1">
            <h1>Predicted Disease</h1>
            <div className="all_camps">
                <div className="camp1">
                  <div className="camp_text">
                    {/* LOOP  */}
                    <div className="test_up">
                      <p> <b>Disease Name</b></p>
                      <p><b>Confidence Score</b></p>
                    </div>             
                  </div>
                </div>
            </div>
          </div>    
        </div>
        </div>
    </div>
  );
}
