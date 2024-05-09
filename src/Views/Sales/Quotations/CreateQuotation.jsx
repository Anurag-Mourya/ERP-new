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
import { itemLists } from '../../../Redux/Actions/listApisActions';
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
const CreateQuotation = () => {
    const dispatch = useDispatch();
    const cusList = useSelector((state) => state?.customerList);
    const itemList = useSelector((state) => state?.itemList);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    const [cusData, setcusData] = useState(null);
    const [switchCusDatax1, setSwitchCusDatax1] = useState("Details");
    const [itemData, setItemData] = useState({});
    const [viewAllCusDetails, setViewAllCusDetails] = useState(false);
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
        address: null,

        reference_no: "",
        subject: "",
        currency: '',

        place_of_supply: '',
        expiry_date: new Date(),
        sale_person: '',
        // project_name: '',
        customer_note: null,
        terms: null,
        fy: localStorage.getItem('FinancialYear') || 2024,
        subtotal: null,
        shipping_charge: null,
        adjustment_charge: null,
        total: null,
        items: [
            {

                item_id: '',
                quantity: 1,
                gross_amount: null,
                final_amount: null,
                tax_rate: null,
                tax_amount: null,
                discount: 0,
                discount_type: 1,
                item_remark: null,
            }
        ],
    });
    
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
    
        if (name === 'shipping_charge' || name === 'adjustment_charge') {
            newValue = parseFloat(value) || 0; // Convert to float or default to 0
        }
    
        setFormData({
            ...formData,
            [name]: newValue,
            total: calculateTotal(formData.subtotal, newValue, formData.adjustment_charge),
        });
    };
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

    
    const handleItemChange = (index, field, value, data) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        const item = newItems[index];
        let discountAmount = 0;
        let discountPercentage = 0;
    
        if (field === 'item_id') {
            // Update item price based on selected item
            const selectedItem = itemList?.data?.item.find(item => item.id === value);
            if (selectedItem) {
                newItems[index].gross_amount = selectedItem.price;
                newItems[index].tax_rate = selectedItem.tax_rate;
            }
        }
    
        // Calculate final amount
        if (item.discount_type === 1) {
            // Discount in INR
            discountAmount = Math.min(item.discount, item.gross_amount * item.quantity);
        } else if (item.discount_type === 2) {
            // Discount in percentage
            discountPercentage = Math.min(item.discount, 100);
        }
    
        const grossAmount = item.gross_amount * item.quantity;
        const discount = item.discount_type === 1 ? discountAmount : (grossAmount * discountPercentage) / 100;
        const taxAmount = (grossAmount * item.tax_rate) / 100;
        const finalAmount = grossAmount + taxAmount - discount;
    
        newItems[index].final_amount = finalAmount.toFixed(2); // Round to 2 decimal places
    
        // Update subtotal
        const subtotal = newItems.reduce((acc, item) => acc + parseFloat(item.final_amount), 0);
    
        // Update total
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
            await dispatch(updateQuotation(formData));
            setLoading(false);
        } catch (error) {
            console.error('Error updating quotation:', error);
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
            address: cusData?.address.length,
        }));
    }, [cusData]);

    useEffect(() => {
        dispatch(customersList({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(itemLists({ fy: localStorage.getItem('FinancialYear') }));
        dispatch(fetchCurrencies());
    }, [dispatch]);

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            transaction_date: date,
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
    const showimagepopup = () => {
        OverflowHideBOdy(true); // Set overflow hidden
        setShowPopup(true); // Show the popup
    };
    const [imgLoader, setImgeLoader] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
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
                                                                    <p className='dex1s2schilds1'>Billing address</p>
                                                                    <p className='dex1s2schilds2'>Lucile <br />
                                                                        68868 Rohan Loop Apt. 752 <br />
                                                                        896 O'Keefe Run Suite 534 <br />
                                                                        Rahsaanside <br />
                                                                        Utah 204-184 <br />
                                                                        Tunisia <br />
                                                                        Phone: (468)-015-849 <br />
                                                                        Fax Number: 772.927.0210 x0880 </p>
                                                                </div>
                                                                <div className="seps23"></div>
                                                                <div className="cust_dex1s2s1">
                                                                    <p className='dex1s2schilds1'>Shipping address</p>
                                                                    <p className='dex1s2schilds2'>Lucile <br />
                                                                        68868 Rohan Loop Apt. 752 <br />
                                                                        896 O'Keefe Run Suite 534 <br />
                                                                        Rahsaanside <br />
                                                                        Utah 204-184 <br />
                                                                        Tunisia <br />
                                                                        Phone: (468)-015-849 <br />
                                                                        Fax Number: 772.927.0210 x0880 </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    {viewAllCusDetails &&
                                                        <>
                                                            <div className="cus_moreDetails">
                                                                <div className="cust_dex1s1">
                                                                    <Link to={`/dashboard/customer-details?id=${cusData?.id}`} target='_blank' className="childcusdexs12">
                                                                        <p>{cusData?.first_name + " " + cusData?.last_name}</p>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#0d54b8"} fill={"none"}>
                                                                            <path d="M11.1193 2.99756C6.55993 3.45035 2.99902 7.29809 2.99902 11.9777C2.99902 16.9619 7.03855 21.0024 12.0216 21.0024C16.7 21.0024 20.5468 17.4407 20.9996 12.8802" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            <path d="M20.5581 3.49381L11.0488 13.059M20.5581 3.49381C20.064 2.99905 16.7356 3.04517 16.032 3.05518M20.5581 3.49381C21.0521 3.98857 21.0061 7.3215 20.9961 8.02611" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>



                                                                    </Link>
                                                                    <div className="childcusdexs13" onClick={() => setViewAllCusDetails(false)}>
                                                                        <RxCross2 />
                                                                    </div>


                                                                </div>
                                                                <div className="cusparentofnavbarx5s">
                                                                    <p className={` ${switchCusDatax1 === "Details" && 'selectedbtnx3'}`} onClick={() => setSwitchCusDatax1("Details")}>Details</p>
                                                                    <p className={` ${switchCusDatax1 === "Contact_person" && 'selectedbtnx3'}`} onClick={() => setSwitchCusDatax1("Contact_person")}>Contact person</p>
                                                                    <p className={` ${switchCusDatax1 === "Activity_log" && 'selectedbtnx3'}`} onClick={() => setSwitchCusDatax1("Activity_log")}>Activity log</p>
                                                                </div>

                                                                {switchCusDatax1 === "Details" &&
                                                                    <>

                                                                        <div className="cust_dex1s2">
                                                                            <div className="cus1xs1">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                    <path d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z" stroke="currentColor" strokeWidth="1.5" />
                                                                                    <path d="M4 20C2.89543 20 2 19.1046 2 18C2 16.8954 2.89543 16 4 16C5.10457 16 6 17.3333 6 18C6 18.6667 5.10457 20 4 20Z" stroke="currentColor" strokeWidth="1.5" />
                                                                                    <path d="M8 20C6.89543 20 6 18.5 6 18C6 17.5 6.89543 16 8 16C9.10457 16 10 16.8954 10 18C10 19.1046 9.10457 20 8 20Z" stroke="currentColor" strokeWidth="1.5" />
                                                                                    <path d="M13 20H16C18.8284 20 20.2426 20 21.1213 19.1213C22 18.2426 22 16.8284 22 14V13C22 10.1716 22 8.75736 21.1213 7.87868C20.48 7.23738 19.5534 7.06413 18 7.01732M10 7H16C16.7641 7 17.425 7 18 7.01732M18 7.01732C18 6.06917 18 5.5951 17.8425 5.22208C17.6399 4.7421 17.2579 4.36014 16.7779 4.15749C16.4049 4 15.9308 4 14.9827 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 7.22876 2 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                </svg>
                                                                                <div className='spanfistrc1s5'>
                                                                                    <p>Outstanding receivables</p>
                                                                                    <h2>953</h2>
                                                                                </div>
                                                                            </div>

                                                                            <div className="cus1xs1">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                    <path d="M3.47022 4C3.35691 4.08553 3.24988 4.17937 3.14831 4.28231C2 5.44617 2 7.31938 2 11.0658V13.0526C2 16.7991 2 18.6723 3.14831 19.8361C4.29663 21 6.14481 21 9.84118 21H15.7221C17.8139 21 19.1166 21 20 20.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                    <path d="M18.8653 14.5C18.9521 14.2848 19.0001 14.0483 19.0001 13.8C19.0001 12.8059 18.2305 12 17.2813 12C17 12 16.7346 12.0707 16.5002 12.1961" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                    <path d="M18 7C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8118 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3H10C9.05436 3 8.22726 3 7.50024 3.01847M11.2427 7H16C18.8285 7 20.2427 7 21.1214 7.87868C22 8.75736 22 10.1716 22 13V15C22 15.9959 22 16.8164 21.9617 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                    <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                </svg>
                                                                                <div className='spanfistrc1s5'>
                                                                                    <p>Unused credits</p>
                                                                                    <h2>47</h2>
                                                                                </div>
                                                                            </div>

                                                                        </div>



                                                                        <div className="cust_dex1s3">
                                                                            <div className="cusx1s2">
                                                                                <div className="cuschildx1s2">Contact details</div>
                                                                                <div className="cuschichildlistd">
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Mobile number</p> <p className="px1s2">:</p> <p className="px1s3">+91-9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Work phone</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">User creation date</p> <p className="px1s2">:</p> <p className="px1s3">23 April, 2024</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Designation</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Department</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Company name</p> <p className="px1s2">:</p> <p className="px1s3">XTYX</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Payment terms</p> <p className="px1s2">:</p> <p className="px1s3">Due to receipt</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Department</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Department</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Department</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                    <div className='chilscx15s5sx1'> <p className="px1s1">Department</p> <p className="px1s2">:</p> <p className="px1s3">9764370162</p></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="cusx1s2">
                                                                                <div className="cuschildx1s2">
                                                                                    Address <p>10Total</p>
                                                                                </div>
                                                                                <div className="cuschichildlistdx2">

                                                                                    <div className='chilscx15s5sx1'>
                                                                                        <div className="psxjks40s1"> Shipping Address </div>
                                                                                        <div className="psxjks40s2">
                                                                                            <div> Lucile <br /> 68868 Rohan Loop Apt. 752<br /> 896 O'Keefe Run Suite 534<br /> Rahsaanside<br />Utah 204-184<br />Tunisia </div>
                                                                                            <div> Phone: (468)-015-849 <br /> Fax Number: 772.927.0210 x0880 </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="breakerci"></div>
                                                                                    <div className='chilscx15s5sx1'>
                                                                                        <div className="psxjks40s1"> Shipping Address </div>
                                                                                        <div className="psxjks40s2">
                                                                                            <div> Lucile <br /> 68868 Rohan Loop Apt. 752<br /> 896 O'Keefe Run Suite 534<br /> Rahsaanside<br />Utah 204-184<br />Tunisia </div>
                                                                                            <div> Phone: (468)-015-849 <br /> Fax Number: 772.927.0210 x0880 </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="breakerci"></div>
                                                                                    <div className='chilscx15s5sx1'>
                                                                                        <div className="psxjks40s1"> Shipping Address </div>
                                                                                        <div className="psxjks40s2">
                                                                                            <div> Lucile <br /> 68868 Rohan Loop Apt. 752<br /> 896 O'Keefe Run Suite 534<br /> Rahsaanside<br />Utah 204-184<br />Tunisia </div>
                                                                                            <div> Phone: (468)-015-849 <br /> Fax Number: 772.927.0210 x0880 </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="breakerci"></div>
                                                                                    <div className='chilscx15s5sx1'>
                                                                                        <div className="psxjks40s1"> Shipping Address </div>
                                                                                        <div className="psxjks40s2">
                                                                                            <div> Lucile <br /> 68868 Rohan Loop Apt. 752<br /> 896 O'Keefe Run Suite 534<br /> Rahsaanside<br />Utah 204-184<br />Tunisia </div>
                                                                                            <div> Phone: (468)-015-849 <br /> Fax Number: 772.927.0210 x0880 </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                }

                                                                {switchCusDatax1 === "Contact_person" &&
                                                                    <>
                                                                        <div className="contactpersonosc1s4sd54f">
                                                                            <div className="fistchils45s">
                                                                                <p className='cifs2x3s6z1'>FULL NAME</p>
                                                                                <p className='cifs2x3s6z2'>MOBILE NUMBER</p>
                                                                                <p className='cifs2x3s6z3'>WORK PHONE</p>
                                                                                <p className='cifs2x3s6z4'>EMAIL</p>
                                                                            </div>
                                                                            <div className="cs546sx2w52">
                                                                                <div className="tarowfistchils45s">
                                                                                    <p className='cifs2x3s6z1'>Mr. Customer</p>
                                                                                    <p className='cifs2x3s6z2'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z3'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z4'>sasa@gmail.com</p>
                                                                                </div>
                                                                                <div className="tarowfistchils45s">
                                                                                    <p className='cifs2x3s6z1'>Mr. Customer</p>
                                                                                    <p className='cifs2x3s6z2'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z3'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z4'>sasa@gmail.com</p>
                                                                                </div>
                                                                                <div className="tarowfistchils45s">
                                                                                    <p className='cifs2x3s6z1'>Mr. Customer</p>
                                                                                    <p className='cifs2x3s6z2'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z3'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z4'>sasa@gmail.com</p>
                                                                                </div>
                                                                                <div className="tarowfistchils45s">
                                                                                    <p className='cifs2x3s6z1'>Mr. Customer</p>
                                                                                    <p className='cifs2x3s6z2'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z3'>+91-2301157890</p>
                                                                                    <p className='cifs2x3s6z4'>sasa@gmail.com</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </>
                                                                }
                                                                {switchCusDatax1 === "Activity_log" &&
                                                                    <>
                                                                        <div className="activitylogxjks">
                                                                            <div className="childactivuytsd154">
                                                                                <div className="datscxs445sde">April 27, 2024</div>
                                                                                <div className="flexsd5fs6dx6w">
                                                                                    <div className="svgfiwithrolin">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                            <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <p className='sdf623ptag'>09.45AM</p>
                                                                                    <div className="descxnopcs45s">
                                                                                        <div className="chislsdf465s"><p>Payment to be collected</p> <b>By Mr.Arman</b></div>
                                                                                        <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim dis sem pretium gravida enim nunc.</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flexsd5fs6dx6w">
                                                                                    <div className="svgfiwithrolin">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                            <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <p className='sdf623ptag'>09.45AM</p>
                                                                                    <div className="descxnopcs45s">
                                                                                        <div className="chislsdf465s"><p>Payment to be collected</p> <b>By Mr.Arman</b></div>
                                                                                        <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim dis sem pretium gravida enim nunc.</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flexsd5fs6dx6w">
                                                                                    <div className="svgfiwithrolin">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                            <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <p className='sdf623ptag'>09.45AM</p>
                                                                                    <div className="descxnopcs45s">
                                                                                        <div className="chislsdf465s"><p>Payment to be collected</p> <b>By Mr.Arman</b></div>
                                                                                        <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim dis sem pretium gravida enim nunc.</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flexsd5fs6dx6w">
                                                                                    <div className="svgfiwithrolin">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                            <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <p className='sdf623ptag'>09.45AM</p>
                                                                                    <div className="descxnopcs45s">
                                                                                        <div className="chislsdf465s"><p>Payment to be collected</p> <b>By Mr.Arman</b></div>
                                                                                        <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim dis sem pretium gravida enim nunc.</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flexsd5fs6dx6w">
                                                                                    <div className="svgfiwithrolin">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                            <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <p className='sdf623ptag'>09.45AM</p>
                                                                                    <div className="descxnopcs45s">
                                                                                        <div className="chislsdf465s"><p>Payment to be collected</p> <b>By Mr.Arman</b></div>
                                                                                        <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim dis sem pretium gravida enim nunc.</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flexsd5fs6dx6w">
                                                                                    <div className="svgfiwithrolin">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} color={"#5c5c5c"} fill={"none"}>
                                                                                            <path d="M12.8809 7.01656L17.6538 8.28825M11.8578 10.8134L14.2442 11.4492M11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.2471 11.9765 17.9664Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                            <path d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <p className='sdf623ptag'>09.45AM</p>
                                                                                    <div className="descxnopcs45s">
                                                                                        <div className="chislsdf465s"><p>Payment to be collected</p> <b>By Mr.Arman</b></div>
                                                                                        <p className='c99atags56d'>Lorem ipsum dolor sit amet consectetur. Enim dis sem pretium gravida enim nunc.</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </div>
                                                        </>
                                                    }

                                                </div>

                                            </>
                                        }

                                    </div>


                                    <div className="f1wrapofcreqx1">

                                        <div className="form_commonblock">
                                            <label >Quotation Date<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.date_svg}
                                                {/* <input type="date" value={formData.transaction_date} onChange={handleChange}name='transaction_date'required/> */}
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
                                            <span >
                                                {otherIcons.date_svg}
                                                {/* <input type="date" value={formData.expiry_date} onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })} required/> */}
                                                <DatePicker selected={formData.expiry_date} onChange={handleChange} name='transaction_date'
                                                    placeholder="Enter Expiry Date" />
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


                                        {formData.items.map((item, index) => (
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
                                                            placeholder='0.00'
                                                            onChange={(e) => handleItemChange(index, 'gross_amount', e.target.value)}

                                                        />
                                                    </div>


                                                    <div className="tablsxs1a3">
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}

                                                        />
                                                    </div>



                                                    <div className="tablsxs1a4">
                                                        <span>
                                                            <input
                                                                type="number"
                                                                value={item.discount}
                                                                onChange={(e) => handleItemChange(index, 'discount', e.target.value)}

                                                            />

                                                            <div className="dropdownsdfofcus56s" onClick={() => setShowDropdown(!showDropdown)} ref={dropdownRef}>
                                                                {item.discount_type === 1 ? 'Inr' : item.discount_type === 2 ? '%' : ''}

                                                                {showDropdown && (
                                                                    <div className="dropdownmenucustomx1">
                                                                        <div className='dmncstomx1' onClick={() => handleItemChange(index, 'discount_type', 1)}>INR</div>
                                                                        <div className='dmncstomx1' onClick={() => handleItemChange(index, 'discount_type', 2)}>%</div>
                                                                    </div>
                                                                )}
                                                            </div>


                                                        </span>
                                                    </div>



                                                    <div className="tablsxs1a5">
                                                        <input
                                                            type="number"
                                                            value={parseInt(item.tax_rate)}
                                                            onChange={(e) => handleItemChange(index, 'tax_rate', e.target.value)}

                                                                readOnly
                                                            placeholder='0%'
                                                        />
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
                                                            <label className='imageviewico656s' htmlFor="" data-tooltip-id="my-tooltip" data-tooltip-content="View Item Image" onClick={showimagepopup} >
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
                                <Link to={"/dashboard/quotation"} className="firstbtnc2">
                                    Cancel
                                </Link>
                            </div>

                            {
                                showPopup && (
                                    <div className="mainxpopups2" ref={popupRef}>
                                        <div className="popup-content02">
                                            <span className="close-button02" onClick={() => setShowPopup(false)}><RxCross2 /></span>
                                            {<img src={formData?.upload_image} name="upload_image" alt="" height={500} width={500} />}
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </DisableEnterSubmitForm>
                </div>
            </div>
        </>
    );
};

export default CreateQuotation;
