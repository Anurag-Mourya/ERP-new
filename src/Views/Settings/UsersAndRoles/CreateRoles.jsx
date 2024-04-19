import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
import './Roles.scss'; // Import your CSS file for styling

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateRoles = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([
    {
      entity: 'Items',
      itemsec: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      stockadjustment: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      categories: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      }
    },
    {
      entity: 'Sales',
      Customers: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      Quotation: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      SalesOrder: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      Invoice: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      }
    },
    {
      entity: 'Purchases',
      Purchases: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      Vendors: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      },
      Bills: {
        full_access: true,
        can_view: true,
        can_create: true,
        can_edit: true,
        can_delete: true
      }
    }
  ]);

  const handleChange = (e, index, key) => {
    const newPermissions = [...permissions];
    newPermissions[index][key] = {
      ...newPermissions[index][key],
      [e.target.name]: e.target.checked // Update the checked status based on the checkbox's name
    };
    setPermissions(newPermissions);
  };

  const handleSubmit = async () => {
    try {
      // Retrieve authentication token from local storage
      const authToken = localStorage.getItem('AccessToken');
  
      // Include the authentication token in the headers
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };
  
      // Make the API request with the authentication token
      const response = await axios.post(`${apiUrl}/roles/create/update`, {
        name,
        description,
        permissions
      }, config);
  
      if (response.data.success) {
        toast.success('Roles updated successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating roles:', error);
      toast.error('Failed to update roles');
    }
  };
  

  return (
    <>
      <TopLoadbar />
      <Topbar />
      <div id="usrxs-roles-container">
        <div className="input-row">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-row">
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {permissions.map((permission, index) => (
          <div key={index} className="permission-row">
            <h3>{permission.entity}</h3>
            {Object.entries(permission).map(([key, value]) =>
              typeof value === 'object' ? (
                <div key={key} className="checkbox-group">
                  <h4>{key}</h4>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <label key={subKey}>
                      <input
                        type="checkbox"
                        name={subKey} // Set the name attribute for the checkbox
                        checked={subValue}
                        onChange={(e) => handleChange(e, index, key)}
                      />
                      {subKey}
                    </label>
                  ))}
                </div>
              ) : null
            )}
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Toaster />
    </>
  );
};

export default CreateRoles;
