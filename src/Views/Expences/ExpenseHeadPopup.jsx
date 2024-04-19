// Popup.js
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';

const ExpenseHeadPopup = ({ isOpen, setIsOpen1 }) => {
    const [loader, setLoader] = useState(false);


    const [expenseHeadData, setHeadExpenseData] = useState({
        expense_type: "",
        expense_name: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeadExpenseData({ ...expenseHeadData, [name]: value });
    };


    const handleSubmit = async () => {
        try {
            setLoader(true);

            console.log("formDataWithoutName", expenseHeadData)
            const response = await axiosInstance.post(`/expensehead/create/update`, expenseHeadData);
            console.log("ressssssss", response.data)
            if (response?.data?.message === 'Expense Head Saved Successfully') {
                toast.success(response?.data?.message);
            }
            if (response?.data?.success === false) {
                toast.error(response?.data?.message)
                setLoader(false);
            }

            setLoader(false);
        } catch (error) {
            console.error("Error adding expense:", error);
            setLoader(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-button" onClick={() => setIsOpen1(false)}>
                            Close
                        </button>
                        <div id="leftsidearea">

                            <div className="sidebar-container">

                                <div className="main-content">
                                    <div id="main_create_cus1">
                                        <div className="main_create_cus2">
                                            <div className="main_create_cus2_head">
                                                <h2>New Head Expenses</h2>
                                            </div>
                                            <div className="main_create_cus2_form">
                                                <div>
                                                    <div className="main_create_cus2_form_group">
                                                        <div className="main_create_cus2_primary_inputs">
                                                            <div className="dropdown show ac-dropdown">



                                                            </div>
                                                            <div className="dropdown show ac-dropdown">
                                                                <label htmlFor="">Expense Type:</label>
                                                                <div className="auto-select ac-selected" tabIndex="-1">
                                                                    <input
                                                                        autoComplete="off"
                                                                        spellCheck="false"
                                                                        autoCorrect="off"
                                                                        autoCapitalize="off"
                                                                        className="form-control ac-search-txt"
                                                                        type="number"
                                                                        name="expense_type"
                                                                        value={expenseHeadData.expense_type}
                                                                        onChange={handleChange}
                                                                        style={{ width: "300px" }}

                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="dropdown show ac-dropdown">
                                                                <label htmlFor="">Expense Name:</label>
                                                                <div className="auto-select ac-selected" tabIndex="-1">
                                                                    <input
                                                                        autoComplete="off"
                                                                        spellCheck="false"
                                                                        autoCorrect="off"
                                                                        autoCapitalize="off"
                                                                        className="form-control ac-search-txt"
                                                                        type="text"
                                                                        name="expense_name"
                                                                        value={expenseHeadData.expense_name}
                                                                        onChange={handleChange}
                                                                        style={{ width: "300px" }}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="show_all_and_add_btn">
                                                        <div className="button_add_customer">
                                                            <button onClick={handleSubmit} type="submit">
                                                                {loader ? "Adding..." : "Add"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Toaster />
                        </div >
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpenseHeadPopup;
