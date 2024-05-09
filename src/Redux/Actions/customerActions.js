import {
    CREATE_CUSTOMER_REQUEST,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_ERROR,

    VIEW_CUSTOMER_REQUEST,
    VIEW_CUSTOMER_SUCCESS,
    VIEW_CUSTOMER_ERROR,

    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,

} from '../Constants/customerConstants'

import axiosInstance from "../../Configs/axiosInstance";
import toast from 'react-hot-toast';

export const createCustomers = (queryParams, Navigate, editDub) => async (dispatch) => {

    // console.log("queryParams, Navigate, editDub", editDub)
    dispatch({ type: CREATE_CUSTOMER_REQUEST });
    try {
        const response = await axiosInstance.post(`/customer/create/update`,
            queryParams
        );

        if (editDub === "edit" && (response?.data?.message === "Record Updated Successfully")) {
            toast.success(response?.data?.message);
            // Navigate('/dashboard/customers');
        } else if (editDub === "dublicate" && (response?.data?.message === "Record Created Successfully")) {
            toast.success("Customer Dublicated Successfully");
            // Navigate('/dashboard/customers');
        } else if (response?.data?.message === "Record Created Successfully") {
            toast.success(response?.data?.message);
            // Navigate('/dashboard/customers');
        }
        else {
            toast.error(response?.data?.message);
        }

        // console.log("Create customer data from actions", response);
        dispatch({ type: CREATE_CUSTOMER_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_CUSTOMER_ERROR, payload: error.message });
        // console.log("Create customer error", error);
        // toast.error("Something went wrong Email Error");
    }
};


export const customersView = (queryParams) => async (dispatch) => {

    dispatch({ type: VIEW_CUSTOMER_REQUEST });
    try {
        const response = await axiosInstance.post(`/customer/view`,
            queryParams
        );

        dispatch({ type: VIEW_CUSTOMER_SUCCESS, payload: response.data });

        // console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: VIEW_CUSTOMER_ERROR, payload: error.message });
    }
};


export const customersList = (queryParams) => async (dispatch) => {
    console.log("customerList queryparams", queryParams)
    dispatch({ type: CUSTOMER_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`customers/list?is_customer=1`,
            queryParams
        );

        dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: response.data });

        // console.log("customer data from actions ", response.data);

    } catch (error) {
        dispatch({ type: CUSTOMER_LIST_ERROR, payload: error.message });
    }
};