import React, { useEffect, useRef, useState } from "react";
import DashboardComponent from "../../Views/Dashboard/DashboardComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import ManageItems from "../../Views/Items/ManageItems";
import CreateItems from "../../Views/Items/CreateItems";
import ImportItems from "../../Views/Items/ImportItems";
import Customers from "../../Views/Sales/Customer/Customers";
import Categories from "../../Views/Items/Categories";
import MainLinks from "./SideNavigations/MainLinks";
import Quotations from "../../Views/Sales/Quotations/Quotations";
import SalesOrderList from "../../Views/Sales/SalesOrder/SalesOrderList";
import Invoices from "../../Views/Sales/Invoices/Invoices";
import CreateInvoices from "../../Views/Sales/Invoices/CreateInvoices";
import StockAdjustment from "../../Views/Items/StockAdjusment";
import Vendors from "../../Views/Sales/Vendors/Vendors";
import CreateVendors from "../../Views/Sales/Vendors/CreateVendors";
// import Bills from "../../Views/Purchases/Bill/Bills";
import Bills from '../../Views/Purchases/Bill/Bills'
import CreateBills from "../../Views/Purchases/Bill/CreateBills";
import Expenses from "../../Views/Purchases/Expenses/Expenses";
import ExpenseDetails from "../../Views/Purchases/Expenses/ExpenseDetails";
import CreateExpence from '../../Views/Purchases/Expenses/CreateExpence'
import Journal from "../../Views/Accountant/Journal/Journal";
import CreateJournal from "../../Views/Accountant/Journal/CreateNewJournal";
import CreateNewJournal from "../../Views/Accountant/Journal/CreateNewJournal";
import CreditNotes from "../../Views/Sales/CreditNotes/CreditNotes";
import CreateCreditNotes from "../../Views/Sales/CreditNotes/CreateCreditNotes";
import DebitNotes from "../../Views/Purchases/DebitNotes/DebitNotes";
import CreateDebitNotes from "../../Views/Purchases/DebitNotes/CreateDebitNotes";
import CreateCategory from "../../Views/Items/CreateCategory";
import ItemDetails from "../../Views/Items/ItemDetails";
import CustomerDetails from "../../Views/Sales/Customer/CustomerDetails";
import QuotationDetails from "../../Views/Sales/Quotations/QuotationDetails";
import SalesOrderDetail from "../../Views/Sales/SalesOrder/SalesOrderDetail";
import InvoicesDetails from "../../Views/Sales/Invoices/InvoicesDetails";
import CreditNotesDetails from "../../Views/Sales/CreditNotes/CreditNotesDetails";
import CreateCustomer from '../../Views/Sales/Customer/CreateCustomer'
import CategoryDetails from "../../Views/Items/CategoryDetails";
import CreateQuotation from "../../Views/Sales/Quotations/CreateQuotation";
import VendorsDetails from "../../Views/Sales/Vendors/VendorsDetails";
import PurchaseOrder from "../../Views/Sales/PurchaseOrder/PurchaseOrder";
import CreatePurchaseOrder from "../../Views/Sales/PurchaseOrder/CreatePurchaseOrder";
import CreateSalesOrders from "../../Views/Sales/SalesOrder/CreateSalesOrders";
import AccountChart from "../../Views/Accountant/AccountChart/AccountChart";
import CreateAccountChart from "../../Views/Accountant/AccountChart/CreateAccountChart";
import PaymentRecieved from "../../Views/Sales/PaymentRecieved/PaymentRecieved";
import CreatePaymentRec from "../../Views/Sales/PaymentRecieved/CreatePaymentRec";
import AccountDetails from "../../Views/Accountant/AccountChart/AccountDetails";
import JournalDetailsSing from "../../Views/Accountant/Journal/JournalDetails";
import PaymentRevievedDetail from "../../Views/Sales/PaymentRecieved/PaymentRevievedDetail";
import BillDetail from "../../Views/Purchases/Bill/BillDetail";
import PaymentMade from "../../Views/Purchases/PaymentMade/PaymentMade";
import PurchaseOrderDetails from "../../Views/Sales/PurchaseOrder/PurchaseOrderDetails";
import DebitNotesDetails from "../../Views/Purchases/DebitNotes/DebitNotesDetails";
import PaymentMadeDetails from "../../Views/Purchases/PaymentMade/PaymentMadeDetails";
import CreatePaymentMade from "../../Views/Purchases/PaymentMade/CreatePaymentMade";
import { TfiAngleDoubleLeft, TfiAngleDoubleRight, TfiHelpAlt, TfiMore } from "react-icons/tfi";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

import helpIco from '../../assets/outlineIcons/othericons/helpIco.svg';
import { LuPlus } from "react-icons/lu";


import {  MdOutlineSwitchAccessShortcut } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { RiNotification3Line } from "react-icons/ri";



import { otherIcons } from "../../Views/Helper/SVGIcons/ItemsIcons/Icons";
import { BsPlusCircle } from "react-icons/bs";







const Sidebar = ({ loggedInUserData }) => {
  const [sidebarWidth, setSidebarWidth] = useState(230); // Initial width
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);



  const handleMouseDown = (e) => {
    const startX = e.pageX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.pageX - startX);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };


  



  const handleShrinkSidebar = () => {
    const newWidth = sidebarWidth === 50 ? 230 : 50;
    setSidebarWidth(newWidth);
    setIsSidebarCollapsed(newWidth === 50);
  
    const lastOptionsElements = document.querySelectorAll('.dispynonesidebarc5w6s');
  
    lastOptionsElements.forEach(element => {
      element.style.display = 'none';
    });
  
    if (newWidth !== 50) {
      setTimeout(() => {
        lastOptionsElements.forEach(element => {
          element.style.display = 'flex';
        });
      }, 150);
    }
  
  
  
    const heighseprx4w65sElements = document.querySelectorAll('.lastoptionsxkw');

    heighseprx4w65sElements.forEach(element => {
      if (newWidth === 50) {
        element.id = 'idofx5w6x3w6'; // Add your desired ID here
      } else {
        element.removeAttribute('id'); // Remove the ID
      }
    });
  };
  
  
  const handleShrinkSidebarTo230 = () => {
    const newWidth = 230;
    setSidebarWidth(newWidth);
    setIsSidebarCollapsed(newWidth === 50);
  
    const lastOptionsElements = document.querySelectorAll('.dispynonesidebarc5w6s');
  
    lastOptionsElements.forEach(element => {
      element.style.display = newWidth === 50 ? 'none' : 'flex';
    });


    
    const heighseprx4w65sElements = document.querySelectorAll('.lastoptionsxkw');

    heighseprx4w65sElements.forEach(element => {
      if (newWidth !== 50) {
        element.id = 'unsetx4w65'; // Add your desired ID here
      } else {
        element.removeAttribute('id'); // Remove the ID
      }
    });
  };
  
  




  const Navigate = useNavigate();
  const { component } = useParams();
  useEffect(() => {
    if (component) {
      setSelectedMenuItem(component);
      localStorage.setItem("selectedMenuItem", component);
    }
  }, [component]);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    localStorage.setItem("selectedMenuItem", menuItem);
    Navigate(`/dashboard/${menuItem}`);
  };










  // 

  const [showAddShorts, setShowAddShorts] = useState(false);
  const showaddshortcutsRef = useRef(null);


  const handleClickOutsidex12 = (event) => {
    if (
      showaddshortcutsRef.current &&
      !showaddshortcutsRef.current.contains(event.target)
    ) {
      setShowAddShorts(false);
    }
  };


  useEffect(() => {
    document.addEventListener("click", handleClickOutsidex12);
    return () => {
      document.removeEventListener("click", handleClickOutsidex12);
    };
  }, []);
  const handleSearchButtonClickx12 = () => {
    setShowAddShorts(!showAddShorts);
    setShowAccountSlider(false);
    setIsOpen(false);
  };



  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "home":
        return <DashboardComponent />;

      // case "/edit-quotation/:id":
      //   return <Quotation />;


      case "manage-items":
        return <ManageItems />;
      case "item-details":
        return <ItemDetails />;
      case "create-items":
        return <CreateItems />;
      case "items-categories":
        return <Categories />;

      case "category-details":
        return <CategoryDetails />;


      case "create-categories":
        return <CreateCategory />;
      case "import-items":
        return <ImportItems />;
      case "stock-adjustment":
        return <StockAdjustment />;



      //customers
      case "customers":
        return <Customers />;
      case "customer-details":
        return <CustomerDetails />;
      case "create-customer":
        return <CreateCustomer />;

      //vendors
      case "vendors":
        return <Vendors />;
      case "create-vendor":
        return <CreateVendors />;
      case "vendor-details":
        return <VendorsDetails />;

      //purchases
      case "create-purchases":
        return <CreatePurchaseOrder />;
      case "purchase":
        return <PurchaseOrder />;
      case "purchase-details":
        return <PurchaseOrderDetails />;

      case "expenses":
        return <Expenses />;
      case "create-expenses":
        return <CreateExpence />;
      case "expense-details":
        return <ExpenseDetails />;

      case "account-chart":
        return <AccountChart />;
      case "create-account-chart":
        return <CreateAccountChart />;




      case "bills":
        return <Bills />;
      case "create-bills":
        return <CreateBills />;
      case "bill-details":
        return <BillDetail />;


      case "quotation":
        return <Quotations />;
      case "create-quotations":
        return <CreateQuotation />;
      case "quotation-details":
        return <QuotationDetails />;

      case "credit-notes":
        return <CreditNotes />;
      case "creditnote-details":
        return <CreditNotesDetails />;
      case "create-credit-note":
        return <CreateCreditNotes />;

      case "payment-recieved":
        return <PaymentRecieved />;

      case "payment-recieved-detail":
        return <PaymentRevievedDetail />;
      case "payment-rec-details":
        return <CreditNotesDetails />;
      case "create-payment-rec":
        return <CreatePaymentRec />;

      case "debit-notes":
        return <DebitNotes />;
      case "create-debit-note":
        return <CreateDebitNotes />;
      case "debit-note-detail":
        return <DebitNotesDetails />;

      case "payment-made":
        return <PaymentMade />;
      case "create-payment-made":
        return <CreatePaymentMade />;
      case "payment-made-detail":
        return <PaymentMadeDetails />;


      // new links
      case "sales-orders":
        return <SalesOrderList />;
      case "create-sales-orders":
        return <CreateSalesOrders />;
      case "sales-order-details":
        return <SalesOrderDetail />;

      case "invoices":
        return <Invoices />;
      case "invoice-details":
        return <InvoicesDetails />;
      case "create-invoice":
        return <CreateInvoices />;

      case "journal":
        return <Journal />;
      case "journal-details":
        return <JournalDetailsSing />;
      case "create-journal":
        return <CreateNewJournal />;
      case "account-details":
        return <AccountDetails />;

      default:
        return null;
    }
  };
  const handleClearEditItem = () => {
    sessionStorage.removeItem('Edit-Item');
  };
  const handleClearWareHouseItem = () => {
    sessionStorage.removeItem('update-warehouse');
  };

  return (
    <>
      <div id="leftsidearea">
        {/* <LeftMenu /> */}
        <div className="sidebar-container">
        <div className="sidebar" style={{ width: `${sidebarWidth}px`, transition: "width 0.2s" }}>


            <MainLinks handleShrinkSidebarx1={handleShrinkSidebarTo230} isSidebarCollapsedx1={isSidebarCollapsed} selectedMenuItem={selectedMenuItem} handleMenuItemClick={handleMenuItemClick} />



            {/* Add more menu items and submenus as needed */}
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div id="newsidecont"></div>
            </div>
            
            <div className="btnofdecwidflhidx2" onClick={handleShrinkSidebar}>
  {/* {isSidebarCollapsed ? <LiaAngleRightSolid /> : <LiaAngleLeftSolid />} */}
  {isSidebarCollapsed ? <TfiAngleDoubleRight /> : <TfiAngleDoubleLeft />}
</div>

          <div className="lastoptionsxkw"  
           ref={showaddshortcutsRef}
           onClick={handleSearchButtonClickx12}
          >
          {/* <TfiHelpAlt /> */}
          {/* <span data-tooltip-id="my-tooltip" data-tooltip-content="Shortcuts"
           ref={showaddshortcutsRef}
           onClick={handleSearchButtonClickx12}
           to={""}
           id="new415addbutton"
          ><LuPlus /></span> */}




           <p className="dispynonesidebarc5w6s">Shortcuts</p>
          <LuPlus />



          {/* <img className='svgiconsidebar' src={helpIco} alt="" />
           <p className="dispynonesidebarc5w6s">Help?</p> */}
          </div>
          </div>
          <div className="divider"></div>
          <div className="main-content">
            {/* <Topbar loggedInUserData={loggedInUserData}/> */}
            {renderComponent()}
          </div>
        </div>
      </div>




















      {showAddShorts && (
        <div id="shortcuts-box">
          <div id="sugnboxsxx1">
            <h3>Shortcuts <MdOutlineSwitchAccessShortcut /></h3>
            <ul>

              <div className="firstboxxlw51ws1">
              <div className="xkwloxs654s2">
              <svg version="1.1" id="fi_891462" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.674 490.674" style={{ enableBackground: "new 0 0 490.674 490.674" }} xmlSpace="preserve">
  <g>
    <circle style={{ fill: "#455A64" }} cx="394.667" cy="426.671" r="53.333" />
    <circle style={{ fill: "#455A64" }} cx="181.333" cy="426.671" r="53.333" />
  </g>
  <path style={{ fill: "#FFC107" }} d="M488,78.276c-2.026-2.294-4.94-3.607-8-3.605H96c-5.891-0.001-10.668,4.773-10.669,10.664c0,0.717,0.072,1.433,0.216,2.136l42.667,213.333c1.014,4.967,5.384,8.534,10.453,8.533c0.469,0.031,0.939,0.031,1.408,0l320-42.667c4.807-0.642,8.576-4.446,9.173-9.259l21.333-170.667C490.989,83.681,490.047,80.592,488,78.276z" />
  <g>
    <path style={{ fill: "#FAFAFA" }} d="M181.333,266.671c-5.214-0.002-9.662-3.774-10.517-8.917l-21.333-128c-0.791-5.838,3.3-11.211,9.138-12.002c5.59-0.758,10.804,2.969,11.897,8.504l21.333,128c0.963,5.808-2.961,11.298-8.768,12.267C182.505,266.622,181.92,266.672,181.333,266.671z" />
    <path style={{ fill: "#FAFAFA" }} d="M234.667,256.004c-5.536,0.022-10.169-4.193-10.667-9.707l-10.667-117.333c-0.552-5.865,3.755-11.067,9.621-11.619c0.029-0.003,0.057-0.005,0.086-0.008c5.867-0.531,11.053,3.796,11.584,9.663c0,0,0,0.001,0,0.001l10.667,117.333c0.53,5.867-3.796,11.053-9.663,11.584c0,0-0.001,0-0.001,0L234.667,256.004z" />
    <path style={{ fill: "#FAFAFA" }} d="M288,245.337c-5.891,0-10.667-4.776-10.667-10.667V128.004c0-5.891,4.776-10.667,10.667-10.667c5.891,0,10.667,4.776,10.667,10.667v106.667C298.667,240.562,293.891,245.337,288,245.337z" />
    <path style={{ fill: "#FAFAFA" }} d="M341.333,234.671h-1.195c-5.858-0.62-10.104-5.872-9.484-11.731c0.004-0.036,0.008-0.073,0.012-0.109l10.667-96c0.692-5.867,5.963-10.093,11.84-9.493c5.855,0.648,10.077,5.919,9.43,11.775c0,0,0,0.001,0,0.001l-10.667,96C351.368,230.543,346.793,234.667,341.333,234.671z" />
    <path style={{ fill: "#FAFAFA" }} d="M394.667,224.004c-5.891-0.002-10.665-4.779-10.664-10.67c0-0.869,0.107-1.735,0.317-2.578l21.333-85.333c1.293-5.747,7.001-9.358,12.748-8.065c5.747,1.293,9.358,7.001,8.065,12.748c-0.036,0.161-0.076,0.321-0.12,0.48l-21.333,85.333C403.829,220.669,399.562,224.003,394.667,224.004z" />
  </g>
  <path style={{ fill: "#455A64" }} d="M437.333,352.004H191.125c-35.558-0.082-66.155-25.16-73.216-60.011L65.92,32.004H10.667C4.776,32.004,0,27.228,0,21.337s4.776-10.667,10.667-10.667h64c5.07-0.001,9.439,3.566,10.453,8.533l53.717,268.587c5.035,24.896,26.888,42.817,52.288,42.88h246.208c5.891,0,10.667,4.776,10.667,10.667C448,347.228,443.224,352.004,437.333,352.004z" />
</svg>

            <p>Items</p>
              </div>
              <div className="xkwloxs654s25">
              <li><Link to={"/"}><BsPlusCircle /></Link>Add Item</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Category</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Sub-Category</li>
              </div>
              
              </div>


              <div className="firstboxxlw51ws1">
              <div className="xkwloxs654s2">
              {otherIcons?.salesiconex}
              {/* <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="fi_12865731"><linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="399.03" x2="112.98" y1="412.32" y2="126.28"><stop offset="0" stop-color="#78a0b5"></stop><stop offset=".6" stop-color="#78a0b5"></stop><stop offset="1" stop-color="#a3c7d3"></stop></linearGradient><linearGradient id="linear-gradient-2" gradientUnits="userSpaceOnUse" x1="301.61" x2="186.77" y1="289.13" y2="174.28"><stop offset="0" stop-color="#c1dee5"></stop><stop offset=".57" stop-color="#fff"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><g id="Layer_12" data-name="Layer 12"><path d="m496.52 129.86c-13.43-49.48-64.89-100.94-114.37-114.37-30.33-7.57-70.98-15.36-126.15-15.49-55.16.14-95.81 7.92-126.14 15.49-49.48 13.44-100.94 64.89-114.37 114.37-7.57 30.33-15.35 70.98-15.49 126.14.14 55.17 7.92 95.82 15.49 126.15 13.43 49.48 64.89 100.93 114.37 114.37 30.33 7.57 71 15.35 126.14 15.49 55.17-.14 95.82-7.92 126.15-15.49 49.48-13.44 100.94-64.89 114.37-114.37 7.57-30.33 15.35-71 15.49-126.15-.14-55.16-7.92-95.81-15.49-126.14z" fill="#e6f1f4"></path><path d="m400.81 150.38a67.63 67.63 0 0 0 -61.42-61.38c-19.62-1.73-46.54-3-83.39-3s-63.76 1.26-83.38 3a67.63 67.63 0 0 0 -61.42 61.41c-1.73 19.62-3 84-3 120.8s1.26 101.18 3 120.8a67.38 67.38 0 0 0 6.6 23.74 18.48 18.48 0 0 0 25.38 8.08l41.4-22.34a18.54 18.54 0 0 1 17.84.15l34.82 19.52a38.4 38.4 0 0 0 37.53 0l34.83-19.52a18.52 18.52 0 0 1 17.83-.15l41.4 22.34a18.49 18.49 0 0 0 25.38-8.08 67.38 67.38 0 0 0 6.6-23.74c1.73-19.62 3-84 3-120.8s-1.27-101.21-3-120.83z" fill="url(#linear-gradient)"></path><path d="m167 292.18a14.61 14.61 0 1 1 14.61-14.61 14.61 14.61 0 0 1 -14.61 14.61zm0-62.85a14.62 14.62 0 1 1 14.61-14.61 14.61 14.61 0 0 1 -14.61 14.61zm125.49 62.85h-76.62a14.67 14.67 0 0 1 0-29.33h76.62a14.67 14.67 0 1 1 0 29.33zm57.74-62.74h-134.36a14.67 14.67 0 0 1 0-29.34h134.36a14.67 14.67 0 0 1 0 29.34z" fill="url(#linear-gradient-2)"></path></g></svg> */}
            <p>Sales</p>
              </div>
              <div className="xkwloxs654s25">
              <li><Link to={"/"}><BsPlusCircle /></Link>Customer</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Quotation</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Sales Order</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Invoice</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Credit Notes</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Payment Recieved</li>
              </div>
              
              </div>

              <div className="firstboxxlw51ws1">
              <div className="xkwloxs654s2">
              {/* <svg version="1.1"id="fi_438605"xmlns="http://www.w3.org/2000/svg"xmlnsXlink="http://www.w3.org/1999/xlink"x="0px"y="0px"viewBox="0 0 491.52 491.52"style={{ enableBackground: 'new 0 0 491.52 491.52' }}xmlSpace="preserve"><polygon style={{ fill: '#F6C358' }} points="100.312,44.51 391.208,44.51 391.208,22.255 435.718,0 55.802,0 100.312,22.255" /><path style={{ fill: '#FCD462' }}d="M477.773,458.694L456.117,44.51h-64.909H100.312H35.403L13.747,458.694c-0.933,17.845,13.285,32.826,31.154,32.826h401.718C464.488,491.52,478.707,476.539,477.773,458.694z M141.005,98.986c7.859,0,14.229,6.371,14.229,14.229c0,4.452-2.087,8.378-5.289,10.987v88.671c0,52.835,42.981,95.817,95.816,95.817c52.836,0,95.817-42.982,95.817-95.817v-88.667c-3.204-2.609-5.293-6.536-5.293-10.99c0-7.858,6.37-14.229,14.229-14.229c7.858,0,14.228,6.371,14.228,14.229c0,4.453-2.088,8.379-5.29,10.988v88.669v4.115c0,65.074-51.002,118.014-113.69,118.014c-62.688,0-113.69-52.94-113.69-118.014v-4.115v-88.666c-3.205-2.609-5.295-6.537-5.295-10.992C126.777,105.357,133.147,98.986,141.005,98.986z"/><polygon style={{ fill: '#DC8744' }} points="100.312,22.255 55.802,0 54.001,38.134" /><polygon style={{ fill: '#F2B853' }} points="100.312,44.51 100.312,22.255 54.001,38.134 35.403,44.51" /><polygon style={{ fill: '#DC8744' }} points="437.519,38.134 435.718,0 391.208,22.255" /><polygon style={{ fill: '#F2B853' }} points="391.208,22.255 391.208,44.51 456.117,44.51 437.519,38.134" /><g><path style={{ fill: '#DC8744' }}d="M132.072,124.207v-10.992h17.873v10.987c3.202-2.609,5.289-6.534,5.289-10.987c0-7.858-6.37-14.229-14.229-14.229c-7.858,0-14.228,6.371-14.228,14.229C126.777,117.67,128.867,121.597,132.072,124.207z"/><path style={{ fill: '#DC8744' }}d="M359.452,113.215v10.988c3.203-2.609,5.29-6.535,5.29-10.988c0-7.858-6.37-14.229-14.228-14.229c-7.859,0-14.229,6.371-14.229,14.229c0,4.454,2.089,8.381,5.293,10.99v-10.99H359.452z"/><path style={{ fill: '#DC8744' }}d="M245.762,326.563c-62.688,0-113.69-51.002-113.69-113.69v4.115c0,65.074,51.002,118.014,113.69,118.014c62.688,0,113.69-52.94,113.69-118.014v-4.115C359.452,275.561,308.45,326.563,245.762,326.563z"/></g> <path style={{ fill: '#FFFFFF' }}d="M132.072,113.215v10.992v88.666c0,62.688,51.002,113.69,113.69,113.69c62.688,0,113.69-51.002,113.69-113.69v-88.669v-10.988h-17.873v10.99v88.667c0,52.835-42.981,95.817-95.817,95.817c-52.835,0-95.816-42.982-95.816-95.817v-88.671v-10.987H132.072z"/></svg> */}

              {otherIcons?.purchaseiconex}
                <p>Purchases</p>
              </div>
              <div className="xkwloxs654s25">
              <li><Link to={"/"}><BsPlusCircle /></Link>Vendor</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Purchases</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Bill</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Expense</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Debit Notes</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Payment Mode</li>
              </div>
              
              </div>


              <div className="firstboxxlw51ws1">
              <div className="xkwloxs654s2">
                {otherIcons?.ewaybillsiconex}
              {/* <svg id="fi_6992035" height="512" viewBox="0 0 100 100" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="New_Gradient_Swatch_2" gradientUnits="userSpaceOnUse" x1="13.603" x2="76.403" y1="21.4" y2="84.2"><stop offset="0" stop-color="#0a75a1"></stop><stop offset="1" stop-color="#020088"></stop></linearGradient><g id="_09" data-name="09"><path d="m71.119 61.873a3.578 3.578 0 1 0 3.581 3.578 3.582 3.582 0 0 0 -3.581-3.578zm-50.625 0a3.578 3.578 0 1 0 3.578 3.578 3.582 3.582 0 0 0 -3.578-3.578zm6.588-15.018-2.711-2.71a1 1 0 0 1 1.414-1.414l2 2 1.066-1.066 5.109-5.109a1 1 0 1 1 1.414 1.414l-4.4 4.4.361.36 6.178-6.177a1 1 0 1 1 1.414 1.414l-6.885 6.884a1 1 0 0 1 -1.414 0l-1.068-1.067-1.06 1.071a1 1 0 0 1 -1.414 0zm67.118 11.972-6.131-3.25-2.569-12.712a10.21 10.21 0 0 0 -9.974-8.151h-17.492v-2.471a6.062 6.062 0 0 0 -6.049-6.062h-40.656a6.067 6.067 0 0 0 -6.061 6.062v33.214a1 1 0 0 0 1 1h5.924a8.362 8.362 0 0 0 16.6 0h34.025a8.362 8.362 0 0 0 16.6 0h14.315a1 1 0 0 0 1-1v-5.747a1 1 0 0 0 -.532-.883zm-67.34 6.648a6.367 6.367 0 0 1 -12.734 0c0-.007 0-.012 0-.018s0-.014 0-.021a6.368 6.368 0 0 1 12.735 0 .129.129 0 0 0 0 .021c-.004.006 0 .011 0 .018zm4.79-11.567a11.2 11.2 0 1 1 11.2-11.2 11.214 11.214 0 0 1 -11.2 11.2zm22.321 3.016a1 1 0 0 1 -1 1 1 1 0 0 1 -1-1v-6.3a1 1 0 0 1 1-1 1 1 0 0 1 1 1zm.007-10.608a1 1 0 0 1 -1 1 1 1 0 0 1 -1-1l.007-14.067a1 1 0 0 1 1-1 1 1 0 0 1 1 1zm17.141 25.5a6.375 6.375 0 0 1 -6.367-6.352v-.01-.013a6.368 6.368 0 1 1 6.368 6.375zm21.613-7.362h-13.309a8.362 8.362 0 0 0 -16.607 0h-4.782v-27.74h12.085v12.986a1 1 0 0 0 1 1h13.922l1.163 5.74a1.006 1.006 0 0 0 .512.685l6.016 3.189z" fill="url(#New_Gradient_Swatch_2)"></path></g></svg> */}
                <p>e-Way Bills</p>
              </div>
              <div className="xkwloxs654s25">
              <li><Link to={"/"}><BsPlusCircle /></Link>Create e-Way Bill</li>
              </div>
              
              </div>



              <div className="firstboxxlw51ws1">
              <div className="xkwloxs654s2">
              {otherIcons?.accountanticonex}
{/* <svg enableBackground="new 0 0 36 36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" id="fi_16597634"><path d="m8.114 5.564c-1.805 6.677-6.504 10.327-7.374 13.545s-.847 10.475 13.955 14.477 19.432-4.501 20.388-8.041c4.481-16.572-23.772-31.807-26.969-19.981z" fill="#efefef"></path><circle cx="15" cy="11" fill="#f3f3f1" r="4.25"></circle><path d="m13 11c0-1.955 1.328-3.585 3.125-4.08-.361-.1-.733-.17-1.125-.17-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c.392 0 .764-.07 1.125-.17-1.797-.495-3.125-2.125-3.125-4.08z" fill="#d5dbe1"></path><path d="m20.39 18.75h-1.14-7.36-1.14c-2.209 0-4 1.791-4 4v3.5h8.39.86 8.39v-3.5c0-2.209-1.791-4-4-4z" fill="#f3f3f1"></path><path d="m13 18.75h-1.11-1.14c-2.209 0-4 1.791-4 4v3.5h2.25v-3.5c0-2.209 1.791-4 4-4z" fill="#d5dbe1"></path><g fill="#a4afc1"><path d="m26.555 3.967h1v2h-1z" transform="matrix(.707 -.707 .707 .707 4.412 20.586)"></path><path d="m30.621 8.033h1v2h-1z" transform="matrix(.707 -.707 .707 .707 2.728 24.652)"></path><path d="m25.878 8.533h2v1h-2z" transform="matrix(.707 -.707 .707 .707 1.485 21.652)"></path><path d="m29.944 4.467h2v1h-2z" transform="matrix(.707 -.707 .707 .707 5.551 23.336)"></path><path d="m9.875 32.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"></path></g><circle cx="23" cy="24.5" fill="#2fdf84" r="2.75"></circle><path d="m22.5 24.5c0-1.117.669-2.074 1.625-2.504-.344-.155-.723-.246-1.125-.246-1.519 0-2.75 1.231-2.75 2.75s1.231 2.75 2.75 2.75c.402 0 .781-.091 1.125-.246-.956-.43-1.625-1.387-1.625-2.504z" fill="#00b871"></path><path d="m23 28c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5.5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"></path><path d="m22.25 27.25h1.5v2h-1.5z"></path><path d="m22.25 19.75h1.5v2h-1.5z"></path><path d="m25.246 21.88h1.998v1.5h-1.998z" transform="matrix(.866 -.5 .5 .866 -7.803 16.176)"></path><path d="m18.756 25.62h1.998v1.5h-1.998z" transform="matrix(.866 -.5 .5 .866 -10.547 13.43)"></path><path d="m19.005 21.631h1.5v1.998h-1.5z" transform="matrix(.5 -.866 .866 .5 -9.724 28.408)"></path><path d="m25.495 25.371h1.5v1.998h-1.5z" transform="matrix(.5 -.866 .866 .5 -9.72 35.895)"></path><path d="m15 16c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"></path><path d="m16 27h-9.25c-.414 0-.75-.336-.75-.75v-3.5c0-2.619 2.131-4.75 4.75-4.75h8.5v1.5h-8.5c-1.792 0-3.25 1.458-3.25 3.25v2.75h8.5z"></path></svg> */}
                <p>Accountant</p>
              </div>
              <div className="xkwloxs654s25">
              <li><Link to={"/"}><BsPlusCircle /></Link>Account Chart</li>
              <li><Link to={"/"}><BsPlusCircle /></Link>Journal</li>
              </div>
              
              </div>





              {/* <li><Link to={"/"}><HiOutlineHome /></Link>Add Organization</li>
              <li><Link to={"/"}><TfiMore /></Link>Create Items</li>
              <li><Link to={"/"}><RiNotification3Line /></Link>Add Customer</li>
              <li><Link to={"/"}><TfiMore /></Link>Invite User</li>
              <li><Link to={"/"}><HiOutlineHome /></Link>Add Organization</li>
              <li><Link to={"/"}><TfiMore /></Link>Create Items</li>
              <li><Link to={"/"}><TfiMore /></Link>Create Items</li>
              <li><Link to={"/"}><RiNotification3Line /></Link>Add Customer</li>
              <li><Link to={"/"}><TfiMore /></Link>Invite User</li> */}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

