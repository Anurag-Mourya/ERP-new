import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import CircleLoader from '../../Components/Loaders/CircleLoader';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CiExport, CiImageOn } from 'react-icons/ci';
import { IoCheckbox } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMasterData } from '../../Redux/Actions/globalActions';
import { addItems, itemDetails } from '../../Redux/Actions/itemsActions';
import { accountLists, categoryList, vendorsLists } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { RxCross2 } from 'react-icons/rx';

import CustomDropdown03 from '../../Components/CustomDropdown/CustomDropdown03';
import CustomDropdown04 from '../../Components/CustomDropdown/CustomDropdown04';
import CustomDropdown05 from '../../Components/CustomDropdown/CustomDropdown05';
import { MdCheck } from 'react-icons/md';
import { BsArrowRight } from 'react-icons/bs';
import CustomDropdown06 from '../../Components/CustomDropdown/CustomDropdown06';



const CreateAndUpdateItem = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { id: itemId, edit: isEdit } = Object.fromEntries(params.entries());

    const masterData = useSelector(state => state?.masterData?.masterData);
    const vendorList = useSelector(state => state?.vendorList?.data);
    const itemCreatedData = useSelector(state => state?.addItemsReducer
    );
    const catList = useSelector(state => state?.categoryList)
    const accList = useSelector(state => state?.accountList)
    const item_details = useSelector(state => state?.itemDetail?.itemsDetail?.data?.item_details)

    const [formData, setFormData] = useState({
        name: '',
        type: 'Product',
        category_id: '',
        parent_id: '',
        sale_description: '',
        purchase_description: '',
        sku: '',
        price: '',
        unitName: '',
        unit: '',
        tax_rate: '',
        hsn_code: '',
        opening_stock: '',//not in api
        purchase_price: '',
        tax_preference: '',
        tax_preference_Name: '',
        preferred_vendor: '',
        exemption_reason: "",
        tag_ids: '',
        as_on_date: '',
        image_url: '',//not in api
        sale_acc_id: '',
        purchase_acc_id: '',
    });

    // console.log("formData", formData)
    useEffect(() => {
        if (itemId && isEdit) {
            const queryParams = {
                item_id: itemId,
                fy: localStorage.getItem('FinancialYear'),
                warehouse_id: localStorage.getItem('selectedWarehouseId'),
            };
            dispatch(itemDetails(queryParams));

            const allUnit = masterData?.filter(type => type.type === "2");
            const allTax = masterData?.filter(type => type.type === "6");
            const filterUnitName = allUnit?.find(val => val?.labelid == item_details?.unit);
            const filterTaxName = allTax?.find(val => val?.value == item_details?.tax_preference);

            setFormData({
                ...formData,
                name: item_details?.name,
                type: item_details?.type,
                category_id: (+item_details?.category_id),
                parent_id: (+item_details?.parent_id),
                sale_description: item_details?.sale_description,
                purchase_description: item_details?.purchase_description,
                sku: item_details?.sku,
                price: item_details?.price,
                unit: item_details?.unit,
                unitName: filterUnitName?.label,
                tax_rate: item_details?.tax_rate,
                hsn_code: item_details?.hsn_code,
                opening_stock: item_details?.opening_stock, // not in api
                purchase_price: item_details?.purchase_price,
                tax_preference: (+item_details?.tax_preference),
                tax_preference_Name: filterTaxName?.label,
                preferred_vendor: (+item_details?.preferred_vendor),
                exemption_reason: item_details?.exemption_reason,
                tag_ids: item_details?.tag_ids,
                as_on_date: item_details?.as_on_date,
                image_url: '', // not in api
                sale_acc_id: (+item_details?.sale_acc_id),
                purchase_acc_id: (+item_details?.purchase_acc_id),
            });
        }
    }, [dispatch, item_details?.name, item_details?.unit, formData?.category_id, item_details?.parent_id, masterData]);




    useEffect(() => {
        dispatch(categoryList());
        dispatch(accountLists());
        dispatch(vendorsLists());
    }, [dispatch]);




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const unitid = masterData?.find(val => val?.label === formData?.unitName);
        const taxPrefrenceid = masterData?.find(val => val?.label === formData?.tax_preference_Name);
        setFormData({
            ...formData,
            unit: unitid?.labelid,
            tax_preference: taxPrefrenceid?.labelid,
        })

    }, [formData?.unitName, formData?.tax_preference_Name])

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFormData({
                ...formData,
                [name]: selectedFile
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemId && isEdit) {
            const { unitName, tax_preference_Name, image_url, ...exceptUnitName } = formData;
            dispatch(addItems({ ...exceptUnitName, id: itemId }))
        } else {
            const { unitName, tax_preference_Name, image_url, ...exceptUnitName } = formData;
            dispatch(addItems(exceptUnitName))
        }

    };

    useEffect(() => {
        if (itemCreatedData?.addItemsResponse?.message === "Item Created Successfully") {
            toast.success(itemCreatedData?.addItemsResponse?.message);
        } else if (itemCreatedData?.addItemsResponse?.status === undefined) {
            // toast.error(itemCreatedData?.addItemsResponse?.message);
        }
    }, [itemCreatedData?.addItemsResponse]);


    useEffect(() => {
        dispatch(fetchMasterData());
    }, [dispatch]);


    const [isChecked, setIsChecked] = useState({ checkbox1: false, checkbox2: false });

    const handleCheckboxClick = checkboxName => {
        setIsChecked(prevState => ({
            ...prevState,
            [checkboxName]: !prevState[checkboxName],
        }));
    };

    useEffect(() => {
        if (isChecked?.checkbox1 === true) {
            setFormData({
                ...formData,
                sale_acc_id: "",
                sale_description: "",
                price: "",
            })
        } if (isChecked?.checkbox2 === true) {
            setFormData({
                ...formData,
                purchase_acc_id: "",
                purchase_description: "",
                purchase_price: "",
                preferred_vendor: ""
            })
        }
    }, [isChecked?.checkbox1, isChecked?.checkbox2]);
    // console.log("sale info", formData);

    return (
        <div className='formsectionsgrheigh'>
            <TopLoadbar />
            <div id="Anotherbox" className='formsectionx1'>
                <div id="leftareax12">
                    <h1 id="firstheading" className='headingofcreateforems'>
                        {/* <img src={"/Icons/supplier-alt.svg"} alt="" /> */}
                        <img src={"https://cdn-icons-png.freepik.com/512/5006/5006793.png?uid=R87463380&ga=GA1.1.683301158.1710405244"} alt="" />
                        {itemId && isEdit ? "Update Items" : "NewItems"}
                    </h1>
                </div>




                <div id="buttonsdata">
                    <Link to={"/dashboard/manage-items"} className="linkx3">
                        <RxCross2 />
                    </Link>
                </div>
            </div>

            {/* <div className="bordersinglestroke"></div> */}
            <div id='middlesection' >

                <div id="formofcreateitems">
                    <form onSubmit={handleSubmit}>
                        <div className="itemsformwrap">
                            <div id="forminside">

                                <div className="form-groupx1">
                                    <label>Type:</label>

                                    <span>
                                        {masterData?.map(type => {
                                            if (type?.type === "5") {
                                                return (
                                                    <button
                                                        key={type?.labelid}
                                                        className={`type-button ${formData.type === type?.label ? 'selectedbtn' : ''}`}
                                                        onClick={() => setFormData({ ...formData, type: type?.label })}
                                                    >
                                                        {type?.label}
                                                        {formData.type === type?.label && <MdCheck />}
                                                    </button>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </span>
                                </div>

                                <div className="secondx2">
                                    <div className="form-group">
                                        {/* <label>Name<b style={{fontWeight:300}} className='color_red'>*</b></label> */}
                                        <label className='color_red'>Name*</label>
                                        <span>
                                            {/* <CiEdit /> */}

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>

                                            <input type="text" placeholder='Enter item name' name="name" value={formData.name} onChange={handleChange} />
                                        </span>
                                    </div>


                                    <div className="form-group">
                                        <label>Category</label>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M4 14H8.42109C9.35119 14 9.81624 14 9.94012 14.2801C10.064 14.5603 9.74755 14.8963 9.11466 15.5684L5.47691 19.4316C4.84402 20.1037 4.52757 20.4397 4.65145 20.7199C4.77533 21 5.24038 21 6.17048 21H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 9L6.10557 4.30527C6.49585 3.43509 6.69098 3 7 3C7.30902 3 7.50415 3.43509 7.89443 4.30527L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {/* <MdOutlineCategory /> */}
                                            {/* <img class="newclassforallsvg" src="/Icons/category.svg" alt="" /> */}

                                            <CustomDropdown03
                                                label="Category"
                                                options={catList?.data?.data?.filter(cat => cat.parent_id === "0") || []}
                                                value={formData.category_id}
                                                onChange={handleChange}
                                                name="category_id"
                                                defaultOption="Select Category"
                                            />
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <span>
                                            {/* <CiEdit /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M4 14H8.42109C9.35119 14 9.81624 14 9.94012 14.2801C10.064 14.5603 9.74755 14.8963 9.11466 15.5684L5.47691 19.4316C4.84402 20.1037 4.52757 20.4397 4.65145 20.7199C4.77533 21 5.24038 21 6.17048 21H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 9L6.10557 4.30527C6.49585 3.43509 6.69098 3 7 3C7.30902 3 7.50415 3.43509 7.89443 4.30527L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            {/* <img class="newclassforallsvg" src="/Icons/category.svg" alt="" /> */}
                                            <CustomDropdown03
                                                label="Sub Category"
                                                options={catList?.data?.data?.filter(category => category.parent_id !== "0") || []}
                                                value={formData.parent_id}
                                                onChange={handleChange}
                                                name="parent_id"
                                                defaultOption="Select Sub Category"
                                            />

                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label>SKU</label>
                                        <span>
                                            {/* <CiEdit /> */}

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M3 17.9808V12.7075C3 9.07416 3 7.25748 4.09835 6.12874C5.1967 5 6.96447 5 10.5 5C14.0355 5 15.8033 5 16.9017 6.12874C18 7.25748 18 9.07416 18 12.7075V17.9808C18 20.2867 18 21.4396 17.2755 21.8523C15.8724 22.6514 13.2405 19.9852 11.9906 19.1824C11.2657 18.7168 10.9033 18.484 10.5 18.484C10.0967 18.484 9.73425 18.7168 9.00938 19.1824C7.7595 19.9852 5.12763 22.6514 3.72454 21.8523C3 21.4396 3 20.2867 3 17.9808Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9 2H11C15.714 2 18.0711 2 19.5355 3.46447C21 4.92893 21 7.28595 21 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input type="text" name="sku" placeholder='Enter SKU' value={formData.sku} onChange={handleChange} />
                                        </span>
                                    </div>



                                    <div className="form-group">
                                        <label>Unit</label>
                                        <span>
                                            {/* <CiEdit /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M11.1075 5.57624C11.3692 6.02707 11.5 6.25248 11.5 6.5C11.5 6.74752 11.3692 6.97293 11.1075 7.42376L9.85804 9.57624C9.59636 10.0271 9.46551 10.2525 9.25 10.3762C9.03449 10.5 8.7728 10.5 8.24943 10.5H5.75057C5.2272 10.5 4.96551 10.5 4.75 10.3762C4.53449 10.2525 4.40364 10.0271 4.14196 9.57624L2.89253 7.42376C2.63084 6.97293 2.5 6.74752 2.5 6.5C2.5 6.25248 2.63084 6.02707 2.89253 5.57624L4.14196 3.42376C4.40364 2.97293 4.53449 2.74752 4.75 2.62376C4.96551 2.5 5.2272 2.5 5.75057 2.5L8.24943 2.5C8.7728 2.5 9.03449 2.5 9.25 2.62376C9.46551 2.74752 9.59636 2.97293 9.85804 3.42376L11.1075 5.57624Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21.1075 11.5762C21.3692 12.0271 21.5 12.2525 21.5 12.5C21.5 12.7475 21.3692 12.9729 21.1075 13.4238L19.858 15.5762C19.5964 16.0271 19.4655 16.2525 19.25 16.3762C19.0345 16.5 18.7728 16.5 18.2494 16.5H15.7506C15.2272 16.5 14.9655 16.5 14.75 16.3762C14.5345 16.2525 14.4036 16.0271 14.142 15.5762L12.8925 13.4238C12.6308 12.9729 12.5 12.7475 12.5 12.5C12.5 12.2525 12.6308 12.0271 12.8925 11.5762L14.142 9.42376C14.4036 8.97293 14.5345 8.74752 14.75 8.62376C14.9655 8.5 15.2272 8.5 15.7506 8.5L18.2494 8.5C18.7728 8.5 19.0345 8.5 19.25 8.62376C19.4655 8.74752 19.5964 8.97293 19.858 9.42376L21.1075 11.5762Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.1075 16.5762C11.3692 17.0271 11.5 17.2525 11.5 17.5C11.5 17.7475 11.3692 17.9729 11.1075 18.4238L9.85804 20.5762C9.59636 21.0271 9.46551 21.2525 9.25 21.3762C9.03449 21.5 8.7728 21.5 8.24943 21.5H5.75057C5.2272 21.5 4.96551 21.5 4.75 21.3762C4.53449 21.2525 4.40364 21.0271 4.14196 20.5762L2.89253 18.4238C2.63084 17.9729 2.5 17.7475 2.5 17.5C2.5 17.2525 2.63084 17.0271 2.89253 16.5762L4.14196 14.4238C4.40364 13.9729 4.53449 13.7475 4.75 13.6238C4.96551 13.5 5.2272 13.5 5.75057 13.5L8.24943 13.5C8.7728 13.5 9.03449 13.5 9.25 13.6238C9.46551 13.7475 9.59636 13.9729 9.85804 14.4238L11.1075 16.5762Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            <CustomDropdown04
                                                label="Unit Name"
                                                options={masterData?.filter(type => type.type === "2")}
                                                value={formData.unitName}
                                                onChange={handleChange}
                                                name="unitName"
                                                defaultOption="Select Units"
                                            />

                                        </span>
                                    </div>


                                    <div className="form-group">
                                        <label>HSN code</label>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M18 16L19.8398 17.5858C20.6133 18.2525 21 18.5858 21 19C21 19.4142 20.6133 19.7475 19.8398 20.4142L18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 16L12.1602 17.5858C11.3867 18.2525 11 18.5858 11 19C11 19.4142 11.3867 19.7475 12.1602 20.4142L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20 13.0032L20 7.8199C20 6.12616 20 5.27929 19.732 4.60291C19.3013 3.51555 18.3902 2.65784 17.2352 2.25228C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44148C5.81714 3.15122 4.22281 4.6522 3.46894 6.55509C3 7.73875 3 9.22077 3 12.1848L3 14.731C3 17.8013 3 19.3364 3.8477 20.4025C4.09058 20.708 4.37862 20.9792 4.70307 21.2078C5.61506 21.8506 6.85019 21.9757 9 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 12C3 10.159 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {/* <CiReceipt /> */}
                                            <input type="number" name="hsn_code" placeholder='Enter HSN code' enterKeyHint='hsn code' value={formData.hsn_code} onChange={handleChange} />
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Opening stock:</label>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            {/* <MdOutlineInventory /> */}
                                            <input type="number" name="opening_stock" placeholder='Enter stock quantity' value={formData.opening_stock} onChange={handleChange} />
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>As of date</label>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                <path d="M11 13H16M8 13H8.00898M13 17H8M16 17H15.991" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>

                                            {/* <CiEdit /> */}
                                            <input type="date" name="as_on_date" placeholder='Enter Date' value={formData.as_on_date} onChange={handleChange} />
                                        </span>
                                    </div>
                                    <div id="imgurlanddesc">
                                        <div className="form-group">
                                            <label>Upload Image</label>
                                            <div className="file-upload">
                                                <input
                                                    type="file"
                                                    name="image_url"
                                                    id="file"
                                                    className="inputfile"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <label htmlFor="file" className="file-label">
                                                    {/* <CiImageOn /> */}
                                                    <div id='spc5s6'>
                                                        {/* <p> Drag & drop logo file</p> */}
                                                        {/* <br /> */}
                                                        {/* <p>or</p> */}
                                                        {/* <br /> */}
                                                        {/* <span id="extrabtnsx">
                    {formData.image_url ? formData.image_url.name : 'Browse Files'}
                  </span> */}
                                                        <CiExport />
                                                        {formData.image_url ? formData.image_url.name : 'Browse Files'}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>


                                        {/* <button type="submit">Submit</button> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="breakerci"></div> */}

                            <div className="secondsecx15">

                                <div id="dataofsalesprices">


                                    <div className="x1inssalx5">

                                        <p className="xkls5663">
                                            <IoCheckbox
                                                style={isChecked.checkbox1 ? { fill: "white", border: "2px solid", borderRadius: "5px" } : {}}
                                                onClick={() => handleCheckboxClick('checkbox1')}
                                            />
                                            Sales information
                                        </p>
                                        <span className='newspanx21s'>

                                            <div className="form-group">
                                                {/* <label>Sales Price<b className='color_red'>*</b></label> */}

                                                <label className='color_red'>Sales Price*</label>
                                                <span>
                                                    {/* <IoPricetagOutline /> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                        <path d="M10.9961 10H11.0111M10.9998 16H11.0148" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M7 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(1 0 0 -1 16 8)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
                                                    </svg>

                                                    <input type="number" disabled={isChecked?.checkbox1} name="price" placeholder="Enter sales price" value={formData.price} onChange={handleChange} />
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                {/* <label>Sales Account<b className='color_red'>*</b></label> */}
                                                <label className='color_red'>Sales Account*</label>
                                                <span className='primarycolortext'>
                                                    {/* <IoPricetagOutline /> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                                                        <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>

                                                    <CustomDropdown05
                                                        label="Sales Account"
                                                        options={accList?.data?.accounts || []}
                                                        value={formData.sale_acc_id}
                                                        onChange={handleChange}
                                                        name="sale_acc_id"
                                                        defaultOption="Select Sales Account"
                                                        isDisabled={isChecked?.checkbox1}
                                                    />
                                                </span>
                                            </div>
                                        </span>



                                        <div className="form-group">
                                            <label>Sale Description</label>
                                            <textarea name="sale_description" disabled={isChecked?.checkbox1} placeholder='Enter sale description' value={formData.sale_description} onChange={handleChange} rows="4" />
                                        </div>
                                    </div>


                                    <div className="breakerci"></div>

                                    <div className="x2inssalx5">
                                        <p className="xkls5663">
                                            <IoCheckbox
                                                style={isChecked.checkbox2 ? { fill: "white", border: "2px solid", borderRadius: "5px" } : {}}
                                                onClick={() => handleCheckboxClick('checkbox2')}
                                            />
                                            Purchase information
                                        </p>
                                        <span className='newspanx21s'>
                                            <div className="form-group">
                                                <label>Purchase Price</label>
                                                <span>
                                                    {/* <IoPricetagOutline /> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
                                                        <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
                                                        <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                    <input disabled={isChecked?.checkbox2} type="number" name="purchase_price" placeholder="Enter purchase price" value={formData.purchase_price} onChange={handleChange} />
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label>Purchase Account</label>
                                                <span className='primarycolortext'>
                                                    {/* <IoPricetagOutline /> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#9B7DCE"} fill={"none"}>
                                                        <path d="M20 12.5C19.9751 12.4136 19.9499 12.326 19.9244 12.2373C18.8875 8.63723 17.4956 7.5 13.4291 7.5H9.65019C5.74529 7.5 4.23479 8.48796 3.1549 12.2373C2.18223 15.6144 1.6959 17.3029 2.20436 18.6124C2.51576 19.4143 3.06862 20.1097 3.79294 20.6104C5.17171 21.5636 8.63187 22.0381 12 21.9976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M7 8V6.36364C7 3.95367 9.01472 2 11.5 2C13.9853 2 16 3.95367 16 6.36364V8" stroke="currentColor" strokeWidth="1.5" />
                                                        <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M10.5 11H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>


                                                    <CustomDropdown05
                                                        label="Purchase Account"
                                                        options={accList?.data?.accounts || []}
                                                        value={formData.purchase_acc_id}
                                                        onChange={handleChange}
                                                        name="purchase_acc_id"
                                                        defaultOption="Type or select vendor"
                                                        isDisabled={isChecked?.checkbox2}
                                                    />

                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label>Preferred vendor</label>
                                                <span>
                                                    {/* <IoPricetagOutline /> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                                                        <path d="M20 22V17C20 15.1144 20 14.1716 19.4142 13.5858C18.8284 13 17.8856 13 16 13L12 22L8 13C6.11438 13 5.17157 13 4.58579 13.5858C4 14.1716 4 15.1144 4 17V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M12 15L11.5 19L12 20.5L12.5 19L12 15ZM12 15L11 13H13L12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M15.5 6.5V5.5C15.5 3.567 13.933 2 12 2C10.067 2 8.5 3.567 8.5 5.5V6.5C8.5 8.433 10.067 10 12 10C13.933 10 15.5 8.433 15.5 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>


                                                    <CustomDropdown06
                                                        label="Preferred Vendor"
                                                        options={vendorList?.user || []}
                                                        value={formData.preferred_vendor}
                                                        onChange={handleChange}
                                                        name="preferred_vendor"
                                                        defaultOption="Select Preferred Vendor"
                                                        isDisabled={isChecked?.checkbox2}
                                                    />

                                                </span>
                                            </div>
                                        </span>
                                        <div className="form-group">
                                            <label>Purchase Description</label>
                                            <textarea name="purchase_description" placeholder='Enter purchase description' disabled={isChecked?.checkbox2} value={formData.purchase_description} onChange={handleChange} rows="4" />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="breakerci"></div> */}
                            </div>
                            <div id="thirdsec123s">
                                <div id="extrafieldx56s">

                                    <div className="form-group">
                                        <label>Tag ID's</label>
                                        <span>
                                            {/* <IoPricetagOutline /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
                                                <path d="M17.5 5C18.3284 5 19 5.67157 19 6.5C19 7.32843 18.3284 8 17.5 8C16.6716 8 16 7.32843 16 6.5C16 5.67157 16.6716 5 17.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M13.7884 12.3665C13.8097 11.9655 13.9222 11.232 13.3125 10.6744M13.3125 10.6744C13.1238 10.5019 12.866 10.3462 12.5149 10.2225C11.2583 9.77958 9.71484 11.2619 10.8067 12.6188C11.3936 13.3482 11.8461 13.5725 11.8035 14.4008C11.7735 14.9834 11.2012 15.5922 10.4469 15.824C9.7916 16.0255 9.06876 15.7588 8.61156 15.2479C8.05332 14.6241 8.1097 14.0361 8.10492 13.7798M13.3125 10.6744L14.0006 9.98633M8.66131 15.3256L8.00781 15.9791" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <input type="number" name="tag_ids" placeholder="Enter tag id" value={formData.tag_ids} onChange={handleChange} />
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Tax preference</label>
                                        <span>
                                            {/* <IoPricetagOutline /> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                                                <path d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M4 10V18.5M8 10V18.5" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M21.5 14.5L14.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="15.25" cy="15.25" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                                <circle cx="20.75" cy="20.75" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>


                                            <CustomDropdown04
                                                label="Tax Preference"
                                                options={masterData?.filter(type => type.type === "6")}
                                                value={formData.tax_preference_Name}
                                                onChange={handleChange}
                                                name="tax_preference_Name"
                                                defaultOption="Select Tax Preference"
                                            />
                                        </span>
                                    </div>

                                    {formData?.tax_preference_Name === "Non-Taxable" &&
                                        <div className="form-group">
                                            <label>Exemption Reason </label>
                                            <span>
                                                {/* <IoPricetagOutline /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                                                    <path d="M2 8.56907C2 7.37289 2.48238 6.63982 3.48063 6.08428L7.58987 3.79744C9.7431 2.59915 10.8197 2 12 2C13.1803 2 14.2569 2.59915 16.4101 3.79744L20.5194 6.08428C21.5176 6.63982 22 7.3729 22 8.56907C22 8.89343 22 9.05561 21.9646 9.18894C21.7785 9.88945 21.1437 10 20.5307 10H3.46928C2.85627 10 2.22152 9.88944 2.03542 9.18894C2 9.05561 2 8.89343 2 8.56907Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M4 10V18.5M8 10V18.5" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M11 18.5H5C3.34315 18.5 2 19.8431 2 21.5C2 21.7761 2.22386 22 2.5 22H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M21.5 14.5L14.5 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <circle cx="15.25" cy="15.25" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                                    <circle cx="20.75" cy="20.75" r="0.75" stroke="currentColor" strokeWidth="1.5" />
                                                </svg>

                                                <input className='primarycolortext' type="text" name="exemption_reason" placeholder="Enter Exemption Reason" value={formData.exemption_reason} onChange={handleChange} />
                                            </span>
                                        </div>
                                    }


                                </div>
                                <div id="taxratessection">
                                    <p className="xkls5663">
                                        Default tax rates
                                    </p>
                                    <span className='newspanx21s'>
                                        <div className="form-group">
                                            <label>Tax Rate (%)</label>
                                            <span>
                                                {/* <IoPricetagOutline /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#929292"} fill={"none"}>
                                                    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                    <path d="M15 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M21 13V11C21 6.75736 21 4.63604 19.682 3.31802C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.31802C3 4.63604 3 6.75736 3 11V13C3 17.2426 3 19.364 4.31802 20.682C5.63604 22 7.75736 22 12 22C16.2426 22 18.364 22 19.682 20.682C21 19.364 21 17.2426 21 13Z" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M7 14H7.52632M11.7368 14H12.2632M16.4737 14H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7 18H7.52632M11.7368 18H12.2632M16.4737 18H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                                <input className='primarycolortext' type="number" name="tax_rate" placeholder="Enter tax rate " value={formData.tax_rate} onChange={handleChange} />
                                            </span>
                                        </div>

                                    </span>

                                </div>
                            </div>
                        </div>
                        {/* itemId, edit: isEdit */}
                        {itemId && isEdit ? <div className="actionbar">
                            <button id='herobtnskls' className={itemCreatedData?.loading ? 'btn-loading' : ''} type="submit" disabled={itemCreatedData?.loading}>
                                {itemCreatedData?.loading ? "Submiting" : <p>Update<BsArrowRight /></p>}
                            </button>
                            <button type='button'>Cancel</button>
                        </div> : <div className="actionbar">
                            <button id='herobtnskls' className={itemCreatedData?.loading ? 'btn-loading' : ''} type="submit" disabled={itemCreatedData?.loading}>
                                {itemCreatedData?.loading ? "Submiting" : <p>Submit<BsArrowRight /></p>}
                            </button>
                            <button type='button'>Cancel</button>
                        </div>}

                    </form>

                    <div id="rightsideimage">
                        {formData.image_url && (
                            <div className="file-preview">
                                <h2>Uploaded File Preview:</h2>
                                <img src={formData.image_url} alt="Uploaded File" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default CreateAndUpdateItem;
