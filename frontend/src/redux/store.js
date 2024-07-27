import { configureStore } from '@reduxjs/toolkit';
import Settlement from "./slices/settlement"
import Merchant from "./slices/merchant"
const store = configureStore({
    reducer: {
        settlement: Settlement.reducer,
        merchant: Merchant.reducer,
    }
})
export default store;