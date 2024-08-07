import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToastNotifications from './components/ToastNotifications';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Homepage from "./pages/homepage/Homepage";
import MlPredictor from "./pages/mlpredictor/MlPredictor";
import Doctors from "./pages/doctors_page/doctors";
import CampsRegistration from "./pages/campsRegistration/campsRegistration";
import UserLogin from "./pages/userLoginSignup/UserLogin";
import UserSignUp from "./pages/userLoginSignup/UserSignUp";
import OrganisationRegister from "./pages/organisationLoginSignUp/OrganisationRegister";
import OrganisationLogin from "./pages/organisationLoginSignUp/OrganisationLogin";
import OrganisationDashboard from "./pages/organisationDashboard/OrganisationDashboard";
import CampsPortal from './pages/campportal/Campportal'
import OrgRegister from "./pages/orgRegister/OrgRegister";
import OrgLogin from "./pages/orgRegister/OrgLogin";


function App() {
  return (
    <>
      <Navbar />
      <ToastNotifications />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/diagnosis" element={<MlPredictor />} />

        <Route path="/auth/login" element={<UserLogin/>}></Route>
        <Route path="/auth/signUp" element={<UserSignUp/>}></Route>

        <Route path="/campportal" element={<CampsPortal/>}></Route>

        
        <Route path="/org/signup" element={<OrgRegister/>}></Route>
        <Route path="/org/login" element={<OrgLogin/>}></Route>

        <Route path="/campsRegister" element={<CampsRegistration/>} />

        <Route path="/authOrganisation/register" element={<OrganisationRegister/>} />
        <Route path="/authOrganisation/login" element={<OrganisationLogin/>} />
        <Route path="/organisationDashboard" element={<OrganisationDashboard/>} />

        <Route path="/doctors_page" element={<Doctors />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
