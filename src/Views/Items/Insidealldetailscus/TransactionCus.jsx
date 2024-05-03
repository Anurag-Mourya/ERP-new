import React, { useEffect, useRef, useState } from 'react'

const TransactionCus = () => {



    const [isSortByDropdownOpen, setIsSortByDropdownOpen] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  
    // Refs for dropdowns
    const sortDropdownRef = useRef(null);
    const filterDropdownRef = useRef(null);
  
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortByDropdownOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  


      // Toggle dropdown visibility
  const handleSortByDropdownToggle = () => {
    setIsSortByDropdownOpen(!isSortByDropdownOpen);
  };

  const handleFilterDropdownToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  // Option selection handlers
  const handleSortBySelect = (option) => {
    console.log("Sort by selected:", option);
  };

  const handleFilterSelect = (option) => {
    console.log("Filter selected:", option);
  };

  return (
    <>
          <div className="inidbx2">
          <div id="middlesection">
             <div className="customlinksinsx12">
      {/* Sort by dropdown */}
      <div className="mainx1" onClick={handleSortByDropdownToggle}>
        <img src="/Icons/sort-size-down.svg" alt="" />
        <p>Sort by</p>
      </div>
      {isSortByDropdownOpen && (
        <div className="dropdowncontentofx35" ref={sortDropdownRef}>
                  
          <div className='dmncstomx1 activedmc'>All Items</div>
                  <div className='dmncstomx1'>Active</div>
                  <div className='dmncstomx1'>Inactive</div>
                  <div className='dmncstomx1'>Services</div>
                  <div className='dmncstomx1'>Goods</div>
        </div>
      )}

      {/* Filter dropdown */}
      <div className="mainx1" onClick={handleFilterDropdownToggle}>
        <img src="/Icons/filters.svg" alt="" />
        <p>Filter</p>
      </div>
      {isFilterDropdownOpen && (
        <div className="dropdowncontentofx35" ref={filterDropdownRef}>
          {/* Filter dropdown content here */}
                  <div className='dmncstomx1 activedmc'>All Items</div>
                  <div className='dmncstomx1'>Active</div>
                  <div className='dmncstomx1'>Goods</div>
        </div>
      )}
    </div>

<div className="secondrowx56s">
      <p className='datasecptac4s'>Quotations</p>
      <p className='datasecptac4s activetranscus' >Invoice</p>
      <p className='datasecptac4s'>Customer Payments</p>
      <p className='datasecptac4s'>Sale order</p>
      <p className='datasecptac4s'>Credit note</p>
</div>

<div className="transcuslx454s">
<h2>Invoices</h2><p>200 total</p>
</div>


            <div style={{padding:0}} id="mainsectioncsls">
            <div id="newtableofagtheme">


              
            <div className="table-headerx12">
                  {/* <div className="table-cellx12 checkboxfx1" id="styl_for_check_box">
                      <input
                        type="checkbox"
                      />
                      <div className="checkmark"></div>
                  </div> */}
                  <div className="table-cellx12 transactoin6xs31">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#5D369F"} fill={"none"}>
    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>Date</div>
                  <div className="table-cellx12 transactoin6xs32">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#5D369F"} fill={"none"}>
    <path d="M7 10.0003V3.94909C7 3.37458 7 3.08732 6.76959 3.01583C6.26306 2.85867 5.5 4 5.5 4M7 10.0003H5.5M7 10.0003H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17.5V15.75C9 14.925 9 14.5126 8.70711 14.2563C8.41421 14 7.94281 14 7 14C6.05719 14 5.58579 14 5.29289 14.2563C5 14.5126 5 14.925 5 15.75C5 16.575 5 16.9874 5.29289 17.2437C5.58579 17.5 6.05719 17.5 7 17.5H9ZM9 17.5V18.375C9 19.6124 9 20.2312 8.56066 20.6156C8.12132 21 7.41421 21 6 21H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 20V4M16.5 20C15.7998 20 14.4915 18.0057 14 17.5M16.5 20C17.2002 20 18.5085 18.0057 19 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
PAYMENT NUMBER</div>

                  <div className="table-cellx12 transactoin6xs33">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#5D369F"} fill={"none"}>
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
REFERENCE NUMBER</div>
                  <div className="table-cellx12 transactoin6xs34">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#5D369F"} fill={"none"}>
    <path d="M21.5 12.95V11.05C21.5 7.01949 21.5 5.00424 20.1088 3.75212C18.7175 2.5 16.4783 2.5 12 2.5C7.52166 2.5 5.28249 2.5 3.89124 3.75212C2.5 5.00424 2.5 7.01949 2.5 11.05V12.95C2.5 16.9805 2.5 18.9958 3.89124 20.2479C5.28249 21.5 7.52166 21.5 12 21.5C16.4783 21.5 18.7175 21.5 20.1088 20.2479C21.5 18.9958 21.5 16.9805 21.5 12.95Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 8H14M16 6L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 17.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 17.5L8.25 15.75M8.25 15.75L6.5 14M8.25 15.75L10 14M8.25 15.75L6.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
PAYMENT MODE</div>
                  <div className="table-cellx12 transactoin6xs35">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#5D369F"} fill={"none"}>
                      <path d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C11.6117 4.48692 11.2315 5.82158 10 8C8.79908 7.4449 8.5 7 8 5.75C6 8 4 11 4 14C4 18.4183 7.58172 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 17L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 13H10.009M13.991 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    AMOUNT RECEIVED</div>
                  <div className="table-cellx12 transactoin6xs36">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#5D369F"} fill={"none"}>
    <path d="M3 11C3 7.25027 3 5.3754 3.95491 4.06107C4.26331 3.6366 4.6366 3.26331 5.06107 2.95491C6.3754 2 8.25027 2 12 2C15.7497 2 17.6246 2 18.9389 2.95491C19.3634 3.26331 19.7367 3.6366 20.0451 4.06107C21 5.3754 21 7.25027 21 11V13C21 16.7497 21 18.6246 20.0451 19.9389C19.7367 20.3634 19.3634 20.7367 18.9389 21.0451C17.6246 22 15.7497 22 12 22C8.25027 22 6.3754 22 5.06107 21.0451C4.6366 20.7367 4.26331 20.3634 3.95491 19.9389C3 18.6246 3 16.7497 3 13V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 9.5L7 9.5M10 14.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
UNUSED AMOUNT</div>

                </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
             <div className='table-rowx12'>
                   
                      <div  className="table-cellx12 transactoin6xs31">12/03/2024</div>
                      <div  className="table-cellx12 transactoin6xs32">Ratione</div>

                      <div  className="table-cellx12 transactoin6xs33">John smith customer</div>
                      <div  className="table-cellx12 transactoin6xs34">25</div>
                      <div  className="table-cellx12 transactoin6xs35">$122/-</div>
                      <div  className="table-cellx12 transactoin6xs36">1000</div>
                    </div>
          </div>
          </div>
          </div>
          </div>
    </>
  )
}

export default TransactionCus
