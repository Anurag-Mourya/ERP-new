import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, subCategoriesList } from '../../Redux/Actions/categoriesActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import CustomDropdown03 from '../../Components/CustomDropdown/CustomDropdown03';
import { categoryList } from '../../Redux/Actions/listApisActions';
import CreateCategoryPopup from './CreateCategoryPopup';
import DisableEnterSubmitForm from '../Helper/DisableKeys/DisableEnterSubmitForm';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { sub_cat_id: subCatId, dublicate: catDublicate, cat_id: catId } = Object.fromEntries(params.entries());
  const data = useSelector(state => state?.createCategory);
  const categoryLists = useSelector(state => state?.categoryList?.data);
  const subCategoryList = useSelector(state => state?.subCategoryList?.data?.data);
  const [refreshData, setRefreshData] = useState(false);


  // console.log("subCategoryList", subCategoryList[0])
  const [formData, setFormData] = useState({
    name: "",
    fullurl: null,
    parent_id: "", // to create new category
    description: null
  });



  useEffect(() => {
    if (subCatId && catId && Array.isArray(subCategoryList) && subCategoryList.length > 0) {
      const filteredSubCatData = subCategoryList[0]?.sub_category?.find(val => val?.id == subCatId)
      console.log("filteredSubCatData", filteredSubCatData);
      setFormData({
        ...formData,
        name: filteredSubCatData?.name,
        id: (+filteredSubCatData?.id),
        parent_id: (+filteredSubCatData?.parent_id)
      })
    }
  }, [subCatId, catId, subCategoryList]);


  useEffect(() => {
    dispatch(subCategoriesList({ id: catId }));
  }, [dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitCategory = async () => {
    try {
      // Check if a category is selected
      if (!formData.parent_id) {
        toast.error('Please select a category');
        return; // Exit the function if no category is selected
      }

      let sendDataForCategory = { ...formData };

      dispatch(createCategories(sendDataForCategory))
        .then(() => {
          if (data?.data?.success === true) {
            toast.success(data?.data?.message);
            setShowPopup(false);

          } else if (data?.data?.success === false) {
            toast.error(data?.data?.message);
          }
        });
      setTimeout(() => {
        Navigate(`/dashboard/items-categories`);
      }, 1000);
    } catch (error) {
      console.error('Error creating category:', error);
      // toast.error('An error occurred while creating category');
    }
  };



  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch, (showPopup === false)]);



  const refreshCategoryListData = () => {
    dispatch(categoryList());
  };



  useEffect(() => {
    // Extract the cat_id from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const catIdFromUrl = parseInt(queryParams.get('cat_id'));

    // Automatically select the category in the dropdown based on the cat_id from the URL
    if (catIdFromUrl && categoryLists && categoryLists.data && categoryLists.data.length > 0) {
      const selectedCategory = categoryLists.data.find(category => category.id === catIdFromUrl);
      if (selectedCategory) {
        setFormData(prevState => ({
          ...prevState,
          parent_id: selectedCategory.id
        }));
      }
    }
  }, [location.search, categoryLists]);




  console.log("sub", subCatId, catId)
  return (
    <>
      {data?.loading && <MainScreenFreezeLoader />}
      <div id="Anotherbox" className='formsectionx1'>
        <div id="leftareax12">
          <h1 id="firstheading">
            {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
            {/* {item_details?.name} */}
            <svg height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_9458876"><g id="Layer_2" data-name="Layer 2"><g fill="#36c8f6"><path d="m2.81 2.81c-1.42 1.41-1.42 6 0 7.38a5.58 5.58 0 0 0 3.69 1.06 5.58 5.58 0 0 0 3.69-1.06c1.42-1.41 1.42-6 0-7.38s-5.97-1.42-7.38 0z"></path><path d="m2.81 13.81c-1.42 1.41-1.42 6 0 7.38a5.58 5.58 0 0 0 3.69 1.06 5.58 5.58 0 0 0 3.69-1.06c1.42-1.41 1.42-6 0-7.38s-5.97-1.42-7.38 0z"></path><path d="m17.5 11.25a5.58 5.58 0 0 0 3.69-1.06c1.42-1.41 1.42-6 0-7.38s-6-1.42-7.38 0-1.42 6 0 7.38a5.58 5.58 0 0 0 3.69 1.06z"></path></g><path d="m13.81 13.81c-1.42 1.41-1.42 6 0 7.38a5.58 5.58 0 0 0 3.69 1.06 5.58 5.58 0 0 0 3.69-1.06c1.42-1.41 1.42-6 0-7.38s-5.97-1.42-7.38 0z" fill="#194fc6"></path></g></svg>
            {subCatId ? "Update Sub-Category" : "New Category"}
          </h1>
        </div>
        <div id="buttonsdata">


          <Link className="linkx4" to={"/dashboard/items-categories"}>
            <RxCross2 />
          </Link>
        </div>
      </div>

      <DisableEnterSubmitForm onSubmit={handleSubmitCategory}>
        {/* ${isDublicate ? 'disabledfield' : "" */}
        <div className="" id="maincontainerofforms">
          <div className={`firstblockwihc5 ${catId && subCatId === undefined ? 'disabledfield' : ""} `}>

            <div className="form_commonblock">
              <label>
                {/* {subCatId ? "Update Category" : "Category"} */}
                Category
                <b className='color_red'>*</b></label>
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
            <label> Sub Category <b className='color_red'>*</b></label>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input className={formData.name ? 'filledcolorIn' : null} required name="name" placeholder='Enter sub category name' value={formData.name} onChange={handleChange} />
            </span>
          </div>

          <div className="actionbarcommon">
            {subCatId ?
              <>
                <button type='submit' className="firstbtnc1">
                  {data?.loading === true ? "Updating" : "Update"}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </> :
              <>
                <button type='submit' className="firstbtnc1" >
                  {data?.loading === true ? "Creating" : "Create"}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                    <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>}

            <Link to={"/dashboard/items-categories"} className="firstbtnc2">
              Cancel
            </Link>
          </div>
        </div>

      </DisableEnterSubmitForm>

      <CreateCategoryPopup showPopup={showPopup} setShowPopup={setShowPopup} refreshCategoryListData={refreshCategoryListData} // Pass the callback function
      />
      <Toaster />
    </>
  )
}

export default CreateCategory
