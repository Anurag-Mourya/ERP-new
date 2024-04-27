import React, { useEffect, useState } from "react";
import DashboardComponent from "../../Views/Dashboard/DashboardComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import ManageItems from "../../Views/Items/ManageItems";
import CreateItems from "../../Views/Items/CreateItems";
import ImportItems from "../../Views/Items/ImportItems";
import Customers from "../../Views/Sales/Customer/Customers";
import Categories from "../../Views/Items/Categories";
import Quotation from "../../Views/Sales/Quotation";
import MainLinks from "./SideNavigations/MainLinks";
import Quotations from "../../Views/Sales/Quotations/Quotations";
import CreateSalesOrders from "../../Views/Sales/CreateSalesOrders";
import SalesOrderList from "../../Views/Sales/SalesOrder/SalesOrderList";
import Invoices from "../../Views/Sales/Invoices/Invoices";
import CreateInvoices from "../../Views/Sales/CreateInvoices";
import EditQuotation from "../../Views/Sales/EditQuotation";
import StockAdjustment from "../../Views/Items/StockAdjusment";
import Vendors from "../../Views/Sales/Vendors";
import CreateVendors from "../../Views/Sales/CreateVendors";
import Purchases from "../../Views/Purchases/Purchases";
import CreatePurchases from "../../Views/Purchases/CreatePurchases";
import Bills from "../../Views/Purchases/Bills";
import CreateBills from "../../Views/Purchases/CreateBills";
import Expenses from "../../Views/Expences/Expenses";
import CreateExpence from "../../Views/Expences/CreateExpence";
import AccountChart from "../../Views/Accountant/AccountChart";
import CreateAccountChart from "../../Views/Accountant/CreateAccountChart";
import EditExpence from "../../Views/Expences/EditExpence";
import Journal from "../../Views/Accountant/Journal/Journal";
import CreateJournal from "../../Views/Accountant/Journal/CreateNewJournal";
import CreateNewJournal from "../../Views/Accountant/Journal/CreateNewJournal";
import CreditNotes from "../../Views/Sales/CreditNotes/CreditNotes";
import CreateCreditNotes from "../../Views/Sales/CreditNotes/CreateCreditNotes";
import DebitNotes from "../../Views/Sales/DebitNotes/DebitNotes";
import CreateDebitNotes from "../../Views/Sales/DebitNotes/CreateDebitNotes";
import CreateCategory from "../../Views/Items/CreateCategory";
import ItemDetails from "../../Views/Items/ItemDetails";
import CustomerDetails from "../../Views/Sales/Customer/CustomerDetails";
import QuotationDetails from "../../Views/Sales/Quotations/QuotationDetails";
import SalesOrderDetail from "../../Views/Sales/SalesOrder/SalesOrderDetail";
import InvoicesDetails from "../../Views/Sales/Invoices/InvoicesDetails";
import CreditNotesDetails from "../../Views/Sales/CreditNotes/CreditNotesDetails";
import CreateCustomer from '../../Views/Sales/Customer/CreateCustomer'
import CategoryDetails from "../../Views/Items/CategoryDetails";
const Sidebar = ({ loggedInUserData }) => {
  const [sidebarWidth, setSidebarWidth] = useState(280); // Initial width
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");


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

      case "vendors":
        return <Vendors />;
      case "create-vendor":
        return <CreateVendors />;

      case "expenses":
        return <Expenses />;
      case "create-expenses":
        return <CreateExpence />;
      case "2":
        return <EditExpence />;

      case "account-chart":
        return <AccountChart />;
      case "create-account-chart":
        return <CreateAccountChart />;


      case "create-purchase":
        return <CreatePurchases />;
      case "purchase":
        return <Purchases />;

      case "bills":
        return <Bills />;
      case "create-bills":
        return <CreateBills />;


      case "quotation":
        return <Quotations />;
      case "create-quotations":
        return <Quotation />;
      case "quotation-details":
        return <QuotationDetails />;

      case "credit-notes":
        return <CreditNotes />;
      case "creditnote-details":
        return <CreditNotesDetails />;
      case "create-credit-note":
        return <CreateCreditNotes />;

      case "debit-notes":
        return <DebitNotes />;
      case "create-debit-note":
        return <CreateDebitNotes />;


      // new links
      case "sales-orders":
        return <SalesOrderList />;
      case "sales-orders":
        return <SalesOrderList />;
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
      case "create-journal":
        return <CreateNewJournal />;

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
          <div className="sidebar" style={{ width: sidebarWidth }}>

            <MainLinks selectedMenuItem={selectedMenuItem} handleMenuItemClick={handleMenuItemClick} />



            {/* Add more menu items and submenus as needed */}
            <div className="resize-handle" onMouseDown={handleMouseDown}>
              <div id="newsidecont"></div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="main-content">
            {/* <Topbar loggedInUserData={loggedInUserData}/> */}
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
