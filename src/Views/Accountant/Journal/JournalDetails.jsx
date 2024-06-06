
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { quotationDelete, quotationDetails, quotationStatus } from '../../../Redux/Actions/quotationActions';
import Loader02 from "../../../Components/Loaders/Loader02";
import { Toaster } from 'react-hot-toast';
import MainScreenFreezeLoader from '../../../Components/Loaders/MainScreenFreezeLoader';
import { JournalDetails } from '../../../Redux/Actions/JournalAndAccount';
import toast from 'react-hot-toast';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const JournalDetailsSing = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownx1, setShowDropdownx1] = useState(false);
  const dropdownRef = useRef(null);

  const journalDetail = useSelector(state => state?.journalDetail);
  const quoteStatus = useSelector(state => state?.quoteStatus);
  // const quoteDelete = useSelector(state => state?.quoteDelete);
  const quotation = journalDetail?.data?.data?.data;
  //   console.log("quotation", journalDetail)
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
    Navigate(`/dashboard/create-journal?${queryParams.toString()}`);
  };

  const [callApi, setCallApi] = useState(false);
  const changeStatus = (statusVal) => {
    console.log("statusVal", statusVal);
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
        dispatch(quotationDelete(sendData, Navigate));
      } else {
        dispatch(quotationStatus(sendData)).then(() => {
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
        journal_id: UrlId,
        fy: localStorage.getItem('FinancialYear'),
        warehouse_id: localStorage.getItem('selectedWarehouseId'),
      };
      dispatch(JournalDetails(queryParams));
    }
  }, [dispatch, UrlId, callApi]);

  const totalFinalAmount = quotation?.items?.reduce((acc, item) => acc + parseFloat(item?.final_amount), 0);


  const [loading, setLoading] = useState(false);


  const handleApproveJournal = async (journal_id) => {
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/journal/approved`, {
        journal_id
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
        }
      });

      if (response.status !== 200) {
        throw new Error('Failed to approve journal');
      }

      // Handle success response as needed
      toast.success('Journal approved successfully');
    } catch (error) {
      console.error('Error approving journal:', error);
      toast.error(`Error approving journal: ${error.message}`);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  console.log("quoteDelete", journalDetail?.data?.data?.data)
  return (
    <>
      {loading && <MainScreenFreezeLoader />}
      {quoteStatus?.loading && <MainScreenFreezeLoader />}
      {journalDetail?.loading ? <Loader02 /> :
        <>
          <div id="Anotherbox" className='formsectionx1'>
            <div id="leftareax12">
              <h1 id="firstheading">{quotation?.journal_no}</h1>
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

              {quotation?.status == 1 ? (
                <div className="mainx1">
                  {otherIcons?.notes_svg}
                  <p>Published</p>
                </div>
              ) : (
                <div onClick={() => handleApproveJournal(UrlId)} className="mainx1">
                  {otherIcons?.notes_svg}
                  <p>Publish</p>
                </div>
              )}



              <div className="sepc15s63x63"></div>



              <div onClick={() => setShowDropdown(!showDropdown)} className="mainx2" ref={dropdownRef}>
                <img src="/Icons/menu-dots-vertical.svg" alt="" />
                {showDropdown && (
                  <div className="dropdownmenucustom">

                    <div className='dmncstomx1' >
                      {otherIcons?.dublicate_svg}
                      Duplicate</div>
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


            <div className="commonquoatjkx55s">
              <div className="childommonquoatjkx55s">

                {quotation?.status == 1
                  ? <div className="publishedtx456">Published</div>
                  : <div className="labeltopleftx456">Draft</div>
                }


                <div className="detailsbox4x15s1">
                  <div className="xhjksl45s">
                    <svg width="24" height="23" viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg"><path d="M16.7582 0.894043L18.8566 4.51588L16.7582 8.13771H12.5615L10.4631 4.51588L12.5615 0.894043L16.7582 0.894043Z" /><path d="M6.29509 0.894043L13.5963 13.4842L11.4979 17.1061H7.30116L0 4.51588L2.09836 0.894043L6.29509 0.894043Z" /></svg>
                    <p>Accounts</p>
                  </div>
                  <div className="xhjksl45s2">
                    <h1>journal</h1>
                    <span><p>Journal no:</p> <h3>{quotation?.journal_no}</h3></span>
                    <span><p>Date:</p> <h3>{quotation?.transaction_date}</h3></span>
                  </div>
                </div>

                <div className="detailsbox4x15s2">
                  <div className="cjkls5xs1">

                  </div>
                  <div className="cjkls5xs2">
                    <p>Notes: <b>{quotation?.notes}</b></p>
                    <p>Reference number: <b>{quotation?.reference}</b></p>
                    <p>Amount: <b>{quotation?.total_credit}</b></p>
                  </div>
                </div>

                <div className="tablex15s56s3">
                  <div className="thaedaksx433">
                    <p className='sfdjklsd1xs2w1'>S.No</p>
                    <p className='sfdjklsd1xs2w2'>Account</p>
                    <p className='sfdjklsd1xs2w3'>Contact</p>
                    <p className='sfdjklsd1xs2w4'>Debits</p>
                    <p className='sfdjklsd1xs2w5'>Credits</p>
                  </div>
                  {quotation?.journal_entry?.map((val, index) => (
                    <div className="rowsxs15aksx433">
                      <p className='sfdjklsd1xs2w1'>{index + 1}</p>
                      <p className='sfdjklsd1xs2w2'>{val?.account_id || "*********"}</p>
                      <p className='sfdjklsd1xs2w3'>{val?.customer_id || "*********"}</p>
                      <p className='sfdjklsd1xs2w4'>{val?.debit || "*********"}</p>
                      <p className='sfdjklsd1xs2w5'>{val?.credit || "*********"}</p>
                    </div>
                  ))}


                </div>
                <div className="finalcalculateiosxl44s">
                  <span><p>Subtotal</p> <h5>{quotation?.total_credit}</h5></span>
                  <span><p>Total</p> <h5>{quotation?.total_credit}</h5></span>
                </div>
              </div>
            </div>
            {/* <div className="lastseck4x5s565">
              <p>More information</p>
              <p>Sale person:   {quotation?.sale_person || "*********"} </p>
            </div> */}
          </div>
        </>}
      <Toaster />
    </>
  )
}

export default JournalDetailsSing
