// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader02 from "../../../Components/Loaders/Loader02";
// import InsideItemDetailsBox from '../../Items/InsideItemDetailsBox';
// import { RxCross2 } from 'react-icons/rx';
// import { quotationDetails } from '../../../Redux/Actions/quotationActions';

// const QuotationDetails = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const itemId = new URLSearchParams(location.search).get("id");

//   const [loading, setLoading] = useState(true);
//   const [switchValue, setSwitchValue] = useState('Active'); // State for the switch button value
//   const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
//   const { quotation } = useSelector(state => state?.quoteDetail?.data?.data || {});

//   console.log("qutDetail details", quotation);

//   const dropdownRef = useRef(null); // Ref to the dropdown element

//   useEffect(() => {
//     if (itemId) {
//       const queryParams = {
//         id: itemId,
//         fy: localStorage.getItem('FinancialYear'),
//         warehouse_id: localStorage.getItem('selectedWarehouseId'),
//       };
//       dispatch(quotationDetails(queryParams));
//     }
//   }, [dispatch, itemId]);

//   useEffect(() => {
//     setLoading(!quotation);//loading to true if quotation is falsy (e.g., null, undefined, false)
//   }, [quotation]);

//   const handleSwitchChange = (e) => {
//     setSwitchValue(e.target.value);
//   };

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setShowDropdown(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div id="Anotherbox">
//         <div id="leftareax12">
//           <h1 className='primarycolortext' id="firstheading">
//             {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
//             {quotation?.quotation_id}
//           </h1>
//           <p id="firsttagp">Item</p>
//           <p id="firsttagp">1 SKU</p>
//         </div>
//         <div id="buttonsdata">
//           <div className="switchbuttontext">
//             <div className="switches-container">
//               <input type="radio" id="switchMonthly" name="switchPlan" value="Active" checked={switchValue === "Active"} onChange={handleSwitchChange} />
//               <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="Inactive" checked={switchValue === "Inactive"} onChange={handleSwitchChange} />
//               <label htmlFor="switchMonthly">Active</label>
//               <label htmlFor="switchYearly">Inactive</label>
//               <div className="switch-wrapper">
//                 <div className="switch">
//                   <div>Active</div>
//                   <div id='inactiveid'>Inactive</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="separatorx21"></div>
//           <div className="mainx1">
//             <img src="/Icons/pen-clip.svg" alt="" />
//             <p>Edit</p>
//           </div>
//           <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
//             <img src="/Icons/menu-dots-vertical.svg" alt="" />
//             {showDropdown && (
//               <div className="dropdownmenucustom">
//                 <div className='dmncstomx1'>
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#888888"} fill={"none"}>
//                     <path d="M16 2H12C9.17157 2 7.75736 2 6.87868 2.94627C6 3.89254 6 5.41554 6 8.46154V9.53846C6 12.5845 6 14.1075 6.87868 15.0537C7.75736 16 9.17157 16 12 16H16C18.8284 16 20.2426 16 21.1213 15.0537C22 14.1075 22 12.5845 22 9.53846V8.46154C22 5.41554 22 3.89254 21.1213 2.94627C20.2426 2 18.8284 2 16 2Z" stroke="currentColor" strokeWidth="1.5" />
//                     <path d="M18 16.6082C17.9879 18.9537 17.8914 20.2239 17.123 21.0525C16.2442 22 14.8298 22 12.0011 22H8.00065C5.17192 22 3.75755 22 2.87878 21.0525C2 20.1049 2 18.5799 2 15.5298V14.4515C2 11.4014 2 9.87638 2.87878 8.92885C3.52015 8.2373 4.44682 8.05047 6.00043 8" stroke="currentColor" strokeWidth="1.5" />
//                   </svg>
//                   Duplicate</div>
//                 <div className="bordersinglestroke"></div>
//                 <div className='dmncstomx1'>
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ff0000"} fill={"none"}>
//                     <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path d="M9 11.7349H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path d="M10.5 15.6543H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                     <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                   Delete</div>
//               </div>
//             )}
//           </div>
//           <Link className="linkx4" to={"/dashboard/manage-items"}>
//             <RxCross2 />
//           </Link>
//         </div>
//       </div>
//       <div className="bordersinglestroke"></div>
//       {loading ? (
//         <Loader02 />
//       ) : (
//         <div id="item-details">
//           <InsideItemDetailsBox
//             itemDetails={quotation}
//           // stockDetails={stock_details}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default QuotationDetails;










import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';

const QuotationDetails = () => {
  const Navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
      setShowDropdownx1(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  
  const UrlId = new URLSearchParams(location.search).get("id");

  const handleEditThing = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);
    queryParams.set("edit", true);
    Navigate(`/dashboard/create-quotations?${queryParams.toString()}`);
  };










  return (
    <>
      <div id="Anotherbox" className='formsectionx1'>
        <div id="leftareax12">
          <h1 id="firstheading">QOT-00354</h1>
        </div>
        <div id="buttonsdata">

        <div className="mainx1" onClick={handleEditThing}>
            <img src="/Icons/pen-clip.svg" alt="" />
            <p>Edit</p>
          </div>

          <div onClick={() => setShowDropdownx1(!showDropdownx1)} className="mainx1" ref={dropdownRef}>
           <p>PDF/Print</p>
                  {otherIcons?.arrow_svg}
            {showDropdownx1 && (
              <div className="dropdownmenucustom">
                <div className='dmncstomx1 primarycolortext' >
                  {otherIcons?.pdf_svg}
                  PDF</div>
                <div className='dmncstomx1 primarycolortext' >
                  {otherIcons?.print_svg}
                  Print</div>
              
              </div>
            )}
          </div>
          
          <div className="sepc15s63x63"></div>
        <div className="mainx1">
        {otherIcons?.notes_svg}
            <p>Notes</p>
          </div>
        <div className="mainx1" >
        {otherIcons?.mail_svg}
          </div>
        <div className="mainx1" >
        {otherIcons?.share_svg}
          </div>
          <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
            <img src="/Icons/menu-dots-vertical.svg" alt="" />
            {showDropdown && (
              <div className="dropdownmenucustom">
                <div className='dmncstomx1' >
                  {otherIcons?.cross_declined_svg}
                  Mark as declined</div>
                <div className='dmncstomx1' >
                  {otherIcons?.check_accepted_svg}
                  Mark as accepted</div>
                <div className='dmncstomx1' >
                  {otherIcons?.dublicate_svg}
                  Duplicate</div>
                <div className='dmncstomx1' >
                  {otherIcons?.convert_svg}
                  Convert</div>
                <div className='dmncstomx1' style={{ cursor: "pointer" }}>
                  {otherIcons?.delete_svg}
                  Delete</div>
              </div>
            )}
          </div>







          <Link to={"/dashboard/quotation"} className="linkx3">
            <RxCross2 />
          </Link>
        </div>
      </div>
            <div className="listsectionsgrheigh">
            <div className="commonquoatjkx54s">
              <div className="firstsecquoatjoks45">
                <div className="detailsbox4x15sfirp">
                  <img src="https://cdn-icons-png.flaticon.com/512/9329/9329876.png" alt="" />
                </div>
                <div className="detailsbox4x15s">
                  <h2>Convert the Quotation</h2>
                  <p>Create an invoice or sales order for this estimate to confirm the sale and bill your customer.</p>
                  <button>Convert {otherIcons?.arrow_svg}</button>
                </div>
              </div>
            </div>

            <div className="commonquoatjkx55s">
            <div className="childommonquoatjkx55s">
              <div className="labeltopleftx456">Sent</div>
            <div className="detailsbox4x15s1">
                 <div className="xhjksl45s">
                 <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                  <p>Accounts</p>
                 </div>
                 <div className="xhjksl45s2">
                  <h1>Quotation</h1>
                  <span><p>Quotation no:</p> <h3>123456</h3></span>
                  <span><p>Bill date:</p> <h3>22/12/2023</h3></span>
                 </div>
                </div>

            <div className="detailsbox4x15s2">
              <div className="cjkls5xs1">
                <h1>Quotation to:</h1>
                <h3>Musemind Digital Agency</h3>
                <p>62, B-wing, Mangalwar peth, Satara, Maharashtra</p>
              </div>
              <div className="cjkls5xs2">
                <h1>Quotation From:</h1>
                <h3>Local Organization</h3>
                <p>103, B-wing, Sadarbazzar mart, Pune, Maharashtra</p>
              </div>
            </div>

            <div className="tablex15s56s3">
              <div className="thaedaksx433">
                <p className='sfdjklsd1xs2w1'>S.No</p>
                <p className='sfdjklsd1xs2w2'>Item & Description</p>
                <p className='sfdjklsd1xs2w3'>Qty</p>
                <p className='sfdjklsd1xs2w4'>Rate</p>
                <p className='sfdjklsd1xs2w5'>Amount</p>
              </div>
              <div className="rowsxs15aksx433">
                <p className='sfdjklsd1xs2w1'>1</p>
                <p className='sfdjklsd1xs2w2'>Iphone 11</p>
                <p className='sfdjklsd1xs2w3'>01.00</p>
                <p className='sfdjklsd1xs2w4'>22000.00</p>
                <p className='sfdjklsd1xs2w5'>22000.00</p>
              </div>
              <div className="rowsxs15aksx433">
                <p className='sfdjklsd1xs2w1'>2</p>
                <p className='sfdjklsd1xs2w2'>Iphone 11 Charger</p>
                <p className='sfdjklsd1xs2w3'>01.00</p>
                <p className='sfdjklsd1xs2w4'>22000.00</p>
                <p className='sfdjklsd1xs2w5'>22000.00</p>
              </div>
              <div className="rowsxs15aksx433">
                <p className='sfdjklsd1xs2w1'>3</p>
                <p className='sfdjklsd1xs2w2'>Apple air dops</p>
                <p className='sfdjklsd1xs2w3'>01.00</p>
                <p className='sfdjklsd1xs2w4'>22000.00</p>
                <p className='sfdjklsd1xs2w5'>22000.00</p>
              </div>
              <div className="rowsxs15aksx433">
                <p className='sfdjklsd1xs2w1'>4</p>
                <p className='sfdjklsd1xs2w2'>Iphone 5 Pro</p>
                <p className='sfdjklsd1xs2w3'>01.00</p>
                <p className='sfdjklsd1xs2w4'>22000.00</p>
                <p className='sfdjklsd1xs2w5'>22000.00</p>
              </div>
            </div>
            <div className="finalcalculateiosxl44s">
              <span><p>Subtotal</p> <h5>22000.00</h5></span>
              <span><p>Total</p> <h5>22000.00</h5></span>
            </div>
            </div>
            </div>
            <div className="lastseck4x5s565">
              <p>More information</p>
              <p>Sale person:   Akash </p>
            </div>
          </div>
    </>
  )
}

export default QuotationDetails
