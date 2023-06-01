import { createSlice } from '@reduxjs/toolkit';

const searchInputSlice = createSlice({
    name: 'searchInputSlice',
    initialState: '',
    reducers: {
        changeSearchInputValue: (state: any, action) => {
            return action.payload
        }
    }
});

export const { changeSearchInputValue } = searchInputSlice.actions;
export default searchInputSlice.reducer