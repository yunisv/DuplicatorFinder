import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchList = createAsyncThunk('listDuplicates/fetchList', async (path: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/getDuplicateFiles?dir=${path}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const fetchDirectoryTree = createAsyncThunk('listDuplicates/directoryTreeFetch', async (path: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/getDirectoryTree?dir_path=${path}`);
        console.log(response.data)
        return [response.data];
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const openFile = createAsyncThunk('listDuplicates/openFile', async ( {path, successFunc, errorFunc}: OpenFilesPayload) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/openFile?file_dir=${path}`);
        console.log(response.data);
        successFunc()
    } catch (error: any) {
        errorFunc()
        throw new Error(error.message);
    }
});

interface DeleteDuplicateFilesPayload {
    fileUrls: string[];
    successFunc: () => void;
    errorFunc: () => void;
}

interface OpenFilesPayload {
    path: string,
    successFunc: () => void;
    errorFunc: () => void;
}
export const deleteDuplicateFiles = createAsyncThunk('listDuplicates/deleteDuplicateFiles', async ({fileUrls, successFunc, errorFunc}: DeleteDuplicateFilesPayload) => {
    try {
        await axios.post('http://127.0.0.1:5000/deleteSelectedFiles', fileUrls)
            .then(response => {
                // Обработка успешного ответа
                console.log(response.data);
                successFunc()
            })
            .catch(error => {
                // Обработка ошибки
                errorFunc()
                console.error(error);
            });
    } catch (error: any) {
        errorFunc()
        throw new Error(error.message);
    }
});