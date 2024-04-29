import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,

    CREATE_SUB_CATEGORY_REQUEST,
    CREATE_SUB_CATEGORY_SUCCESS,
    CREATE_SUB_CATEGORY_ERROR,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,

    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_ERROR,


    STATUS_CATEGORY_REQUEST,
    STATUS_CATEGORY_SUCCESS,
    STATUS_CATEGORY_ERROR,
} from '../Constants/categoriesConstants'

import axiosInstance from "../../Configs/axiosInstance";

export const createCategories = (queryParams) => async (dispatch) => {

    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/create/update`,
            queryParams
        );

        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: CREATE_CATEGORY_ERROR, payload: error.message });
    }
};

export const createSubCategories = (queryParams) => async (dispatch) => {

    dispatch({ type: CREATE_SUB_CATEGORY_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/create/update`,
            queryParams
        );

        dispatch({ type: CREATE_SUB_CATEGORY_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: CREATE_SUB_CATEGORY_ERROR, payload: error.message });
    }
};

export const subCategoriesList = (queryParams) => async (dispatch) => {

    dispatch({ type: SUB_CATEGORY_LIST_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/list`,
            queryParams
        );

        dispatch({ type: SUB_CATEGORY_LIST_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: SUB_CATEGORY_LIST_ERROR, payload: error.message });
    }
};

export const deleteCategories = (queryParams) => async (dispatch) => {

    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/delete`,
            queryParams
        );

        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: DELETE_CATEGORY_ERROR, payload: error.message });
    }
};
export const categoriesChangeStatus = (queryParams) => async (dispatch) => {

    dispatch({ type: STATUS_CATEGORY_REQUEST });
    try {
        const response = await axiosInstance.post(`/category/status`,
            queryParams
        );

        dispatch({ type: STATUS_CATEGORY_SUCCESS, payload: response.data });

        console.log("data from actions", response.data);

    } catch (error) {
        dispatch({ type: STATUS_CATEGORY_ERROR, payload: error.message });
    }
};
