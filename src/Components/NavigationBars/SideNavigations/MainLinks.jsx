import React, { useState } from 'react'
import { RxDashboard } from "react-icons/rx";
import { SiAwsorganizations } from "react-icons/si";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiWarehouseLight } from "react-icons/pi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";

import homes_chinmey from '../../../assets/outlineIcons/home.svg';
import shopping_cart from '../../../assets/outlineIcons/shopping-cart.svg';
import basket_shopping_simple from '../../../assets/outlineIcons/basket-shopping-simple.svg';
import shopping_cart_add from '../../../assets/outlineIcons/shopping_cart_add.svg';
import accountantIco from '../../../assets/outlineIcons/accountantIco.svg';
import { LiaAngleDownSolid, LiaAngleUpSolid } from 'react-icons/lia';

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

          {/* <img style={{padding:"3px"}} src="https://cdn-icons-png.freepik.com/512/1828/1828673.png?ga=GA1.1.1484071354.1711014403&" alt="" /> */}
          Home
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
                    <LiaAngleUpSolid />
                  ) : (
                    <LiaAngleDownSolid />
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
          <div className="menu-title" onClick={() => setItems(!Items)}>
            <span>
              {/* <IoBagHandleOutline /> */}
              <img className='svgiconsidebar' src={shopping_cart} alt="" />

              {/* <img src="https://cdn-icons-png.freepik.com/512/3081/3081559.png?ga=GA1.1.1484071354.1711014403&" alt="" /> */}
              Items{" "}
            </span>{" "}
            {Items ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
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
                  {WareHouse ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
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


        <div id='' className="menu-itemxse">
          <div className="menu-title" onClick={() => setSales(!Sales)}>
            <span>
              {/* <HiOutlineShoppingCart /> */}

              <img className='svgiconsidebar' src={basket_shopping_simple} alt="" />
              {/* <img src="https://cdn-icons-png.freepik.com/512/4290/4290854.png?ga=GA1.1.683301158.1710405244&" alt="" /> */}
              Sales{" "}
            </span>{" "}
            {Sales ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
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
              <img className='svgiconsidebar' src={shopping_cart_add} alt="" />
              {/* <img src="https://cdn-icons-png.freepik.com/512/4290/4290854.png?ga=GA1.1.683301158.1710405244&" alt="" /> */}
              Purchases{" "}
            </span>{" "}
            {Purchases ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}
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
                onClick={() => { handleMenuItemClick("payment-made") }}
                className={`menu-item ${selectedMenuItem === "payment-made" ? "active" : ""
                  }`}
              >
                Payment Made
              </li>
              <li
                onClick={() => { handleMenuItemClick("debit-notes") }}
                className={`menu-item ${selectedMenuItem === "debit-notes" ? "active" : ""
                  }`}
              >
                Debit Notes
              </li>

            </ul>
          )}

        </div>
        <div id='' className="menu-itemxse">
          <div className="menu-title" onClick={() => setAccountant(!Accountant)}>
            <span>
              {/* <MdOutlineManageAccounts /> */}
              <img className='svgiconsidebar' src={accountantIco} alt="" />

              {/* <img src="https://cdn-icons-png.freepik.com/512/4290/4290854.png?ga=GA1.1.683301158.1710405244&" alt="" /> */}
              Accountant{" "}
            </span>{" "}

            {Accountant ? <LiaAngleUpSolid /> : <LiaAngleDownSolid />}

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
      </div>
    </>
  )
}

export default MainLinks
