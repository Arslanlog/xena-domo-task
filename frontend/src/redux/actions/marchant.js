import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../apis";

export const getMerchantAction = createAsyncThunk(
    'merchant/getSettlement',
    async (queryObj, { rejectWithValue }) => {
        // try {
        //     const response = await getApi(`/api/merchants`);
        //     return response.data;
        // } catch (error) {
        //     if (!error.response) {
        //         throw error;
        //     }
        //     return rejectWithValue(error?.response?.data);
        // }

        return {
            data: [
                {
                    id: "1",
                    name: "merchant 1",
                },
                {
                    id: "2",
                    name: "merchant 2",
                },
                {
                    id: "3",
                    name: "merchant 3",
                }
            ]
        }
    }
);
