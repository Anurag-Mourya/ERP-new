import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from "../../Components/Loaders/Loader02";
import { activeInActive, itemDetails, deleteItems } from "../../Redux/Actions/itemsActions";
import InsideItemDetailsBox from "./InsideItemDetailsBox";
import { RxCross2 } from 'react-icons/rx';
import toast, { Toaster } from 'react-hot-toast';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import { otherIcons } from '../Helper/SVGIcons/ItemsIcons/Icons';
import newmenuicoslz from '../../assets/outlineIcons/othericons/newmenuicoslz.svg';
import { formatDate3 } from '../Helper/DateFormat';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const itemId = new URLSearchParams(location.search).get("id");

  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const item_detail = useSelector(state => state?.itemDetail);
  const { item_details, stock_details, preferred_vendor, purchase_account, sale_account } = useSelector(state => state?.itemDetail?.itemsDetail?.data || {});
  const deletedItem = useSelector(state => state?.deleteItem);
  const [switchValue, setSwitchValue] = useState(""); // State for the switch button value
  const dropdownRef = useRef(null); // Ref to the dropdown element
  const status = useSelector(state => state?.status);
  console.log("item_detail", item_detail)
  useEffect(() => {
    if (itemId) {
      const queryParams = {
        item_id: itemId,
        fy: localStorage.getItem('FinancialYear'),
        warehouse_id: localStorage.getItem('selectedWarehouseId'),
      };
      dispatch(itemDetails(queryParams));
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    setSwitchValue(item_details?.active);
  }, [item_details]);

  const handleSwitchChange = (e) => {
    const newValue = e.target.value;
    setSwitchValue(newValue);
    if (itemId) {
      const sendData = {
        item_id: itemId,
        active: newValue
      }
      dispatch(activeInActive(sendData))
        .then(() => {
          const toastMessage = newValue === '1' ? 'Item is now active' : 'Item is now inactive';
          toast.success(toastMessage);
        })
        .catch((error) => {
          toast.error('Failed to update item status');
          console.error('Error updating item status:', error);
          // Revert switch value if there's an error
          setSwitchValue((prevValue) => prevValue === '1' ? '0' : '1');
        });
    }
  };

  const deleteItemsHandler = () => {
    if (itemId) {
      dispatch(deleteItems({ item_id: itemId }, navigate));
    }
  }

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

  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-items?${queryParams.toString()}`);
  };
  const handleDublicateItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("dublicate", true);
    navigate(`/dashboard/create-items?${queryParams.toString()}`);
  };


  return (
    <>


      {deletedItem?.loading && <MainScreenFreezeLoader />}
      {status?.loading && <MainScreenFreezeLoader />}

      <Toaster />
      {
        item_detail?.loading ? <Loader02 /> :

          <>
            <div id="Anotherbox">
              <div id="leftareax12">
                <h1 className='' id="firstheading">
                  {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
                  {item_details?.name}
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
                <div
                  //  className="mainx1"
                  className="filtersorticos5wx2"
                  onClick={handleEditItems}>
                  <img src="/Icons/pen-clip.svg" alt="" />
                  {/* <p>Edit</p> */}
                </div>
                <div onClick={() => setShowDropdown(!showDropdown)} className="filtersorticos5wx2" ref={dropdownRef}>
                  {/* <img src="/Icons/menu-dots-vertical.svg" alt="" /> */}
                  <img src={newmenuicoslz} alt="" />
                  {showDropdown && (
                    <div className="dropdownmenucustom">
                      <div className='dmncstomx1' onClick={handleDublicateItems}>
                        {otherIcons?.dublicate_svg}
                        Duplicate</div>
                      <div className="bordersinglestroke"></div>
                      <div className='dmncstomx1' onClick={deleteItemsHandler} style={{ cursor: "pointer" }}>
                        {otherIcons?.delete_svg}
                        Delete</div>
                    </div>
                  )}
                </div>
                <Link className="linkx4" to={"/dashboard/manage-items"}>
                  <RxCross2 />
                </Link>
              </div>
            </div>

            <div id="item-details">
              <InsideItemDetailsBox itemDetails={item_details} preferred_vendor={preferred_vendor} stockDetails={stock_details} />
            </div>

          </>
      }
    </>
  );
};

export default ItemDetails;
