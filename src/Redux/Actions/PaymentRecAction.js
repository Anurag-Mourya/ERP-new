import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    PAYMENT_CREATE_REQUEST,
    PAYMENT_CREATE_SUCCESS,
    PAYMENT_CREATE_ERROR,

    PAYMENT_DETAIL_REQUEST,
    PAYMENT_DETAIL_SUCCESS,
    PAYMENT_DETAIL_ERROR,

    PAYMENT_DELETE_REQUEST,
    PAYMENT_DELETE_SUCCESS,
    PAYMENT_DELETE_ERROR,

} from '../Constants/paymentConstatnt';


export const updatePaymentRec = (quotationData, Navigate) => async (dispatch) => {
    console.log("quotationData", quotationData)
    try {
        dispatch({ type: PAYMENT_CREATE_REQUEST });

        const { data } = await axiosInstance.post(
            `/payment/create/update`,
            quotationData
        );

        dispatch({
            type: PAYMENT_CREATE_SUCCESS,
            payload: {
                data
            },
        });

        if (data?.message === "Payment has been added.") {
            toast.success(data?.message);
            Navigate("/dashboard/payment-recieved")
        } else {
            toast.error(data?.message);
        }


    } catch (error) {
        dispatch({ type: PAYMENT_CREATE_ERROR, payload: error.message });
    }
};


export const paymentRecDetail = (quotationData, Navigate) => async (dispatch) => {
    console.log("quotationData", quotationData)
    try {
        dispatch({ type: PAYMENT_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            `/payments/details`,
            quotationData
        );

        dispatch({
            type: PAYMENT_DETAIL_SUCCESS,
            payload: {
                data
            },
        });


    } catch (error) {
        dispatch({ type: PAYMENT_DETAIL_ERROR, payload: error.message });
    }
};


export const paymentRecDelete = (quotationData, Navigate) => async (dispatch) => {
    console.log("quotationData", quotationData)
    try {
        dispatch({ type: PAYMENT_DELETE_REQUEST });

        const { data } = await axiosInstance.post(
            `/payments/delete`,
            quotationData
        );

        dispatch({
            type: PAYMENT_DELETE_SUCCESS,
            payload: {
                data
            },
        });

        // console.log("delete", data)
        if (data?.message === "Payment Deleted Successfully") {
            toast.success(data?.message);
            Navigate("/dashboard/payment-recieved");
        } else {
            toast.error(data?.message);
        }

        setTimeout(() => {
            Navigate('/dashboard/payment-recieved');
        }, 500);
    } catch (error) {
        dispatch({ type: PAYMENT_DELETE_ERROR, payload: error.message });
    }
};


export const paymentRecStatus = (quotationData, Navigate) => async (dispatch) => {
    console.log("quotationData", quotationData)
    try {
        dispatch({ type: PAYMENT_STATUS_REQUEST });

        const { data } = await axiosInstance.post(
            `/payments/status`,
            quotationData
        );

        dispatch({
            type: PAYMENT_STATUS_SUCCESS,
            payload: {
                data
            },
        });

        toast.success("data from actions", data);

        setTimeout(() => {
            Navigate('/dashboard/payment-recieved');
        }, 500);
    } catch (error) {
        dispatch({ type: PAYMENT_STATUS_ERROR, payload: error.message });
    }
};