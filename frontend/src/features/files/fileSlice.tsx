import type { IFile } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store.ts";
import { fetchFileGroupData } from "@/features/files/fileThunk.tsx";

interface filesState {
  files: IFile[];
  fetchingLoading: boolean;
  fetchError: boolean;
}

const initialState: filesState = {
  files: [],
  fetchingLoading: false,
  fetchError: false,
};

export const selectFile = (state: RootState) => state.files.files;

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileGroupData.pending, (state) => {
        state.fetchingLoading = true;
      })
      .addCase(fetchFileGroupData.fulfilled, (state, { payload: file }) => {
        state.fetchingLoading = false;
        state.files = file;
      })
      .addCase(fetchFileGroupData.rejected, (state) => {
        state.fetchError = true;
      });
  },
});

export const filesReducer = filesSlice.reducer;
