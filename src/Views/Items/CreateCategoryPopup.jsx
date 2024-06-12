import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories } from '../../Redux/Actions/categoriesActions';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../Helper/PopupData';

const CreateCategoryPopup = ({ categoryData, setClickTrigger, setShowPopup, refreshCategoryListData, parent_id }) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state?.createCategory);

    const [formData, setFormData] = useState({
        name: categoryData?.name || "",
        fullurl: null,
        [categoryData?.id ? "id" : "parent_id"]: categoryData?.id || 0,
        description: null
    });
    const popupRef = useRef(null);

    useEffect(() => {
        setFormData({
            ...formData,
            name: categoryData?.name,
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useOutsideClick(popupRef, () => setShowPopup(false));

    const handleSubmitCategory = async () => {
        try {
            let sendDataForCategory = { ...formData };
            setShowPopup(true);
            if (parent_id) {
                dispatch(createCategories({ parent_id: parent_id, name: formData?.name }, Navigate))
                    .finally(() => {
                        if (categoryData) {
                            setShowPopup(false);
                            setClickTrigger(prevTrigger => !prevTrigger);
                            refreshCategoryListData();
                        } else {

                            refreshCategoryListData();
                            setShowPopup(false);
                            toast.success("Sub-Category added success")

                        }
                        // Call the refreshData callback to refresh the data in the CreateCategory component
                        refreshCategoryListData();
                    });
            } else {
                dispatch(createCategories(sendDataForCategory, Navigate))
                    .finally(() => {
                        if (categoryData) {
                            setShowPopup(false);
                            setClickTrigger(prevTrigger => !prevTrigger);
                            refreshCategoryListData();
                        } else {

                            refreshCategoryListData();
                            setShowPopup(false);
                            toast.success("Category added success")

                        }
                        // Call the refreshData callback to refresh the data in the CreateCategory component
                        refreshCategoryListData();
                    });
            }

        } catch (error) {
        }
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                handleSubmitCategory();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmitCategory]);
    return (
        <>
            <Toaster />

            <div className="mainxpopups1" ref={popupRef}>
                <div className="popup-content">
                    <span className="close-button" onClick={() => setShowPopup(false)}><RxCross2 /></span>
                    {parent_id ? <h2>Add Sub-Category</h2> : <>{categoryData ? <h2>Update Category</h2> : <h2>Add Category</h2>}</>}

                    <div className="midpopusec12x">
                        <div className="form_commonblock">
                            <label>Name</label>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                    <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input name="name" placeholder='Enter Name' autoFocus="on" value={formData.name} onChange={handleChange} />
                            </span>
                        </div>
                        <div className={`submitbuttons1  ${!formData?.name ? "disabledfield" : ""}`} onClick={() => handleSubmitCategory()}>
                            <span>
                                <p>{categoryData?.id ? (data?.loading === true ? "Updating" : "Update") : (data?.loading === true ? "Submitting" : "Submit")}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                                    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateCategoryPopup;
