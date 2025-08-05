import type {IFolder} from "@/types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllFolders} from "@/features/folders/folderThunk.tsx";
import type {RootState} from "@/app/store.ts";

interface foldersState{
    folders: IFolder[];
    fetchingLoading: boolean,
    fetchError: boolean,
}

const initialState: foldersState = {
    folders: [],
    fetchingLoading: false,
    fetchError: false,
}

export const selectFolder = (state: RootState) => state.folders.folders

const foldersSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFolders.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchAllFolders.fulfilled, (state, {payload: folder}) => {
                state.fetchingLoading = false;
                state.folders = folder;
            })
            .addCase(fetchAllFolders.rejected, (state) => {
                state.fetchError = true;
            })

    }
})

export const foldersReducer = foldersSlice.reducer