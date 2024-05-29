import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    INVOICE_DETAIL_REQUEST,
    INVOICE_DETAIL_SUCCESS,
    INVOICE_DETAIL_ERROR,


    INVOICE_STATUS_REQUEST,
    INVOICE_STATUS_SUCCESS,
    INVOICE_STATUS_ERROR,

    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_SUCCESS,
    INVOICE_DELETE_ERROR,

    PENDING_INVOICES_REQUEST,
    PENDING_INVOICES_SUCCESS,
    PENDING_INVOICES_ERROR

} from "../Constants/invoiceConstants";

export const invoiceDetailes = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: INVOICE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/invoice/details`,
            queryParams,
        );

        dispatch({
            type: INVOICE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: INVOICE_DETAIL_ERROR, payload: error.message });
    }
};



export const invoicesStatus = (invoiceData, Navigate) => async (dispatch) => {
    // console.log("invoiceData", invoiceData)
    try {
        dispatch({ type: INVOICE_STATUS_REQUEST });

        const { data } = await axiosInstance.post(
            `/invoice/status`,
            invoiceData
        );

        dispatch({
            type: INVOICE_STATUS_SUCCESS,
            payload: {
                data
            },
        });
        console.log("data", data)
        if (data?.message === "Invoice Declined Updated Successfully") {
            toast.success(data?.message);
        } else if (data?.message === "Invoice Approved Updated Successfully") {
            toast.success(data?.message);
        } else {
            toast.error(data?.message);
        }

    } catch (error) {
        dispatch({ type: INVOICE_STATUS_ERROR, payload: error.message });
    }
};

export const invoicesDelete = (invoiceData, Navigate) => async (dispatch) => {
    // console.log("invoiceData", invoiceData)
    try {
        dispatch({ type: INVOICE_DELETE_REQUEST });

        const { data } = await axiosInstance.post(
            `/invoice/delete`,
            invoiceData
        );

        dispatch({
            type: INVOICE_DELETE_SUCCESS,
            payload: {
                data
            },
        });
        console.log("daaaaaaadaerfdfsdf", data)


        if (data?.message === "invoice is Approved. You can't delete this invoice.") {
            toast.error(data?.message);
        } else if (data?.message === "invoice deleted Successfully") {
            toast.success(data?.message);
            Navigate('/dashboard/invoice');
        }

    } catch (error) {
        dispatch({ type: INVOICE_DELETE_ERROR, payload: error.message });
    }
};



export const pendingInvoices = (quotationData, setInoiceData) => async (dispatch) => {
    // console.log("quotationData", quotationData)
    try {
        dispatch({ type: PENDING_INVOICES_REQUEST });

        const { data } = await axiosInstance.post(
            `/invoice/pending/customer`,
            quotationData
        );

        setInoiceData(data)
        dispatch({
            type: PENDING_INVOICES_SUCCESS,
            payload: {
                data
            },
        });


    } catch (error) {
        dispatch({ type: PENDING_INVOICES_ERROR, payload: error.message });
    }
};