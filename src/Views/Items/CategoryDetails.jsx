import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import CreateCategoryPopup from './CreateCategoryPopup';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteOutline } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { categoriesChangeStatus, createSubCategories, deleteCategories, subCategoriesList } from '../../Redux/Actions/categoriesActions';
import { GoPlus } from 'react-icons/go';
import MainScreenFreezeLoader from '../../Components/Loaders/MainScreenFreezeLoader';
import Loader02 from '../../Components/Loaders/Loader02';

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const data = useSelector(state => state?.createCategory);
  const deleteCategory = useSelector(state => state?.deleteCategory);
  const subCategoryList = useSelector(state => state?.subCategoryList);
  const categoryId = new URLSearchParams(location.search).get("id");
  const categoryStatus = useSelector(state => state?.categoryStatus);
  const [switchValue, setSwitchValue] = useState('');


  // category active and inactive
  const handleSwitchChange = (e) => {
    const newValue = e.target.value;
    setSwitchValue(newValue);
    if (categoryId) {
      const sendData = {
        id: categoryId,
        active: newValue
      }
      dispatch(categoriesChangeStatus(sendData))
        .then(() => {
          const toastMessage = newValue === '1' ? 'Category is now active' : 'Category is now inactive';
          toast.success(toastMessage);
        })
        .catch((error) => {
          toast.error('Failed to update item status');
          console.error('Error updating item status:', error);
          // Revert switch value if there's an error
          setSwitchValue((prevValue) => prevValue === '1' ? '0' : '1');
        });
    }
  };
  useEffect(() => {
    setSwitchValue(subCategoryList?.data?.data[0]?.active);
  }, [subCategoryList?.data?.data[0]]);
  // category active and inactive


  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const dropdownRef = useRef(null); // Ref to the dropdown element
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleOpenPopup = () => {
    setShowPopup(true);
  };


  // checkbox for active and inactive
  const [checkedMap, setCheckedMap] = useState({});
  useEffect(() => {
    const initialCheckedMap = {};
    subCategoryList?.data?.data[0]?.sub_category?.forEach(subcategory => {
      initialCheckedMap[subcategory.id] = (+subcategory.active);
    });
    setCheckedMap(initialCheckedMap);
  }, [subCategoryList]);

  const toggleCheckbox = (id) => {
    const newCheckedMap = { ...checkedMap };
    newCheckedMap[id] = newCheckedMap[id] === 1 ? 0 : 1;

    setCheckedMap(newCheckedMap);
    const updatedSubCategory = {
      id: id,
      active: newCheckedMap[id],
    };
    dispatch(categoriesChangeStatus(updatedSubCategory));
  };
  // checkbox for active and inactive


  // delete, edit and dublicate handler
  const [clickTrigger, setClickTrigger] = useState(false);


  const deleteCatHandler = (data) => {
    dispatch(deleteCategories({ id: data?.id }, Navigate, "catDeleted"))
  };

  const deleteSubCategoryHandler = (id) => {
    dispatch(deleteCategories({ id: id }, Navigate, "subCatDeleted"))
      .finally(() => {
        setClickTrigger(prevTrigger => !prevTrigger);
      });
  };

  const editHandler = (id) => {
    const queryParams = new URLSearchParams();
    queryParams.set("sub_cat_id", id);
    queryParams.set("cat_id", subCategoryList?.data?.data[0]?.id);
    Navigate(`/dashboard/create-categories?${queryParams.toString()}`);
  }
  // delete, edit and dublicate handler


  useEffect(() => {
    dispatch(subCategoriesList({ id: categoryId }));
  }, [dispatch, clickTrigger]);

  return (
    <>

      {deleteCategory?.loading && <MainScreenFreezeLoader />}
      {categoryStatus?.loading && <MainScreenFreezeLoader />}
      {subCategoryList?.loading && <MainScreenFreezeLoader />}

      <Toaster />

      <>
        {notFound ? (
          <h2>Category not found</h2>
        ) : (
          <>
            {subCategoryList?.data?.data[0] && (
              <>
                <div id="Anotherbox" className='formsectionx1'>
                  <div id="leftareax12">
                    <h1 id="firstheading">
                      {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
                      {/* {item_details?.name} */}

                      {subCategoryList?.data?.data[0]?.name}
                    </h1>
                  </div>
                  <div id="buttonsdata">
                    <div className="switchbuttontext">
                      <div className="switches-container">
                        <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue === "0"} onChange={handleSwitchChange} />
                        <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="1" checked={switchValue === "1"} onChange={handleSwitchChange} />
                        <label htmlFor="switchMonthly">Inactive</label>
                        <label htmlFor="switchYearly">Active</label>
                        <div className="switch-wrapper">
                          <div className="switch">
                            <div id='inactiveid'>Inactive</div>
                            <div>Active</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="separatorx21"></div> */}
                    <div className="mainx1" onClick={handleOpenPopup}>
                      <img src="/Icons/pen-clip.svg" alt="" />
                      <p>Edit</p>
                    </div>

                    {showPopup &&
                      <CreateCategoryPopup setClickTrigger={setClickTrigger} setShowPopup={setShowPopup} categoryData={subCategoryList?.data?.data[0]} />}
                    <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
                      <img src="/Icons/menu-dots-vertical.svg" alt="" />
                      {showDropdown && (
                        <div className="dropdownmenucustom">
                          {/* <div className='dmncstomx1' onClick={() => dublicateHandler(subCategoryList?.data?.data[0]?.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#888888"} fill={"none"}>
                              <path d="M16 2H12C9.17157 2 7.75736 2 6.87868 2.94627C6 3.89254 6 5.41554 6 8.46154V9.53846C6 12.5845 6 14.1075 6.87868 15.0537C7.75736 16 9.17157 16 12 16H16C18.8284 16 20.2426 16 21.1213 15.0537C22 14.1075 22 12.5845 22 9.53846V8.46154C22 5.41554 22 3.89254 21.1213 2.94627C20.2426 2 18.8284 2 16 2Z" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M18 16.6082C17.9879 18.9537 17.8914 20.2239 17.123 21.0525C16.2442 22 14.8298 22 12.0011 22H8.00065C5.17192 22 3.75755 22 2.87878 21.0525C2 20.1049 2 18.5799 2 15.5298V14.4515C2 11.4014 2 9.87638 2.87878 8.92885C3.52015 8.2373 4.44682 8.05047 6.00043 8" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            Duplicate</div> */}
                          <div className="bordersinglestroke"></div>
                          <div className='dmncstomx1' onClick={() => deleteCatHandler(subCategoryList?.data?.data[0])}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ff0000"} fill={"none"}>
                              <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M9 11.7349H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M10.5 15.6543H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Delete</div>
                        </div>
                      )}
                    </div>
                    <Link className="linkx4" to={"/dashboard/items-categories"}>
                      <RxCross2 />
                    </Link>
                  </div>
                </div>
                <div id="categorydetailbox45s">
                  <div className="inidbs1x1a1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#5D369F"} fill={"none"}>
                      <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.992 8H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Information
                  </div>
                  <ul>
                    <li><span>Category</span><h1>:</h1><p>{subCategoryList?.data?.data[0]?.name}</p></li>
                    <li><span>Subcategories</span><h1>:</h1>
                      <p className="subcatelsica5s">
                        {subCategoryList?.data?.data[0]?.sub_category?.map((subcategory, index) => (<b key={index}>
                          {subcategory?.name}
                          <div id='buttonsofdeedi5'>
                            <svg onClick={() => deleteSubCategoryHandler(subcategory?.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#000000"} fill={"none"}>
                              <path d="M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M20 15L13 21.9995M20 22L13 15.0005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>


                            {/* <TiEdit onClick={() => editHandler(subcategory?.id)} /> */}
                            <svg onClick={() => editHandler(subcategory?.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#000000"} fill={"none"}>
                              <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>

                            <div className="" id="toggle_button_for_sub_cat">
                              <div className="switch__container">
                                <input
                                  type="checkbox"
                                  checked={checkedMap[subcategory.id] === 1}
                                  onChange={() => toggleCheckbox(subcategory.id)}
                                  id={`switch-flat-${subcategory.id}`} // Unique id value
                                  className="switch switch--flat"
                                />
                                <label htmlFor={`switch-flat-${subcategory.id}`}></label>
                              </div>
                            </div>

                          </div>
                        </b>))}
                        <div className="addbuttonsubcat">
                          <Link to={`/dashboard/create-categories?cat_id=${subCategoryList?.data?.data[0]?.id}`}><GoPlus /> Add</Link>
                        </div>
                      </p>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default CategoryDetails