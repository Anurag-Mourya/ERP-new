import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { quotationDetails, updateQuotation } from '../../../Redux/Actions/quotationActions';
import { customersList } from '../../../Redux/Actions/customerActions';
import CustomDropdown10 from '../../../Components/CustomDropdown/CustomDropdown10';
import CustomDropdown11 from '../../../Components/CustomDropdown/CustomDropdown11';
import { itemLists } from '../../../Redux/Actions/listApisActions';
import DatePicker from "react-datepicker";
import Loader02 from '../../../Components/Loaders/Loader02'

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
import ViewCustomerDetails from './ViewCustomerDetails';
const CreateQuotation = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const cusList = useSelector((state) => state?.customerList);
    const itemList = useSelector((state) => state?.itemList);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    const addUpdate = useSelector((state) => state?.updateAddress);
    const quoteDetail = useSelector((state) => state?.quoteDetail);
    const quoteDetails = quoteDetail?.data?.data?.quotation;
    const [cusData, setcusData] = useState(null);
    const [switchCusDatax1, setSwitchCusDatax1] = useState("Details");
    const [itemData, setItemData] = useState({});
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());
    const [formData, setFormData] = useState({
        sale_type: 'quotation',
        transaction_date: new Date(),
        warehouse_id: localStorage.getItem('selectedWarehouseId') || '',
        quotation_id: 'QT-2024',
        customer_id: '',
        upload_image: null,
        customer_type: null,
        customer_name: null,
        phone: null,
        email: null,
        address: [{}],
        reference_no: "",
        subject: "",
        currency: '',
        place_of_supply: '',
        expiry_date: new Date(),
        sale_person: '',
        customer_note: null,
        terms_and_condition: null,
        fy: localStorage.getItem('FinancialYear') || 2024,
        subtotal: null,
        shipping_charge: null,
        adjustment_charge: null,
        total: null,
        status: '',
        items: [
            {

                item_id: "",
                quantity: 1,
                gross_amount: null,
                final_amount: null,
                tax_rate: null,
                tax_amount: null,
                discount: 0,
                discount_type: 1,
                item_remark: null,
                tax_name: ""
            }
        ],
    });

    const [loading, setLoading] = useState(false);

    const handleItemAdd = () => {
        const newItems = [...formData?.items, {
            item_id: '',
            quantity: 1,
            gross_amount: null,
            final_amount: null,
            tax_rate: null,
            tax_amount: 0,
            discount: 0,
            discount_type: 1,
            item_remark: null,
            tax_name: ""

        }];
        setFormData({ ...formData, items: newItems });
    };


    // edit and update quotations

    // console.log("edit", cusData)


    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'shipping_charge' || name === 'adjustment_charge') {
            newValue = parseFloat(value) || 0; // Convert to float or default to 0
        }

        // Convert empty string to zero
        if (newValue === '') {
            newValue = 0;
        }

        if (name === "customer_id") {
            const selectedItem = cusList?.data?.user?.find(cus => cus.id == value);

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
            total: calculateTotal(formData.subtotal, formData.shipping_charge, formData.adjustment_charge),
            address: addSelect ? JSON.stringify(addSelect) : null, // Convert address array to string if addSelect is not null
        });
    };






    const popupRef = useRef(null);

    // addresssssssssssssssssssssssssssssssssssssssssssssssssssssssss

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
    })
    // updateAddress State addUpdate
    // console.log("updated Address state", udateAddress)
    // for address select
    const [addSelect, setAddSelect] = useState({
        billing: "",
        shipping: ""
    });

    // console.log("addSelect", addSelect)

    //set selected billing and shipping addresses inside formData
    useEffect(() => {
        setFormData({
            ...formData,
            address: addSelect
        })
    }, [addSelect])
    //set selected billing and shipping addresses inside formData

    // console.log("formData", formData)
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
    // for address select


    //show all addresses popup....
    const popupRef1 = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    // Change address
    const changeAddress = (val) => {
        setShowPopup("showAddress")
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

        if (type === 'Shipping') {
            setUpdateAddress({
                ...udateAddress,
                is_shipping: checked ? "1" : "0"
            })
        } else if (type === 'Billing') {
            setUpdateAddress({
                ...udateAddress,
                is_billing: checked ? "1" : "0"
            })
        }

    };
    // Change address handler

    // update Address Handler
    const [clickTrigger, setClickTrigger] = useState(false);
    const updateAddressHandler = () => {
        try {

            dispatch(updateAddresses(udateAddress)).then(() => {
                setShowPopup("");
                setClickTrigger((prevTrigger) => !prevTrigger);
                if (udateAddress?.is_shipping === "0") {
                    setAddSelect({
                        ...addSelect,
                        shipping: undefined,
                    })
                } else if (udateAddress?.is_billing === "0") {
                    setAddSelect({
                        ...addSelect,
                        billing: undefined,
                    })
                }
            })
        } catch (e) {
            toast.error("error", e)
        }
    }
    // update Address Handler

    //trigger show updated address then it updated
    useEffect(() => {
        if (addSelect?.billing) {
            // console.log("addreupdate response", addUpdate?.data?.address)
            setAddSelect({
                ...addSelect,
                billing: addUpdate?.data?.address,
            })
        } if (addSelect?.shipping) {
            setAddSelect({
                ...addSelect,
                shipping: addUpdate?.data?.address,
            })
        }

    }, [addUpdate])
    //trigger show updated address then it updated

    // addresssssssssssssssssssssssssssssssssssssssssssssssssssssssss


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
            if (selectedItem) {
                newItems[index].gross_amount = selectedItem.price;
                if (selectedItem.tax_preference === "1") {
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

    const [buttonClicked, setButtonClicked] = useState(null);

    const handleButtonClicked = (status) => {
        setButtonClicked(status);
    };

    const Navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!buttonClicked) {
            toast.error('Please select an action (Save as draft or Save and send).');
            return;
        }
        setLoading(true);
        try {
            // const { tax_name, ...formDataWithoutTaxName } = formData;
            const updatedItems = formData?.items?.map((item) => {
                const { tax_name, ...itemWithoutTaxName } = item;
                return itemWithoutTaxName;
            });
            await dispatch(updateQuotation({ ...formData, items: updatedItems }, Navigate));
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
            customer_name: cusData ? cusData?.customer_name : '',
            email: cusData?.email,
            phone: cusData?.phone,
            // address: cusData?.address?.length,
            address: addSelect

        }));
    }, [cusData]);

    useEffect(() => {
        dispatch(itemLists({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(fetchCurrencies());

        if (itemId && isEdit) {
            dispatch(quotationDetails({ id: itemId }))
        }

    }, [dispatch]);

    useEffect(() => {
        dispatch(customersList({ fy: localStorage.getItem('FinancialYear') }));
    }, [dispatch, clickTrigger]);

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            transaction_date: date,
        });
    };


    const handleItemRemove = (index) => {
        const newItems = formData?.items.filter((item, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };


    // dropdown
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
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
        uploadBytes(imageRef, e.target?.files[0])
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


    const handleItemReset = (index) => {
        const newItems = [...formData?.items];
        newItems[index] = {
            item_id: '',
            quantity: 1,
            gross_amount: 0,
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

    useEffect(() => {
        if (itemId && isEdit && quoteDetails) {
            const itemsFromApi = quoteDetails.items?.map(item => ({
                item_id: (+item?.item_id),
                quantity: (+item?.quantity),
                gross_amount: (+item?.gross_amount),
                final_amount: (+item?.final_amount),
                tax_rate: (+item?.tax_rate),
                tax_amount: (+item?.tax_amount),
                discount: (+item?.discount),
                discount_type: (+item?.discount_type),
                item_remark: item?.item_remark,
                tax_name: item?.item?.tax_preference === "1" ? "Taxable" : "Non-Taxable"
            }));

            setFormData({
                id: quoteDetails.id,
                sale_type: 'quotation',
                transaction_date: quoteDetails.created_at,
                warehouse_id: quoteDetails.warehouse_id,
                quotation_id: quoteDetails.quotation_id,
                customer_id: (+quoteDetails.customer_id),
                upload_image: quoteDetails.upload_image,
                customer_type: quoteDetails.customer_type,
                customer_name: quoteDetails.customer_name,
                phone: quoteDetails.phone,
                email: quoteDetails.email,
                reference_no: quoteDetails.reference_no,
                subject: quoteDetails.subject,
                currency: quoteDetails.currency,
                place_of_supply: quoteDetails.customer?.place_of_supply,
                expiry_date: quoteDetails.expiry_date,
                sale_person: quoteDetails.sale_person,
                customer_note: quoteDetails.customer_note,
                terms_and_condition: quoteDetails.terms_and_condition,
                fy: quoteDetails.fy,
                subtotal: quoteDetails.subtotal,
                shipping_charge: quoteDetails.shipping_charge,
                adjustment_charge: quoteDetails.adjustment_charge,
                total: quoteDetails.total,
                status: quoteDetails.status,
                items: itemsFromApi || []
            });

            if (quoteDetails.upload_image) {
                setImgeLoader("success");
            }

            const parsedAddress = JSON?.parse(quoteDetails?.address);

            const dataWithParsedAddress = {
                ...quoteDetails,
                address: parsedAddress
            };
            setAddSelect({
                billing: dataWithParsedAddress?.address?.billing,
                shipping: dataWithParsedAddress?.address?.shipping,
            });

            setcusData(dataWithParsedAddress);
        }
    }, [quoteDetails, itemId, isEdit]);
    // console.log("fromdata", formData)
    return (
        <>
            {quoteDetail?.loading === true ? <Loader02 /> : <>
                <TopLoadbar />
                {loading && <MainScreenFreezeLoader />}
                {freezLoadingImg && <MainScreenFreezeLoader />}
                {addUpdate?.loading && <MainScreenFreezeLoader />}

                <div className='formsectionsgrheigh'>
                    <div id="Anotherbox" className='formsectionx1'>
                        <div id="leftareax12">
                            <h1 id="firstheading">
                                {otherIcons.quoation_svg}
                                New Quotation
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

                                                {cusData &&
                                                    <div className="view_all_cus_deial_btn">
                                                        {viewAllCusDetails === true ?
                                                            <button type="button" onClick={() => setViewAllCusDetails(false)}>Hide customer information</button>
                                                            :
                                                            <button type="button" onClick={() => setViewAllCusDetails(true)}>View customer information</button>

                                                        }
                                                    </div>
                                                }
                                                {/* popup code */}




                                                {showPopup === "showAddress" && (
                                                    <div className="mainxpopups1" ref={popupRef1}>
                                                        <div className="popup-content" >
                                                            <span className="close-button" onClick={() => setShowPopup("")}><RxCross2 /></span>
                                                            <div className="midpopusec12x">
                                                                <div className=""
                                                                >
                                                                    {/* <p>Change Address</p> */}
                                                                    <div className='checkboxcontainer5s'>

                                                                        <div className="form_commonblock">
                                                                            <label >Address type<b className='color_red'>*</b></label>
                                                                            <div className='checkboxcontainer5s'>

                                                                                <label>
                                                                                    <input type="checkbox" name='is_shipping' checked={udateAddress?.is_shipping === "1"} onChange={(e) => handleAllAddressChange(e, 'Shipping')} />
                                                                                    Shipping address
                                                                                </label>

                                                                                <label>
                                                                                    <input type="checkbox" name='is_billing' checked={udateAddress?.is_billing === "1"} onChange={(e) => handleAllAddressChange(e, 'Billing')} />
                                                                                    Billing address
                                                                                </label>
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
                                                                        <label >Phone number<b className='color_red'>*</b></label>
                                                                        <span >
                                                                            {otherIcons.tag_svg}
                                                                            <input type="number" value={udateAddress.phone_no} required
                                                                                placeholder='Select phone_no'
                                                                                onChange={(e) => handleAllAddressChange(e)}
                                                                                name='phone_no'
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                    <div className="form_commonblock">
                                                                        <label >Fax number<b className='color_red'>*</b></label>
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
                                                )}

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
                                                                    </svg> Customer address
                                                                </div>


                                                                <div className="cust_dex1s2">
                                                                    {/* <label >Customer full Name :  {cusData?.first_name + " " + cusData?.last_name}</label> */}
                                                                    <div className="cust_dex1s2s1">
                                                                        {!addSelect?.billing ? "No billing address is found" : <>
                                                                            <p className='dex1s2schilds1'>Billing address
                                                                                {isEdit && itemId ? "" :
                                                                                    < button type='button' onClick={() => setShowPopup("billing")}>show all</button>
                                                                                }

                                                                            </p>
                                                                            <button type='button' onClick={() => changeAddress(addSelect?.billing)}>Change Address</button>

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

                                                                            <p className='dex1s2schilds1'>Shipping address   {isEdit && itemId ? "" :
                                                                                < button type='button' onClick={() => setShowPopup("billing")}>show all</button>
                                                                            }</p>
                                                                            <button type='button' onClick={() => changeAddress(addSelect?.shipping)}>Change Address</button>
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

                                                    <ViewCustomerDetails
                                                        setSwitchCusDatax1={setSwitchCusDatax1} setViewAllCusDetails={setViewAllCusDetails}
                                                        cusData={cusData}
                                                        addSelect={addSelect}
                                                        viewAllCusDetails={viewAllCusDetails}
                                                        switchCusDatax1={switchCusDatax1} />

                                                </>
                                            }

                                        </div>


                                        <div className="f1wrapofcreqx1">

                                            <div className="form_commonblock">
                                                <label >Quotation Date<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.date_svg}
                                                    <DatePicker selected={formData.transaction_date} onChange={handleDateChange} name='transaction_date' required placeholderText="Enter Quotation Date" />
                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label >Quotation ID<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.tag_svg}
                                                    <input type="text" value={formData.quotation_id} required
                                                        placeholder='Select quotation date'
                                                        onChange={handleChange}
                                                        name='quotation_id'
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

                                            <div className="form_commonblock">
                                                <label>Expiry Date</label>
                                                <span>
                                                    {otherIcons.date_svg}
                                                    <DatePicker
                                                        selected={formData.expiry_date}
                                                        onChange={(date) => setFormData({ ...formData, expiry_date: date })}
                                                        name='expiry_date'
                                                        required
                                                        placeholderText="Enter Expiry Date"
                                                    />
                                                </span>
                                            </div>




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
                                                <label >reference<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input type="text" value={formData.reference_no} onChange={handleChange}
                                                        // disabled
                                                        required
                                                        name='reference_no'
                                                        placeholder='Enter Reference no' />
                                                </span>
                                            </div>

                                            <div className="form_commonblock ">
                                                <label >Subject</label>
                                                <span >
                                                    {otherIcons.placeofsupply_svg}
                                                    <input type="text" value={formData.subject} onChange={handleChange}
                                                        // disabled
                                                        name='subject'
                                                        placeholder='Enter Subject' />
                                                </span>
                                            </div>

                                            <div className="form_commonblock">
                                                <label>Sales Person</label>
                                                <span >
                                                    {otherIcons.vendor_svg}
                                                    <input
                                                        type="text"
                                                        value={formData.sale_person}
                                                        name='sale_person'
                                                        onChange={handleChange}
                                                        placeholder='Enter Sales person'
                                                    />
                                                </span>
                                            </div>


                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                    {/* </div> */}



                                    <div className="f1wrpofcreqsx2">
                                        {/* <div className="taxtypedropdownx" onClick={() => setShowDropdownx1(!showDropdownx1)} ref={dropdownRef}><span>TAX Type or x1</span>

                                        {showDropdownx1 && (
                                            <div className="dropdownmenucustomx2">
                                                <div className='dmncstomx1'
                                                >Inclusive</div>
                                                <div className='dmncstomx1'
                                                >Exclusive</div>
                                            </div>
                                        )}
                                    </div> */}


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
                                                                    value={item.item_id}
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
                                                                {/* <input
                                                                type="number"
                                                                value={item.discount}
                                                                onChange={(e) => handleItemChange(index, 'discount', e.target.value)}

                                                            /> */}
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



                                                        {/* <label>Tax Amount:</label>
                                <input
                                    type="number"
                                    value={item.tax_amount}
                                    onChange={(e) => handleItemChange(index, 'tax_amount', e.target.value)}
                                    
                                /> */}



                                                        <div className="tablsxs1a6">
                                                            <input
                                                                type="number"
                                                                value={item.final_amount}
                                                                placeholder="0.00"
                                                                onChange={(e) => handleItemChange(index, 'final_amount', e.target.value)}
                                                                readOnly
                                                            />
                                                        </div>


                                                        {/* <label>Item Remark:</label>
                                <textarea
                                    value={item.item_remark}
                                    onChange={(e) => handleItemChange(index, 'item_remark', e.target.value)}
                                /> */}
                                                        {formData?.items.length > 1 ? (
                                                            <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}> <RxCross2 /> </button>
                                                        ) : (
                                                            <button className='removeicoofitemrow' type="button" onClick={() => handleItemReset(index)}> <SlReload /> </button>
                                                        )}

                                                        {/* <button className='removeicoofitemrow' type="button" onClick={() => handleItemRemove(index)}><RxCross2 /></button> */}
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
                                                    value={formData.customer_note}
                                                    onChange={handleChange}
                                                    name='customer_note'
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
                                                            onChange={(e) => {
                                                                const shippingCharge = e.target.value || '0';
                                                                const total = parseFloat(formData.subtotal) + parseFloat(shippingCharge) + parseFloat(formData.adjustment_charge || 0);
                                                                setFormData({ ...formData, shipping_charge: shippingCharge, total: total.toFixed(2) });
                                                            }}
                                                            placeholder='0.00'
                                                            disabled={!formData?.items[0]?.item_id}
                                                        />
                                                    </div>
                                                    <div className='clcsecx12s1'>
                                                        <label>Adjustment Charge:</label>
                                                        <input
                                                            className='inputsfocalci4'
                                                            type="number"
                                                            value={formData.adjustment_charge}
                                                            onChange={(e) => {
                                                                const adjustmentCharge = e.target.value || '0';
                                                                const total = parseFloat(formData.subtotal) + parseFloat(formData.shipping_charge || 0) + parseFloat(adjustmentCharge);
                                                                setFormData({ ...formData, adjustment_charge: adjustmentCharge, total: total.toFixed(2) });
                                                            }}
                                                            disabled={!formData?.items[0]?.item_id}
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

                                    {isEdit && itemId ?
                                        <button className="firstbtnc1" type="submit" onClick={() => handleButtonClicked('sent')} disabled={loading}> {loading ? 'Updating...' : 'Update and send'}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                                                <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button> :
                                        <button className="firstbtnc1" type="submit" onClick={() => handleButtonClicked('sent')} disabled={loading}> {loading ? 'Submiting...' : 'Save and send'}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                                                <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    }

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

export default CreateQuotation;
