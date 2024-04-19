import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundEffect02 from '../../Components/Backgrounds/BackgroundEffect02';
import axiosInstance from '../../Configs/axiosInstance';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateUpdateOrg = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [gst, setGst] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [currency, setCurrency] = useState('');
    const [language, setLanguage] = useState('');
    const [countryId, setCountryId] = useState('');
    const [stateId, setStateId] = useState('');
    const [cityId, setCityId] = useState('');
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchCountries();
    }, []);
  
    const myData = JSON.parse(localStorage.getItem('UserData') || '{}');
    // console.log(myData.id)
    const fetchCountries = async () => {
        try {
          const response = await axiosInstance.post(`/get/country`);
          console.log("resssssss", response)
            if (response.data.success) {
                setCountries(response.data.country);
            } else {
                setError('Failed to fetch countries data');
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            setError('Failed to fetch countries data');
        }
    };

    const handleCountryChange = async (e) => {
        const selectedCountryId = e.target.value;
        setCountryId(selectedCountryId);
        // Fetch states data for the selected country
        console.log("selectedCountryId",selectedCountryId)
        try {
            const response = await axiosInstance.post(`/get/state?country_id=${selectedCountryId}`);
            if (response.data.success) {
                setStates(response.data.country);
            } else {
                setError('Failed to fetch states data');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
            setError('Failed to fetch states data');
        }
    };

    const handleStateChange = async (e) => {
        const selectedStateId = e.target.value;
        setStateId(selectedStateId);
        // Fetch cities data for the selected state
        try {
            const response = await axiosInstance.post(`/get/city?state_id=${selectedStateId}`);
            if (response.data.success) {
                setCities(response.data.country);
            } else {
                setError('Failed to fetch cities data');
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            setError('Failed to fetch cities data');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
          const queryParams = new URLSearchParams({
            user_id:myData.id,
                name,
                email,
                mobile_no: mobileNo,
                gst,
                company_type: companyType,
                currency,
                language,
                country_id: countryId,
                state_id: stateId,
                city_id: cityId,
                street1,
                street2,
                zipcode
            });
            const token = localStorage.getItem('AccessToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.post(`${apiUrl}/organisation/create/update`, queryParams);
            console.log('Organisation created/updated:', response.data);
            // Clear form fields after successful creation/update
            // setName('');
            // setEmail('');
            // setMobileNo('');
            // setGst('');
            // setCompanyType('');
            // setCurrency('');
            // setLanguage('');
            // setCountryId('');
            // setStateId('');
            // setCityId('');
            // setStreet1('');
            // setStreet2('');
            // setZipcode('');
            // Handle successful organisation creation/update
        } catch (error) {
            console.error('Organisation creation/update error:', error);
            setError('Failed to create/update organisation. Please check your details and try again.');
        }

        setLoading(false);
    };

    return (
       <>
       <BackgroundEffect02/>
        <div id="organisation-form-container">
           <div id="toporferx1">
           <img src="/Icons/organizationicon.gif" alt="" />
            <h2>Create an Organisation</h2>
           </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='enter your name'
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='enter your email'
                    />
                </div>
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                        placeholder='enter your mobile no'
                    />
                </div>
                <div className="form-group">
                    <label>GST:</label>
                    <input
                        type="text"
                        value={gst}
                        onChange={(e) => setGst(e.target.value)}
                        required
                        placeholder='enter your GST'
                    />
                </div>
                <div className="form-group">
                    <label>Company Type:</label>
                    <input
                        type="text"
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                        required
                        placeholder='enter your company type'
                    />
                </div>

                <div className="form-group">
                    <label>Country:</label>
                    <select onChange={handleCountryChange} value={countryId}>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>State:</label>
                    <select onChange={handleStateChange} value={stateId}>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state.id} value={state.id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <select onChange={(e) => setCityId(e.target.value)} value={cityId}>
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Currency:</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        required
                        placeholder='currency'
                    />
                </div>
                <div className="form-group">
                    <label>Language:</label>
                    <input
                        type="text"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                        placeholder='language'
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
       </>
    );
};

export default CreateUpdateOrg;
// import React from 'react'

// const CreateUpdateOrg = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CreateUpdateOrg
