import { createSlice } from '@reduxjs/toolkit';

const speedometerSlice = createSlice({
    name: 'speedometerSlice',
    initialState: 0,
    reducers: {
        changeSpeedometerValue: (state: any, action) => {
            return action.payload
        }
    }
});

export const { changeSpeedometerValue } = speedometerSlice.actions;
export default speedometerSlice.reducer