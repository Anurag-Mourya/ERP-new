import React, { useState, useEffect, useRef } from "react";

import { TbListDetails } from 'react-icons/tb';
import { fetchMasterData } from "../../Redux/Actions/globalActions";
import { useDispatch, useSelector } from "react-redux";
import { accountLists, vendorsLists } from "../../Redux/Actions/listApisActions";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { items_Table_Detail_Transction_Icon } from "../Helper/SVGIcons/ItemsIcons/ItemsTableIcons";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";
import { Link } from "react-router-dom";
import { formatDate3 } from "../Helper/DateFormat";
import sortbyIco from '../../assets/outlineIcons/othericons/sortbyIco.svg';
import FilterIco from '../../assets/outlineIcons/othericons/FilterIco.svg';
import { RiSearch2Line } from "react-icons/ri";
import PaginationComponent from "../Common/Pagination/PaginationComponent";

import calendaricofillx5 from '../../assets/outlineIcons/othericons/calendaricofillx5.svg';


import overviewIco from '../../assets/outlineIcons/othericons/overviewIco.svg';
import stocktransactionIco from '../../assets/outlineIcons/othericons/stocktransactionIco.svg';
import activityIco from '../../assets/outlineIcons/othericons/activityIco.svg';



const InsideItemDetailsBox = ({ itemDetails, stockDetails, preferred_vendor, }) => {
  console.log("stockDetails", stockDetails)
  // Helper function to display the value or '' if it's null/empty
  const displayValue = (value) => value ? value : "**********";
  const [activeSection, setActiveSection] = useState('overview');
  const cusList = useSelector(state => state?.vendorList);

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
  };

  const handleFilterSelect = (option) => {
  };

  const dispatch = useDispatch();
  const masterData = useSelector(state => state?.masterData?.masterData);
  const accList = useSelector(state => state?.accountList);



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


  const items_Table_Detail_Activity_Icon = [
    // Define your icons here
  ];

  const showTransationValue = (val) => {
    switch (val) {
      case "1":
        return "Opening Stock"
      case "2":
        return "Sale"
      case "3":
        return "Puchase"
      case "4":
        return "Credit Note"
      case "5":
        return "Debit Note"
      case "6":
        return "Modify Stock"
      case "7":
        return "Journal"
      default:
    }
  }

  console.log(showTransationValue())
  useEffect(() => {
    dispatch(vendorsLists());

  }, [dispatch]);


  function getDisplayDate(stock) {
    if (!stock) {
      return formatDate3(new Date());  // Return current date if transaction date is not provided
    } else {
      return formatDate3(new Date(stock));  // Return formatted transaction date
    }
  }
  return (
    <div id='itemsdetailsrowskl' className="secondinsidedatax15s">
      <div className="buttonscontainxs2">
        <div
          className={`divac12cs32 ${activeSection === 'overview' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          
          <img src={overviewIco} alt="" />
          Overview
        </div>
        {/* <div
          className={`divac12cs32 ${activeSection === 'transaction' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('transaction')}
        >
          Transaction
        </div> */}
        <div
          className={`divac12cs32 ${activeSection === 'stock_history' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('stock_history')}
        >
          <img src={stocktransactionIco} alt="" />
          Stock Transaction
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'activity' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('activity')}
        >
          <img src={activityIco} alt="" />
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
                  Item Information
                </div>

                <ul>
                  <li><span>Item Type</span><h1>:</h1><p>{displayValue(itemDetails?.type)}</p></li>
                  <li><span>Opening Stock</span><h1>:</h1><p>{(itemDetails?.opening_stock || 0.00)} QTY</p></li>
                  <li><span>Current Stock</span><h1>:</h1><p>
                    <span style={{ color: itemDetails?.stock < 0 ? 'red' : 'inherit' }}>
                      {itemDetails?.stock || 0.00}
                    </span> &nbsp;
                    QTY</p></li>
                  <li><span>SKU</span><h1>:</h1><p>{displayValue(itemDetails?.sku)}</p></li>
                  {/* <li><span>SAC</span><h1>:</h1><p>**********</p></li> */}
                  <li><span>Unit</span><h1>:</h1><p>{findUnitNameById(itemDetails?.unit)?.toUpperCase()}</p></li>
                  {/* <li><span>UPC</span><h1>:</h1><p> ||**********</p></li>
                  <li><span>EAN</span><h1>:</h1><p>**********</p></li>
                  <li><span>ISBN</span><h1>:</h1><p>**********</p></li>
                  <li><span>Created source</span><h1>:</h1><p>**********</p></li> */}
                  <li>
                    <span>Tax Preference</span><h1>:</h1><p id="firsttagp">{itemDetails?.tax_preference == 2 ? 'Non Taxable' : 'Taxable'}</p>
                  </li>
                  {itemDetails?.tax_preference == 1 ?
                    <li>
                      <span>Tax Rate</span><h1>:</h1><p id="firsttagp">{itemDetails?.tax_rate}</p>
                    </li> :
                    <li>
                      <span>Exemption Resion</span><h1>:</h1><p id="firsttagp">{itemDetails?.exemption_reason}</p>
                    </li>
                  }

                </ul>
              </div>
              <div id="coninsd2x3s">

                {itemDetails?.price || salesAccountName || itemDetails?.sale_description ?
                  <div className="inidbx1s2 inidbx1s2x21s5">
                    <div className="inidbs1x1a1">
                      {otherIcons?.selling_svg}
                      Selling Information
                    </div>
                    <ul>
                      <li><span>Selling Price</span><h1>:</h1><p>{displayValue(itemDetails?.price)}</p></li>
                      <li><span>Sales Account</span><h1>:</h1><p>{displayValue(itemDetails?.sale_account?.account_name)}</p></li>
                      <li><span>Description</span><h1>:</h1><p>{displayValue(itemDetails?.sale_description)}</p></li>
                    </ul>
                  </div> : ""
                }
                {itemDetails?.purchase_price || purchaseAccountName || itemDetails?.purchase_description ?
                  <div className="inidbx1s2 inidbx1s2x21s6">
                    <>
                      <div className="inidbs1x1a1">
                        {otherIcons?.purchase_svg}
                        Purchase Information
                      </div>
                      <ul>
                        <li><span>Selling Price</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_price)}</p></li>
                        <li><span>Purchase Account</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_account?.account_name)}</p></li>

                        <li><span>Preferred Vendors</span><h1>:</h1>
                          {preferred_vendor?.length >= 1
                            ?
                            <>
                              {
                                preferred_vendor &&
                                preferred_vendor?.map((val, index) => (
                                  <p className="primarycolortext" key={index}>
                                    {val?.display_name}{index < preferred_vendor.length - 1 && ','}
                                  </p>
                                ))
                              }
                            </>
                            :
                            <p className="primarycolortext">
                              NA
                            </p>
                          }

                        </li>
                        <li><span>Description</span><h1>:</h1><p>{displayValue(itemDetails?.purchase_description)}</p></li>

                      </ul>
                    </>

                  </div>
                  : ""}
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
              <iframe src="https://lottie.host/embed/e8ebd6c5-c682-46b7-a258-5fcbef32b33e/PjfoHtpCIG.json" frameBorder="0"></iframe>
            </div>
          </div>
        )}



        {activeSection === 'stock_history' && (
            <div className="sdjklifinskxclw56">
                      <div className="inidbx2">

<div className="searfiltsortcks">
  <div className="inseac5w">
    <input type="text" placeholder="Search Stock Transaction" />
    
  <RiSearch2Line id="" />
  </div>
  <div className="inseac5wx2">
  <img src={sortbyIco} alt="" data-tooltip-content="Sort By" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" />
  </div>
  <div className="inseac5wx2">
  <img src={FilterIco} alt="" data-tooltip-content="Filter" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" />
  </div>
</div>

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
    {stockDetails.length === 0 ? (
      <NoDataFound />
    ) : (
      stockDetails?.map((stock, index) => (
        <div key={index} className='table-rowx12'>
          <div className="table-cellx12 stockhistoryxjlk41">{getDisplayDate(stock?.transaction_date)}</div>
          <div className="table-cellx12 stockhistoryxjlk42">{showTransationValue(stock.transaction_type)}</div>
          {/* <div className="table-cellx12 stockhistoryxjlk42">{settransactiontypes5(stock?.account_id)}</div> */}
          <div className="table-cellx12 stockhistoryxjlk43">{stock.inout == 2 ? 'out' : 'in'}</div>

          <div className="table-cellx12 stockhistoryxjlk44">{(parseFloat(stock.quantity) || "NA")}</div>
          <div className="table-cellx12 stockhistoryxjlk45">{stock?.reason_type || "NA"} </div>
          <div className="table-cellx12 stockhistoryxjlk46">{stock.description || "NA"}</div>
          <div className="table-cellx12 stockhistoryxjlk47">
            {stock?.attachment ? (
              <>
                <Link target="_blank" to={`${stock?.attachment}`}>{otherIcons?.file_svg} File Attached</Link>
              </>
            ) : ""}
          </div>
        </div>
      ))
    )}
  </div>
</div>
</div>
<PaginationComponent
          // itemList={totalItems}
          // setDataChangingProp={handleDataChange}
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
          // itemsPerPage={itemsPerPage}
          // setItemsPerPage={setItemsPerPage}
        />
            </div>
        )}

        {activeSection === 'activity' && (
          <div className="activityofitem">
            <div className="searfiltsortcks">
  <div className="inseac5w">
    <input type="text" placeholder="Search Stock Transaction" />
    
  <RiSearch2Line id="" />
  </div>
  <div className="inseac5wx2">
  <img src={sortbyIco} alt="" data-tooltip-content="Sort By" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" />
  </div>
  <div className="inseac5wx2">
  <img src={FilterIco} alt="" data-tooltip-content="Filter" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" />
  </div>
</div>

            <div className="">
              {itemDetails?.activity.length === 0 ? (
                <NoDataFound />
              ) : (
                itemDetails?.activity?.map((item, index, arr) => {
                  const currentCreatedAt = new Date(item.created_at);
                  const currentDate = currentCreatedAt.toDateString();

                  // Check if current date is different from the previous date
                  const displayDate = index === 0 || currentDate !== new Date(arr[index - 1].created_at).toDateString();

                  const hours = currentCreatedAt.getHours();
                  const minutes = currentCreatedAt.getMinutes();
                  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

                  return (
                    <div className="activitylogxjks5">
                      {displayDate && <div className="datscxs445sde">
                        <img src={calendaricofillx5} alt=""/>
                        {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>}
                      <div key={item.id} className='childactivuytsd154'>
                        <div className="flexsd5fs6dx6w">
                          <div className="svgfiwithrolin">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                              <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </div>
                          <p className='sdf623ptag'>{formattedTime}</p>
                          <div className="descxnopcs45s">
                            <div className="chislsdf465s"><p>created by-</p> <b>{item.entryby.name}</b></div>
                            <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim diretium gravidat amet consectetur.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>
    </div >

  );
};

export default InsideItemDetailsBox;