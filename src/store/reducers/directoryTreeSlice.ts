import { createSlice } from '@reduxjs/toolkit';
import {fetchDirectoryTree, fetchList} from "./ActionCreator";

const initialState = {
    directoryTree: [],
    isLoading: false,
    error: false
};

const directoryTreeSlice = createSlice({
    name: 'directoryTreeSlice',
    initialState,
    reducers: {
        directoryTreeFetching(state: any) {
            state.isLoading = true
        },
        directoryTreeFetchingSuccess(state: any, action) {
            state.isLoading = false
            state.directoryTree = action.payload
        },
        directoryTreeFetchingError(state: any) {
            state.isLoading = false
            state.error = true
        }
    },
    extraReducers: {
        [fetchDirectoryTree.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchDirectoryTree.fulfilled.type]: (state, action) => {
            state.error = false
            state.isLoading = false;
            state.directoryTree = action.payload
        },
        [fetchDirectoryTree.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.directoryTree = []
        }
    }
});

export const { directoryTreeFetching, directoryTreeFetchingSuccess, directoryTreeFetchingError } = directoryTreeSlice.actions;
export default directoryTreeSlice.reducer