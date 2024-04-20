import React, { useState, useEffect, useRef } from 'react';
import { IoDuplicateOutline, IoSearchOutline } from "react-icons/io5";
import Loader02 from '../../Components/Loaders/Loader02';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../Redux/Actions/listApisActions';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { GoPlus } from 'react-icons/go';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import TableViewSkeleton from '../../Components/SkeletonLoder/TableViewSkeleton';
import PaginationComponent from '../Common/Pagination/PaginationComponent';
import { TbListDetails } from 'react-icons/tb';
import { Toaster } from 'react-hot-toast';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const catList = useSelector(state => state?.categoryList);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataChanging, setDataChanging] = useState(false);

  // console.log("catList", catList)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  useEffect(() => {
    const sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    }

    dispatch(categoryList(sendData));
    setDataChanging(false);
  }, [dispatch, itemsPerPage, currentPage]);

  const handleRowClicked = (category) => {
    setSelectedCategory(category);
    // Handle click logic
  };



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleDownloadPDF = () => {
    // Generate PDF from quotation details
    html2canvas(document.getElementById("item-details")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('quotation.pdf');
    });
  };

  const handlePrint = () => {
    // Generate PDF from quotation details and print
    html2canvas(document.getElementById("item-details")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.autoPrint();
      window.open(pdf.output('bloburl'), '_blank');
    });
  };

  //logic for checkBox...
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleCheckboxChange = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };
  useEffect(() => {
    const areAllRowsSelected = catList?.data?.data?.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, catList?.data?.data]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : catList?.data?.data?.map((row) => row.id));
  };
  //logic for checkBox...

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
        <div id="Anotherbox">
          <div id="leftareax12">
            <h1 id="firstheading">
              <img src={"/Icons/bags-shopping.svg"} alt="" />
              Manage Category
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
            <div className="mainx1">
              <img src="/Icons/sort-size-down.svg" alt="" />
              <p>Sort by</p>
            </div>
            <div className="mainx1">
              <img src="/Icons/filters.svg" alt="" />
              <p>Filter</p>
            </div>
            <Link className="linkx1" to={"/dashboard/create-categories"}>
              Create Category <GoPlus />
            </Link>
            <Link className="linkx1" to={"/dashboard/create-subcategories"}>
              Create Sub Category <GoPlus />
            </Link>
          </div>
        </div>

        <div id="mainsectioncsls">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <div className="checkmark"></div>
                  </div>
                  <div className="table-cellx12 namefield"><TbListDetails />Name</div>
                  <div className="table-cellx12 namefield"><TbListDetails />Title</div>
                  <div className="table-cellx12 x23field">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                      <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Parent Category</div>

                  <div className="table-cellx12 x24field">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                      <path d="M12 22L10 16H2L4 22H12ZM12 22H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Description</div>


                </div>

                {catList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : <>
                  {catList?.data?.data?.map((quotation, index) => (
                    <div
                      className={`table-rowx12 ${selectedRows.includes(quotation?.id) ? "selectedresult" : ""}`}
                      key={index}
                    >
                      <div
                        className={`table-rowx12 ${selectedCategory && selectedCategory.id === category.id ? "selectedresult" : ""}`}
                        key={index}
                        onClick={() => handleRowClicked(category)}
                      ></div>
                      <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                        <input
                          checked={selectedRows.includes(quotation?.id)}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(quotation?.id)}
                        />
                        <div className="checkmark"></div>
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 namefield">
                        {quotation?.name || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                        {quotation?.title || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                        {quotation?.parent_id || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                        {quotation?.description || "N/A"}
                      </div>


                    </div>
                  ))}

                  <PaginationComponent
                    itemList={catList?.data?.total}
                    setDataChangingProp={handleDataChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage} />
                </>}
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