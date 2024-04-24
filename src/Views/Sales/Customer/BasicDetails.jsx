import React, { useEffect, useState } from 'react';
import { fetchMasterData } from '../../../Redux/Actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown03 from '../../../Components/CustomDropdown/CustomDropdown03';
import CustomDropdown04 from '../../../Components/CustomDropdown/CustomDropdown04';


const BasicDetails = ({ updateUserData }) => {
    const dispatch = useDispatch();
    const { masterData } = useSelector(state => state?.masterData);
    const [basicDetails, setBasicDetails] = useState(() => {
        // Retrieve basicDetails from local storage or initialize with default values
        const savedBasicDetails = localStorage.getItem('basicDetails');
        return savedBasicDetails ? JSON.parse(savedBasicDetails) : {
            salutation: "",
            first_name: "",
            last_name: "",
            email: "",
            mobile_no: "",
            work_phone: "",
            customer_type: "",
            is_customer: 1,
            gst_no: "",
            pan_no: "",
            display_name: "",
            company_name: "",
            place_of_supply: "",
            tax_preference: 1,
            currency: 25,
        };
    });

    const taxPreferenceData = [
        {
            lableId: 1,
            lable: "Taxable"
        },
        {
            lableId: 2,
            lable: "Tax Exempt"
        }
    ]


    const handleChange = (e) => {
        const { name, value } = e.target;
        setBasicDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

    };

    const handleTaxPreferenceChange = (labelId) => {
        setBasicDetails((prevDetails) => ({
            ...prevDetails,
            tax_preference: labelId,
        }));
    };

    const handleCustomerTypeChange = (type) => {
        setBasicDetails((prevDetails) => ({
            ...prevDetails,
            customer_type: type,
        }));

        // Update userData in the parent component with customer_type
        updateUserData({ customer_type: type });
    };

    useEffect(() => {
        updateUserData(basicDetails);
        dispatch(fetchMasterData())
    }, [basicDetails]);

    useEffect(() => {
        // Save basicDetails to local storage whenever it changes
        localStorage.setItem('basicDetails', JSON.stringify(basicDetails));

        // Set up event listener to remove data from local storage when leaving the page
        const handleBeforeUnload = () => {
            localStorage.removeItem('basicDetails');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [basicDetails]);
    return (
        <>
            <p>Basic Details</p>
            <div id="secondx2_customer">
                <div id="main_forms_desigin_cus">
                    <div className="form-group">
                        <label className='color_red'>Email*</label>
                        <span>
                            <input type="email" name="email" value={basicDetails.email} onChange={handleChange} placeholder="Enter customer email" />
                        </span>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Customer Name*</label>
                        <div id="inputx12">
                            <span>
                                <select name="salutation" value={basicDetails?.salutation} onChange={handleChange} style={{ width: "150px" }}>
                                    <option value="">Select a Salutation</option>
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
                                <input type="input" name="first_name" value={basicDetails.first_name} onChange={handleChange} placeholder="Enter customer first name" />
                            </span>

                            <span><input type="input" name="last_name" value={basicDetails.last_name} onChange={handleChange} placeholder="Enter customer last name" /></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Mobile number*</label>
                        <span>
                            <input type="number" style={{ width: "100%" }} name="mobile_no" value={basicDetails.mobile_no} onChange={handleChange} placeholder="Enter customer mobile no" />
                        </span>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Work phone*</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="number" name="work_phone" value={basicDetails.work_phone} onChange={handleChange} placeholder="Enter Customer work phone" /></span>
                        </div>
                    </div>
                    <div className="form-groupx1">
                        <label> Customer Type:</label>
                        <span>
                            <button
                                className={`type-button ${basicDetails.customer_type === 'Individual' && 'selectedbtn'}`}
                                onClick={() => handleCustomerTypeChange('Individual')}
                            >
                                Individual
                            </button>
                            <button
                                className={`type-button ${basicDetails.customer_type === 'Business' && 'selectedbtn'}`}
                                onClick={() => handleCustomerTypeChange('Business')}
                            >
                                Business
                            </button>
                        </span>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Display Name*</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="text" name="display_name" value={basicDetails.display_name} onChange={handleChange} placeholder="Display Name" /></span>
                        </div>
                    </div>
                    <div className="form-groupx1">
                        <label> Tax Preference:</label>
                        <span>
                            {taxPreferenceData.map((item) => (
                                <button
                                    key={item.lableId}
                                    className={`type-button ${basicDetails.tax_preference === item.lableId && 'selectedbtn'}`}
                                    onClick={() => handleTaxPreferenceChange(item.lableId)}
                                >
                                    {item.lable}
                                </button>
                            ))}
                        </span>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Place of Supply*</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="text" name="place_of_supply" value={basicDetails.place_of_supply} onChange={handleChange} placeholder="Place of Supply" /></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>GST no.</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="number" name="gst_no" value={basicDetails.gst_no} onChange={handleChange} placeholder="Enter GST no" /></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>PAN no.</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="number" name="pan_no" value={basicDetails.pan_no} onChange={handleChange} placeholder="Enter PAN no" /></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Company Name</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="text" name="company_name" value={basicDetails.company_name} onChange={handleChange} placeholder="Enter company name" /></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='color_red'>Currency</label>
                        <div id="inputx1">
                            <span><input style={{ width: "100%" }} type="text" name="currency" value={basicDetails.currency} onChange={handleChange} placeholder="Enter Currency" /></span>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};

export default BasicDetails;
