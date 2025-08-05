import type {IFile, IFolder} from "@/types";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "@/app/store.ts";
import {fetchAllFiles, fetchByIdFiles} from "@/features/files/fileThunk.tsx";

interface filesState{
    files: IFile[];
    folders: IFolder[];
    fetchingLoading: boolean,
    fetchError: boolean,
}

const initialState: filesState = {
    files: [],
    folders: [],
    fetchingLoading: false,
    fetchError: false,
}

export const selectFile = (state: RootState) => state.files.files
export const selectSubFolders = (state: RootState) => state.files.folders

const filesSlice = createSlice({
    name: "files",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchByIdFiles.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchByIdFiles.fulfilled, (state, action) => {
                state.fetchingLoading = false;
                state.files = action.payload.files;
                state.folders = action.payload.folders;
            })
            .addCase(fetchByIdFiles.rejected, (state) => {
                state.fetchError = true;
            })
            .addCase(fetchAllFiles.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchAllFiles.fulfilled, (state, {payload: file}) => {
                state.fetchingLoading = false;
                state.files = file;
            })
            .addCase(fetchAllFiles.rejected, (state) => {
                state.fetchError = true;
            })


    }
})

export const filesReducer = filesSlice.reducer