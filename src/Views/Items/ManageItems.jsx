import React, { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoPricetagsOutline, IoSearchOutline } from "react-icons/io5";
import TopLoadbar from "../../Components/Toploadbar/TopLoadbar";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { itemLists } from "../../Redux/Actions/listApisActions";
import TableViewSkeleton from "../../Components/SkeletonLoder/TableViewSkeleton";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import { otherIcons } from "../Helper/SVGIcons/ItemsIcons/Icons";
import { itemsTableIcon } from "../Helper/SVGIcons/ItemsIcons/ItemsTableIcons";
import { exportItems, importItems } from "../../Redux/Actions/itemsActions";
import { RxCross2 } from "react-icons/rx";
import MainScreenFreezeLoader from "../../Components/Loaders/MainScreenFreezeLoader";
import NoDataFound from "../../Components/NoDataFound/NoDataFound";


import newmenuicoslz from '../../assets/outlineIcons/othericons/newmenuicoslz.svg';
import sortbyIco from '../../assets/outlineIcons/othericons/sortbyIco.svg';
import FilterIco from '../../assets/outlineIcons/othericons/FilterIco.svg';
import ResizeFL from "../../Components/ExtraButtons/ResizeFL";
import { Tooltip } from "react-tooltip";
import { IoIosArrowRoundForward } from "react-icons/io";


const Quotations = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanging, setDataChanging] = useState(false);
  const itemListState = useSelector(state => state?.itemList);
  const itemList = itemListState?.data?.item || [];
  const totalItems = itemListState?.data?.total_items || 0;
  const itemListLoading = itemListState?.loading || false;
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();

  const importItemss = useSelector(state => state?.importItems);
  const exportItemss = useSelector(state => state?.exportItems);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchCall, setSearchCall] = useState(false);
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevRows) =>
      prevRows.includes(rowId)
        ? prevRows.filter((id) => id !== rowId)
        : [...prevRows, rowId]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : itemList.map((row) => row.id));
  };


  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/item-details?id=${quotation.id}`);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };







  //for import and export .xlsx file 
  const fileInputRef = useRef(null);

  const [showImportPopup, setShowImportPopup] = useState(false); // State variable for popup visibility

  // Function to handle import button click and toggle popup visibility
  const handleImportButtonClick = () => {
    setShowImportPopup(true);
  };


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



  const handleFileExport = async () => {
    try {
      dispatch(exportItems())
        .finally(() => {
          toast.success("Item exported successfully");
          setIsMoreDropdownOpen(false)
        });
    } catch (error) {
      toast.error('Error exporting items:', error);
      setIsMoreDropdownOpen(false)
    }
  };


  // serch and filter

  // filter/
  const [selectAllItems, setSelectAllItems] = useState(false);
  const [itemType, setItemType] = useState('');
  const [status, setStatus] = useState('');
  const [allFilters, setAllFilters] = useState({});

  const handleApplyFilter = () => {
    const filterValues = {
      is_is_item: selectAllItems ? 1 : '',
      active: status === 'active' ? 1 : status === 'inactive' ? 0 : '', // Set status based on selection
      type: itemType,
    };

    const filteredValues = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value !== '')
    );


    const filterButton = document.getElementById("filterButton");
    if (filterValues.type === "" && filterValues.is_is_item === 1 && filterValues.status === "") {
      filterButton.classList.remove('filter-applied');
    } else {
      filterButton.classList.add('filter-applied');
    }

    setIsFilterDropdownOpen(!isFilterDropdownOpen)
    setAllFilters(filteredValues);
  };

  const handleAllItemsChange = (checked) => {
    setSelectAllItems(checked);
    if (checked) {
      setItemType('');
      setStatus('');
    }
  };
  // filter//


  //sortBy
  const [allSort, setAllSort] = useState({});
  const [normal, setNormal] = useState("");
  const [names, setNames] = useState(false);
  const [price, setPrice] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleApplySortBy = () => {
    const filterValues = {
      purchase_price: purchasePrice === 'Ascending' ? "1" : purchasePrice === 'Descending' ? "0" : '',
      price: price === 'Ascending' ? "1" : price === 'Descending' ? "0" : '',
      name: names ? "1" : ''
    };

    const filteredValues = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value !== '')
    );


    const filterButton = document.getElementById("sortByButton");
    if (filterValues.price === "" && filterValues.name === "" && normal === true && filterValues.purchase_price === "") {
      filterButton.classList.remove('filter-applied');
    } else {
      filterButton.classList.add('filter-applied');
    }

    setIsSortByDropdownOpen(!isSortByDropdownOpen)
    setAllSort(filteredValues);
  };

  const handleAllItemsChange1 = (checked) => {
    setNormal(checked);
    if (checked) {
      setPrice('');
      setPurchasePrice('');
      setNames('');
    }
  };
  //sortBy

  //serch
  const searchItems = () => {
    setSearchCall(!searchCall);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setTimeout(() => {
      setSearchCall(!searchCall);
    }, 1000);
    // Add a class to the search input field when the search term is not empty
    const searchInput = document.getElementById("commonmcsearchbar");
    if (searchInput) {
      if (e.target.value) {
        searchInput.classList.add('search-applied');
      } else {
        searchInput.classList.remove('search-applied');
      }
    }
  };
  //serch

  // serch and filter


  //fetch all data
  useEffect(() => {
    let sendData = {
      fy: "2024",
      noofrec: itemsPerPage,
      currentpage: currentPage,
    };
    if (searchTerm) {
      sendData.search = searchTerm;
    }


    if (Object.keys(allFilters).length > 0 || Object.keys(allSort).length > 0) {
      // console.log("allFilters", allFilters)
      // console.log("allFilters", allFilters)
      dispatch(itemLists({
        ...sendData,
        ...allFilters,
        ...allSort
      }));
    } else {
      dispatch(itemLists(sendData));
    }


    setDataChanging(false);
  }, [currentPage, itemsPerPage, dispatch, searchCall, allSort, allFilters, callApi]);
  //fetch all data


  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Update the file input value
      fileInputRef.current.files = files;
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

  return (
    <>
      {importItemss?.loading && <MainScreenFreezeLoader />}
      {exportItemss?.loading && <MainScreenFreezeLoader />}
      <TopLoadbar />
      <Tooltip id="my-tooltip" className="extraclassoftooltip" />

      <div id="middlesection" className="">
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">

            <h1 id="firstheading">
              <svg version="1.1" id="fi_891462" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.674 490.674" style={{ enableBackground: "new 0 0 490.674 490.674" }} xmlSpace="preserve">
                <g>
                  <circle style={{ fill: "#455A64" }} cx="394.667" cy="426.671" r="53.333" />
                  <circle style={{ fill: "#455A64" }} cx="181.333" cy="426.671" r="53.333" />
                </g>
                <path style={{ fill: "#FFC107" }} d="M488,78.276c-2.026-2.294-4.94-3.607-8-3.605H96c-5.891-0.001-10.668,4.773-10.669,10.664c0,0.717,0.072,1.433,0.216,2.136l42.667,213.333c1.014,4.967,5.384,8.534,10.453,8.533c0.469,0.031,0.939,0.031,1.408,0l320-42.667c4.807-0.642,8.576-4.446,9.173-9.259l21.333-170.667C490.989,83.681,490.047,80.592,488,78.276z" />
                <g>
                  <path style={{ fill: "#FAFAFA" }} d="M181.333,266.671c-5.214-0.002-9.662-3.774-10.517-8.917l-21.333-128c-0.791-5.838,3.3-11.211,9.138-12.002c5.59-0.758,10.804,2.969,11.897,8.504l21.333,128c0.963,5.808-2.961,11.298-8.768,12.267C182.505,266.622,181.92,266.672,181.333,266.671z" />
                  <path style={{ fill: "#FAFAFA" }} d="M234.667,256.004c-5.536,0.022-10.169-4.193-10.667-9.707l-10.667-117.333c-0.552-5.865,3.755-11.067,9.621-11.619c0.029-0.003,0.057-0.005,0.086-0.008c5.867-0.531,11.053,3.796,11.584,9.663c0,0,0,0.001,0,0.001l10.667,117.333c0.53,5.867-3.796,11.053-9.663,11.584c0,0-0.001,0-0.001,0L234.667,256.004z" />
                  <path style={{ fill: "#FAFAFA" }} d="M288,245.337c-5.891,0-10.667-4.776-10.667-10.667V128.004c0-5.891,4.776-10.667,10.667-10.667c5.891,0,10.667,4.776,10.667,10.667v106.667C298.667,240.562,293.891,245.337,288,245.337z" />
                  <path style={{ fill: "#FAFAFA" }} d="M341.333,234.671h-1.195c-5.858-0.62-10.104-5.872-9.484-11.731c0.004-0.036,0.008-0.073,0.012-0.109l10.667-96c0.692-5.867,5.963-10.093,11.84-9.493c5.855,0.648,10.077,5.919,9.43,11.775c0,0,0,0.001,0,0.001l-10.667,96C351.368,230.543,346.793,234.667,341.333,234.671z" />
                  <path style={{ fill: "#FAFAFA" }} d="M394.667,224.004c-5.891-0.002-10.665-4.779-10.664-10.67c0-0.869,0.107-1.735,0.317-2.578l21.333-85.333c1.293-5.747,7.001-9.358,12.748-8.065c5.747,1.293,9.358,7.001,8.065,12.748c-0.036,0.161-0.076,0.321-0.12,0.48l-21.333,85.333C403.829,220.669,399.562,224.003,394.667,224.004z" />
                </g>
                <path style={{ fill: "#455A64" }} d="M437.333,352.004H191.125c-35.558-0.082-66.155-25.16-73.216-60.011L65.92,32.004H10.667C4.776,32.004,0,27.228,0,21.337s4.776-10.667,10.667-10.667h64c5.07-0.001,9.439,3.566,10.453,8.533l53.717,268.587c5.035,24.896,26.888,42.817,52.288,42.88h246.208c5.891,0,10.667,4.776,10.667,10.667C448,347.228,443.224,352.004,437.333,352.004z" />
              </svg>
              All Items</h1>
            <p id="firsttagp">{totalItems} records</p>
            <div id="searchbox">
              <input
                id="commonmcsearchbar" // Add an ID to the search input field
                type="text"
                placeholder="Enter Item name, SKU, or Description."
                value={searchTerm}
                onChange={handleSearch}
              />

              <IoSearchOutline onClick={searchItems} data-tooltip-content="Search" data-tooltip-id="my-tooltip" />
            </div>
          </div>

          <div id="buttonsdata">
            <div className="filtersortconta">
              <div className="maincontainmiainx1">
                <div className="filtersorticos5w" id="sortByButton" onClick={handleSortByDropdownToggle}>

                  {/* <img src="/Icons/sort-size-down.svg" alt="" /> */}
                  <img src={sortbyIco} alt="" data-tooltip-content="Sort By" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" />
                  {/* <p>Sort by</p> */}
                </div>
                {isSortByDropdownOpen && (
                  <div className="" ref={sortDropdownRef}>

                    <div className="filter-container">
                    
                      <h1>Sort By<img src={sortbyIco} alt="" /></h1>
                      <div className="filtezxe41cwws5w">
                      <label className={normal ? "active-filter" : "labelfistc51s"}>
                        <input type="checkbox" checked={normal} 
                          // onChange={(e) => setselectAllItems(e.target.checked)}
                          onChange={(e) => handleAllItemsChange1(e.target.checked)} hidden/>Normal
                      </label>

                      <label className={`${names ? "active-filter" : "labelfistc51s"} ${normal || price || purchasePrice ? "disabledfield" : ""}`}>
                        <input type="checkbox" checked={names} onChange={(e) => setNames(e.target.checked)} hidden /> Name 
                      </label>
                      </div>

                      <div className="cusfilters12x2">
                        <p className="custtypestext4s"><IoPricetagsOutline />Price</p>
                        <div className={`cusbutonscjks54 ${normal || names || purchasePrice ? "disabledfield" : ""}`}>

                          <label>
                            <input
                              type="checkbox"
                              checked={price === "Ascending"}
                              onChange={(e) => setPrice(e.target.checked ? "Ascending" : "")}
                            />
                            <button className={`filter-button ${price === "Ascending" ? "selected" : ""}`} onClick={() => setPrice("Ascending")}>Ascending</button>
                          </label>

                          <label>
                            <input
                              type="checkbox"
                              checked={price === "Descending"}
                              onChange={(e) => setPrice(e.target.checked ? "Descending" : "")}
                            />
                            <button className={`filter-button ${price === "Descending" ? "selected" : ""}`} onClick={() => setPrice("Descending")}>Descending</button>
                          </label>
                        </div>
                      </div>

                      <div className={`cusfilters12x2`}>
                        <p className="custtypestext4s"><IoPricetagsOutline />Purchase Price</p>
                        <div className={`cusbutonscjks54 ${normal || price || names ? "disabledfield" : ""}`}>

                          <label>
                            <input
                              type="checkbox"
                              checked={purchasePrice === "Ascending"}
                              onChange={(e) => setPurchasePrice(e.target.checked ? "Ascending" : "")}
                              disabled={normal}
                            />
                            <button className={`filter-button ${purchasePrice === "Ascending" ? "selected" : ""}`} onClick={() => setPurchasePrice("Ascending")}>Ascending</button>
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              checked={purchasePrice === "Descending"}
                              onChange={(e) => setPurchasePrice(e.target.checked ? "Descending" : "")}
                              disabled={normal}

                            />
                            <button className={`filter-button ${purchasePrice === "Descending" ? "selected" : ""}`} onClick={() => setPurchasePrice("Descending")}
                            >Descending</button>
                          </label>
                        </div>
                      </div>

                      <button className="buttonofapplyfilter" onClick={handleApplySortBy}>Apply Sort
                        {/* <IoIosArrowRoundForward /> */}
                        </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={`maincontainmiainx1`}>

                <div className="labelfistc51s filtersorticos5w" id="filterButton" onClick={handleFilterDropdownToggle}>
                  {/* <img src="/Icons/filters.svg" alt="" /> */}
                  <img src={FilterIco} alt="" data-tooltip-content="Filter" data-tooltip-id="my-tooltip" data-tooltip-place="bottom" />
                  {/* <p>Filter</p> */}
                </div>
                {isFilterDropdownOpen && (
                  <div className="" ref={filterDropdownRef}>

                    <div className="filter-container">
                    <h1>Filters<img src={FilterIco} alt=""/></h1>
                      <div className="filtezxe41cwws5w">

                      <label className={selectAllItems ? "active-filter" : "labelfistc51s"}>
                        <input
                          type="checkbox"
                          checked={selectAllItems}
                          // onChange={(e) => setselectAllItems(e.target.checked)}
                          onChange={(e) => handleAllItemsChange(e.target.checked)}
                          
                          hidden
                          />
                        All Items
                      </label>
                          </div>

                      <div className="cusfilters12x2">
                        <p className="custtypestext4s">Item Type</p>
                        <div className={`cusbutonscjks54 ${selectAllItems ? "disabledfield" : ""}`}>

                          <label htmlFor="serviceCheckbox">
                            <input
                              id="serviceCheckbox"
                              type="checkbox"
                              checked={itemType === "Service"}
                              onChange={(e) => setItemType(e.target.checked ? "Service" : "")}
                            />
                            <button className={`filter-button ${itemType === "Service" ? "selected" : ""}`} onClick={() => setItemType("Service")}>Services</button>
                          </label>
                          <label htmlFor="serviceCheckbox2">
                            <input
                              id="serviceCheckbox2"
                              type="checkbox"
                              checked={itemType === "Product"}
                              onChange={(e) => setItemType(e.target.checked ? "Product" : "")}
                            />
                            <button className={`filter-button ${itemType === "Product" ? "selected" : ""}`} onClick={() => setItemType("Product")}>Goods</button>
                          </label>
                        </div>
                      </div>
                      <div className={`cusfilters12x2`}>
                        <p className="custtypestext4s">Status</p>
                        <div className={`cusbutonscjks54 ${selectAllItems ? "disabledfield" : ""}`}>

                          <label htmlFor="serviceCheckbox3">
                            <input
                              id="serviceCheckbox3"
                              type="checkbox"
                              checked={status === "active"}
                              onChange={(e) => setStatus(e.target.checked ? "active" : "")}
                              disabled={selectAllItems}
                            />
                            <button className={`filter-button ${status === "active" ? "selected" : ""}`} onClick={() => setStatus("active")}>Active</button>
                          </label>
                          <label htmlFor="serviceCheckbox4">
                            <input
                              id="serviceCheckbox4"
                              type="checkbox"
                              checked={status === "inactive"}
                              onChange={(e) => setStatus(e.target.checked ? "inactive" : "")}
                              disabled={selectAllItems}

                            />
                            <button className={`filter-button ${status === "inactive" ? "selected" : ""}`} onClick={() => setStatus("inactive")}
                            >Inactive</button>
                          </label>
                        </div>
                      </div>

                      <button className="buttonofapplyfilter" onClick={handleApplyFilter}>Apply Filter
                        {/* <IoIosArrowRoundForward /> */}
                        </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

            <Link className="linkx1" to={"/dashboard/create-items"}>
              New Item <GoPlus />
            </Link>
            {/* More dropdown */}
            <div className="maincontainmiainx1">
              <div className="mainx2" onClick={handleMoreDropdownToggle} data-tooltip-content="Import-Export" data-tooltip-id="my-tooltip" >
                <img src={newmenuicoslz} alt="" />
              </div>
              {isMoreDropdownOpen && (
                <div className="dropdowncontentofx35" ref={moreDropdownRef}>
                  <div onClick={handleImportButtonClick} className="dmncstomx1 xs2xs23" >
                    {otherIcons?.import_svg}
                    <div>Import</div>
                  </div>

                  <div className="dmncstomx1 xs2xs23" onClick={handleFileExport}>
                    {otherIcons?.export_svg}
                    Export
                  </div>
                </div>
              )}
            </div>
            <ResizeFL data-tooltip-content="Expend" data-tooltip-id="my-tooltip" />
          </div>
        </div>
        {/* <div className="bordersinglestroke"></div> */}
        <div id="mainsectioncsls" className="">
          <div id="leftsidecontentxls">
            <div id="item-listsforcontainer">
              <div id="newtableofagtheme" className="listsectionsgrheigh">
                <div className="table-headerx12">
                  <div className="table-cellx12 checkboxfx1 x2s5554" id="styl_for_check_box">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                    <div className="checkmark"></div>
                  </div>
                  {itemsTableIcon?.map((val, index) => (
                    <div key={index} className={`table-cellx12 ${val?.className}`}>
                      {/* {val?.svg} */}
                      <img src={val?.svg} alt="" />
                      {val?.name}
                    </div>
                  ))}
                </div>

                {itemListLoading || dataChanging ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {itemList?.length >= 1 ? (
                      itemList?.map((quotation, index) => (
                        <div
                          className={`table-rowx12 ${selectedRows.includes(quotation?.id) ? "selectedresult" : ""} ${quotation.active == 0 ? "inactive-row" : ""}`}
                          key={index}
                        >

                          <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                            <input
                              checked={selectedRows.includes(quotation?.id)}
                              type="checkbox"
                              onChange={() => handleCheckboxChange(quotation?.id)}
                            />
                            <div className="checkmark"></div>
                          </div>
                          <div data-tooltip-id="my-tooltip" data-tooltip-content={quotation?.name} onClick={() => handleRowClicked(quotation)} className="table-cellx12 namefield">
                            {quotation?.name || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 otherfields">

                            {quotation?.category?.name || ""} / {quotation?.sub_category?.name || ""}
                          </div>
                          <div data-tooltip-id="my-tooltip" data-tooltip-content={quotation?.sku} onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                            {quotation?.sku || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                            {quotation?.type || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x275field">
                            <span style={{ color: quotation?.stock < 0 ? 'red' : 'inherit' }}>
                              {quotation?.stock || 0.00}
                            </span>

                          </div>

                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x275field">
                            {quotation?.tax_rate ? `${parseInt(quotation.tax_rate, 10)} %` : ""}
                          </div>

                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x275field">
                            {quotation?.price ? `${quotation?.price}` : ""}
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoDataFound />
                    )}
                  </>
                )}
              </div>
                <PaginationComponent
                  itemList={totalItems}
                  setDataChangingProp={handleDataChange}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
            </div>
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
            <h2>Import Items</h2>

            <form onSubmit={handleFileImport}>
              <div className="midpopusec12x">
                <div className="cardofselcetimage5xs">
                  {otherIcons?.drop_file_svg}
                  <h1>Drop your file here, or <label onClick={openFileDialog}>browse</label> </h1>
                  <input className="custominputofc156s" id="browse" type="file" accept=".xlsx" ref={fileInputRef} onChange={handleFileInputChange} required />
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
    </>
  );
};

export default Quotations;