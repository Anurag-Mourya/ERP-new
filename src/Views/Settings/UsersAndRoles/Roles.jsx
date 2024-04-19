import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
import { Toaster } from 'react-hot-toast'; // Assuming you have a toast library imported

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const authToken = localStorage.getItem('AccessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        };
        const response = await axios.post(`${apiUrl}/roles/getloggedinuser`, null, config);
        setRoles(response.data.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
        // You might want to handle error states here
      }
    };

    fetchRoles();
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <>
      <TopLoadbar />
      <Topbar />

      <div>
        <h1>List of Roles</h1>
        <ul>
          {roles.map(role => (
            <li key={role.id}>
              <strong>ID:</strong> {role.id}<br />
              <strong>Name:</strong> {role.name}<br />
              <strong>Description:</strong> {role.description || 'NA'}<br />
              <strong>Permissions:</strong> {role.permissions ? (
                <ul>
                  {JSON.parse(role.permissions).map(permission => (
                    <li key={permission.entity}>
                      <strong>Entity:</strong> {permission.entity}<br />
                      <strong>Full Access:</strong> {permission.full_access !== undefined ? permission.full_access.toString() : 'NA'}<br />

                      {/* Add more fields as needed */}
                    </li>
                  ))}
                </ul>
              ) : 'NA'}
              <hr />
            </li>
          ))}
        </ul>
      </div>

      <Toaster />
    </>
  );
};

export default Roles;
