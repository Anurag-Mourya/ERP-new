import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCountries, fetchGetStates, fetchGetCities } from '../../../Redux/Actions/globalActions';
import { AiOutlineDelete } from 'react-icons/ai';

const CustomerAddress = ({ updateUserData }) => {
    const dispatch = useDispatch();
    const countryList = useSelector(state => state?.countries?.countries);
    const states = useSelector(state => state?.states?.state);
    const cities = useSelector(state => state?.cities?.city);
    console.log("countryList", countryList);
    console.log("states", states);
    console.log("cities", cities);

    const [addresses, setAddresses] = useState(() => {
        const savedAddresses = sessionStorage.getItem('addresses');
        return savedAddresses ? JSON.parse(savedAddresses) : [
            {
                country_id: "",
                street_1: "",
                street_2: "",
                state_id: "",
                city_id: "",
                zip_code: "",
                address_type: "",
                is_billing: 0,
                is_shipping: 1,
                phone_no: "",
                fax_no: ""
            }
        ];
    });

    console.log("address", addresses)
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

    const handleChange = (e, index, fieldType, type) => {
        const { name, value, checked } = e.target;
        const updatedAddresses = [...addresses];
        let address = { ...updatedAddresses[index] }; // Copy the address object

        if (fieldType === 'country_id') {
            const countryId = value;
            updatedAddresses[index] = {
                ...address,
                [name]: value,
                state_id: "", // Reset state_id when country changes
                city_id: "", // Reset city_id when country changes
            };
            setAddresses(updatedAddresses);
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
        }

        else {
            if (fieldType === 'address_type') {
                if (type === 'Shipping') {
                    address.is_shipping = checked ? 1 : 0;
                } else if (type === 'Billing') {
                    address.is_billing = checked ? 1 : 0;
                }
            } else {
                address = {
                    ...address,
                    [name]: value,
                };
            }
            updatedAddresses[index] = address;
            setAddresses(updatedAddresses);
        }

        updateUserData({ addresses: updatedAddresses });
    };


    useEffect(() => {
        dispatch(fetchGetCountries());
    }, [dispatch]);

    const deleteAddress = (index) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
        updateUserData({ addresses: updatedAddresses });
    };

    useEffect(() => {
        sessionStorage.setItem('addresses', JSON.stringify(addresses));

        const handleBeforeUnload = () => {
            sessionStorage.removeItem('addresses');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [addresses]);


    return (
        <>
            <div id="secondx2_customer"  >
                {addresses?.map((address, index) => (
                    <div id="main_forms_desigin_cus" key={index}>


                        <div className="iconheading">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                <path d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M18.2222 17C19.6167 18.9885 20.2838 20.0475 19.8865 20.8999C19.8466 20.9854 19.7999 21.0679 19.7469 21.1467C19.1724 22 17.6875 22 14.7178 22H9.28223C6.31251 22 4.82765 22 4.25311 21.1467C4.20005 21.0679 4.15339 20.9854 4.11355 20.8999C3.71619 20.0475 4.38326 18.9885 5.77778 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <p>Address {index + 1}</p>
                            {index >= 1 &&
                                <AiOutlineDelete onClick={() => deleteAddress(index)} className="deletecust" style={{ cursor: "pointer" }} />
                            }
                        </div>
                        <div className='checkboxcontainer5s'>

                            <div className='checkboxcontainer5s'>
                                <label>
                                    <input type="checkbox" name='is_shipping' checked={address.is_shipping === 1} onChange={(e) => handleChange(e, index, 'address_type', 'Shipping')} />
                                    Shipping address
                                </label>

                                <label>
                                    <input type="checkbox" name='is_billing' checked={address.is_billing === 1} onChange={(e) => handleChange(e, index, 'address_type', 'Billing')} />
                                    Billing address
                                </label>
                            </div>
                        </div>

                        <div id="fcx3s1parent">
                            <div className="form_commonblock">
                                <label>Street 1</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M3.25195 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.252 3V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.75195 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.75195 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.75195 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.6124 13.4393L20.3067 14.1317C20.8941 14.7175 20.8941 15.6672 20.3067 16.253L16.6692 19.9487C16.3831 20.234 16.0171 20.4264 15.6193 20.5005L13.3649 20.9885C13.009 21.0656 12.692 20.7504 12.7683 20.3952L13.2481 18.1599C13.3224 17.7632 13.5153 17.3982 13.8015 17.1129L17.4852 13.4393C18.0726 12.8536 19.025 12.8536 19.6124 13.4393Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="street_1"
                                            placeholder="street 1"
                                            value={address.street_1}
                                            onChange={(e) => handleChange(e, index)}
                                        /></span>
                                </div>
                            </div>

                            <div className="form_commonblock">
                                <label>Street 2</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M3.25195 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.252 3V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.75195 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.75195 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.75195 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.6124 13.4393L20.3067 14.1317C20.8941 14.7175 20.8941 15.6672 20.3067 16.253L16.6692 19.9487C16.3831 20.234 16.0171 20.4264 15.6193 20.5005L13.3649 20.9885C13.009 21.0656 12.692 20.7504 12.7683 20.3952L13.2481 18.1599C13.3224 17.7632 13.5153 17.3982 13.8015 17.1129L17.4852 13.4393C18.0726 12.8536 19.025 12.8536 19.6124 13.4393Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="street_2"
                                            placeholder="street 2"
                                            value={address.street_2}
                                            onChange={(e) => handleChange(e, index)}
                                        /></span>
                                </div>
                            </div>


                            <div className="form_commonblock">
                                <label>State</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M22 12.0889V9.23578C22 7.29177 22 6.31978 21.4142 5.71584C20.8284 5.11192 19.8856 5.11192 18 5.11192H15.9214C15.004 5.11192 14.9964 5.11013 14.1715 4.69638L10.8399 3.0254C9.44884 2.32773 8.75332 1.97889 8.01238 2.00314C7.27143 2.02738 6.59877 2.42098 5.25345 3.20819L4.02558 3.92667C3.03739 4.5049 2.54329 4.79402 2.27164 5.27499C2 5.75596 2 6.34169 2 7.51313V15.7487C2 17.2879 2 18.0575 2.34226 18.4859C2.57001 18.7708 2.88916 18.9625 3.242 19.026C3.77226 19.1214 4.42148 18.7416 5.71987 17.9817C6.60156 17.4659 7.45011 16.9301 8.50487 17.0754C9.38869 17.1971 10.21 17.756 11 18.1522" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 2.00195V17.0359" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M15 5.00879V11.0224" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20.1069 20.1754L21.9521 21.9984M21.1691 17.6381C21.1691 19.6048 19.5752 21.1991 17.609 21.1991C15.6428 21.1991 14.0488 19.6048 14.0488 17.6381C14.0488 15.6714 15.6428 14.0771 17.609 14.0771C19.5752 14.0771 21.1691 15.6714 21.1691 17.6381Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>

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
                        </div>


                        <div id="fcx3s1parent">

                            <div className="form_commonblock">
                                <label>City</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M14 8H10C7.518 8 7 8.518 7 11V22H17V11C17 8.518 16.482 8 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M11 12L13 12M11 15H13M11 18H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 22V8.18564C21 6.95735 21 6.3432 20.7013 5.84966C20.4026 5.35612 19.8647 5.08147 18.7889 4.53216L14.4472 2.31536C13.2868 1.72284 13 1.93166 13 3.22873V7.7035" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 22V13C3 12.1727 3.17267 12 4 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 22H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
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




                            <div className="form_commonblock">
                                <label>Country/region</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M4 7L4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.7576 3.90865C8.45236 2.22497 5.85125 3.21144 4.55426 4.2192C4.32048 4.40085 4.20358 4.49167 4.10179 4.69967C4 4.90767 4 5.10138 4 5.4888V14.7319C4.9697 13.6342 7.87879 11.9328 11.7576 13.9086C15.224 15.6744 18.1741 14.9424 19.5697 14.1795C19.7633 14.0737 19.8601 14.0207 19.9301 13.9028C20 13.7849 20 13.6569 20 13.4009V5.87389C20 5.04538 20 4.63113 19.8027 4.48106C19.6053 4.33099 19.1436 4.459 18.2202 4.71504C16.64 5.15319 14.3423 5.22532 11.7576 3.90865Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

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
                            </div>




                            <div className="form_commonblock">
                                <label>Phone number</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="phone_no"
                                            placeholder="Enter Phone no."
                                            value={address.phone_no}
                                            onChange={(e) => handleChange(e, index)}
                                        /></span>
                                </div>
                            </div>



                        </div>


                        <div id="fcx3s1parent">




                            <div className="form_commonblock">
                                <label>Fax number</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M7.35396 18C5.23084 18 4.16928 18 3.41349 17.5468C2.91953 17.2506 2.52158 16.8271 2.26475 16.3242C1.87179 15.5547 1.97742 14.5373 2.18868 12.5025C2.36503 10.8039 2.45321 9.95455 2.88684 9.33081C3.17153 8.92129 3.55659 8.58564 4.00797 8.35353C4.69548 8 5.58164 8 7.35396 8H16.646C18.4184 8 19.3045 8 19.992 8.35353C20.4434 8.58564 20.8285 8.92129 21.1132 9.33081C21.5468 9.95455 21.635 10.8039 21.8113 12.5025C22.0226 14.5373 22.1282 15.5547 21.7352 16.3242C21.4784 16.8271 21.0805 17.2506 20.5865 17.5468C19.8307 18 18.7692 18 16.646 18" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M17 8V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M13.9887 16L10.0113 16C9.32602 16 8.98337 16 8.69183 16.1089C8.30311 16.254 7.97026 16.536 7.7462 16.9099C7.57815 17.1904 7.49505 17.5511 7.32884 18.2724C7.06913 19.3995 6.93928 19.963 7.02759 20.4149C7.14535 21.0174 7.51237 21.5274 8.02252 21.7974C8.40513 22 8.94052 22 10.0113 22L13.9887 22C15.0595 22 15.5949 22 15.9775 21.7974C16.4876 21.5274 16.8547 21.0174 16.9724 20.4149C17.0607 19.963 16.9309 19.3995 16.6712 18.2724C16.505 17.5511 16.4218 17.1904 16.2538 16.9099C16.0297 16.536 15.6969 16.254 15.3082 16.1089C15.0166 16 14.674 16 13.9887 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M18 12H18.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="fax_no"
                                            placeholder="Enter Fax no."
                                            value={address.fax_no}
                                            onChange={(e) => handleChange(e, index)}
                                        /></span>
                                </div>
                            </div>




                            <div className="form_commonblock">
                                <label>Zip code</label>
                                <div id="inputx1">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                            <path d="M3.5 13V12.1963C3.5 9.22889 3.5 7.7452 3.96894 6.56021C4.72281 4.65518 6.31714 3.15252 8.33836 2.44198C9.59563 2 11.1698 2 14.3182 2C16.1173 2 17.0168 2 17.7352 2.25256C18.8902 2.65858 19.8012 3.51725 20.232 4.60584C20.5 5.28297 20.5 6.13079 20.5 7.82643V12.0142V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3.5 16H6.9C7.14721 16 7.28833 16.2822 7.14 16.48L3.72 21.04C3.42334 21.4355 3.70557 22 4.2 22H7.5M10.5 16H12.25M12.25 16H14M12.25 16V21.6787M10.5 22H14M17 22V16H18.8618C19.5675 16 20.2977 16.3516 20.4492 17.0408C20.5128 17.33 20.5109 17.6038 20.4488 17.8923C20.2936 18.6138 19.5392 19 18.8012 19H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="zip_code"
                                            placeholder="Enter zip code"
                                            value={address.zip_code}
                                            onChange={(e) => handleChange(e, index)}
                                        /></span>
                                </div>
                            </div>

                        </div>

                        <button className="addcust" type='button' onClick={addNewAddress}>
                            Add Address <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="breakerci"></div>





                        {/* <div id="fcx3s1parent">
                    <div className="form_commonblock">
                        <label>Place of Supply <b className='color_red'>*</b></label>
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
                    </div>
  

                </div> */}
                    </div>
                ))}
            </div >


        </>
    );
}

export default CustomerAddress;
