import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    SALE_DETAIL_REQUEST,
    SALE_DETAIL_SUCCESS,
    SALE_DETAIL_ERROR,

    SALEORDER_STATUS_REQUEST,
    SALEORDER_STATUS_SUCCESS,
    SALEORDER_STATUS_ERROR,

    SALEORDER_DELETE_REQUEST,
    SALEORDER_DELETE_SUCCESS,
    SALEORDER_DELETE_ERROR,

} from "../Constants/saleOrderConstants";

export const saleOrderDetails = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: SALE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/sales-order/details`,
            queryParams,
        );

        dispatch({
            type: SALE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: SALE_DETAIL_ERROR, payload: error.message });
    }
};



export const saleOrderStatus = (saleOrderData, Navigate) => async (dispatch) => {
    // console.log("saleOrderData", saleOrderData)
    try {
        dispatch({ type: SALEORDER_STATUS_REQUEST });

        const { data } = await axiosInstance.post(
            `/sales-order/status`,
            saleOrderData
        );

        dispatch({
            type: SALEORDER_STATUS_SUCCESS,
            payload: {
                data
            },
        });
        // console.log("data", data?.message)
        if (data?.message === "Sales Order Declined Updated Successfully") {
            toast.success(data?.message);
        } else if (data?.message === "Sales Order Approved Updated Successfully") {
            toast.success(data?.message);
        } else {
            toast.error(data?.message);
        }
        // console.log("sale status", data)
    } catch (error) {
        dispatch({ type: SALEORDER_STATUS_ERROR, payload: error.message });
    }
};

export const saleOrderDelete = (saleOrderData, Navigate) => async (dispatch) => {
    // console.log("saleOrderData", saleOrderData)
    try {
        dispatch({ type: SALEORDER_DELETE_REQUEST });

        const { data } = await axiosInstance.post(
            `/sales-order/delete`,
            saleOrderData
        );

        dispatch({
            type: SALEORDER_DELETE_SUCCESS,
            payload: {
                data
            },
        });
        // console.log("sale delete", data)


        if (data?.message === "Sale Order deleted Successfully") {
            toast.success(data?.message);
            Navigate('/dashboard/sales-orders');
        } else {
            toast.error(data?.message);
        }

    } catch (error) {
        dispatch({ type: SALEORDER_DELETE_ERROR, payload: error.message });
        toast.error("Something went wrong sale order not deleted");

    }
};