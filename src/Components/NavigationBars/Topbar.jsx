import React, { useState, useRef, useEffect } from "react";
import "./navigationsbar.scss";
import "./pmodals.scss";
import { Tooltip } from 'react-tooltip';
import { RiSearch2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { RiNotification3Line } from "react-icons/ri";
import { TfiMore } from "react-icons/tfi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { BiLogOutCircle } from "react-icons/bi";
import { MdManageHistory, MdOutlineManageSearch, MdOutlineSwitchAccessShortcut } from "react-icons/md";
import { LiaAngleDownSolid } from "react-icons/lia";
import { GoPerson } from "react-icons/go";

const Topbar = ({ loggedInUserData }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const showaddshortcutsRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  // showaddshorts modal

  const [showAddShorts, setShowAddShorts] = useState(false);

  const handleSearchButtonClickx12 = () => {
    setShowAddShorts(!showAddShorts);
    setShowAccountSlider(false);
    setIsOpen(false);
  };

  const handleClickOutsidex12 = (event) => {
    if (
      showaddshortcutsRef.current &&
      !showaddshortcutsRef.current.contains(event.target)
    ) {
      setShowAddShorts(false);
    }
  };

  // showaddshorts modal close

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsidex12);
    return () => {
      document.removeEventListener("click", handleClickOutsidex12);
    };
  }, []);

  // modal
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setShowAccountSlider(false);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setShowAccountSlider(false);
  };

  // modal 02
  const [showAccountSlider, setShowAccountSlider] = useState(false);

  const toggleSidebar02 = () => {
    setShowAccountSlider(!showAccountSlider);
    setIsOpen(false);
  };

  const closeSidebar02 = () => {
    setShowAccountSlider(false);
    setIsOpen(false);
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
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching organisations:", error);
        setLoading(false);
      }
    };


    fetchOrganisations();
  }, []);




  // warehouse
  const [showWarehouseDropdown, setShowWarehouseDropdown] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const warehouseDropdownRef = useRef(null);

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

        setLoading(false);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
        setLoading(false);
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

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  const goForward = () => {
    navigate(1); // Navigate forward one step in history
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
              <a href="" onClick={goBack}><svg width="20" height="13" viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.079 5.13872H1.93871L6.36071 0.871002C6.69861 0.545106 6.19744 0.0263692 5.85504 0.354958L0.79198 5.24137C0.644244 5.37496 0.65601 5.61604 0.791998 5.75743L5.85505 10.646C6.19581 10.9706 6.69982 10.4615 6.36069 10.1299L1.93707 5.85868L16.079 5.72571C16.5424 5.72136 16.5662 5.14749 16.079 5.13872Z" fill="black" />
              </svg>
              </a>

              <a className="disabledbtn" href="" onClick={goForward}><svg width="20" height="13" viewBox="0 0 17 11" xmlns="http://www.w3.org/2000/svg">
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
                    <Link to={"/"}>
                      {/* <HiOutlineHome /> */}
                      Home
                    </Link>
                    <Link to={"/"}>
                      {/* <RiNotification3Line /> */}
                      Bell
                    </Link>
                    <Link to={"/"}>
                      {/* <TfiMore /> */}
                      More
                    </Link>
                  </ul>


                  <div id="buttonsxgrop">
                    <Link to={"/settings/organisations"} className=""> <MdOutlineManageSearch /> Manage Organization</Link>
                    {/* <Link to={"/Manage Organization"} className="">Lorem</Link> */}

                  </div>
                </div>
              </div>
            )}
          </div>






        </div>

        <div id="tobarsj03">
          <ul>



            {/* <div id="textofcompanycorg" onClick={handleWarehouseClick}>
       
          <p>2024-2025</p>
        </div> */}




            <div id="textofcompanycwarehouse" onClick={handleWarehouseClick}>

              <p>{selectedWarehouse ? selectedWarehouse.name : "Select Warehouse"}</p>
            </div>
            {showWarehouseDropdown && (
              <div className="modalx1-sidebar open" ref={warehouseDropdownRef}>
                <div className="modalx1-content">
                  <div id="topsecxks">
                    <h2>Warehouses</h2>
                    <span>
                      <Link id="newcomponentmdx2s5" to={"/settings/warehouse"} onClick={closeSidebar}>Manage <MdManageHistory /></Link>
                      <button className="buttonx2" onClick={handleWarehouseClick}>
                        <RxCross2 />
                      </button>
                    </span>
                  </div>
                  <ul>
                    {warehouses.map((warehouse) => (
                      <li
                        key={warehouse.id}
                        onClick={() => handleWarehouseSelection(warehouse)}
                      >
                        <div id="newcondfirstop">
                          <span>
                            <p>{warehouse.name}</p>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}





            {loggedInUserData?.active_organisation && (
              <div onClick={toggleSidebar} id="textofcompanycorg">
                <p>{loggedInUserData?.active_organisation?.name}</p>
                <LiaAngleDownSolid />
              </div>
            )}
            <span id="sepx15s"></span>
            {/* <li className="menu-togglxsdrewe">
              <div className="icon">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
              </div>
            </li> */}
            {/* <li><Link to={"/"}><HiOutlineHome /></Link></li> */}
            <li>
              <Link data-tooltip-id="my-tooltip" data-tooltip-content="Shortcuts"
                ref={showaddshortcutsRef}
                onClick={handleSearchButtonClickx12}
                to={""}
                id="new415addbutton"
              >
                <LuPlus />
              </Link>
            </li>
            <li>
              <Link data-tooltip-id="my-tooltip" data-tooltip-content="Notifications" onClick={toggleSidebar02} className="custtobsx45" to={""}>
                <IoIosNotificationsOutline />
              </Link>
            </li>
            <li>
              <Link data-tooltip-id="my-tooltip" data-tooltip-content="Settings" className="custtobsx45" to={"/settings"}>
                <CiSettings />
              </Link>
            </li>
            <li>
              <Link onClick={toggleSidebar02} className="custtobsx45" to={""}>
                <GoPerson />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* modal of organization */}
      {isOpen && <div className="modalx1-overlay" onClick={closeSidebar}></div>}
      <div className={`modalx1-sidebar ${isOpen ? "open" : ""}`}>
        <div className="modalx1-content">
          <div id="topsecxks">
            <h2>Manage Organizations</h2>
            <span>
              <Link id="newcomponentmdx2s5" to={"/settings/organisations"} onClick={closeSidebar}>Manage <MdManageHistory /></Link>
              <button className="buttonx2" onClick={toggleSidebar}>
                <RxCross2 />
              </button>
            </span>
          </div>
          <ul>
            {organisations?.map((org) => (
              <li
                onClick={() => handleOrgClick(org.organisation_id)}
                key={org.id}
                className={
                  org.is_active === true
                    ? "activeorganization"
                    : ""
                }
              >
                <div id="newcondfirstop">
                  <span>
                    <p>{org.name}</p>
                    {/* <p>{org.company_type}</p> */}
                  </span>
                  {/* <img
                      src={
                        org?.company_logo ||
                        // "https://cdn.iconscout.com/icon/free/png-256/free-logo-3446031-2882300.png"
                        "/Icons/organizationicon.gif"
                      }
                      alt=""
                    /> */}
                </div>
                {/* <p>Mobile No: {org.mobile_no}</p>
                  <p>GST: {org.gst}</p>
                  <p>Email: {org.email}</p> */}
                {/* <p id="datetimeoforganx">
                    {new Date(org.created_at).toLocaleDateString("en-GB")}
                  </p> */}
              </li>
            ))}
          </ul>
          <Link to={"/settings/create-organisations"} className="buttonx3">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Add Organization</span>
          </Link>
        </div>
      </div>

      {/* modal of account */}

      {showAccountSlider && (
        <div className="modalx1-overlay" onClick={closeSidebar02}></div>
      )}
      <div className={`modalx1-sidebar ${showAccountSlider ? "open" : ""}`}>
        <div className="modalx1-content">
          <div id="topsecxks">
            <h2>Manage Your Profile</h2>
            <button className="buttonx2" onClick={toggleSidebar02}>
              <RxCross2 />
            </button>
          </div>

          {loggedInUserData && (
            <div id="topsecondxks2">
              <div id="topsec6s52">
                <img
                  id="firstimage"
                  src="https://assets.materialup.com/uploads/b6c33467-82c3-442c-a2dc-c089bbff9fa1/preview.png"
                  alt=""
                />
                <span>
                  <h3>{loggedInUserData?.name}</h3>
                  <p>{loggedInUserData?.email}</p>
                </span>
              </div>
              <span>
                <img id="secondimage" src="/Icons/settingico.gif" alt="" />
              </span>
            </div>
          )}

          <div
            onClick={clearLocalStoragex1}
            className="buttonx3"
            id="newcirclecenterxklsd2"
          >
            <span
              id="newcirclecenterxkls"
              className="circle"
              aria-hidden="true"
            >
              <span className="newcircnterxkls">
                <BiLogOutCircle />
              </span>
            </span>
            <span className="button-text">Logout</span>
          </div>
        </div>
      </div>

      {/* add button modal */}
      {showAddShorts && (
        <div id="shortcuts-box">
          <div id="sugnboxsxx1">
            <h3>Shortcuts <MdOutlineSwitchAccessShortcut /></h3>
            <ul>
              <li>
                <Link to={"/"}>
                  <HiOutlineHome />
                </Link>
                Add Organization
              </li>
              <li>
                <Link to={"/"}>
                  <TfiMore />
                </Link>
                Create Items
              </li>
              <li>
                <Link to={"/"}>
                  <RiNotification3Line />
                </Link>
                Add Customer
              </li>
              <li>
                <Link to={"/"}>
                  <TfiMore />
                </Link>
                Invite User
              </li>
              <li>
                <Link to={"/"}>
                  <HiOutlineHome />
                </Link>
                Add Organization
              </li>
              <li>
                <Link to={"/"}>
                  <TfiMore />
                </Link>
                Create Items
              </li>
              <li>
                <Link to={"/"}>
                  <TfiMore />
                </Link>
                Create Items
              </li>
              <li>
                <Link to={"/"}>
                  <RiNotification3Line />
                </Link>
                Add Customer
              </li>
              <li>
                <Link to={"/"}>
                  <TfiMore />
                </Link>
                Invite User
              </li>
            </ul>
          </div>
        </div>
      )}

      {loading && (
        <>
          <div id="freezeloader"></div>
        </>
      )}


    </>
  );
};

export default Topbar;
