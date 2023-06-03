import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        changeCounter: (state: any, action) => {
            return action.payload
        },
    }
});

export const { changeCounter } = counterSlice.actions;
export default counterSlice.reducer