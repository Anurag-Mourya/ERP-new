import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuotation } from '../../../Redux/Actions/quotationActions';
import { customersList } from '../../../Redux/Actions/customerActions';
import CustomDropdown11 from '../../../Components/CustomDropdown/CustomDropdown11';
import { accountLists, itemLists, vendorsLists } from '../../../Redux/Actions/listApisActions';
import DatePicker from "react-datepicker";

import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { GoPlus } from 'react-icons/go';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12';
import { fetchCurrencies } from '../../../Redux/Actions/globalActions';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../../../Configs/Firebase/firebaseConfig';
import { OverflowHideBOdy } from '../../../Utils/OverflowHideBOdy';
import { BsEye } from 'react-icons/bs';
import CustomDropdown05 from '../../../Components/CustomDropdown/CustomDropdown05';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import { createJournals } from '../../../Redux/Actions/accountsActions';
import toast, { Toaster } from 'react-hot-toast';
const CreateNewJournal = () => {
    const dispatch = useDispatch();
    const cusList = useSelector((state) => state?.customerList);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    const accountList = useSelector((state) => state?.accountList);
    const createJon = useSelector((state) => state?.createJournal);

    const [formData, setFormData] = useState({
        journal_no: "1",
        fy: 2024,
        transaction_date: "2024-04-12", //date
        reference: null,
        notes: null,
        journal_type: 0,
        currency: "INR",
        sub_total_credit: null,
        sub_total_debit: null,
        total_debit: null,
        total_credit: null,
        differenc: 0,
        custome_note: null,
        upload_image: null,
        status: null,
        journal_entries: [
            {

                account_id: null,
                description: null,
                customer_id: null,
                debit: null,
                credit: null
            }
        ],
    });
    const [loading, setLoading] = useState(false);

    const handleItemAdd = () => {
        const newItems = [...formData.journal_entries, {
            account_id: null,
            description: null,
            customer_id: null,
            debit: null,
            credit: null
        }];
        setFormData({ ...formData, journal_entries: newItems });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        setFormData({
            ...formData,
            [name]: newValue,
            total: calculateTotal(formData.subtotal, newValue, formData.adjustment_charge),
        });
    };

    const popupRef = useRef(null);


    const [showPopup, setShowPopup] = useState("");

    const calculateTotalDebitCredit = (items) => {
        let totalDebit = 0;
        let totalCredit = 0;

        items.forEach(item => {
            totalDebit += parseFloat(item.debit) || 0;
            totalCredit += parseFloat(item.credit) || 0;
        });

        return { totalDebit, totalCredit };
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.journal_entries];
        newItems[index][field] = value;

        const total = calculateTotal(newItems);
        const { totalDebit, totalCredit } = calculateTotalDebitCredit(newItems);

        setFormData({
            ...formData,
            journal_entries: newItems,
            subtotal: total.toFixed(2),
            total: total.toFixed(2),
            total_debit: totalDebit.toFixed(2),
            total_credit: totalCredit.toFixed(2),
            difference: (totalDebit - totalCredit).toFixed(2),
            sub_total_credit: totalCredit.toFixed(2),
            sub_total_debit: totalDebit.toFixed(2),
        });
    };

    const calculateTotal = (items) => {
        if (!Array.isArray(items)) {
            return 0;
        }

        return items.reduce((acc, item) => acc + (parseFloat(item.debit) || 0) + (parseFloat(item.credit) || 0), 0);
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            dispatch(createJournals(formData));
            setLoading(false);
        } catch (error) {
            toast.error('Error updating quotation:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        dispatch(customersList({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(accountLists());
        dispatch(fetchCurrencies());
    }, [dispatch]);


    const handleItemRemove = (index) => {
        const newItems = formData.journal_entries.filter((item, i) => i !== index);
        setFormData({ ...formData, journal_entries: newItems });
    };


    // dropdown of discount
    const [showDropdown, setShowDropdown] = useState(false);
    // const [showDropdownx1, setShowDropdownx1] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
            // setShowDropdownx1(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // image upload from firebase
    const showimagepopup = (val) => {
        OverflowHideBOdy(true); // Set overflow hidden
        setShowPopup(val); // Show the popup
    };
    const [imgLoader, setImgeLoader] = useState("");

    const [freezLoadingImg, setFreezLoadingImg] = useState(false);


    const handleImageChange = (e) => {
        setFreezLoadingImg(true);
        setImgeLoader(true)
        const imageRef = ref(imageDB, `ImageFiles/${v4()}`);
        uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                setImgeLoader("success");
                setFreezLoadingImg(false);
                getDownloadURL(imageRef)?.then((url) => {
                    setFormData({
                        ...formData,
                        upload_image: url
                    })
                });
            })
            .catch((error) => {
                setFreezLoadingImg(false);
                setImgeLoader("fail");
            });
    };


    useEffect(() => {
        OverflowHideBOdy(showPopup);
        // Clean up the effect by removing the event listener on unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showPopup]);



    return (
        <>
            <TopLoadbar />
            {loading && <MainScreenFreezeLoader />}
            {freezLoadingImg && <MainScreenFreezeLoader />}
            {createJon?.loading && <MainScreenFreezeLoader />}

            <div className='formsectionsgrheigh'>
                <div id="Anotherbox" className='formsectionx1'>
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {otherIcons.quoation_svg}
                            New Journal
                        </h1>
                    </div>
                    <div id="buttonsdata">
                        <Link to={"/dashboard/quotation"} className="linkx3">
                            <RxCross2 />
                        </Link>
                    </div>
                </div>

                <div id="formofcreateitems" >
                    <DisableEnterSubmitForm onSubmit={handleFormSubmit}>
                        <div className="relateivdiv">
                            {/* <div className=""> */}
                            <div className="itemsformwrap">
                                <div className="f1wrapofcreq">
                                    <div className="f1wrapofcreqx1">
                                        <div className="form_commonblock">
                                            <label>Date</label>
                                            <span>
                                                {otherIcons.date_svg}
                                                <DatePicker
                                                    selected={formData.transaction_date}
                                                    onChange={(date) => setFormData({ ...formData, transaction_date: date })}
                                                    name='transaction_date'
                                                    required
                                                    placeholderText="Select date"
                                                />
                                            </span>
                                        </div>


                                        <div className="form_commonblock">
                                            <label >Journal<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.tag_svg}
                                                <input type="text" value={formData.journal_no} required
                                                    placeholder='Select quotation date'
                                                    onChange={handleChange}
                                                    name='journal_no'
                                                />

                                            </span>
                                        </div>


                                        <div className="form_commonblock">
                                            <label >Journal Type<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input
                                                    type="text" required
                                                    value={formData.journal_type}
                                                    onChange={handleChange}
                                                    name='journal_type'

                                                    placeholder='Enter Journal type'
                                                />
                                            </span>
                                        </div>
                                        <div className="form_commonblock">
                                            <label>Currency</label>
                                            <span >
                                                {otherIcons.currency_icon}

                                                <CustomDropdown12
                                                    label="Item Name"
                                                    options={getCurrency?.currency}
                                                    value={formData?.currency}
                                                    onChange={handleChange}
                                                    name="currency"
                                                    defaultOption="Select Currency"
                                                />
                                            </span>
                                        </div>

                                        <div className="form_commonblock ">
                                            <label >reference<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input type="text" value={formData.reference} onChange={handleChange}
                                                    // disabled
                                                    required
                                                    name='reference_no'
                                                    placeholder='Enter Reference no' />
                                            </span>
                                        </div>

                                        <div>

                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}



                                <div className="f1wrpofcreqsx2">
                                    <div className='itemsectionrows'>

                                        <div className="tableheadertopsxs1">
                                            <p className='tablsxs1a1'>ACCOUNT</p>
                                            <p className='tablsxs1a2'>DESCRIPTION</p>
                                            <p className='tablsxs1a3'>CUSTOMER</p>
                                            <p className='tablsxs1a4'>DEBITS</p>
                                            <p className='tablsxs1a5'>CREDITS</p>
                                        </div>


                                        {formData?.journal_entries?.map((item, index) => (
                                            <>
                                                <div key={index} className="tablerowtopsxs1">
                                                    <div className="tablsxs1a1">
                                                        <span >
                                                            <CustomDropdown05
                                                                label="Item Name"
                                                                options={accountList?.data?.accounts || []}
                                                                value={item.account_id}
                                                                onChange={(e) => handleItemChange(index, 'account_id', e.target.value, e.target.option)}
                                                                name="account_id"
                                                                defaultOption="Select Item"

                                                            />
                                                        </span>
                                                    </div>

                                                    <div className="tablsxs1a2">
                                                        <textarea
                                                            type="text"
                                                            value={item.description}
                                                            placeholder='Enter description'
                                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                        />
                                                    </div>


                                                    <div className="tablsxs1a3">
                                                        <span >
                                                            <CustomDropdown10
                                                                label="Item Name"
                                                                options={cusList?.data?.user || []}
                                                                value={item.customer_id}
                                                                onChange={(e) => handleItemChange(index, 'customer_id', e.target.value, e.target.option)}
                                                                name="customer_id"
                                                                defaultOption="Select customer"

                                                            />
                                                        </span>
                                                    </div>


                                                    <div className="tablsxs1a3">
                                                        <input
                                                            type="number"
                                                            value={parseInt(item.debit)}
                                                            onChange={(e) => handleItemChange(index, 'debit', e.target.value)}
                                                            placeholder="0.00"

                                                        />
                                                    </div>

                                                    <div className="tablsxs1a3">
                                                        <input
                                                            type="number"
                                                            value={item.credit}
                                                            placeholder="0.00"
                                                            onChange={(e) => handleItemChange(index, 'credit', e.target.value)}
                                                        />
                                                    </div>

                                                    <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}><RxCross2 /></button>
                                                </div>
                                            </>


                                        ))}
                                    </div>


                                    <button id='additembtn45srow' type="button" onClick={handleItemAdd}>Add New Row<GoPlus /></button>


                                    <div className="height5"></div>
                                    <div className='secondtotalsections485s'>
                                        <div className='textareaofcreatqsiform'>
                                            <label>Customer Note</label>
                                            <textarea
                                                placeholder='Will be displayed on the estimate'
                                                value={formData.custome_note}
                                                onChange={handleChange}
                                                name='custome_note'
                                            />
                                        </div>

                                        <div className="calctotalsection">
                                            <div className="calcuparentc">
                                                <div className='clcsecx12s1'>
                                                    <label>Subtotal:</label>
                                                    <input
                                                        type="text"
                                                        value={formData.subtotal}
                                                        readOnly
                                                        placeholder='0.00'
                                                        className='inputsfocalci465s'
                                                    />
                                                </div>

                                            </div>

                                            <div className='clcsecx12s2'>
                                                <label>Total (₹):</label>
                                                <input
                                                    type="text"
                                                    value={formData.total}
                                                    readOnly
                                                    placeholder='0.00'
                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="breakerci"></div>
                                    <div className="height5"></div>

                                    <div className='secondtotalsections485s'>
                                        <div className='textareaofcreatqsiform'>
                                            <label>Terms</label>
                                            <textarea
                                                placeholder='Enter the terms and conditions of your business to be displayed in your transaction '
                                                value={formData.terms}
                                                onChange={handleChange}
                                                name='terms'
                                            />
                                        </div>

                                        <div id="imgurlanddesc" className='calctotalsectionx2'>
                                            <div className="form-group">
                                                <label>Upload Image</label>
                                                <div className="file-upload">
                                                    <input
                                                        type="file"
                                                        name="upload_image"
                                                        id="file"
                                                        className="inputfile"
                                                        onChange={handleImageChange}
                                                    />
                                                    <label htmlFor="file" className="file-label">
                                                        <div id='spc5s6'>
                                                            {otherIcons.export_svg}
                                                            {formData?.upload_image === null || formData?.upload_image == 0 ? 'Browse Files' : ""}
                                                        </div>
                                                    </label>

                                                    {
                                                        imgLoader === "success" && formData?.upload_image !== null && formData?.upload_image !== "0" ?
                                                            <label className='imageviewico656s' htmlFor="" data-tooltip-id="my-tooltip" data-tooltip-content="View Item Image" onClick={() => showimagepopup("IMG")} >
                                                                <BsEye />
                                                            </label> : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>







                            <div className="actionbarcommon">
                                <div className="firstbtnc2" type="submit" disabled={loading}>
                                    {loading ? 'Submiting...' : 'Save as draft'}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                                        <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <button className="firstbtnc1" type="submit" disabled={loading}> {loading ? 'Submiting...' : 'Save and send'}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                                        <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <Link to={"/dashboard/purchase"} className="firstbtnc2">
                                    Cancel
                                </Link>
                            </div>

                            {
                                showPopup === "IMG" ? (
                                    <div className="mainxpopups2" ref={popupRef}>
                                        <div className="popup-content02">
                                            <span className="close-button02" onClick={() => setShowPopup("")}><RxCross2 /></span>
                                            {<img src={formData?.upload_image} name="upload_image" alt="" height={500} width={500} />}
                                        </div>
                                    </div>
                                ) : ""
                            }

                        </div>
                    </DisableEnterSubmitForm>
                </div >
                <Toaster />
            </div >
        </>
    );
};

export default CreateNewJournal;
