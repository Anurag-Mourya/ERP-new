import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import Loader02 from '../../../Components/Loaders/Loader02';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
import OrganizationPopup from './OrganizationPopup';
import { MdAdd } from 'react-icons/md';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Organizations = () => {
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSliderForOrgId, setOpenSliderForOrgId] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const authToken = localStorage.getItem('AccessToken');
        const response = await axios.post(`${apiUrl}/organisation/list`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.data.success) {
          setOrganizations(response.data.organisations);
          setFilteredOrganizations(response.data.organisations);
        } else {
          console.error('Failed to fetch organizations');
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    const filtered = organizations.filter(org => org.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredOrganizations(filtered);
  }, [searchQuery, organizations]);

  const toggleSlider = (orgId) => {
    setOpenSliderForOrgId(openSliderForOrgId === orgId ? null : orgId);
  };

  const switchOrganization = (organisationId) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/organisation/switch?organisation_id=${organisationId}`)
      .then((response) => {
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      })
      .catch((error) => {
        console.error("Error switching organization:", error);
      });
  };

  const handleOrgClick = (organisationId) => {
    switchOrganization(organisationId);
  };

  const switchOrganizationToDefault = (organisationId) => {
    axios
      .post(`${apiUrl}/organisation/default`, { organisation_id: organisationId })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error switching organization:", error);
      });
  };

  return (
    <>
      <TopLoadbar />
      <Topbar />
      <div id="settingcomponent">
        <div id="saearchboxsgak">
          <div id="searchbartopset">
            <h2>Organizations</h2>
            <div id="sljcpsnalinolc">
              <Link className='firstidclsas2s5' to={"/settings"}>Settings</Link>
              <p>/</p>
              <Link to={""}>Organizations</Link>
            </div>
          </div>
          <Link id="backtojomeoslskcjkls" to={"/dashboard/home"}><IoIosArrowBack /> Back to Home</Link>
        </div>
        <div id="neworganizationaddbuton">
          <Link to={"/settings/create-organisations"}><MdAdd />New Organization</Link>
        </div>
        {loading ? (
          <Loader02 />
        ) : (
          <div id='secondblockxs'>
            {filteredOrganizations.length === 0 ? (
              <div id="nodatafound">
                <img src="/Icons/noorganizationfoundico.png" alt="" />
                <p>Nothing to display</p>
              </div>
            ) : (
              filteredOrganizations.map(org => (
                <div key={org.organisation_id} className={`organizationxs4w ${org.is_active === true ? 'organzimcactive' : ''}`}>
                  <div id="threedotsofapicall">
                    <div className="button-slider-container">
                      <OrganizationPopup
                        org={org}
                        isOpen={openSliderForOrgId === org.organisation_id}
                        switchOrganizationToDefault={switchOrganizationToDefault}
                        handleOrgClick={handleOrgClick}
                        toggleSlider={toggleSlider}
                      />

                    </div>
                  </div>
                  <div id="x1mcdbls">
                    <img src={org.company_logo || "https://cdn-icons-png.freepik.com/512/3592/3592793.png?ga=GA1.1.1034769832.1711897768&"} alt="" />
                    <span>
                      <h3>{org.name}</h3>
                      <p>{org.company_type}</p>
                    </span>
                    <button className="main-button" onClick={() => toggleSlider(org.organisation_id)}><BsThreeDots /></button>
                  </div>
                  <div id="x1mcdbls02">
                    <p>Mobile No: {org.mobile_no}</p>
                    <p>Email: {org.email}</p>
                    <p id="datetimeoforganx"> Created On {" "}
                      {new Date(org.created_at).toLocaleDateString("en-GB")}
                    </p>
                    {org.is_primary === true && <span id='defaultorganization'>Default</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        <div id="randomheight"></div>
      </div>
    </>
  );
};

export default Organizations;
