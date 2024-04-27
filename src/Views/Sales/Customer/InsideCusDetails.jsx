import React, { useState, useEffect, useRef } from "react";
import TransactionCus from "../../Items/Insidealldetailscus/TransactionCus";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const InsideCusDetails = ({ itemDetails }) => {
  const displayValue = (value) => value ? value : 'NA';
  const [activeSection, setActiveSection] = useState('basicdetails');


  const [isOpen, setIsOpen] = useState([true, true, false, false]);

  // Function to toggle the open/close status of an accordion item
  const toggleAccordion = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div id='itemsdetailsrowskl'>
      <div className="buttonscontainxs2">
        <div
          className={`divac12cs32 ${activeSection === 'basicdetails' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('basicdetails')}
        >
          Basic details
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'transaction' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('transaction')}
        >
          Transaction
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'notes' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('notes')}
        >
          Notes
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'mails' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('mails')}
        >
          Mails
        </div>
        <div
          className={`divac12cs32 ${activeSection === 'statement' ? 'activediv12cs' : ''}`}
          onClick={() => setActiveSection('statement')}
        >
          Statement
        </div>
      </div>

      <div className="insidcontain">
      <div className="px5space"></div>
      <div className="px5space"></div>
        {activeSection === 'basicdetails' && (
          <>


            <div className="inidbcusx2">
              
            <div className="accordion-item">
              <div className={`accordion-header ${isOpen[0] ? 'open' : ''}`} onClick={() => toggleAccordion(0)}>
                <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#000000"} fill={"none"}>
    <path d="M15.1528 4.28405C13.9789 3.84839 13.4577 2.10473 12.1198 2.00447C12.0403 1.99851 11.9603 1.99851 11.8808 2.00447C10.5429 2.10474 10.0217 3.84829 8.8478 4.28405C7.60482 4.74524 5.90521 3.79988 4.85272 4.85239C3.83967 5.86542 4.73613 7.62993 4.28438 8.84747C3.82256 10.0915 1.89134 10.6061 2.0048 12.1195C2.10506 13.4574 3.84872 13.9786 4.28438 15.1525C4.73615 16.37 3.83962 18.1346 4.85272 19.1476C5.90506 20.2001 7.60478 19.2551 8.8478 19.7159C10.0214 20.1522 10.5431 21.8954 11.8808 21.9955C11.9603 22.0015 12.0403 22.0015 12.1198 21.9955C13.4575 21.8954 13.9793 20.1521 15.1528 19.7159C16.3704 19.2645 18.1351 20.1607 19.1479 19.1476C20.2352 18.0605 19.1876 16.2981 19.762 15.042C20.2929 13.8855 22.1063 13.3439 21.9958 11.8805C21.8957 10.5428 20.1525 10.021 19.7162 8.84747C19.2554 7.60445 20.2004 5.90473 19.1479 4.85239C18.0955 3.79983 16.3958 4.74527 15.1528 4.28405Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.2422 16V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.9922 8H12.0012" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  Basic details</p>
                <span className="svgico4x5s6">{isOpen[0] ? <FiChevronUp /> : <FiChevronDown />}</span>
              </div>
              <div className={`accordion-content ${isOpen[0] ? 'open' : ''}`}>
                Content for Accordion Option 1
              </div>
            </div>



            <div className="accordion-item">
              <div className={`accordion-header ${isOpen[1] ? 'open' : ''}`} onClick={() => toggleAccordion(1)}>
                        <p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#000000"} fill={"none"}>
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
</svg>
                          Other details</p>
                <span className="svgico4x5s6">{isOpen[1] ? <FiChevronUp /> : <FiChevronDown />}</span>
              </div>
              <div className={`accordion-content ${isOpen[1] ? 'open' : ''}`}>
                Content for Accordion Option 1
              </div>
            </div>


            <div className="accordion-item">
              <div className={`accordion-header ${isOpen[2] ? 'open' : ''}`} onClick={() => toggleAccordion(2)}>
                      <p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#000000"} fill={"none"}>
    <path d="M4.5 10C4.5 6.22876 4.5 4.34315 5.67157 3.17157C6.84315 2 8.72876 2 12.5 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H12.5C8.72876 22 6.84315 22 5.67157 20.8284C4.5 19.6569 4.5 17.7712 4.5 14V10Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 6H2M4.5 12H2M4.5 18H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.2748 8.49261C15.2748 9.59715 14.3794 10.4926 13.2749 10.4926C12.1704 10.4926 11.275 9.59715 11.275 8.49261C11.275 7.38808 12.1704 6.49268 13.2749 6.49268C14.3794 6.49268 15.2748 7.38808 15.2748 8.49261Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.31982 15.7161C10.3782 14.0868 12.0589 13.4762 13.2749 13.4774C14.491 13.4787 16.1224 14.0868 17.1807 15.7161C17.2492 15.8215 17.268 15.9512 17.2063 16.0607C16.9588 16.4996 16.1903 17.3705 15.6352 17.4296C14.9975 17.4974 13.3291 17.5069 13.2762 17.5072C13.2232 17.5069 11.5034 17.4974 10.8653 17.4296C10.3103 17.3705 9.5418 16.4996 9.29429 16.0607C9.23254 15.9512 9.25139 15.8215 9.31982 15.7161Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                        Contact person</p>
                <span className="svgico4x5s6">{isOpen[2] ? <FiChevronUp /> : <FiChevronDown />}</span>
              </div>
              <div className={`accordion-content ${isOpen[2] ? 'open' : ''}`}>
                Content for Accordion Option 1
              </div>
            </div>



           <div className="accordion-item">
              <div className={`accordion-header ${isOpen[3] ? 'open' : ''}`} onClick={() => toggleAccordion(3)}>
                <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#000000"} fill={"none"}>
    <path d="M4.5 10C4.5 6.22876 4.5 4.34315 5.67157 3.17157C6.84315 2 8.72876 2 12.5 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H12.5C8.72876 22 6.84315 22 5.67157 20.8284C4.5 19.6569 4.5 17.7712 4.5 14V10Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.25 10.0002V12.5002C15.25 13.3286 15.9216 14.0002 16.75 14.0002C17.5784 14.0002 18.25 13.3286 18.25 12.5002V12C18.25 9.23858 16.0114 7 13.25 7C10.4886 7 8.25 9.23858 8.25 12C8.25 14.7614 10.4886 17 13.25 17C14.3758 17 15.4147 16.6279 16.2505 16M15.25 12.0002C15.25 13.1048 14.3546 14.0002 13.25 14.0002C12.1454 14.0002 11.25 13.1048 11.25 12.0002C11.25 10.8956 12.1454 10.0002 13.25 10.0002C14.3546 10.0002 15.25 10.8956 15.25 12.0002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.5 6L2 6M4.5 12L2 12M4.5 18H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                  Address</p>
                <span className="svgico4x5s6">{isOpen[3] ? <FiChevronUp /> : <FiChevronDown />}</span>
              </div>
              <div className={`accordion-content ${isOpen[3] ? 'open' : ''}`}>
                Content for Accordion Option 1
              </div>
            </div>


 

              
              {/* <div className="inidbx1s1">
                <div className="inidbs1x1a1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={35} height={35} color={"#5D369F"} fill={"none"}></svg>
                  Item information
                </div>
                <ul>
                  <li><span>Item type</span><h1>:</h1><p>{displayValue(itemDetails?.type)}</p></li>
                  <li><span>SKU</span><h1>:</h1><p>{displayValue(itemDetails?.sku)}</p></li>
                </ul>
              </div> */}
             
            </div>
          </>
        )}










































        {activeSection === 'transaction' && (
          <TransactionCus />

        )}


























        {activeSection === 'notes' && (
          <div className="inidbx3">
            <div className="headtablerowindx1">
              <div className="table-headerx12">
                <div className="table-cellx12 thisfidbxx1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                    <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>Date</div>
                <div className="table-cellx12 thisfidbxx2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                    <path d="M8.37574 3C8.16183 3.07993 7.95146 3.16712 7.74492 3.26126M20.7177 16.3011C20.8199 16.0799 20.9141 15.8542 21 15.6245M18.4988 19.3647C18.6705 19.2044 18.8365 19.0381 18.9963 18.866M15.2689 21.3723C15.463 21.2991 15.6541 21.22 15.8421 21.1351M12.156 21.9939C11.9251 22.0019 11.6926 22.0019 11.4616 21.9939M7.78731 21.1404C7.96811 21.2217 8.15183 21.2978 8.33825 21.3683M4.67255 18.9208C4.80924 19.0657 4.95029 19.2064 5.0955 19.3428M2.6327 15.6645C2.70758 15.8622 2.78867 16.0569 2.87572 16.2483M2.00497 12.5053C1.99848 12.2972 1.9985 12.0878 2.00497 11.8794M2.62545 8.73714C2.69901 8.54165 2.77864 8.34913 2.8641 8.1598M4.65602 5.47923C4.80068 5.32514 4.95025 5.17573 5.1045 5.03124" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M13.5 12H16M12 10.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Time</div>
                <div className="table-cellx12 thisfidbxx3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#5D369F"} fill={"none"}>
                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 7L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 7L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 17L8 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11 17L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  DETAILS</div>
              </div>
              <div className='table-rowx12'>
                <div className="table-cellx12 thisfidbxx1">12/03/2024</div>
                <div className="table-cellx12 thisfidbxx2">2.15 AM</div>
                <div className="table-cellx12 thisfidbxx3">created by- <b>Mr.Arman</b> </div>
              </div>
              <div className='table-rowx12'>
                <div className="table-cellx12 thisfidbxx1">12/03/2024</div>
                <div className="table-cellx12 thisfidbxx2">2.15 AM</div>
                <div className="table-cellx12 thisfidbxx3">created by- <b>Mr.Arman</b> </div>
              </div>
            </div>
          </div>
        )}
      </div>











    </div>

  );
};


export default InsideCusDetails
