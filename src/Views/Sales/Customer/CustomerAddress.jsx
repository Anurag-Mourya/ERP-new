import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCountries, fetchGetStates, fetchGetCities } from '../../../Redux/Actions/globalActions';

const CustomerAddress = ({ updateUserData }) => {
    const dispatch = useDispatch();
    const countryList = useSelector(state => state?.countries?.countries);
    const states = useSelector(state => state?.states?.state);
    const cities = useSelector(state => state?.cities?.city);
    console.log("countryList", countryList);
    console.log("states", states);
    console.log("cities", cities);

    const [addresses, setAddresses] = useState(() => {
        // Retrieve addresses from local storage or initialize with default values
        const savedAddresses = localStorage.getItem('addresses');
        return savedAddresses ? JSON.parse(savedAddresses) : [
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
        ];
    });

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
        console.log('Field Type:', fieldType);
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
        } else if (name === 'state_id') {
            // Handle state selection
            const stateId = value;
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [name]: value,
                city_id: "", // Reset city_id when state changes
            };
            setAddresses(updatedAddresses);
            // Fetch cities based on the selected state
            dispatch(fetchGetCities({ state_id: stateId }));
        } else {
            updatedAddresses[index] = {
                ...updatedAddresses[index],
                [name]: value,
            };
            setAddresses(updatedAddresses);
        }


        switch (value) {
            case 'Billing':
                updatedAddresses[index] = {
                    ...updatedAddresses[index],
                    is_billing: 1,
                    is_shipping: 0,
                };
                break;
            case 'Shipping':
                updatedAddresses[index] = {
                    ...updatedAddresses[index],
                    is_billing: 0,
                    is_shipping: 1,
                };
                break;
            case 'Both':
                updatedAddresses[index] = {
                    ...updatedAddresses[index],
                    is_billing: 1,
                    is_shipping: 1,
                };
                break;
            default:
                // Handle default case if needed
                break;
        }
        updateUserData({ addresses: updatedAddresses });
    };

    useEffect(() => {
        dispatch(fetchGetCountries());
    }, [dispatch]);

    useEffect(() => {
        // Save addresses to local storage whenever it changes
        localStorage.setItem('addresses', JSON.stringify(addresses));

        // Set up event listener to remove data from local storage when leaving the page
        const handleBeforeUnload = () => {
            localStorage.removeItem('addresses');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [addresses]);

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
                                            {states?.country?.map(state => (
                                                <option key={state.id} value={state.id}>{state.name}</option>
                                            ))}
                                        </select>
                                    </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className='color_red'>City</label>
                                <span>
                                    <select
                                        name="city_id"
                                        value={address.city_id}
                                        onChange={(e) => handleChange(e, index)}
                                        required
                                    >
                                        <option value="">Select City</option>
                                        {cities?.country?.map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </span>
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
