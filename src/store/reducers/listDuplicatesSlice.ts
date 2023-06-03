import { createSlice } from '@reduxjs/toolkit';
import {fetchList} from "./ActionCreator";

const initialState = {
    dataDuplicate: {
        listDuplicateFiles: [],
        duplicate_count: 0,
        total_files: 0,
        duplicate_percentage: 0.0,
        duration: 0.000
    },
    isLoading: false,
    error: false
};

const listDuplicateSlice = createSlice({
    name: 'listDuplicateSlice',
    initialState,
    reducers: {
        changeSearchInputValue: (state: any, action) => {
            return action.payload
        },
        listFetching(state: any) {
            state.isLoading = true
        },
        listFetchingSuccess(state: any, action) {
            state.isLoading = false
            state.dataDuplicate.listDuplicateFiles = action.payload.list_of_files
            state.dataDuplicate.duplicate_count = action.payload.duplicate_count
            state.dataDuplicate.total_files = action.payload.total_files
            state.dataDuplicate.duplicate_percentage = action.payload.duplicate_percentage
            state.dataDuplicate.duration = action.payload.duration
        },
        listFetchingError(state: any) {
            state.isLoading = false
            state.error = true
        }
    },
    extraReducers: {
        [fetchList.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchList.fulfilled.type]: (state, action) => {
            state.error = false
            state.isLoading = false;
            state.dataDuplicate.listDuplicateFiles = action.payload.list_of_files
            state.dataDuplicate.duplicate_count = action.payload.duplicate_count
            state.dataDuplicate.total_files = action.payload.total_files
            state.dataDuplicate.duplicate_percentage = action.payload.duplicate_percentage
            state.dataDuplicate.duration = action.payload.duration
        },
        [fetchList.rejected.type]: (state) => {
            state.isLoading = false;
            state.error = true;
            state.dataDuplicate.listDuplicateFiles = []
            state.dataDuplicate.duplicate_count = 0
            state.dataDuplicate.total_files = 0
            state.dataDuplicate.duplicate_percentage = 0
            state.dataDuplicate.duration = 0
        }
    }
});

export const { changeSearchInputValue, listFetching, listFetchingSuccess, listFetchingError } = listDuplicateSlice.actions;
export default listDuplicateSlice.reducer