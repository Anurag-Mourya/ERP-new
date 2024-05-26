import toast from 'react-hot-toast';
import axiosInstance from '../../Configs/axiosInstance';
import {
    EXPENSE_LIST_REQUEST,
    EXPENSE_LIST_SUCCESS,
    EXPENSE_LIST_ERROR,

    // EXPENSE_DETAILS_REQUEST,
    // EXPENSE_DETAILS_SUCCESS,
    // EXPENSE_DETAILS_ERROR,

    EXPENSE_CREATE_REQUEST,
    EXPENSE_CREATE_SUCCESS,
    EXPENSE_CREATE_ERROR,
} from '../Constants/expenseConstants.js';

export const expenseLists = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: EXPENSE_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/list`,
            queryParams
        );

        dispatch({ type: EXPENSE_LIST_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: EXPENSE_LIST_ERROR, payload: error.message });
    }
};

export const createExpenses = (queryParams) => async (dispatch) => {
    // console.log("queryParams", queryParams)
    dispatch({ type: EXPENSE_CREATE_REQUEST });
    try {
        const response = await axiosInstance.post(`/expense/create/update`,
            queryParams
        );

        dispatch({ type: EXPENSE_CREATE_SUCCESS, payload: response.data });

    } catch (error) {
        dispatch({ type: EXPENSE_CREATE_ERROR, payload: error.message });
    }
};