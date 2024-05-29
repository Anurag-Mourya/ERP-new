import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { customersList } from '../../../Redux/Actions/customerActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import { accountLists, itemLists } from '../../../Redux/Actions/listApisActions';
import Loader02 from '../../../Components/Loaders/Loader02'
import DatePicker from "react-datepicker";

import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { GoPlus } from 'react-icons/go';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12';
import { fetchCurrencies, updateAddresses } from '../../../Redux/Actions/globalActions';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../../../Configs/Firebase/firebaseConfig';
import { OverflowHideBOdy } from '../../../Utils/OverflowHideBOdy';
import { BsEye } from 'react-icons/bs';
import { Toaster, toast } from "react-hot-toast";
import CustomDropdown14 from '../../../Components/CustomDropdown/CustomDropdown14';
import { SlReload } from 'react-icons/sl';
import { paymentRecDetail, updatePaymentRec } from '../../../Redux/Actions/PaymentRecAction';
import ViewCustomerDetails from '../Quotations/ViewCustomerDetails';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import { IoCheckbox } from 'react-icons/io5';
import { formatDate } from '../../Helper/DateFormat';
import CustomDropdown15 from '../../../Components/CustomDropdown/CustomDropdown15';
import { getAccountTypes } from '../../../Redux/Actions/accountsActions';
import { pendingInvoices } from '../../../Redux/Actions/invoiceActions';
import CustomDropdown09 from '../../../Components/CustomDropdown/CustomDropdown09';



const depositeTo = [
    {
        labelid: 1,
        label: "Bank Account"
    },
    {
        labelid: 2,
        label: "Credit card account"
    },
]

const CreatePaymentRec = () => {
    const dispatch = useDispatch();
    const loacation = useLocation();
    const cusList = useSelector((state) => state?.customerList);
    const itemList = useSelector((state) => state?.itemList);
    const addUpdate = useSelector((state) => state?.updateAddress);
    const paymentDetails = useSelector((state) => state?.paymentRecDetail);
    const accountList = useSelector((state) => state?.accountList);
    const paymentDetail = paymentDetails?.data?.data?.payment;
    const [cusData, setcusData] = useState(null);
    const [switchCusDatax1, setSwitchCusDatax1] = useState("Details");
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
    const accType = useSelector((state) => state?.getAccType?.data?.account_type);
    const pendingInvoice = useSelector((state) => state?.invoicePending);
    const invoiceData = pendingInvoice?.data?.data;

    console.log("accountList", accountList)


    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, dublicate: isDublicate } = Object.fromEntries(params.entries());


    const [formData, setFormData] = useState({
        id: 0,
        payment_id: "",
        customer_id: null,
        debit: null, // amount received
        bank_charges: null,
        transaction_date: "", // payment date
        // posting_date: "2024-04-18",
        fy: localStorage.getItem('FinancialYear') || 2024,
        payment_mode: 2,
        to_acc: 5, // deposit to
        tax_deducted: 1,
        tax_acc_id: 0,
        reference: "",
        customer_note: null,
        upload_image: null,
        amt_excess: null,
        // this details will be filled when there is one invoice
        transaction_type: 1, // for sale    2-for purchase
        transaction_id: 0,

        // when there are multiple invoices
        entries: [
            {
                invoice_id: null,
                invoice_no: "",
                invoice_amount: null,
                amount: null,
                balance_amount: null,
                date: null
            }
        ]
    });

    useEffect(() => {
        if (itemId && isEdit && paymentDetail || itemId && isDublicate && paymentDetail) {
            const itemsFromApi = paymentDetail.entries?.map(item => ({
                invoice_no: item?.invoice_no,
                invoice_amount: item?.invoice_amount,
                balance_amount: item?.balance_amount,
                amount: item?.amount,
            }));

            setFormData({
                id: isEdit ? itemId : 0,
                payment_id: paymentDetail?.payment_id,
                customer_id: (+paymentDetail?.customer_id),
                debit: paymentDetail?.debit, // amount received
                bank_charges: paymentDetail?.bank_charges,
                transaction_date: paymentDetail?.transaction_date, // payment date
                fy: paymentDetail?.fy,
                payment_mode: (+paymentDetail?.payment_mode?.id),
                to_acc: (+paymentDetail?.to_acc?.id), // deposit to
                tax_deducted: (+paymentDetail?.tax_deducted),
                tax_acc_id: (+paymentDetail?.tax_acc_id),
                reference: paymentDetail?.reference,
                customer_note: paymentDetail?.customer_note,
                upload_image: paymentDetail?.upload_image,

                // this details will be filled when there is one invoice
                transaction_type: paymentDetail?.transaction_type, // for sale    2-for purchase
                transaction_id: paymentDetail?.transaction_id,

                // when there are multiple invoices

                entries: itemsFromApi || []
            });

            if (paymentDetail.upload_image) {
                setImgeLoader("success");
            }




            if (paymentDetail?.address) {
                const parsedAddress = JSON?.parse(paymentDetail?.address);
                const dataWithParsedAddress = {
                    ...paymentDetail,
                    address: parsedAddress
                };

            }

        }
    }, [paymentDetail, itemId, isEdit, isDublicate]);
    // console.log("form data", formData)
    const [invoiceDatas, setInoiceData] = useState("")

    const [isChecked, setIsChecked] = useState({ checkbox1: true, checkbox2: true });
    // Function to handle checkbox clicks
    const handleCheckboxClick = checkboxName => {
        setIsChecked(prevState => ({
            ...prevState,
            [checkboxName]: !prevState[checkboxName],
        }));

        if (isChecked?.checkbox1) {
            setFormData({
                ...formData,
                debit: (+invoiceDatas?.total_amount),
            })
        } else {
            setFormData({
                ...formData,
                debit: "",
            })
        }
    }

    const [loading, setLoading] = useState(false);


    console.log("invoiceData", invoiceDatas)

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'shipping_charge' || name === 'adjustment_charge') {
            newValue = parseFloat(value) || 0; // Convert to float or default to 0
        }

        // Convert empty string to zero
        if (newValue === '') {
            newValue = "";
        }

        if (name === "customer_id") {
            const selectedCustomer = cusList?.data?.user?.find(cus => cus.id == value);
            const sendData = {
                fy: localStorage.getItem('FinancialYear'),
                warehouse_id: localStorage.getItem('selectedWarehouseId'),
                customer_id: selectedCustomer?.id,
            }
            dispatch(pendingInvoices(sendData, setInoiceData))
        }


        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    useEffect(() => {
        if (invoiceDatas) {
            setFormData({
                ...formData,
                entries: invoiceDatas?.invoices.map(invoice => ({
                    invoice_no: invoice?.invoice_id,
                    invoice_amount: +invoice?.total,
                    balance_amount: +invoice?.total - +invoice?.amount_paid,
                    date: formatDate(invoice?.transaction_date)
                }))
            })
        }
    }, [invoiceDatas]);

    const calculateTotalAmount = () => {
        return formData.entries.reduce((total, entry) => {
            return total + (entry.amount ? parseFloat(entry.amount) : 0);
        }, 0);
    };


    useEffect(() => {
        setFormData({
            ...formData,
            amt_excess: (+formData?.debit) - calculateTotalAmount()
        })
    }, [calculateTotalAmount()])


    console.log("fromDAta", formData)
    // console.log("calculateExcessAmount", calculateExcessAmount())
    const popupRef = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const [buttonClicked, setButtonClicked] = useState(null);

    const handleButtonClicked = (status) => {
        setButtonClicked(status);
    };

    const Navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!buttonClicked) {
            toast.error('Please select an action (Save as draft or Save and send).');
            return;
        }
        setLoading(true);
        try {

            dispatch(updatePaymentRec({ ...formData }, Navigate));
            setLoading(false);
        } catch (error) {
            toast.error('Error updating quotation:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            customer_type: cusData?.customer_type,
            customer_name: cusData ? `${cusData.first_name} ${cusData.last_name}` : '',
            email: cusData?.email,
            phone: cusData?.mobile_no,
            // address: cusData?.address.length,

        }));
    }, [cusData]);

    useEffect(() => {
        dispatch(itemLists({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(fetchCurrencies());
        dispatch(paymentRecDetail({ id: itemId }));
        dispatch(getAccountTypes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(customersList({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(accountLists());
    }, [dispatch]);

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            transaction_date: formatDate(date),
        });
    };


    const handleItemRemove = (index) => {
        const newItems = formData?.entries?.filter((item, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };


    // dropdown
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
        setShowDropdown(true);
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);

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
            {paymentDetails?.loading ? <Loader02 /> : <>
                <TopLoadbar />
                {loading && <MainScreenFreezeLoader />}
                {freezLoadingImg && <MainScreenFreezeLoader />}
                {pendingInvoice?.loading && <MainScreenFreezeLoader />}
                {addUpdate?.loading && <MainScreenFreezeLoader />}

                <div className='formsectionsgrheigh'>
                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">
                                {otherIcons.quoation_svg}
                                New Payment
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
                                        <div className="form_commonblock">
                                            <label >Customer name<b className='color_red'>*</b></label>
                                            <div id='sepcifixspanflex'>
                                                <span id=''>
                                                    {otherIcons.name_svg}
                                                    <CustomDropdown10
                                                        label="Customer Name"
                                                        options={cusList?.data?.user}
                                                        value={formData.customer_id}
                                                        onChange={handleChange}
                                                        name="customer_id"
                                                        defaultOption="Select Customer"
                                                        setcusData={setcusData}
                                                    />
                                                </span>
                                            </div>
                                        </div>


                                        <div className="f1wrapofcreqx1">

                                            <div className="form_commonblock">
                                                <label className='color_red clcsecx12s1'>Amount Received <b >*</b></label>
                                                <span >
                                                    {otherIcons.vendor_svg}
                                                    <input
                                                        type="number"
                                                        value={formData.debit}
                                                        name='debit'
                                                        onChange={handleChange}
                                                        placeholder='Enter received amount'

                                                        disabled={!isChecked?.checkbox1}
                                                    />
                                                </span>
                                                {invoiceDatas?.total_amount ?
                                                    <>
                                                        <label htmlFor="" className="xkls5663">Receive full amount (₹{(+invoiceDatas?.total_amount)})

                                                            <IoCheckbox
                                                                className={`checkboxeffecgtparent ${isChecked.checkbox1 ? 'checkboxeffects' : ''}`}
                                                                onClick={() => handleCheckboxClick('checkbox1')}
                                                            />
                                                        </label>
                                                    </> : ""}
                                            </div>


                                            <div className="form_commonblock">
                                                <label className='color_red'>Bank charges (if any)<b >*</b></label>
                                                <span >
                                                    {otherIcons.tag_svg}
                                                    <input type="text" value={formData.bank_charges} required
                                                        placeholder='Enter bank charges'
                                                        onChange={handleChange}
                                                        name='bank_charges'
                                                    />

                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label className='color_red'>Payment date<b >*</b></label>
                                                <span >
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.transaction_date ? new Date(formData.transaction_date).toISOString().split('T')[0] : null}
                                                        onChange={handleDateChange}
                                                        name='transaction_date'
                                                        required
                                                        placeholderText="Select Payment Date"
                                                    />

                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label className='color_red'>Payment No.<b >*</b></label>
                                                <span >
                                                    {otherIcons.tag_svg}
                                                    <input type="text" value={formData.payment_id} required
                                                        placeholder='Enter payment no'
                                                        onChange={handleChange}
                                                        name='payment_id'
                                                    />

                                                </span>
                                            </div>


                                            <div className="form_commonblock">
                                                <label>Payment mode</label>
                                                <span >
                                                    {otherIcons.currency_icon}

                                                    <CustomDropdown15
                                                        label="Payment Mode"
                                                        options={accType}
                                                        value={formData?.payment_mode}
                                                        onChange={handleChange}
                                                        name="payment_mode"
                                                        defaultOption="Select payment mode"
                                                    />
                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label className='color_red'>Deposit to<b >*</b></label>
                                                <span >
                                                    <CustomDropdown09
                                                        label="Account"
                                                        options={accountList?.data?.accounts || []}
                                                        value={formData?.to_acc}
                                                        onChange={handleChange}
                                                        name="to_acc"
                                                        defaultOption="Select Account"
                                                    />
                                                </span>
                                            </div>


                                            <div className="form_commonblock ">
                                                <label className='color_red'>Reference<b >*</b></label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input type="text" value={formData.reference} onChange={handleChange}
                                                        // disabled
                                                        required
                                                        name='reference'
                                                        placeholder='Enter Reference' />
                                                </span>
                                            </div>
                                            {/* <div className="form_commonblock ">
                                                <label >TAX deducted?</label>
                                                <div className="f1wrapofcreqx1">
                                                    <div className="cust_dex1s">
                                                        <div id="radio-toggle">

                                                            <label htmlFor="organization">No</label>
                                                            <input
                                                                type="radio"
                                                                id="no"
                                                                name="tax-deducted"
                                                                value="no"
                                                                checked={selectedOption === 'no'}
                                                                onChange={handleOptionChange}
                                                            />

                                                            <label htmlFor="customer">Yes, TDS</label>
                                                            <input
                                                                type="radio"
                                                                id="yes"
                                                                name="tax-deducted"
                                                                value="yes"
                                                                checked={selectedOption === 'yes'}
                                                                onChange={handleOptionChange}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* {selectedOption === "yes" &&
                                                <div className="form_commonblock">
                                                    <label className='color_red'>TDX tax Account<b >*</b></label>
                                                    <span >
                                                        {otherIcons.currency_icon}

                                                        <CustomDropdown04
                                                            label="Payment Mode"
                                                            options={taxAccount}
                                                            value={formData?.tax_acc_id}
                                                            onChange={handleChange}
                                                            name="tax_acc_id"
                                                            defaultOption="Select TDX tax Account"
                                                        />
                                                    </span>
                                                </div>

                                            } */}
                                        </div>
                                    </div>
                                    {/* </div> */}



                                    <div className="f1wrpofcreqsx2">
                                        <div className='itemsectionrows'>

                                            <div className="tableheadertopsxs1">
                                                <p className='tablsxs1a2'>Date</p>
                                                <p className='tablsxs1a2'>Invoice number</p>
                                                <p className='tablsxs1a3'>Invoice Amount</p>
                                                <p className='tablsxs1a4'>Amount Due</p>
                                                <p className='tablsxs1a5'>Tax</p>
                                                <p className='tablsxs1a6'>Payment</p>
                                            </div>


                                            {formData?.entries?.map((item, index) => (
                                                <>
                                                    <div key={index} className="tablerowtopsxs1">
                                                        <div className="tablsxs1a2">
                                                            <input type="text" value={item?.date}
                                                                // disabled
                                                                required
                                                            />
                                                        </div>

                                                        <div className="tablsxs1a2">
                                                            <div className="tablsxs1a2">
                                                                <input type="text" value={item?.invoice_no}
                                                                    // disabled
                                                                    required
                                                                />
                                                            </div>
                                                        </div>



                                                        <div className="tablsxs1a3">
                                                            <input type="text"
                                                                value={item?.invoice_amount}
                                                                // disabled
                                                                required
                                                            />

                                                        </div>



                                                        <div className="tablsxs1a4">
                                                            <div className="tablsxs1a2">
                                                                <input type="text"
                                                                    value={item?.balance_amount}
                                                                    // disabled
                                                                    readOnly
                                                                    required
                                                                />
                                                            </div>
                                                        </div>



                                                        <div className="tablsxs1a3">
                                                            {/* <div className="tablsxs1a2"> */}
                                                            <input
                                                                type="text"
                                                                value="NA"
                                                                placeholder='NA'
                                                            />
                                                            {/* </div> */}
                                                        </div>

                                                        <div className="tablsxs1a4">
                                                            <div className="tablsxs1a2">

                                                                <input
                                                                    type="number"
                                                                    value={item.amount !== null ? item.amount : ""}
                                                                    placeholder="0.00"
                                                                    onChange={(e) => {
                                                                        const inputValue = e.target.value;
                                                                        const newValue = inputValue === "" ? null : parseFloat(inputValue);

                                                                        if (newValue <= (+formData?.debit) || newValue <= (+paymentDetail?.debit)) {
                                                                            setFormData((prevFormData) => ({
                                                                                ...prevFormData,
                                                                                entries: prevFormData.entries.map((entry, i) =>
                                                                                    i === index ? { ...entry, amount: newValue } : entry
                                                                                )
                                                                            }));
                                                                        } else {
                                                                            toast('The amount entered here is more than the amount paid by the customer', {
                                                                                icon: '👏',
                                                                                style: {
                                                                                    borderRadius: '10px',
                                                                                    background: '#333',
                                                                                    color: '#fff',
                                                                                    fontSize: '14px',
                                                                                },
                                                                            });
                                                                        }
                                                                    }}
                                                                />

                                                            </div>
                                                        </div>


                                                        {/* {formData.entries.length > 1 ? (
                                                            <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}> <RxCross2 /> </button>
                                                        ) : (
                                                            <button className='removeicoofitemrow' type="button" onClick={() => handleItemReset(index)}> <SlReload /> </button>
                                                        )} */}

                                                        {/* <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}><RxCross2 /></button> */}
                                                    </div >
                                                </>


                                            ))}
                                        </div>


                                        {/* 
                                        <button id='additembtn45srow' type="button" onClick={handleItemAdd}>Add New Row<GoPlus /></button> */}


                                        <div className="height5"></div>
                                        <div className='secondtotalsections485s'>
                                            <div className='textareaofcreatqsiform'>
                                                <label>Customer Note</label>
                                                <textarea
                                                    placeholder='Will be displayed on the estimate'
                                                    value={formData.customer_note}
                                                    onChange={handleChange}
                                                    name='customer_note'
                                                />
                                            </div>

                                            <div className="calctotalsection">
                                                <div className="calcuparentc">
                                                    <div className='clcsecx12s1'>
                                                        <label>Amount received:</label>
                                                        <input
                                                            type="text"
                                                            value={formData.debit}
                                                            readOnly
                                                            placeholder='0.00'
                                                            className='inputsfocalci465s'
                                                        />
                                                    </div>
                                                    <div className='clcsecx12s1'>
                                                        <label>Amount used for payment:</label>
                                                        <input
                                                            className='inputsfocalci465s'
                                                            readOnly
                                                            type="number"
                                                            value={calculateTotalAmount()}
                                                            placeholder='0.00'
                                                        />
                                                    </div>
                                                    {/* <div className='clcsecx12s1'>
                                                        <label>Amount refunded:</label>
                                                        <input
                                                            className='inputsfocalci465s'
                                                            readOnly
                                                            type="number"
                                                            value={formData.adjustment_charge}
                                                            onChange={(e) => {
                                                                const adjustmentCharge = e.target.value || '0';
                                                                const total = parseFloat(formData.subtotal) + parseFloat(formData.shipping_charge || 0) + parseFloat(adjustmentCharge);
                                                                setFormData({ ...formData, adjustment_charge: adjustmentCharge, total: total.toFixed(2) });
                                                            }}
                                                            // disabled={!formData.items[0].item_id}
                                                            placeholder='0.00'
                                                        />
                                                    </div> */}
                                                    <div className='clcsecx12s1'>
                                                        <label>Amount in access:</label>
                                                        <input
                                                            className='inputsfocalci465s'
                                                            readOnly
                                                            type="number"
                                                            value={formData?.amt_excess}
                                                            // disabled={!formData.items[0].item_id}
                                                            placeholder='0.00'
                                                        />
                                                    </div>
                                                    {/* {!formData.items[0].item_id ?
                                                    <b className='idofbtagwarninhxs5'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#f6b500"} fill={"none"}>
                                                        <path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="currentColor" strokeWidth="1.5" />
                                                        <path d="M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M11.992 8.99997H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>To edit the shipping and adjustment charge, select an item first.</b> : ''} */}

                                                </div>

                                                {/* <div className='clcsecx12s2'>
                                                <label>Total (₹):</label>
                                                <input
                                                    type="text"
                                                    value={formData.total}
                                                    readOnly
                                                    placeholder='0.00'
                                                />
                                            </div> */}

                                            </div>
                                        </div>





                                        <div className="breakerci"></div>
                                        <div className="height5"></div>


                                        <div className='secondtotalsections485s'>
                                            <div className='textareaofcreatqsiform'>
                                                <label>Terms</label>
                                                <textarea
                                                    placeholder='Enter the terms and conditions of your business to be displayed in your transaction '
                                                    value={formData.terms_and_condition}
                                                    onChange={handleChange}
                                                    name='terms_and_condition'
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
                                    <button className="firstbtnc2 firstbtnc46x5s" type="submit" onClick={() => handleButtonClicked('draft')} disabled={loading}>
                                        {loading ? 'Submiting...' : 'Save as draft'}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                                            <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    <button className="firstbtnc1" type="submit" onClick={() => handleButtonClicked('sent')} disabled={loading}> {loading ? 'Submiting...' : 'Save and send'}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                                            <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <Link to={"/dashboard/quotation"} className="firstbtnc2">
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
                    </div>
                </div >
                <Toaster
                    position="bottom-right"
                    reverseOrder={false} />
            </>}
        </>
    );
};


export default CreatePaymentRec
