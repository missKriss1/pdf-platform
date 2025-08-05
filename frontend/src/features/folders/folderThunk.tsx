import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IFolder} from "@/types";
import axiosApi from "@/axiosApi.ts";

export const fetchAllFolders = createAsyncThunk<IFolder[], void>(
    "folders/fetchAllFolders",
    async () => {
        const foldersResponse = await axiosApi<IFolder[]>('/folders');
        return foldersResponse.data || [];
    }
);