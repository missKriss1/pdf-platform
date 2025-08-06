import type { IFile, IFolder } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createFolderThunk,
  fetchAllFoldersWithFiles,
  fetchFilesInFolder,
} from "@/features/folders/folderThunk.tsx";
import type { RootState } from "@/app/store.ts";

interface foldersState {
  folders: IFolder[];
  files: IFile[];
  fetchingLoading: boolean;
  fetchError: boolean;
  creating: boolean;
}

const initialState: foldersState = {
  folders: [],
  files: [],
  fetchingLoading: false,
  fetchError: false,
  creating: false,
};

export const selectFolder = (state: RootState) => state.folders.folders;
export const selectFolderFiles = (state: RootState) => state.folders.files;

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFolderThunk.pending, (state) => {
        state.creating = true;
      })
      .addCase(createFolderThunk.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createFolderThunk.rejected, (state) => {
        state.creating = false;
      })
      .addCase(fetchFilesInFolder.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchFilesInFolder.fulfilled, (state, action) => {
        state.files = action.payload;
        state.fetchingLoading = false;
      })
      .addCase(fetchFilesInFolder.rejected, (state) => {
        state.fetchingLoading = false;
      })
      .addCase(fetchAllFoldersWithFiles.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(
        fetchAllFoldersWithFiles.fulfilled,
        (state, { payload: folder }) => {
          state.fetchingLoading = false;
          state.folders = folder;
        },
      )
      .addCase(fetchAllFoldersWithFiles.rejected, (state) => {
        state.fetchError = true;
      });
  },
});

export const foldersReducer = foldersSlice.reducer;
