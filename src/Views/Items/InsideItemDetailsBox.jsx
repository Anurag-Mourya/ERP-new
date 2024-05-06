import React, { useState, useEffect, useRef } from "react";

import { TbListDetails } from 'react-icons/tb';
import { fetchMasterData } from "../../Redux/Actions/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { accountLists } from "../../Redux/Actions/listApisActions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { items_Table_Detail_Transction_Icon } from "../Helper/SVGIcons/ItemsIcons/ItemsTableIcons";

const InsideItemDetailsBox = ({ itemDetails, stockDetails }) => {
  // Helper function to display the value or '' if it's null/empty
  const displayValue = (value) => value ? value : '';
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

  const [salesAccountName, setSalesAccountName] = useState('');
  const [purchaseAccountName, setPurchaseAccountName] = useState('');


  useEffect(() => {
    const salesAccount = accList?.data?.accounts?.find(account => account.id == itemDetails?.sale_acc_id);
    const purchaseAccount = accList?.data?.accounts?.find(account => account.id == itemDetails?.purchase_acc_id);
    if (salesAccount) {
      setSalesAccountName(salesAccount?.account_name);
      setPurchaseAccountName(purchaseAccount?.account_name);
    }
  }, [accList, itemDetails]);


  const settransactiontypes5 = (idparamsoftyhis) => {
    const Trantypesthis = accList?.data?.accounts?.find(account => account.id == idparamsoftyhis);
    return Trantypesthis?.account_name;
};

  
  


  useEffect(() => {
    dispatch(fetchMasterData());
    dispatch(accountLists());

  }, [dispatch]);
  const allUnit = masterData?.filter(type => type.type === "2");
  const allReasonType = masterData?.filter(type => type.type === "7");


  const findUnitNameById = (id) => {
    const unit = allUnit?.find(unit => unit.labelid === id);
    return unit ? unit.label : '';
  };
  const findReasonTypeNameById = (id) => {
    const unit = allReasonType?.find(unit => unit.labelid === id);
    return unit ? unit.label : '';
  };

  const items_Table_Detail_Activity_Icon = [
    // Define your icons here
  ];
  
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
          className={`divac12cs32 ${activeSection === 'stock_history' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('stock_history')}
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
                  {otherIcons?.information_svg}
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
                    {otherIcons?.selling_svg}
                    Selling information
                  </div>
                  <ul>
                    <li><span>Selling price</span><h1>:</h1><p>{displayValue(itemDetails?.price)}</p></li>
                    <li><span>Sales account</span><h1>:</h1><p>{salesAccountName}</p></li>
                    <li><span>Description</span><h1>:</h1><p>{displayValue(itemDetails?.sale_description)}</p></li>

                  </ul>
                </div>
                <div className="inidbx1s2">
                  <div className="inidbs1x1a1">
                    {otherIcons?.purchase_svg}
                    Purchase information
                  </div>
                  <ul>
                    <li><span>Selling price</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_price)}</p></li>
                    <li><span>Sales account</span><h1>:</h1><p>{purchaseAccountName}</p></li>
                    <li><span>Preferred vendor</span><h1>:</h1><p className="primarycolortext">{displayValue(itemDetails?.preferred_vendor === "[]" ? "" : displayValue(itemDetails?.preferred_vendor))}</p></li>
                    <li><span>Description</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_description)}</p></li>

                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
        {activeSection === 'transaction' && (
          <div className="inidbx2">
            {/* <div id="middlesection">

              <div style={{ padding: 0 }} id="mainsectioncsls">
                <div id="newtableofagtheme">
                  <div className="table-headerx12">
                    {items_Table_Detail_Transction_Icon?.map((val) => (
                      <div className={`table-cellx12 ${val.className}`} index={val.id}>
                        {val?.svg}
                        {val?.name}
                      </div>
                    ))}
                  </div>

                  {
                    stockDetails.map((stock, index) => (
                      <div key={index} className='table-rowx12'>
                        <div className="table-cellx12 ntofidbxx1">{stock.transaction_date}</div>
                        <div className="table-cellx12 ntofidbxx2">{stock.reason_type}</div>
                        <div className="table-cellx12 ntofidbxx3">{stock.description}</div>
                        <div className="table-cellx12 ntofidbxx4">{stock.quantity}</div>
                        <div className="table-cellx12 ntofidbxx4">{stock.quantity}</div>
                        <div className="table-cellx12 ntofidbxx6">{stock.quantity}</div>
                        <div className="table-cellx12 ntofidbxx7 accepted">Accepted</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div> */}

<div className="notdatafound">
          <iframe src="https://lottie.host/embed/e8ebd6c5-c682-46b7-a258-5fcbef32b33e/PjfoHtpCIG.json" frameborder="0"></iframe>
          </div>
          </div>
        )}










{activeSection === 'stock_history' && (
          <div className="inidbx2">

              <div style={{ padding: 0 }} id="mainsectioncsls">
                <div id="newtableofagtheme">
                  <div className="table-headerx12">
                    {items_Table_Detail_Transction_Icon?.map((val) => (
                      <div className={`table-cellx12 ${val.className}`} index={val.id}>
                        {val?.svg}
                        {val?.name}
                      </div>
                    ))}
                  </div>
                  {
                    stockDetails.map((stock, index) => (
                      <div key={index} className='table-rowx12'>
                        <div className="table-cellx12 stockhistoryxjlk41"> {new Date(stock.transaction_date).toLocaleDateString('en-GB', {day: '2-digit',month: 'short',year: 'numeric'})}</div>
                        {/* <div className="table-cellx12 stockhistoryxjlk42">{stock.transaction_type}</div> */}
                        <div className="table-cellx12 stockhistoryxjlk42">{settransactiontypes5(stock?.account_id)}</div>
                        <div className="table-cellx12 stockhistoryxjlk43"> {stock.inout == 0 ? 'out' : 'in'}</div>
                        <div className="table-cellx12 stockhistoryxjlk44">{Math.floor(parseFloat(stock.quantity))}</div>
                        <div className="table-cellx12 stockhistoryxjlk45">{findReasonTypeNameById(stock?.reason_type)}</div>
                        <div className="table-cellx12 stockhistoryxjlk46">{stock.description}</div>
                        <div className="table-cellx12 stockhistoryxjlk47">********</div>
                      </div>
                    ))
                  }
                </div>
              </div>
          </div>
        )}























        {activeSection === 'activity' && (
          <div className="inidbx3">
            <div className="headtablerowindx1">
              {/* <div className="table-headerx12">
                {items_Table_Detail_Activity_Icon.map((val) => (
                  <div className={`table-cellx12 ${val.className}`}>
                    {val.svg}
                    {val.name}</div>
                ))}
              </div> */}

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












    </div >

  );
};

export default InsideItemDetailsBox;