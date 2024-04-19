
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { fetchCountries, fetchStatesByCountryId, fetchCitiesByStateId } from '../../FetchedApis/Apis';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { Link } from 'react-router-dom';
import { GrFormNextLink } from 'react-icons/gr';
import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown';
import { fetchMasterData } from '../../Redux/Actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomers } from '../../Redux/Actions/customerActions';


const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    salutation: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
    work_phone: '',
    customer_type: '',
    is_customer: 1,
    gst_no: '',
    pan_no: '',
    display_name: '',
    company_name: '',
    place_of_supply: '',
    tax_preference: 1,
    currency: localStorage.getItem('currency') || '',
    remarks: '',
    addresses: [
      {
        country_id: '', // Changed from country to country_id
        street_1: '',
        street_2: '',
        city_id: '', // Changed from city to city_id
        state_id: '', // Changed from state to state_id
        zip_code: '',
        address_type: '',
        is_billing: 0,
        is_shipping: 1,
        phone_no: '',
        fax_no: '',
      },
      {
        country_id: '', // Changed from country to country_id
        street_1: '',
        street_2: '',
        city_id: '', // Changed from city to city_id
        state_id: '', // Changed from state to state_id
        zip_code: '',
        address_type: '',
        is_billing: 1,
        is_shipping: 0,
        phone_no: '',
        fax_no: '',
      },
    ],
    contact_persons: [
      {
        salutation: '',
        first_name: '',
        last_name: '',
        mobile_no: '',
        work_phone: '',
        email: '',
      },
      {
        salutation: '',
        first_name: '',
        last_name: '',
        mobile_no: '',
        work_phone: '',
        email: '',
      },
    ],
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [salutations, setSalutations] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(state => state?.masterData?.masterData);
  const customer = useSelector(state => state?.createCustomer?.data
  );
  // console.log("ddddddddddddddd", customer)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
        dispatch(fetchMasterData());
        // Filter the salutations based on labelid and type
        const filteredSalutations = data.filter(item =>
          //  item.labelid === "4" && 
          item.type === "4");
        setSalutations(filteredSalutations);
      } catch (error) {
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, [toast]);

  // Modify handleCountryChange function
  const handleCountryChange = async (e, index) => {
    const countryId = e.target.value;
    const addresses = [...userData.addresses];
    addresses[index].country_id = countryId;
    setUserData({ ...userData, addresses });

    try {
      const statesData = await fetchStatesByCountryId(countryId);
      setStates(statesData);
      // Reset cities when country changes
      setCities([]);
    } catch (error) {
      toast.error('Error fetching states');
    }
  };

  // Modify handleStateChange function
  const handleStateChange = async (e, index) => {
    const stateId = e.target.value;
    const addresses = [...userData.addresses];
    addresses[index].state_id = stateId;
    setUserData({ ...userData, addresses });

    try {
      const citiesData = await fetchCitiesByStateId(stateId);
      setCities(citiesData);
    } catch (error) {
      toast.error('Error fetching cities');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(userData)
      dispatch(createCustomers(userData))
    } catch (error) {
      toast.error('Error creating/updating user');
    }
  };

  useEffect(() => {
    if (customer?.success === true) {
      toast.success(customer?.message);
    } else if (customer?.success === false) {
      toast.error(customer?.message);
    }
  }, [customer]);

  const handleDropdownChange = async (type, index, value, isContactPerson = false) => {
    if (!isContactPerson) {
      // Handle changes for addresses
      let newAddresses = [...userData.addresses];
      if (type === 'country_id') {
        newAddresses[index].country_id = value;
        try {
          const statesData = await fetchStatesByCountryId(value);
          newAddresses[index].states = statesData;
          newAddresses[index].state_id = '';
          newAddresses[index].city_id = '';
        } catch (error) {
          toast.error('Error fetching states');
        }
      } else if (type === 'state_id') {
        newAddresses[index].state_id = value;
        try {
          const citiesData = await fetchCitiesByStateId(value);
          newAddresses[index].cities = citiesData;
          newAddresses[index].city_id = '';
        } catch (error) {
          toast.error('Error fetching cities');
        }
      } else if (type === 'city_id') {
        newAddresses[index].city_id = value;
      }
      setUserData({ ...userData, addresses: newAddresses });
    } else {
      // Handle changes for contact person salutations
      const updatedContactPersons = [...userData.contact_persons];
      updatedContactPersons[index] = { ...updatedContactPersons[index], [type]: value };
      setUserData({ ...userData, contact_persons: updatedContactPersons });
    }
  };


  return (
    <>
      <TopLoadbar />
      <div id='middlesection'>
        <div id="Anotherbox">
          <h1 id='firstheading'>
            {/* <IoCreateOutline /> */}
            <img src="https://cdn-icons-png.freepik.com/512/10302/10302971.png?ga=GA1.1.1322639485.1711617724&" alt="" />
            Create a Customer</h1 >

          <div id="buttonsdata">
            <Link to={"/dashboard/customers"}>Manage Customer <GrFormNextLink /></Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
          </label>

          <div>
            <CustomDropdown
              label="Salutation"
              options={salutations.map(s => ({ id: s.id, name: s.label }))}
              selectedValue={userData.salutation}
              onChange={(value) => setUserData({ ...userData, salutation: value })}
            />

          </div>

          <label>
            First Name:
            <input type="text" value={userData.first_name} onChange={(e) => setUserData({ ...userData, first_name: e.target.value })} />
          </label>

          <label>
            Last Name:
            <input type="text" value={userData.last_name} onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} />
          </label>

          <label>
            Email:
            <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          </label>

          <label>
            Mobile No:
            <input type="text" value={userData.mobile_no} onChange={(e) => setUserData({ ...userData, mobile_no: e.target.value })} />
          </label>

          <label>
            Work Phone:
            <input type="text" value={userData.work_phone} onChange={(e) => setUserData({ ...userData, work_phone: e.target.value })} />
          </label>

          <label>
            Customer Type:
            <input type="text" value={userData.customer_type} onChange={(e) => setUserData({ ...userData, customer_type: e.target.value })} />
          </label>

          <label>
            GST No:
            <input type="text" value={userData.gst_no} onChange={(e) => setUserData({ ...userData, gst_no: e.target.value })} />
          </label>

          <label>
            PAN No:
            <input type="text" value={userData.pan_no} onChange={(e) => setUserData({ ...userData, pan_no: e.target.value })} />
          </label>

          <label>
            Display Name:
            <input type="text" value={userData.display_name} onChange={(e) => setUserData({ ...userData, display_name: e.target.value })} />
          </label>

          <label>
            Company Name:
            <input type="text" value={userData.company_name} onChange={(e) => setUserData({ ...userData, company_name: e.target.value })} />
          </label>

          <label>
            Place of Supply:
            <input type="text" value={userData.place_of_supply} onChange={(e) => setUserData({ ...userData, place_of_supply: e.target.value })} />
          </label>

          <label>
            Tax Preference:
            <input type="text" value={userData.tax_preference} onChange={(e) => setUserData({ ...userData, tax_preference: e.target.value })} />
          </label>

          <label>
            Currency:
            <input type="text" value={userData.currency} onChange={(e) => setUserData({ ...userData, currency: e.target.value })} />
          </label>

          <label>
            Remarks:
            <textarea value={userData.remarks} onChange={(e) => setUserData({ ...userData, remarks: e.target.value })}></textarea>
          </label>

          {/* Render address inputs for each address */}
          {userData.addresses.map((address, index) => (
            <div key={index}>
              <label>
                Street 1:
                <input type="text" value={address.street_1} onChange={(e) => setUserData(prevState => ({ ...prevState, addresses: [...prevState.addresses.slice(0, index), { ...address, street_1: e.target.value }, ...prevState.addresses.slice(index + 1)] }))} />
              </label>
              <label>
                Street 2:
                <input type="text" value={address.street_2} onChange={(e) => setUserData(prevState => ({ ...prevState, addresses: [...prevState.addresses.slice(0, index), { ...address, street_2: e.target.value }, ...prevState.addresses.slice(index + 1)] }))} />
              </label>
              <div>
                {/* Country:
              <select value={address.country_id} onChange={(e) => handleCountryChange(e, index)}>
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select> */}
                Country:
                <CustomDropdown
                  label="Country"
                  options={countries.map(country => ({ id: country.id, name: country.name }))}
                  selectedValue={address.country_id}
                  onChange={(value) => handleCountryChange({ target: { value } }, index)}
                />
              </div>
              <div>
                State:
                <CustomDropdown
                  label="State"
                  options={states.map(state => ({ id: state.id, name: state.name }))}
                  selectedValue={address.state_id}
                  onChange={(value) => handleStateChange({ target: { value } }, index)}
                />
              </div>
              <div>
                City:
                <CustomDropdown
                  label="City"
                  options={cities.map(city => ({ id: city.id, name: city.name }))}
                  selectedValue={address.city_id}
                  onChange={(value) => handleDropdownChange('city_id', index, value)}
                />
              </div>
              <label>
                Zip Code:
                <input type="text" value={address.zip_code} onChange={(e) => setUserData(prevState => ({ ...prevState, addresses: [...prevState.addresses.slice(0, index), { ...address, zip_code: e.target.value }, ...prevState.addresses.slice(index + 1)] }))} />
              </label>
              <label>
                Address Type:
                <input type="text" value={address.address_type} onChange={(e) => setUserData(prevState => ({ ...prevState, addresses: [...prevState.addresses.slice(0, index), { ...address, address_type: e.target.value }, ...prevState.addresses.slice(index + 1)] }))} />
              </label>
              <label>
                Phone No:
                <input type="text" value={address.phone_no} onChange={(e) => setUserData(prevState => ({ ...prevState, addresses: [...prevState.addresses.slice(0, index), { ...address, phone_no: e.target.value }, ...prevState.addresses.slice(index + 1)] }))} />
              </label>
              <label>
                Fax No:
                <input type="text" value={address.fax_no} onChange={(e) => setUserData(prevState => ({ ...prevState, addresses: [...prevState.addresses.slice(0, index), { ...address, fax_no: e.target.value }, ...prevState.addresses.slice(index + 1)] }))} />
              </label>
            </div>
          ))}

          {userData.contact_persons.map((person, index) => (
            <div key={index}>
              <h3>Contact Person {index + 1}</h3>
              <label>
                Salutation:
                <CustomDropdown
                  label="Salutation"
                  options={salutations.map(s => ({ id: s.id, name: s.label }))}
                  selectedValue={person.salutation}
                  onChange={(value) => handleDropdownChange('salutation', index, value, true)}
                />

              </label>
              <label>
                First Name:
                <input type="text" value={person.first_name} onChange={(e) => setUserData(prevState => ({ ...prevState, contact_persons: [...prevState.contact_persons.slice(0, index), { ...person, first_name: e.target.value }, ...prevState.contact_persons.slice(index + 1)] }))} />
              </label>
              <label>
                Last Name:
                <input type="text" value={person.last_name} onChange={(e) => setUserData(prevState => ({ ...prevState, contact_persons: [...prevState.contact_persons.slice(0, index), { ...person, last_name: e.target.value }, ...prevState.contact_persons.slice(index + 1)] }))} />
              </label>
              <label>
                Mobile No:
                <input type="text" value={person.mobile_no} onChange={(e) => setUserData(prevState => ({ ...prevState, contact_persons: [...prevState.contact_persons.slice(0, index), { ...person, mobile_no: e.target.value }, ...prevState.contact_persons.slice(index + 1)] }))} />
              </label>
              <label>
                Work Phone:
                <input type="text" value={person.work_phone} onChange={(e) => setUserData(prevState => ({ ...prevState, contact_persons: [...prevState.contact_persons.slice(0, index), { ...person, work_phone: e.target.value }, ...prevState.contact_persons.slice(index + 1)] }))} />
              </label>
              <label>
                Email:
                <input type="email" value={person.email} onChange={(e) => setUserData(prevState => ({ ...prevState, contact_persons: [...prevState.contact_persons.slice(0, index), { ...person, email: e.target.value }, ...prevState.contact_persons.slice(index + 1)] }))} />
              </label>
            </div>
          ))}

          <button onClick={() => setUserData(prevState => ({
            ...prevState,
            contact_persons: [...prevState.contact_persons, {
              salutation: '',
              first_name: '',
              last_name: '',
              mobile_no: '',
              work_phone: '',
              email: '',
            }]
          }))}>Add Contact Person</button>


          <button type="submit">Submit</button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default CreateUserForm;
