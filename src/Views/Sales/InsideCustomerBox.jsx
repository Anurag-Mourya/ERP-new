import React, { useState } from "react";
import "./insidequotationbox.scss";
import "./InsideCustomerBox/InsideUserbox.scss";
import OverviewOfCustomer from "./InsideCustomerBox/OverviewOfCustomer.jsx";
import CommentsOfCustomer from "./InsideCustomerBox/CommentsOfCustomer.jsx";
import TransactionsOfCustomer from "./InsideCustomerBox/TransactionsOfCustomer.jsx";
import MailsOfCustomer from "./InsideCustomerBox/MailsOfCustomer.jsx";
import StatementOfCustomer from "./InsideCustomerBox/StatementOfCustomer.jsx";

const InsideCustomerBox = ({ selectedCustomer }) => {
console.log(selectedCustomer)
  const [selectedTab, setSelectedTab] = useState('overview');

  let content;
  switch (selectedTab) {
    case 'overview':
      content = <OverviewOfCustomer user={selectedCustomer.user} />;
      break;
    case 'comments':
      content = <CommentsOfCustomer user={selectedCustomer.user} />;
      break;
    case 'transactions':
      content = <TransactionsOfCustomer user={selectedCustomer.user} invoice={selectedCustomer.invoice} sale_order={selectedCustomer.sale_order} quotation={selectedCustomer.quotation} />;
      break;
    case 'mails':
      content = <MailsOfCustomer user={selectedCustomer.user} />;
      break;
    case 'statement':
      content = <StatementOfCustomer user={selectedCustomer.user} />;
      break;
    default:
      content = null;
  }
  return (
    <>
       <div id="boxofquotationsinsdl">
          <div className="firsttopnavbarscks">
        <div className="top-navbar">
          <div className={`nav-itemsdf54sd5 ${selectedTab === 'overview' ? 'inscusxlsactive' : ''}`} onClick={() => setSelectedTab('overview')}>
            Overview
          </div>
          <div className={`nav-itemsdf54sd5 ${selectedTab === 'comments' ? 'inscusxlsactive' : ''}`} onClick={() => setSelectedTab('comments')}>
            Comments
          </div>
          <div className={`nav-itemsdf54sd5 ${selectedTab === 'transactions' ? 'inscusxlsactive' : ''}`} onClick={() => setSelectedTab('transactions')}>
            Transactions
          </div>
          <div className={`nav-itemsdf54sd5 ${selectedTab === 'mails' ? 'inscusxlsactive' : ''}`} onClick={() => setSelectedTab('mails')}>
            Mails
          </div>
          <div className={`nav-itemsdf54sd5 ${selectedTab === 'statement' ? 'inscusxlsactive' : ''}`} onClick={() => setSelectedTab('statement')}>
            Statement
          </div>
          </div>
          
          <div className="secdonsdx5s">
            {/* sdf */}
          </div>
        </div>
        <div className="content">
          {content}
        </div>
        </div>
    </>
  );
};

export default InsideCustomerBox;
