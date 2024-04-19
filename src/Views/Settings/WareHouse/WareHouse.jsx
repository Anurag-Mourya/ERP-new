import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PiWarehouseThin } from 'react-icons/pi';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import Loader02 from '../../../Components/Loaders/Loader02';
import TopLoadbar from '../../../Components/Toploadbar/TopLoadbar';
import Topbar from '../../../Components/NavigationBars/Topbar';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const WareHouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.post(`${apiUrl}/warehouse/list`);
        if (response.status === 200) {
          setWarehouses(response.data);
          setLoading(false);
        } else {
          console.error('Failed to fetch warehouses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const selectedUserIds = users.map(user => user.id);
    setSelectedItems(checked ? selectedUserIds : []);
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems(prevSelectedItems => [...prevSelectedItems, id]);
    } else {
      setSelectedItems(prevSelectedItems => prevSelectedItems.filter(itemId => itemId !== id));
    }
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const saveToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
  };

  const handleClearWareHouseItem = () => {
    sessionStorage.removeItem('update-warehouse');
  };
  return (
    
   <>
    <TopLoadbar />
    <Topbar />
    <div id='middlesection'>
      <h1 id='firstheading'> <PiWarehouseThin /> Manage Warehouse</h1>
      <div id="filterbox">
        <div id="searchbox">
          <input
            id='commonmcsearchbar'
            type="text"
            placeholder='Search organization'
            value={searchTerm}
            onChange={handleSearch}
          />
          <RiSearch2Line />
        </div>
        <div id="buttonsdata">
          <Link onClick={handleClearWareHouseItem} to={"/dashboard/create-warehouse"}>Create Warehouse</Link>
        </div>
      </div>

      <div id="item-listsforcontainer">
      {loading ? (
        <Loader02 />
      ) : (
        <table>
          <thead>
            <tr>
            <th className="checkboxleft">
                  <div className="checkbox-animate">
                    <label>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedItems.length === warehouses.length}
                      />
                      <span className="input-check"></span>
                    </label>
                  </div>
                </th>
              <th>S.No</th>
              <th>Name</th>
              <th>Organisation ID</th>
              <th>Address</th>
              <th>City</th>
              <th>Branch Name</th>
              <th>Created At</th>
              <th>
                        Action
                    </th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouses.map((warehouse , index) => (
              <tr key={warehouse.id}>
                <td className="checkboxleft">
                    <div className="checkbox-animate">
                      <label>
                        <input
                          type="checkbox"
                          onChange={(e) => handleSelectItem(warehouse.id, e.target.checked)}
                          checked={selectedItems.includes(warehouse.id)}
                        />
                        <span className="input-check"></span>
                      </label>
                    </div>
                  </td>
                <td>{index + 1}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.organisation_id}</td>
                <td>{warehouse.address || 'N/A'}</td>
                <td>{warehouse.city || 'N/A'}</td>
                <td>{warehouse.branch_name || 'N/A'}</td>
                <td>{warehouse.created_at || 'N/A'}</td>
                <td id="editbuttonofitem" >
            <Link onClick={() => saveToSessionStorage('update-warehouse', `${warehouse.id}`)} to={`/dashboard/create-warehouse`}>
            <CiEdit />
            </Link>
        </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
   </>
  );
};

export default WareHouse
