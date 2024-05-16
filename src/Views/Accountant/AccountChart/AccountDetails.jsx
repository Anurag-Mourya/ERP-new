import React, { useEffect, useRef, useState } from 'react'
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar'
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';

const AccountDetails = () => {
    const AccountId = new URLSearchParams(location.search).get("id");

    const switchValue = 0;
    const handleSwitchChange  = () => {
        console.log(1)
    }




    const Navigate = useNavigate();
    
    const handleEditItems = () => {
        const queryParams = new URLSearchParams();
        queryParams.set("id", AccountId);
        queryParams.set("edit", true);
        Navigate(`/dashboard/create-account-chart?${queryParams.toString()}`);
      };
    






    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  const dropdownRef = useRef(null); // Ref to the dropdown element

  
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    
  return (
    <>
    <TopLoadbar/>
    <div id="Anotherbox">
        <div id="leftareax12">
          <h1 className='' id="firstheading">
            {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
            {/* {item_details?.name} */}
            account Name
          </h1>
          <p id="firsttagp">Item</p>
          <p id="firsttagp">1 SKU</p>
        </div>
        <div id="buttonsdata">
          <div className="switchbuttontext">
            <div className="switches-container">
              <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue === "0"} onChange={handleSwitchChange} />
              <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="1" checked={switchValue === "1"} onChange={handleSwitchChange} />
              <label htmlFor="switchMonthly">Inactive</label>
              <label htmlFor="switchYearly">Active</label>
              <div className="switch-wrapper">
                <div className="switch">
                  <div id='inactiveid'>Inactive</div>
                  <div>Active</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="separatorx21"></div> */}
          <div className="mainx1" onClick={handleEditItems}>
            <img src="/Icons/pen-clip.svg" alt="" />
            <p>Edit</p>
          </div>
          <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
            <img src="/Icons/menu-dots-vertical.svg" alt="" />
            {showDropdown && (
              <div className="dropdownmenucustom">
                
                <div className="bordersinglestroke"></div>
                <div className='dmncstomx1'
                //  onClick={deleteItemsHandler} 
                 style={{ cursor: "pointer" }}>
                  {otherIcons?.delete_svg}
                  Delete</div>
              </div>
            )}
          </div>
          <Link className="linkx4" to={"/dashboard/account-chart"}>
            <RxCross2 />
          </Link>
        </div>
      </div>
    </>
  )
}

export default AccountDetails
