import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './organisation.scss'
import BackgroundEffect from '../../Components/Backgrounds/BackgroundEffect';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Organisations = () => {
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrganisations = async () => {
      setLoading(true);
      setError('');

      try {
        // Get the authorization token from local storage
        const token = localStorage.getItem('AccessToken');

        // Set the authorization token in the axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Make the request to fetch organisations
        const response = await axios.post(`${apiUrl}/organisation/list`);

        // Set the fetched organisations in state
        setOrganisations(response.data.items);
      } catch (error) {
        console.error('Error fetching organisations:', error);
        setError('Failed to fetch organisations. Please try again later.');
      }

      setLoading(false);
    };

    fetchOrganisations();
  }, []);

  return (
    <>
      <BackgroundEffect />
      <div id='organisationlist'>
        <h2>Select Organisation</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div id="dataofbelowlist">
            <ul>
              {organisations && organisations?.map((org) => (
                <li key={org.organisation_id}>
                  <p>{org.organisation_id}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Organisations;
