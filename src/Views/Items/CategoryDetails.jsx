import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import CreateCategoryPopup from './CreateCategoryPopup';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteOutline } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';
import { deleteCategories, subCategoriesList } from '../../Redux/Actions/categoriesActions';

const CategoryDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [switchValue, setSwitchValue] = useState('Active');
  const [showPopup, setShowPopup] = useState(false);
  const data = useSelector(state => state?.createCategory);
  const deleteCategory = useSelector(state => state?.deleteCategory);
  const subCategoryList = useSelector(state => state?.subCategoryList);
  console.log("subCategoryList", subCategoryList)

  const handleSwitchChange = (e) => {
    setSwitchValue(e.target.value);
  };

  const categoryId = new URLSearchParams(location.search).get("id");
  // useEffect(() => {
  //   const storedCategoryData = JSON.parse(sessionStorage.getItem('categoryData'));

  //   if (storedCategoryData && storedCategoryData.id == categoryId) {
  //     setCategoryData(storedCategoryData);
  //   } else {
  //     setNotFound(true);
  //   }
  // }, [location.search]);




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

  const [callApi, setCallApi] = useState(false);

  const deleteHandler = (id) => {
    try {
      dispatch(deleteCategories({ id: id }))
        .then(() => {
          if (deleteCategory?.data?.success === true) {
            toast.success(deleteCategory?.data?.message);
            setCallApi(!callApi)
          } else {
            toast.error(deleteCategory?.data?.message);
            setCallApi(!callApi)
          }
          // navigate(`/dashboard/items-categories`);
        })
        .catch(() => {
          toast.error("Something went wrong")
        })
    } catch (e) {
      console.log(e)
    }
  }
  // console.log("categoryData.sub_category", categoryData?.sub_category)
  const editHandler = (id) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", id);
    navigate(`/dashboard/create-categories?${queryParams.toString()}`);
  }

  // const [updateData, setUpdateData] = useState(false)

  useEffect(() => {
    dispatch(subCategoriesList({ id: categoryId }));
  }, [dispatch, showPopup === false, callApi === false || true])

  return (
    <>
      <Toaster />
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
                      <input type="radio" id="switchMonthly" name="switchPlan" value="Active" checked={switchValue === "Active"} onChange={handleSwitchChange} />
                      <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="Inactive" checked={switchValue === "Inactive"} onChange={handleSwitchChange} />
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

                  <CreateCategoryPopup showPopup={showPopup} setCallApi={setCallApi} setShowPopup={setShowPopup} categoryData={subCategoryList?.data?.data[0]} />
                  <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
                    <img src="/Icons/menu-dots-vertical.svg" alt="" />
                    {showDropdown && (
                      <div className="dropdownmenucustom">
                        <div className='dmncstomx1'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#888888"} fill={"none"}>
                            <path d="M16 2H12C9.17157 2 7.75736 2 6.87868 2.94627C6 3.89254 6 5.41554 6 8.46154V9.53846C6 12.5845 6 14.1075 6.87868 15.0537C7.75736 16 9.17157 16 12 16H16C18.8284 16 20.2426 16 21.1213 15.0537C22 14.1075 22 12.5845 22 9.53846V8.46154C22 5.41554 22 3.89254 21.1213 2.94627C20.2426 2 18.8284 2 16 2Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M18 16.6082C17.9879 18.9537 17.8914 20.2239 17.123 21.0525C16.2442 22 14.8298 22 12.0011 22H8.00065C5.17192 22 3.75755 22 2.87878 21.0525C2 20.1049 2 18.5799 2 15.5298V14.4515C2 11.4014 2 9.87638 2.87878 8.92885C3.52015 8.2373 4.44682 8.05047 6.00043 8" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                          Duplicate</div>
                        <div className="bordersinglestroke"></div>
                        <div className='dmncstomx1'>
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
                        <MdDeleteOutline onClick={() => deleteHandler(subcategory?.id)} />
                        <TiEdit onClick={() => editHandler(subcategory?.id)} />
                      </b>))}
                    </p>
                  </li>
                </ul>
              </div>


            </>
          )}
        </>
      )}
    </>
  );
};


export default CategoryDetails
