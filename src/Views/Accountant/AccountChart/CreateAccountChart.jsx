import React, { useEffect, useState, useRef } from 'react';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';
import { Link, useLocation } from 'react-router-dom';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';
import { useDispatch, useSelector } from 'react-redux';
import { accountLists } from '../../../Redux/Actions/listApisActions';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import CustomDropdown15 from '../../../Components/CustomDropdown/CustomDropdown15';
import { fetchCurrencies } from '../../../Redux/Actions/globalActions';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDB } from '../../../Configs/Firebase/firebaseConfig';
import { OverflowHideBOdy } from '../../../Utils/OverflowHideBOdy';
import { createAccounts, getAccountTypes } from '../../../Redux/Actions/accountsActions';
import { toast, Toaster } from 'react-hot-toast';
import CustomDropdown12 from '../../../Components/CustomDropdown/CustomDropdown12';
import CustomDropdown16 from '../../../Components/CustomDropdown/CustomDropdown16';



const CreateAccountChart = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const accType = useSelector((state) => state?.getAccType?.data?.account_type);
    const createAcc = useSelector((state) => state?.createAccount);
    const getCurrency = useSelector((state) => state?.getCurrency?.data);
    const AccountListCHart = useSelector(state => state?.accountList);
    const AccountsListcths = AccountListCHart?.data?.accounts || [];
    const params = new URLSearchParams(location.search);
    const { edit: isEdit } = Object.fromEntries(params.entries());

    // console.log("edita aaaa", getAccountVal)

    const [formData, setFormData] = useState({
        id: 0,
        account_type: "Other Current Asset",
        account_name: "",
        account_code: null,
        opening_balance: null,
        owner_name: null,
        upload_image: [],
        custome_feilds: null,
        tax_code: null,
        description: "",
        parent_id: 0,
        account_no: null,
        parent_name: null,
        sub_account: 0,
        ifsc: "",
        currency: "INR",
    });
    // console.log("formData?.sub_account", formData?.upload_image);

    const getAccountVal = JSON.parse(localStorage.getItem("editAccount"));
    useEffect(() => {
        if (isEdit) {
            setFormData({
                ...formData,
                account_type: getAccountVal?.account_type,
                account_name: getAccountVal?.account_name,
                account_code: getAccountVal?.account_code,
                opening_balance: getAccountVal?.opening_balance,
                owner_name: getAccountVal?.owner_name,
                upload_image: getAccountVal?.upload_image,
                custome_feilds: getAccountVal?.custome_feilds,
                tax_code: getAccountVal?.tax_code,
                description: getAccountVal?.description,
                parent_id: getAccountVal?.parent_id,
                account_no: getAccountVal?.account_no,
                parent_name: getAccountVal?.parent_name,
                sub_account: getAccountVal?.sub_account,
                ifsc: getAccountVal?.ifsc,
                currency: getAccountVal?.currency,
            });

            if (getAccountVal?.upload_image) {
                setImgeLoader("success")
            }
        }
    }, [isEdit]);

    const handleDeleteImage = (imageUrl) => {
        const updatedUploadDocuments = formData.upload_image.filter((image) => image !== imageUrl);
        setFormData({
            ...formData,
            upload_image: updatedUploadDocuments, // Convert to JSON string
        });
    };
    const [selectedImage, setSelectedImage] = useState(""); // State for the selected image URL
    const [showPopup, setShowPopup] = useState("");

    const showimagepopup = (imageUrl) => {
        setSelectedImage(imageUrl); // Set the selected image URL
        OverflowHideBOdy(true); // Set overflow hidden
        setShowPopup(true); // Show the popup
    };
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        let newValue = value;

        setFormData({
            ...formData,
            [name]: newValue,
        });

        if (name === "sub_account") {
            setFormData({
                ...formData,
                sub_account: checked ? 1 : 0
            })
        }
    };

    const popupRef = useRef(null);


    const [parentAccErr, setParentAccErr] = useState(false);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // setLoading(true);
        try {
            if (formData?.parent_id === 0 && formData?.sub_account === 1) {
                setParentAccErr(true);
                setLoading(false);
            } else if (isEdit) {
                dispatch(createAccounts({ ...formData, id: getAccountVal?.id, upload_image: JSON.stringify(formData?.upload_image) }))
                    .then(() => {
                        localStorage.setItem("editAccount", JSON.stringify({ ...formData, id: getAccountVal?.id }));
                        setLoading(false);
                        setParentAccErr(false);
                    })

            }
            else {
                dispatch(createAccounts({ ...formData, upload_image: JSON.stringify(formData?.upload_image) }));
                setLoading(false);
                setParentAccErr(false);

            }

        } catch (error) {
            toast.error('Error updating quotation:', error);
            setLoading(false);
        }
    };


    useEffect(() => {
        dispatch(getAccountTypes());
        dispatch(fetchCurrencies());
    }, [dispatch]);

    useEffect(() => {
        let sendData = {
            fy: "2024",
        };


        dispatch(accountLists(sendData));

    }, [dispatch]);


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

    const [imgLoader, setImgeLoader] = useState("");

    const [freezLoadingImg, setFreezLoadingImg] = useState(false);

    const handleImageChange = (e) => {
        setFreezLoadingImg(true);
        setImgeLoader(true);

        const updatedUploadDocuments = Array.isArray(formData.upload_image)
            ? [...formData.upload_image]
            : [];

        // Loop through each selected file
        Promise.all(
            Array.from(e.target.files).map((file) => {
                const imageRef = ref(imageDB, `Documents/${v4()}`);
                return uploadBytes(imageRef, file)
                    .then(() => {
                        return getDownloadURL(imageRef)?.then((url) => {
                            updatedUploadDocuments.push({ [updatedUploadDocuments.length + 1]: url });
                        });
                    })
                    .catch((error) => {
                        setFreezLoadingImg(false);
                        setImgeLoader("fail");
                        throw error;
                    });
            })
        )
            .then(() => {
                setImgeLoader("success");
                setFreezLoadingImg(false);
                setFormData({
                    ...formData,
                    upload_image: updatedUploadDocuments,
                });
            })
            .catch((error) => {
                console.error("Error uploading images:", error);
            });
    };


    useEffect(() => {
        OverflowHideBOdy(showPopup);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showPopup]);
    // image upload from firebase



    return (
        <>
            <TopLoadbar />
            {loading && <MainScreenFreezeLoader />}
            {freezLoadingImg && <MainScreenFreezeLoader />}
            {createAcc?.loading && <MainScreenFreezeLoader />}

            <div className='formsectionsgrheigh'>
                <div id="Anotherbox" className='formsectionx1'>
                    <div id="leftareax12">
                        <h1 id="firstheading">
                            {otherIcons.quoation_svg}
                            New Account
                        </h1>
                    </div>
                    <div id="buttonsdata">
                        <Link to={"/dashboard/account-chart"} className="linkx3">
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
                                            <label>Account Type<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.currency_icon}

                                                <CustomDropdown15
                                                    label="Account Type"
                                                    options={accType}
                                                    value={formData?.account_type}
                                                    onChange={handleChange}
                                                    name="account_type"
                                                    defaultOption="Select account type"
                                                />
                                            </span>
                                        </div>

                                        <div className='subaccountcheckbox85s'>
                                            {formData?.account_type === "credit_card" ? ""

                                                : < div className="form_commonblock">
                                                    <label >Account Name<b className='color_red'>*</b></label>

                                                    <span >
                                                        {otherIcons.tag_svg}
                                                        <input type="text" value={formData.account_name} required
                                                            placeholder='Enter account name'
                                                            onChange={handleChange}
                                                            name='account_name'
                                                        />
                                                    </span>
                                                </div>
                                            }

                                            {formData?.account_type === "other_asset" || formData?.account_type === "Bank" || formData?.account_type === "credit_card" || formData?.account_type === "long_term_liability" || formData?.account_type === "other_income" || formData?.account_type === "long_term_liability" ? "" :
                                                <div className='subaccountcheckbox84s'>
                                                    <span>
                                                        <input type="checkbox" checked={formData?.sub_account == 1} name="sub_account" value={formData?.sub_account} id="" onChange={handleChange} />
                                                    </span>_
                                                    <label >Make this sub account</label>
                                                </div>
                                            }
                                        </div>
                                        {formData?.sub_account == 1 &&
                                            <div className="form_commonblock">
                                                <label >Parent Account<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.tag_svg}


                                                    <CustomDropdown16
                                                        options={AccountsListcths}
                                                        value={formData?.parent_id}
                                                        onChange={(e) => handleChange({ target: { name: 'parent_id', value: e.target.value } })}
                                                        name='parent_id'
                                                        defaultOption='Select an account'
                                                        required
                                                    />
                                                </span>
                                                {parentAccErr && <p className="error-message">
                                                    {otherIcons.error_svg}
                                                    Please select Parent Account</p>}
                                            </div>
                                        }

                                        {/* {openFields === "" &&
                                            <div className="form_commonblock">
                                                <label >Account Name<b className='color_red'>*</b></label>
                                                <span >
                                                    {otherIcons.tag_svg}
                                                    <input type="text" value={formData.account_name} required
                                                        placeholder='Enter account name'
                                                        onChange={handleChange}
                                                        name='account_name'
                                                    />

                                                </span>
                                            </div>
                                        } */}


                                        {formData?.account_type === "credit_card" ?
                                            <>
                                                <div className="form_commonblock">
                                                    <label>Credit Card Name</label>
                                                    <span >
                                                        {otherIcons.tag_svg}
                                                        <input type="text" value={formData.credit_card_name} required
                                                            placeholder='Credit Card Name'
                                                            onChange={handleChange}
                                                            name='credit_card_name'
                                                        />

                                                    </span>
                                                </div>

                                                {/* <div className="form_commonblock">
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
                                                </div> */}

                                            </> : ""
                                        }
                                        {formData?.account_type === "Bank" &&
                                            <>
                                                <div className="form_commonblock">
                                                    <label >Account Number<b className='color_red'>*</b></label>
                                                    <span >
                                                        {otherIcons.tag_svg}
                                                        <input type="number" value={formData.account_no} required
                                                            placeholder='Enter account number'
                                                            onChange={handleChange}
                                                            name='account_no'
                                                        />

                                                    </span>
                                                </div>

                                                <div className="form_commonblock">
                                                    <label >IFSC<b className='color_red'>*</b></label>
                                                    <span >
                                                        {otherIcons.tag_svg}
                                                        <input type="text" value={formData.ifsc} required
                                                            placeholder='Enter IFSC code'
                                                            onChange={handleChange}
                                                            name='ifsc'
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


                                            </>
                                        }


                                        <div className="form_commonblock">
                                            <label >Account Code<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.tag_svg}
                                                <input type="text" value={formData.account_code} required
                                                    placeholder='Enter account code'
                                                    onChange={handleChange}
                                                    name='account_code'
                                                />

                                            </span>
                                        </div>


                                        <div className="form_commonblock">
                                            <label >Opening blance<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.tag_svg}
                                                <input type="number" value={formData.opening_balance} required
                                                    placeholder='Enter blance amount'
                                                    onChange={handleChange}
                                                    name='opening_balance'
                                                />

                                            </span>
                                        </div>
                                        <div className="form_commonblock">
                                            <label >Owner<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.tag_svg}
                                                <input type="text" value={formData.owner_name} required
                                                    placeholder='Enter owner name'
                                                    onChange={handleChange}
                                                    name='owner_name'
                                                />

                                            </span>
                                        </div>

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
                                                                multiple
                                                            />
                                                            <label htmlFor="file" className="file-label">
                                                                <div id='spc5s6'>
                                                                    {otherIcons.export_svg}
                                                                    {formData?.upload_image === undefined || formData?.upload_image == 0 ? 'Browse Files' : ""}
                                                                </div>
                                                            </label>
                                                        </div>
                                                        {/* <div>{formData?.upload_image?.length} images upload</div> */}
                                                    </div>
                                                    {
                                                        imgLoader === "success" && formData?.upload_image !== null && formData?.upload_image !== "0" ?
                                                            <>

                                                                <label >
                                                                    {formData.upload_image?.map((image, index) => (
                                                                        <label key={index}>
                                                                            <span>
                                                                                Document {index + 1}
                                                                                <div onClick={() => handleDeleteImage(image)}>delete</div>
                                                                                <div onClick={() => showimagepopup(Object.values(image)[0])}>Show Image</div>
                                                                            </span>
                                                                        </label>
                                                                    ))}
                                                                </label>
                                                            </>
                                                            : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form_commonblock">
                                            <label >Tax Code<b className='color_red'>*</b></label>
                                            <span >
                                                {otherIcons.placeofsupply_svg}
                                                <input
                                                    type="text" required
                                                    value={formData.tax_code}
                                                    onChange={handleChange}
                                                    name='tax_code'

                                                    placeholder='Enter tax code'
                                                />
                                            </span>
                                        </div>


                                        <div>

                                        </div>
                                    </div>
                                    <div className="form_commonblock">
                                        <label >Notes<b className='color_red'>*</b></label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={handleChange}
                                            name='description'
                                            placeholder='Enter notes...'
                                            className='textareax1series'
                                        />

                                    </div>
                                </div>
                            </div>


                            <div className="actionbarcommon">

                                <button className="firstbtnc1" type="submit" disabled={loading}> {loading ? 'Submiting...' : 'Save'}
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
                                showPopup && (
                                    <div className="mainxpopups2" ref={popupRef}>
                                        <div className="popup-content02">
                                            <span className="close-button02" onClick={() => setShowPopup(false)}><RxCross2 /></span>
                                            <img src={selectedImage} alt="Selected Image" height={500} width={500} />


                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </DisableEnterSubmitForm>
                </div >
                <Toaster />
            </div >
        </>
    );
};

export default CreateAccountChart;
