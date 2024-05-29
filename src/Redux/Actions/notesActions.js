import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    CREDIT_NOTE_DETAIL_REQUEST,
    CREDIT_NOTE_DETAIL_SUCCESS,
    CREDIT_NOTE_DETAIL_ERROR,

    CREDIT_NOTE_DELETE_REQUEST,
    CREDIT_NOTE_DELETE_SUCCESS,
    CREDIT_NOTE_DELETE_ERROR,

    DEBIT_DETAILS_REQUEST,
    DEBIT_DETAILS_SUCCESS,
    DEBIT_DETAILS_ERROR,

    DEBIT_NOTE_DELETE_REQUEST,
    DEBIT_NOTE_DELETE_SUCCESS,
    DEBIT_NOTE_DELETE_ERROR,
} from "../Constants/noteConstants";

export const creditNotesDetails = (queryParams) => async (dispatch) => {
    try {

        dispatch({ type: CREDIT_NOTE_DETAIL_REQUEST });

        const { data } = await axiosInstance.post(`/credit-note/details`,
            queryParams,
        );

        dispatch({
            type: CREDIT_NOTE_DETAIL_SUCCESS,
            payload: {
                data
            },
        });

        console.log("data from actions", data);
    } catch (error) {
        dispatch({ type: CREDIT_NOTE_DETAIL_ERROR, payload: error.message });
    }
};

export const creditNotesDelete = (queryParams, Navigate) => async (dispatch) => {
    try {

        dispatch({ type: CREDIT_NOTE_DELETE_REQUEST });

        const { data } = await axiosInstance.post(`/credit-note/delete`,
            queryParams,
        );
        if (data?.message === "Credit Note deleted Successfully") {
            toast.success(data?.message);
            Navigate("/dashboard/credit-notes");
        } else {
            toast.error(data?.message);
        }
        dispatch({
            type: CREDIT_NOTE_DELETE_SUCCESS,
            payload: {
                data
            },
        });


        console.log("delete from actions", data);
    } catch (error) {
        dispatch({ type: CREDIT_NOTE_DELETE_ERROR, payload: error.message });
    }
};

export const debitNotesDelete = (queryParams, Navigate) => async (dispatch) => {
    try {

        dispatch({ type: DEBIT_NOTE_DELETE_REQUEST });

        const { data } = await axiosInstance.post(`/debit-note/delete`,
            queryParams,
        );
        if (data?.message === "Debit Note deleted Successfully") {
            toast.success(data?.message);
            Navigate("/dashboard/debit-notes");
        } else {
            toast.error(data?.message);
        }
        dispatch({
            type: DEBIT_NOTE_DELETE_SUCCESS,
            payload: {
                data
            },
        });


        console.log("delete from actions", data);
    } catch (error) {
        dispatch({ type: DEBIT_NOTE_DELETE_ERROR, payload: error.message });
    }
};

export const debitNotesDetails = (queryParams, Navigate) => async (dispatch) => {
    try {

        dispatch({ type: DEBIT_DETAILS_REQUEST });

        const { data } = await axiosInstance.post(`/debit-note/details`,
            queryParams,
        );

        dispatch({
            type: DEBIT_DETAILS_SUCCESS,
            payload: {
                data
            },
        });


        // console.log("delete from actions", data);
    } catch (error) {
        dispatch({ type: DEBIT_DETAILS_ERROR, payload: error.message });
    }
};