import React, { useEffect, useRef, useState } from 'react'
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar'
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { otherIcons } from '../../Helper/SVGIcons/ItemsIcons/Icons';
import { accountTableIcons } from '../../Helper/SVGIcons/ItemsIcons/ItemsTableIcons';
import { accountDetail } from '../../../Redux/Actions/accountsActions';
import { useDispatch, useSelector } from 'react-redux';
import NoDataFound from '../../../Components/NoDataFound/NoDataFound';
import TableViewSkeleton from '../../../Components/SkeletonLoder/TableViewSkeleton';
import { formatDate } from '../../Helper/DateFormat'
import newmenuicoslz from '../../../assets/outlineIcons/othericons/newmenuicoslz.svg';
import useOutsideClick from '../../Helper/PopupData';

const AccountDetails = () => {
  const dispatch = useDispatch();
  const UrlId = new URLSearchParams(location.search).get("id");

  const accDetails = useSelector((state) => state?.accountDetails?.data);
  const accDetailsList = accDetails?.transactions

  const [switchValue, setSwitchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const dropdownRef = useRef(null); // Ref to the dropdown element

  console.log("data", accDetails);

  useEffect(() => {
    dispatch(accountDetail({ fy: localStorage?.getItem("FinancialYear"), id: UrlId }));
  }, [dispatch]);


  const handleSwitchChange = (e) => {
    const newValue = e.target.value;
    setSwitchValue(newValue);
    if (itemId) {
      const sendData = {
        item_id: itemId,
        active: newValue
      }
      dispatch(activeInActive(sendData))
        .then(() => {
          const toastMessage = newValue === '1' ? 'Item is now active' : 'Item is now inactive';
          toast.success(toastMessage);
        })
        .catch((error) => {
          toast.error('Failed to update item status');
          console.error('Error updating item status:', error);
          // Revert switch value if there's an error
          setSwitchValue((prevValue) => prevValue === '1' ? '0' : '1');
        });
    }
  };

  const deleteItemsHandler = () => {
    if (itemId) {
      dispatch(deleteItems({ item_id: itemId }, navigate));
    }
  }

  useOutsideClick(dropdownRef, () => setShowDropdown(false))


  const handleEditItems = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("id", itemId);
    queryParams.set("edit", true);
    navigate(`/dashboard/create-items?${queryParams.toString()}`);
  };
  return (
    <>
      <TopLoadbar />
      <div id="Anotherbox">
        <div id="leftareax12">
          <h1 className='' id="firstheading">
            {/* <img src={"/Icons/bags-shopping.svg"} alt="" /> */}
            {accDetails?.accounts?.account_name}
          </h1>
          {/* <p id="firsttagp">{accDetailsList?.total}</p> */}
        </div>
        <div id="buttonsdata">
          <div className="switchbuttontext">
            <div className="switches-container">
              <input type="radio" id="switchMonthly" name="switchPlan" value="0" checked={switchValue === "0"} onChange={handleSwitchChange} />
              <input type="radio" id="switchYearly" name="switchPlan" className='newinput' value="1" checked={switchValue === "1"} onChange={handleSwitchChange} />
              <label htmlFor="switchMonthly">Inactive</label>
              <label htmlFor="switchYearly">Active</label>
              <div className="switch-wrapper">
                <div className="switch">
                  <div id='inactiveid'>Inactive</div>
                  <div>Active</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="separatorx21"></div> */}
          <div
            //  className="mainx1"
            className="filtersorticos5wx2"
            onClick={handleEditItems}>
            <img src="/Icons/pen-clip.svg" alt="" />
            {/* <p>Edit</p> */}
          </div>
          <div onClick={() => setShowDropdown(!showDropdown)} className="filtersorticos5wx2" ref={dropdownRef}>
            {/* <img src="/Icons/menu-dots-vertical.svg" alt="" /> */}
            <img src={newmenuicoslz} alt="" />
            {showDropdown && (
              <div className="dropdownmenucustom">

                <div className="bordersinglestroke"></div>
                <div className='dmncstomx1' onClick={deleteItemsHandler} style={{ cursor: "pointer" }}>
                  {otherIcons?.delete_svg}
                  Delete</div>
              </div>
            )}
          </div>
          <Link className="linkx4" to={"/dashboard/manage-items"}>
            <RxCross2 />
          </Link>
        </div>
      </div>


      <div id="mainsectioncsls" className="listsectionsgrheigh">
        <div id="leftsidecontentxls">
          <div id="item-listsforcontainer">
            <div id="newtableofagtheme">
              <div id="Anotherbox">
                <div id="leftareax12">
                  Recent Transactions
                  <p id="firsttagp">{accDetailsList?.length}</p>
                  <p id="firsttagp">Total</p>
                </div>
              </div>
              <div className="table-headerx12">
                {/* Recent Transactions */}
                {accountTableIcons?.map((val, index) => (
                  <div key={index} className={`table-cellx12 ${val?.className}`}>
                    {val?.svg}
                    {val?.name}
                  </div>
                ))}
              </div>

              {accDetails?.loading ? (
                <TableViewSkeleton />
              ) : (
                <>
                  {accDetailsList?.length >= 1 ? (
                    accDetailsList?.map((quotation, index) => (
                      <div
                        className={`table-rowx12 `}
                        key={index}
                      >

                        <div className="table-cellx12 journalx4s1">
                          {(formatDate(quotation?.transaction_date)) || "NA"}
                        </div>
                        <div className="table-cellx12 journalx4s2">
                          {quotation?.notes || "NA"}
                        </div>
                        <div className="table-cellx12 journalx4s3">
                          {quotation?.entity_type || "NA"}
                        </div>
                        <div className="table-cellx12 quotiosalinvlisxs6 journalx4s7 sdjklfsd565 x566sd54w2sxw">
                          {/* {quotation.total || ""} */}
                          {quotation?.debit || "NA"}

                        </div>
                        <div className="table-cellx12 journalx4s4">
                          {quotation?.credit || "NA"}
                        </div>

                      </div>
                    ))
                  ) : (
                    <NoDataFound />
                  )}

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDetails
