import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuotation } from '../../../Redux/Actions/quotationActions';
import { customersList } from '../../../Redux/Actions/customerActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import CustomDropdown11 from '../../../Components/CustomDropdown/CustomDropdown11';
import { itemLists, vendorsLists } from '../../../Redux/Actions/listApisActions';
import DatePicker from "react-datepicker";

import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { GoPlus } from 'react-icons/go';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12';
import { fetchCurrencies, fetchMasterData, updateAddresses } from '../../../Redux/Actions/globalActions';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../../../Configs/Firebase/firebaseConfig';
import { OverflowHideBOdy } from '../../../Utils/OverflowHideBOdy';
import { BsEye } from 'react-icons/bs';
import CustomDropdown14 from '../../../Components/CustomDropdown/CustomDropdown14';
import DeleveryAddress from './DeleveryAddress';
import ViewVendorsDetails from './ViewVendorsDetails';
import { SlReload } from 'react-icons/sl';
import toast, { Toaster } from 'react-hot-toast';
import { createPurchases, purchasesDetails } from '../../../Redux/Actions/purchasesActions';
import Loader02 from '../../../Components/Loaders/Loader02';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import CustomDropdown03 from '../../../Components/CustomDropdown/CustomDropdown03';
import CreateItemPopup from '../../Items/CreateItemPopup';
import useOutsideClick from '../../Helper/PopupData';
import { handleKeyPress } from '../../Helper/KeyPressInstance';
import { formatDate, todayDate } from '../../Helper/DateFormat';
import { addItems } from '../../../Redux/Actions/itemsActions';
import NumericInput from '../../Helper/NumericInput';

const CreatePurchaseOrder = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate()
    const cusList = useSelector((state) => state?.customerList);
    const vendorList = useSelector((state) => state?.vendorList);
    const itemList = useSelector((state) => state?.itemList);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    const vendorAddress = useSelector((state) => state?.updateAddress);
    const addressVendor = vendorAddress?.data?.address;
    const [cusData, setcusData] = useState(null);
    const [switchCusDatax1, setSwitchCusDatax1] = useState("Details");
    const [itemData, setItemData] = useState({});
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
    const { masterData } = useSelector(state => state?.masterData);
    const purchseDetails = useSelector(state => state?.detailsPurchase);
    // const createPurchases = useSelector(state => state?.createPurchase);
    const purchseDetail = purchseDetails?.data?.purchaseOrder;

    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit, dublicate: isDublicate } = Object.fromEntries(params.entries());

    // console.log("id,edit,convert", itemId, isEdit, convert);

    // console.log("vendorData", vendorList)
    const [clickTrigger, setClickTrigger] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [addRowOnChange, setAddRowOnChange] = useState(false);


    const [formData, setFormData] = useState({
        // id: 0,
        purchase_type: "purchase_order",
        transaction_date: todayDate(),
        // expiry_date: new Date(),
        purchase_order_id: "PO-254",
        order_no: null,
        vendor_id: null,
        currency: "",
        vendor_name: "",
        phone: "",
        email: "",
        terms_and_condition: "",
        vendor_note: "",
        subtotal: null,
        discount: null,
        tcs: null,
        shipping_charge: null,
        adjustment_charge: null,
        total: null,
        reference: "",
        upload_image: null,
        payment_terms: null,
        date: null,
        place_of_supply: null,
        expected_delivery_Date: null,
        // shipment_date: formatDate(new Date()),
        shipment_preference: null,
        customer_note: null,
        discount: "",
        status: "",
        items: [
            {

                item_id: '',
                quantity: 1,
                gross_amount: null,
                // rate: null,
                final_amount: null,
                tax_rate: null,
                tax_amount: null,
                discount: 0,
                discount_type: 1,
                item_remark: null,
            }
        ],
    });


    useEffect(() => {
        if (itemId && isEdit && purchseDetail || (itemId && isDublicate && purchseDetail)) {
            const itemsFromApi = purchseDetail.items?.map(item => ({
                item_id: (+item?.item_id),
                quantity: (+item?.quantity),
                gross_amount: (+item?.gross_amount),
                rate: (+item?.rate),
                final_amount: (+item?.final_amount),
                tax_rate: (+item?.tax_rate),
                tax_amount: (+item?.tax_amount),
                discount: (+item?.discount),
                discount_type: (+item?.discount_type),
                item_remark: item?.item_remark,
                tax_name: item?.item?.tax_preference === "1" ? "Taxable" : "Non-Taxable"
            }));

            setFormData({
                id: isEdit ? purchseDetail?.id : 0,
                purchase_type: "purchase_order",
                transaction_date: purchseDetail.transaction_date,
                warehouse_id: purchseDetail.warehouse_id,
                purchase_order_id: purchseDetail.purchase_order_id,
                vendor_id: (+purchseDetail.vendor_id),
                upload_image: purchseDetail.upload_image,
                customer_type: purchseDetail.customer_type,
                customer_name: purchseDetail.customer_name,
                phone: purchseDetail.phone,
                email: purchseDetail.email,
                reference: purchseDetail.reference,
                currency: purchseDetail.currency,
                place_of_supply: purchseDetail?.place_of_supply,
                // expiry_date: purchseDetail.expiry_date,
                expected_delivery_Date: purchseDetail.expected_delivery_Date,
                payment_terms: purchseDetail.payment_terms,
                sale_person: purchseDetail.sale_person,
                customer_note: purchseDetail.customer_note,
                terms_and_condition: purchseDetail.terms_and_condition,
                fy: purchseDetail.fy,
                subtotal: purchseDetail.subtotal,
                shipping_charge: purchseDetail.shipping_charge,
                adjustment_charge: purchseDetail.adjustment_charge,
                total: purchseDetail.total,
                status: purchseDetail.status,
                items: itemsFromApi || []
            });

            if (purchseDetail.upload_image) {
                setImgeLoader("success");
            }

            if (purchseDetail?.address) {
                const parsedAddress = JSON?.parse(purchseDetail?.address);
                const dataWithParsedAddress = {
                    ...purchseDetail,
                    address: parsedAddress
                };
                setAddSelect({
                    billing: dataWithParsedAddress?.address?.billing,
                    shipping: dataWithParsedAddress?.address?.shipping,
                });
                setcusData(dataWithParsedAddress?.vendor)
            }

        }
    }, [purchseDetail, itemId, isEdit, isDublicate]);



    const [loading, setLoading] = useState(false);


    const handleItemAdd = () => {

        const newItems = [...formData.items, {
            item_id: '',
            quantity: 1,
            gross_amount: null,
            rate: null,
            final_amount: null,
            tax_rate: null,
            tax_amount: 0,
            discount: 0,
            discount_type: 1,
            item_remark: null,
        }];
        setFormData({ ...formData, items: newItems });
        // console.log("handleItemAdd()")
    };




    // useEffect(() => {
    //     if (addRowOnChange === true) {
    //         handleItemAdd();
    //         setAddRowOnChange(false)
    //     }
    // }, [addRowOnChange])




    // updateAddress State
    const [udateAddress, setUpdateAddress] = useState({
        id: "",
        user_id: "",
        country_id: "",
        street_1: "",
        street_2: "",
        state_id: "",
        city_id: "",
        zip_code: "",
        address_type: "",
        is_billing: "",
        is_shipping: "",
        phone_no: "",
        fax_no: ""
    });


    // updateAddress State addUpdate
    // for address select
    const [addSelect, setAddSelect] = useState({
        billing: "",
        shipping: ""
    })

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
    const [showPopup, setShowPopup] = useState("");

    useEffect(() => {
        if (showPopup === "billingAdd") {
            // console.log("billing call")
            setAddSelect({
                ...addSelect,
                billing: addressVendor
            })
        }
        if (showPopup === "shippingAdd") {
            // console.log("shipping call")
            setAddSelect({
                ...addSelect,
                shipping: addressVendor
            })
        }
    }, [addressVendor])

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'shipping_charge' || name === 'adjustment_charge') {
            newValue = parseFloat(value) || 0; // Convert to float or default to 0
        }

        if (name === "vendor_id") {
            const selectedItem = vendorList?.data?.user?.find(cus => cus.id == value);

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
    const showAllAddress = (val) => {
        setShowPopup(val);
    }

    //show all addresses....
    // Change address
    const changeAddress = (val, type) => {
        setShowPopup(type);
        // console.log("vaaaaaaaaaaaaaaaa", val)
        setUpdateAddress({
            ...udateAddress,
            id: val?.id,
            user_id: val?.user_id,
            country_id: val?.country_id,
            street_1: val?.street_1,
            street_2: val?.street_2,
            state_id: val?.state_id,
            city_id: val?.city_id,
            zip_code: val?.zip_code,
            address_type: val?.address_type,
            is_billing: val?.is_billing,
            is_shipping: val?.is_shipping,
            phone_no: val?.phone_no,
            fax_no: val?.fax_no
        });
    }
    // Change address


    // Change address handler
    const handleAllAddressChange = (e, type) => {
        const { name, value, checked } = e.target;

        setUpdateAddress({
            ...udateAddress,
            [name]: value,
        });

        // if (type === 'Shipping') {
        //     setUpdateAddress({
        //         ...udateAddress,
        //         is_shipping: checked ? "1" : "0"
        //     })
        // } else if (type === 'Billing') {
        //     setUpdateAddress({
        //         ...udateAddress,
        //         is_billing: checked ? "1" : "0"
        //     })
        // }

    };
    // Change address handler


    // update Address Handler
    const updateAddressHandler = () => {
        try {
            dispatch(updateAddresses(udateAddress)).then(() => {
                setShowPopup("");
                setClickTrigger((prevTrigger) => !prevTrigger);
                // if (udateAddress?.is_shipping === "0") {
                //     setAddSelect({
                //         ...addSelect,
                //         shipping: undefined,
                //     })
                // } else if (udateAddress?.is_billing === "0") {
                //     setAddSelect({
                //         ...addSelect,
                //         billing: undefined,
                //     })
                // }
            })
        } catch (e) {
            toast.error("error", e)
        }
    }
    // update Address Handler
    // console.log("formdata", formData)
    const handleShippingChargeChange = (e) => {
        const shippingCharge = e.target.value;
        const total = parseFloat(formData?.subtotal || 0) + parseFloat(shippingCharge || 0) + parseFloat(formData.adjustment_charge || 0);
        setFormData({ ...formData, shipping_charge: shippingCharge, total: total.toFixed(2) });
    };

    const handleAdjustmentChargeChange = (e) => {
        const adjustmentCharge = e.target.value;
        const total = parseFloat(formData.subtotal || 0) + parseFloat(formData.shipping_charge || 0) + parseFloat(adjustmentCharge || 0);
        setFormData({ ...formData, adjustment_charge: adjustmentCharge, total: total.toFixed(2) });
    };

    const calculateTotalDiscount = (items) => {
        return items?.reduce((acc, item) => acc + (parseFloat(item.discount) || 0), 0);
    };

    // console.log(formData?.items)
    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        const item = newItems[index];
        let discountAmount = 0;
        let discountPercentage = 0;
        const totalDiscount = calculateTotalDiscount(newItems);
        if (field === 'discount_type') {
            newItems[index].discount = 0;
        }
        console.log("field", field)
        if (field === 'item_id') {
            const selectedItem = itemList?.data?.item.find(item => item.id === value);
            if (selectedItem) {
                newItems[index].rate = selectedItem.price;
                newItems[index].gross_amount = (+selectedItem.price) * (+item?.quantity)
                if (selectedItem.tax_preference === "1") {
                    newItems[index].tax_rate = selectedItem.tax_rate;
                    newItems[index].tax_name = "Taxable";
                } else {
                    newItems[index].tax_rate = "0";
                    newItems[index].tax_name = "Non-Taxable";
                }

            }
        }

        // if (field === 'item_id' && value) {
        // setAddRowOnChange(true);
        // }

        if (field === "quantity") {
            newItems[index].gross_amount = (+item.rate) * (+item?.quantity);
        }

        const grossAmount = item.rate * item.quantity;
        const taxAmount = (grossAmount * item.tax_rate) / 100;
        if (item.discount_type === 1) {
            discountAmount = Math.min(item.discount, grossAmount + taxAmount);
        } else if (item.discount_type === 2) {
            discountPercentage = Math.min(item.discount, 100);
        }

        const grossAmountPlTax = grossAmount + taxAmount;
        const discount = item.discount_type === 1 ? discountAmount : (grossAmountPlTax * discountPercentage) / 100;
        const finalAmount = grossAmount + taxAmount - discount;

        newItems[index].final_amount = finalAmount.toFixed(2); // Round to 2 decimal places

        const subtotal = newItems.reduce((acc, item) => acc + parseFloat(item.final_amount), 0);
        const total = subtotal + (parseFloat(formData.shipping_charge) || 0) + (parseFloat(formData.adjustment_charge) || 0);

        setFormData({
            ...formData,
            discount: totalDiscount,
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
            const allAddress = JSON.stringify(addSelect);

            const sendData = {
                warehouse_id: localStorage.getItem("selectedWarehouseId"),
                fy: localStorage.getItem("FinancialYear"),
                address: allAddress
            }
            if (itemId && isEdit) {
                dispatch(createPurchases({ ...formData, ...sendData }, Navigate, "purchse", "edit"));
                setLoading(false);
            } else if (itemId && isDublicate) {
                dispatch(createPurchases({ ...formData, ...sendData }, Navigate, "purchse", "dublicate"));
            } else {
                dispatch(createPurchases({ ...formData, ...sendData }, Navigate, "purchse",));
            }
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
            address: cusData?.address?.length,
        }));
    }, [cusData]);

    useEffect(() => {

        dispatch(customersList({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(fetchCurrencies());
        dispatch(fetchMasterData());
        if (itemId && isEdit) {
            dispatch(purchasesDetails({ id: itemId }));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(itemLists({ fy: localStorage.getItem('FinancialYear') }));
    }, [dispatch,]);

    useEffect(() => {
        dispatch(vendorsLists({ fy: localStorage.getItem('FinancialYear') }));
    }, [dispatch, clickTrigger]);

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            expected_delivery_Date: formatDate(date),
        });
    };


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


    useOutsideClick(dropdownRef, () => setOpenDropdownIndex(null));

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
        // return () => {
        //     document.removeEventListener('click', handleClickOutside);
        // };
    }, [showPopup]);


    // add item row on enter press
    const buttonRef = useRef(null);
    useEffect(() => {
        return handleKeyPress(buttonRef, handleItemAdd);
    }, [buttonRef, handleItemAdd]);
    // add item row on enter press


    const handleItemReset = (index) => {
        const newItems = [...formData?.items];
        newItems[index] = {
            item_id: '',
            quantity: 1,
            gross_amount: 0,
            rate: 0,
            final_amount: 0,
            tax_rate: 0,
            tax_amount: 0,
            discount: 0,
            discount_type: 1,
            item_remark: 0,
        };

        const subtotal = newItems.reduce((acc, item) => acc + parseFloat(item.final_amount || 0), 0);
        const total = subtotal + parseFloat(formData.shipping_charge || 0) + parseFloat(formData.adjustment_charge || 0);

        setFormData({
            ...formData,
            items: newItems,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2),
        });
    };

    return (
        <>
            <TopLoadbar />
            {loading && <MainScreenFreezeLoader />}
            {freezLoadingImg && <MainScreenFreezeLoader />}

            <div className='formsectionsgrheigh' >
                <div id="Anotherbox" className='formsectionx1'>
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {otherIcons.quoation_svg}
                            New Purchase Order
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
                                        <label >Vendor Name<b className='color_red'>*</b></label>
                                        <div id='sepcifixspanflex'>
                                            <span id=''>
                                                {otherIcons.name_svg}
                                                <CustomDropdown10
                                                    label="Select vendor"
                                                    options={vendorList?.data?.user?.filter((val => val?.active === "1"))}
                                                    value={formData?.vendor_id}
                                                    onChange={handleChange}
                                                    name="vendor_id"
                                                    defaultOption="Select Vendor Name"
                                                    setcusData={setcusData}
                                                    type="vendor"
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




                                            {showPopup === "billingAdd" || showPopup === "shippingAdd" ? (
                                                <div className="mainxpopups1" ref={popupRef1}>
                                                    <div className="popup-content" >
                                                        <span className="close-button" onClick={() => setShowPopup("")}><RxCross2 /></span>
                                                        <div className="midpopusec12x">
                                                            <div className=""
                                                            >
                                                                {/* <p>Change Address</p> */}
                                                                <div className='checkboxcontainer5s'>

                                                                    <div className="form_commonblock">
                                                                        <label>{showPopup === "shippingAdd" ? "Shipping Address" : "Billing Address"}</label>
                                                                        <div className='checkboxcontainer5s'>

                                                                            {/* <label>
                                                                                <input type="checkbox" name='is_shipping' checked={udateAddress?.is_shipping === "1"} onChange={(e) => handleAllAddressChange(e, 'Shipping')} />
                                                                                Shipping Address
                                                                            </label> */}

                                                                            {/* <label>
                                                                                <input type="checkbox" name='is_billing' checked={udateAddress?.is_billing === "1"} onChange={(e) => handleAllAddressChange(e, 'Billing')} />
                                                                                Billing Address
                                                                            </label> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form_commonblock">
                                                                    <label >Street 1<b className='color_red'>*</b></label>
                                                                    <span >
                                                                        {otherIcons.tag_svg}
                                                                        <input type="text" value={udateAddress?.street_1} required
                                                                            placeholder='Select street_1'
                                                                            onChange={(e) => handleAllAddressChange(e)} name='street_1'
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="form_commonblock">
                                                                    <label >Street 2<b className='color_red'>*</b></label>
                                                                    <span >
                                                                        {otherIcons.tag_svg}
                                                                        <input type="text" value={udateAddress?.street_2} required
                                                                            placeholder='Select street_2'
                                                                            onChange={(e) => handleAllAddressChange(e)}
                                                                            name='street_2'
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="form_commonblock">
                                                                    <label >Phone Number<b className='color_red'>*</b></label>
                                                                    <span >
                                                                        {otherIcons.tag_svg}
                                                                        <NumericInput
                                                                            value={udateAddress.phone_no} required
                                                                            placeholder='Select phone_no'
                                                                            onChange={(e) => handleAllAddressChange(e)}
                                                                            name='phone_no'
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="form_commonblock">
                                                                    <label >Fax Number<b className='color_red'>*</b></label>
                                                                    <span >
                                                                        {otherIcons.tag_svg}
                                                                        <input type="text" value={udateAddress.fax_no} required
                                                                            placeholder='Select fax_no'
                                                                            onChange={(e) => handleAllAddressChange(e)}
                                                                            name='fax_no'
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="form_commonblock">
                                                                    <label >Zip Code<b className='color_red'>*</b></label>
                                                                    <span >
                                                                        {otherIcons.tag_svg}
                                                                        <input type="text" value={udateAddress.zip_code} required
                                                                            placeholder='Select zip_code'
                                                                            onChange={(e) => handleAllAddressChange(e)}
                                                                            name='zip_code'
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div className="form_commonblock">
                                                                    <button type="button" onClick={() => updateAddressHandler()}>Update Address</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ""}

                                            {showPopup === "billing" && (
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
                                            }

                                            {/* popup code */}
                                        </div>

                                        {vendorAddress?.loading ? <Loader02 /> : <></>}
                                        {!cusData ? "" :
                                            <>
                                                <div className="showCustomerDetails">
                                                    {!viewAllCusDetails &&
                                                        <div className="cus_fewDetails">
                                                            <div className="cust_dex1s1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#0d54b8"} fill={"none"}>
                                                                    <path d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z" stroke="currentColor" strokeWidth="1.5" />
                                                                    <path d="M18.2222 17C19.6167 18.9885 20.2838 20.0475 19.8865 20.8999C19.8466 20.9854 19.7999 21.0679 19.7469 21.1467C19.1724 22 17.6875 22 14.7178 22H9.28223C6.31251 22 4.82765 22 4.25311 21.1467C4.20005 21.0679 4.15339 20.9854 4.11355 20.8999C3.71619 20.0475 4.38326 18.9885 5.77778 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    <path d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z" stroke="currentColor" strokeWidth="1.5" />
                                                                </svg> Delevery Address
                                                            </div>


                                                            <div className="cust_dex1s2">
                                                                <div className="cust_dex1s2s1">
                                                                    {!addSelect?.billing ? "No billing address is found" : <>
                                                                        <p className='dex1s2schilds1'>Billing Address <button type='button' onClick={() => showAllAddress("billing")}>show all</button></p>
                                                                        <button type='button' onClick={() => changeAddress(addSelect?.billing, "billingAdd")}>Change Address</button>
                                                                        < p className='dex1s2schilds2' > Customer Name: {`${cusData?.first_name} ${cusData?.last_name}`} </p>

                                                                        <p>  Street1:
                                                                            {vendorAddress?.loading ? "loading" : <>{addressVendor ? addressVendor?.street_1 : addSelect?.billing?.street_1}</>}
                                                                        </p>
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

                                                                        <p className='dex1s2schilds1'>Shipping address <button type='button' onClick={() => showAllAddress("shipping")}>show all</button>

                                                                        </p>
                                                                        <button type='button' onClick={() => changeAddress(addSelect?.shipping, "shippingAdd")}>Change Address</button>
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

                                                </div>
                                                <ViewVendorsDetails
                                                    setSwitchCusDatax1={setSwitchCusDatax1}
                                                    setViewAllCusDetails={setViewAllCusDetails}
                                                    cusData={cusData}
                                                    addSelect={addSelect}
                                                    viewAllCusDetails={viewAllCusDetails}
                                                    switchCusDatax1={switchCusDatax1} />
                                            </>
                                        }

                                        <DeleveryAddress />

                                    </div>


                                    <div className="f1wrapofcreqx1">
                                        <div className="form_commonblock">
                                            <label >Purchase Order Number<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.tag_svg}
                                                <input type="text" value={formData.purchase_order_id} required
                                                    placeholder='Select Purchase Order Number'
                                                    onChange={handleChange}
                                                    name='purchase_order_id'
                                                />

                                            </span>
                                        </div>




                                        <div className="form_commonblock ">
                                            <label >Reference<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input type="text" value={formData.reference} onChange={handleChange}
                                                    // disabled
                                                    required
                                                    name='reference'
                                                    placeholder='Enter Reference Number' />
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
                                                    type="currency"
                                                />
                                            </span>
                                        </div>

                                        <div className="form_commonblock">
                                            <label>Date</label>
                                            <span>
                                                {otherIcons.date_svg}
                                                <DatePicker
                                                    selected={formData.transaction_date}
                                                    onChange={(date) => setFormData({ ...formData, transaction_date: formatDate(date) })}
                                                    name='transaction_date'
                                                    required
                                                    placeholderText="Enter Shipping Date"
                                                    dateFormat="dd-MM-yyy"
                                                />
                                            </span>
                                        </div>

                                        <div className="form_commonblock">
                                            <label >Expected Delivery Date<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.date_svg}
                                                <DatePicker autoComplete='off' selected={formData.expected_delivery_Date} onChange={handleDateChange} name='expected_delivery_Date' required placeholderText="Enter Purchase Order Date"
                                                    dateFormat="dd-MM-yyy"
                                                />
                                            </span>
                                        </div>


                                        <div className="form_commonblock">
                                            <label >Place Of Supply<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input
                                                    type="text" required
                                                    value={formData.place_of_supply}
                                                    onChange={handleChange}
                                                    name='place_of_supply'

                                                    placeholder='Enter Place Of Supply'
                                                />
                                            </span>
                                        </div>

                                        <div className="form_commonblock ">
                                            <label >Payment Terms</label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}

                                                <CustomDropdown04
                                                    label="Payment Terms"
                                                    options={masterData?.filter(type => type.type === "8")}
                                                    value={formData.payment_terms}
                                                    onChange={handleChange}
                                                    name="payment_terms"
                                                    defaultOption="Select Payment Terms"
                                                    autoComplete='off'
                                                    type="masters"
                                                />
                                            </span>
                                        </div>

                                        <div className="form_commonblock">
                                            <label>Shipment Preference</label>
                                            <span >
                                                {otherIcons.vendor_svg}
                                                <input
                                                    type="text"
                                                    value={formData.sale_person}
                                                    name='sale_person'
                                                    onChange={handleChange}
                                                    placeholder='Enter Sales Person'
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
                                                            {/* <CustomDropdown11
                                                                label="Item Name"
                                                                options={itemList?.data?.item}
                                                                value={item.item_id}
                                                                onChange={(e) => handleItemChange(index, 'item_id', e.target.value, e.target.option)}
                                                                name="item_id"
                                                                defaultOption="Select Item"
                                                                setItemData={setItemData}
                                                            /> */}

                                                            <CustomDropdown03
                                                                options={itemList?.data?.item || []}
                                                                v value={item.item_id}
                                                                onChange={(e) => handleItemChange(index, 'item_id', e.target.value, e.target.option)}
                                                                name="item_id"
                                                                type="select_item"
                                                                setItemData={setItemData}
                                                                setShowPopup={setShowPopup1}
                                                                defaultOption="Select Item"
                                                            />
                                                        </span>
                                                    </div>
                                                    {/* {showPopup1 === true ?
                                                        <div className="mainxpopups2">
                                                            <div className="popup-content02">
                                                                <CreateItemPopup closePopup={setShowPopup1}
                                                                // refreshCategoryListData1={refreshCategoryListData}
                                                                />
                                                            </div>
                                                        </div> : ""
                                                    } */}
                                                    <div className="tablsxs1a2">
                                                        <NumericInput
                                                            value={item.rate}
                                                            placeholder="0.00"
                                                            onChange={(e) => {
                                                                let newValue = e.target.value;
                                                                if (newValue < 0) newValue = 0;
                                                                if (!isNaN(newValue) && newValue >= 0) {
                                                                    handleItemChange(index, "rate", newValue);
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
                                                        <NumericInput
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
                                                            <NumericInput
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
                                                                    console.log("item.discount", item.discount)
                                                                }}
                                                            />


                                                            <div
                                                                className="dropdownsdfofcus56s"
                                                                onClick={() => handleDropdownToggle(index)}

                                                            >
                                                                {item.discount_type === 1 ? 'INR' : item.discount_type === 2 ? '%' : ''}
                                                                {openDropdownIndex === index && (
                                                                    <div className="dropdownmenucustomx1" ref={dropdownRef}>
                                                                        <div className='dmncstomx1' onClick={() => handleItemChange(index, 'discount_type', 1)}>INR</div>
                                                                        <div className='dmncstomx1' onClick={() => handleItemChange(index, 'discount_type', 2)}>%</div>
                                                                    </div>
                                                                )}
                                                            </div>


                                                        </span>
                                                    </div>



                                                    <div className="tablsxs1a5">
                                                        {item.tax_name === "Taxable" && (
                                                            <NumericInput
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
                                                        <NumericInput
                                                            value={item.final_amount}
                                                            placeholder="0.00"
                                                            onChange={(e) => handleItemChange(index, 'final_amount', e.target.value)}
                                                            readOnly
                                                        />
                                                    </div>

                                                    {formData?.items?.length > 1 ? (
                                                        <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)} onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                                handleItemRemove(index);
                                                            }
                                                        }}
                                                        > <RxCross2 /> </button>
                                                    ) : (
                                                        <button className='removeicoofitemrow' type="button" onClick={() => handleItemReset(index)} onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                                handleItemReset(index);
                                                            }
                                                        }}
                                                        > <SlReload /> </button>
                                                    )}
                                                </div>
                                            </>


                                        ))}
                                    </div>


                                    <button id='additembtn45srow' type="button" onClick={handleItemAdd} ref={buttonRef}
                                    >Add New Row<GoPlus /></button>


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
                                                    <label>Subtotal:</label>
                                                    <NumericInput
                                                        value={formData.subtotal}
                                                        readOnly
                                                        placeholder='0.00'
                                                        className='inputsfocalci465s'
                                                    />
                                                </div>
                                                <div className='clcsecx12s1'>
                                                    <label>Shipping Charge:</label>
                                                    <NumericInput
                                                        className='inputsfocalci4'
                                                        value={formData.shipping_charge}
                                                        onChange={handleShippingChargeChange}
                                                        placeholder='0.00'
                                                    />
                                                </div>
                                                <div className='clcsecx12s1'>
                                                    <label>Adjustment Charge:</label>
                                                    <NumericInput
                                                        className='inputsfocalci4'
                                                        value={formData.adjustment_charge}
                                                        onChange={handleAdjustmentChargeChange}
                                                        placeholder='0.00'
                                                    />
                                                </div>
                                                {!formData?.items[0]?.item_id ?
                                                    <b className='idofbtagwarninhxs5'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#f6b500"} fill={"none"}>
                                                        <path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="currentColor" strokeWidth="1.5" />
                                                        <path d="M12.2422 17V13C12.2422 12.5286 12.2422 12.2929 12.0957 12.1464C11.9493 12 11.7136 12 11.2422 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M11.992 8.99997H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>To edit the shipping and adjustment charge, select an item first.</b> : ''}
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
                                            <label>Terms And Conditions</label>
                                            <textarea
                                                placeholder='Enter the terms and conditions of your business to be displayed in your transaction '
                                                value={formData.terms_and_condition}
                                                onChange={handleChange}
                                                name='terms_and_condition'
                                            />
                                        </div>

                                        <div id="imgurlanddesc" className='calctotalsectionx2'>
                                            <div className="form-group" >
                                                <label>Upload Image</label>
                                                <div className="file-upload" tabIndex="0" onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        const input = document.getElementById('file');
                                                        input.click(); // Simulate a click event to open the file selection popup
                                                    }
                                                }}>

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

export default CreatePurchaseOrder;
