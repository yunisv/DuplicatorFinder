import { createSlice } from '@reduxjs/toolkit';
import {openFile} from "./ActionCreator";

const openFileSlice = createSlice({
    name: 'openFileSlice',
    initialState: {
        success: false,
        isLoading: false,
        error: false
    },
    reducers: {
        openFilesFetching(state: any) {
            state.isLoading = true
        },
        openFilesFetchingSuccess(state: any, action) {
            state.isLoading = false
            state.success = action.payload
        },
        openFilesFetchingError(state: any) {
            state.isLoading = false
            state.error = true
        }
    },
    extraReducers: {
        [openFile.pending.type]: (state) => {
            state.isLoading = true;
        },
        [openFile.fulfilled.type]: (state, action) => {
            state.error = false
            state.isLoading = false;
            state.success = action.payload
        },
        [openFile.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.success = false
        }
    }
});

export const { openFilesFetching, openFilesFetchingSuccess, openFilesFetchingError } = openFileSlice.actions;
export default openFileSlice.reducer