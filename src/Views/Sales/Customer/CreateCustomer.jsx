
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import './Customer.scss';
import BasicDetails from './BasicDetails';
import CustomerAddress from './CustomerAddress';
import CustomerContactDetail from './CustomerContactDetail';
import { createCustomers } from '../../../Redux/Actions/customerActions';
import DisableEnterSubmitForm from '../../Helper/DisableKeys/DisableEnterSubmitForm';


const CreateCustomer = () => {
  const [userData, setUserData] = useState({
    remarks: ""
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


  const dispatch = useDispatch();
  const customer = useSelector(state => state?.createCustomer
  );

  console.log("Create customer state", customer);


  const [switchCusData, setSwitchCusData] = useState("Basic");


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomers(userData));
  };

  useEffect(() => {
    if (customer?.data?.success === true) {
      toast.success(customer?.data?.message);
    }
    if (customer?.data?.success === false) {
      toast.error(customer?.data?.message);
    }
  }, [customer?.data]);

  return (
    <>
      <TopLoadbar />
      <div id="Anotherbox" className='formsectionx1'>
        <div id="leftareax12">
          <h1 id="firstheading">

            <img src={"/assets/Icons/allcustomers.svg"} alt="" /> 
            New Customer
          </h1>
        </div>
        <div id="buttonsdata">
          <Link to={"/dashboard/customers"} className="linkx3">
            <RxCross2 />
          </Link>
        </div>
      </div>


      <div className="ccfz1 formsectionx1">
        <div className='insideccfz1'>
          <button className={`type-button ${switchCusData === "Basic" && 'selectedbtnx2'}`} onClick={() => setSwitchCusData("Basic")}>(1) Basic Details </button>
          <button className={`type-button  ${switchCusData === "Address" && 'selectedbtnx2'}`} onClick={() => setSwitchCusData("Address")}>(2) Address </button>
          <button className={`type-button  ${switchCusData === "Contact" && 'selectedbtnx2'}`} onClick={() => setSwitchCusData("Contact")}>(3) Contact Persons</button>
          <button className={`type-button  ${switchCusData === "Remark" && 'selectedbtnx2'}`} onClick={() => setSwitchCusData("Remark")}>(4) Remarks </button>
        </div>
      </div>


      {/* form Data */}
      <div id="formofcreateitems">
          
        <DisableEnterSubmitForm onSubmit={handleSubmit}>
          <div className="itemsformwrap">
            <div id="">



              {/* main forms */}
              {switchCusData === "Basic" && <BasicDetails updateUserData={updateUserData} />}
              {switchCusData === "Address" && <CustomerAddress updateUserData={updateUserData} />}
              {switchCusData === "Contact" &&
                <CustomerContactDetail
                  userData={userData}
                  setUserData={setUserData}
                  updateUserData={updateUserData}
                />
              }

              {switchCusData === "Remark" && <>
                <div id="secondx2_customer">

                  <div className="iconheading">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2162_1003)">
                        <path d="M22.9131 29.2736L20.1978 9.83819C20.1675 9.6241 20.0224 9.44384 19.8198 9.3686L9.25972 5.45472C8.96171 5.3366 8.62437 5.48244 8.50626 5.78045C8.5036 5.78718 8.50104 5.794 8.49859 5.80085L1.77285 23.5537C1.65599 23.857 1.80714 24.1977 2.1105 24.3146C2.11492 24.3163 2.1194 24.3179 2.12384 24.3195L21.593 31.4613L21.6582 31.4771C21.954 31.5502 22.2567 31.3855 22.3559 31.0975L22.8893 29.5465C22.9187 29.4587 22.9268 29.3652 22.9131 29.2736Z" fill="#FFA000" />
                        <path d="M31.3864 11.348C31.4258 11.0253 31.1961 10.7318 30.8733 10.6924C30.8716 10.6922 30.87 10.692 30.8683 10.6918L25.8078 10.0783L10.8619 8.26555C10.5422 8.22548 10.2497 8.44993 10.2056 8.76911L7.48462 27.4926C7.44101 27.7941 7.63468 28.0791 7.93111 28.1496L7.99633 28.1654L28.5748 30.7303C28.8974 30.7704 29.1915 30.5413 29.2316 30.2187C29.2319 30.2162 29.2322 30.2138 29.2325 30.2113L31.3864 11.348Z" fill="#FFE082" />
                        <path d="M21.8116 13.3427C21.4955 13.2667 21.3009 12.9488 21.3769 12.6327C21.4135 12.4803 21.5094 12.3488 21.6434 12.2673L25.1972 10.1001C25.4718 9.92609 25.8355 10.0075 26.0096 10.2822C26.1837 10.5568 26.1022 10.9204 25.8276 11.0945C25.8218 11.0982 25.816 11.1017 25.8101 11.1052L22.2563 13.2724C22.1232 13.3538 21.9633 13.3791 21.8116 13.3427Z" fill="#455A64" />
                        <path d="M26.9465 12.1624C28.5263 12.5453 30.1175 11.5751 30.5004 9.99524C30.8833 8.41541 29.913 6.82429 28.3332 6.44138C26.7534 6.05846 25.1622 7.02875 24.7793 8.60857C24.3964 10.1884 25.3667 11.7795 26.9465 12.1624Z" fill="#F44336" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2162_1003">
                          <rect width="28.2614" height="28.2614" fill="white" transform="translate(7.4375 0.164062) rotate(13.6245)" />
                        </clipPath>
                      </defs>
                    </svg>

                    <p>Remarks</p>
                  </div>


                  <div id="main_forms_desigin_cus">
                    <textarea
                      value={userData?.remarks}
                      onChange={handleRemarksChange}
                      cols="140"
                      rows="5"
                      placeholder='Remarks ( for internal use )'
                      className='textareacustomcbs'
                    ></textarea>

                  </div>
                </div>
              </>
              }
            </div>
          </div>


          <div className="actionbar">
            <button id='herobtnskls' type="submit">

              <p> {customer?.loading === true ? "Submiting" : "Submit"}</p>
            </button>
            <button>Cancel</button>
          </div>
        </DisableEnterSubmitForm>
      </div>
      <Toaster />
    </>
  );
};

export default CreateCustomer;
