import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd"
import { addSettlementAction, getSettlementAction } from "../actions/settlement";

const initialState = {
    data: [],
    total: 0,
    error: null,
    isLoading: false,
    addLoading: false,
}

const SettlementSlice = createSlice({
    name: "settlement",
    initialState,
    reducers: {
        // to clear settlement slice
        clearSettlements: (state, action) => {
            return {
                ...initialState,
            }
        }
    },
    extraReducers: (builder) => {
        // Get Settlement
        builder.addCase(getSettlementAction.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getSettlementAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload?.data || [];
            state.total = action.payload?.total;
        })
        builder.addCase(getSettlementAction.rejected, (state, action) => {
            const error = action.payload?.errors || action.payload;
            message.error(error?.[0]?.msg || error?.message || "Unknown Error");
            state.isLoading = false;
            state.error = error;
        })

        // Add Settlement
        builder.addCase(addSettlementAction.pending, (state, action) => {
            state.addLoading = true;
            state.error = null;
        })
        builder.addCase(addSettlementAction.fulfilled, (state, action) => {
            state.addLoading = false;
            message.success("Settlement Added Successfully!");
        })
        builder.addCase(addSettlementAction.rejected, (state, action) => {
            const error = action.payload?.errors || action.payload;
            message.error(error?.[0]?.msg || error?.message || "Unknown Error");
            state.addLoading = false;
            state.error = error;
        })
    }
})

export default SettlementSlice;
export const { clearSettlements } = SettlementSlice.actions;