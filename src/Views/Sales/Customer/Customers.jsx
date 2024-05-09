import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
import { otherIcons } from "../../Helper/SVGIcons/ItemsIcons/Icons";
import { exportItems, importItems } from "../../../Redux/Actions/itemsActions";
import { fetchMasterData } from "../../../Redux/Actions/globalActions";


const SalesOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const cusView = useSelector(state => state?.viewCustomer);
  const cusList = useSelector(state => state?.customerList);
  // console.log(cusList)
  const dispatch = useDispatch();
  const Navigate = useNavigate()

  // dropdwon filter,sortby and import/export
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const dropdownRef = useRef(null);



  // serch,filter and sortBy//////////////////////////////////////////////////////////
  const [searchCall, setSearchCall] = useState(false);

  // filter/
  const [selectAllCustomer, setSelectAllCustomer] = useState(false);
  const [overdue, setOverdue] = useState(false);
  const [customerType, setCustomerType] = useState('');
  const [status, setStatus] = useState('');
  const [allFilters, setAllFilters] = useState({});

  const handleApplyFilter = () => {
    const filterValues = {
      is_customer: selectAllCustomer ? 1 : '',
      status: status === 'active' ? 1 : status === 'inactive' ? 0 : '', // Set status based on selection
      customer_type: customerType,
      overdue: overdue ? 1 : '',
    };

    const filteredValues = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value !== '')
    );


    const filterButton = document.getElementById("filterButton");
    if (filterValues.customer_type === "" && filterValues.is_customer === 1 && filterValues.overdue === "" && filterValues.status === "") {
      filterButton.classList.remove('filter-applied');
    } else {
      filterButton.classList.add('filter-applied');
    }

    setIsFilterDropdownOpen(!isFilterDropdownOpen)
    setAllFilters(filteredValues);
  };

  const handleAllCustomersChange = (checked) => {
    setSelectAllCustomer(checked);
    if (checked) {
      setOverdue(false);
      setCustomerType('');
      setStatus('');
    }
  };
  // filter//

  // sortBy
  const sortDropdownRef = useRef(null);

  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState('Normal');

  // console.log("selectedSortBy", selectedSortBy)
  const currentDate = new Date().toISOString().slice(0, 10);

  const [custom_date, setCustom_date] = useState(""); // Initial state is an empty string
  const [fromDate, setFromDate] = useState(currentDate); // Initial state is an empty string
  const [toDate, setToDate] = useState(""); // Initial state is an empty string

  const handleSortBySelection = (sortBy) => {
    setSelectedSortBy(sortBy);
    setIsSortByDropdownOpen(false);

    const sortByButton = document?.getElementById("sortByButton");
    if (sortByButton) {
      if (sortBy !== 'Normal') {
        sortByButton?.classList.add('filter-applied');
      } else {
        sortByButton?.classList.remove('filter-applied');
      }
    }
  };

  // Handle date input change
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setCustom_date(selectedDate); // Update the date state here
    setSelectedSortBy("custom_date")
    setIsSortByDropdownOpen(false);
    sortByButton.classList.add('filter-applied');
  };
  // Handle date input change
  const handleDateRangeFrom = (event) => {
    const selectedDate = event.target.value;
    setFromDate(selectedDate); // Update the date state here
    // setSelectedSortBy("fromDate")
    sortByButton.classList.add('filter-applied');
  };
  // Handle date input change
  const handleDateRangeTo = (event) => {
    const selectedDate = event.target.value;
    setToDate(selectedDate); // Update the date state here
    setSelectedSortBy("toDate")
    setIsSortByDropdownOpen(false);
    sortByButton.classList.add('filter-applied');
  };
  // sortby//


  //serch//
  const searchItems = () => {
    setSearchCall(!searchCall);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(() => {
      setSearchCall(!searchCall);
    }, 1000);
  };
  // serch,filter and sortBy//////////////////////////////////////////////////////////

  const fetchCustomers = async () => {
    try {
      const sendData = {
        fy: "2024",
        noofrec: itemsPerPage,
        currentpage: currentPage,
      }

      switch (selectedSortBy) {
        case 'Name':
          sendData.name = 1
          break;
        case 'custom_date':
          sendData.custom_date = custom_date
          break;

        case 'toDate':
          sendData.fromDate = fromDate
          sendData.toDate = toDate
          break;
        case 'last_modified':
          sendData.updated_at = 1
          break;
        default:
      }

      if (Object.keys(allFilters).length > 0) {
        dispatch(customersList({
          ...allFilters, search: searchTerm, ...sendData
        }));
      } else {
        dispatch(customersList({ ...sendData, search: searchTerm }));
      }

      setDataChanging(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [currentPage, itemsPerPage, searchCall, allFilters, selectedSortBy, toDate]);


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


  //for import and export .xlsx file drag and dorp/////////////////////////////////

  //export data
  const handleFileExport = async () => {
    try {
      dispatch(exportItems())
        .finally(() => {
          toast.success("Customers exported successfully");
          setIsMoreDropdownOpen(false)
        });
    } catch (error) {
      toast.error('Error exporting Customers:', error);
      setIsMoreDropdownOpen(false)
    }
  };
  //export data

  const fileInputRef = useRef(null);

  const [showImportPopup, setShowImportPopup] = useState(false); // State variable for popup visibility

  const [callApi, setCallApi] = useState(false);

  const handleFileImport = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);
    dispatch(importItems(formData))
      .then(() => {
        setShowImportPopup(false);
        setCallApi((preState) => !preState);
        // Reset file input value after import operation is completed
        fileInputRef.current.value = ''; // Clearing file input value
        // Reset fileName state
        setFileName('');
      })
  };


  // for drag and drop files
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileImport(files[0]); // Pass the first dropped file to handleFileImport
      setFileName(files[0].name); // Set the file name
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileImport(files[0]); // Pass the first dropped file to handleFileImport
      setFileName(files[0].name); // Set the file name
    }
  };
  //for import and export .xlsx file drag and dorp/////////////////////////////////




  //DropDown for fitler, sortby and import/export
  const handleSortByDropdownToggle = () => {
    setIsSortByDropdownOpen(!isSortByDropdownOpen);
  };

  const handleFilterDropdownToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const handleMoreDropdownToggle = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setIsSortByDropdownOpen(false);
    }
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
      setIsFilterDropdownOpen(false);
    }
    if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target)) {
      setIsMoreDropdownOpen(false);
    }

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/customer-details?id=${quotation.id}`)
  };














  const masterData = useSelector(state => state?.masterData?.masterData);


  useEffect(() => {
    dispatch(fetchMasterData());

  }, [dispatch]);
  const CusomterType = masterData?.filter(type => type.type === "3");

  const findUnitTypeById = (id) => {
    const unit = CusomterType?.find(unit => unit.labelid === id);
    return unit ? unit.label : '';
  };





  return (
    <>
      <TopLoadbar />

      <div id="Anotherbox" className='formsectionx1'>
        <div id="leftareax12">
          <h1 id="firstheading">

            <img src={"/assets/Icons/allcustomers.svg"} alt="" />
            All Customer
          </h1>

          <p id="firsttagp">{cusList?.data?.count} records</p>

          <div id="searchbox">
            <input
              id="commonmcsearchbar" // Add an ID to the search input field
              type="text"
              placeholder="Name, Company, Email, Mobile or Work."
              value={searchTerm}
              onChange={handleSearch}
            />

            <IoSearchOutline onClick={searchItems} />
          </div>
        </div>

        <div id="buttonsdata">
          <div className="maincontainmiainx1">
            <div className="maincontainmiainx1">
              <div className="mainx1" id="sortByButton" onClick={handleSortByDropdownToggle}>

                <img src="/Icons/sort-size-down.svg" alt="" />
                <p>Sort by</p>
              </div>
              {isSortByDropdownOpen && (
                <div className="dropdowncontentofx35" ref={sortDropdownRef}>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Normal' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Normal')}>Normal</div>

                  <div className={`dmncstomx1 ${selectedSortBy === 'Name' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Name')}>Name</div>

                  <div>
                    <div className={`dmncstomx1 ${selectedSortBy === 'custom_date' ? 'activedmc' : ''}`}>
                      <div>Custom Date</div>
                      <div><input type="date" name="custom_date" id="" value={custom_date} onChange={handleDateChange} /></div>
                    </div>

                  </div>
                  <div>
                    <div className={`dmncstomx1 ${selectedSortBy === 'toDate' ? 'activedmc' : ''}`}>
                      <div>Date Range</div>
                      <div> From:<div><input type="date" name="fromDate" id="" value={fromDate} onChange={handleDateRangeFrom} /></div></div>
                      <div> To:<div><input type="date" name="toDate" id="" value={toDate} onChange={handleDateRangeTo} /></div></div>
                    </div>
                  </div>

                  <div className={`dmncstomx1 ${selectedSortBy === 'last_modified' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('last_modified')}>Updated At</div>

                </div>
              )}

            </div>

          </div>
          <div className={`maincontainmiainx1`}>

            <div className="mainx1 labelfistc51s" id="filterButton" onClick={handleFilterDropdownToggle}>
              <img src="/Icons/filters.svg" alt="" />
              <p>Filter</p>
            </div>
            {isFilterDropdownOpen && (
              <div className="" ref={filterDropdownRef}>

                <div className="filter-container">
                  <label className={selectAllCustomer ? "active-filter" : "labelfistc51s"}>

                    <input
                      type="checkbox"
                      checked={selectAllCustomer}
                      // onChange={(e) => setSelectAllCustomer(e.target.checked)}
                      onChange={(e) => handleAllCustomersChange(e.target.checked)}

                      hidden
                    />
                    All Customers
                  </label>
                  <label className={`${overdue ? "active-filter" : "labelfistc51s"} ${selectAllCustomer ? "disabledfield" : ""}`}>

                    <input
                      type="checkbox"
                      checked={overdue}
                      onChange={(e) => setOverdue(e.target.checked)}
                      hidden
                    />
                    Overdue
                  </label>
                  <div className="cusfilters12x2">
                    <p className="custtypestext4s">Customer Type</p>
                    <div className={`cusbutonscjks54 ${selectAllCustomer ? "disabledfield" : ""}`}>

                      <label>
                        <input
                          type="checkbox"
                          checked={customerType === "Business"}
                          onChange={(e) => setCustomerType(e.target.checked ? "Business" : "")}
                        />
                        <button className={`filter-button ${customerType === "Business" ? "selected" : ""}`} onClick={() => setCustomerType("Business")}>Business</button>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={customerType === "Individual"}
                          onChange={(e) => setCustomerType(e.target.checked ? "Individual" : "")}
                        />
                        <button className={`filter-button ${customerType === "Individual" ? "selected" : ""}`} onClick={() => setCustomerType("Individual")}>Individual</button>
                      </label>
                    </div>
                  </div>
                  <div className={`cusfilters12x2`}>
                    <p className="custtypestext4s">Status</p>
                    <div className={`cusbutonscjks54 ${selectAllCustomer ? "disabledfield" : ""}`}>

                      <label>
                        <input
                          type="checkbox"
                          checked={status === "active"}
                          onChange={(e) => setStatus(e.target.checked ? "active" : "")}
                          disabled={selectAllCustomer}
                        />
                        <button className={`filter-button ${status === "active" ? "selected" : ""}`} onClick={() => setStatus("active")}>Active</button>
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={status === "inactive"}
                          onChange={(e) => setStatus(e.target.checked ? "inactive" : "")}
                          disabled={selectAllCustomer}

                        />
                        <button className={`filter-button ${status === "inactive" ? "selected" : ""}`} onClick={() => setStatus("inactive")}
                        >Inactive</button>
                      </label>
                    </div>
                  </div>

                  <button className="buttonofapplyfilter" onClick={handleApplyFilter}>Apply Filter</button>
                </div>
              </div>
            )}
          </div>
          <Link className="linkx1" to={"/dashboard/create-customer"}>
            Create Customer <GoPlus />
          </Link>

          {/* More dropdown */}
          <div className="maincontainmiainx1">
            <div className="mainx2" onClick={handleMoreDropdownToggle}>
              <img src="/Icons/menu-dots-vertical.svg" alt="" />
            </div>
            {isMoreDropdownOpen && (
              <div className="dropdowncontentofx35" ref={moreDropdownRef}>
                <div onClick={() => setShowImportPopup(true)} className="dmncstomx1 xs2xs23" >
                  {otherIcons?.import_svg}
                  <div>Import Customers</div>
                </div>

                <div className="dmncstomx1 xs2xs23" onClick={handleFileExport}>
                  {otherIcons?.export_svg}
                  Export Customers</div>
              </div>
            )}
          </div>
        </div>
      </div >

      <div className="listsectionsgrheigh">
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

                    <div className="table-cellx12 x125cd04">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#5d369f"} fill={"none"} className="padding_2">
                        <path d="M12 2H6C3.518 2 3 2.518 3 5V22H15V5C15 2.518 14.482 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18 8H15V22H21V11C21 8.518 20.482 8 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M8 6L10 6M8 9L10 9M8 12L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.5 22V18C11.5 17.0572 11.5 16.5858 11.2071 16.2929C10.9142 16 10.4428 16 9.5 16H8.5C7.55719 16 7.08579 16 6.79289 16.2929C6.5 16.5858 6.5 17.0572 6.5 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                      TYPE</div>
                    <div className="table-cellx12 x125cd02">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#5d369f"} fill={"none"} className="padding_2">
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#5d369f"} fill={"none"} className="padding_2">
                        <path d="M12 22L10 16H2L4 22H12ZM12 22H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      EMAIL</div>
                    <div className="table-cellx12 x125cd04">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#5d369f"} fill={"none"} className="padding_2">
                        <path d="M15 3V21M15 3H10M15 3H21M10 12H7.5C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3H10M10 12V3M10 12V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      WORK PHONE</div>
                    <div className="table-cellx12 x125cd05">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#5d369f"} fill={"none"} className="padding_2">
                        <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M10 17L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 13H10.009M13.991 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      RECIVEABLES</div>
                    <div className="table-cellx12 x125cd06">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#5d369f"} fill={"none"} className="padding_2">
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
                    {cusList?.data?.user?.length >= 1 ?
                      <>
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
                              {quotation.salutation + " " + quotation.first_name + " " + quotation.last_name || ""}
                            </div>
                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd02">
                              {quotation.customer_type || ""}
                            </div>
                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd02">
                              {quotation.company_name || ""}
                            </div>
                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd03">
                              {quotation.email || ""}
                            </div>
                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd04">
                              {quotation.work_phone || ""}
                            </div>
                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd05">
                              {quotation.first_name || ""}
                            </div>
                            <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x125cd06">
                              {quotation.first_name || ""}
                            </div>
                          </div>
                        ))}
                      </> :
                      <div className="notdatafound">
                        <iframe src="https://lottie.host/embed/e8ebd6c5-c682-46b7-a258-5fcbef32b33e/PjfoHtpCIG.json" frameborder="0"></iframe>
                      </div>
                    }
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
            {showImportPopup && (
              <div className={`mainxpopups1 ${isDragging ? 'dragover' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <div className="popup-content">
                  <span className="close-button" onClick={() => setShowImportPopup(false)}><RxCross2 /></span>
                  <h2>Import Customers</h2>

                  <form onSubmit={handleFileImport}>
                    <div className="midpopusec12x">
                      <div className="cardofselcetimage5xs">
                        {otherIcons?.drop_file_svg}
                        <h1>Drop your file here, or <label onClick={openFileDialog}>browse</label> </h1>
                        <input id="browse" type="file" accept=".xlsx" ref={fileInputRef} onChange={handleFileInputChange} hidden />
                        <b>{fileName}</b>
                        <p>Supports: .xlsx</p>
                      </div>
                      <button type="submit" className="submitbuttons1">
                        <span>
                          <p>Import</p>
                          {otherIcons?.import_svg}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <Toaster />
          </div>
        </div>

      </div>
    </>
  );
};


export default SalesOrderList
