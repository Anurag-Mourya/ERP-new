import React from 'react'
import { formatDate, formatDate2 } from '../../Helper/DateFormat'

const ListComponent = ({ quotation, selectedRows, handleCheckboxChange, handleRowClicked, section }) => {
    return (
        <div
            className={`table-rowx12 ${selectedRows.includes(quotation.id)
                ? "selectedresult"
                : ""
                }`}
        >
            <div
                className="table-cellx12 checkboxfx1"
                id="styl_for_check_box"
            >
                <input
                    checked={selectedRows.includes(quotation.id)}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(quotation.id)}
                />
                <div className="checkmark"></div>
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs1"
            >
                {quotation.created_at
                    ? formatDate2(quotation.created_at)
                    : "NA"}
            </div>

            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs2"
            >
                {section === "invoice" ? quotation.invoice_id : quotation.sale_order_id || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs3"
            >
                {quotation.customer_name || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs4"
            >
                {quotation.reference_no || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs5"
            >
                {quotation.total || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
            >
                <p className={quotation?.status === "1" ? "approved" : quotation?.status === "2" ? "declined" : quotation?.status == "3" ? "sent" : quotation?.status === "0" ? "draft" : "declined"} >

                    {quotation?.status === "1" ? "Approved" : quotation?.status === "2" ? "Rejected" : quotation?.status == "3" ? "Sent" : quotation?.status == "0" ? "Draft" : quotation?.status == "4" ? "Expired" : "NA"
                    }
                </p>
            </div>
        </div>
    )
}

export default ListComponent;

export const ListComponent2 = ({ quotation, selectedRows, handleCheckboxChange, handleRowClicked }) => {
    return (
        <div
            className={`table-rowx12 ${selectedRows.includes(quotation.id)
                ? "selectedresult"
                : ""
                }`}

        >
            <div
                className="table-cellx12 checkboxfx1"
                id="styl_for_check_box"
            >
                <input
                    checked={selectedRows.includes(quotation.id)}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(quotation.id)}
                />
                <div className="checkmark"></div>
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs1"
            >
                {quotation.created_at
                    ? formatDate2(quotation.created_at)
                    : ""}
            </div>

            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs2"
            >
                {quotation.credit_note_id || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs3"
            >
                {quotation.customer_name || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs4"
            >
                {quotation.reference_no || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs5"
            >
                {quotation.total || "NA"}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
            >
                <p className={quotation?.status === "1" ? "approved" : quotation?.status === "2" ? "declined" : quotation?.status == "3" ? "sent" : quotation?.status === "0" ? "draft" : "declined"} >

                    {quotation?.status === "1" ? "Approved" : quotation?.status === "2" ? "Rejected" : quotation?.status == "3" ? "Sent" : quotation?.status == "0" ? "Draft" : quotation?.status == "4" ? "Expired" : "NA"
                    }
                </p>
            </div>
        </div>
    )
}

export const ListComponent3 = ({ quotation, selectedRows, handleCheckboxChange, handleRowClicked, value }) => {
    return (
        <div
            className={`table-rowx12 ${selectedRows.includes(quotation.id) ? "selectedresult" : ""}`}

        >
            <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                <input
                    checked={selectedRows.includes(quotation.id)}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(quotation.id)}
                />
                <div className="checkmark"></div>
            </div>
            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs1">
                {quotation.created_at ? formatDate(quotation.created_at) : ""}</div>

            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs2">
                {quotation.bill_no || "NA"}
            </div>
            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs3">
                {quotation.vendor_name || "NA"}
            </div>
            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs4">
                {quotation.reference_no || "NA"}
            </div>
            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs5">
                {formatDate(quotation.expiry_date) || "NA"}
            </div>
            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs5">
                {quotation.total || "NA"}
            </div>
            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 quotiosalinvlisxs5">
                {quotation.total || "NA"}
            </div>

            {value === "bills" ?
                <div
                    onClick={() => handleRowClicked(quotation)}
                    className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                >
                    <p className={quotation?.status === "1" ? "open" : quotation?.status === "0" ? "close" : quotation?.status == "2" ? "overdue" : quotation?.status === "3" ? "pending" : "declined"}>

                        {quotation?.status === "1" ? "Open" : quotation?.status === "2" ? "Overdue" : quotation?.status == "3" ? "Pending" : quotation?.status == "0" ? "Close" : "NA"
                        }
                    </p>
                </div>
                :
                <div
                    onClick={() => handleRowClicked(quotation)}
                    className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
                >
                    <p className={quotation?.status === "1" ? "approved" : quotation?.status === "2" ? "declined" : quotation?.status == "3" ? "sent" : quotation?.status === "0" ? "draft" : "declined"}>

                        {quotation?.status === "1" ? "Approved" : quotation?.status === "2" ? "Declined" : quotation?.status == "3" ? "Sent" : quotation?.status == "0" ? "Draft" : "NA"
                        }
                    </p>
                </div>

            }


        </div>
    )
}