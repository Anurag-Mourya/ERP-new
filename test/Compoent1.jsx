const CreateSalesOrders = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    sale_type: "sale_order",
    customer_id: "",
    warehouse_id: localStorage.getItem('selectedWarehouseId') || "",
    sale_order_id: "SO-1421",
    reference_no: "",
    transaction_date: new Date().toISOString().split('T')[0],
    shipment_date: "",
    payment_terms: "",
    delivery_method: "",
    sale_person: "",
    customer_type: "",
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    place_of_supply: "",
    customer_note: "",
    terms: "",
    fy: localStorage.getItem('FinancialYear'),
    subtotal: "",
    shipping_charge: "",
    adjustment_charge: "",
    total: "",
    items: []
  });

  const Navigate = useNavigate()
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(""); // New state to store selected customer ID
  const [searchTerm, setSearchTerm] = useState("");

  const popupRef = useRef(null); // Ref for the popup div


  useEffect(() => {
    const token = localStorage.getItem('AccessToken');
    if (token) {
      fetchCustomers(token)
        .then(data => {
          setCustomers(data);
        })
        .catch(error => {
          // Handle error if needed
        });

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

  const handleSelectCustomer = (customerId) => {
    const selectedCustomer = customers.find(customer => customer.id === customerId);
    setSelectedCustomerDetails(selectedCustomer);
    setFormData(prevState => ({
      ...prevState,
      customer_id: selectedCustomer.id,
      customer_name: selectedCustomer.name,
      phone: selectedCustomer.mobile_no,
      email: selectedCustomer.email,
      address: selectedCustomer.address[0]?.street_1,
      place_of_supply: selectedCustomer.place_of_supply
    }));
    setIsPopupOpen(false); // Close the popup after selecting a customer
    setSelectedCustomerId(customerId); // Update the selected customer ID
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClosePopup);
    return () => {
      document.removeEventListener("mousedown", handleClosePopup);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = (itemId, index) => {
    const selectedItem = items.find(item => item.id === itemId);
    const taxRate = selectedItem.tax_rate ? parseFloat(selectedItem.tax_rate) : 0;
    const grossAmount = selectedItem.price ? parseFloat(selectedItem.price) : 0;
    const taxAmount = (grossAmount * taxRate) / 100;
    const finalAmount = grossAmount + taxAmount;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      item_id: selectedItem.id,
      gross_amount: grossAmount,
      final_amount: finalAmount,
      tax_rate: taxRate,
      tax_amount: taxAmount
    };
    setFormData(prevState => ({
      ...prevState,
      items: updatedItems
    }));
  };

  const handleAddItem = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      items: [
        ...prevFormData.items,
        {
          item_id: "",
          quantity: "1",
          gross_amount: "",
          final_amount: "",
          tax_rate: "",
          tax_amount: "",
          discount: "",
          discount_type: "",
          item_remark: ""
        }
      ]
    }));
  };

  const handleRemoveItem = index => {
    setFormData(prevFormData => ({
      ...prevFormData,
      items: prevFormData.items.filter((_, itemIndex) => itemIndex !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/sales/create/update`, formData);
      console.log(response.data);
      if (response.status === 200 && response.data.message === "Transaction Created Successfully") {
        toast.success('Sales order created successfully');
        setTimeout(() => {
          Navigate("/dashboard/sales-orders")
        }, 500);
      } else {
        toast.error('Error creating sales order');
      }
    } catch (error) {
      console.error('Error creating sales order:', error);
      toast.error('Error creating sales order');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'shipping_charge' || name === 'adjustment_charge') {
      // If shipping charge or adjustment charge is changed, calculate the total
      const shippingCharge = parseFloat(name === 'shipping_charge' ? value : formData.shipping_charge);
      const adjustmentCharge = parseFloat(name === 'adjustment_charge' ? value : formData.adjustment_charge);
      const subtotal = formData.items.reduce((acc, item) => acc + parseFloat(item.final_amount), 0);
      const total = subtotal + shippingCharge + adjustmentCharge;

      setFormData(prevState => ({
        ...prevState,
        subtotal: subtotal.toFixed(2),
        [name]: value,
        total: total.toFixed(2)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const itemsCopy = [...formData.items];
    itemsCopy[index] = {
      ...itemsCopy[index],
      [name]: value
    };

    if (name === 'quantity' || name === 'gross_amount' || name === 'tax_rate' || name === 'tax_amount' || name === 'discount' || name === 'discount_type') {
      // If quantity, gross amount, tax rate, tax amount, discount, or discount type is changed, update final amount based on new values
      const quantity = parseFloat(itemsCopy[index].quantity);
      const grossAmount = parseFloat(itemsCopy[index].gross_amount);
      const taxRate = parseFloat(itemsCopy[index].tax_rate);
      const taxAmount = (grossAmount * taxRate) / 100;
      let finalAmount = quantity * (grossAmount + taxAmount);
      const discount = parseFloat(itemsCopy[index].discount);
      const discountType = parseInt(itemsCopy[index].discount_type);

      if (!isNaN(discount) && !isNaN(discountType)) {
        if (discountType === 1) { // Percentage
          if (discount >= 0 && discount <= 100) {
            finalAmount *= (1 - discount / 100);
          } else {
            // Reset discount to valid range if out of bounds

            itemsCopy[index].discount = '';
          }
        } else if (discountType === 2) { // Amount
          if (discount >= 0 && discount <= finalAmount) {
            finalAmount -= discount;
          } else {
            // Reset discount to valid range if out of bounds
            itemsCopy[index].discount = '';
          }
        }
      }

      itemsCopy[index].final_amount = finalAmount.toFixed(2);
      itemsCopy[index].tax_amount = taxAmount.toFixed(2);

      // Recalculate subtotal and total
      const subtotal = itemsCopy.reduce((acc, item) => acc + parseFloat(item.final_amount), 0);
      const shippingCharge = parseFloat(formData.shipping_charge || 0);
      const adjustmentCharge = parseFloat(formData.adjustment_charge || 0);
      const total = subtotal + shippingCharge + adjustmentCharge;

      setFormData(prevState => ({
        ...prevState,
        items: itemsCopy,
        subtotal: subtotal.toFixed(2),
        total: total.toFixed(2)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        items: itemsCopy
      }));
    }
  };



  // select item



  return (
    <>
      <TopLoadbar />
      <div id='middlesection'>
        <div id="Anotherbox">
          <h1 id='firstheading'>
            {/* <IoCreateOutline /> */}
            <img src="https://cdn-icons-png.freepik.com/512/10015/10015171.png?ga=GA1.1.154887286.1711103651&" alt="" />
            Create Sales Orders</h1 >

          <div id="buttonsdata">
            <Link to={"/dashboard/quotations"}>Manage Sales Orders <GrFormNextLink /></Link>

          </div>
        </div>
        <div id="formofinviteuserxls">
          <form id='parentnewformmodern' onSubmit={handleSubmit}>
            {/* Non-item specific inputs */}

            <div style={{ position: 'relative' }}>
              <div
                onClick={handleOpenPopup}
                style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              >
                {formData.customer_name ? formData.customer_name : "Select Customer"}
              </div>
              {/* Popup for selecting customers */}
              {isPopupOpen && (
                <div ref={popupRef} style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '1px solid black', zIndex: 999 }}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search Customer"
                    style={{ padding: '10px', width: '100%', boxSizing: 'border-box' }}
                  />
                  {filteredCustomers.map(customer => (
                    <div key={customer.id} onClick={() => handleSelectCustomer(customer.id)}>
                      {customer.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Display selected customer details */}
            {selectedCustomerDetails && (
              <div>
                <h3>Selected Customer Details</h3>
                <p>Name: {selectedCustomerDetails.name}</p>
                <p>Phone: {selectedCustomerDetails.mobile_no}</p>
                <p>Email: {selectedCustomerDetails.email}</p>
                <p>Address: {selectedCustomerDetails.address[0]?.street_1}</p>
                <p>Place of Supply: {selectedCustomerDetails.place_of_supply}</p>
              </div>
            )}

            <input
              type="text"
              name="sale_order_id"
              value={formData.sale_order_id}
              onChange={handleChange}
              placeholder="Sale Order ID"
            />
            <input
              type="text"
              name="reference_no"
              value={formData.reference_no}
              onChange={handleChange}
              placeholder="Reference No"
            />
            <input
              type="text"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              placeholder="Transaction Date"
            />
            <input
              type="text"
              name="shipment_date"
              value={formData.shipment_date}
              onChange={handleChange}
              placeholder="Shipment Date"
            />
            <input
              type="text"
              name="payment_terms"
              value={formData.payment_terms}
              onChange={handleChange}
              placeholder="Payment Terms"
            />
            <input
              type="text"
              name="delivery_method"
              value={formData.delivery_method}
              onChange={handleChange}
              placeholder="Delivery Method"
            />
            <input
              type="text"
              name="sale_person"
              value={formData.sale_person}
              onChange={handleChange}
              placeholder="Sale Person"
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="place_of_supply"
              value={formData.place_of_supply}
              onChange={handleChange}
              placeholder="Place of Supply"
            />
            <input
              type="text"
              name="customer_note"
              value={formData.customer_note}
              onChange={handleChange}
              placeholder="Customer Note"
            />
            <input
              type="text"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              placeholder="Terms"
            />

            <input
              type="text"
              name="subtotal"
              value={formData.subtotal}
              onChange={handleChange}
              placeholder="Subtotal"
            />
            <input
              type="text"
              name="shipping_charge"
              value={formData.shipping_charge}
              onChange={handleChange}
              placeholder="Shipping Charge"
            />
            <input
              type="text"
              name="adjustment_charge"
              value={formData.adjustment_charge}
              onChange={handleChange}
              placeholder="Adjustment Charge"
            />
            <input
              type="text"
              name="total"
              value={formData.total}
              onChange={handleChange}
              placeholder="Total"
            />

            <div>
              <button type="button" onClick={handleAddItem}>Add Item</button>
            </div>

            {/* Item-specific inputs */}
            {formData.items.map((item, index) => (
              <div key={index}>
                <h3>Item #{index + 1}</h3>
                <input
                  type="number"
                  name="item_id"
                  value={item.item_id}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Item ID"
                />
                {items.map((item, i) => (
                  <div key={item.id} onClick={() => handleSelectItem(item.id, index)}>
                    {item.name}
                  </div>
                ))}
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Quantity"
                />


                <input
                  type="number"
                  name="gross_amount"
                  value={item.gross_amount}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Gross Amount"
                />

                <input
                  type="number"
                  name="final_amount"
                  value={item.final_amount}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Final Amount"
                />

                <input
                  type="number"
                  name="tax_rate"
                  value={item.tax_rate}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Tax Rate (%)"
                />

                <input
                  type="number"
                  name="tax_amount"
                  value={item.tax_amount}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Tax Amount"
                />

                <input
                  type="number"
                  name="discount"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Discount"
                />
                <select
                  name="discount_type"
                  value={item.discount_type}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value="" disabled>Select Discount Type</option>
                  <option value="1">%</option>
                  <option value="2">Amount</option>
                </select>
                <input
                  type="text"
                  name="item_remark"
                  value={item.item_remark}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Item Remark"
                />
                <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
              </div>
            ))}
            <div>
              <button type="submit">Submit Sales Order</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};
