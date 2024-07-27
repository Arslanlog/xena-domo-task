import { createSlice } from "@reduxjs/toolkit";
import { getMerchantAction } from "../actions/marchant";

const initialState = {
    data: [],
    error: null,
    isLoading: false,
}

const MerchantSlice = createSlice({
    name: "merchant",
    initialState,
    reducers: {
        // to clear merchant slice
        clearMerchant: (state, action) => {
            return {
                ...initialState,
            }
        }
    },
    extraReducers: (builder) => {
        // Get Settlement
        builder.addCase(getMerchantAction.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getMerchantAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload?.data || [];
        })
        builder.addCase(getMerchantAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.errors || action.payload;
        })
    }
})

export default MerchantSlice;
export const { clearMerchant } = MerchantSlice.actions;