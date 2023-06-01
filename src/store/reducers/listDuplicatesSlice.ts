import { createSlice } from '@reduxjs/toolkit';
import {fetchList} from "./ActionCreator";

const initialState = {
    dataDuplicate: {
        listDuplicateFiles: [],
        duplicate_count: 0
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
        },
        [fetchList.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.dataDuplicate.listDuplicateFiles = []
            state.dataDuplicate.duplicate_count = 0
        }
    }
});

export const { changeSearchInputValue, listFetching, listFetchingSuccess, listFetchingError } = listDuplicateSlice.actions;
export default listDuplicateSlice.reducer