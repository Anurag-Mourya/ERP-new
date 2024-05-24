import React from 'react'
import { formatDate2 } from '../../Helper/DateFormat'

const ListComponent = ({ quotation, selectedRows, handleCheckboxChange, handleRowClicked }) => {
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
                {quotation.quotation_id || ""}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs3"
            >
                {quotation.customer_name || ""}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs4"
            >
                {quotation.reference_no || ""}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs5"
            >
                {quotation.total || ""}
            </div>
            <div
                onClick={() => handleRowClicked(quotation)}
                className="table-cellx12 quotiosalinvlisxs6 sdjklfsd565"
            >
                <p className={quotation?.status === "1" ? "approved" : quotation?.status === "2" ? "declined" : quotation?.status == "3" ? "sent" : quotation?.status === "0" ? "draft" : ""} >

                    {quotation?.status === "1" ? "Approved" : quotation?.status === "2" ? "Rejected" : quotation?.status == "3" ? "Sent" : quotation?.status == "0" ? "Draft" : quotation?.status == "4" ? "Expired" : ""
                    }
                </p>
            </div>
        </div>
    )
}

export default ListComponent