import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MdAdd } from 'react-icons/md';
import CircleLoader from '../../../Components/Loaders/CircleLoader';
import SuccessMessage from '../../../Components/Succesmessages/SuccessMessage';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
import { fetchCountries, fetchStatesByCountryId, fetchCitiesByStateId } from '../../../FetchedApis/Apis';
import './organizations.scss'
import Loader02 from '../../../Components/Loaders/Loader02';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateANewOrganization = () => {
  const authToken = localStorage.getItem('AccessToken');
  const userData = JSON.parse(localStorage.getItem('UserData'));
  const userId = userData ? userData.id : null;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formDataStep1, setFormDataStep1] = useState({
    name: '',
    country_id: '',
    state_id: '',
    city_id: '',
    street1: '',
    street2: '',
    zipcode: ''
  });
  const [formDataStep2, setFormDataStep2] = useState({
    email: '',
    mobile_no: '',
    currency: '',
    language: '',
    logo: ''
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Complete, setStep1Complete] = useState(false); // Track completion status of Step 1

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const authToken = localStorage.getItem('AccessToken');
      const response = await axios.post(
        `${apiUrl}/get/country`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      if (response.data.success) {
        setCountries(response.data.country);
      } else {
        toast.error('Failed to fetch countries');
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      toast.error('An error occurred while fetching countries');
    } finally {
      setLoadingCountries(false);
    }
  };

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setFormDataStep1({ ...formDataStep1, country_id: countryId });

    try {
      setLoadingStates(true);
      const states = await fetchStatesByCountryId(countryId);
      if (states) {
        setStates(states);
        const { currency, language } = getCurrencyAndLanguageForCountry(countryId);
        setFormDataStep2({ ...formDataStep2, currency, language });
      } else {
        toast.error('Failed to fetch states');
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      toast.error('An error occurred while fetching states');
    } finally {
      setLoadingStates(false);
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setFormDataStep1({ ...formDataStep1, state_id: stateId });

    try {
      setLoadingCities(true);
      const cities = await fetchCitiesByStateId(stateId);
      if (cities) {
        setCities(cities);
      } else {
        toast.error('Failed to fetch cities');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('An error occurred while fetching cities');
    } finally {
      setLoadingCities(false);
    }
  };

  const handleChangeStep1 = (e) => {
    const { name, value } = e.target;
    setFormDataStep1({
      ...formDataStep1,
      [name]: value
    });

    // Check if all Step 1 fields are filled
    const isStep1Complete = Object.values(formDataStep1).every(val => val !== '');
    setStep1Complete(isStep1Complete);
  };

  const handleChangeStep2 = (e) => {
    const { name, value } = e.target;
    setFormDataStep2({
      ...formDataStep2,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/organisation/create/update`, {
        ...formDataStep1,
        ...formDataStep2,
        user_id: userId
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          navigate('/settings/organisations');
        }, 3500);
        setFormDataStep1({
          name: '',
          country_id: '',
          state_id: '',
          city_id: '',
          street1: '',
          street2: '',
          zipcode: ''
        });
        setFormDataStep2({
          email: '',
          mobile_no: '',
          currency: '',
          language: '',
          logo: ''
        });
      } else {
        toast.error('Failed to create/update organization');
      }
    } catch (error) {
      console.error('Error creating/updating organization:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getCurrencyAndLanguageForCountry = (countryId) => {
    return { currency: 'USD', language: 'English' };
  };

  return (
    <>
      <TopLoadbar />
      <Topbar />

      {successMessage ? (
        <SuccessMessage valueofmessage={"Organization Created Successfully"} />
      ) : (
        <div id="settingcomponent">
          <div id="saearchboxsgak">
            <div id="searchbartopset">
              <h2>Organizations</h2>
              <div id="sljcpsnalinolc">
                <Link className='firstidclsas2s5' to={"/settings"}>Settings</Link>
                <p>/</p>
                <Link className='firstidclsas2s5' to={"/settings"}>Organizations</Link>
                <p>/</p>
                <Link to={""}>Create Organization</Link>
              </div>
            </div>
            <Link id="backtojomeoslskcjkls" to={"/dashboard/home"}><IoIosArrowBack /> Back to Home</Link>
          </div>
          {/* <div id="neworganizationaddbuton">
            <Link to={"/settings/create-organisations"}><MdAdd />New Organization</Link>
          </div> */}
          <div id="formofcreateupdateorg">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div id="forminside">
                  <div className='forg-group'>
                    <label>Name:</label>
                    <input type="text" placeholder='Name' name="name" value={formDataStep1.name} onChange={handleChangeStep1} required />
                  </div>
                  <div className='forg-group'>
                    <label>Country:</label>
                    {loadingCountries ? (
                        <Loader02 />
                    ) : (
                      <select name="country_id" value={formDataStep1.country_id} onChange={handleCountryChange} required>
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country.id} value={country.id}>{country.name}</option>
                        ))}
                      </select>
                    )}
                  </div>
                  {formDataStep1.country_id && (
                    <div className='forg-group'>
                      <label>State:</label>
                      {loadingStates ? (
                        <Loader02 />
                      ) : (
                        <select name="state_id" value={formDataStep1.state_id} onChange={handleStateChange} required>
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state.id} value={state.id}>{state.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                  {formDataStep1.state_id && (
                    <div className='forg-group'>
                      <label>City:</label>
                      {loadingCities ? (
                        <Loader02 />
                      ) : (
                        <select name="city_id" value={formDataStep1.city_id} onChange={handleChangeStep1} required>
                          <option value="">Select City</option>
                          {cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                  <div className='forg-group'>
                    <label>Street 1:</label>
                    <input type="text" placeholder='Street 1' name="street1" value={formDataStep1.street1} onChange={handleChangeStep1} required />
                  </div>
                  <div className='forg-group'>
                    <label>Street 2:</label>
                    <input type="text" placeholder='Street 2' name="street2" value={formDataStep1.street2} onChange={handleChangeStep1} required />
                  </div>
                  <div className='forg-group'>
                    <label>Zipcode:</label>
                    <input type="number" placeholder='Zipcode' name="zipcode" value={formDataStep1.zipcode} onChange={handleChangeStep1} required />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div id="forminside">
                  <div className='forg-group'>
                    <label>Email:</label>
                    <input type="email" placeholder='Email' name="email" value={formDataStep2.email} onChange={handleChangeStep2} required />
                  </div>
                  <div className='forg-group'>
                    <label>Mobile No:</label>
                    <input type="number" placeholder='Mobile Number' name="mobile_no" value={formDataStep2.mobile_no} onChange={handleChangeStep2} required />
                  </div>
                  <div className='forg-group'>
                    <label>Currency:</label>
                    <input type="text" placeholder='Currency' name="currency" value={formDataStep2.currency} onChange={handleChangeStep2} required />
                  </div>
                  <div className='forg-group'>
                    <label>Language:</label>
                    <input type="text" placeholder='Language' name="language" value={formDataStep2.language} onChange={handleChangeStep2} required />
                  </div>
                  <div className='forg-group'>
                    <label>Logo:</label>
                    <input type="file" accept="image/*" name="logo" value={formDataStep2.logo} onChange={handleChangeStep2} />
                  </div>
                </div>
              )}
              <div className="buttons-container">
                {currentStep !== 1 && (
                  <button type="button" onClick={prevStep}>Back</button>
                )}
                {currentStep !== 2 && step1Complete && ( // Only show the Next button if Step 1 is complete
                  <button type="button" onClick={nextStep}>Next</button>
                )}
                {currentStep === 2 && (
                  <button id='herobtnskls' className={loading ? 'btnsubmission' : ''} type="submit" disabled={loading}>
                    {loading ? <CircleLoader /> : <p>Submit</p>}
                  </button>
                )}
              </div>
            </form>
          </div>
          <div id="randomheight"></div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default CreateANewOrganization;
