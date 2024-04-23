import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCountries, fetchGetStates } from '../../../Redux/Actions/globalActions';

const CustomerAddress = ({ updateUserData }) => {
    const dispatch = useDispatch();
    const countryList = useSelector(state => state?.countries?.countries);
    const states = useSelector(state => state?.states?.country
    );
    console.log("countryList", countryList);
    console.log("states", states);

    const [addresses, setAddresses] = useState([
        {
            country_id: "",
            street_1: "",
            street_2: "",
            state_id: "",
            city_id: "",
            zip_code: "",
            address_type: "",
            is_billing: 1,
            is_shipping: 1,
            phone_no: "",
            fax_no: ""
        }
    ]);

    const addNewAddress = () => {
        setAddresses(prevAddresses => [
            ...prevAddresses,
            {
                country_id: "", // Empty default values for a new address
                street_1: "",
                street_2: "",
                state_id: "",
                city_id: "",
                zip_code: "",
                address_type: "",
                is_billing: 0,
                is_shipping: 0,
                phone_no: "",
                fax_no: ""
            }
        ]);
    };

    const handleChange = (e, index, fieldType) => {
        const { name, value } = e.target;
        const updatedAddresses = [...addresses];
        if (fieldType === 'country_id') {
            // Handle country selection
            const countryId = value;
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [name]: value,
                state_id: "", // Reset state_id when country changes
                city_id: "", // Reset city_id when country changes
            };
            setAddresses(updatedAddresses);
            // Fetch states based on the selected country
            dispatch(fetchGetStates({ country_id: countryId }));
        } else {
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [name]: value,
            };
            setAddresses(updatedAddresses);
        }
        updateUserData({ addresses: updatedAddresses });
    };

    useEffect(() => {
        dispatch(fetchGetCountries());
    }, [dispatch, addresses?.country_id]);

    return (
        <>
            <p>Customer Address</p>

            {addresses?.map((address, index) => (
                <div key={index}>
                    <div id="secondx2_customer">
                        <div id="main_forms_desigin_cus">
                            <div className="form-group">
                                <label className='color_red'>Country/Region*</label>
                                <span>
                                    <select
                                        name="country_id"
                                        value={address.country_id}
                                        onChange={(e) => handleChange(e, index, 'country_id')}
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countryList?.country?.map(country => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                    </select>
                                </span>
                            </div>

                            <div className="form-group">
                                <label className='color_red'>Address</label>
                                <div id="inputx12">
                                    <span>
                                        <input
                                            type="text"
                                            name="street_1"
                                            placeholder="street 1"
                                            value={address.street_1}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </span>
                                    <span>
                                        <input
                                            type="text"
                                            name="street_2"
                                            placeholder="street 2"
                                            value={address.street_2}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="secondx2_customer">
                        <div id="main_forms_desigin_cus">
                            <div className="form-group">
                                <label className='color_red'>City</label>
                                <span>
                                    <input
                                        type="text"
                                        style={{ width: "100%" }}
                                        name="city_id"
                                        placeholder="Enter your city"
                                        value={address.city_id}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </span>
                            </div>

                            <div className="form-group">
                                <label className='color_red'>State</label>
                                <div id="inputx1">
                                    <span>
                                        <select
                                            name="state_id"
                                            value={address.state_id}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                        >
                                            <option value="">Select State</option>
                                            {countryList?.country?.map(state => (
                                                <option key={state.id} value={state.id}>{state.name}</option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="secondx2_customer">
                        <div id="main_forms_desigin_cus">
                            <div className="form-group">
                                <label className='color_red'>Zip Code</label>
                                <div id="inputx1">
                                    <span>
                                        <input
                                            type="text"
                                            name="zip_code"
                                            placeholder="Enter zip code"
                                            value={address.zip_code}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className='color_red'>Contact</label>
                                <div id="inputx12">
                                    <span>
                                        <input
                                            type="text"
                                            name="phone_no"
                                            placeholder="Enter Phone no."
                                            value={address.phone_no}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </span>
                                    <span>
                                        <input
                                            type="text"
                                            name="fax_no"
                                            placeholder="Enter Fax no."
                                            value={address.fax_no}
                                            onChange={(e) => handleChange(e, index)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="secondx2_customer">
                        <div id="main_forms_desigin_cus">
                            <div className="form-groupx1">
                                <label> Address Type:</label>
                                <span>
                                    <button
                                        className={`type-button ${address.address_type === 'Billing' && 'selectedbtn'}`}
                                        onClick={() => handleChange({ target: { name: 'address_type', value: 'Billing' } }, index)}
                                    >
                                        Billing
                                    </button>
                                    <button
                                        className={`type-button ${address.address_type === 'Shipping' && 'selectedbtn'}`}
                                        onClick={() => handleChange({ target: { name: 'address_type', value: 'Shipping' } }, index)}
                                    >
                                        Shipping
                                    </button>
                                    <button
                                        className={`type-button ${address.address_type === 'Both' && 'selectedbtn'}`}
                                        onClick={() => handleChange({ target: { name: 'address_type', value: 'Both' } }, index)}
                                    >
                                        Both
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addNewAddress}>Add New Address</button>
        </>
    );
}

export default CustomerAddress;
