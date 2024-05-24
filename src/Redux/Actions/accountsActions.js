import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    CREATE_JOURNAL_REQUEST,
    CREATE_JOURNAL_SUCCESS,
    CREATE_JOURNAL_ERROR,

    GET_ACCOUNT_TYPE_REQUEST,
    GET_ACCOUNT_TYPE_SUCCESS,
    GET_ACCOUNT_TYPE_ERROR,

    CREATE_ACCOUNT_TYPE_ERROR,
    CREATE_ACCOUNT_TYPE_REQUEST,
    CREATE_ACCOUNT_TYPE_SUCCESS,

    ACCOUNT_STATUS_REQUEST,
    ACCOUNT_STATUS_SUCCESS,
    ACCOUNT_STATUS_ERROR,

    ACCOUNT_DELETE_REQUEST,
    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_ERROR,
} from '../Constants/accountConstants';

export const createJournals = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: CREATE_JOURNAL_REQUEST });
    try {
        const response = await axiosInstance.post(`/journal/create/update`,
            queryParams
        );
        // console.log("response", response)
        if (response?.data?.message === 'Journal Created Successfully') {
            toast.success(response?.data?.message)
        } else if (response?.data?.message === "Journal Updated Successfully") {
            toast.success(response?.data?.message)

        } else {
            toast.error(response?.data?.message)
        }


        dispatch({ type: CREATE_JOURNAL_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: CREATE_JOURNAL_ERROR, payload: error.message });
        console.log("response", error.message)
        toast.error(response?.data?.message)

    }
};

export const getAccountTypes = (queryParams) => async (dispatch) => {
    dispatch({ type: GET_ACCOUNT_TYPE_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/type/list`,
            queryParams
        );
        dispatch({ type: GET_ACCOUNT_TYPE_SUCCESS, payload: response.data });
        // console.log("account type", response)
    } catch (error) {
        dispatch({ type: GET_ACCOUNT_TYPE_ERROR, payload: error.message });
        console.log("response", error.message)
        toast.error(response?.data?.message)

    }
};

export const createAccounts = (queryParams) => async (dispatch) => {
    console.log("createAccounts queryParams", queryParams)
    dispatch({ type: CREATE_ACCOUNT_TYPE_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/create/update`,
            queryParams
        );
        dispatch({ type: CREATE_ACCOUNT_TYPE_SUCCESS, payload: response.data });

        if (response?.data?.message === "Account Added Successfully") {
            toast.success(response?.data?.message);
        } else if (response?.data?.message === "Account Updated Successfully") {
            toast.success(response?.data?.message);
        } else {
            toast.error(response?.data?.message);

        }

    } catch (error) {
        dispatch({ type: CREATE_ACCOUNT_TYPE_ERROR, payload: error.message });
        toast.error("Error while creating account")

    }
};

export const accountStatus = (queryParams) => async (dispatch) => {
    console.log("queryParams status", queryParams)
    dispatch({ type: ACCOUNT_STATUS_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/status`,
            queryParams
        );
        dispatch({ type: ACCOUNT_STATUS_SUCCESS, payload: response.data });

        if (response?.data?.message === "Status Updated successfully.") {
            toast.success(response?.data?.message);
        } else {
            toast.error(response?.data?.message);
        }

    } catch (error) {
        dispatch({ type: ACCOUNT_STATUS_ERROR, payload: error.message });
        toast.error("Error while creating account")

    }
};

export const accountDelete = (queryParams) => async (dispatch) => {
    console.log("queryParams delete", queryParams)
    dispatch({ type: ACCOUNT_DELETE_REQUEST });
    try {
        const response = await axiosInstance.post(`/accounts/delete`,
            queryParams
        );
        dispatch({ type: ACCOUNT_DELETE_SUCCESS, payload: response.data });

        if (response?.data?.message === "Account Deleted Successfully") {
            toast.success(response?.data?.message);
        } else {
            toast.error(response?.data?.message);
        }

    } catch (error) {
        dispatch({ type: ACCOUNT_DELETE_ERROR, payload: error.message });
        toast.error("Error while creating account")

    }
};
