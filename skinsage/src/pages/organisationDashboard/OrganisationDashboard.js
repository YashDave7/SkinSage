import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const OrganisationDashboard = () => {
    const [organisationData, setOrganisationData] = useState([]);

    const getOrganisation = async () => {
        // API call.
        const response = await fetch(`http://localhost:5000/api/authOrganisation/getOrganisation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setOrganisationData(json);
    }
    useEffect(() => {
        getOrganisation();
    }, [])



    return (
        <>
            <h1>Organisation Dashboard</h1>
            <div>{organisationData.organisation_name}</div>
            <div>{organisationData.organisation_type}</div>
            <div>{organisationData.government_id}</div>
            <div>{organisationData.address}</div>
            <div>{organisationData.email}</div>

            <button>
                <Link to="/campsRegister">Create Medical Camp</Link>
            </button>
        </>
    )
}

export default OrganisationDashboard