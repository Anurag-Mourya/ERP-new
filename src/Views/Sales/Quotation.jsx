import React, { useState, useEffect, useRef } from 'react';
import { fetchCustomers, fetchItems } from '../../FetchedApis/Apis';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrFormNextLink } from 'react-icons/gr';
import { IoAdd, IoDocumentTextOutline, IoPersonOutline, IoSearchOutline } from 'react-icons/io5';
import { MdOutlinePlace } from 'react-icons/md';
import { CiLocationArrow1 } from 'react-icons/ci';
import { GoPlus } from "react-icons/go";
import { LuMinus } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { FcExpired } from 'react-icons/fc';
import { AiOutlineTransaction } from 'react-icons/ai';
import Calendar from '../../Components/Calendar/Calendar';
import TopLoadbar from '../../Components/Toploadbar/TopLoadbar';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import CustomerProfilePopup from './CustomerProfilePopup';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Quotation = () => {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    id: 0,
    sale_type: "quotation",
    transaction_date: new Date().toISOString().split('T')[0],
    warehouse_id: 2,
    quotation_id: "QT-20212",
    reference_no: '',//not in api data
    customer_id: null,
    customer_type: null,
    customer_name: null,
    phone: null,
    email: null,
    currency: "USD",
    place_of_supply: '',
    expiry_date: '',
    sale_person: '',
    project_name: 'Project ERP',
    customer_note: "",
    terms: null,
    address: "prayagraj utterpradesh",
    fy: 2024,
    subtotal: 0,
    shipping_charge: 0,
    adjustment_charge: 0,
    total: 0,
    items: []
  });




  useEffect(() => {
    const token = localStorage.getItem('AccessToken');
    if (token) {
      // Fetch customers
      fetchCustomers(token)
        .then(data => {
          setCustomers(data);
        })
        .catch(error => {
          // Handle error if needed
        });

      // Fetch items
      fetchItems(token)
        .then(data => {
          setItems(data);
        })
        .catch(error => {
          // Handle error if needed
        });
    } else {
      // Handle case where token is not available
    }
  }, []);

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          id: 0,
          item_id: '',
          quantity: 1,
          gross_amount: 0,
          tax_rate: 0,
          tax_amount: 0,
          discount_type: 1,
          discount: 0,
          item_remark: "",
          final_amount: 0

        }
      ]
    });
  };




  const handleRemoveItem = (indexToRemove) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, index) => index !== indexToRemove)
    });
  };



  const handleItemSelect = (itemId, index) => {
    const selectedItem = items.find(item => item.id === itemId);
    if (selectedItem) {
      const updatedItems = [...formData.items];
      const taxAmount = (parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity) * parseFloat(selectedItem.tax_rate)) / 100;
      updatedItems[index] = {
        ...updatedItems[index],
        item_id: itemId,
        gross_amount: parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity),
        tax_rate: parseFloat(selectedItem.tax_rate),
        unit: parseFloat(selectedItem.unit),
        tax_amount: taxAmount,
        final_amount: (parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity) + taxAmount) - parseFloat(updatedItems[index].discount)
      };
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const handleItemInputChange = (e, index, fieldName) => {
    const { value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][fieldName] = value;
    const selectedItem = items.find(item => item.id === updatedItems[index].item_id);

    if (selectedItem) {
      if (fieldName === 'quantity') {
        updatedItems[index].gross_amount = parseFloat(selectedItem.price) * parseFloat(value);
        updatedItems[index].final_amount = (parseFloat(selectedItem.price) * parseFloat(value) + updatedItems[index].tax_amount) - parseFloat(updatedItems[index].discount);
        updatedItems[index].item_price = selectedItem.price; // Update the item_price here
      }
    }

    setFormData({ ...formData, items: updatedItems });
  };




  const handleDiscountTypeChange = (e, index) => {
    const { value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index].discount_type = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const getCustomerDetailsById = (customerId) => {
    // console.log(customerId)
    return customers.find(customer => customer.id == customerId);
  };

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("formData", formData);
      setLoader(true)
      const response = await axiosInstance.post(`/sales/create/update`, formData);
      console.log("response", response.data)
      if (response.data.message === 'Transaction Created Successfully') {
        toast.success('Quotation created successfully');
        setLoader(false)
      }

      if (response.data.status === false) {
        toast.error(response.data.message);
        setLoader(false)
      }
      // Add any further logic or redirection upon successful submission
      console.log(response.data)
      console.log("formData", formData);

    } catch (error) {
      setLoader(false)
      toast.error('Error creating quotation:', error);
      // Handle error states or display error messages to the user
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // handle customer dropdown 

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const filteredCustomers = formData.customer_name
      ? customers.filter(customer => customer.name.toLowerCase().includes(formData.customer_name.toLowerCase()))
      : customers;
    setFilteredCustomers(filteredCustomers);
  }, [formData.customer_name, customers]);

  const handleCustomerSelect = (customerId) => {
    const selectedCustomer = customers.find(customer => customer.id === customerId);
    console.log(selectedCustomer)
    if (selectedCustomer) {
      setFormData({
        ...formData,
        customer_id: selectedCustomer.id,
        customer_name: selectedCustomer.name,
        customer_type: selectedCustomer.customer_type,
        phone: selectedCustomer.mobile_no,
        email: selectedCustomer.email,
        place_of_supply: selectedCustomer.place_of_supply,
      });
    }
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (!event.target.closest('.custom-dropdown')) {
        setDropdownOpen(false);
      }
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);


  // item select

  const [itemDropdownsOpen, setItemDropdownsOpen] = useState(Array(formData.items.length).fill(false));

  // Function to handle toggling of item dropdown for a specific index
  const handleItemToggleDropdown = (index) => {
    const updatedDropdownsOpen = [...itemDropdownsOpen];
    updatedDropdownsOpen[index] = !updatedDropdownsOpen[index];
    setItemDropdownsOpen(updatedDropdownsOpen);
  };

  // Function to handle clicks outside of item dropdowns
  const handleClickOutsideItemDropdown = (event, index) => {
    if (itemDropdownRefs[index] && !itemDropdownRefs[index].contains(event.target)) {
      setItemDropdownsOpen(itemDropdownsOpen.map((value, idx) => idx === index ? false : value));
    }
  };

  // Refs for item dropdowns
  const itemDropdownRefs = useRef([]);

  // Effect to attach event listeners for handling clicks outside item dropdowns
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideItemDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideItemDropdown);
    };
  }, []);

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...formData.items];
    updatedItems[index].quantity += change;
    if (updatedItems[index].quantity < 0) {
      updatedItems[index].quantity = 0; // Ensure quantity doesn't go below 0
    }
    // Update gross amount, tax amount, and final amount based on the new quantity
    const selectedItem = items.find(item => item.id === updatedItems[index].item_id);
    if (selectedItem) {
      updatedItems[index].gross_amount = parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity);
      updatedItems[index].tax_amount = (parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity) * parseFloat(selectedItem.tax_rate)) / 100;
      updatedItems[index].final_amount = (parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity)) - parseFloat(updatedItems[index].discount);
    }
    setFormData({ ...formData, items: updatedItems });
  };


  // subtotal and total

  const [calculationHistory, setCalculationHistory] = useState([]);
  const calculateSubtotal = () => {
    let subtotal = 0;
    formData.items.forEach(item => {
      subtotal += item.final_amount;
    });
    return subtotal;
  };

  // Update calculation history and form data with calculated values
  useEffect(() => {
    const history = [...calculationHistory];
    const subtotal = calculateSubtotal();
    const total = calculateTotal();

    history.push({
      subtotal: subtotal,
      shippingCharge: parseFloat(formData.shipping_charge),
      adjustmentCharge: parseFloat(formData.adjustment_charge),
      total: total
    });

    setCalculationHistory(history);

    // Update formData with calculated values
    setFormData(prevState => ({
      ...prevState,
      subtotal: subtotal,
      total: total
    }));
  }, [formData.items, formData.shipping_charge, formData.adjustment_charge]);

  // Function to calculate total including shipping charge and adjustment charge
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + parseFloat(formData.shipping_charge) + parseFloat(formData.adjustment_charge);
  };


  // Update calculation history
  useEffect(() => {
    const history = [...calculationHistory];
    history.push({
      subtotal: calculateSubtotal(),
      shippingCharge: parseFloat(formData.shipping_charge),
      adjustmentCharge: parseFloat(formData.adjustment_charge),
      total: calculateTotal()
    });
    setCalculationHistory(history);
  }, [formData]);

  // Function to calculate total including shipping charge and adjustment charge


  const [showPopup, setShowPopup] = useState(false);


  const handleViewDetails = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };




  // discount

  const handleDiscountInputChange = (e, index) => {
    const { value } = e.target;
    const updatedItems = [...formData.items];
    const selectedItem = items.find(item => item.id === updatedItems[index].item_id);

    if (selectedItem) {
      // Check if discount type is percentage
      if (updatedItems[index].discount_type == 1) {
        // Ensure discount input does not exceed 100%
        if (parseFloat(value) <= 100) {
          updatedItems[index].discount = parseFloat(value);
        } else {
          // Display error or prevent user from proceeding
          // You can set an error state here
        }
      } else {
        // Check if discount input exceeds item total
        if (parseFloat(value) <= parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity)) {
          updatedItems[index].discount = parseFloat(value);
        } else {
          // Display error or prevent user from proceeding
          // You can set an error state here
        }
      }

      // Recalculate tax amount and final amount
      // updatedItems[index].tax_amount = (parseFloat(selectedItem.price) * parseFloat(updatedItems[index].quantity) * parseFloat(selectedItem.tax_rate)) / 100;

      updatedItems[index].final_amount = calculateFinalAmount(selectedItem, updatedItems[index]);

      // Update formData state
      setFormData({ ...formData, items: updatedItems });
    }
  };

  // Function to calculate final amount based on discount type
  const calculateFinalAmount = (item, formDataItem) => {
    let totalBeforeDiscount = parseFloat(item.price) * parseFloat(formDataItem.quantity);
    let discountAmount = 0;

    if (formDataItem.discount_type == 1) {
      discountAmount = (totalBeforeDiscount * parseFloat(formDataItem.discount)) / 100;
    } else {
      discountAmount = parseFloat(formDataItem.discount);
    }

    let totalAfterDiscount = totalBeforeDiscount - discountAmount;
    let taxAmount = (totalAfterDiscount * parseFloat(item.tax_rate)) / 100;

    return totalAfterDiscount + taxAmount;
  };




  // sdfjlk


  return (
    <>
      <TopLoadbar />
      <div id='middlesection'>
        <div id="Anotherbox">
          <h1 id='firstheading'>
            {/* <IoCreateOutline /> */}
            <img src="https://cdn-icons-png.freepik.com/512/10015/10015171.png?ga=GA1.1.154887286.1711103651&" alt="" />
            Create a Quotation</h1 >

          <div id="buttonsdata">
            <Link to={"/dashboard/quotations"}>Manage Quotations <GrFormNextLink /></Link>
            <Link to={"/dashboard/create-organization"}>Help?</Link>
          </div>
        </div>
        <div id="formofinviteuserxls">
          <form id='parentnewformmodern' onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            {/* Customer Dropdown */}
            <div id="newformmodern">

              <div id="firstsec">
                <div className="form-group newform-groupalign">



                  <label>Select Customer:</label>

                  <div id="f25" ref={dropdownRef}>
                    <div className={`custom-dropdown ${dropdownOpen ? 'open' : ''}`} onClick={handleToggleDropdown}>
                      <div className="dropdown-toggle" onClick={() => handleInputChange({ target: { name: 'customer_name', value: '' } })}>
                        {formData.customer_name ? formData.customer_name : 'Select Customer'}
                        <IoSearchOutline />
                      </div>
                      <div className="dropdown-content">
                        <input
                          type="text"
                          placeholder="Search..."
                          // value={formData.customer_name}
                          onChange={(e) => handleInputChange({ target: { name: 'customer_name', value: e.target.value } })}
                        />
                        <ul>
                          {filteredCustomers.map(customer => (
                            <li key={customer.id} onClick={() => handleCustomerSelect(customer.id)}>
                              <span>{customer.name.charAt(0)}</span>
                              <div>
                                <h4>{customer.name}</h4>
                                <p>{customer.customer_type}</p>
                              </div>
                            </li>
                          ))}


                        </ul>
                        <Link to={"/dashboard/create-customer"}>
                          <IoAdd /> Add Customer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="customerdetailssection">
                  {formData.customer_id ? (
                    <>
                      <div onClick={handleViewDetails} id="newboxiconcustomde">
                        <h3><img src="https://cdn-icons-png.freepik.com/512/1077/1077012.png?ga=GA1.1.1132558896.1711309931&" alt="" /> View Customer Details:</h3>
                        <div id="secondrstchilscjksdl">
                          <Link to={"/"}><CiLocationArrow1 /></Link>
                        </div>
                      </div>
                      {showPopup && <CustomerProfilePopup customerData={getCustomerDetailsById(formData.customer_id)} onClose={handleClosePopup} />}
                      <div id="customerDetails">
                        <div id="firstchilscjksdl">
                          <div className="custf1">
                            <p><LiaShippingFastSolid />Billing Address</p>
                            <div className="address">
                              <b>Oda</b>
                              <p>817 Kristopher Branch Suite 835 <br />
                                8448 Axel Wall Apt. 399<br />
                                Lanefort<br />
                                Maryland 413-692<br />
                                Armenia<br />
                                Phone: (462)-847-039<br />
                                Fax Number: 680-576-5177 x26803</p>
                            </div>
                          </div>


                          <div className="custf1">
                            <p><HiOutlineDocumentCheck />Shipping Address</p>
                            <div className="address">
                              <b>Norberto</b>
                              <p>817 Kristopher Branch Suite 835<br />
                                8448 Axel Wall Apt. 399<br />
                                Lanefort<br />
                                Maryland 413-692<br />
                                Armenia<br />
                                Phone: (462)-847-039<br />
                                Fax Number: 680-576-5177 x26803</p>
                            </div>
                          </div>
                        </div>

                      </div>
                      {/* <div id="customerDetails">
      <div id="firstchilscjksdl">
      <div className="custf1">
      <p><img src="https://cdn-icons-png.freepik.com/512/12483/12483620.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Name:</b> {getCustomerDetailsById(formData.customer_id)?.name}</p>
      <p><img src="https://cdn-icons-png.freepik.com/512/726/726623.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Email:</b> {getCustomerDetailsById(formData.customer_id)?.email}</p>
    </div> 
      
    <div className="custf1">
      <p><img src="https://cdn-icons-png.freepik.com/512/2051/2051943.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Customer type:</b> {getCustomerDetailsById(formData.customer_id)?.customer_type}</p>
      <p><img src="https://cdn-icons-png.freepik.com/512/4213/4213179.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Phone:</b> {getCustomerDetailsById(formData.customer_id)?.mobile_no}</p>
    </div>
    <div className="custf1">
      <p><img src="https://cdn-icons-png.freepik.com/512/6879/6879682.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Company name:</b> {getCustomerDetailsById(formData.customer_id)?.company_name}</p>
      <p><img src="https://cdn-icons-png.freepik.com/512/11121/11121159.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Display name:</b> {getCustomerDetailsById(formData.customer_id)?.display_name}</p>
    </div>
    <div className="custf1">
      <p><img src="https://cdn-icons-png.freepik.com/512/435/435472.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>Pan:</b> {getCustomerDetailsById(formData.customer_id)?.pan_no}</p>
      <p><img src="https://cdn-icons-png.freepik.com/512/9639/9639011.png?ga=GA1.1.1132558896.1711309931&" alt="" /><b>GST:</b> {getCustomerDetailsById(formData.customer_id)?.gst_no}</p>
    </div>
      </div>
 
  </div> */}
                    </>
                  ) : (
                    <div id="customerDetails">
                      <p className='redcolortext'>Please Select a Customer</p>
                    </div>
                  )}
                </div>
              </div>



              <div id="thirdformcls25">
                <div className="cjslw4s2">
                  <div className='group-form'>
                    <label className='redcolortext'>Quotation ID:</label>
                    <span>
                      <IoDocumentTextOutline className='svgofsecon65xs6' /><input type="text" value={formData.quotation_id} onChange={(e) => setFormData({ ...formData, quotation_id: e.target.value })} />
                    </span>
                  </div>

                </div>
                <div className="cjslw4s2">
                  <div className='group-form'>
                    <label className='redcolortext'>Reference</label>
                    <span>
                      <IoDocumentTextOutline className='svgofsecon65xs6' />
                      <input
                        type="text"
                        value={formData.reference_no}
                        onChange={(e) => setFormData({ ...formData, reference_no: e.target.value })}
                      />
                    </span>
                  </div>
                </div>
                <div className="cjslw4s2">
                  <div className='group-form'>
                    <label className='redcolortext'>Quoation Date:</label>
                    <span>
                      <AiOutlineTransaction className='svgofsecon65xs6' />
                      <Calendar selectedDate={formData.transaction_date} onDateChange={(date) => setFormData({ ...formData, transaction_date: date })} />

                      {/* <input type="date" value={formData.transaction_date} onChange={(e) => setFormData({ ...formData, transaction_date: e.target.value })} /> */}
                    </span>
                  </div>
                  <div className='group-form'>
                    <label>Expiry Date:</label>
                    <span>
                      <FcExpired className='svgofsecon65xs6' />
                      <Calendar selectedDate={formData.expiry_date} onDateChange={(date) => setFormData({ ...formData, expiry_date: date })} />
                      {/* <input type="date" value={formData.expiry_date} onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })} /> */}
                    </span>
                  </div>

                </div>


                <div className="cjslw4s2">
                  <br />
                </div>


                <div className="cjslw4s2">
                  <div className='group-form'>
                    <label>Place of Supply:</label>
                    <span>
                      <MdOutlinePlace className='svgofsecon65xs6' /><input type="text" value={formData.place_of_supply} onChange={(e) => setFormData({ ...formData, place_of_supply: e.target.value })} />
                    </span>
                  </div>
                </div>

                <div className="cjslw4s2">

                  <div className='group-form'>
                    <label>Sale Person:</label>
                    <span>
                      <IoPersonOutline className='svgofsecon65xs6' /><input type="text" value={formData.sale_person} onChange={(e) => setFormData({ ...formData, sale_person: e.target.value })} />
                    </span>
                  </div>

                </div>

              </div>

              <div id="additemboxxslks">

                {/* Other Form Fields */}
                {/* Include other form fields according to the provided specifications */}
                <div id="topthxls">
                  <ul>
                    <div id='firstformsecxls5'><li>
                      Item
                    </li></div>
                    <div id='firstformsecxls06'><li>
                      Item Price
                    </li></div>
                    <div id='firstformsecxls6'><li>
                      Quantity
                    </li></div>
                    <div id='firstformsecxls7'><li>
                      Tax
                    </li></div>
                    <div id='firstformsecxls8'><li>
                      Discount
                    </li></div>
                    <div id='firstformsecxls9'><li>
                      Final Amount
                    </li></div>
                  </ul>
                </div>

                {formData.items.map((item, index) => (
                  <div id='xlsowc36s6' key={index}>
                    <div id='insdformitemboxxslks' >
                      <div id='firstformsecxls5'>
                        <div ref={(ref) => (itemDropdownRefs.current[index] = ref)}>
                          <div className={`custom-dropdown-item ${itemDropdownsOpen[index] ? 'open' : ''}`} onClick={() => handleItemToggleDropdown(index)}>
                            <div className="dropdown-toggle">
                              {item.item_id ? items.find((itm) => itm.id === item.item_id)?.name : 'Select Item'}
                              {/* <IoSearchOutline /> */}
                              {item.item_id && (
                                <div id='insidecl545s'>
                                  <p>{item.quantity} x {item.gross_amount / item.quantity} = {item.gross_amount.toFixed(2)}/-</p>

                                  <p>Tax Rate: {item.tax_rate}%</p>
                                </div>
                              )}
                            </div>
                            <div className="dropdown-content">
                              <input type="text" placeholder="Search..." onChange={(e) => handleItemInputChange(e, index, 'item_id')} />
                              <ul>
                                {items.map((itm) => (
                                  <li key={itm.id} onClick={() => handleItemSelect(itm.id, index)}>
                                    <h3>{itm.name}</h3>
                                    <span>
                                      <p>SKU: {itm.sku}</p>
                                      <p>price: {itm.price}</p>
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Link to={"/dashboard/create-customer"}>
                                <IoAdd /> Add Item
                              </Link>
                            </div>
                          </div>
                        </div>
                        {item.item_id && (
                          <>
                            {/* <input type="number" placeholder='item amount' value={item.gross_amount} readOnly /> */}
                            {/* <p>{item.quantity} x {item.gross_amount/item.quantity} = {item.gross_amount}</p> */}
                            <textarea placeholder='Item Remarks' value={item?.item_remark} onChange={(e) => handleItemInputChange(e, index, 'item_remark')} />
                          </>
                        )}
                      </div>
                      <div id='firstformsecxls6'>
                        <input
                          type="number"
                          value={(item.gross_amount / (item.quantity || 1)).toFixed(2)}
                          onChange={(e) => handleItemInputChange(e, index, 'item_price')}
                        />
                      </div>
                      <div id='firstformsecxls6'>
                        <div id="insidx6s56">
                          <input type="number" value={item.quantity} onChange={(e) => handleItemInputChange(e, index, 'quantity')} />
                          <div className="quantity-buttons">
                            <button onClick={() => handleQuantityChange(index, -1)}><LuMinus /></button>
                            <button onClick={() => handleQuantityChange(index, 1)}><GoPlus /></button>
                          </div>
                          <p>{item.unit}</p>
                        </div>
                      </div>


                      <div id='firstformsecxls7'>
                        <input type="number" value={item.tax_amount.toFixed(2)} readOnly />
                        <p id='inspx56'><img src="https://cdn-icons-png.freepik.com/512/6324/6324052.png?ga=GA1.1.1093019317.1711184096&" alt="" />Tax rate calculated from item tax.</p>
                      </div>
                      <div id='firstformsecxls8'>
                        <div id="boxofdiscohandl">
                          <select value={item.discount_type} onChange={(e) => handleDiscountTypeChange(e, index)}>
                            <option value={1}>%</option>
                            <option value={2}>₹</option>
                          </select>
                          <input
                            type="number"
                            value={formData.items[index].discount}
                            onChange={(e) => handleDiscountInputChange(e, index)}
                          />        </div>
                      </div>
                      <div id='firstformsecxls9'>
                        <p>{item.final_amount.toFixed(2)}/-</p>
                      </div>

                    </div>
                    <div className="crossitemx44sbutton" onClick={() => handleRemoveItem(index)}><RxCross2 /></div>
                  </div>
                ))}



                {/* Add Item Button */}
                <div className='additemx44sbutton' type="button" onClick={handleAddItem}><HiOutlinePlusSm />Add New Row</div>
              </div>
              <div id="custermsnote">

                <div id="formcontencuterm">
                  <div className='group-form'>
                    <label>Terms:</label>
                    <textarea placeholder='Enter the terms and conditions of your business to be displayed in your transaction' value={formData?.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.value })} />
                  </div>
                  <div className='group-form'>
                    <label>Customer Note:</label>
                    <textarea placeholder='Will be displayed on the estimate' value={formData?.customer_note} onChange={(e) => setFormData({ ...formData, customer_note: e.target.value })} />
                  </div>

                </div>




                <div id="lastformofallcalculations">

                  <div className="ckls548w5">
                    <div className='formgroups5x5s'>
                      <label>Subtotal:</label>
                      <p>{formData.subtotal.toFixed(2)}/-</p>
                    </div>

                  </div>

                  <div className="ckls548w6">
                    <div className='formgroups5x5s'>
                      <label>Shipping Charge:</label>
                      <input type="number" value={formData.shipping_charge} onChange={(e) => setFormData({ ...formData, shipping_charge: e.target.value })} />
                    </div>

                    <div className='formgroups5x5s'>
                      <label>Adjustment Charge:</label>
                      <input type="number" value={formData.adjustment_charge} onChange={(e) => setFormData({ ...formData, adjustment_charge: e.target.value })} />
                    </div>
                  </div>
                  <div className="ckls548w7">
                    <div className='formgroups5x5s'>
                      <label>Total:</label>
                      <p>{formData.total.toFixed(2)}/-</p>
                    </div>
                  </div>
                  {/* <div className="ckls548w5">
       
          </div> */}
                </div>
              </div>







            </div>
            {calculationHistory.map((calculation, index) => (
              <li key={index}>
                <p>Subtotal: {calculation.subtotal.toFixed(2)}</p>
                <p>Shipping Charge: {calculation.shippingCharge.toFixed(2)}</p>
                <p>Adjustment Charge: {calculation.adjustmentCharge.toFixed(2)}</p>
                <p>Total: {calculation.total.toFixed(2)}</p>
              </li>
            ))}

            <div className="randomheightagain"></div>
            <div className="randomheightagain"></div>
            <div className="randomheightagain"></div>
            <div className="randomheightagain"></div>
            <div className="randomheightagain"></div>
            <div id="submitbuttonrow">
              <div className="form-grscsdoup">
                <button type="submit">{loader === true ? "Submiting" : "Submit"}  </button>
                <button id='cancelbutn' type="">Cancel</button>
              </div>
            </div>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Quotation;
