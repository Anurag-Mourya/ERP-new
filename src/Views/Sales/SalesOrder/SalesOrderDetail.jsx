import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { saleOrderDelete, saleOrderDetails, saleOrderStatus } from '../../../Redux/Actions/saleOrderActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader02 from '../../../Components/Loaders/Loader02';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { Toaster } from 'react-hot-toast';
import { formatDate } from '../../Helper/DateFormat';

const SalesOrderDetail = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const [showDropdownx2, setShowDropdownx2] = useState(false);
  const saleStatus = useSelector(state => state?.saleStatus);
  const saleDelete = useSelector(state => state?.saleDelete);
  const saleDetail = useSelector(state => state?.saleDetail);
  const sale = saleDetail?.data?.data?.salesOrder;
  // console.log("sale", sale)

  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
      setShowDropdownx1(false);
      setShowDropdownx2(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const UrlId = new URLSearchParams(location.search).get("id");

  const handleEditThing = (val) => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", UrlId);

    if (val === "edit") {
      queryParams.set("edit", true);
      Navigate(`/dashboard/create-sales-orders?${queryParams.toString()}`);
    } else if (val === "convert") {
      queryParams.set("convert", "saleToInvoice");
      Navigate(`/dashboard/create-invoice?${queryParams.toString()}`);
    }

  };

  const [callApi, setCallApi] = useState(false);
  const changeStatus = (statusVal) => {
    // console.log("statusVal", statusVal);
    try {
      const sendData = {
        id: UrlId
      }
      switch (statusVal) {
        case 'accepted':
          sendData.status = 1
          break;
        case 'decline':
          sendData.status = 2
          break;
        default:
      }

      if (statusVal === "delete") {
        dispatch(saleOrderDelete(sendData, Navigate)).then(() => {
          setCallApi((preState) => !preState);
        });
      } else {
        dispatch(saleOrderStatus(sendData)).then(() => {
          setCallApi((preState) => !preState);
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  useEffect(() => {
    if (UrlId) {
      const queryParams = {
        id: UrlId,
      };
      dispatch(saleOrderDetails(queryParams));
    }
  }, [dispatch, UrlId, callApi]);

  const totalFinalAmount = sale?.items?.reduce((acc, item) => acc + parseFloat(item?.final_amount), 0);







  return (
    <>
      {saleStatus?.loading && <MainScreenFreezeLoader />}
      {saleDelete?.loading && <MainScreenFreezeLoader />}
      {saleDetail.loading ? <Loader02 /> :
        <>

          <div id="Anotherbox" className='formsectionx1'>
            <div id="leftareax12">
              <h1 id="firstheading">{sale?.sale_order_id}</h1>
            </div>
            <div id="buttonsdata">

              <div className="mainx1" onClick={() => handleEditThing("edit")}>
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

              <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
                {showDropdown && (
                  <div className="dropdownmenucustom">
                    {sale?.status === "1" ? (
                      <div className='dmncstomx1' onClick={() => changeStatus("decline")}>
                        {otherIcons?.cross_declined_svg}
                        Mark as declined
                      </div>
                    ) : sale?.status === "2" ? (
                      <div className='dmncstomx1' onClick={() => changeStatus("accepted")}>
                        {otherIcons?.check_accepted_svg}
                        Mark as accepted
                      </div>
                    ) : (
                      <>
                        <div className='dmncstomx1' onClick={() => changeStatus("decline")}>
                          {otherIcons?.cross_declined_svg}
                          Mark as declined
                        </div>
                        <div className='dmncstomx1' onClick={() => changeStatus("accepted")}>
                          {otherIcons?.check_accepted_svg}
                          Mark as accepted
                        </div>
                      </>
                    )}

                    <div className='dmncstomx1' style={{ cursor: "pointer" }} onClick={() => changeStatus("delete")}>
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
                  <h2>Fulfill the Sales Order</h2>
                  <p>You have the flexibility to generate packages, shipments, or invoices (in any order you prefer) to fulfill this sales order.</p>
                  <button onClick={() => handleEditThing("convert")}>
                    Convert to invoice
                    {/* {otherIcons?.arrow_svg} */}

                    {/* {showDropdownx2 && (
                      <div className="dropdownmenucustom5sc51s">
                        <div className='dmncstomx1 btextcolor' >
                          {otherIcons?.print_svg}
                          Convert to Sale order</div>
                        <div className='dmncstomx1 btextcolor' >
                          {otherIcons?.pdf_svg}
                          Convert to invoice</div>

                      </div>
                    )} */}
                  </button>
                </div>
              </div>
            </div>

            <div className="commonquoatjkx55s">
              <div className="childommonquoatjkx55s">
                {/* <div className="labeltopleftx456">Open</div> */}
                <div className={`${sale?.status == "sent" ? 'publishedtx456' : 'labeltopleftx456'}`}>  {
                  sale?.status == 1 ? "Approved" :
                    sale?.status == 2 ? "Declined" : ""
                  // sale?.status == "sent" ? "Sent" :
                  //   sale?.status == "draft" ? "Draft" : ""
                }</div>
                <div className="detailsbox4x15s1">
                  <div className="xhjksl45s">
                    <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                    <p>Accounts</p>
                  </div>
                  <div className="xhjksl45s2">
                    <h1>Sales Order</h1>
                    <span><p>Sales order:</p> <h3>{sale?.sale_order_id}</h3></span>
                    <span><p>Bill date:</p> <h3>{formatDate(sale?.transaction_date)}</h3></span>
                  </div>
                </div>

                <div className="detailsbox4x15s2">
                  <div className="cjkls5xs1">
                    <h1>Sales Order to:</h1>
                    <h3>{sale?.customer_name}</h3>
                    <p>
                      {(() => {
                        try {
                          const address = JSON.parse(sale?.address || '{}');
                          const shipping = address?.shipping;
                          if (!shipping) return "Address not available";

                          const { street_1, street_2, city_id, state_id, country_id } = shipping;
                          return `${street_1 || ""} ${street_2 || ""}, City ID: ${city_id || ""}, State ID: ${state_id || ""}, Country ID: ${country_id || ""}`;
                        } catch (error) {
                          console.error("Failed to parse address JSON:", error);
                          return "Address not available";
                        }
                      })()}
                    </p>
                  </div>
                  <div className="cjkls5xs2">
                    <h1>Sales Order From:</h1>
                    <h3>********</h3>
                    <p>********</p>
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
                  {sale?.items?.map((val, index) => (
                    <div className="rowsxs15aksx433">
                      <p className='sfdjklsd1xs2w1'>{index + 1}</p>
                      <p className='sfdjklsd1xs2w2'>{val?.item_id || "*********"}</p>
                      <p className='sfdjklsd1xs2w3'>{val?.quantity || "*********"}</p>
                      <p className='sfdjklsd1xs2w4'>{val?.item?.tax_rate || "*********"}</p>
                      <p className='sfdjklsd1xs2w5'>{val?.final_amount || "*********"}</p>
                    </div>
                  ))}

                </div>
                <div className="finalcalculateiosxl44s">
                  <span><p>Subtotal</p> <h5>{totalFinalAmount || "00"}</h5></span>
                  <span><p>Total</p> <h5>{totalFinalAmount || "00"}</h5></span>
                </div>
              </div>
            </div>
            <div className="lastseck4x5s565">
              <p>More information</p>
              <p>Sale person:    {sale?.sale_person || "*********"} </p>
            </div>
          </div>
        </>}
      <Toaster />
    </>
  )
}

export default SalesOrderDetail;