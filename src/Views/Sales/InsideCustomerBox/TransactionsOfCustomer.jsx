import React, { useState } from 'react';

const InvoiceTable = ({ data }) => (
  <div className="usertrans-table-container">
    <div className="usertrans-table-header">
      <div className='usths2'>Transaction Date</div>
      <div className='usths3'>invoice Number</div>
      <div className='usths4'>Subtotal</div>
      <div className='usths5'>Total</div>
      <div className='usths6'>Status</div>
    </div>
    <div className="usertrans-table-body">
      {data.map((item, index) => (
        <div key={index} className="usertrans-table-row">
          <div className='usths2'>{item.transaction_date || 'NA'}</div>
          <div className='usths3'>{item.invoice_id || 'NA'}</div>
          <div className='usths4'>{item.subtotal || 'NA'}</div>
          <div className='usths5'>{item.total || 'NA'}</div>
          <div className={`usths6 ${item.is_approved == '0' ? 'draft-status' : item.is_approved == '1' ? 'approved-status' : ''}`}>
            <div className=''>{item.is_approved == 1 ? 'Approved' : item.is_approved == 0 ? 'Draft' : 'NA'}</div>
            {item.is_approved == '0' && <img src="https://cdn-icons-png.freepik.com/512/3253/3253267.png?ga=GA1.1.981296541.1712039579&" alt="Draft" />}
            {item.is_approved == '1' && <img src="https://cdn-icons-png.freepik.com/512/6597/6597168.png?ga=GA1.1.981296541.1712039579&" alt="Approved" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SaleOrderTable = ({ data }) => (
  <div className="usertrans-table-container">
    <div className="usertrans-table-header">
      <div className='usths2' >Transaction Date</div>
      <div className='usths3' >Sale Order Number</div>
      <div className='usths4' >Subtotal</div>
      <div className='usths5' >Total</div>
      <div className='usths6' >Status</div>
    </div>
    <div className="usertrans-table-body">
      {data.map((item, index) => (
        <div key={index} className="usertrans-table-row">
          <div className='usths2' >{item.transaction_date || 'NA'}</div>
          <div className='usths3' >{item.sale_order_id || 'NA'}</div>
          <div className='usths4' >{item.subtotal || 'NA'}</div>
          <div className='usths5' >{item.total || 'NA'}</div>
          <div className={`usths6 ${item.is_approved == '0' ? 'draft-status' : item.is_approved == '1' ? 'approved-status' : ''}`}>
            <div className=''>{item.is_approved == 1 ? 'Approved' : item.is_approved == 0 ? 'Draft' : 'NA'}</div>
            {item.is_approved == '0' && <img src="https://cdn-icons-png.freepik.com/512/3253/3253267.png?ga=GA1.1.981296541.1712039579&" alt="Draft" />}
            {item.is_approved == '1' && <img src="https://cdn-icons-png.freepik.com/512/6597/6597168.png?ga=GA1.1.981296541.1712039579&" alt="Approved" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuotationTable = ({ data }) => (
  <div className="usertrans-table-container">
    <div className="usertrans-table-header">
      <div className='usths2' >Transaction Date</div>
      <div className='usths3' >Quotation Number</div>
      <div className='usths4' >Subtotal</div>
      <div className='usths5' >Total</div>
      <div className='usths6' >Status</div>
    </div>
    <div className="usertrans-table-body">
      {data.map((item, index) => (
        <div key={index} className="usertrans-table-row">
          <div className='usths2' >{item.transaction_date || 'NA'}</div>
          <div className='usths3' >{item.quotation_id || 'NA'}</div>
          <div className='usths4' >{item.subtotal || 'NA'}</div>
          <div className='usths5' >{item.total || 'NA'}</div>
          <div className={`usths6 ${item.is_approved == '0' ? 'draft-status' : item.is_approved == '1' ? 'approved-status' : ''}`}>
            <div className=''>{item.is_approved == 1 ? 'Approved' : item.is_approved == 0 ? 'Draft' : 'NA'}</div>
            {item.is_approved == '0' && <img src="https://cdn-icons-png.freepik.com/512/3253/3253267.png?ga=GA1.1.981296541.1712039579&" alt="Draft" />}
            {item.is_approved == '1' && <img src="https://cdn-icons-png.freepik.com/512/6597/6597168.png?ga=GA1.1.981296541.1712039579&" alt="Approved" />}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TransactionsOfCustomer = ({ user, invoice, sale_order, quotation }) => {
  const [selectedTable, setSelectedTable] = useState('invoice');

  return (
    <>
      <div className="usertrans-button-container">
        <button
          className={selectedTable === 'invoice' ? 'activetranslclks' : ''}
          onClick={() => setSelectedTable('invoice')}
        >
          Invoice
        </button>
        <button
          className={selectedTable === 'sale_order' ? 'activetranslclks' : ''}
          onClick={() => setSelectedTable('sale_order')}
        >
          Sale Order
        </button>
        <button
          className={selectedTable === 'quotation' ? 'activetranslclks' : ''}
          onClick={() => setSelectedTable('quotation')}
        >
          Quotation
        </button>
      </div>
      <div className="usertrans-content-container">
        {selectedTable === 'invoice' && <InvoiceTable data={invoice} />}
        {selectedTable === 'sale_order' && <SaleOrderTable data={sale_order} />}
        {selectedTable === 'quotation' && <QuotationTable data={quotation} />}
      </div>
    </>
  );
};

export default TransactionsOfCustomer;
