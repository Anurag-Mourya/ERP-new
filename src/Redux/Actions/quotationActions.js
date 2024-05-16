import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    QUOTATION_DETAIL_REQUEST,
    QUOTATION_DETAIL_SUCCESS,
    QUOTATION_DETAIL_ERROR,

    QUOTATION_UPDATE_REQUEST,
    QUOTATION_UPDATE_SUCCESS,
    QUOTATION_UPDATE_ERROR,

    QUOTATION_STATUS_REQUEST,
    QUOTATION_STATUS_SUCCESS,
    QUOTATION_STATUS_ERROR,

    QUOTATION_DELETE_REQUEST,
    QUOTATION_DELETE_SUCCESS,
    QUOTATION_DELETE_ERROR,
} from "../Constants/quotationConstants";

export const quotationDetails = (queryParams, Navigate) => async (dispatch) => {
    try {
        dispatch({ type: QUOTATION_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(
            '/quotations/details',
            queryParams
        );

        dispatch({
            type: QUOTATION_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: QUOTATION_DETAIL_ERROR, payload: error.message });
    }
};

export const updateQuotation = (quotationData, Navigate) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: QUOTATION_UPDATE_REQUEST });

        const { data } = await axiosInstance.post(
            `/sales/create/update`,
            quotationData
        );

        dispatch({
            type: QUOTATION_UPDATE_SUCCESS,
            payload: {
                data
            },
        });

        toast.success("data from actions", data);

        setTimeout(() => {
            Navigate('/dashboard/quotation');
        }, 500);
    } catch (error) {
        dispatch({ type: QUOTATION_UPDATE_ERROR, payload: error.message });
    }
};



export const updateCreditNote = (quotationData, Navigate) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: QUOTATION_UPDATE_REQUEST });

        const { data } = await axiosInstance.post(
            `/credit-debit/create/update`,
            quotationData
        );

        dispatch({
            type: QUOTATION_UPDATE_SUCCESS,
            payload: {
                data
            },
        });

        toast.success("data from actions", data);

        setTimeout(() => {
            Navigate('/dashboard/quotation');
        }, 500);
    } catch (error) {
        dispatch({ type: QUOTATION_UPDATE_ERROR, payload: error.message });
    }
};



export const updatePaymentRec = (quotationData, Navigate) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: QUOTATION_UPDATE_REQUEST });

        const { data } = await axiosInstance.post(
            `/payment/create/update`,
            quotationData
        );

        dispatch({
            type: QUOTATION_UPDATE_SUCCESS,
            payload: {
                data
            },
        });

        toast.success("data from actions", data);

        setTimeout(() => {
            Navigate('/dashboard/quotation');
        }, 500);
    } catch (error) {
        dispatch({ type: QUOTATION_UPDATE_ERROR, payload: error.message });
    }
};


export const quotationStatus = (quotationData, Navigate) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: QUOTATION_STATUS_REQUEST });

        const { data } = await axiosInstance.post(
            `/quotation/status`,
            quotationData
        );

        dispatch({
            type: QUOTATION_STATUS_SUCCESS,
            payload: {
                data
            },
        });
        console.log("data", data)
        if (data?.message === "Quotation Declined Updated Successfully") {
            toast.success(data?.message);
        } else if (data?.message === "Quotation Approved Updated Successfully") {
            toast.success(data?.message);
        } else {
            toast.error(data?.message);
        }

    } catch (error) {
        dispatch({ type: QUOTATION_STATUS_ERROR, payload: error.message });
    }
};

export const quotationDelete = (quotationData, Navigate) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: QUOTATION_DELETE_REQUEST });

        const { data } = await axiosInstance.post(
            `/quotation/delete`,
            quotationData
        );

        dispatch({
            type: QUOTATION_DELETE_SUCCESS,
            payload: {
                data
            },
        });
        console.log("daaaaaaadaerfdfsdf", data)


        if (data?.message === "Quotation is Approved. You can't delete this quotation.") {
            toast.error(data?.message);
        } else if (data?.message === "Quotation deleted Successfully") {
            toast.success(data?.message);
            Navigate('/dashboard/quotation');
        }

    } catch (error) {
        dispatch({ type: QUOTATION_DELETE_ERROR, payload: error.message });
    }
};


