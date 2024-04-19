// Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MdAdd } from 'react-icons/md';
import Loader02 from '../../../Components/Loaders/Loader02';
import Topbar from '../../../Components/NavigationBars/Topbar';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';

import './Users.scss'; // Import the SCSS file

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleUsers, setVisibleUsers] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sliderOpen, setSliderOpen] = useState(false);

  const authToken = localStorage.getItem('AccessToken');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(`${apiUrl}/organisation/invitation/list`, {}, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.data.success) {
          setUsers(response.data.data);
          setLoading(false);
          toast.success("Invited users data fetched Successfully");
        } else {
          toast.error('Failed to fetch user invites');
          console.error('Failed to fetch user invites:', response.data.message);
        }
      } catch (error) {
        toast.error('An error occurred while fetching user invites');
        console.error('Error fetching user invites:', error);
      }
    };

    fetchUsers();
  }, [authToken]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    setVisibleUsers(prevVisibleUsers => prevVisibleUsers + 10);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setSliderOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopLoadbar />
      <Topbar />
      <div id="settingcomponent">
      <div id="saearchboxsgak">
        <div id="searchbartopset">
          <h2>Invited Users</h2>
          <div id="sljcpsnalinolc">
            <Link className='firstidclsas2s5' to={"/settings"}>Settings</Link>
            <p>/</p>
            <Link className='firstidclsas2s5'  to={"/settings/organisations"}>Organizations</Link>
            <p>/</p>
            <Link to={""}>Users</Link>
          </div>
        </div>
        <Link id="backtojomeoslskcjkls" to={"/dashboard/home"}><IoIosArrowBack /> Back to Home</Link>
      </div>
      <div id="neworganizationaddbuton">
        <Link to={"/invite-user-to-organization"}><MdAdd />Invite User</Link>
        </div>
        
        <div id='usrxs-invuser-middlesection'>
          <div id="usrxs-invuser-filterbox">
            <div id="usrxs-invuser-searchbox">
              <input
                id='usrxs-invuser-commonmcsearchbar'
                type="text"
                placeholder='Search organization'
                value={searchTerm}
                onChange={handleSearch}
              />
              <RiSearch2Line />
            </div>
          </div>

          <div id="usrxs-invuser-item-listsforcontainer">
            {loading ? (
              <Loader02 />
            ) : (
              <>
                {filteredUsers.slice(0, visibleUsers).map(user => (
                  <div key={user.id} className="usrxs-invuser-user-item" onClick={() => handleUserClick(user)}>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                ))}
                {filteredUsers.length > visibleUsers && (
                  <button onClick={handleLoadMore}>Load More</button>
                )}
              </>
            )}
          </div>

          <Toaster />

          {selectedUser && (
            <div className={`usrxs-invuser-slider ${sliderOpen ? 'open' : ''}`}>
              <div className="usrxs-invuser-slider-content">
                <div className="usrxs-invuser-user-details">
                  <h2>{selectedUser.name}</h2>
                  <p>Email: {selectedUser.email}</p>
                </div>
                <button className="usrxs-invuser-slider-close-btn" onClick={handleCloseSlider}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
