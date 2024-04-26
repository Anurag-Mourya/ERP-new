import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories } from '../../Redux/Actions/categoriesActions';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import CustomDropdown03 from '../../Components/CustomDropdown/CustomDropdown03';
import { categoryList } from '../../Redux/Actions/listApisActions';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.createCategory);
  const categoryLists = useSelector(state => state?.categoryList?.data);
  const [formData, setFormData] = useState({
    name: "",
    fullurl: null,
    parent_id: "", // to create new category
    description: null
  });
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (showPopup && name === "name") {
      setFormData(prevState => ({
        ...prevState,
        fullurl: value // Synchronize sub-category name with category name when showPopup is true
      }));
    }
  };
  const handleSubmitCategory = async () => {
    try {
      let sendDataForCategory = { ...formData };

      if (showPopup) {
        sendDataForCategory = {
          parent_id: "0",
          name: formData?.catName
        };
      }

      dispatch(createCategories(sendDataForCategory));
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('An error occurred while creating category');
    }
  };

  useEffect(() => {
    if (data?.data?.success === true) {
      toast.success(data?.data?.message);
      setShowPopup(false);
    } else if (data?.data?.success === false) {
      toast.error(data?.data?.message);
    }
  }, [data?.data]);

  // Function to handle opening the popup
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Event listener to handle clicks outside the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch, (showPopup === false)]);

  return (
    <>
      <div id="Anotherbox" className='formsectionx1'>
        <div id="leftareax12">
          <h1 id="firstheading">
            {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
            {/* {item_details?.name} */}

            New Category
          </h1>
        </div>
        <div id="buttonsdata">


          <Link className="linkx4" to={"/dashboard/items-categories"}>
            <RxCross2 />
          </Link>
        </div>
      </div>
      <div id="maincontainerofforms">


        <div className="firstblockwihc5">

          <div className="form_commonblock">
            <label>Category</label>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <CustomDropdown03
                label="Category"
                options={categoryLists?.data || []}
                value={formData.parent_id}
                onChange={handleChange}
                name="parent_id"
                defaultOption="Select Category"
              />
            </span>
          </div>

          <div className="popuphandlecks5" onClick={handleOpenPopup} data-tooltip-id="my-tooltip" data-tooltip-content="Add category" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"}>
              <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>


        <div className="form_commonblock">
          <label> Sub Category</label>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
              <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input name="name" placeholder='Enter sub category name' value={formData.name} onChange={handleChange} />
          </span>
        </div>

        <div className="actionbarcommon">
          <div className="firstbtnc1" onClick={() => handleSubmitCategory()}>
            {data?.loading === true ? "Creating" : "Create"}   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
              <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Link to={"/dashboard/items-categories"} className="firstbtnc2">
            Cancel
          </Link>
        </div>

      </div>

      {showPopup && (
        <div className="mainxpopups1" ref={popupRef}>
          <div className="popup-content">
            <span className="close-button" onClick={handleClosePopup}>×</span>
            <div id="Anotherbox" className='formsectionx1'>
              <div id="leftareax12">
                <p id="firstheading">
                  Add Category
                </p>
              </div>
              <div id="buttonsdata">
              </div>
            </div>
            <div id="maincontainerofforms" style={{ height: "158px", padding: "2px" }}>
              <div className="firstblockwihc5">
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
                    <input name="catName" placeholder='Enter Category Name' value={formData.catName} onChange={handleChange} />
                  </span>
                </div>
              </div>



              <div className="actionbarcommon" style={{ display: "block", position: "static", textAlign: "center" }}>
                <div className="firstbtnc1" style={{ justifyContent: "center" }} onClick={() => handleSubmitCategory()}>
                  {data?.loading === true ? "Submiting" : "Submit"}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}


      <Toaster />
    </>
  )
}

export default CreateCategory
