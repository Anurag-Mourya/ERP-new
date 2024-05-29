import React, { useState, useEffect } from 'react';
import './AddJournalListData.scss';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../../Configs/axiosInstance';
import Calendar from '../../../Components/Calendar/Calendar';
import { useParams } from 'react-router-dom';


const UpdateJournal = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState([]);
    const [account, setAccount] = useState([]);
    const [journalDetail, setJonuralDetail] = useState([]);

    const [journalData, setJournalData] = useState({
        journal_no: "Journal 01",
        transaction_date: "12-04-2024",
        fy: localStorage.getItem('FinancialYear'),
        notes: "",
        journal_type: "Cash based Journal",
        currency: "",
        sub_total_credit: 1000,
        sub_total_debit: 1000,
        total_debit: 1000,
        total_credit: 1000,
        difference: 0,
    });

    useEffect(() => {
        setJournalData({
            journal_no: journalDetail.journal_no,
            notes: journalDetail.notes,
            transaction_date: journalDetail.transaction_date,
            fy: journalDetail.fy,
            journal_type: journalDetail.journal_type,
            currency: journalDetail.currency,
            sub_total_credit: journalDetail.sub_total_credit,
            sub_total_debit: journalDetail.sub_total_debit,
            total_debit: journalDetail.total_debit,
        })
    }, [journalDetail.journal_no, journalDetail.notes, journalDetail.transaction_date, journalDetail.fy, journalDetail.journal_type, journalDetail.currency, journalDetail.sub_total_credit, journalDetail.sub_total_debit, journalDetail.total_debit,])

    const getdata = async () => {
        try {
            const mainData = await axiosInstance.post('/customer/list');
            setAllData(mainData?.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJournalData({ ...journalData, [name]: value });
    };


    const getAllProducts = async () => {
        try {
            const customer = await axiosInstance.post(`/customers/list?is_customer=1`);
            const account = await axiosInstance.post(`/accounts/list`);
            const journalDetails = await axiosInstance.post(`/journal/details`, { journal_id: id });
            setCustomer(customer?.data?.user);
            setAccount(account.data?.accounts);
            setJonuralDetail(journalDetails?.data?.data);
        } catch (e) {
            console.log("error fetching products", e);
        }
    };
    useEffect(() => {
        getAllProducts();
    }, []);

    return (

        <div className="main-content">
            <div id="main_create_cus1">
                <div className="main_create_cus2_appoin">
                    <div className="main_create_cus2_head">
                        <h2>New Journal</h2>
                    </div>
                    <div className="main_create_cus2_form">
                        <div >
                            <div className="main_create_cus2_form_group">
                                <div className="main_create_cus2_primary_inputs">
                                    <div className="dropdown show ac-dropdown">
                                        <label htmlFor="">Journal Type:</label>
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
                                                name="journal_type"
                                                value={journalData.journal_type}
                                                onChange={handleChange}
                                                style={{ width: "200px" }}
                                            />

                                        </div>

                                    </div>
                                    <div className="dropdown show ac-dropdown">
                                        <label htmlFor="">Journal Number:</label>
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
                                                name="journal_no"
                                                value={journalData.journal_no}
                                                onChange={handleChange}
                                                style={{ width: "200px" }}
                                            />

                                        </div>

                                    </div>



                                    <div className="dropdown show ac-dropdown">
                                        <label htmlFor="">Transaction Date:</label>
                                        <div
                                            className="auto-select ac-selected"
                                            tabIndex="-1"
                                        >
                                            {/* <Calendar selectedDate={journalData.transaction_date} onDateChange={(date) => setJournalData({ ...journalData, transaction_date: date })} /> */}
                                            <input type="date" name="transaction_date" value={journalData.transaction_date} id="" onChange={handleChange} />

                                        </div>
                                    </div>



                                </div>



                                <div className="main_create_cus2_primary_inputs" style={{
                                    borderBottom: "2px solid green", padding: "0px 51px 17px 3px",
                                    width: "98%"
                                }}>
                                    <div className="dropdown show ac-dropdown">
                                        <label htmlFor="">Reference:</label>
                                        <div
                                            className="auto-select ac-selected"
                                            tabIndex="-1"
                                        >
                                            <input
                                                autoComplete="off"
                                                spellCheck="false"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                className="form-control ac-search-txt"
                                                type="text"
                                                name="reference"
                                                value={journalData.reference}
                                                onChange={handleChange}
                                                style={{ width: "200px" }}
                                            />

                                        </div>
                                    </div>
                                    <div className="dropdown show ac-dropdown">
                                        <label htmlFor="">Notes:</label>
                                        <div
                                            className="auto-select ac-selected"
                                            tabIndex="-1"

                                        >
                                            <input
                                                autoComplete="off"
                                                spellCheck="false"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                className="form-control ac-search-txt"
                                                type="text"
                                                name="notes"
                                                value={journalData.notes}
                                                onChange={handleChange}
                                                style={{ width: "200px", resize: "none" }}
                                                id='for_dropdown_position'
                                            />
                                        </div>

                                    </div>
                                    <div className="dropdown show ac-dropdown">
                                        <label htmlFor="">Currency:</label>
                                        <div
                                            className="auto-select ac-selected"
                                            tabIndex="-1"

                                        >
                                            <input
                                                autoComplete="off"
                                                spellCheck="false"
                                                autoCorrect="off"
                                                autoCapitalize="off"
                                                className="form-control ac-search-txt"
                                                type="text"
                                                name="currency"
                                                value={journalData.currency}
                                                onChange={handleChange}
                                                style={{ width: "200px", resize: "none" }}
                                                id='for_dropdown_position'
                                            />
                                        </div>

                                    </div>

                                </div>
                                <CreateJournal accountList={account} customers={customer} journalData={journalData} setJournalData={setJournalData} journalDetail={journalDetail?.journal_entry} id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default UpdateJournal;




const CreateJournal = ({ customers, journalDetail, id, journalData, accountList, setJournalData }) => {
    const [loader, setLoader] = useState(false);
    const [getAllRowsData, setGetAllRowsData] = useState([]);

    const [rows, setRows] = useState([
        {
            account_name: '',
            customer_name: '',
            account_id: '',
            customer_id: '',
            description: '',
            debit: '',
            credit: '',
        },
    ]);
    useEffect(() => {
        setRows((prevRows) =>
            journalDetail?.map((row) => {
                const existingRow = prevRows?.find((r) => r?.id === row?.id);
                if (existingRow) {
                    // Update the existing row with new values
                    return {
                        ...existingRow,
                        account_name: row.account_name,
                        customer_id: row.customer_id,
                        account_id: row.account_id,
                        // account_name: row.customer_name,
                        description: row.description,
                        debit: row.debit,
                        credit: row.credit,
                    };
                } else {
                    // Add a new row if it doesn't exist
                    return {
                        id: row.id, // Ensure you have an ID for each row
                        account_name: row.account_name,
                        customer_id: row.customer_id,
                        account_id: row.account_id,
                        description: row.description,
                        debit: row.debit,
                        credit: row.credit,
                    };
                }
            })
        );
    }, [journalDetail]);


    const [idCounter, setIdCounter] = useState(1);

    // console.log("row", rows)



    useEffect(() => {
        saveData(); // Save data whenever rows change
    }, [rows]);

    const addNewRow = () => {
        setRows([
            ...rows,
            {
                id: idCounter + 1,
                account_name: '',
                customer_name: '',
                account_id: '',
                customer_id: '',
                description: '',
                debit: '',
                credit: '',
            },
        ]);
        setIdCounter(idCounter + 1);
    };

    const handleTypeChange = (id, value, field, fieldId) => {
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        [field]: value,
                        account_id: field === 'account_name' ? fieldId : row.account_id,
                        customer_id: field === 'customer_name' ? fieldId : row.customer_id,
                    }
                    : row
            )
        );
    };

    const saveData = () => {
        const journalItems = rows?.map((row) => {

            const data = {
                account_name: row.account_name,
                customer_name: row.customer_name,
                account_id: row.account_id,
                customer_id: row.customer_id,
                description: row.description,
                debit: row.debit,
                credit: row.credit,
            };

            return data;
        });
        setGetAllRowsData(journalItems);
    };


    const handleSubmit = async () => {
        try {
            setLoader(true);
            const modifiedData = Object.values(getAllRowsData).map(({ account_name, customer_name, ...rest }) => rest);

            // const { account_name, customer_name, ...restData } = getAllRowsData;
            const postData = {
                ...journalData,
                id: id,
                journal_entries: modifiedData
            }
            console.log("post manin data", postData)

            const getData = await axiosInstance.post(`/journal/create/update`, postData);
            console.log("getData", getData)
            if (getData?.data?.message === "Journal Created Successfully") {
                toast.success(getData?.data?.message);
                setLoader(false);
            }
            if (getData?.data?.success === false) {
                toast.error(getData?.data?.message);
                setLoader(false);
            }
            setLoader(false);
        } catch (e) {
            console.log("error", e);
            toast.error("Something went wrong");
            setLoader(false);
        }
    };


    const calculateSubTotalDebit = () => {
        const subTotalDebit = rows?.reduce((debit, row) => debit + (+(row?.debit)), 0);
        return subTotalDebit;
    };

    const calculateSubTotalCredit = () => {
        const subTotalDebit = rows?.reduce((credit, row) => credit + (+(row?.credit)), 0);
        return subTotalDebit?.toFixed(2);
    };

    const calculateDifference = () => {
        if (calculateSubTotalCredit() > calculateSubTotalDebit()) {
            return (calculateSubTotalCredit() - (calculateSubTotalDebit()))?.toFixed(2);
        } else {
            return ((calculateSubTotalDebit() - calculateSubTotalCredit()))?.toFixed(2);
        }
    };
    // console.log("calculateDifference", calculateDifference())
    const calculateGrandTotal = () => {
        const subTotalDebit = parseFloat(calculateSubTotalDebit());
        const subTotalCredit = parseFloat(calculateSubTotalCredit());

        const grandTotal = (+subTotalDebit) + (+subTotalCredit);
        return grandTotal;
    };

    useEffect(() => {
        setJournalData({
            ...journalData,
            sub_total_credit: calculateSubTotalCredit(),
            sub_total_debit: calculateSubTotalDebit(),
            total_debit: calculateSubTotalDebit(),
            total_credit: calculateSubTotalCredit(),
            difference: calculateDifference(),
        })
    }, [rows]);

    return (
        <div>
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th className="border-bottom">ACCOUNT</th>
                            <th>CUSTOMER</th>
                            <th>DESCRIPTION</th>
                            <th>DEBITS</th>
                            <th>CREDITS</th>


                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((row) => (
                            <tr key={row.id}>
                                <td className='border-bottom style_width'>
                                    <select className="custom-select"
                                        value={row.account_name}
                                        onChange={(e) => handleTypeChange(row.id, e.target.value, 'account_name', e.target.selectedOptions[0].getAttribute('data-account-id'))}
                                    >
                                        {accountList?.map((account) => (
                                            <option key={account?.id} value={account?.account_name} data-account-id={account?.id}>
                                                {account?.account_name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className='border-bottom style_width'>
                                    <select className="custom-select"
                                        value={row.customer_name}
                                        onChange={(e) => handleTypeChange(row.id, e.target.value, 'customer_name', e.target.selectedOptions[0].getAttribute('data-customer-id'))}
                                    >
                                        {customers?.map((customer) => (
                                            <option key={customer?.id} value={`${customer?.first_name} ${customer?.last_name}`} data-customer-id={customer?.id}>
                                                {`${customer?.first_name} ${customer?.last_name}`}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className='border-bottom style_width'>

                                    <textarea name="description" cols="10" rows="2" value={row.description} onChange={(e) => handleTypeChange(row.id, e.target.value, 'description')}></textarea>
                                </td>

                                <td className='border-bottom style_width'>

                                    <input type='number' className="custom-select"
                                        name="debit" value={row.debit} onChange={(e) => handleTypeChange(row.id, e.target.value, 'debit')} />
                                </td>

                                <td className='border-bottom style_width'>
                                    <input type='number' className="custom-select" name="credit" value={row.credit} onChange={(e) => handleTypeChange(row.id, e.target.value, 'credit')} />
                                </td>
                            </tr>
                        ))}
                        <tr>

                            <td>
                                <div className="custom-button" onClick={addNewRow}>Add new row</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="show_all_and_add_btn">
                    <div className="button_add_customer">
                        <button onClick={handleSubmit} type="submit">{loader ? "Updating..." : "Update"}</button>
                    </div>

                </div>
            </div>

            <div id="lastformofallcalculations">
                <div className="ckls548w5">
                    <div className="formgroups5x5s">
                        <label>Subtotal Debit:</label>
                        <p>{calculateSubTotalDebit()}/-</p>
                    </div >
                </div>
                <div className="ckls548w6">
                    <div className="formgroups5x5s">
                        <label>Subtotal Credit:</label>
                        <p>{calculateSubTotalCredit()}/-</p>
                    </div>
                    <div className="formgroups5x5s">
                        <label>Total Debit:</label>
                        <p>{calculateSubTotalDebit()}/-</p>
                    </div>
                    <div className="formgroups5x5s">
                        <label>Total Credit:</label>
                        <p>{calculateSubTotalCredit()}/-</p>
                    </div>
                    <div className="formgroups5x5s">
                        <label>Difference:</label>
                        <p>{calculateDifference()}/-</p>

                    </div>
                </div>
                <div className="ckls548w7">
                    <div className="formgroups5x5s">
                        <label>Total:</label>
                        <p>{calculateGrandTotal()}.00/-</p>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

