import React, { useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { SiAwsorganizations } from "react-icons/si";
import { IoBagHandleOutline, IoDocumentsOutline } from "react-icons/io5";
import { PiShoppingCartLight, PiWarehouseLight } from "react-icons/pi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";

import homes_chinmey from '../../../assets/outlineIcons/home.svg';
import shopping_cart from '../../../assets/outlineIcons/shopping-cart.svg';
import basket_shopping_simple from '../../../assets/outlineIcons/basket-shopping-simple.svg';
import shopping_cart_add from '../../../assets/outlineIcons/shopping_cart_add.svg';
import accountantIco from '../../../assets/outlineIcons/accountantIco.svg';
import reportsIco from '../../../assets/outlineIcons/reportsIco.svg';
import truck_sideIco from '../../../assets/outlineIcons/truck_sideIco.svg';
import documentIco from '../../../assets/outlineIcons/documentIco.svg';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { LiaAngleDownSolid, LiaAngleLeftSolid, LiaAngleUpSolid } from 'react-icons/lia';
import { CiDeliveryTruck } from 'react-icons/ci';
import { VscGraphLine } from 'react-icons/vsc';

// import homes_chinmey from '../../../assets/icons/home.svg';
// import shopping_cart from '../../../assets/icons/shopping-cart.svg';
// import basket_shopping_simple from '../../../assets/icons/basket-shopping-simple.svg';
// import shopping_cart_add from '../../../assets/icons/shopping_cart_add.svg';
// import accountantIco from '../../../assets/icons/accountantIco.svg';


const MainLinks = ({ handleMenuItemClick, selectedMenuItem }) => {

  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  const [Items, setItems] = useState(false);
  const [WareHouse, setWareHouse] = useState(false);
  const [Sales, setSales] = useState(false);
  const [Purchases, setPurchases] = useState(false);
  const [Accountant, setAccountant] = useState(false);




  return (
    <>
      <div id="sidebarx1">
        <div id="topsearchbar">
        </div>



        <div
          onClick={() => handleMenuItemClick("home")}
          className={`menu-item ${selectedMenuItem === "home" ? "active" : ""
            }`}
        >
          {/* <RxDashboard /> */}
          <img className='svgiconsidebar' src={homes_chinmey} alt="" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#4e4e4e"} fill={"none"}>
    <path d="M8.99944 22L8.74881 18.4911C8.61406 16.6046 10.1082 15 11.9994 15C13.8907 15 15.3848 16.6046 15.2501 18.4911L14.9994 22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2.35151 13.2135C1.99849 10.9162 1.82198 9.76763 2.25629 8.74938C2.69059 7.73112 3.65415 7.03443 5.58126 5.64106L7.02111 4.6C9.41841 2.86667 10.6171 2 12.0001 2C13.3832 2 14.5818 2.86667 16.9791 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6487 13.2135L21.3477 15.1724C20.8473 18.4289 20.597 20.0572 19.4291 21.0286C18.2612 22 16.5538 22 13.1389 22H10.8613C7.44646 22 5.73903 22 4.57112 21.0286C3.40321 20.0572 3.15299 18.4289 2.65255 15.1724L2.35151 13.2135Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg> */}
          {/* <img style={{padding:"3px"}} src="https://cdn-icons-png.freepik.com/512/1828/1828673.png?ga=GA1.1.1484071354.1711014403&" alt="" /> */}
          
          <p className='dispynonesidebarc5w6s'>Home</p>
        </div>













        {/* organization start */}
        {/* <div className="menu-itemxse">
                <div
                  className="menu-title"
                  onClick={() => setOrgMenuOpen(!orgMenuOpen)}
                >
                  <span>
                    <SiAwsorganizations />
                     Organisations{" "}
                  </span>{" "}
                  {orgMenuOpen ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
                {orgMenuOpen && (
                  <ul className="submenu">
                    <li
                      onClick={() => handleMenuItemClick("organisations")}
                      className={`menu-item ${
                        selectedMenuItem === "organisations" ? "active" : ""
                      }`}
                    >
                      Manage
                    </li>
                    <li
                      onClick={() => handleMenuItemClick("create-organization")}
                      className={`menu-item ${
                        selectedMenuItem === "create-organization"
                          ? "active"
                          : ""
                      }`}
                    >
                      Create & Update
                    </li>
                    <li
                      onClick={() => handleMenuItemClick("users")}
                      className={`menu-item ${
                        selectedMenuItem === "users"
                          ? "active"
                          : ""
                      }`}
                    >
                      Users
                    </li>
                    <li
                      onClick={() =>
                        handleMenuItemClick("invite-user-to-organization")
                      }
                      className={`menu-item ${
                        selectedMenuItem === "invite-user-to-organization"
                          ? "active"
                          : ""
                      }`}
                    >
                      Invite User
                    </li>
                  </ul>
                )}
              </div> */}

        {/* organization end */}











        <div className="menu-itemxse">
          <div
            //  ${selectedMenuItem === "manage-items" || "stock-adjustment" || "items-categories" ? "active" : ""}
           className={`menu-title
             `}
          onClick={() => setItems(!Items)}>
            <span>
              {/* <IoBagHandleOutline /> */}
              <img className='svgiconsidebar' src={shopping_cart} alt="" />
              {/* <IoBagHandleOutline /> */}
              {/* <img src="https://cdn-icons-png.freepik.com/512/3081/3081559.png?ga=GA1.1.1484071354.1711014403&" alt="" /> */}
              <p className='dispynonesidebarc5w6s'>Items</p>
            </span>{" "}
            <p className='dispynonesidebarc5w6s'>
            {Items ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
          {Items && (
            <ul className="submenu">
              <li
                onClick={() => handleMenuItemClick("manage-items")}
                className={`menu-item ${selectedMenuItem === "manage-items" ? "active" : ""
                  }`}
              >
                List
              </li>
              {/* <li
                           onClick={() => {
                            handleMenuItemClick("create-items");
                            handleClearEditItem();
                          }}
                      className={`menu-item ${
                        selectedMenuItem === "create-items" ? "active" : ""
                      }`}
                    >
                      Create & Update
                    </li> */}
              <li onClick={() => { handleMenuItemClick("stock-adjustment"); }} className={`menu-item ${selectedMenuItem === "stock-adjustment" ? "active" : ""}`}>
                Stock Adjustment</li>
              <li onClick={() => { handleMenuItemClick("items-categories"); }} className={`menu-item ${selectedMenuItem === "items-categories" ? "active" : ""}`}>
                Categories</li>
              {/* 
                    <li
                           onClick={() => {
                            handleMenuItemClick("import-items");
                            handleClearEditItem();
                          }}
                      className={`menu-item ${
                        selectedMenuItem === "import-items" ? "active" : ""
                      }`}
                    >
                      Import Items
                    </li> */}
              {/*   <li  onClick={() => handleMenuItemClick("invite-user-to-organization")}className={`menu-item ${selectedMenuItem === "invite-user-to-organization" ? "active" : ""}`}>Invite User</li>
                    <li  onClick={() => handleMenuItemClick("organisations")}>Settings</li> */}
            </ul>
          )}

        </div>




        {/* <div className="menu-itemxse">
                <div className="menu-title" onClick={() => setWareHouse(!WareHouse)}>
                  <span>
                    <PiWarehouseLight />
                     Warehouse{" "}
                  </span>{" "}
                  {WareHouse ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {WareHouse && (
                  <ul className="submenu">
                    <li
                      onClick={() => {handleMenuItemClick("Warehouse");handleClearWareHouseItem();}}
                      className={`menu-item ${
                        selectedMenuItem === "Warehouse" ? "active" : ""
                      }`}
                    >
                      Manage
                    </li>
                    <li
                           onClick={() => {
                            handleMenuItemClick("create-warehouse");
                            handleClearWareHouseItem();
                          }}
                      className={`menu-item ${
                        selectedMenuItem === "create-warehouse" ? "active" : ""
                      }`}
                    >
                      Create & Update
                    </li>
                  
                  </ul>
                )}
                
              </div> */}



          <div className="heighseprx4w65s"></div>



        <div id='' className="menu-itemxse">
          <div 
            // ${selectedMenuItem === "customers" || "quotation" || "sales-orders" || "invoices"  || "credit-notes"  || "payment-recieved" ? "active" : ""}
           className={`menu-title`}
            onClick={() => setSales(!Sales)}>
            <span>
              {/* <HiOutlineShoppingCart /> */}
              {/* <PiShoppingCartLight /> */}
              <img className='svgiconsidebar' src={basket_shopping_simple} alt="" />
              {/* <img src="https://cdn-icons-png.freepik.com/512/4290/4290854.png?ga=GA1.1.683301158.1710405244&" alt="" /> */}
              <p className='dispynonesidebarc5w6s'>Sales</p>
            </span>{" "}
            <p className='dispynonesidebarc5w6s'>
            {Sales ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
          {Sales && (
            <ul className="submenu">
              <li
                onClick={() => { handleMenuItemClick("customers") }}
                className={`menu-item ${selectedMenuItem === "customers" ? "active" : ""
                  }`}
              >
                Customers
              </li>

              <li
                onClick={() => {
                  handleMenuItemClick("quotation");
                }}
                className={`menu-item ${selectedMenuItem === "quotation" ? "active" : ""
                  }`}
              >
                Quotation
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick("sales-orders");
                }}
                className={`menu-item ${selectedMenuItem === "sales-orders" ? "active" : ""
                  }`}
              >
                Sales Orders
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick("invoices");
                }}
                className={`menu-item ${selectedMenuItem === "invoices" ? "active" : ""
                  }`}
              >
                Invoices
              </li>

              <li
                onClick={() => {
                  handleMenuItemClick("credit-notes");
                }}
                className={`menu-item ${selectedMenuItem === "credit-notes" ? "active" : ""
                  }`}
              >
                Credit Notes
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick("payment-recieved");
                }}
                className={`menu-item ${selectedMenuItem === "payment-recieved" ? "active" : ""
                  }`}
              >
                Payment Recieved
              </li>
            </ul>
          )}

        </div>
        <div id='' className="menu-itemxse">
          <div className="menu-title" onClick={() => setPurchases(!Purchases)}>
            <span>
              {/* <BiPurchaseTag /> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#4e4e4e"} fill={"none"}>
    <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg> */}
              <img className='svgiconsidebar' src={shopping_cart_add} alt="" />
              {/* <img src="https://cdn-icons-png.freepik.com/512/4290/4290854.png?ga=GA1.1.683301158.1710405244&" alt="" /> */}
              <p className='dispynonesidebarc5w6s'>Purchases</p>
            </span>{" "}
            <p className='dispynonesidebarc5w6s'>
            {Purchases ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
          {Purchases && (
            <ul className="submenu">
              <li
                onClick={() => { handleMenuItemClick("vendors") }}
                className={`menu-item ${selectedMenuItem === "vendors" ? "active" : ""
                  }`}
              >
                Vendors
              </li>

              <li
                onClick={() => handleMenuItemClick("purchase")}
                className={`menu-item ${selectedMenuItem === "purchase" ? "active" : ""
                  }`}
              >
                Purchases
              </li>

              <li
                onClick={() => { handleMenuItemClick("bills") }}
                className={`menu-item ${selectedMenuItem === "bills" ? "active" : ""
                  }`}
              >
                Bills
              </li>
              <li
                onClick={() => { handleMenuItemClick("expenses") }}
                className={`menu-item ${selectedMenuItem === "expenses" ? "active" : ""
                  }`}
              >
                Expenses
              </li>
              <li
                onClick={() => { handleMenuItemClick("debit-notes") }}
                className={`menu-item ${selectedMenuItem === "debit-notes" ? "active" : ""
                  }`}
              >
                Debit Notes
              </li>
              <li
                onClick={() => { handleMenuItemClick("payment-made") }}
                className={`menu-item ${selectedMenuItem === "payment-made" ? "active" : ""
                  }`}
              >
                Payment Made
              </li>

            </ul>
          )}

        </div>








<div className="heighseprx4w65s"></div>

<div id='' className="menu-itemxse">
          <div className="menu-title" 
          // onClick={() => setAccountant(!Accountant)}
          >
            {/* <span><CiDeliveryTruck /> e-Way Bills</span> */}
            <span> <img className='svgiconsidebar' src={truck_sideIco} alt="" />  <p className='dispynonesidebarc5w6s'>e-Way Bills</p></span>
          </div>
        </div>



        <div id='' className="menu-itemxse">
          <div className="menu-title" onClick={() => setAccountant(!Accountant)}>
            <span>
              {/* <MdOutlineManageAccounts /> */}
              <img className='svgiconsidebar' src={accountantIco} alt="" />
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#4e4e4e"} fill={"none"}>
    <path d="M12 14.0466C9.7927 13.8404 7.53058 14.3187 5.57757 15.4816C4.1628 16.324 0.453365 18.0441 2.71266 20.1966C3.81631 21.248 5.04549 22 6.59087 22H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17.9992 14C16.7328 14 15.9117 14.8076 14.9405 15.102C14.5456 15.2217 14.3482 15.2815 14.2683 15.3659C14.1884 15.4502 14.165 15.5735 14.1182 15.8201C13.6174 18.4584 14.712 20.8976 17.3222 21.847C17.6027 21.949 17.7429 22 18.0006 22C18.2583 22 18.3986 21.949 18.679 21.847C21.2891 20.8976 22.3826 18.4584 21.8817 15.8201C21.8349 15.5735 21.8114 15.4502 21.7315 15.3658C21.6516 15.2814 21.4542 15.2216 21.0593 15.102C20.0878 14.8077 19.2657 14 17.9992 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg> */}
              {/* <img src="https://cdn-icons-png.freepik.com/512/4290/4290854.png?ga=GA1.1.683301158.1710405244&" alt="" /> */}
              <p className='dispynonesidebarc5w6s'>Accountant</p>
            </span>{" "}
            <p className='dispynonesidebarc5w6s'>
            {Accountant ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>

          </div>

          {Accountant && (
            <ul className="submenu">
              <li
                onClick={() => handleMenuItemClick("account-chart")}
                className={`menu-item ${selectedMenuItem === "account-chart" ? "active" : ""
                  }`}
              >
                Account chart
              </li>
              <li
                onClick={() => handleMenuItemClick("journal")}
                className={`menu-item ${selectedMenuItem === "journal" ? "active" : ""
                  }`}
              >
                Manual Journal
              </li>
            </ul>
          )}

        </div>





        
        <div id='' className="menu-itemxse">
          <div className="menu-title" 
          // onClick={() => setAccountant(!Accountant)}
          >
            {/* <span><VscGraphLine />Reports</span> */}
            <span> <img className='svgiconsidebar' src={reportsIco} alt="" /><p className='dispynonesidebarc5w6s'>Reports</p></span>
          </div>
        </div>




        <div className="heighseprx4w65s"></div>


        <div id='' className="menu-itemxse">
          <div className="menu-title" 
          // onClick={() => setAccountant(!Accountant)}
          >
            {/* <span><IoDocumentsOutline />Documents</span> */}
            <span> <img className='svgiconsidebar' src={documentIco} alt="" /><p className='dispynonesidebarc5w6s'>Documents</p></span>
          </div>
        </div>


      </div>
    </>
  )
}

export default MainLinks
