
import React, { useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { GoPlus } from 'react-icons/go';
import TableViewSkeleton from '../../Components/SkeletonLoder/TableViewSkeleton';
import PaginationComponent from '../Common/Pagination/PaginationComponent';
import { Toaster } from 'react-hot-toast';
import './categories.scss';

const Categories = () => {
  const catList = useSelector(state => state?.categoryList);

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataChanging, setDataChanging] = useState(false);
  const Navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const sendData = {
      fy: localStorage.getItem('FinancialYear'),
      noofrec: itemsPerPage,
      currentpage: currentPage,
    }

    dispatch(categoryList(sendData));
    setDataChanging(false);
  }, [dispatch, itemsPerPage, currentPage]);


  const handleRowClicked = (category) => {
    const categoryId = category.id;
    const subcategoryNames = category.sub_category.map(sub => sub.name).join('-');
    // sessionStorage.setItem('categoryData', JSON.stringify(category));
    Navigate(`/dashboard/category-details?id=${categoryId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCategories = catList?.data?.data?.filter(category =>
    category.name?.toLowerCase().includes(searchTerm) ||
    (category.sub_categories && category.sub_categories.some(sub => sub.name?.toLowerCase().includes(searchTerm)))
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const areAllRowsSelected = catList?.data?.data?.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, catList?.data?.data]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : catList?.data?.data?.map((row) => row.id));
  };

  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">
            <h1 id="firstheading">
              All Category
            </h1>
            <p id="firsttagp">{catList?.data?.total} records</p>
            <div id="searchbox">
              <input
                id="commonmcsearchbar"
                type="text"
                placeholder="Search organization"
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoSearchOutline />
            </div>
          </div>
          <div id="buttonsdata">
            {/* <div className="mainx1">
              <img src="/Icons/filters.svg" alt="" />
              <p>Filter</p>
            </div> */}
            <Link className="linkx1" to={"/dashboard/create-categories"}>
              New Category <GoPlus />
            </Link>
          </div>
        </div>
        <div id="mainsectioncsls">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="x5ssmalltable">
                <div className="headtablerowindx1" id='h5tablerowindx2'>
                  <div className="table-headerx12">
                    <div className="table-cellx12 checkboxfx2 x2s5554" id="styl_for_check_box">
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} /> <div className="checkmark"></div>
                    </div>
                    <div className="table-cellx12 cf01">CATEGORY</div>
                    <div className="table-cellx12 cf02">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                        <path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H6.5C7.32843 3 8 3.67157 8 4.5V6.5C8 7.32843 7.32843 8 6.5 8H4.5C3.67157 8 3 7.32843 3 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3 17.5C3 16.6716 3.67157 16 4.5 16H6.5C7.32843 16 8 16.6716 8 17.5V19.5C8 20.3284 7.32843 21 6.5 21H4.5C3.67157 21 3 20.3284 3 19.5V17.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7.99977 18.5H20.9998M15.9998 5.5H7.99977M16.3233 7.67649L7.64844 16.3513" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 4.5C16 3.67157 16.6716 3 17.5 3H19.5C20.3284 3 21 3.67157 21 4.5V6.5C21 7.32843 20.3284 8 19.5 8H17.5C16.6716 8 16 7.32843 16 6.5V4.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M18 21L19.3883 20.0537C20.4628 19.3213 21 18.9551 21 18.5C21 18.0449 20.4628 17.6787 19.3883 16.9463L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      SUBCATEGORY
                    </div>
                  </div>
                  {catList?.loading || dataChanging === true ? (
                    <TableViewSkeleton />
                  ) : (
                    <>
                      {filteredCategories?.length === 0 ? (
                        <div className="notdatafound">
                          <iframe src="https://lottie.host/embed/e8ebd6c5-c682-46b7-a258-5fcbef32b33e/PjfoHtpCIG.json" frameborder="0"></iframe>
                        </div>
                      ) : (
                        filteredCategories?.map((category, index) => (
                          <div
                            className={`table-rowx12 ${selectedRows.includes(category?.id) ? "selectedresult" : ""} ${category.active == 0 ? "inactive-row" : ""}`}
                            key={index}
                          >
                            {/* Checkbox */}
                            <div className="table-cellx12 checkboxfx2" id="styl_for_check_box">
                              <input
                                checked={selectedRows.includes(category?.id)}
                                type="checkbox"
                              />
                              <div className="checkmark"></div>
                            </div>

                            {/* Category Name */}
                            <div onClick={() => handleRowClicked(category)} className="table-cellx12 cf01">
                              {category?.name || "N/A"}
                            </div>

                            {/* Subcategory */}
                            <div onClick={() => handleRowClicked(category)} className="table-cellx12 cf02">
                              {category?.sub_category.length > 0 ? (
                                category?.sub_category?.slice(0, 5)?.map((subCategory, subIndex) => (
                                  <>
                                    <p className='subcatbloccf02' key={subIndex}>
                                      {subCategory.name}
                                    </p>
                                    <p>|</p>
                                  </>
                                ))
                              ) : (
                                // Render message if no subcategory
                                <div className="nodatainrow">
                                  {/* Prevent event propagation on click */}
                                  <Link to={`/dashboard/create-categories?cat_id=${category?.id}`} onClick={(e) => e.stopPropagation()}>
                                    <GoPlus /> Add
                                  </Link>
                                </div>
                              )}
                              {category?.sub_category.length > 5 && (
                                <div className="nodatainrow" onClick={() => handleRowClicked(category)}>
                                  <Link>View all</Link>
                                </div>
                              )}
                            </div>

                          </div>
                        ))
                      )}
                      <PaginationComponent
                        itemList={catList?.data?.total}
                        setDataChangingProp={handleDataChange}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Categories;
