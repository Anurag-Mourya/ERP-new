import React from "react";
import "../Sales/insidequotationbox.scss";
import { GrFormNextLink } from "react-icons/gr";

const InsidePurchasesbox = ({ selectedPurchase }) => {
  return (
    <>
      <div id="boxofquoationsinsdl">

        <div id="pdfformattedbox">
          <div id={selectedPurchase?.is_approved == 1 ? "approveds545s5" : "drafts545s5"}>
            <p>{selectedPurchase?.is_approved == 1 ? "Approved" : "Draft"}</p>
          </div>

          <div className="randomheightagain40"></div>
          <div className="randomheightagain40"></div>
          <div className="randomheightagain40"></div>
          <div id="belowboxxlks">
            <div id="belowboxslx1">
              <h1>Purchases</h1>
              <p>Purchase Number: {selectedPurchase?.purchase_order_id}</p>
            </div>

            <div id="belowboxslx2">
              <b>Demo Books Organization</b>
              <p>Andaman and Nicobar Islands India</p>
            </div>
          </div>
          <div id="nextfloxlw93">
            <div id="lksdjklfsd58xs3">
              <b>Transaction Date: {selectedPurchase?.transaction_date}</b>
            </div>
            <div id="xl56s6d66">
              <b>Vender Details:</b>
              <p>Vender Name: {selectedPurchase?.vendor_name}</p>
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
                {selectedPurchase?.items?.map((item, index) => (
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
              <p>{parseFloat(selectedPurchase?.subtotal)?.toFixed(2)}/-</p>
            </div>
            <div id="totalcalculateionsxls">
              <p>Shipping Charge: </p>
              <p>+ {parseFloat(selectedPurchase?.shipping_charge)?.toFixed(2)}/-</p>
            </div>
            <div id="totalcalculateionsxls">
              <p>Adjustment Charge: </p>
              <p>+ {parseFloat(selectedPurchase?.adjustment_charge)?.toFixed(2)}/-</p>
            </div>
            <div id="totalcalculateionsxls" className="finaltotalxls5">
              <p>Total: </p>
              <p>{parseFloat(selectedPurchase?.total)?.toFixed(2)}/-</p>
            </div>
          </div>
          <div id="ndwslxo265s465a">
            <p> Vender Note: {selectedPurchase?.Vender_note}</p>
            <p> Terms: {selectedPurchase?.terms}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsidePurchasesbox
