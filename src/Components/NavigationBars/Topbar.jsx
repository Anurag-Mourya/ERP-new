import React, { useState, useRef, useEffect } from "react";
import "./navigationsbar.scss";
import "./pmodals.scss";
import { Tooltip } from 'react-tooltip';
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineManageSearch } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import warehouse_alt from '../../assets/outlineIcons/othericons/warehouse_alt.svg';
import organizationIco from '../../assets/outlineIcons/othericons/organizationIco.svg';
import notificationbellico from '../../assets/outlineIcons/othericons/notificationbellico.svg';
import profileaccountIco from '../../assets/outlineIcons/othericons/profileaccountIco.svg';
import settingIco from '../../assets/outlineIcons/othericons/settingIco.svg';
import personprofileIco from '../../assets/outlineIcons/othericons/personprofileIco.svg';
import { otherIcons } from "../../Views/Helper/SVGIcons/ItemsIcons/Icons";
import bellAnimationData from '../../LottieAnimations/bellAnimation.json';
import Lottie from "lottie-react";
import helpIco from '../../assets/outlineIcons/othericons/helpIco.svg';
import accountmanageIco from '../../assets/outlineIcons/othericons/accountmanageIco.svg';
import inviteUserIco from '../../assets/outlineIcons/othericons/inviteUserIco.svg';
import feedbacksendIco from '../../assets/outlineIcons/othericons/feedbacksendIco.svg';


const Topbar = ({ loggedInUserData }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const notificationPopupRef = useRef(null);
  const warehouseDropdownRef = useRef(null);


  const handleSearchButtonClick = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }

  };



  // showaddshorts modal close

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  // modal
  const [isOpen, setIsOpen] = useState(false);
  const [showAccountSlider, setShowAccountSlider] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setShowAccountSlider(false);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setShowAccountSlider(false);
  };

  // modal 02

  const toggleSidebar02 = () => {
    setShowAccountSlider(!showAccountSlider);
    setIsOpen(false);
  };





  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const toggleNotificationPopup = () => {
    setShowNotificationPopup(!showNotificationPopup);
  };

  const closeNotificationPopup = () => {
    setShowNotificationPopup(false);
  };



















  const switchOrganization = (organisationId) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/organisation/switch?organisation_id=${organisationId}`)
      .then((response) => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Error switching organization:", error);
      });
  };

  const handleOrgClick = (organisationId) => {
    switchOrganization(organisationId);
    // You can optionally add additional logic here before or after switching organization
  };

  const clearLocalStoragex1 = () => {
    localStorage.clear();
    window.location.reload();
  };


  const [organisations, setOrganisations] = useState([]);
  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        setLoading(true);
        // Retrieve auth token from local storage
        const authToken = localStorage.getItem('AccessToken');
        const response = await axios.post(
          `${apiUrl}/organisation/list`,
          {}, // Pass an empty object as data
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        // console.log(response.data);
        if (response.data.success) {
          setOrganisations(response.data.organisations);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          // }, 0);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          // }, 0);
        }
      } catch (error) {
        console.error("Error fetching organisations:", error);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        // }, 0);
      }
    };



    fetchOrganisations();
  }, []);




  // warehouse
  const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);


  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem('AccessToken');
        const response = await axios.post(
          `${apiUrl}/warehouse/list`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data.length > 0) {
          setWarehouses(response.data);

          // Check if a selected warehouse ID exists in localStorage
          const selectedWarehouseId = localStorage.getItem('selectedWarehouseId');
          if (!selectedWarehouseId) {
            // If no warehouse ID is stored, set the first warehouse ID in local storage
            localStorage.setItem("selectedWarehouseId", response.data[0].id);
            setSelectedWarehouse(response.data[0]); // Update state to reflect the selection
          } else {
            // Find the warehouse with the selected ID from local storage
            const selectedWarehouse = response.data.find(warehouse => String(warehouse.id) === selectedWarehouseId);
            if (selectedWarehouse) {
              setSelectedWarehouse(selectedWarehouse);
            } else {
              // In case the stored ID no longer exists in the list, fallback to the first warehouse
              localStorage.setItem("selectedWarehouseId", response.data[0].id);
              setSelectedWarehouse(response.data[0]);
            }
          }
        }

        setTimeout(() => {
          setLoading(false);
        }, 3000);
        // }, 0);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        // }, 0);
      }
    };

    fetchWarehouses();
  }, []);





  const handleWarehouseClick = () => {
    setShowWarehouseDropdown(!showWarehouseDropdown);
  };

  const handleWarehouseSelection = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowWarehouseDropdown(false);
    // Save the selected warehouse ID in local storage
    localStorage.setItem("selectedWarehouseId", warehouse.id);
  };



  return (
    <>
      <Tooltip id="my-tooltip" className="extraclassoftooltip" />
      <div id="topbarxsj">
        <div id="tobarsj01">
          <a href="/" id="logosection">
            <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
            <h1> Accounts</h1>
          </a>


          <div id="tobarsj02">

            <div id="newsectbrs1">
              <a href=""><svg width="20" height="13" viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.079 5.13872H1.93871L6.36071 0.871002C6.69861 0.545106 6.19744 0.0263692 5.85504 0.354958L0.79198 5.24137C0.644244 5.37496 0.65601 5.61604 0.791998 5.75743L5.85505 10.646C6.19581 10.9706 6.69982 10.4615 6.36069 10.1299L1.93707 5.85868L16.079 5.72571C16.5424 5.72136 16.5662 5.14749 16.079 5.13872Z" fill="black" />
              </svg>
              </a>

              <a className="disabledbtn" href=""><svg width="20" height="13" viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.79208 5.86128H14.9324L10.5104 10.129C10.1725 10.4549 10.6737 10.9736 11.0161 10.645L16.0791 5.75863C16.2268 5.62504 16.2151 5.38396 16.0791 5.24257L11.016 0.354025C10.6753 0.0293965 10.1713 0.538454 10.5104 0.870107L14.934 5.14132L0.79208 5.27429C0.328707 5.27864 0.304849 5.85251 0.79208 5.86128Z" fill="black" />
              </svg>
              </a>

              <div className="timeiconhistory">
                <svg width="22" height="22" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.18555 17C13.3276 17 16.6855 13.6421 16.6855 9.5C16.6855 5.35786 13.3276 2 9.18555 2C5.82729 2 3.01624 4.20717 2.06055 7.25H3.93555" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.18555 6.5V9.5L10.6855 11" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.68555 9.5C1.68555 9.75298 1.69695 10.0032 1.71925 10.25M6.93555 17C6.67935 16.9157 6.42908 16.8173 6.18555 16.7058M2.59259 13.25C2.44796 12.9713 2.31894 12.6825 2.20677 12.3846M3.80896 14.9799C4.03822 15.2268 4.28284 15.4581 4.54121 15.6719" stroke="black" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div id="searchbartab">
              <input
                type="text"
                onClick={handleSearchButtonClick}
                placeholder="Search or type something (Ctrl + G)"
                ref={searchInputRef}
              />
              <RiSearch2Line id="newsvgsearchico" />
            </div>
            {showSuggestions && (
              <div className="suggestion-box">
                <div id="sugnboxx1">
                  <ul>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/"}>Bell</Link>
                    <Link to={"/"}>More</Link>
                  </ul>
                  <div id="buttonsxgrop">
                    <Link to={"/settings/organisations"} className=""> <MdOutlineManageSearch /> Manage Organization</Link>
                  </div>
                </div>
              </div>
            )}
          </div>



        </div>

        <div id="tobarsj03">
          <ul>
            <div data-tooltip-id="my-tooltip" data-tooltip-content="Warehouse" id="textofcompanycwarehouse" onClick={handleWarehouseClick}>
              <p> <img className='svgiconsidebar' src={warehouse_alt} alt="" />
                {selectedWarehouse ? selectedWarehouse.name : "Select Warehouse"}</p>
            </div>

            {loggedInUserData?.active_organisation && (
              <div data-tooltip-id="my-tooltip" data-tooltip-content="Organization" onClick={toggleSidebar} id="textofcompanycorg">
                <p> <img className='svgiconsidebar' src={organizationIco} alt="" />
                  {loggedInUserData?.active_organisation?.name}</p>
                <FaChevronDown />
              </div>
            )}
            <span id="sepx15s"></span>
            <li>
              <Link data-tooltip-id="my-tooltip" data-tooltip-content="Notifications" onClick={toggleNotificationPopup} className="custtobsx45" to={""}>
                <span className="bellx15w fa fa-bell"></span>
              </Link>
            </li>
            <li>
              <Link data-tooltip-id="my-tooltip" data-tooltip-content="Settings" className="custtobsx45" to={"/settings"}>
                <img className='svgiconsidebar' src={settingIco} alt="" />
              </Link>
            </li>
            <li>
              <Link data-tooltip-id="my-tooltip" data-tooltip-content="Account" onClick={toggleSidebar02} className="custtobsx45" to={""}>
                <img className='svgiconsidebar' src={personprofileIco} alt="" />
              </Link>
            </li>
          </ul>
        </div>
      </div>



      {showWarehouseDropdown && <div className="modalx1-overlay" onClick={handleWarehouseClick}></div>}
      {showWarehouseDropdown && (
        <div className="modalx1-sidebar openx45s" ref={warehouseDropdownRef}>
          <div className="modalx1-content">
            <div id="topsecxks">
              <h2>Warehouses
                <img className='svgiconsidebar' src={warehouse_alt} alt="" />
              </h2>

              <span>
                <Link id="newcomponentmdx2s5" to={"/settings/warehouse"} onClick={closeSidebar}>{otherIcons?.iconoflinktab}</Link>
                {/* <button className="buttonx2" onClick={handleWarehouseClick}>
                        <RxCross2 />
                      </button> */}
              </span>
            </div>

            <ul>
              {warehouses.map((warehouse) => (
                <li key={warehouse.id} onClick={() => handleWarehouseSelection(warehouse)}
                  className={warehouse.is_active === true ? "activeorganization" : ""} >
                  <div id="newcondfirstop">
                    <span><p>{warehouse.name}</p></span>
                  </div>
                </li>
              ))}
            </ul>



            <div className="divcontxlwextbelocbtn">
              <div className="xklw54c15w3s6">
                <svg id="fi_5136503" height="512" viewBox="0 0 60 60" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m57 12v45a2 2 0 0 1 -2 2h-50a2 2 0 0 1 -2-2v-45z" fill="#7a93a0"></path><path d="m59 12v-1.349a1 1 0 0 0 -.7-.956l-27.7-8.6a2 2 0 0 0 -1.186 0l-27.714 8.605a1 1 0 0 0 -.7.956v1.344a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1z" fill="#6c8493"></path><path d="m52 19v6h-44v-6a2.006 2.006 0 0 1 2-2h40a2.006 2.006 0 0 1 2 2z" fill="#bfdbf0"></path><path d="m8 25h44v34h-44z" fill="#9ebbce"></path><path d="m21 33v18c0 2.209 4.029 4 9 4s9-1.791 9-4v-18z" fill="#35718a"></path><ellipse cx="30" cy="33" fill="#4184a9" rx="9" ry="4"></ellipse><path d="m21 45c0 2.209 4.029 4 9 4s9-1.791 9-4v-6c0 2.209-4.029 4-9 4s-9-1.791-9-4z" fill="#4184a9"></path><path d="m48 22h-36a1 1 0 0 1 0-2h36a1 1 0 0 1 0 2z" fill="#b0ccdd"></path></svg>
                <Link to={"/settings/create-organisations"} className="buttonx3">
                  <span className="asdf">Manage Warehouses</span>
                </Link>
              </div>

              <div className="xklw54c15w3s6">

                <svg enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_3134700"><path d="m17.76 5.91-8.44-5.81c-.19-.13-.45-.13-.64 0l-8.44 5.81c-.15.11-.24.28-.24.47v10.31c0 .72.59 1.31 1.31 1.31h7.7c-.01-.17-.01-.33-.01-.5 0-4.69 3.81-8.5 8.5-8.5.17 0 .33 0 .5.01v-2.63c0-.19-.09-.36-.24-.47z" fill="#cfd8dc"></path><path d="m9.81 13.88h-6.06v4.12h5.26c-.01-.17-.01-.33-.01-.5 0-.87.13-1.71.37-2.5.12-.39.27-.76.44-1.12z" fill="#78909c"></path><path d="m3.75 10.88v4.12h5.62c.12-.39.27-.76.44-1.12.32-.68.73-1.31 1.21-1.88.35-.41.73-.78 1.15-1.12z" fill="#90a4ae"></path><path d="m13.5 8.25h-9c-.41 0-.75.34-.75.75v3h7.27c.35-.41.73-.78 1.15-1.12.63-.51 1.32-.92 2.08-1.23v-.65c0-.41-.34-.75-.75-.75z" fill="#78909c"></path><path d="m9 .002c-.112 0-.225.032-.32.097l-8.44 5.811c-.15.11-.24.28-.24.47v10.31c0 .72.59 1.31 1.31 1.31h7.69-5.25v-4.12-3-1.88c0-.41.34-.75.75-.75h4.5z" fill="#b4bcc0"></path><path d="m3.75 13.88v4.12h5.25v-.492-.008-2.5h-5.25z" fill="#687d88"></path><path d="m3.75 10.88v3 1.12h5.25v-3h-5.25z" fill="#7d8f97"></path><path d="m9 8.25h-4.5c-.41 0-.75.34-.75.75v1.88 1.12h5.25z" fill="#687d88"></path><path d="m17.5 11c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5z" fill="#2196f3"></path><path d="m17.5 21c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75z" fill="#fff"></path><path d="m20.25 18.25h-5.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h5.5c.414 0 .75.336.75.75s-.336.75-.75.75z" fill="#fff"></path><path d="m17.5 11c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5v-3c-.414 0-.75-.336-.75-.75v-2h-2c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2v-2c0-.414.336-.75.75-.75z" fill="#1d83d4"></path><g fill="#dedede"><path d="m17.5 18.25h-.75v2c0 .414.336.75.75.75zm0-4.25c-.414 0-.75.336-.75.75v2h.75z"></path><path d="m17.5 16.75h-.75-2c-.414 0-.75.336-.75.75s.336.75.75.75h2 .75z"></path></g></svg>
                <Link to={"/settings/create-organisations"} className="buttonx3">


                  <span className="asdf">Add New Warehouse</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      )}








      {/* modal of organization */}
      {isOpen && <div className="modalx1-overlay" onClick={closeSidebar}></div>}
      <div className={`modalx1-sidebar ${isOpen ? "openx45s" : ""}`}>
        <div className="modalx1-content">
          <div id="topsecxks">
            <h2>Organizations
              <img className='svgiconsidebar' src={organizationIco} alt="" />
            </h2>
            <span>
              <Link id="newcomponentmdx2s5" to={"/settings/organisations"} onClick={closeSidebar}>{otherIcons?.iconoflinktab}</Link>
            </span>
          </div>
          <ul>
            {organisations?.map((org) => (
              <li
                onClick={() => handleOrgClick(org.organisation_id)}
                key={org.id}
                className={org.is_active === true ? "activeorganization" : ""} >
                <div id="newcondfirstop">
                  <span><p>{org.name}</p></span>
                </div>
              </li>
            ))}
          </ul>

          <div className="divcontxlwextbelocbtn">
            <div className="xklw54c15w3s6">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" id="fi_14284799"><g id="Layer_38" data-name="Layer 38"><rect fill="#4f5460" height="36.41" rx="1" width="12.42" x="7.5" y="23.27"></rect><rect fill="#4f5460" height="23.44" rx="1" width="12.42" x="43.25" y="36.23"></rect><path d="m44.63 14.86-25.32-10.46a1 1 0 0 0 -.94.1 1 1 0 0 0 -.44.83v53.34a1 1 0 0 0 1 1h25.32a1 1 0 0 0 1-1v-42.88a1 1 0 0 0 -.62-.93z" fill="#bac7e5"></path><g fill="#e1e7fa"><rect height="12.72" rx="1" width="12.42" x="25.38" y="46.95"></rect><path d="m36.8 36.23h-10.42a1 1 0 0 0 0 2h10.42a1 1 0 0 0 0-2z"></path><path d="m36.8 28.61h-10.42a1 1 0 1 0 0 2h10.42a1 1 0 0 0 0-2z"></path><path d="m26.38 23h10.42a1 1 0 0 0 0-2h-10.42a1 1 0 0 0 0 2z"></path></g><path d="m59.87 59.67h-55.74a1 1 0 0 1 0-2h55.74a1 1 0 0 1 0 2z" fill="#3c3f49"></path></g></svg>
              <Link to={"/settings/create-organisations"} className="buttonx3">
                <span className="asdf">Manage Organizations</span>
              </Link>
            </div>

            <div className="xklw54c15w3s6">

              <svg id="fi_8191558" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><g id="image-gallery-plus"><path d="m22.445 7.61-1.2 8.58c-.26 1.8-1.25 2.75-2.88 2.75-.13 0-.26-.01-.4-.02a3.73 3.73 0 0 0 .04-.59v-8.67a2.357 2.357 0 0 0 -2.67-2.66h-9.97c0-.02.01-.05.01-.07l.24-1.68a3.242 3.242 0 0 1 1.13-2.23 3.26 3.26 0 0 1 2.455-.47l10.56 1.48a3.247 3.247 0 0 1 2.22 1.14 3.148 3.148 0 0 1 .465 2.44z" fill="#396ce8"></path><g opacity=".4"><path d="m2 18.333v-8.668a2.357 2.357 0 0 1 2.667-2.665h10.668a2.358 2.358 0 0 1 2.665 2.665v8.668a2.358 2.358 0 0 1 -2.665 2.667h-10.668a2.357 2.357 0 0 1 -2.667-2.667z" fill="#396ce8"></path></g><path d="m12.5 13.25h-1.75v-1.75a.75.75 0 0 0 -1.5 0v1.75h-1.75a.75.75 0 0 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0v-1.75h1.75a.75.75 0 0 0 0-1.5z" fill="#396ce8"></path></g></svg>
              <Link to={"/settings/create-organisations"} className="buttonx3">


                <span className="asdf">Add New Organization</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
      {showNotificationPopup &&
        <div className="modalx1-overlay" onClick={closeNotificationPopup}></div>
      }
      {showNotificationPopup && (
        <div className="notification-popup" ref={notificationPopupRef}>
          <div className="notification-popup-content">
            <div id="topsecxksx23">
              <h2>Notifications
                <img className='svgiconsidebar' src={notificationbellico} alt="" />
              </h2>
              <span>
                <Link id="newcomponentmdx2s5" to={"/settings/organisations"} onClick={closeSidebar}>{otherIcons?.iconoflinktab}</Link>
              </span>
            </div>


            <div className="notdatafound03">
              <Lottie animationData={bellAnimationData} />
              {/* <iframe src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json" frameBorder="0"></iframe> */}
              <p>You have no notifications from the last 30 days.</p>
            </div>


            <div className="divcontxlwextbelocbtn">
              <div className="xklw54c15w3s6">
                <svg id="fi_4457168" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><g><g><path d="m360.95 168.9h-300.95c-33.137 0-60 26.863-60 60v122c0 33.137 26.863 60 60 60h15.95v94.19c0 4.677 5.847 6.794 8.841 3.201l81.159-97.391h135c33.137 0 60-26.863 60-60z" fill="#fd5"></path></g></g><g><g><path d="m360.95 168.9v182c0 33.14-26.86 60-60 60h-120.47v-242z" fill="#ffb555"></path></g></g><path d="m290.95 302.9h-220c-8.284 0-15 6.716-15 15s6.716 15 15 15h220c8.284 0 15-6.716 15-15s-6.716-15-15-15z" fill="#ffb555"></path><path d="m305.95 317.9c0 8.28-6.72 15-15 15h-110.47v-30h110.47c8.28 0 15 6.72 15 15z" fill="#ff9000"></path><path d="m70.95 272.9h170.05c8.284 0 15-6.716 15-15s-6.716-15-15-15h-170.05c-8.284 0-15 6.716-15 15s6.716 15 15 15z" fill="#ffb555"></path><path d="m256 257.9c0 8.28-6.72 15-15 15h-60.52v-30h60.52c8.28 0 15 6.72 15 15z" fill="#ff9000"></path><circle cx="346" cy="166.9" fill="#f25a3c" r="105"></circle><path d="m451 166.9c0 57.9-47.1 105-105 105v-210c57.9 0 105 47.1 105 105z" fill="#e43539"></path><path d="m341.756 122.72-15 5c-7.859 2.62-12.106 11.115-9.487 18.974 3.494 10.48 14.13 10.227 14.23 10.26v39.896c0 8.284 6.716 15 15 15s15-6.716 15-15v-59.9c.001-10.225-10.031-17.464-19.743-14.23z" fill="#e9f3fb"></path><path d="m361.5 136.95v59.9c0 8.28-6.72 15-15 15-.17 0-.34 0-.5-.01v-89.89c8.18-.29 15.5 6.26 15.5 15z" fill="#d6e9f8"></path><path d="m346.05 1.9c-8.284 0-15 6.716-15 15v16.05c0 8.284 6.716 15 15 15s15-6.716 15-15v-16.05c0-8.284-6.716-15-15-15z" fill="#f25a3c"></path><path d="m361.05 16.9v16.05c0 8.28-6.72 15-15 15h-.05v-46.05h.05c8.28 0 15 6.72 15 15z" fill="#e43539"></path><path d="m249.147 50.743c-5.857-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l11.349 11.349c5.857 5.858 15.355 5.859 21.213 0 5.858-5.858 5.858-15.355 0-21.213z" fill="#f25a3c"></path><g fill="#e43539"><path d="m452.617 254.495c-5.857-5.858-15.355-5.858-21.213 0s-5.858 15.355 0 21.213l11.349 11.349c5.857 5.858 15.355 5.859 21.213 0 5.858-5.858 5.858-15.355 0-21.213z"></path><path d="m497 154h-16.05c-8.284 0-15 6.716-15 15s6.716 15 15 15h16.05c8.284 0 15-6.716 15-15s-6.716-15-15-15z"></path><path d="m452.758 83.446 11.349-11.349c5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0l-11.349 11.349c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.858 15.356 5.859 21.213 0z"></path></g></g></svg>


                <Link to={"/settings/create-organisations"} className="buttonx3">
                  <span className="asdf">Manage Notifications</span>
                </Link>
              </div>



            </div>



          </div>
        </div>
      )}


      {/* modal of account */}

      {showAccountSlider && (
        <div className="modalx1-overlay" onClick={toggleSidebar02}></div>
      )}


      {showAccountSlider && (
        <div className={`accountprofile-popup ${showAccountSlider ? "" : ""}`}>
          <div className="accountprofile-popup-content">
            <div id="topsecxksx23">
              <h2>Account
                <img className='svgiconsidebar' src={profileaccountIco} alt="" />
              </h2>
              <span>
                <Link id="newcomponentmdx2s5" to={"/settings/organisations"} onClick={closeSidebar}>{otherIcons?.iconoflinktab}</Link>
              </span>
            </div>


            <div className="blckaccountprociwls63">

              {loggedInUserData && (
                <div id="topsecondxks2">
                  <div className="xklwicoflts5">{loggedInUserData?.name.charAt(0)}</div>
                  <span>
                    <h3>{loggedInUserData?.name}</h3>
                    <p>{loggedInUserData?.email}</p>
                  </span>
                  {/* <div className="xskfjlsdl"></div> */}
                </div>
              )}

              <div className="lsixwlinksxkw452s">
                <Link className="insidclinks65w6x6w">
                  <img src={accountmanageIco} alt="" />
                  Manage Your Account</Link>
                <Link className="insidclinks65w6x6w">
                  <img src={feedbacksendIco} alt="" />
                  Send Feedback</Link>
                <Link className="insidclinks65w6x6w">
                  <img src={organizationIco} alt="" />
                  Organizations</Link>
                <Link className="insidclinks65w6x6w">
                  <img src={inviteUserIco} alt="" />
                  Invite Users</Link>
                <Link className="insidclinks65w6x6w">
                  <img src={helpIco} alt="" />
                  Help?</Link>
              </div>

            </div>




            <div className="divcontxlwextbelocbtn">
              <div className="xklw54c15w3s6">
                <svg height="512pt" viewBox="0 0 512.00533 512" width="512pt" xmlns="http://www.w3.org/2000/svg" id="fi_1828490"><path d="m298.667969 277.335938c-35.285157 0-64-28.714844-64-64 0-35.285157 28.714843-64 64-64h42.664062v-85.332032c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-7.019531 0-13.589844 3.45312475-17.578125 9.23437475-3.96875 5.78125-4.863281 13.144531-2.347656 19.691407l154.667969 405.335937c3.136718 8.277344 11.070312 13.738281 19.925781 13.738281h74.664062c35.285157 0 64-28.714844 64-64v-106.667968zm0 0" fill="#2196f3"></path><path d="m397.164062 318.382812c-7.957031-3.308593-13.164062-11.09375-13.164062-19.714843v-64h-85.332031c-11.777344 0-21.335938-9.554688-21.335938-21.332031 0-11.777344 9.558594-21.332032 21.335938-21.332032h85.332031v-64c0-8.621094 5.207031-16.40625 13.164062-19.714844 7.976563-3.304687 17.152344-1.46875 23.25 4.632813l85.335938 85.332031c8.339844 8.339844 8.339844 21.824219 0 30.164063l-85.335938 85.335937c-6.097656 6.097656-15.273437 7.933594-23.25 4.628906zm0 0" fill="#607d8b"></path><path d="m184.449219 44.84375-128.191407-42.730469c-28.929687-8.894531-56.257812 12.460938-56.257812 40.554688v384c0 18.242187 11.605469 34.519531 28.886719 40.492187l128.167969 42.730469c4.714843 1.449219 9.046874 2.113281 13.613281 2.113281 23.53125 0 42.664062-19.136718 42.664062-42.667968v-384c0-18.238282-11.605469-34.515626-28.882812-40.492188zm0 0" fill="#64b5f6"></path></svg>

                <Link onClick={clearLocalStoragex1} className="buttonx3">  <span className="asdf">Logout</span></Link>
              </div>
            </div>





            {/* <div onClick={clearLocalStoragex1} className="buttonx3"id="newcirclecenterxklsd2">
            <span id="newcirclecenterxkls" className="circle" aria-hidden="true">
              <span className="newcircnterxkls"> <BiLogOutCircle /> </span> </span>
            <span className="button-text">Logout</span>
          </div> */}


          </div>
        </div>
      )}








      {loading && (
        <>
          <div id="freezeloader">
            <div className="containeroffreezeloader">
              <div className="loaderoffreezeloa">
                <div className="loaderoffreezeloa--dotx454we"></div>
                <div className="loaderoffreezeloa--dotx454we"></div>
                <div className="loaderoffreezeloa--dotx454we"></div>
                <div className="loaderoffreezeloa--dotx454we"></div>
                <div className="loaderoffreezeloa--dotx454we"></div>
                <div className="loaderoffreezeloa--dotx454we"></div>
                <div className="loaderoffreezeloa--text"></div>
              </div>
            </div>
          </div>
        </>
      )}


    </>
  );
};

export default Topbar;
