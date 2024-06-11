//basic details for customer///
import React, { useEffect, useRef, useState } from 'react';
import { fetchCurrencies, fetchMasterData } from '../../../Redux/Actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import { MdCheck } from 'react-icons/md';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../../../Configs/Firebase/firebaseConfig';
import { v4 } from 'uuid';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { BsEye } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { OverflowHideBOdy } from '../../../Utils/OverflowHideBOdy';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12';
import CustomDropdown19 from '../../../Components/CustomDropdown/CustomDropdown19';

const registerationtypes = [
    {
        "id": 1,
        "type": "Registered",
        "labelid": "Registered",
        "label": "Registered",
        "value": "0"
    },
    {
        "id": 2,
        "type": "Un-Registered",
        "labelid": "Un-Registered",
        "label": "Un-Registered",
        "value": "0"
    }

]

const VendorBasicDetails = ({ updateUserData, switchCusData, customerData, tick, setTick }) => {
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const [showRegisterdFields, setShowRegisterdFields] = useState(false);

    const { isDublicate, isEdit, user } = customerData
    const { masterData } = useSelector(state => state?.masterData);
    const [customerName, setCustomerName] = useState(false);
    const [customerDisplayName, setCustomerDisplayName] = useState(false);
    const [customerMobile, setCustomerMobile] = useState(false);
    const [customerGST, setCustomerGST] = useState(false);
    const [customerPan, setCustomerPan] = useState(false);
    const [customerPlace, setCustomerPlace] = useState(false);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);

    const [basicDetails, setBasicDetails] = useState({
        salutation: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile_no: "",
        work_phone: "",
        customer_type: "Individual",
        is_vendor: 1,
        gst_no: "",
        pan_no: "",
        display_name: "",
        company_name: "",
        place_of_supply: "",
        tax_preference: 1,
        currency: 25,
        registration_type: "",
        upload_documents: [],
        opening_balance: "",
        department: "",
        designation: "",
    });
    console.log(basicDetails?.registration_type)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasicDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        // console.log("ddddddddd", name, value)

        if (name === "registration_type" && value === "Registered") {
            setShowRegisterdFields(true);
        } else if (name === "registration_type" && value === "Un-Registered") {
            setShowRegisterdFields(false);
        }
        if (name === "display_name") {

        }
    };

    useEffect(() => {
        if (basicDetails.display_name) {
            localStorage.setItem("display_name", basicDetails.display_name);
        }
    }, [basicDetails]);

    //return true for set tick mark if all required fields are filled
    const setTickBasicDetails = () => {
        const isBasicDetailsFilled =
            // basicDetails.salutation !== "" &&
            // basicDetails.first_name !== "" &&
            // basicDetails.last_name !== "" &&
            // basicDetails.email !== "" &&
            basicDetails.display_name !== "";
        // basicDetails.mobile_no !== "" &&
        // basicDetails.gst_no !== "" &&
        // basicDetails.pan_no !== "" &&
        // basicDetails.place_of_supply !== "";

        setTick({
            ...tick,
            basicTick: isBasicDetailsFilled,
        });
    }

    // Function to update displayNames based on basicDetails
    const [displayNames, setDisplayNames] = useState([]);

    useEffect(() => {
        const names = new Set(displayNames); // Use Set to avoid duplicates

        // Handle individual names
        if (basicDetails.salutation) names.add(basicDetails.salutation);
        if (basicDetails.first_name) names.add(basicDetails.first_name);
        if (basicDetails.last_name) names.add(basicDetails.last_name);

        // Handle combined names
        if (basicDetails.salutation && basicDetails.first_name) {
            names.add(`${basicDetails.salutation} ${basicDetails.first_name}`);
        }
        if (basicDetails.first_name && basicDetails.last_name) {
            names.add(`${basicDetails.first_name} ${basicDetails.last_name}`);
        }
        if (basicDetails.salutation && basicDetails.first_name && basicDetails.last_name) {
            names.add(`${basicDetails.salutation} ${basicDetails.first_name} ${basicDetails.last_name}`);
        }

        // Include display_name if it's set
        if (basicDetails.display_name) names.add(basicDetails.display_name);

        setDisplayNames(Array.from(names)); // Convert Set back to Array
    }, [basicDetails]);
    // Function to update displayNames based on basicDetails


    // for set Company name value in display name when I click outside
    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === "company_name" && !basicDetails.display_name) {

            setBasicDetails(prevDetails => ({
                ...prevDetails,
                display_name: value,
            }));
        }
        const names = new Set(displayNames);
        if (basicDetails.company_name) names.add(basicDetails.company_name);
        if (basicDetails.company_name) {
            names.add(`${basicDetails.company_name}`);
        }
        setDisplayNames(Array.from(names));
    };
    // for set Company name value in display name when I click outside

    //for error handling
    useEffect(() => {
        setTickBasicDetails();
        const {
            first_name,
            last_name,
            email,
            display_name,
            mobile_no,
            gst_no,
            pan_no,
            place_of_supply
        } = basicDetails;

        // setCustomerName(first_name !== "" && last_name !== "" && email !== "");
        setCustomerDisplayName(display_name !== "");
        // setCustomerMobile(mobile_no !== "");
        // setCustomerGST(gst_no !== "");
        // setCustomerPan(pan_no !== "");
        // setCustomerPlace(place_of_supply !== "");
        updateUserData(basicDetails)


    }, [basicDetails]);


    //for edit and dublicate
    useEffect(() => {
        if ((user?.id && isEdit || user?.id && isDublicate)) {
            setBasicDetails({
                salutation: user?.salutation,
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                mobile_no: user?.mobile_no,
                work_phone: user?.work_phone,
                customer_type: user?.customer_type,
                registration_type: user?.registration_type,
                is_vendor: (+user?.is_vendor),
                gst_no: user?.gst_no,
                pan_no: user?.pan_no,
                display_name: user?.display_name,
                company_name: user?.company_name,
                place_of_supply: user?.place_of_supply,
                tax_preference: user?.tax_preference,
                currency: user?.currency,
                payment_term: user?.payment_term,
                opening_balance: user?.opening_balance,
                department: user?.department,
                designation: user?.designation,
                website: user?.website,
            });
            setTick({
                ...tick,
                basicTick: true
            })

            if (user?.registration_type === "Registered") {
                setShowRegisterdFields(true);
            }
        }
    }, [user])



    useEffect(() => {
        dispatch(fetchMasterData())
        dispatch(fetchCurrencies());
    }, [dispatch]);




    useEffect(() => {
        updateUserData(basicDetails)
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
        setImgeLoader(true);

        const imageRef = ref(imageDB, `Documents/${v4()}`);
        uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                setImgeLoader("success");
                setFreezLoadingImg(false);
                getDownloadURL(imageRef)?.then((url) => {
                    const updatedUploadDocuments = Array.isArray(basicDetails.upload_documents)
                        ? [...basicDetails.upload_documents]
                        : [];
                    updatedUploadDocuments.push({ [updatedUploadDocuments.length + 1]: url });
                    setBasicDetails({
                        ...basicDetails,
                        upload_documents: updatedUploadDocuments
                    });
                });
            })
            .catch((error) => {
                setFreezLoadingImg(false);
                setImgeLoader("fail");
            });
    };

    useEffect(() => {
        OverflowHideBOdy(showPopup);
    }, [showPopup]);
    // image upload from firebase




    return (
        <>
            {freezLoadingImg && <MainScreenFreezeLoader />}

            {switchCusData === "Basic" ?
                <div id="secondx2_customer">
                    <div id="main_forms_desigin_cus">

                        <div className="iconheading">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                <path d="M22 15.5L14 15.5M22 18.5H14M18 21.5L14.0001 21.4998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M7 6.5H16.75C18.8567 6.5 19.91 6.5 20.6667 7.00559C20.9943 7.22447 21.2755 7.50572 21.4944 7.83329C22 8.58996 22 9.89331 22 12M12 6.5L11.3666 5.23313C10.8418 4.18358 10.3622 3.12712 9.19926 2.69101C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88032C3.05227 3.15142 2.65142 3.55227 2.38032 4.03806C2 4.71956 2 5.6278 2 7.44427V10.5C2 15.214 2 17.5711 3.46447 19.0355C4.7646 20.3357 6.7682 20.4816 10.5 20.4979" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <p>Basic Details</p>
                        </div>

                        <div className="sections">
                            <div id="fcx3s1parent">

                                <div className="form_commonblockx3">
                                    <label>Vendor Name<b className='color_red'>*</b></label>
                                    <div id="fcx3s1">
                                        <span>
                                            <select name="salutation" value={basicDetails?.salutation} onChange={handleChange} style={{ width: "150px" }}>
                                                <option value="">Salutation</option>
                                                {masterData?.map(type => {
                                                    if (type?.type === "4") {
                                                        return (
                                                            <option key={type.labelid} value={type.label}>{type.label}</option>
                                                        )
                                                    }

                                                })}
                                            </select>
                                        </span>

                                        <span>
                                            <input type="input" name="first_name" value={basicDetails.first_name} onChange={handleChange} placeholder={`Enter vendor first name`} />
                                        </span>


                                        <span><input type="input" name="last_name" value={basicDetails.last_name} onChange={handleChange} placeholder={`Enter vendor last name`} /></span>
                                    </div>

                                </div>
                                <div className="form_commonblock">
                                    <label>Vendor Email<b className='color_red'>*</b></label>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.01576 13.4756C2.08114 16.5411 2.11382 18.0739 3.24495 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.755 19.2093C21.8862 18.0739 21.9189 16.5411 21.9842 13.4756C22.0053 12.4899 22.0053 11.51 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.755 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08113 7.45882 2.01576 10.5243C1.99474 11.51 1.99474 12.4899 2.01576 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                        <input type="email" name="email" value={basicDetails.email} onChange={handleChange} placeholder={`Enter vendor email`} />
                                    </span>
                                </div>

                            </div>
                            <div className="height5"></div>
                            <div className="height5"></div>
                            {/* error handling */}
                            {/* {!customerName && <p className="error-message">
                                {otherIcons.error_svg}
                                Please fill vendor Details</p>} */}

                        </div>

                        <div className="sections">
                            <div id="fcx3s1parent">
                                <div className="form_commonblock" ref={dropdownRef}>
                                    <label className=''>Company Name</label>
                                    <div id="inputx1">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                <path d="M8 9L11 9M8 13L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                <path d="M2 22L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input style={{ width: "100%" }} type="text" name="company_name" onBlur={handleBlur} value={basicDetails.company_name} onChange={handleChange} placeholder="Enter company name" /></span>
                                    </div>
                                </div>
                                <div className="form_commonblock">
                                    <label>Display Name<b className='color_red'>*</b></label>
                                    <div id="inputx1">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 17H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22 13C19.5434 11.7725 15.9734 11 12 11C8.02658 11 4.45659 11.7725 2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M19 11.5L17.9425 4.71245C17.7268 3.3282 16.2232 2.57812 15.0093 3.24919L14.3943 3.58915C12.9019 4.41412 11.0981 4.41412 9.60574 3.58915L8.99074 3.24919C7.77676 2.57812 6.27318 3.3282 6.05751 4.71246L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <CustomDropdown19
                                                label="Display Name"
                                                options={displayNames}
                                                value={basicDetails.display_name}
                                                setBasicDetailsDisplayName={setBasicDetails}
                                                onChange={handleChange}
                                                name="display_name"
                                                defaultOption="Select or Type Display Name"
                                            />

                                        </span>
                                    </div>

                                    {!customerDisplayName && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please fill display Name</p>}
                                </div>



                            </div>
                            <div className="height5"></div>
                            <div className="height5"></div>

                        </div>

                        <div className="sections">
                            <div id="fcx3s1parent">
                                <div className="form_commonblock">
                                    <label>Mobile Number<b className='color_red'>*</b></label>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                        <input type="number" style={{ width: "100%" }} name="mobile_no" value={basicDetails.mobile_no} onChange={handleChange} placeholder="Enter vendor mobile no" />
                                    </span>
                                    {/* {!customerMobile && <p className="error-message">
                                        {otherIcons.error_svg}
                                        Please fill vendor Mobile</p>} */}
                                </div>

                                <div className="form_commonblock">
                                    <label className=''>Work Phone</label>
                                    <div id="inputx1">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            </svg>
                                            <input style={{ width: "100%" }} type="number" name="work_phone" value={basicDetails.work_phone} onChange={handleChange} placeholder="Enter vendor work phone" /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="height5"></div>
                            <div className="height5"></div>


                        </div>



                        <div className="breakerci"></div>
                        <div id="fcx3s1parent">
                            <div className="form_commonblock">
                                <label>Registration Type</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M4 10V18.5M8 10V18.5" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M21.5 14.5L14.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="15.25" cy="15.25" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                            <circle cx="20.75" cy="20.75" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                        <CustomDropdown04
                                            label="Registation name"
                                            options={registerationtypes}
                                            value={basicDetails?.registration_type}
                                            onChange={handleChange}
                                            name="registration_type"
                                            defaultOption="Select Registation types"
                                        />
                                        {/* <input style={{ width: "100%" }} type="number" name="registration_type" value={basicDetails.registration_type} onChange={handleChange} placeholder="Enter registration type" /> */}
                                    </span>
                                </div>

                            </div>

                            {showRegisterdFields &&
                                <>
                                    <div className="form_commonblock">
                                        <label>GST No<b className='color_red'>*</b></label>
                                        <div id="inputx1">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                    <path d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M4 10V18.5M8 10V18.5" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M21.5 14.5L14.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="15.25" cy="15.25" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                                    <circle cx="20.75" cy="20.75" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>
                                                <input style={{ width: "100%" }} type="text" name="gst_no" value={basicDetails.gst_no} onChange={handleChange} placeholder="Enter GST no" /></span>
                                        </div>

                                        {/* {!customerGST && <p className="error-message">
                                            {otherIcons.error_svg}
                                            Please fill vendor GST</p>} */}

                                    </div>
                                    <div className="form_commonblock">
                                        <label>PAN No<b className='color_red'>*</b></label>
                                        <div id="inputx1">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                    <path d="M14.9805 7.01562C14.9805 7.01562 15.4805 7.51562 15.9805 8.51562C15.9805 8.51562 17.5687 6.01562 18.9805 5.51562" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.99485 2.02141C7.49638 1.91562 5.56612 2.20344 5.56612 2.20344C4.34727 2.29059 2.01146 2.97391 2.01148 6.9646C2.0115 10.9214 1.98564 15.7993 2.01148 17.744C2.01148 18.932 2.7471 21.7034 5.29326 21.8519C8.3881 22.0324 13.9627 22.0708 16.5205 21.8519C17.2051 21.8133 19.4846 21.2758 19.7731 18.7957C20.072 16.2264 20.0125 14.4407 20.0125 14.0157" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M21.9999 7.01562C21.9999 9.77705 19.7591 12.0156 16.995 12.0156C14.231 12.0156 11.9902 9.77705 11.9902 7.01562C11.9902 4.2542 14.231 2.01562 16.995 2.01562C19.7591 2.01562 21.9999 4.2542 21.9999 7.01562Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M6.98047 13.0156H10.9805" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M6.98047 17.0156H14.9805" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                <input style={{ width: "100%" }} type="text" name="pan_no" value={basicDetails.pan_no} onChange={handleChange} placeholder="Enter PAN no" /></span>
                                        </div>
                                        {/* error handling */}
                                        {/* {!customerPan && <p className="error-message">
                                            {otherIcons.error_svg}
                                            Please fill vendor PAN</p>} */}
                                    </div>
                                </>
                            }
                        </div>

                        <div id="fcx3s1parent">
                            <div className="form_commonblock">
                                <label className=''>Currency</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <CustomDropdown12
                                            label="Currency"
                                            options={getCurrency?.currency}
                                            value={basicDetails.currency}
                                            onChange={handleChange}
                                            name="currency"
                                            defaultOption="Select Currency"
                                        />
                                        {/* <input style={{ width: "100%" }} type="text" name="currency" value={basicDetails.currency} onChange={handleChange} placeholder="Enter Currency" /> */}
                                    </span>
                                </div>
                            </div>
                            <div className="form_commonblock">
                                <label className=''>Payment Terms</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <CustomDropdown04
                                            label="Payment Terms"
                                            options={masterData?.filter(type => type.type === "7")}
                                            value={basicDetails.payment_terms}
                                            onChange={handleChange}
                                            name="payment_terms"
                                            defaultOption="Select Payment terms"
                                            autoComplete='off'
                                        /></span>
                                </div>
                            </div>
                            <div className="form_commonblock">
                                <label>Place of Supply<b className='color_red'>*</b></label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M4.5 10.2653V6H19.5V10.2653C19.5 13.4401 19.5 15.0275 18.5237 16.0137C17.5474 17 15.976 17 12.8333 17H11.1667C8.02397 17 6.45262 17 5.47631 16.0137C4.5 15.0275 4.5 13.4401 4.5 10.2653Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.5 6L5.22115 4.46154C5.78045 3.26838 6.06009 2.6718 6.62692 2.3359C7.19375 2 7.92084 2 9.375 2H14.625C16.0792 2 16.8062 2 17.3731 2.3359C17.9399 2.6718 18.2196 3.26838 18.7788 4.46154L19.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M10.5 9H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M4 22H12M20 22H12M12 22V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input style={{ width: "100%" }} type="text" name="place_of_supply" value={basicDetails.place_of_supply} onChange={handleChange} placeholder="Place of Supply" /></span>
                                </div>
                                {/* error handling */}
                                {/* {!customerPlace && <p className="error-message">
                                    {otherIcons.error_svg}
                                    Please fill vendor Place of supply name</p>} */}

                            </div>
                        </div>

                        <div id="fcx3s1parent">
                            <div className="form_commonblock">
                                <label className=''>Upload Documents</label>
                                <div id="inputx1">
                                    <div id="imgurlanddesc">
                                        <div className="form-group">
                                            <div className="file-upload">
                                                <input
                                                    type="file"
                                                    name="image_url"
                                                    id="file"
                                                    className="inputfile"
                                                    onChange={handleImageChange}
                                                />
                                                <label htmlFor="file" className="file-label">
                                                    <div id='spc5s6'>
                                                        {otherIcons.export_svg}
                                                        {basicDetails?.upload_documents === undefined || basicDetails?.upload_documents == 0 ? 'Browse Files' : ""}
                                                    </div>
                                                </label>


                                                {
                                                    imgLoader === "success" && basicDetails?.upload_documents !== null && basicDetails?.upload_documents !== "0" ?
                                                        <label className='imageviewico656s' htmlFor="" data-tooltip-id="my-tooltip" data-tooltip-content="View Item Image" onClick={showimagepopup} >
                                                            <BsEye />
                                                        </label> : ""
                                                }
                                            </div>
                                            <div>{basicDetails?.upload_documents?.length} images upload</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form_commonblock">
                                <label className=''>Opening Balance</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <input style={{ width: "100%" }} type="text" name="opening_balance" value={basicDetails.opening_balance} onChange={handleChange} placeholder="Enter payment terms" /></span>
                                </div>
                            </div>
                            <div className="form_commonblock">
                                <label>Department</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M4.5 10.2653V6H19.5V10.2653C19.5 13.4401 19.5 15.0275 18.5237 16.0137C17.5474 17 15.976 17 12.8333 17H11.1667C8.02397 17 6.45262 17 5.47631 16.0137C4.5 15.0275 4.5 13.4401 4.5 10.2653Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.5 6L5.22115 4.46154C5.78045 3.26838 6.06009 2.6718 6.62692 2.3359C7.19375 2 7.92084 2 9.375 2H14.625C16.0792 2 16.8062 2 17.3731 2.3359C17.9399 2.6718 18.2196 3.26838 18.7788 4.46154L19.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M10.5 9H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M4 22H12M20 22H12M12 22V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input style={{ width: "100%" }} type="text" name="department" value={basicDetails.department} onChange={handleChange} placeholder="Enter department" /></span>
                                </div>

                            </div>
                        </div>

                        <div id="fcx3s1parent">
                            <div className="form_commonblock">
                                <label className=''>Designation</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M14.7102 10.0611C14.6111 9.29844 13.7354 8.06622 12.1608 8.06619C10.3312 8.06616 9.56136 9.07946 9.40515 9.58611C9.16145 10.2638 9.21019 11.6571 11.3547 11.809C14.0354 11.999 15.1093 12.3154 14.9727 13.956C14.836 15.5965 13.3417 15.951 12.1608 15.9129C10.9798 15.875 9.04764 15.3325 8.97266 13.8733M11.9734 6.99805V8.06982M11.9734 15.9031V16.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <input style={{ width: "100%" }} type="text" name="designation" value={basicDetails.designation} onChange={handleChange} placeholder="Enter designation" /></span>
                                </div>
                            </div>
                            <div className="form_commonblock">
                                <label>Website</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M4.5 10.2653V6H19.5V10.2653C19.5 13.4401 19.5 15.0275 18.5237 16.0137C17.5474 17 15.976 17 12.8333 17H11.1667C8.02397 17 6.45262 17 5.47631 16.0137C4.5 15.0275 4.5 13.4401 4.5 10.2653Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.5 6L5.22115 4.46154C5.78045 3.26838 6.06009 2.6718 6.62692 2.3359C7.19375 2 7.92084 2 9.375 2H14.625C16.0792 2 16.8062 2 17.3731 2.3359C17.9399 2.6718 18.2196 3.26838 18.7788 4.46154L19.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M10.5 9H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M4 22H12M20 22H12M12 22V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input style={{ width: "100%" }} type="text" name="website" value={basicDetails.website} onChange={handleChange} placeholder="Enter Website" /></span>
                                </div>

                            </div>
                        </div>

                    </div>
                    {
                        showPopup && (
                            <div className="mainxpopups2" ref={popupRef}>
                                <div className="popup-content02">
                                    <span className="close-button02" onClick={() => setShowPopup(false)}><RxCross2 /></span>
                                    {basicDetails.upload_documents?.map((val, index) => (
                                        <img src={Object.values(val)[0]} key={index} alt="" height={500} width={500} />
                                    ))}

                                </div>
                            </div>
                        )
                    }
                </div > :
                ""
            }
        </>
    );
};

export default VendorBasicDetails;