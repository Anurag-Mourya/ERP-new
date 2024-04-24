
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
    } else if (customer?.data?.success === false) {
      toast.error(customer?.data?.message);
    }
  }, [customer?.data]);

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
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default CreateCustomer;
