import {createAsyncThunk} from "@reduxjs/toolkit";
import type {FolderContent, IFile} from "@/types";
import axiosApi from "@/axiosApi.ts";

export const fetchAllFiles = createAsyncThunk<IFile[], void>(
    'files/fetchAllFiles',
    async () => {
        const fileResponse = await axiosApi<IFile[]>('/files');
        return fileResponse.data || [];
    }
)
export const fetchByIdFiles = createAsyncThunk<FolderContent, number>(
    "files/fetchByIdFiles",
    async (id) => {
        const response = await axiosApi<FolderContent>(`/files/folder/${id}`);
        console.log("THUNK fetchByIdFiles called with:", id);
        return response.data;
    }
);