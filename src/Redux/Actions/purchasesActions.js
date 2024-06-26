import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    PURCHASES_CREATE_REQUEST,
    PURCHASES_CREATE_SUCCESS,
    PURCHASES_CREATE_ERROR,

    PURCHASES_DETAIL_REQUEST,
    PURCHASES_DETAIL_SUCCESS,
    PURCHASES_DETAIL_ERROR,

    PURCHASES_DELETE_REQUEST,
    PURCHASES_DELETE_SUCCESS,
    PURCHASES_DELETE_ERROR,
} from '../Constants/purchasesConstants.js';


export const createPurchases = (queryParams, Navigate, section, editDub) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    // console.log("Navigate", Navigate)
    console.log("section", section)
    console.log("editDub", editDub)
    dispatch({ type: PURCHASES_CREATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase/create/update`,
            queryParams
        );

        dispatch({ type: PURCHASES_CREATE_SUCCESS, payload: response.data });

        if (response?.data?.message === "Transaction Created Successfully") {
            // toast.success(response?.data?.message)
            if (section === "bills") {
                Navigate("/dashboard/bills");
            }

            if (section === "purchse" && editDub === "edit") {
                toast.success("Purchses Updated Successfully");
                // Navigate("/dashboard/purchase");
            } else if (section === "purchse" && editDub === "dublicate") {
                toast.success("Purchses Dublcated Successfully");
            } else if (section === "purchse" && !editDub) {
                toast.success(response?.data?.message)
            }
        } else {
            toast.error(response?.data?.message)
        }

    } catch (error) {
        dispatch({ type: PURCHASES_CREATE_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};


export const purchasesDetails = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: PURCHASES_DETAIL_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase-order/details`,
            queryParams
        );

        dispatch({ type: PURCHASES_DETAIL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: PURCHASES_DETAIL_ERROR, payload: error.message });
    }
};


export const purchasesDelete = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: PURCHASES_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/purchase-order/delete`,
            queryParams
        );

        dispatch({ type: PURCHASES_DELETE_SUCCESS, payload: response.data });

        if (response?.data?.message === "Transaction Created Successfully") {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }

    } catch (error) {
        dispatch({ type: PURCHASES_DELETE_ERROR, payload: error.message });
        toast.error(response?.data?.message)
    }
};