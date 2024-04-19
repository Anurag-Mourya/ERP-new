import axios from 'axios';
import axiosInstance from '../Configs/axiosInstance';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;


const fetchCustomers = async () => {
  try {
    const response = await axiosInstance.post(`/customers/list?is_customer=1`, {
    });
    if (response.data && response.data.user) {
      return response.data.user;
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
};
const fetchInvoices = async (token) => {
  try {
    const response = await axiosInstance.post(`/invoice/list?fy=2024`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.data && response.data.invoice) {
      return response.data.invoice;
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
};

//implementd from redux
const fetchItems = async () => {
  try {
    const response = await axiosInstance.post(`/item/list`,);
    if (response.data && response.data.success) {
      return response.data.item;
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
};
const fetchItemsWithTotalItems = async (data) => {
  try {
    const response = await axiosInstance.post(`/item/list`,
      data
    );
    if (response.data && response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
};

const fetchVenders = async () => {
  try {
    const response = await axiosInstance.post(`/vendors/list?is_vendor=1`, {
    });
    if (response.data && response.data.user) {
      return response.data.user;
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

//this api is implementd from redux
const fetchCategories = async () => {
  try {
    const response = await axiosInstance.post(`/category/list`, {
    });
    if (response?.data?.data) {
      return response?.data?.data;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

const fetchAccoutntList = async () => {
  try {
    const response = await axiosInstance.post(`/accounts/list`, {
    });
    if (response.data.success) {
      return response.data.accounts;
    }
  } catch (error) {
    console.error('Error fetching account list:', error);
    throw error;
  }
};

const fetchBillList = async () => {
  try {
    const response = await axiosInstance.post(`/purchase/bills/list?fy=2024`, {
    });
    if (response.data && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};





const fetchCountries = async () => {
  const authToken = localStorage.getItem('AccessToken'); // Replace 'authToken' with your actual token key
  try {
    const response = await axios.post(`${apiUrl}/get/country`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.data && response.data.success) {
      return response.data.country;
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

const fetchStatesByCountryId = async (countryId) => {
  const authToken = localStorage.getItem('AccessToken'); // Replace 'authToken' with your actual token key
  try {
    const response = await axios.post(`${apiUrl}/get/state?country_id=${countryId}`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.data && response.data.success) {
      return response.data.country;
    }
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};

const fetchCitiesByStateId = async (stateId) => {
  const authToken = localStorage.getItem('AccessToken'); // Replace 'authToken' with your actual token key
  try {
    const response = await axios.post(`${apiUrl}/get/city?state_id=${stateId}`, {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.data && response.data.success) {
      return response.data.country;
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};


export { fetchCustomers, fetchItemsWithTotalItems, fetchAccoutntList, fetchInvoices, fetchBillList, fetchCategories, fetchItems, fetchCountries, fetchStatesByCountryId, fetchCitiesByStateId, fetchVenders };








// getMasterLabelByType(labelid,type){
//   let param = {labelid:labelid,type:type}
//   let found = this.master.find(function(item) {
//     for (var key in param) {
//       if (item[key] === undefined || item[key] != param[key])
//         return false;
//     }
//     return true;
//   })
//   if(typeof found!=='undefined')
//     return found.label
//   return labelid
// },
// getSelectedIdsFromMasterType(ids,type){
//   let types = this.master.filter(a=>a.type==type)
//   let found = types.filter(a=>ids.includes(a.labelid))
//   return found;
// },
// getmastertype(type){
//   let types = this.master.filter(a=>a.type==type)
//   return types;
// },