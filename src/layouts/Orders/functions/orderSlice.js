
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeRow: {}
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setActiveRow: (state, { payload }) => {
            state.activeRow = payload
        }
    },
});

export const {  setActiveRow } = orderSlice.actions;
export default orderSlice;
