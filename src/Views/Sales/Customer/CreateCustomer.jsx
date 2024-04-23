
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { fetchCountries, fetchStatesByCountryId, fetchCitiesByStateId } from '../../../FetchedApis/Apis';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { Link } from 'react-router-dom';
import CustomDropdown from '../../../Components/CustomDropdown/CustomDropdown';
import { fetchMasterData } from '../../../Redux/Actions/globalActions';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import './Customer.scss';
import BasicDetails from './BasicDetails';
import CustomerAddress from './CustomerAddress';
import CustomerContactDetail from './CustomerContactDetail';


const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    addresses: [
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
    ],
    remarks: ""
    // Initialize with one default address
  });

  const handleRemarksChange = (e) => {
    const { value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      remarks: value
    }));
  };
  const updateUserData = (newUserData) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...newUserData,
    }));
  };
  console.log("userData", userData)

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [salutations, setSalutations] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(state => state?.masterData?.masterData);
  const customer = useSelector(state => state?.createCustomer?.data
  );

  const [switchCusData, setSwitchCusData] = useState("Basic");

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
      <div id="Anotherbox">
        <div id="leftareax12">
          <h1 id="firstheading">
            {/* <img src={"/Icons/supplier-alt.svg"} alt="" /> */}
            <img src={"https://cdn-icons-png.freepik.com/512/5006/5006793.png?uid=R87463380&ga=GA1.1.683301158.1710405244"} alt="" />
            Create Customer
          </h1>
        </div>
        <div id="buttonsdata">
          <Link to={"/dashboard/customers"} className="linkx3">
            <RxCross2 />
          </Link>
        </div>
      </div>

      <div className="bordersinglestroke"></div>


      {/* form Data */}
      <div id="formofcreateitems">
        <form onSubmit={handleSubmit}>
          <div className="itemsformwrap">
            <div id="forminside">

              <div className="form-groupx1">
                <span>
                  <button className={`type-button ${switchCusData === "Basic" && 'selectedbtn'}`} onClick={() => setSwitchCusData("Basic")}> Basic details </button>
                  <button className={`type-button  ${switchCusData === "Address" && 'selectedbtn'}`} onClick={() => setSwitchCusData("Address")}> Address </button>
                  <button className={`type-button  ${switchCusData === "Contact" && 'selectedbtn'}`} onClick={() => setSwitchCusData("Contact")}> Contact Persons</button>
                  <button className={`type-button  ${switchCusData === "Remark" && 'selectedbtn'}`} onClick={() => setSwitchCusData("Remark")}> Remark </button>
                </span>
              </div>

              {/* main forms */}
              {switchCusData === "Basic" && <BasicDetails updateUserData={updateUserData} />}
              {switchCusData === "Address" && <CustomerAddress updateUserData={updateUserData} />}
              {switchCusData === "Contact" &&
                <CustomerContactDetail
                  userData={userData}
                  setUserData={setUserData}
                  handleDropdownChange={handleDropdownChange}
                  salutations={salutations}
                  updateUserData={updateUserData}
                />
              }

              {switchCusData === "Remark" && <>
                <div className="form-group">
                  <label className='color_red'>Remark*</label>
                  <div id="inputx12">

                    <span>
                      <textarea
                        value={userData?.remarks}
                        onChange={handleRemarksChange}
                        cols="140"
                        rows="10"
                        placeholder='Remark'
                      ></textarea>
                    </span>

                  </div>
                </div>
              </>}


            </div>
          </div>


          <div className="actionbar">
            <button id='herobtnskls' type="submit">
              <p>Submit</p>
            </button>
            <button>Cancel</button>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default CreateUserForm;
