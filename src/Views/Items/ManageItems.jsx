import React, { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
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
  const [selectedFilter, setSelectedFilter] = useState('All Items');
  const [selectedSortBy, setSelectedSortBy] = useState('Normal');
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

  const handleSortBySelection = (sortBy) => {
    setSelectedSortBy(sortBy);
    setIsSortByDropdownOpen(false);

    // Add a class to the sort by dropdown button when a sort by option is selected
    const sortByButton = document.getElementById("sortByButton");
    if (sortByButton) {
      if (sortBy !== 'Normal') {
        sortByButton.classList.add('filter-applied');
      } else {
        sortByButton.classList.remove('filter-applied');
      }
    }
  };



  // custom sortby
  const [filterItems, setFilterItems] = useState([]);
  console.log("itemList", itemList);
  const filterdData = () => {
    let filteredItems = [...itemList];
    console.log("filtereddddddddddd", filterItems)
    if (selectedSortBy === "Normal") {
    } else if (selectedSortBy === "Name") {
      filteredItems.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else if (selectedSortBy === "Price") {
      filteredItems.sort((a, b) => b.price - a.price);
    } else if (selectedSortBy === "Purchase Price") {
      filteredItems.sort((a, b) => b.purchase_price - a.purchase_price);
    }
    setFilterItems(filteredItems);
  };
  useEffect(() => {
    filterdData();
  }, [selectedSortBy, itemList]);
  // custom sortby

  const handleRowClicked = (quotation) => {
    Navigate(`/dashboard/item-details?id=${quotation.id}`);
  };

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

  const handleDataChange = (newValue) => {
    setDataChanging(newValue);
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  //for import and export .xlsx file drag and dorp/////////////////////////////////

  //export data
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
  //export data

  const fileInputRef = useRef(null);

  const [showImportPopup, setShowImportPopup] = useState(false); // State variable for popup visibility

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
  // for drag and drop files

  //for import and export .xlsx file drag and dorp/////////////////////////////////




  // serch and filter
  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false); // Close the dropdown after selection
  };

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
    switch (selectedFilter) {
      case "Active":
        sendData.active = "1";
        break;
      case "Inactive":
        sendData.active = "0";
        break;
      case "Services":
        sendData.type = "Service";
        break;
      case "Products":
        sendData.type = "Product";
        break;
      default:
        break;
    }


    dispatch(itemLists(sendData));
    setDataChanging(false);
  }, [currentPage, itemsPerPage, dispatch, searchCall, selectedFilter, callApi]);
  //fetch all data

  return (
    <>
      {importItemss?.loading && <MainScreenFreezeLoader />}
      {exportItemss?.loading && <MainScreenFreezeLoader />}
      <TopLoadbar />
      <div id="middlesection" className="">
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">

            <h1 id="firstheading">
              <svg id="fi_6054026" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1"><linearGradient id="GradientFill_1" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="509.337" y2="2.663"><stop offset="0" stop-color="#6c54a3"></stop><stop offset="1" stop-color="#00b1d2"></stop></linearGradient><path d="m250.278 132.251a11.275 11.275 0 0 0 11.281 11.282h49.948v49.95a11.282 11.282 0 0 0 22.563 0v-49.95h49.95a11.282 11.282 0 0 0 0-22.564h-49.95v-49.947a11.282 11.282 0 1 0 -22.563 0v49.947h-49.948a11.282 11.282 0 0 0 -11.281 11.282zm72.513-117.271a117.272 117.272 0 1 1 -117.276 117.271 117.4 117.4 0 0 1 117.276-117.271zm-139.84 117.52.028 1.843c1.123 76.264 63.53 137.743 139.812 137.743a140.093 140.093 0 0 0 137.082-112.152l.728-3.613a145.1 145.1 0 0 0 2.054-22.466l30.172 2.78a21 21 0 0 1 19.173 21.031v112.734a73.321 73.321 0 0 1 -73.23 73.229h-257.47a27.713 27.713 0 0 0 0 55.425h272.41c1.05 0 2.094-.01 3.142-.01a55.2 55.2 0 1 1 -48.344 28.656l3.35-6.082h-164.99l3.351 6.082a55.148 55.148 0 1 1 -92.425-6.6l2.807-3.726-4.055-2.308a50.23 50.23 0 0 1 -3.357-85.387l4.21-2.851-3.676-3.512a73 73 0 0 1 -22.7-52.919v-221.544l-121.905-23.839a11.28 11.28 0 1 1 4.331-22.14l123.082 24.072a21.16 21.16 0 0 1 17.061 20.722v57.616l31.386 2.911a142.652 142.652 0 0 0 -2.027 24.305z" fill="url(#GradientFill_1)" fill-rule="evenodd"></path></svg>
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

              <IoSearchOutline onClick={searchItems} />
            </div>
          </div>

          <div id="buttonsdata">
            <div className="maincontainmiainx1">
              <div className="mainx1" id="sortByButton" onClick={handleSortByDropdownToggle}>

                <img src="/Icons/sort-size-down.svg" alt="" />
                <p>Sort by</p>
              </div>
              {isSortByDropdownOpen && (
                <div className="dropdowncontentofx35" ref={sortDropdownRef}>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Normal' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Normal')}>Normal</div>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Name' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Name')}>Name</div>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Price' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Price')}>Price</div>
                  <div className={`dmncstomx1 ${selectedSortBy === 'Purchase Price' ? 'activedmc' : ''}`} onClick={() => handleSortBySelection('Purchase Price')}>Purchase Price</div>
                </div>
              )}
            </div>

            <div className={`maincontainmiainx1 ${selectedFilter !== 'All Items' ? 'filter-applied' : ''}`}>

              <div className="mainx1" onClick={handleFilterDropdownToggle}>
                <img src="/Icons/filters.svg" alt="" />
                <p>Filter</p>
              </div>
              {isFilterDropdownOpen && (
                <div className="dropdowncontentofx35" ref={filterDropdownRef}>
                  <div className={`dmncstomx1 ${selectedFilter === 'All Items' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('All Items')}>All Items</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Active' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Active')}>Active</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Inactive' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Inactive')}>Inactive</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Services' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Services')}>Services</div>
                  <div className={`dmncstomx1 ${selectedFilter === 'Products' ? 'activedmc' : ''}`} onClick={() => handleFilterSelection('Products')}>Products</div>
                </div>
              )}
            </div>
            <Link className="linkx1" to={"/dashboard/create-items"}>
              New Item <GoPlus />
            </Link>
            {/* More dropdown */}
            <div className="maincontainmiainx1">
              <div className="mainx2" onClick={handleMoreDropdownToggle}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
              </div>
              {isMoreDropdownOpen && (
                <div className="dropdowncontentofx35" ref={moreDropdownRef}>
                  <div onClick={handleImportButtonClick} className="dmncstomx1 xs2xs23" >
                    {otherIcons?.import_svg}
                    <div>Import</div>
                  </div>

                  <div className="dmncstomx1 xs2xs23" onClick={handleFileExport}>
                    {otherIcons?.export_svg}
                    Export</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="bordersinglestroke"></div> */}
        <div id="mainsectioncsls" className="listsectionsgrheigh">
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
                  {itemsTableIcon?.map((val, index) => (
                    <div key={index} className={`table-cellx12 ${val?.className}`}>
                      {val?.svg}
                      {val?.name}
                    </div>
                  ))}
                </div>

                {itemListLoading || dataChanging ? (
                  <TableViewSkeleton />
                ) : (
                  <>
                    {filterItems.length >= 1 ? (
                      filterItems.map((quotation, index) => (
                        <div
                          className={`table-rowx12 ${selectedRows.includes(quotation?.id) ? "selectedresult" : ""}`}
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
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 namefield">
                            {quotation?.name || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                            {quotation?.sku || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                            {quotation?.type || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x275field">
                            {quotation?.opening_stock || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 otherfields">
                            {quotation?.description || ""}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 pricex2s">
                            {quotation?.price ? `${quotation?.price}` : ""}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notdatafound">
                        <iframe src="https://lottie.host/embed/e8ebd6c5-c682-46b7-a258-5fcbef32b33e/PjfoHtpCIG.json" frameborder="0"></iframe>
                      </div>
                    )}
                    <PaginationComponent
                      itemList={totalItems}
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
    </>
  );
};

export default Quotations;