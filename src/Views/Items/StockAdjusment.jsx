import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster, toast } from 'react-hot-toast';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { useDispatch, useSelector } from 'react-redux';
import { stockItemAdjustment } from '../../Redux/Actions/itemsActions';
import { itemLists } from '../../Redux/Actions/listApisActions';
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';

const StockAdjustment = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state?.stockAdjustment?.stockData);
  const itemList = useSelector(state => state?.itemList);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    item_id: '',
    unit_id: '2',
    inout: '0',
    warehouse_id: +localStorage.getItem('selectedWarehouseId'),
    quantity: '',
    fy: +localStorage.getItem('FinancialYear'),
    transaction_date: new Date(),
  });

  useEffect(() => {
    dispatch(itemLists());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setFormData(prevState => ({
      ...prevState,
      item_id: item.id
    }));
    setIsOpen(false);
  };

  const handleTransactionType = (type) => {
    setFormData(prevState => ({
      ...prevState,
      inout: type
    }));
  };

  return (
    <>
      <TopLoadbar />
      <div id="Anotherbox">
        <div id="leftareax12">
          <h1 id="firstheading">
            <img src={"/Icons/supplier-alt.svg"} alt="" />
            Stock Adjustment
          </h1>
        </div>

        <div id="buttonsdata">
          <Link className="linkx1" to={"/dashboard/create-items"}>
            Create Item <GoPlus />
          </Link>
          <Link className="linkx2" to={"/dashboard/manage-items"}>
            Manage Items <MdArrowForward />
          </Link>
        </div>
      </div>
      <div className="bordersinglestroke"></div>
      <div id="stockadjustmentform">
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch(stockItemAdjustment(formData));
        }}>
          <label  className='x1' ref={dropdownRef}>
            Item:
            <div className="custom-dropdown">
              <input
              className='x12s'
                type="text"
                placeholder="Select an item"
                value={selectedItem ? selectedItem.name : ''}
                readOnly
                onClick={() => setIsOpen(true)}
              />
              {isOpen && (
                <div className="dropdown-content">
                  <input
                  className='x12sx3'
                    type="text"
                    placeholder="Search items"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div className="x12s34">
                  {itemList?.data?.item
                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(item => (
                      <div className='x12s35' key={item.id} onClick={() => handleSelectItem(item)}>{item.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </label>
         
              <div className="x2">
              <label className='x2s1'>
            Quantity:
            <input placeholder='enter quantity' type="text" name="quantity" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
          </label>
         
          <div className='x2s2'>
            Transaction Type:
            <span>
            <button
              className={formData.inout === '0' ? 'selectedbtn' : ''}
              onClick={() => handleTransactionType('0')}
            >
              Out
            </button>
            <button
              className={formData.inout === '1' ? 'selectedbtn' : ''}
              onClick={() => handleTransactionType('1')}
            >
              In
            </button>
            </span>
          </div>
              </div>
         
              <div className="x3">
            Transaction Date:
            <DatePicker
              selected={formData.transaction_date}
              onChange={(date) => setFormData({ ...formData, transaction_date: date })}
              onBlur={() => setIsOpen(false)} // Close the calendar when date is selected
            />
          </div>
         
          <button className='buttonx1' type="submit">Submit</button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default StockAdjustment;
