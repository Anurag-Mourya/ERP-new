import React from 'react';
import '../Sales/CustomerProfilePopup.scss';

const VenderProfilePopup = ({ vendorData, onClose }) => {
  return (
    <>

      <div className="custprfpop-container" onClick={onClose}>
      </div>
      <div className="custprfpop-content">
        <button className="custprfpop-close-btn" onClick={onClose}>Close</button>
        <h2 className="custprfpop-heading">Customer Details</h2>
        <div className="custprfpop-details">
          <div className="custf1">
            <p><img src="https://cdn-icons-png.freepik.com/512/12483/12483620.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Name:</b> {vendorData?.name}</p>
            <p><img src="https://cdn-icons-png.freepik.com/512/726/726623.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Email:</b> {vendorData?.email}</p>
          </div>
          <div className="custf1">
            <p><img src="https://cdn-icons-png.freepik.com/512/2051/2051943.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Customer type:</b> {vendorData?.customer_type}</p>
            <p><img src="https://cdn-icons-png.freepik.com/512/4213/4213179.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Phone:</b> {vendorData?.mobile_no}</p>
          </div>
          <div className="custf1">
            <p><img src="https://cdn-icons-png.freepik.com/512/6879/6879682.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Company name:</b> {vendorData?.company_name}</p>
            <p><img src="https://cdn-icons-png.freepik.com/512/11121/11121159.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Display name:</b> {vendorData?.display_name}</p>
          </div>
          <div className="custf1">
            <p><img src="https://cdn-icons-png.freepik.com/512/435/435472.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Pan:</b> {vendorData?.pan_no}</p>
            <p><img src="https://cdn-icons-png.freepik.com/512/9639/9639011.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>GST:</b> {vendorData?.gst_no}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenderProfilePopup;
