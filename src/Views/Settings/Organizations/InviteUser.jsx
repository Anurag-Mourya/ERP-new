

import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CircleLoader from '../../../Components/Loaders/CircleLoader';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
import { IoIosArrowBack } from 'react-icons/io';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const InviteUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    mobile_number: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/organisation/user/invite`, formData);
      toast.success('Invitation sent successfully');
      setFormData({
        name: '',
        role: '',
        email: '',
        mobile_number: ''
      });
    } catch (error) {
      console.error('Error inviting user:', error);
      toast.error('Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>    <TopLoadbar />
      <Topbar />
      <div id="settingcomponent">
        <div id="saearchboxsgak">
          <div id="searchbartopset">
            <h2>Invite Users</h2>
            <div id="sljcpsnalinolc">
              <Link className='firstidclsas2s5' to={"/settings"}>Settings</Link>
              <p>/</p>
              <Link className='firstidclsas2s5' to={"/settings/organisations"}>Organizations</Link>
              <p>/</p>
              <Link className='firstidclsas2s5' to={"/organization-users"}>Users</Link>
              <p>/</p>
              <Link to={""}>Invite Users</Link>
            </div>
          </div>
          <Link id="backtojomeoslskcjkls" to={"/dashboard/home"}><IoIosArrowBack /> Back to Home</Link>
        </div>
        <div id="formofinviteuserxls">
          <form onSubmit={handleSubmit}>
            {/* <div id="formofcreateupdateorg"> */}
            <div className='form-group'>
              <label>Name:</label>
              <input type="text" placeholder='name' name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className='form-group'>
              <label>Role:</label>
              <input type="text" placeholder='role' name="role" value={formData.role} onChange={handleChange} required />
            </div>
            <div className='form-group'>
              <label>Email:</label>
              <input type="email" placeholder='email' name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className='form-group'>
              <label>Mobile Number:</label>
              <input type="number" placeholder='mobile number' name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
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
}

export default InviteUser;
