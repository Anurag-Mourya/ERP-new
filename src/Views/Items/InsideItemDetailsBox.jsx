import React from 'react';

const InsideItemDetailsBox = ({ selectedQuotation }) => {
  // Helper function to display the value or 'NA' if it's null/empty
  const displayValue = (value) => value ? value : 'NA';

  return (
    <div id='itemsdetailsrowskl'>

      <div className="insideitedowxls">
        <p>Name </p> <span>{displayValue(selectedQuotation?.name)}</span>
      </div>
      <br />
      <div className="insideitedowxls">
        <p>URL Name </p> <span>{displayValue(selectedQuotation?.url_name)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Organisation ID </p> <span>{displayValue(selectedQuotation?.organisation_id)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Category ID </p> <span>{displayValue(selectedQuotation?.category_id)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Parent ID </p> <span>{displayValue(selectedQuotation?.parent_id)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Description </p> <span>{displayValue(selectedQuotation?.description)}</span>
      </div>
      <div className="insideitedowxls">
        <p>SKU </p> <span>{displayValue(selectedQuotation?.sku)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Unit </p> <span>{displayValue(selectedQuotation?.unit)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Price </p> <span>{displayValue(selectedQuotation?.price)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Tax Rate </p> <span>{displayValue(selectedQuotation?.tax_rate)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Inventory Level </p> <span>{displayValue(selectedQuotation?.inventory_level)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Type </p> <span>{displayValue(selectedQuotation?.type)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Purchase Price </p> <span>{displayValue(selectedQuotation?.purchase_price)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Tag IDs </p> <span>{displayValue(selectedQuotation?.tag_ids)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Image URL </p> <span>{selectedQuotation?.image_url !== "null" ? selectedQuotation?.image_url : 'NA'}</span>
      </div>
      <div className="insideitedowxls">
        <p>Active </p> <span>{displayValue(selectedQuotation?.active)}</span>
      </div>
      <div className="insideitedowxls">
        <p>Created At </p> <span>{new Date(displayValue(selectedQuotation?.created_at)).toLocaleDateString()}</span>
      </div>

      {/* <div className="insideitedowxls">
    <p>Entered By ID </p> <span>{displayValue(selectedQuotation.enteredbyid)}</span>
  </div>
  <div className="insideitedowxls">
    <p>Sale Account ID </p> <span>{displayValue(selectedQuotation.sale_acc_id)}</span>
  </div>
  <div className="insideitedowxls">
    <p>Purchase Account ID </p> <span>{displayValue(selectedQuotation.purchase_acc_id)}</span>
  </div> */}
    </div>
  );
};

export default InsideItemDetailsBox;



