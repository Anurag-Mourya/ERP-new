import React, { useEffect, useState } from "react";
import DashboardComponent from "../../Views/Dashboard/DashboardComponent";
import { useNavigate, useParams } from "react-router-dom";
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
