import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        incrementNumber: (state: any, action) => {
            return state + action.payload
        },
        decrementNumber: (state: any) => {
            return state - 1
        }
    }
});

export const { incrementNumber, decrementNumber } = counterSlice.actions;
export default counterSlice.reducer