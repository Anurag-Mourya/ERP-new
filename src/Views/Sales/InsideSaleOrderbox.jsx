import React from "react";
import "./insidequotationbox.scss";
import { GrFormNextLink } from "react-icons/gr";

const InsideSaleOrderbox = ({ selectedQuotation }) => {
  return (
    <>
      <div id="boxofquoationsinsdl">

        <div id="pdfformattedbox">
          <div id={selectedQuotation?.is_approved == 1 ? "approveds545s5" : "drafts545s5"}>
            <p>{selectedQuotation?.is_approved == 1 ? "Approved" : "Draft"}</p>
          </div>

          <div className="randomheightagain40"></div>
          <div className="randomheightagain40"></div>
          <div className="randomheightagain40"></div>
          <div id="belowboxxlks">
            <div id="belowboxslx1">
              <h1>Sale Order</h1>
              <p>Sale Order Number: {selectedQuotation?.quotation_id}</p>
            </div>

            <div id="belowboxslx2">
              <b>Demo Books Organization</b>
              <p>Andaman and Nicobar Islands India</p>
            </div>
          </div>
          <div id="nextfloxlw93">
            <div id="lksdjklfsd58xs3">
              <b>Transaction Date: {selectedQuotation?.transaction_date}</b>
            </div>
            <div id="xl56s6d66">
              <b>Customer Details:</b>
              <p>Customer Name: {selectedQuotation?.customer_name}</p>
              <b>view more<GrFormNextLink /></b>
            </div>
          </div>
          <div id="newtableforquoationsxlso">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Item Name</th>
                  <th className="stylerightfloat">Quantity</th>
                  <th className="stylerightfloat">Price</th>
                  <th className="stylerightfloat" >Amount</th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {selectedQuotation?.items?.map((item, index) => (
                  <tr key={item?.id}>
                    <td>{index + 1}</td>
                    <td>{item?.item?.name}</td> {/* Assuming item has a nested object 'item' */}
                    <td className="stylerightfloat">{item?.quantity}</td>
                    <td className="stylerightfloat">{item?.item?.price}/-</td>

                    <td className="stylerightfloat" >{item?.gross_amount}/-</td>
                    {/* Add more table cells for additional item details */}
                  </tr>
                ))}
              </tbody>
            </table>

            <div id="totalcalculateionsxls">
              <p>Sub total: </p>
              <p>{parseFloat(selectedQuotation?.subtotal).toFixed(2)}/-</p>
            </div>
            <div id="totalcalculateionsxls">
              <p>Shipping Charge: </p>
              <p>+ {parseFloat(selectedQuotation?.shipping_charge).toFixed(2)}/-</p>
            </div>
            <div id="totalcalculateionsxls">
              <p>Adjustment Charge: </p>
              <p>+ {parseFloat(selectedQuotation?.adjustment_charge).toFixed(2)}/-</p>
            </div>
            <div id="totalcalculateionsxls" className="finaltotalxls5">
              <p>Total: </p>
              <p>{parseFloat(selectedQuotation?.total).toFixed(2)}/-</p>
            </div>
          </div>
          <div id="ndwslxo265s465a">
            <p> Customer Note: {selectedQuotation?.customer_note}</p>
            <p> Terms: {selectedQuotation?.terms}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsideSaleOrderbox;
