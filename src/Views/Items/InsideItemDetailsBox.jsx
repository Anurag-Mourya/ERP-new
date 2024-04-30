import React, { useState, useEffect, useRef } from "react";

import { TbListDetails } from 'react-icons/tb';
import { fetchMasterData } from "../../Redux/Actions/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { accountLists } from "../../Redux/Actions/listApisActions";

const InsideItemDetailsBox = ({ itemDetails,stockDetails }) => {
  // Helper function to display the value or 'NA' if it's null/empty
  const displayValue = (value) => value ? value : 'NA';
  const [activeSection, setActiveSection] = useState('overview');


  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  // Refs for dropdowns
  const sortDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setIsSortByDropdownOpen(false);
    }
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
      setIsFilterDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const handleSortByDropdownToggle = () => {
    setIsSortByDropdownOpen(!isSortByDropdownOpen);
  };

  const handleFilterDropdownToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  // Option selection handlers
  const handleSortBySelect = (option) => {
    console.log("Sort by selected:", option); // Implement your logic here
  };

  const handleFilterSelect = (option) => {
    console.log("Filter selected:", option); // Implement your logic here
  };

  const dispatch = useDispatch();
  const masterData = useSelector(state => state?.masterData?.masterData);
  const accList = useSelector(state => state?.accountList);

  
  console.log(accList?.data?.accounts)


  useEffect(() => {
    dispatch(fetchMasterData());
    dispatch(accountLists());

}, [dispatch]);
const allUnit = masterData?.filter(type => type.type === "2");


const findUnitNameById = (id) => {
  const unit = allUnit?.find(unit => unit.labelid  === id);
  return unit ? unit.label : 'NA';
};


  return (
    <div id='itemsdetailsrowskl'>
 <div className="buttonscontainxs2">
        <div
          className={`divac12cs32 ${activeSection === 'overview' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'transaction' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('transaction')}
        >
          Transaction
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'transaction' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('transaction')}
        >
          Stock history
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'activity' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('activity')}
        >
          Activitiy
        </div>
      </div>
      <div className="insidcontain">
        {activeSection === 'overview' && (
          <>
            <div className="inidbx1">
              <div className="inidbx1s1">
                <div className="inidbs1x1a1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#5D369F"} fill={"none"}>
                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
                Item information
                </div>
                
                <ul>
                  <li><span>Item type</span><h1>:</h1><p>{displayValue(itemDetails?.type)}</p></li>
                  <li><span>Current stock</span><h1>:</h1><p>{displayValue(itemDetails?.opening_stock)} QTY</p></li>
                  <li><span>SKU</span><h1>:</h1><p>{displayValue(itemDetails?.sku)}</p></li>
                  <li><span>SAC</span><h1>:</h1><p>**********</p></li>
                  <li><span>Unit</span><h1>:</h1><p>{findUnitNameById(itemDetails?.unit)}</p></li>
                  <li><span>UPC</span><h1>:</h1><p>**********</p></li>
                  <li><span>EAN</span><h1>:</h1><p>**********</p></li>
                  <li><span>ISBN</span><h1>:</h1><p>**********</p></li>
                  <li><span>Created source</span><h1>:</h1><p>**********</p></li>
                  <li><span>Tax preference</span><h1>:</h1><p id="firsttagp">{itemDetails?.tax_preference === 0 ? 'Non Taxable' : 'Taxable'}</p>
</li>
                </ul>
              </div>
                <div id="coninsd2x3s">
                <div className="inidbx1s2">
              <div className="inidbs1x1a1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#5D369F"} fill={"none"}>
    <path d="M18.058 8.53645L17.058 7.92286C16.0553 7.30762 15.554 7 15 7C14.446 7 13.9447 7.30762 12.942 7.92286L11.942 8.53645C10.9935 9.11848 10.5192 9.40949 10.2596 9.87838C10 10.3473 10 10.9129 10 12.0442V17.9094C10 19.8377 10 20.8019 10.5858 21.4009C11.1716 22 12.1144 22 14 22H16C17.8856 22 18.8284 22 19.4142 21.4009C20 20.8019 20 19.8377 20 17.9094V12.0442C20 10.9129 20 10.3473 19.7404 9.87838C19.4808 9.40949 19.0065 9.11848 18.058 8.53645Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 7.10809C13.3612 6.4951 12.9791 6.17285 12.4974 6.05178C11.9374 5.91102 11.3491 6.06888 10.1725 6.3846L8.99908 6.69947C7.88602 6.99814 7.32949 7.14748 6.94287 7.5163C6.55624 7.88513 6.40642 8.40961 6.10679 9.45857L4.55327 14.8971C4.0425 16.6852 3.78712 17.5792 4.22063 18.2836C4.59336 18.8892 6.0835 19.6339 7.5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.4947 10C15.336 9.44058 16.0828 8.54291 16.5468 7.42653C17.5048 5.12162 16.8944 2.75724 15.1836 2.14554C13.4727 1.53383 11.3091 2.90644 10.3512 5.21135C10.191 5.59667 10.0747 5.98366 10 6.36383" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                Selling information
                </div>
                <ul>
                  <li><span>Selling price</span><h1>:</h1><p>{displayValue(itemDetails?.price)}</p></li>
                  <li><span>Sales account</span><h1>:</h1><p>{displayValue(itemDetails?.sale_acc_id)}</p></li>
                  <li><span>Description</span><h1>:</h1><p>{displayValue(itemDetails?.sale_description)}</p></li>
                  
                </ul>
              </div>
              <div className="inidbx1s2">
              <div className="inidbs1x1a1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#5D369F"} fill={"none"}>
    <path d="M20.016 2C18.9026 2 18 4.68629 18 8H20.016C20.9876 8 21.4734 8 21.7741 7.66455C22.0749 7.32909 22.0225 6.88733 21.9178 6.00381C21.6414 3.67143 20.8943 2 20.016 2Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 8.05426V18.6458C18 20.1575 18 20.9133 17.538 21.2108C16.7831 21.6971 15.6161 20.6774 15.0291 20.3073C14.5441 20.0014 14.3017 19.8485 14.0325 19.8397C13.7417 19.8301 13.4949 19.9768 12.9709 20.3073L11.06 21.5124C10.5445 21.8374 10.2868 22 10 22C9.71321 22 9.45546 21.8374 8.94 21.5124L7.02913 20.3073C6.54415 20.0014 6.30166 19.8485 6.03253 19.8397C5.74172 19.8301 5.49493 19.9768 4.97087 20.3073C4.38395 20.6774 3.21687 21.6971 2.46195 21.2108C2 20.9133 2 20.1575 2 18.6458V8.05426C2 5.20025 2 3.77325 2.87868 2.88663C3.75736 2 5.17157 2 8 2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 10.875C11.6716 10.875 11 11.4626 11 12.1875C11 12.9124 11.6716 13.5 12.5 13.5C13.3284 13.5 14 14.0876 14 14.8125C14 15.5374 13.3284 16.125 12.5 16.125M12.5 10.875C13.1531 10.875 13.7087 11.2402 13.9146 11.75M12.5 10.875V10M12.5 16.125C11.8469 16.125 11.2913 15.7598 11.0854 15.25M12.5 16.125V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
              Purchase information
                </div>
                <ul>
                  <li><span>Selling price</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_price)}</p></li>
                  <li><span>Sales account</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_acc_id)}</p></li>
                  <li><span>Preferred vendor</span><h1>:</h1><p>{displayValue(itemDetails?.preferred_vendor)}</p></li>
                  <li><span>Description</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_description)}</p></li>
                  
                </ul>
              </div>
                </div>
            </div>
          </>
        )}
        {activeSection === 'transaction' && (
          <div className="inidbx2">
          <div id="middlesection">
             {/* <div className="customlinksinsx12">
      <div className="mainx1" onClick={handleSortByDropdownToggle}>
        <img src="/Icons/sort-size-down.svg" alt="" />
        <p>Sort by</p>
      </div>
      {isSortByDropdownOpen && (
        <div className="dropdowncontentofx35" ref={sortDropdownRef}>
          <div className='dmncstomx1 activedmc'>All Items</div>
                  <div className='dmncstomx1'>Active</div>
                  <div className='dmncstomx1'>Inactive</div>
                  <div className='dmncstomx1'>Services</div>
                  <div className='dmncstomx1'>Goods</div>
        </div>
      )}

      <div className="mainx1" onClick={handleFilterDropdownToggle}>
        <img src="/Icons/filters.svg" alt="" />
        <p>Filter</p>
      </div>
      {isFilterDropdownOpen && (
        <div className="dropdowncontentofx35" ref={filterDropdownRef}>
                  <div className='dmncstomx1 activedmc'>All Items</div>
                  <div className='dmncstomx1'>Active</div>
                  <div className='dmncstomx1'>Inactive</div>
        </div>
      )}
    </div> */}
            <div style={{padding:0}} id="mainsectioncsls">
            <div id="newtableofagtheme">
            <div className="table-headerx12">
                  {/* <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                      <input
                        type="checkbox"
                      />
                      <div className="checkmark"></div>
                  </div> */}
                  <div className="table-cellx12 ntofidbxx1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Date</div>
                  <div className="table-cellx12 ntofidbxx2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M7 10.0003V3.94909C7 3.37458 7 3.08732 6.76959 3.01583C6.26306 2.85867 5.5 4 5.5 4M7 10.0003H5.5M7 10.0003H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17.5V15.75C9 14.925 9 14.5126 8.70711 14.2563C8.41421 14 7.94281 14 7 14C6.05719 14 5.58579 14 5.29289 14.2563C5 14.5126 5 14.925 5 15.75C5 16.575 5 16.9874 5.29289 17.2437C5.58579 17.5 6.05719 17.5 7 17.5H9ZM9 17.5V18.375C9 19.6124 9 20.2312 8.56066 20.6156C8.12132 21 7.41421 21 6 21H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 20V4M16.5 20C15.7998 20 14.4915 18.0057 14 17.5M16.5 20C17.2002 20 18.5085 18.0057 19 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    Estimate number</div>

                  <div className="table-cellx12 ntofidbxx3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                    Customer name</div>
                  <div className="table-cellx12 ntofidbxx4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M21.5 12.95V11.05C21.5 7.01949 21.5 5.00424 20.1088 3.75212C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.75212C2.5 5.00424 2.5 7.01949 2.5 11.05V12.95C2.5 16.9805 2.5 18.9958 3.89124 20.2479C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.2479C21.5 18.9958 21.5 16.9805 21.5 12.95Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 8H14M16 6L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 17.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 17.5L8.25 15.75M8.25 15.75L6.5 14M8.25 15.75L10 14M8.25 15.75L6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    Quantity sold</div>
                  <div className="table-cellx12 ntofidbxx5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
                      <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 17L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 13H10.009M13.991 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Price</div>
                  <div className="table-cellx12 ntofidbxx6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M3 11C3 7.25027 3 5.3754 3.95491 4.06107C4.26331 3.6366 4.6366 3.26331 5.06107 2.95491C6.3754 2 8.25027 2 12 2C15.7497 2 17.6246 2 18.9389 2.95491C19.3634 3.26331 19.7367 3.6366 20.0451 4.06107C21 5.3754 21 7.25027 21 11V13C21 16.7497 21 18.6246 20.0451 19.9389C19.7367 20.3634 19.3634 20.7367 18.9389 21.0451C17.6246 22 15.7497 22 12 22C8.25027 22 6.3754 22 5.06107 21.0451C4.6366 20.7367 4.26331 20.3634 3.95491 19.9389C3 18.6246 3 16.7497 3 13V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 9.5L7 9.5M10 14.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    Total</div>
                  <div className="table-cellx12 ntofidbxx7">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#5D369F"} fill={"none"}>
    <path d="M18.058 8.53645L17.058 7.92286C16.0553 7.30762 15.554 7 15 7C14.446 7 13.9447 7.30762 12.942 7.92286L11.942 8.53645C10.9935 9.11848 10.5192 9.40949 10.2596 9.87838C10 10.3473 10 10.9129 10 12.0442V17.9094C10 19.8377 10 20.8019 10.5858 21.4009C11.1716 22 12.1144 22 14 22H16C17.8856 22 18.8284 22 19.4142 21.4009C20 20.8019 20 19.8377 20 17.9094V12.0442C20 10.9129 20 10.3473 19.7404 9.87838C19.4808 9.40949 19.0065 9.11848 18.058 8.53645Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 7.10809C13.3612 6.4951 12.9791 6.17285 12.4974 6.05178C11.9374 5.91102 11.3491 6.06888 10.1725 6.3846L8.99908 6.69947C7.88602 6.99814 7.32949 7.14748 6.94287 7.5163C6.55624 7.88513 6.40642 8.40961 6.10679 9.45857L4.55327 14.8971C4.0425 16.6852 3.78712 17.5792 4.22063 18.2836C4.59336 18.8892 6.0835 19.6339 7.5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.4947 10C15.336 9.44058 16.0828 8.54291 16.5468 7.42653C17.5048 5.12162 16.8944 2.75724 15.1836 2.14554C13.4727 1.53383 11.3091 2.90644 10.3512 5.21135C10.191 5.59667 10.0747 5.98366 10 6.36383" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                    Status</div>
                </div>


            {
  stockDetails.map((stock, index) => (
    <div key={index} className='table-rowx12'>
      <div className="table-cellx12 ntofidbxx1">{stock.transaction_date}</div>
      <div className="table-cellx12 ntofidbxx2">{stock.reason_type}</div>
      {/* You can add more divs here to display other stock details */}
      <div className="table-cellx12 ntofidbxx3">{stock.description}</div>
      <div className="table-cellx12 ntofidbxx4">{stock.quantity}</div>
      {/* Assuming the price is not provided in the stock details */}
      <div className="table-cellx12 ntofidbxx4">{stock.quantity}</div>
      {/* Assuming the total stock is not provided in the stock details */}
      <div className="table-cellx12 ntofidbxx6">{stock.quantity}</div>
      {/* Assuming the status is not provided in the stock details */}
      <div className="table-cellx12 ntofidbxx7 accepted">Accepted</div>
    </div>
  ))
}

   
          </div>
          </div>
          </div>
          </div>
        )}
        {activeSection === 'activity' && (
          <div className="inidbx3">
           <div className="headtablerowindx1">
           <div className="table-headerx12">
                  <div className="table-cellx12 thisfidbxx1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Date</div>
                  <div className="table-cellx12 thisfidbxx2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
    <path d="M8.37574 3C8.16183 3.07993 7.95146 3.16712 7.74492 3.26126M20.7177 16.3011C20.8199 16.0799 20.9141 15.8542 21 15.6245M18.4988 19.3647C18.6705 19.2044 18.8365 19.0381 18.9963 18.866M15.2689 21.3723C15.463 21.2991 15.6541 21.22 15.8421 21.1351M12.156 21.9939C11.9251 22.0019 11.6926 22.0019 11.4616 21.9939M7.78731 21.1404C7.96811 21.2217 8.15183 21.2978 8.33825 21.3683M4.67255 18.9208C4.80924 19.0657 4.95029 19.2064 5.0955 19.3428M2.6327 15.6645C2.70758 15.8622 2.78867 16.0569 2.87572 16.2483M2.00497 12.5053C1.99848 12.2972 1.9985 12.0878 2.00497 11.8794M2.62545 8.73714C2.69901 8.54165 2.77864 8.34913 2.8641 8.1598M4.65602 5.47923C4.80068 5.32514 4.95025 5.17573 5.1045 5.03124" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M13.5 12H16M12 10.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                    Time</div>
                  <div className="table-cellx12 thisfidbxx3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                    DETAILS</div>
           </div>
           {itemDetails?.activity.map((item) => {
            // Parse the created_at timestamp to extract the time component
            const createdAt = new Date(item.created_at);
            const hours = createdAt.getHours();
            const minutes = createdAt.getMinutes();
            // Format the time to display in 12-hour format
            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

            return (
              <div key={item.id} className='table-rowx12'>
                <div className="table-cellx12 thisfidbxx1">{item.date}</div>
                <div className="table-cellx12 thisfidbxx2">{formattedTime}</div>
                <div className="table-cellx12 thisfidbxx3">created by- <b>{item.enteredbyid}</b> </div>
              </div>
            );
          })}
           </div>
          </div>
        )}
      </div>












     {/* <div className="insidcontain">
     <div className="insideitedowxls">
        <p>Name</p> <span>{displayValue(itemDetails?.name)}</span>
      </div>
      <br />
      <div className="insideitedowxls">
        <p>URL Name</p> <span>{displayValue(itemDetails?.url_name)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Organisation ID</p> <span>{displayValue(itemDetails?.organisation_id)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Category ID</p> <span>{displayValue(itemDetails?.category_id)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Parent ID</p> <span>{displayValue(itemDetails?.parent_id)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Description</p> <span>{displayValue(itemDetails?.description)}</span>
      </div>
      <div className="insideitedowxls">
        <p>SKU</p> <span>{displayValue(itemDetails?.sku)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Unit</p> <span>{displayValue(itemDetails?.unit)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Price</p> <span>{displayValue(itemDetails?.price)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Tax Rate</p> <span>{displayValue(itemDetails?.tax_rate)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Inventory Level</p> <span>{displayValue(itemDetails?.inventory_level)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Type</p> <span>{displayValue(itemDetails?.type)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Purchase Price</p> <span>{displayValue(itemDetails?.purchase_price)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Tag IDs</p> <span>{displayValue(itemDetails?.tag_ids)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Image URL</p> <span>{itemDetails?.image_url !== "null" ? itemDetails?.image_url : 'NA'}</span>
      </div>
      <div className="insideitedowxls">
        <p>Active</p> <span>{displayValue(itemDetails?.active)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Created At</p> <span>{new Date(displayValue(itemDetails?.created_at)).toLocaleDateString()}</span>
      </div>
     </div> */}
     
    </div>
    
  );
};

export default InsideItemDetailsBox;