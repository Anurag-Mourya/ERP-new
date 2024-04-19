import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import './Expense.scss';
import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown';
import CustomeDropdown2 from '../../Components/CustomDropdown/CustomeDropdown2';
import { CiCirclePlus } from "react-icons/ci";
import ExpenseHeadPopup from './ExpenseHeadPopup';
import { FcExpired } from 'react-icons/fc';
import Calendar from '../../Components/Calendar/Calendar';


const CreateExpence = () => {
    const [loader, setLoader] = useState(false);
    const [expenseHeadList, setExpenseHeadList] = useState([]);
    const [isOpen1, setIsOpen1] = useState(false);


    const [isOpen, setIsOpen] = useState(false);

    const dropDownContent = expenseHeadList?.map(val => val)

    const [expenseData, setExpenseData] = useState({
        expense_head_name: "",
        expense_head_id: "",
        description: "",
        amount: "",
        paid_by: "2",
        transaction_date: new Date().toISOString().split('T')[0],
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({ ...expenseData, [name]: value });
    };

    const onclose = () => {
        setIsOpen(false)
    }

    const onSelect = (val) => {
        setExpenseData({
            ...expenseData,
            expense_head_name: val.expense_name,
            expense_head_id: val.id

        })
    }


    const fetchExpensesHead = async () => {
        try {
            const res = await axiosInstance.post(`/expensehead/list`);
            setExpenseHeadList(res?.data?.data)
        } catch (e) {
            console.log("error", e)
        }

    }
    useEffect(() => {
        fetchExpensesHead();
    }, []);


    const handleSubmit = async () => {
        try {
            setLoader(true);
            const { expense_head_name, ...formDataWithoutName } = expenseData;
            console.log("formDataWithoutName", formDataWithoutName)
            const response = await axiosInstance.post(`/expense/create/update`, formDataWithoutName);
            // console.log("ressssssss", response.data)
            if (response?.data?.Expense === 'Expense Created Successfully') {
                toast.success(response?.data?.Expense)
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
                                <h2>New Expenses</h2>
                            </div>
                            <div className="main_create_cus2_form">
                                <div>
                                    <div className="main_create_cus2_form_group">
                                        <div className="main_create_cus2_primary_inputs">
                                            <div className='dropdown show ac-dropdown group-form'>
                                                <label>Expiry Date:</label>
                                                <span>
                                                    <Calendar selectedDate={expenseData.transaction_date} onDateChange={(date) => setExpenseData({ ...expenseData, transaction_date: date })} />

                                                </span>
                                            </div>
                                            <div className="dropdown show ac-dropdown">
                                                <label htmlFor="">Expense Head :</label>
                                                <div
                                                    className="auto-select ac-selected"
                                                    id='for_dropdown_position'
                                                >
                                                    <input
                                                        autoComplete="off"
                                                        spellCheck="false"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        className="form-control ac-search-txt"
                                                        type="text"
                                                        name="expense_category"
                                                        value={expenseData.expense_head_name}
                                                        onChange={handleChange}
                                                        style={{ width: "300px" }}
                                                        readOnly
                                                        onClick={() => setIsOpen((prevOpen) => !prevOpen)}

                                                    />
                                                    <span onClick={() => setIsOpen1(true)} id='add_expense_head' title="Add expense head"><CiCirclePlus /></span>
                                                    {isOpen && <CustomeDropdown2 dropDownContent={dropDownContent} isOpen={isOpen} onSelect={onSelect} onclose={onclose} />}
                                                </div>

                                                <div><ExpenseHeadPopup isOpen={isOpen1} setIsOpen1={setIsOpen1} /></div>


                                            </div>
                                            <div className="dropdown show ac-dropdown">
                                                <label htmlFor="">Expense Description:</label>
                                                <div className="auto-select ac-selected" tabIndex="-1">
                                                    <input
                                                        autoComplete="off"
                                                        spellCheck="false"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        className="form-control ac-search-txt"
                                                        type="text"
                                                        name="description"
                                                        value={expenseData.description}
                                                        onChange={handleChange}
                                                        style={{ width: "300px" }}

                                                    />
                                                </div>
                                            </div>


                                            <div className="main_create_cus2_primary_inputs_date main_create_cus2_primary_inputs ac-dropdown">
                                                <div className="ac-dropdown">
                                                    <label htmlFor="">Price:</label>
                                                    <input
                                                        type="number"
                                                        name="amount"
                                                        onChange={handleChange}
                                                        value={expenseData.amount}
                                                    // readOnly
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

export default CreateExpence;
