import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
import CircleLoader from '../../../Components/Loaders/CircleLoader';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateWareHouse = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    branch_name: '',
    address: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const editItemId = sessionStorage.getItem('update-warehouse');
    if (editItemId) {
      fetchItemDetails(editItemId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchItemDetails = async (itemId) => {
    try {
      const response = await axios.post(`${apiUrl}/warehouse/details?warehouse_id=${itemId}`);
      if (response.data.success) {
        const itemDetails = response.data.data; // Adjust the response object according to your API response structure
        setFormData(itemDetails);
      } else {
        toast.error(response.data.message || 'Failed to fetch item details');
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
      toast.error('An error occurred while fetching item details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/warehouse/create/update`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AccessToken')}`
        }
      });
      console.log('Warehouse created/updated successfully:', response.data);
      toast.success('Warehouse created/updated successfully');
      setFormData({
          name: '',
          branch_name: '',
          address: '',
          city: ''
        });
        setLoading(false);
        Navigate("/dashboard/Warehouse")
    } catch (error) {
      console.error('Error creating/updating warehouse:', error);
      toast.error('Failed to create/update warehouse');
      setLoading(false);
    }
  };

  return (
    <>
    <TopLoadbar />
    <Topbar />
      <div id='middlesection'>
        <div id="Anotherbox">
          {formData.id && <h1 id="firstheading"><CiEdit /> Update Warehouse</h1>}
          {!formData.id && <h1 id="firstheading"><AiOutlineUsergroupAdd /> Create Warehouse</h1>}
          <div id="buttonsdata">
            <Link to={"/dashboard/Warehouse"}>Manage Warehouse</Link>
            <Link to={"/dashboard/create-organization"}>Help?</Link>
          </div>
        </div>
        <div id="formofinviteuserxls">
          <form onSubmit={handleSubmit}>
            {/* <div id="formofcreateupdateorg"> */}
              <div className='form-group'>
                <label>Name:</label>
                <input type="text" placeholder='Name' name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className='form-group'>
                <label>Branch Name:</label>
                <input type="text" placeholder='Branch Name' name="branch_name" value={formData.branch_name} onChange={handleChange} required />
              </div>
              <div className='form-group'>
                <label>Address:</label>
                <input type="text" placeholder='Address' name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className='form-group'>
                <label>City:</label>
                <input type="text" placeholder='City' name="city" value={formData.city} onChange={handleChange} required />
              </div>
            {/* </div> */}
            <button id='herobtnskls' className={loading ? 'btnsubmission' : ''} type="submit" disabled={loading}>
              {loading ? <CircleLoader /> : (
                <p>Submit</p>
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default CreateWareHouse;
