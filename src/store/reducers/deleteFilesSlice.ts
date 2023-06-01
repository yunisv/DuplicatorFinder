import { createSlice } from '@reduxjs/toolkit';
import {deleteDuplicateFiles} from "./ActionCreator";

const deleteFilesSlice = createSlice({
    name: 'deleteFilesSlice',
    initialState: {
        success: false,
        isLoading: false,
        error: false
    },
    reducers: {
        deleteDuplicateFilesFetching(state: any) {
            state.isLoading = true
        },
        deleteDuplicateFilesFetchingSuccess(state: any, action) {
            state.isLoading = false
            state.success = action.payload
        },
        deleteDuplicateFilesFetchingError(state: any) {
            state.isLoading = false
            state.error = true
        }
    },
    extraReducers: {
        [deleteDuplicateFiles.pending.type]: (state) => {
            state.isLoading = true;
        },
        [deleteDuplicateFiles.fulfilled.type]: (state, action) => {
            state.error = false
            state.isLoading = false;
            state.success = action.payload
        },
        [deleteDuplicateFiles.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.success = false
        }
    }
});

export const { deleteDuplicateFilesFetching, deleteDuplicateFilesFetchingSuccess, deleteDuplicateFilesFetchingError } = deleteFilesSlice.actions;
export default deleteFilesSlice.reducer