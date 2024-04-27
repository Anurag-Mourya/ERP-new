
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
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    sessionStorage.setItem('categoryData', JSON.stringify(category));
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#525252"} fill={"none"}>
                        {/* Your SVG code */}
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
                          <svg clip-rule="evenodd" fill-rule="evenodd" height="512" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_7486772"><g id="Exp-2.-F"><path d="m51.791 24.617h-37c-.796 0-1.559.316-2.122.879-.562.562-.878 1.325-.878 2.121v6h40z" fill="#a4bbdb"></path><path d="m11.791 28.303h40v1.863h-40z" fill="#8da3be"></path><path d="m51.791 23.696c0-.795-.316-1.558-.879-2.121-.563-.562-1.326-.879-2.121-.879-3.581 0-9.48 0-12.638 0-1.287 0-2.43.821-2.842 2.04-.578 1.713-1.311 3.881-1.311 3.881h19.791z" fill="#a4bbdb"></path><path d="m54.279 34.234c.18-1.154-.154-2.33-.914-3.218s-1.87-1.399-3.039-1.399c-8.821 0-27.831 0-36.652 0-1.169 0-2.279.511-3.039 1.399s-1.094 2.064-.914 3.218c1.018 6.512 2.85 18.238 3.75 24 .305 1.948 1.982 3.383 3.953 3.383h29.152c1.971 0 3.648-1.435 3.953-3.383.9-5.762 2.732-17.488 3.75-24z" fill="#cadcf0"></path><path d="m9.721 34.234.513 3.28c-.181-1.155.216-2.331.976-3.219s1.87-1.399 3.039-1.399h35.502c1.169 0 2.279.511 3.039 1.399s1.157 2.064.976 3.219l.513-3.28c.18-1.154-.154-2.33-.914-3.218s-1.87-1.399-3.039-1.399c-8.821 0-27.831 0-36.652 0-1.169 0-2.279.511-3.039 1.399s-1.094 2.064-.914 3.218z" fill="#e9f3fc"></path><g fill="#347bfa"><path d="m29.715 53.464c0-1.104-.895-2-2-2-2.219 0-5.78 0-8 0-1.104 0-2 .896-2 2v2c0 1.105.896 2 2 2h8c1.105 0 2-.895 2-2 0-.643 0-1.356 0-2z"></path><path d="m23.557 25.826c-.044-.282-.065-.56-.064-.834.002-.551-.444-1.001-.996-1.004-.552-.002-1.002.444-1.004.996-.002.378.027.763.089 1.153.085.545.598.918 1.143.832.545-.085.918-.598.832-1.143z"></path><path d="m24.607 21.993c.196-.23.416-.446.66-.648.425-.352.485-.982.133-1.408-.352-.425-.982-.485-1.408-.133-.335.277-.638.576-.908.892-.358.421-.307 1.052.113 1.41s1.052.307 1.41-.113z"></path><path d="m28.376 19.902c.404-.091.83-.159 1.277-.204.549-.055.95-.545.895-1.094s-.545-.951-1.094-.896c-.53.053-1.036.135-1.516.243-.539.121-.878.656-.757 1.194.121.539.656.878 1.195.757z"></path><path d="m33.495 19.694c.61.016 1.189.011 1.741-.012.551-.023.98-.49.957-1.041s-.489-.98-1.041-.957c-.509.021-1.044.025-1.606.011-.552-.014-1.011.423-1.025.974-.014.552.423 1.011.974 1.025z"></path><path d="m39.368 19.055c.645-.187 1.227-.41 1.749-.66.497-.239.707-.837.468-1.335-.239-.497-.837-.707-1.334-.468-.43.206-.909.388-1.441.543-.53.154-.835.709-.681 1.239s.709.835 1.239.681z"></path><path d="m44.122 15.939c.478-.682.79-1.409.962-2.144.126-.538-.209-1.076-.746-1.202-.537-.125-1.076.209-1.201.746-.117.498-.329.99-.653 1.452-.316.452-.207 1.076.245 1.393s1.077.207 1.393-.245z"></path><path d="m44.715 9.783c-.443-1.033-1.137-1.903-1.961-2.471-.455-.314-1.078-.199-1.391.255-.314.454-.199 1.078.255 1.391.535.369.972.944 1.259 1.614.218.508.807.743 1.314.525s.742-.806.524-1.314z"></path></g><path d="m31.891 6.831c1.082-6.127 10.459-5.731 5 0z" fill="#cadcf0"></path><path d="m31.891 8.383c1.082 6.126 10.459 5.731 5 0z" fill="#cadcf0"></path><path d="m31.801 8.617h6.696c.552 0 1-.448 1-1s-.448-1-1-1h-6.696c-.551 0-1 .448-1 1s.449 1 1 1z" fill="#347bfa"></path></g></svg>
                        </div>
                      ) : (
                        filteredCategories?.map((category, index) => (
                          <div
                            className={`table-rowx12 ${selectedRows.includes(category?.id) ? "selectedresult" : ""}`}
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
                                // Render subcategory buttons
                                category?.sub_category.map((subCategory, subIndex) => (
                                  <p className='subcatbloccf02' key={subIndex} onClick={() => handleSubCategoryClicked(subCategory)}>
                                    {subCategory.name}
                                  </p>
                                ))
                              ) : (
                                // Render message if no subcategory
                                <div className="nodatainrow">

                                  <svg height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg" id="fi_1909470"><g id="Folder-5" data-name="Folder"><path d="m13 45h16a16 16 0 0 1 24-13.86v-16.14a2.006 2.006 0 0 0 -2-2h-38a4 4 0 0 0 -4 4v24a4 4 0 0 0 4 4z" fill="#9bc9ff"></path><path d="m42 35 2 12h2l2-12z" fill="#9bc9ff"></path><path d="m43.59 51.59a1.955 1.955 0 0 0 -.59 1.41 2.006 2.006 0 0 0 2 2 2 2 0 1 0 -1.41-3.41z" fill="#9bc9ff"></path><g fill="#57a4ff"><path d="m54 30.6v-15.6a3 3 0 0 0 -2-2.816v-3.184a3 3 0 0 0 -3-3h-28a1 1 0 0 1 -1-1 3 3 0 0 0 -3-3h-12a3 3 0 0 0 -3 3v38a3 3 0 0 0 3 3h23.051a16.989 16.989 0 1 0 25.949-15.4zm-50 12.4v-38a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 3 3 0 0 0 3 3h28a1 1 0 0 1 1 1v3h-37a5.006 5.006 0 0 0 -5 5v24a4.948 4.948 0 0 0 1.026 3h-4.026a1 1 0 0 1 -1-1zm6-2v-24a3 3 0 0 1 3-3h38a1 1 0 0 1 1 1v14.526a16.947 16.947 0 0 0 -23.949 14.474h-15.051a3 3 0 0 1 -3-3zm35 19a15 15 0 1 1 15-15 15.017 15.017 0 0 1 -15 15z"></path><path d="m48 34h-6a1 1 0 0 0 -.986 1.165l2 12a1 1 0 0 0 .986.835h2a1 1 0 0 0 .986-.835l2-12a1 1 0 0 0 -.986-1.165zm-2.847 12h-.306l-1.666-10h3.638z"></path><path d="m45 50a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z"></path><path d="m13 16a1 1 0 0 0 -1 1v4h2v-3h3v-2z"></path><path d="m12 23h2v2h-2z"></path></g></g></svg>
                                  <p>No subcategory</p>
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
