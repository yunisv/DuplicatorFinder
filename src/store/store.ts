import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter";
import speedometerReducer from "./reducers/speedometerSlice";
import searchInputReducer from "./reducers/searchInputSlice"
import listDuplicateSlice from "./reducers/listDuplicatesSlice";
import deleteFilesSlice from "./reducers/deleteFilesSlice"

const store = configureStore({
    reducer: {
        counter: counterReducer,
        speedometerValue: speedometerReducer,
        searchInput: searchInputReducer,
        listDuplicate: listDuplicateSlice,
        deleteDuplicateFiles: deleteFilesSlice
    },
});

export default store