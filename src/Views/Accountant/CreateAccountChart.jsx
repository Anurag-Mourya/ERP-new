import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import '../Expences/Expense.scss';
import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown';
import CustomeDropdown2 from '../../Components/CustomDropdown/CustomeDropdown2';
import { CiCirclePlus } from "react-icons/ci";


const CreateAccountChart = () => {
    const [loader, setLoader] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [openFields, setOpenFields] = useState("");

    const dropDownContent = ["Cash", "Bank", "Credit Card", "Income", "Expense", "Fixed Asset"];



    const [accountData, setaccountData] = useState({
        account_type: "",
        account_name: "",
        account_code: "",
        description: "",
    });

    // console.log("account data", accountData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setaccountData({ ...accountData, [name]: value });
    };

    const onclose = () => {
        setIsOpen(false)
    }

    const onSelect = (val) => {
        switch (val) {
            case "Bank":
                setaccountData({
                    ...accountData,
                    account_no: "",
                    ifsc: "",
                    currency: "",
                });
                setOpenFields(val);
                break;

            case "Credit Card":
                setaccountData({
                    account_type: val,
                    ifsc: "",
                    currency: "",
                    credit_card_name: "",
                });
                setOpenFields(val);
                break;

            case "Income":
                setaccountData({
                    ...accountData,
                    ifsc: "",
                });
                setOpenFields(val);
                break;
            case "Expense":
                setaccountData({
                    ...accountData,
                    ifsc: "",
                });
                setOpenFields(val);
                break;

            case "Fixed Asset":
                setaccountData({
                    ...accountData,
                    parent_account: "",
                });

                setOpenFields(val);
                break;
            default:
                setOpenFields("");
                break;
        }
        if (val) {
            setaccountData({
                ...accountData,
                id: 0,
                account_type: val,
            })
        }
    }


    console.log("account type", accountData)

    const handleSubmit = async () => {
        try {
            setLoader(true);
            console.log("accountData", accountData)
            const response = await axiosInstance.post(`/accounts/create/update`, accountData);
            console.log("ressssssss", response.data)
            if (response?.data?.message ===
                "Account Added Successfully") {
                toast.success(response?.data?.message)
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
        <div id="leftsidearea">

            <div className="sidebar-container">

                <div className="main-content">
                    <div id="main_create_cus1">
                        <div className="main_create_cus2">
                            <div className="main_create_cus2_head">
                                <h2>Create Account</h2>
                            </div>
                            <div className="main_create_cus2_form">
                                <div>
                                    <div className="main_create_cus2_form_group">
                                        <div className="main_create_cus2_primary_inputs">
                                            <div className="dropdown show ac-dropdown">
                                                <label htmlFor="">Account Type:</label>
                                                <div
                                                    className="auto-select ac-selected"
                                                    id='for_dropdown_position'>
                                                    <input
                                                        autoComplete="off"
                                                        spellCheck="false"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        className="form-control ac-search-txt"
                                                        type="text"
                                                        name="account_type"
                                                        value={accountData.account_type}
                                                        onChange={handleChange}
                                                        style={{ width: "300px" }}
                                                        readOnly
                                                        onClick={() => setIsOpen((prevOpen) => !prevOpen)}

                                                    />

                                                    {isOpen && <CustomeDropdown2 dropDownContent={dropDownContent} isOpen={isOpen} onSelect={onSelect} onclose={onclose} />}
                                                </div>

                                            </div>


                                            {openFields === "" &&
                                                <div className="dropdown show ac-dropdown">
                                                    <label htmlFor="">Account Name:</label>
                                                    <div className="auto-select ac-selected" tabIndex="-1">
                                                        <input
                                                            autoComplete="off"
                                                            spellCheck="false"
                                                            autoCorrect="off"
                                                            autoCapitalize="off"
                                                            className="form-control ac-search-txt"
                                                            type="text"
                                                            name="account_name"
                                                            value={accountData.account_name}
                                                            onChange={handleChange}
                                                            style={{ width: "300px" }}

                                                        />
                                                    </div>
                                                </div>
                                            }

                                            <div className="dropdown show ac-dropdown">
                                                <label htmlFor="">Account Code:</label>
                                                <div className="auto-select ac-selected" tabIndex="-1">
                                                    <input
                                                        autoComplete="off"
                                                        spellCheck="false"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        className="form-control ac-search-txt"
                                                        type="text"
                                                        name="account_code"
                                                        value={accountData.account_code}
                                                        onChange={handleChange}
                                                        style={{ width: "300px" }}

                                                    />
                                                </div>
                                            </div>

                                            {openFields === "Bank" &&
                                                <>
                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Account Name:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="account_name"
                                                                value={accountData.account_name}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Account Number:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="account_no"
                                                                value={accountData.account_no}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">IFSC Code:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="ifsc"
                                                                value={accountData.ifsc}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor=""> Currency:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="currency"
                                                                value={accountData.currency}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            }



                                            {openFields === "Credit Card" &&
                                                <>

                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Credit Card Name:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="credit_card_name"
                                                                value={accountData.credit_card_name}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Currency:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="currency"
                                                                value={accountData.currency}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>

                                                </>
                                            }
                                            {openFields === "Income" || openFields === "Expense" ?
                                                <>
                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Account Name:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="account_name"
                                                                value={accountData.account_name}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>


                                                </> : ""
                                            }
                                            {openFields === "Fixed Asset" ?
                                                <>


                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Account Name:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="account_name"
                                                                value={accountData.account_name}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="dropdown show ac-dropdown">
                                                        <label htmlFor="">Parent Account:</label>
                                                        <div className="auto-select ac-selected" tabIndex="-1">
                                                            <input
                                                                autoComplete="off"
                                                                spellCheck="false"
                                                                autoCorrect="off"
                                                                autoCapitalize="off"
                                                                className="form-control ac-search-txt"
                                                                type="text"
                                                                name="parent_account"
                                                                value={accountData.parent_account}
                                                                onChange={handleChange}
                                                                style={{ width: "300px" }}

                                                            />
                                                        </div>
                                                    </div>

                                                </> : ""
                                            }

                                            <div className="dropdown show ac-dropdown">
                                                <label htmlFor="">Description:</label>
                                                <div
                                                    className="auto-select ac-selected"
                                                    id='for_dropdown_position'>
                                                    <input
                                                        autoComplete="off"
                                                        spellCheck="false"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        className="form-control ac-search-txt"
                                                        type="text"
                                                        name="description"
                                                        value={accountData.description}
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
    );
};

export default CreateAccountChart;
