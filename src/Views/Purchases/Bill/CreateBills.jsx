import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuotation } from '../../../Redux/Actions/quotationActions';
import { customersList } from '../../../Redux/Actions/customerActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import CustomDropdown11 from '../../../Components/CustomDropdown/CustomDropdown11';
import { accountLists, itemLists, vendorsLists } from '../../../Redux/Actions/listApisActions';
import DatePicker from "react-datepicker";

import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { GoPlus } from 'react-icons/go';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12';
import { fetchCurrencies, fetchMasterData } from '../../../Redux/Actions/globalActions';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../../../Configs/Firebase/firebaseConfig';
import { OverflowHideBOdy } from '../../../Utils/OverflowHideBOdy';
import { BsEye } from 'react-icons/bs';
import CustomDropdown14 from '../../../Components/CustomDropdown/CustomDropdown14';
// import DeleveryAddress from './DeleveryAddress';
import DeleveryAddress from '../../Sales/PurchaseOrder/DeleveryAddress';
import ViewVendorsDetails from '../../Sales/PurchaseOrder/ViewVendorsDetails';
import { SlReload } from 'react-icons/sl';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import { createPurchases } from '../../../Redux/Actions/purchasesActions';
import toast, { Toaster } from 'react-hot-toast';
import { billDetails } from '../../../Redux/Actions/billActions';
import Loader02 from '../../../Components/Loaders/Loader02';
const CreateBills = () => {

    const dispatch = useDispatch();
    const cusList = useSelector((state) => state?.customerList);
    const vendorList = useSelector((state) => state?.vendorList);
    const itemList = useSelector((state) => state?.itemList);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    const [cusData, setcusData] = useState(null);
    const [switchCusDatax1, setSwitchCusDatax1] = useState("Details");
    const [itemData, setItemData] = useState({});
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
    const { masterData } = useSelector(state => state?.masterData);
    const accountList = useSelector((state) => state?.accountList);
    const billDetailss = useSelector((state) => state?.billDetail);
    const billDetail = billDetailss?.data?.bill;

    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, convert, dublicate: isDublicate } = Object.fromEntries(params.entries());


    console.log("billDetail", billDetail)

    const [formData, setFormData] = useState({
        id: 0,
        purchase_type: "bills",
        bill_no: "BN-1315",
        transaction_date: "",  // bill date
        currency: "INR",
        expiry_date: "", // due date
        vendor_id: null,
        fy: localStorage.getItem('FinancialYear') || 2024,
        warehouse_id: localStorage.getItem('selectedWarehouseId') || '',
        vendor_name: "",
        phone: "",
        email: "",
        terms_and_condition: "",
        vendor_note: "",
        subtotal: null,
        discount: null,
        shipping_charge: null,
        adjustment_charge: null,
        total: null,
        reference_no: "",
        reference: null,
        place_of_supply: null,
        source_of_supply: null,
        shipment_date: null,
        order_no: null,
        payment_terms: null,
        customer_notes: null,
        upload_image: null,
        status: null,
        items: [
            {
                id: 0,
                item_id: null,
                quantity: 1,
                gross_amount: null,
                final_amount: null,
                tax_rate: null,
                tax_amount: null,
                discount: null,
                discount_type: 1,
                item_remark: null
            },

        ]
    }
    );


    useEffect(() => {
        if ((itemId && isEdit && billDetail) || (itemId && isDublicate && billDetail) || itemId && (convert === "toInvoice" || convert === "toSale" || convert === "saleToInvoice")) {

            const itemsFromApi = billDetail?.items?.map(item => ({
                item_id: (+item?.item_id),
                quantity: (+item?.quantity),
                gross_amount: (+item?.gross_amount),
                final_amount: (+item?.final_amount),
                tax_rate: (+item?.tax_rate),
                tax_amount: (+item?.tax_amount),
                discount: (+item?.discount),
                discount_type: (+item?.discount_type),
                item_remark: item?.item_remark,
            }));

            setFormData({
                ...formData,
                id: isEdit ? billDetail?.id : 0,
                purchase_type: "bills",
                bill_no: billDetail?.bill_no,
                transaction_date: billDetail?.transaction_date,
                currency: billDetail?.currency,
                expiry_date: billDetail?.expiry_date,
                vendor_id: (+billDetail?.vendor_id),
                fy: billDetail?.fy,
                warehouse_id: billDetail?.warehouse_id,
                vendor_name: billDetail?.vendor_name,
                phone: billDetail?.phone,
                email: billDetail?.email,
                terms_and_condition: billDetail?.terms_and_condition,
                vendor_note: billDetail?.vendor_note,
                subtotal: billDetail?.subtotal,
                discount: billDetail?.discount,
                shipping_charge: billDetail?.shipping_charge,
                adjustment_charge: billDetail?.adjustment_charge,
                total: billDetail?.total,
                reference_no: billDetail?.reference_no,
                reference: billDetail?.reference,
                place_of_supply: billDetail?.place_of_supply,
                source_of_supply: billDetail?.source_of_supply,
                shipment_date: billDetail?.shipment_date,
                order_no: billDetail?.order_no,
                payment_terms: billDetail?.payment_terms,
                customer_notes: billDetail?.customer_notes,
                upload_image: billDetail?.upload_image,
                status: billDetail?.status,
                items: itemsFromApi || []
            });

            if (billDetail?.upload_image) {
                setImgeLoader("success");
            }

            if (billDetail?.address) {
                const parsedAddress = JSON?.parse(billDetail?.address);

                const dataWithParsedAddress = {
                    ...billDetail,
                    address: parsedAddress
                };

                setAddSelect({
                    billing: dataWithParsedAddress?.address?.billing,
                    shipping: dataWithParsedAddress?.address?.shipping,
                });

                setcusData(dataWithParsedAddress?.customer);
            }
        }
    }, [billDetail, itemId, isEdit, convert, isDublicate]);

    const [loading, setLoading] = useState(false);

    const handleItemAdd = () => {
        const newItems = [...formData.items, {
            item_id: '',
            quantity: 1,
            gross_amount: null,
            final_amount: null,
            tax_rate: null,
            tax_amount: 0,
            discount: 0,
            discount_type: 1,
            item_remark: null,
        }];
        setFormData({ ...formData, items: newItems });
    };

    // for address select
    const [addSelect, setAddSelect] = useState({
        billing: "",
        shipping: ""
    })

    // console.log("addSelect", addSelect)
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        if (name === "billing") {
            setAddSelect({
                ...addSelect,
                billing: value,
            })
        } else {
            setAddSelect({
                ...addSelect,
                shipping: value,
            })
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'shipping_charge' || name === 'adjustment_charge') {
            newValue = parseFloat(value) || 0; // Convert to float or default to 0
        }

        if (name === "vendor_id") {
            const selectedItem = vendorList?.data?.user?.find(cus => cus.id == value);
            // console.log("selectedItem", selectedItem)

            const findfirstbilling = selectedItem?.address?.find(val => val?.is_billing === "1")
            const findfirstshipping = selectedItem?.address?.find(val => val?.is_shipping === "1")
            setAddSelect({
                billing: findfirstbilling,
                shipping: findfirstshipping,
            })

        }

        setFormData({
            ...formData,
            [name]: newValue,
            total: calculateTotal(formData.subtotal, newValue, formData.adjustment_charge),
        });
    };

    const popupRef = useRef(null);

    //show all addresses popup....
    const popupRef1 = useRef(null);
    const [showPopup, setShowPopup] = useState("");
    const showAllAddress = (val) => {
        setShowPopup(val);
    }
    //show all addresses....


    // console.log("formdata", formData)
    const handleShippingChargeChange = (e) => {
        const shippingCharge = e.target.value;
        const total = parseFloat(formData.subtotal) + parseFloat(shippingCharge) + parseFloat(formData.adjustment_charge || 0);
        setFormData({ ...formData, shipping_charge: shippingCharge, total: total.toFixed(2) });
    };

    const handleAdjustmentChargeChange = (e) => {
        const adjustmentCharge = e.target.value;
        const total = parseFloat(formData.subtotal) + parseFloat(formData.shipping_charge || 0) + parseFloat(adjustmentCharge);
        setFormData({ ...formData, adjustment_charge: adjustmentCharge, total: total.toFixed(2) });
    };


    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        const item = newItems[index];
        let discountAmount = 0;
        let discountPercentage = 0;

        if (field === 'discount_type') {
            newItems[index].discount = 0;
        }

        if (field === 'item_id') {
            const selectedItem = itemList?.data?.item.find(item => item.id === value);
            // console.log("selectedItem", selectedItem)
            if (selectedItem) {
                newItems[index].gross_amount = selectedItem.price;
                if (selectedItem?.tax_preference === "1") {
                    newItems[index].tax_rate = selectedItem.tax_rate;
                    newItems[index].tax_name = "Taxable";
                } else {
                    newItems[index].tax_rate = "0";
                    newItems[index].tax_name = "Non-Taxable";
                }
            }
        }

        const grossAmount = item.gross_amount * item.quantity;
        const taxAmount = (grossAmount * item.tax_rate) / 100;
        if (item.discount_type === 1) {
            discountAmount = Math.min(item.discount, item.gross_amount * item.quantity + taxAmount);
        } else if (item.discount_type === 2) {
            discountPercentage = Math.min(item.discount, 100);
        }

        const grossAmountPlTax = item.gross_amount * item.quantity + taxAmount;
        const discount = item.discount_type === 1 ? discountAmount : (grossAmountPlTax * discountPercentage) / 100;
        const finalAmount = grossAmount + taxAmount - discount;

        newItems[index].final_amount = finalAmount.toFixed(2); // Round to 2 decimal places

        const subtotal = newItems.reduce((acc, item) => acc + parseFloat(item.final_amount), 0);

        const total = parseFloat(subtotal) + (parseFloat(formData.shipping_charge) || 0) + (parseFloat(formData.adjustment_charge) || 0);

        setFormData({
            ...formData,
            items: newItems,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2)
        });
    };


    const calculateTotal = (subtotal, shippingCharge, adjustmentCharge) => {
        const subTotalValue = parseFloat(subtotal) || 0;
        const shippingChargeValue = parseFloat(shippingCharge) || 0;
        const adjustmentChargeValue = parseFloat(adjustmentCharge) || 0;
        return (subTotalValue + shippingChargeValue + adjustmentChargeValue).toFixed(2);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const allAddress = JSON.stringify(addSelect)
            await dispatch(createPurchases(formData));
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
            vendor_name: cusData ? `${cusData.first_name} ${cusData.last_name}` : '',
            email: cusData?.email,
            phone: cusData?.mobile_no,
            address: cusData?.address.length,
        }));
    }, [cusData]);

    useEffect(() => {
        dispatch(customersList({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(vendorsLists({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(itemLists({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(fetchCurrencies());
        dispatch(fetchMasterData())
        dispatch(accountLists());
        dispatch(billDetails({ id: itemId }));
    }, [dispatch]);



    const handleItemRemove = (index) => {
        const newItems = formData.items.filter((item, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };


    // dropdown of discount
    const [showDropdown, setShowDropdown] = useState(false);
    // const [showDropdownx1, setShowDropdownx1] = useState(false);
    const dropdownRef = useRef(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
    };

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


    console.log("formDAta", formData)

    return (
        <>
            <Toaster />
            <TopLoadbar />
            {billDetailss?.loading ? <Loader02 /> : <>
                {loading && <MainScreenFreezeLoader />}
                {freezLoadingImg && <MainScreenFreezeLoader />}

                <div className='formsectionsgrheigh'>
                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">
                                {otherIcons.quoation_svg}
                                New Bill
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
                                            <label >Vendor name<b className='color_red'>*</b></label>
                                            <div id='sepcifixspanflex'>
                                                <span id=''>
                                                    {otherIcons.name_svg}
                                                    <CustomDropdown10
                                                        label="Select vendor"
                                                        options={vendorList?.data?.user}
                                                        value={formData?.vendor_id}
                                                        onChange={handleChange}
                                                        name="vendor_id"
                                                        defaultOption="Select Vendor"
                                                        setcusData={setcusData}
                                                    />
                                                </span>

                                                {cusData &&
                                                    <div className="view_all_cus_deial_btn">
                                                        {viewAllCusDetails === true ?
                                                            <button type="button" onClick={() => setViewAllCusDetails(false)}>Hide vendor information</button>
                                                            :
                                                            <button type="button" onClick={() => setViewAllCusDetails(true)}>View vendor information</button>

                                                        }
                                                    </div>
                                                }
                                                {/* popup code */}
                                                {/* {showPopup === "billing" && (
                                                    <div className="mainxpopups1" ref={popupRef1}>
                                                        <div className="popup-content" style={{ height: " 400px" }}>
                                                            <span className="close-button" onClick={() => setShowPopup("")}><RxCross2 /></span>
                                                            { }
                                                            <CustomDropdown14
                                                                label="Search Shipping"
                                                                options={cusData?.address?.filter(val => val?.is_billing === "1")}
                                                                value={addSelect?.billing}
                                                                onChange={handleAddressChange}
                                                                name="billing"
                                                                defaultOption="Select Billing"
                                                                customerName={`${cusData?.first_name} ${cusData?.last_name}`}
                                                            />
                                                            <div className="midpopusec12x">
                                                                <div className="form_commonblock">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {showPopup === "shipping" && (<div className="mainxpopups1" ref={popupRef1}>
                                                    <div className="popup-content" style={{ height: " 400px" }}>
                                                        <span className="close-button" onClick={() => setShowPopup("")}><RxCross2 /></span>
                                                        <div className="midpopusec12x">
                                                            <CustomDropdown14
                                                                label="Search Shipping"
                                                                options={cusData?.address?.filter(val => val?.is_shipping === "1")}
                                                                value={addSelect?.shipping}
                                                                onChange={handleAddressChange}
                                                                name="shipping"
                                                                defaultOption="Select Shipping"
                                                                customerName={`${cusData?.first_name} ${cusData?.last_name}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                )

                                                } */}

                                                {/* popup code */}
                                            </div>


                                            {!cusData ? "" :
                                                <>
                                                    {/* <div className="showCustomerDetails">
                                                        {!viewAllCusDetails &&
                                                            <div className="cus_fewDetails">
                                                                <div className="cust_dex1s1">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#0d54b8"} fill={"none"}>
                                                                        <path d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z" stroke="currentColor" strokeWidth="1.5" />
                                                                        <path d="M18.2222 17C19.6167 18.9885 20.2838 20.0475 19.8865 20.8999C19.8466 20.9854 19.7999 21.0679 19.7469 21.1467C19.1724 22 17.6875 22 14.7178 22H9.28223C6.31251 22 4.82765 22 4.25311 21.1467C4.20005 21.0679 4.15339 20.9854 4.11355 20.8999C3.71619 20.0475 4.38326 18.9885 5.77778 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z" stroke="currentColor" strokeWidth="1.5" />
                                                                    </svg> Delevery address
                                                                </div>


                                                                <div className="cust_dex1s2">

                                                                    <div className="cust_dex1s2s1">
                                                                        {!addSelect?.billing ? "No billing address is found" : <>
                                                                            <p className='dex1s2schilds1'>Billing address <button type='button' onClick={() => showAllAddress("billing")}>show all</button></p>

                                                                            <p className='dex1s2schilds2'>Customer Name: {`${cusData?.first_name} ${cusData?.last_name}`} </p>

                                                                            <p>  Street1: {addSelect?.billing?.street_1}  </p>
                                                                            <p>  Street 2: {addSelect?.billing?.street_2}  </p>
                                                                            <p>  Landmark: {addSelect?.billing?.landmark ? addSelect?.billing?.landmark : "No landmark"}  </p>
                                                                            <p>  Locality: {addSelect?.billing?.locality ? addSelect?.billing?.locality : "No locality"}  </p>
                                                                            <p>  House No: {addSelect?.billing?.house_no ? addSelect?.billing?.house_no : "No house_no"}  </p>
                                                                            <p>  Fax Number: {addSelect?.billing?.fax_no ? addSelect?.billing?.fax_no : "No fax_no"}  </p>
                                                                            <p>  Phone:  {addSelect?.billing?.phone_no ? addSelect?.billing?.phone_no : "No phone_no"}  </p>
                                                                        </>}
                                                                    </div>
                                                                    <div className="seps23"></div>
                                                                    <div className="cust_dex1s2s1">
                                                                        {!addSelect?.shipping ? "No shipping address is found" : <>

                                                                            <p className='dex1s2schilds1'>Shipping address <button type='button' onClick={() => showAllAddress("shipping")}>show all</button></p>
                                                                            <p className='dex1s2schilds2'>Customer Name: {`${cusData?.first_name} ${cusData?.last_name}`} </p>
                                                                            <p>  Street1: {addSelect?.shipping?.street_1}  </p>
                                                                            <p>  Street 2: {addSelect?.shipping?.street_2}  </p>
                                                                            <p>  Landmark: {addSelect?.shipping?.landmark ? addSelect?.shipping?.landmark : "No landmark"}  </p>
                                                                            <p>  Locality: {addSelect?.shipping?.locality ? addSelect?.shipping?.locality : "No locality"}  </p>
                                                                            <p>  House No: {addSelect?.shipping?.house_no ? addSelect?.shipping?.house_no : "No house_no"}  </p>
                                                                            <p>  Fax Number: {addSelect?.shipping?.fax_no ? addSelect?.shipping?.fax_no : "No fax_no"}  </p>
                                                                            <p>  Phone:  {addSelect?.shipping?.phone_no ? addSelect?.shipping?.phone_no : "No phone_no"}  </p>
                                                                        </>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div> */}
                                                    <ViewVendorsDetails
                                                        setSwitchCusDatax1={setSwitchCusDatax1}
                                                        setViewAllCusDetails={setViewAllCusDetails}
                                                        cusData={cusData}
                                                        addSelect={addSelect}
                                                        viewAllCusDetails={viewAllCusDetails}
                                                        switchCusDatax1={switchCusDatax1} />
                                                </>
                                            }

                                            {/* <DeleveryAddress /> */}

                                        </div>


                                        <div className="f1wrapofcreqx1">
                                            <div className="form_commonblock">
                                                <label className='color_red'>Bill<b >*</b></label>
                                                <span >
                                                    {otherIcons.tag_svg}
                                                    <input type="text" value={formData.bill_no} required
                                                        placeholder='Enter bill number'
                                                        onChange={handleChange}
                                                        name='bill_no'
                                                    />

                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label className='color_red'>Bill Date <b >*</b></label>
                                                <span>
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.transaction_date}
                                                        onChange={(date) => setFormData({ ...formData, transaction_date: date })}
                                                        name='transaction_date'
                                                        required
                                                        placeholderText="Enter bill date"
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

                                            {/* <div className="form_commonblock">
                                                <label className='color_red'>Source of Supply<b >*</b></label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <CustomDropdown12
                                                        label="Source of supply"
                                                        options={getCurrency?.source_of_supply}
                                                        value={formData?.source_of_supply}
                                                        onChange={handleChange}
                                                        name="source_of_supply"
                                                        defaultOption="Select Source of supply"
                                                    />
                                                </span>
                                            </div> */}
                                            <div className="form_commonblock">

                                                <label >Place of Supply<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input
                                                        type="text" required
                                                        value={formData.place_of_supply}
                                                        onChange={handleChange}
                                                        name='place_of_supply'

                                                        placeholder='Enter Place of Supply'
                                                    />
                                                </span>
                                            </div>

                                            <div className="form_commonblock ">
                                                <label >Order number</label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input type="text" value={formData.order_no} onChange={handleChange}
                                                        // disabled
                                                        required
                                                        name='order_no'
                                                        placeholder='Enter order no' />
                                                </span>
                                            </div>


                                            <div className="form_commonblock ">
                                                <label >Pyment terms</label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <CustomDropdown04
                                                        label="Payment Terms"
                                                        options={masterData?.filter(type => type.type === "7")}
                                                        value={formData.payment_terms}
                                                        onChange={handleChange}
                                                        name="payment_terms"
                                                        defaultOption="Select Payment terms"
                                                    />
                                                </span>
                                            </div>


                                            <div className="form_commonblock">
                                                <label >Due Date</label>
                                                <span >
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.expiry_date}
                                                        onChange={(date) => setFormData({ ...formData, expiry_date: date })}
                                                        name='expiry_date'
                                                        required
                                                        placeholderText="Enter due date"
                                                    />
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
                                                <p className='tablsxs1a1'>Item</p>
                                                <p className='tablsxs1a2'>Item Price</p>
                                                <p className='tablsxs1a3'>Quantity</p>
                                                <p className='tablsxs1a4'>Discount</p>
                                                <p className='tablsxs1a5'>Tax</p>
                                                <p className='tablsxs1a6'>Final Amount</p>
                                            </div>


                                            {formData?.items?.map((item, index) => (
                                                <>
                                                    <div key={index} className="tablerowtopsxs1">
                                                        <div className="tablsxs1a1">
                                                            <span >
                                                                <CustomDropdown11
                                                                    label="Item Name"
                                                                    options={itemList?.data?.item}
                                                                    value={item?.item_id}
                                                                    onChange={(e) => handleItemChange(index, 'item_id', e.target.value, e.target.option)}
                                                                    name="item_id"
                                                                    defaultOption="Select Item"
                                                                    setItemData={setItemData}
                                                                />
                                                            </span>
                                                        </div>

                                                        <div className="tablsxs1a2">
                                                            <input
                                                                type="number"
                                                                value={item.gross_amount}
                                                                placeholder="0.00"
                                                                onChange={(e) => {
                                                                    const newValue = parseFloat(e.target.value);
                                                                    if (!isNaN(newValue) && newValue >= 0) {
                                                                        handleItemChange(index, "gross_amount", newValue);
                                                                    } else {
                                                                        toast('Amount cannot be negative', {
                                                                            icon: '👏', style: {
                                                                                borderRadius: '10px', background: '#333',
                                                                                color: '#fff', fontSize: '14px',
                                                                            },
                                                                        }
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </div>



                                                        <div className="tablsxs1a3">
                                                            <input
                                                                type="number"
                                                                value={item.quantity}
                                                                onChange={(e) => {
                                                                    const newValue = parseInt(e.target.value, 10);
                                                                    if (!isNaN(newValue) && newValue >= 1) {
                                                                        handleItemChange(index, 'quantity', newValue);
                                                                    } else {
                                                                        toast.error('Quantity cannot be negative', {
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



                                                        <div className="tablsxs1a4">
                                                            <span>

                                                                <input
                                                                    type="number"
                                                                    value={item.discount}
                                                                    onChange={(e) => {
                                                                        let newValue = e.target.value;
                                                                        if (newValue < 0) newValue = 0;

                                                                        if (item.discount_type === 2) {
                                                                            newValue = Math.min(newValue, 100);
                                                                            if (newValue === 100) {
                                                                                // Use toast here if available
                                                                                toast('Discount percentage cannot exceed 100%.', {
                                                                                    icon: '👏', style: {
                                                                                        borderRadius: '10px', background: '#333', fontSize: '14px',
                                                                                        color: '#fff',
                                                                                    },
                                                                                }
                                                                                );
                                                                            }
                                                                        } else {
                                                                            newValue = Math.min(newValue, item.gross_amount * item.quantity + (item.gross_amount * item.tax_rate * item.quantity) / 100);
                                                                            if (newValue > item.gross_amount * item.quantity) {
                                                                                toast('Discount amount cannot exceed the final amount.', {
                                                                                    icon: '👏', style: {
                                                                                        borderRadius: '10px', background: '#333', fontSize: '14px',
                                                                                        color: '#fff',
                                                                                    },
                                                                                }
                                                                                );
                                                                            }
                                                                        }

                                                                        handleItemChange(index, 'discount', newValue);
                                                                    }}
                                                                />

                                                                <div
                                                                    className="dropdownsdfofcus56s"
                                                                    onClick={() => handleDropdownToggle(index)}
                                                                >
                                                                    {item.discount_type === 1 ? 'INR' : item.discount_type === 2 ? '%' : ''}
                                                                    {openDropdownIndex === index && (
                                                                        <div className="dropdownmenucustomx1">
                                                                            <div className='dmncstomx1' onClick={() => handleItemChange(index, 'discount_type', 1)}>INR</div>
                                                                            <div className='dmncstomx1' onClick={() => handleItemChange(index, 'discount_type', 2)}>%</div>
                                                                        </div>
                                                                    )}
                                                                </div>


                                                            </span>
                                                        </div>



                                                        <div className="tablsxs1a5">
                                                            {item.tax_name === "Taxable" && (
                                                                <input
                                                                    type="number"
                                                                    value={parseInt(item.tax_rate)}
                                                                    onChange={(e) => handleItemChange(index, 'tax_rate', e.target.value)}
                                                                    readOnly
                                                                    placeholder='0%'
                                                                />
                                                            )}
                                                            {item.tax_name === "Non-Taxable" && (
                                                                <>  {item?.tax_name}</>
                                                            )}
                                                        </div>

                                                        <div className="tablsxs1a6">
                                                            <input
                                                                type="number"
                                                                value={item.final_amount}
                                                                placeholder="0.00"
                                                                onChange={(e) => handleItemChange(index, 'final_amount', e.target.value)}
                                                                readOnly
                                                            />
                                                        </div>


                                                        {formData.items.length > 1 ? (
                                                            <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}> <RxCross2 /> </button>
                                                        ) : (
                                                            <button className='removeicoofitemrow' type="button" onClick={() => handleItemReset(index)}> <SlReload /> </button>
                                                        )}

                                                    </div>
                                                </>


                                            ))}
                                        </div>


                                        <button id='additembtn45srow' type="button" onClick={handleItemAdd}>Add New Row<GoPlus /></button>


                                        <div className="height5"></div>
                                        <div className='secondtotalsections485s'>
                                            <div className='textareaofcreatqsiform'>
                                                <label>Vendors Note</label>
                                                <textarea
                                                    placeholder='Will be displayed on the estimate'
                                                    value={formData.vendor_note}
                                                    onChange={handleChange}
                                                    name='vendor_note'
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
                                                    <div className='clcsecx12s1'>
                                                        <label>Shipping Charge:</label>
                                                        <input
                                                            className='inputsfocalci4'
                                                            type="number"
                                                            value={formData.shipping_charge}
                                                            onChange={handleShippingChargeChange}
                                                            placeholder='0.00'
                                                        />
                                                    </div>
                                                    <div className='clcsecx12s1'>
                                                        <label>Adjustment Charge:</label>
                                                        <input
                                                            className='inputsfocalci4'
                                                            type="number"
                                                            value={formData.adjustment_charge}
                                                            onChange={handleAdjustmentChargeChange}
                                                            placeholder='0.00'
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
                </div >
            </>
            }
        </>
    );
};

export default CreateBills;
