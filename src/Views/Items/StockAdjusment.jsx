import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster, toast } from 'react-hot-toast';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { useDispatch, useSelector } from 'react-redux';
import { stockItemAdjustment } from '../../Redux/Actions/itemsActions';
import { itemLists, accountLists } from '../../Redux/Actions/listApisActions';
import { GoPlus } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import CustomDropdown04 from '../../Components/CustomDropdown/CustomDropdown04';
import { RxCross2 } from 'react-icons/rx';
import CustomDropdown05 from '../../Components/CustomDropdown/CustomDropdown05';
import CustomDropdown03 from '../../Components/CustomDropdown/CustomDropdown03';
import { CiExport } from 'react-icons/ci';
import { fetchMasterData } from '../../Redux/Actions/globalActions';
import { BsArrowRight, BsEye } from 'react-icons/bs';
import CustomDropdown07 from '../../Components/CustomDropdown/CustomDropdown07';

import { v4 } from 'uuid';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { imageDB } from '../../Configs/Firebase/firebaseConfig';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import CustomDropdown09 from '../../Components/CustomDropdown/CustomDropdown09';
import CreateItemPopup from './CreateItemPopup';

const StockAdjustment = () => {
  const dispatch = useDispatch();
  const itemList = useSelector(state => state?.itemList?.data?.item);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const masterData = useSelector(state => state?.masterData?.masterData);
  const expenseAccounts = useSelector(state => state?.accountList)
  // const accList = expenseAccounts?.data?.accounts.filter(account => account.account_type === "Stock");
  const accList = expenseAccounts?.data?.accounts;
  const [Loader, setLoader] = useState(false); // State variable for loading status

  const Navigate = useNavigate()
  const stockAdjustment = useSelector(state => state?.stockAdjustment)



  const [formData, setFormData] = useState({
    item_id: '',
    unit_id: '',
    account_id: '',
    reason_type: '',
    description: '',
    attachment: '',
    reference_no: null,
    inout: '0',
    warehouse_id: +localStorage.getItem('selectedWarehouseId'),
    quantity: '',
    fy: +localStorage.getItem('FinancialYear'),
    transaction_date: new Date(),
  });


  const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);

  // Add this function to check if all required fields are filled
  const checkRequiredFields = () => {
    const { item_id, unit_id, account_id, reason_type } = formData;
    return item_id !== '' && unit_id !== '' && account_id !== '' && reason_type !== '';
  };

  // Update the form data and check if all required fields are filled
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setRequiredFieldsFilled(checkRequiredFields());
  };

  // Add this useEffect hook to check the required fields when formData changes
  useEffect(() => {
    setRequiredFieldsFilled(checkRequiredFields());
  }, [formData]);

  // Disable the submit button based on the requiredFieldsFilled state
  const submitButtonClass = requiredFieldsFilled ? '' : 'disabled';



  useEffect(() => {
    dispatch(itemLists());
    dispatch(accountLists());
    dispatch(fetchMasterData());

  }, [dispatch]);

  const refreshCategoryListData = () => {
    dispatch(itemLists());
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTransactionType = (value) => {
    if (value?.name === "Out") {
      setFormData(prevState => ({
        ...prevState,
        inout: 0,
      }));
    }

    if (value?.name === "In") {
      setFormData(prevState => ({
        ...prevState,
        inout: 1,
      }));
    }

  };



  // image upload from firebase
  const [imgLoader, setImgeLoader] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [freezLoading, setFreezLoading] = useState(false);

  const [showPopup1, setShowPopup1] = useState(false);

  const handleImageChange = (e) => {
    setImgeLoader(true)
    const imageRef = ref(imageDB, `ImageFiles/${v4()}`);
    setFreezLoading(true);

    uploadBytes(imageRef, e.target.files[0])
      .then(() => {
        setImgeLoader("success");
        setFreezLoading(false);
        getDownloadURL(imageRef)?.then((url) => {
          setFormData({
            ...formData,
            attachment: url
          })
        });
      })
      .catch((error) => {
        setFreezLoading(false);
        setImgeLoader("fail");
        console.error('Error uploading image:', error.message);
      });
  };
  // image upload from firebase

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requiredFieldsFilled) {
      // Display toast error if all required fields are not filled
      toast.error('Please fill all required fields.');
      return;
    }

    // Set loader state to true to display the loader
    setLoader(true);

    dispatch(stockItemAdjustment(formData, Navigate))
      .then(() => {
        setLoader(false);

      })
      .catch((error) => {
        setLoader(false);
      });
  };



  // useEffect(() => {
  //   if (stockAdjustment?.stockData?.data?.success === true) {
  //     toast.success(stockAdjustment?.stockData?.data?.message);
  //     setTimeout(() => {
  //       Navigate(`/dashboard/manage-items`);
  //     }, 1000);
  //   } else if (stockAdjustment?.stockData?.data?.success === false) {
  //     toast.error(stockAdjustment?.stockData?.data?.message);
  //   }
  // }, [stockAdjustment?.stockData?.data]);


  return (
    <>

      {Loader && <MainScreenFreezeLoader />}
      {freezLoading && <MainScreenFreezeLoader />}
      <div className='formsectionsgrheigh'>
        <TopLoadbar />
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">
            <h1 id="firstheading">
              {/* <img src={"/Icons/supplier-alt.svg"} alt="" /> */}
              <svg id="fi_2881031" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m360.74 310.798v41.73c0 4.14-3.36 7.5-7.5 7.5h-19.44c-1.48 8.08-3.61 16.04-6.36 23.78l16.82 9.71c1.73.99 2.98 2.63 3.5 4.55.51 1.92.24 3.97-.75 5.69l-20.87 36.14c-2.07 3.59-6.66 4.82-10.24 2.75l-16.86-9.73c-5.33 6.24-11.15 12.06-17.4 17.4l9.73 16.84c1 1.73 1.27 3.78.75 5.7-.51 1.92-1.77 3.56-3.49 4.55l-36.15 20.87c-3.59 2.07-8.17.84-10.24-2.75l-9.71-16.82c-7.74 2.75-15.7 4.87-23.79 6.36v19.43c0 4.15-3.36 7.5-7.5 7.5h-41.74c-4.14 0-7.5-3.35-7.5-7.5v-19.43c-8.09-1.49-16.05-3.61-23.79-6.36l-9.71 16.82c-2.07 3.59-6.65 4.82-10.24 2.75l-36.15-20.87c-1.72-.99-2.98-2.63-3.49-4.55-.52-1.92-.25-3.97.75-5.69l9.73-16.85c-6.25-5.34-12.07-11.16-17.4-17.4l-16.86 9.73c-3.58 2.07-8.17.84-10.24-2.75l-20.87-36.14c-.99-1.72-1.26-3.77-.75-5.69.52-1.92 1.77-3.56 3.5-4.55l16.81-9.71c-2.74-7.74-4.87-15.7-6.35-23.78h-19.44c-4.14 0-7.5-3.36-7.5-7.5v-41.73c0-4.14 3.36-7.5 7.5-7.5h19.44c1.48-8.08 3.61-16.04 6.35-23.78l-16.81-9.71c-1.73-.99-2.98-2.63-3.5-4.55-.51-1.92-.24-3.97.75-5.69l20.87-36.14c2.07-3.59 6.66-4.82 10.24-2.75l16.86 9.73c5.33-6.24 11.15-12.06 17.4-17.39l-9.73-16.85c-1-1.73-1.27-3.77-.75-5.7.51-1.92 1.77-3.56 3.49-4.55l36.15-20.86c3.59-2.07 8.17-.85 10.24 2.74l9.71 16.82c7.74-2.75 15.7-4.87 23.79-6.36v-19.43c0-4.15 3.36-7.5 7.5-7.5h41.74c4.14 0 7.5 3.35 7.5 7.5v19.43c8.09 1.49 16.05 3.61 23.79 6.36l9.71-16.82c2.07-3.59 6.65-4.82 10.24-2.74l36.15 20.86c1.72.99 2.98 2.63 3.49 4.55.52 1.93.25 3.97-.75 5.7l-9.73 16.85c6.25 5.33 12.07 11.15 17.4 17.39l16.86-9.73c3.58-2.07 8.17-.84 10.24 2.75l20.87 36.14c.99 1.72 1.26 3.77.75 5.69-.52 1.92-1.77 3.56-3.5 4.55l-16.82 9.71c2.75 7.74 4.88 15.7 6.36 23.78h19.44c4.14 0 7.5 3.36 7.5 7.5z" fill="#b7d4e2"></path><path d="m360.74 310.798v41.73c0 4.14-3.36 7.5-7.5 7.5h-19.44c-1.48 8.08-3.61 16.04-6.36 23.78l16.82 9.71c1.73.99 2.98 2.63 3.5 4.55.51 1.92.24 3.97-.75 5.69l-20.87 36.14c-2.07 3.59-6.66 4.82-10.24 2.75l-16.86-9.73c-5.33 6.24-11.15 12.06-17.4 17.4l9.73 16.84c1 1.73 1.27 3.78.75 5.7-.51 1.92-1.77 3.56-3.49 4.55l-36.15 20.87c-3.59 2.07-8.17.84-10.24-2.75l-9.71-16.82c-7.74 2.75-15.7 4.87-23.79 6.36v19.43c0 4.15-3.36 7.5-7.5 7.5h-20.87v-24.45c76.8-13.55 135-78.191 135-155.881 0-77.701-58.2-142.341-135-155.881v-24.46h20.87c4.14 0 7.5 3.35 7.5 7.5v19.43c8.09 1.49 16.05 3.61 23.79 6.36l9.71-16.82c2.07-3.59 6.65-4.82 10.24-2.74l36.15 20.86c1.72.99 2.98 2.63 3.49 4.55.52 1.93.25 3.97-.75 5.7l-9.73 16.85c6.25 5.33 12.07 11.15 17.4 17.39l16.86-9.73c3.58-2.07 8.17-.84 10.24 2.75l20.87 36.14c.99 1.72 1.26 3.77.75 5.69-.52 1.92-1.77 3.56-3.5 4.55l-16.82 9.71c2.75 7.74 4.88 15.7 6.36 23.78h19.44c4.14.002 7.5 3.362 7.5 7.502z" fill="#99bac6"></path><path d="m286.81 331.668c0 58.78-47.66 106.431-106.44 106.431-3.89 0-7.72-.21-11.5-.62-53.37-5.73-94.94-50.921-94.94-105.811 0-54.901 41.57-100.091 94.94-105.821 3.78-.41 7.61-.62 11.5-.62 58.78 0 106.44 47.651 106.44 106.441z" fill="#668fa3"></path><path d="m286.81 331.668c0 58.78-47.66 106.431-106.44 106.431-3.89 0-7.72-.21-11.5-.62 53.37-5.73 94.94-50.921 94.94-105.811 0-54.901-41.57-100.091-94.94-105.821 3.78-.41 7.61-.62 11.5-.62 58.78 0 106.44 47.651 106.44 106.441z" fill="#4c7889"></path><path d="m248.27 331.668c0 37.5-30.4 67.89-67.9 67.89-4.27 0-8.45-.39-12.5-1.15-31.53-5.86-55.4-33.51-55.4-66.741 0-33.23 23.87-60.881 55.4-66.751 4.05-.76 8.23-1.15 12.5-1.15 37.5.002 67.9 30.402 67.9 67.902z" fill="#fff"></path><path d="m248.27 331.668c0 37.5-30.4 67.89-67.9 67.89-4.27 0-8.45-.39-12.5-1.15 31.53-5.86 55.4-33.51 55.4-66.741 0-33.23-23.87-60.881-55.4-66.751 4.05-.76 8.23-1.15 12.5-1.15 37.5.002 67.9 30.402 67.9 67.902z" fill="#d4efff"></path><path d="m512 87.041v49.01c0 4.14-3.36 7.5-7.5 7.5h-13.85c-1.11 3.11-2.38 6.17-3.81 9.16l9.78 9.76c1.41 1.41 2.2 3.32 2.2 5.31s-.79 3.9-2.2 5.31l-34.73 34.66c-2.93 2.92-7.67 2.92-10.6 0l-9.8-9.78c-3 1.43-6.08 2.7-9.21 3.81v13.8c0 4.14-3.36 7.5-7.5 7.5h-49.12c-4.14 0-7.5-3.36-7.5-7.5v-13.8c-3.13-1.11-6.21-2.38-9.21-3.81l-9.8 9.78c-2.93 2.92-7.67 2.92-10.6 0l-34.73-34.66c-1.41-1.41-2.21-3.32-2.21-5.31s.8-3.9 2.21-5.31l9.78-9.76c-1.43-2.99-2.7-6.05-3.81-9.16h-13.85c-4.14 0-7.5-3.36-7.5-7.5v-49.01c0-4.15 3.36-7.5 7.5-7.5h13.85c1.11-3.12 2.38-6.18 3.81-9.17l-9.78-9.76c-1.41-1.41-2.21-3.32-2.21-5.31s.8-3.9 2.21-5.31l34.73-34.65c2.93-2.92 7.67-2.92 10.6 0l9.8 9.77c3-1.43 6.08-2.7 9.21-3.81v-13.801c0-4.14 3.36-7.5 7.5-7.5h49.12c4.14 0 7.5 3.36 7.5 7.5v13.8c3.13 1.11 6.21 2.38 9.21 3.81l9.8-9.77c2.93-2.92 7.67-2.92 10.6 0l34.73 34.65c1.41 1.41 2.2 3.32 2.2 5.31s-.79 3.9-2.2 5.31l-9.78 9.76c1.43 2.99 2.7 6.05 3.81 9.17h13.85c4.14.001 7.5 3.351 7.5 7.501z" fill="#668fa3"></path><path d="m512 87.041v49.01c0 4.14-3.36 7.5-7.5 7.5h-13.85c-1.11 3.11-2.38 6.17-3.81 9.16l9.78 9.76c1.41 1.41 2.2 3.32 2.2 5.31s-.79 3.9-2.2 5.31l-34.73 34.66c-2.93 2.92-7.67 2.92-10.6 0l-9.8-9.78c-3 1.43-6.08 2.7-9.21 3.81v13.8c0 4.14-3.36 7.5-7.5 7.5h-24.56v-17.13c44.73-5.27 79.51-45.53 79.51-94.411s-34.78-89.141-79.51-94.411v-17.129h24.56c4.14 0 7.5 3.36 7.5 7.5v13.8c3.13 1.11 6.21 2.38 9.21 3.81l9.8-9.77c2.93-2.92 7.67-2.92 10.6 0l34.73 34.65c1.41 1.41 2.2 3.32 2.2 5.31s-.79 3.9-2.2 5.31l-9.78 9.76c1.43 2.99 2.7 6.05 3.81 9.17h13.85c4.14.001 7.5 3.351 7.5 7.501z" fill="#4c7889"></path><path d="m453.093 111.546c0 29.202-23.673 52.866-52.874 52.866-3.325 0-6.58-.304-9.734-.895-24.552-4.563-43.14-26.094-43.14-51.971s18.588-47.408 43.14-51.979c3.154-.592 6.409-.896 9.734-.896 29.202 0 52.874 23.673 52.874 52.875z" fill="#fff"></path><path d="m453.093 111.546c0 29.202-23.673 52.866-52.874 52.866-3.325 0-6.58-.304-9.734-.895 24.552-4.563 43.14-26.094 43.14-51.971s-18.588-47.408-43.14-51.979c3.154-.592 6.409-.896 9.734-.896 29.202 0 52.874 23.673 52.874 52.875z" fill="#d4efff"></path><g><path d="m504.486 294.476-6.121-.001c-1.251-8.921-4.723-17.303-10.154-24.494l4.33-4.33c2.93-2.93 2.929-7.681-.001-10.611-2.931-2.931-7.681-2.931-10.611-.001l-4.33 4.33c-7.192-5.432-15.573-8.903-24.494-10.154l-.001-6.121c0-4.141-3.361-7.501-7.502-7.502-4.141 0-7.5 3.36-7.5 7.5l.001 6.121c-8.921 1.249-17.312 4.719-24.502 10.148l-4.331-4.331c-2.921-2.931-7.671-2.931-10.601-.001s-2.929 7.68.001 10.611l4.331 4.331c-5.43 7.19-8.899 15.571-10.148 24.492l-6.121-.001c-4.141 0-7.5 3.36-7.5 7.5 0 4.141 3.361 7.501 7.502 7.502l6.121.001c1.251 8.921 4.723 17.313 10.154 24.504l-4.33 4.33c-2.93 2.93-2.929 7.67.001 10.601 1.46 1.47 3.381 2.201 5.301 2.201s3.84-.73 5.3-2.2l4.33-4.33c7.191 5.431 15.583 8.903 24.504 10.154l.001 6.121c0 4.14 3.361 7.501 7.502 7.502 4.14 0 7.5-3.36 7.5-7.5l-.001-6.121c8.921-1.249 17.301-4.719 24.491-10.148l4.331 4.331c1.47 1.47 3.391 2.201 5.311 2.201s3.84-.73 5.3-2.2c2.93-2.93 2.929-7.671-.001-10.601l-4.331-4.331c5.43-7.19 8.899-15.581 10.148-24.502l6.121.001c4.141 0 7.5-3.36 7.5-7.5.001-4.14-3.36-7.501-7.501-7.502z" fill="#668fa3"></path><path d="m511.988 301.978c0 4.141-3.359 7.501-7.5 7.5l-6.121-.001c-1.249 8.921-4.719 17.312-10.148 24.502l4.331 4.331c2.931 2.931 2.931 7.671.001 10.601-1.46 1.47-3.38 2.2-5.3 2.2s-3.84-.731-5.311-2.201l-4.331-4.331c-7.19 5.43-15.571 8.899-24.492 10.148l.001 6.121c0 4.14-3.359 7.501-7.5 7.5l-.002-14.902c22.272-6.488 38.551-27.059 38.548-51.422s-16.287-44.937-38.56-51.431l-.002-15.002c4.14 0 7.501 3.361 7.502 7.502l.001 6.121c8.921 1.251 17.302 4.723 24.494 10.154l4.33-4.33c2.93-2.93 7.681-2.93 10.611.001 2.931 2.931 2.931 7.681.001 10.611l-4.33 4.33c5.431 7.191 8.903 15.573 10.154 24.494l6.121.001c4.141.002 7.502 3.363 7.502 7.503z" fill="#4c7889"></path></g><path d="m470.48 301.973c0 13.73-11.14 24.87-24.87 24.87-2.8 0-5.49-.46-8-1.33-9.81-3.32-16.87-12.61-16.87-23.54 0-10.94 7.06-20.23 16.87-23.54 2.51-.87 5.2-1.33 8-1.33 13.73-.001 24.87 11.129 24.87 24.87z" fill="#fff"></path><path d="m470.48 301.973c0 13.73-11.14 24.87-24.87 24.87-2.8 0-5.49-.46-8-1.33 9.81-3.32 16.87-12.61 16.87-23.54 0-10.94-7.06-20.23-16.87-23.54 2.51-.87 5.2-1.33 8-1.33 13.73-.001 24.87 11.129 24.87 24.87z" fill="#d4efff"></path></g></svg>
              New adjustment
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
              <div className="itemsformwrap itemformtyop02">
                <div id="forminside">
                  <div className="secondx2 thirdx2extra">
                    <div className="form-group">
                      <label>Date<b className='color_red'>*</b></label>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M11 13H16M8 13H8.00898M13 17H8M16 17H15.991" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>


                        {/* <CiEdit /> */}
                        <DatePicker
                          selected={formData.transaction_date}
                          onChange={(date) => handleChange({ target: { name: 'transaction_date', value: date } })}
                          className={formData.transaction_date ? 'filledcolorIn' : null}
                          placeholderText='Enter Date'
                          dateFormat="dd-MM-yyy"
                        />

                        {/* <input   className={formData.transaction_date ? 'filledcolorIn' : null}  required type="date" name="transaction_date" placeholder='Enter Date' value={formData.transaction_date} onChange={handleChange} /> */}
                      </span>

                    </div>

                    <div className="form-group">
                      <label>Transaction Type<b className='color_red'>*</b></label>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M4 14H8.42109C9.35119 14 9.81624 14 9.94012 14.2801C10.064 14.5603 9.74755 14.8963 9.11466 15.5684L5.47691 19.4316C4.84402 20.1037 4.52757 20.4397 4.65145 20.7199C4.77533 21 5.24038 21 6.17048 21H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 9L6.10557 4.30527C6.49585 3.43509 6.69098 3 7 3C7.30902 3 7.50415 3.43509 7.89443 4.30527L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* <MdOutlineCategory /> */}
                        {/* <img className="newclassforallsvg" src="/Icons/category.svg" alt="" /> */}

                        <CustomDropdown07
                          label="Transaction Type"
                          value={formData.inout} // Pass the transaction type value
                          onChange={handleTransactionType} // Handle the transaction type change
                        />
                      </span>

                      {formData?.inout === null && <p className="error-message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={14} height={14} color={"red"} fill={"none"}>
                          <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M11.9998 16H12.0088" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 13L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        Please select a transaction type</p>}
                    </div>




                    <div className="form-group">
                      <label>Items<b className='color_red'>*</b></label>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M4 14H8.42109C9.35119 14 9.81624 14 9.94012 14.2801C10.064 14.5603 9.74755 14.8963 9.11466 15.5684L5.47691 19.4316C4.84402 20.1037 4.52757 20.4397 4.65145 20.7199C4.77533 21 5.24038 21 6.17048 21H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 9L6.10557 4.30527C6.49585 3.43509 6.69098 3 7 3C7.30902 3 7.50415 3.43509 7.89443 4.30527L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M17.5 20V4M17.5 20C16.7998 20 15.4915 18.0057 15 17.5M17.5 20C18.2002 20 19.5085 18.0057 20 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* <MdOutlineCategory /> */}
                        {/* <img className="newclassforallsvg" src="/Icons/category.svg" alt="" /> */}

                        <CustomDropdown03
                          options={itemList || []}
                          value={formData.item_id}
                          onChange={handleChange}
                          name="item_id"
                          defaultOption="Select Item"
                          setShowPopup={setShowPopup1}
                        />
                      </span>
                    </div>
                    {showPopup1 === true ?
                      <div className="mainxpopups2">
                        <div className="popup-content02">
                          <CreateItemPopup closePopup={setShowPopup1} refreshCategoryListData1={refreshCategoryListData}
                          />
                        </div>
                      </div> : ""
                    }
                    <div className="form-group">
                      <label> Quantity<b className='color_red'>*</b></label>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <input required className={formData.quantity ? 'filledcolorIn' : null} name="quantity" type='number' placeholder='Enter quantity' value={formData.quantity} onChange={handleChange} />
                      </span>
                    </div>

                    <div className="form-group">
                      {/* <label>Sales Account<b className='color_red'>*</b></label> */}

                      <label >Account<b className='color_red'>*</b></label>
                      <span className=''>
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
                        <CustomDropdown09
                          label="Account"
                          options={accList || []}
                          value={formData.account_id}
                          onChange={handleChange}
                          name="account_id"
                          defaultOption="Account"
                        />

                      </span>
                    </div>




                    <div className="form-group">
                      <label >Reason<b className='color_red'>*</b></label>
                      <span>
                        {/* <CiEdit /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                          <path d="M11.1075 5.57624C11.3692 6.02707 11.5 6.25248 11.5 6.5C11.5 6.74752 11.3692 6.97293 11.1075 7.42376L9.85804 9.57624C9.59636 10.0271 9.46551 10.2525 9.25 10.3762C9.03449 10.5 8.7728 10.5 8.24943 10.5H5.75057C5.2272 10.5 4.96551 10.5 4.75 10.3762C4.53449 10.2525 4.40364 10.0271 4.14196 9.57624L2.89253 7.42376C2.63084 6.97293 2.5 6.74752 2.5 6.5C2.5 6.25248 2.63084 6.02707 2.89253 5.57624L4.14196 3.42376C4.40364 2.97293 4.53449 2.74752 4.75 2.62376C4.96551 2.5 5.2272 2.5 5.75057 2.5L8.24943 2.5C8.7728 2.5 9.03449 2.5 9.25 2.62376C9.46551 2.74752 9.59636 2.97293 9.85804 3.42376L11.1075 5.57624Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21.1075 11.5762C21.3692 12.0271 21.5 12.2525 21.5 12.5C21.5 12.7475 21.3692 12.9729 21.1075 13.4238L19.858 15.5762C19.5964 16.0271 19.4655 16.2525 19.25 16.3762C19.0345 16.5 18.7728 16.5 18.2494 16.5H15.7506C15.2272 16.5 14.9655 16.5 14.75 16.3762C14.5345 16.2525 14.4036 16.0271 14.142 15.5762L12.8925 13.4238C12.6308 12.9729 12.5 12.7475 12.5 12.5C12.5 12.2525 12.6308 12.0271 12.8925 11.5762L14.142 9.42376C14.4036 8.97293 14.5345 8.74752 14.75 8.62376C14.9655 8.5 15.2272 8.5 15.7506 8.5L18.2494 8.5C18.7728 8.5 19.0345 8.5 19.25 8.62376C19.4655 8.74752 19.5964 8.97293 19.858 9.42376L21.1075 11.5762Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M11.1075 16.5762C11.3692 17.0271 11.5 17.2525 11.5 17.5C11.5 17.7475 11.3692 17.9729 11.1075 18.4238L9.85804 20.5762C9.59636 21.0271 9.46551 21.2525 9.25 21.3762C9.03449 21.5 8.7728 21.5 8.24943 21.5H5.75057C5.2272 21.5 4.96551 21.5 4.75 21.3762C4.53449 21.2525 4.40364 21.0271 4.14196 20.5762L2.89253 18.4238C2.63084 17.9729 2.5 17.7475 2.5 17.5C2.5 17.2525 2.63084 17.0271 2.89253 16.5762L4.14196 14.4238C4.40364 13.9729 4.53449 13.7475 4.75 13.6238C4.96551 13.5 5.2272 13.5 5.75057 13.5L8.24943 13.5C8.7728 13.5 9.03449 13.5 9.25 13.6238C9.46551 13.7475 9.59636 13.9729 9.85804 14.4238L11.1075 16.5762Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <CustomDropdown04
                          label="Reason Name"
                          options={masterData?.filter(type => type.type === "7")}
                          value={formData.reason_type}
                          onChange={handleChange}
                          name="reason_type"
                          defaultOption="Select Reason"
                        />

                      </span>
                    </div>




                    <div className="form-group">
                      <label>Unit<b className='color_red'>*</b></label>
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
                          value={formData.unit_id}
                          onChange={handleChange}
                          name="unit_id"
                          defaultOption="Select Units"
                        />

                      </span>
                    </div>









                    <div className="form-group">
                      <label> Description</label>
                      <textarea
                        className={"textareax1series" + (formData.description ? ' filledcolorIn' : '')}
                        name="description"
                        placeholder='Enter description'
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                      />
                    </div>

                    <div id="imgurlanddesc">
                      <div className="form-group">
                        <label>Attachment<b className='color_red'>*</b></label>
                        <div className="file-upload">
                          <input
                            type="file"
                            name="attachment"
                            id="file"
                            className="inputfile"
                            // accept="image/*"
                            onChange={handleImageChange}
                          />
                          <label htmlFor="file" className="file-label">
                            {/* <CiImageOn /> */}
                            <div id='spc5s6'>
                              <CiExport />
                              {formData.attachment ? formData.attachment.name : 'Browse Files'}
                            </div>
                          </label>

                          {
                            imgLoader === "success" ?
                              <label className='imageviewico656s' htmlFor="" data-tooltip-id="my-tooltip" data-tooltip-content="View Image" onClick={() => setShowPopup(true)}><BsEye /></label> : ""
                          }
                        </div>
                      </div>

                      {/* <button type="submit">Submit</button> */}
                    </div>


                  </div>
                </div>
              </div>

              <div className="actionbar">
                <button
                  className={`btn  ${submitButtonClass ? 'disabledbtn' : ''}`}
                  // disabled={stockAdjustment?.loading || !requiredFieldsFilled} 
                  id='herobtnskls'
                  type="submit"
                >
                  {stockAdjustment?.loading ? <p>Submiting<BsArrowRight /></p> : <p>Submit<BsArrowRight /></p>}
                </button>
                <button type='button'> <Link to="/dashboard/manage-items">Cancel</Link></button>
              </div>
            </form>


          </div>
        </div>
        {
          showPopup && (
            <div className="mainxpopups2" ref={popupRef}>
              <div className="popup-content02">
                <span className="close-button02" onClick={() => setShowPopup(false)}><RxCross2 /></span>
                {<img src={formData?.attachment} name="attachment" alt="" height={500} width={500} />}
              </div>
            </div>
          )
        }
        <Toaster />
      </div>
    </>
  );
};

export default StockAdjustment;