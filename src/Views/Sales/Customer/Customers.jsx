import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate } from "react-router-dom";
import Loader02 from "../../../Components/Loaders/Loader02";
import { IoPrintOutline, IoSearchOutline } from "react-icons/io5";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { RxCross2, RxDotsHorizontal } from "react-icons/rx";
import { CiEdit, CiMail } from "react-icons/ci";
import { BsFiletypePdf } from "react-icons/bs";
import { TfiHelpAlt } from "react-icons/tfi";
import { VscEdit } from "react-icons/vsc";
import TopLoadbar from "../../../Components/Toploadbar/TopLoadbar";
import InsideCustomerBox from "../InsideCustomerBox";
import { GoPlus } from "react-icons/go";
import InsideItemDetailsBox from "../../Items/InsideItemDetailsBox";
import { customersList, customersView } from "../../../Redux/Actions/customerActions";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Common/Pagination/PaginationComponent";
import TableViewSkeleton from "../../../Components/SkeletonLoder/TableViewSkeleton";
import { TbListDetails } from "react-icons/tb";
import '../../Items/ManageItems.scss';


const SalesOrderList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cusView = useSelector(state => state?.viewCustomer);
  const cusList = useSelector(state => state?.customerList);
  // console.log("cusList", cusList)
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  useEffect(() => {
    fetchQuotations();
  }, [currentPage, itemsPerPage]);

  const fetchQuotations = async () => {
    try {
      const sendData = {
        fy: "2024",
        noofrec: itemsPerPage,
        currentpage: currentPage,

      }
      dispatch(customersList(sendData));
      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
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
    const areAllRowsSelected = cusList?.data?.user.every((row) => selectedRows.includes(row.id));
    setSelectAll(areAllRowsSelected);
  }, [selectedRows, cusList?.data?.user]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : cusList?.data?.user.map((row) => row.id));
  };
  //logic for checkBox...

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/customer-details?id=${quotation.id}`)
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


      <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">
            <h1 id="firstheading">
              All Customer
            </h1>

            <p id="firsttagp">{cusList?.data?.count} records</p>

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
            <Link className="linkx1" to={"/dashboard/create-customer"}>
              Create Customer <GoPlus />
            </Link>

            <div className="maincontainmiainx1">
              <div className="mainx2" >
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
              </div>
             
            </div>
          </div>
        </div>

        <div id="middlesection">
        <div id="mainsectioncsls">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme">
                <div className="table-headerx12">
                  <div className="table-cellx12 checkboxfx1 x2s5554" id="styl_for_check_box">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <div className="checkmark"></div>
                  </div>
                  <div className="table-cellx12 x125cd01">
                    {/* <TbListDetails /> */}
                    Name</div>
                  <div className="table-cellx12 x125cd02">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                      <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    COMPANY NAME</div>

                  <div className="table-cellx12 x125cd03">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                      <path d="M12 22L10 16H2L4 22H12ZM12 22H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    EMAIL</div>
                  <div className="table-cellx12 x125cd04">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                      <path d="M15 3V21M15 3H10M15 3H21M10 12H7.5C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3H10M10 12V3M10 12V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    WORK PHONE</div>
                  <div className="table-cellx12 x125cd05">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#000000"} fill={"none"}>
                      <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 17L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 13H10.009M13.991 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    RECIVEABLES</div>
                  <div className="table-cellx12 x125cd06">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#000000"} fill={"none"}>
    <path d="M4.46334 4.5C4.145 4.62804 3.86325 4.78886 3.60746 4.99087C3.40678 5.14935 3.22119 5.32403 3.0528 5.5129C2 6.69377 2 8.46252 2 12C2 15.5375 2 17.3062 3.0528 18.4871C3.22119 18.676 3.40678 18.8506 3.60746 19.0091C4.86213 20 6.74142 20 10.5 20H13.5C16.4923 20 18.2568 20 19.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 4.01578C8.7277 4 9.55437 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 14.3126 22 15.8693 21.7058 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 2L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2.5 9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21.5 9L13.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                    UNUSED CREDITS</div>
                </div>



                {cusList?.loading || dataChanging === true ? (
                  <TableViewSkeleton />
                ) : <>
                  {cusList?.data?.user?.map((quotation, index) => (
                    <div
                      className={`table-rowx12 ${selectedRows.includes(quotation.id) ? "selectedresult" : ""}`}
                      key={index}
                    >
                      <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                        <input
                          checked={selectedRows.includes(quotation.id)}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(quotation.id)}
                        />
                        <div className="checkmark"></div>
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd01">
                        {quotation.salutation + " " + quotation.first_name + " " + quotation.last_name  || "N/A"} 
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd02">
                        {quotation.company_name || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd03">
                        {quotation.email || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd04">
                        {quotation.work_phone || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd05">
                        {quotation.first_name || "N/A"}
                      </div>
                      <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd06">
                        {quotation.first_name || "N/A"}
                      </div>
                    </div>
                  ))}

                  <PaginationComponent
                    itemList={cusList?.data?.count}
                    setDataChangingProp={handleDataChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage} />
                </>}
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </div>

    </>
  );
};


export default SalesOrderList
