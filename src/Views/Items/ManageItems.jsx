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
import { itemsIcon } from "../Helper/SVGIcons/Icons";
import { exportItems, importItems } from "../../Redux/Actions/itemsActions";


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
  // console.log("importItems", importItemss)
  // console.log("exportItemss", exportItemss)

  const [fiterItems, setFilterItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Items');
  const [selectedSortBy, setSelectedSortBy] = useState('Name');
  const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);
  const dropdownRef = useRef(null);




  useEffect(() => {
    const areAllRowsSelected = itemList && itemList.length > 0 ? itemList.every((row) => selectedRows.includes(row.id)) : false;

    setSelectAll(areAllRowsSelected);
    filterdData();
  }, [selectedFilter, selectedSortBy, searchTerm, itemList, selectedRows]);

  useEffect(() => {
    let sendData = {
      fy: +localStorage.getItem('FinancialYear'),
      noofrec: itemsPerPage,
      currentpage: currentPage,
    };
    dispatch(itemLists(sendData));
    setDataChanging(false);
  }, [currentPage, itemsPerPage, dispatch]);

  useEffect(() => {
    setFilterItems(itemList);
  }, [itemList]);
  const filterdData = () => {
    let filteredItems = [...itemList];

    switch (selectedFilter) {
      case "Active":
        filteredItems = filteredItems.filter((val) => val.active === "1");
        break;
      case "Inactive":
        filteredItems = filteredItems.filter((val) => val.active === "0");
        // console.log(filteredItems)
        break;
      case "Services":
        filteredItems = filteredItems.filter((val) => val.type === "Service");
        break;
      case "Products":
        filteredItems = filteredItems.filter((val) => val.type === "Product");
        break;
      case "All Items":
      default:
        break;
    }

    // Apply additional filtering based on search term if it exists
    if (searchTerm && searchTerm.length >= 3) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter((item) =>
      (item.name?.toLowerCase().includes(searchTermLowerCase) ||
        item.sku?.toLowerCase().includes(searchTermLowerCase) ||
        item.description?.toLowerCase().includes(searchTermLowerCase))
      );
    }

    if (selectedSortBy === "Name") {
      // Do nothing, as name sorting is already alphabetical by default
    } else if (selectedSortBy === "Price") {
      filteredItems.sort((a, b) => b.price - a.price); // Sort by descending price
    } else if (selectedSortBy === "Purchase Price") {
      filteredItems.sort((a, b) => b.purchase_price - a.purchase_price); // Sort by descending purchase price
    }


    setFilterItems(filteredItems);
  };


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

  const handleFilterSelection = (filter) => {
    setSelectedFilter(filter);
    setIsFilterDropdownOpen(false);

    // Add a class to the filter button when a filter is selected
    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
      if (filter !== 'All Items') {
        filterButton.classList.add('filter-applied');
      } else {
        filterButton.classList.remove('filter-applied');
      }
    }
  };




  const handleSortBySelection = (sortBy) => {
    setSelectedSortBy(sortBy);
    setIsSortByDropdownOpen(false);

    // Add a class to the sort by dropdown button when a sort by option is selected
    const sortByButton = document.getElementById("sortByButton");
    if (sortByButton) {
      if (sortBy && sortBy !== 'Name') { // Check if sortBy is not 'Name'
        sortByButton.classList.add('filter-applied');
      } else {
        sortByButton.classList.remove('filter-applied');
      }
    }
  };


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

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


  const searchItems = () => {
    setSearchCall(!searchCall);
  };

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




  //for pdf and print pdf 
  const [isOpen, setIsOpen] = useState(false);


  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {

      dispatch(importItems(formData))
        .then(() => {
          if (exportItemss?.data) {
            toast.success("items imported successfully");
            setClickTrigger((prevTrigger) => !prevTrigger);
          }
        })
    } catch (error) {
      toast.error('Upload failed:', error);
      // Handle error
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleDownloadPDF = async () => {
    try {
      dispatch(exportItems())
        .then(() => {
          if (exportItemss?.data) {
            toast.success("items exported successfully");
          }

        })
    } catch (error) {
      toast.error('Error exporting items:', error);
    }
  };








  return (
    <>
      <TopLoadbar />
      <div id="middlesection">
        <div id="Anotherbox" className='formsectionx1'>
          <div id="leftareax12">
            <h1 id="firstheading">All Items</h1>
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
                  <div onClick={handleButtonClick} className="dmncstomx1 xs2xs23" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                      <path d="M18.25 9C20.3077 9.0736 22.0549 10.6169 21.9987 12.6844C21.9856 13.1654 21.7993 13.7599 21.4266 14.9489C20.5298 17.8104 19.0226 20.2944 15.6462 20.8904C15.0255 21 14.3271 21 12.9303 21H11.0697C9.6729 21 8.9745 21 8.35384 20.8904C4.97739 20.2944 3.47018 17.8104 2.57336 14.9489C2.20072 13.7599 2.01439 13.1654 2.00132 12.6844C1.94512 10.6169 3.6923 9.0736 5.75001 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 14L12 3M12 14C11.2998 14 9.99153 12.0057 9.5 11.5M12 14C12.7002 14 14.0085 12.0057 14.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>Import</div>


                    <input type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept=".xlsx"
                      onChange={handleFileUpload} />
                  </div>

                  <div className="dmncstomx1 xs2xs23" onClick={handleDownloadPDF}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#525252"} fill={"none"}>
                      <path d="M6.9375 10C6.24657 10.0051 5.83081 10.0263 5.49965 10.114C3.99243 10.5131 2.96053 11.8639 3.00116 13.3847C3.01293 13.8252 3.18062 14.3696 3.516 15.4585C4.32314 18.079 5.67963 20.3539 8.71845 20.8997C9.27704 21 9.90561 21 11.1627 21L12.8373 21C14.0944 21 14.723 21 15.2816 20.8997C18.3204 20.3539 19.6769 18.079 20.484 15.4585C20.8194 14.3696 20.9871 13.8252 20.9988 13.3847C21.0395 11.8639 20.0076 10.5131 18.5004 10.114C18.1692 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M12 3L12 14M12 3C12.4684 3 12.8244 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4636 4.3143L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Export</div>
                  {/* {isOpen && (
                    <div ref={dropdownRef} className="dropdown-contentxs565s4">
                      <button onClick={handleDownloadPDF} type="button">
                        <BsFiletypePdf />
                        Download PDF
                      </button>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="bordersinglestroke"></div> */}
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
                  {itemsIcon?.map((val, index) => (
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
                    {fiterItems.length >= 1 ? (
                      fiterItems.map((quotation, index) => (
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
                            {quotation?.name || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x23field">
                            {quotation?.sku || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x24field">
                            {quotation?.type || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 x275field">
                            {quotation?.opening_stock || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 otherfields">
                            {quotation?.description || "N/A"}
                          </div>
                          <div onClick={() => handleRowClicked(quotation)} className="table-cellx12 pricex2s">
                            {quotation?.price ? `${quotation?.price}/-` : "N/A"}
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
      <Toaster />
    </>
  );
};

export default Quotations;