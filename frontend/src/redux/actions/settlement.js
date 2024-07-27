import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi, postApi } from "../apis";
import { getQueryFromObject } from "../../utils";
export const addSettlementAction = createAsyncThunk(
    'settlement/addSettlement',
    async (data, { rejectWithValue }) => {
        try {
            const response = await postApi(`/api/settlement`, data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getSettlementAction = createAsyncThunk(
    'settlement/getSettlement',
    async (queryObj, { rejectWithValue }) => {
        try {
            const query = getQueryFromObject(queryObj);
            const response = await getApi(`/api/settlement${query}`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
