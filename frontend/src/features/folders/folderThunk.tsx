import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IFile, IFolder, IFolderMutation } from "@/types";
import axiosApi from "@/axiosApi.ts";

export const createFolderThunk = createAsyncThunk<void, IFolderMutation>(
  "folders/createFolderThunk",
  async (folderName) => {
    await axiosApi.post("/folders", { ...folderName });
  },
);

export const fetchFilesInFolder = createAsyncThunk<IFile[], string>(
  "folders/fetchFilesInFolder",
  async (folderId: string) => {
    const response = await axiosApi.get<IFile[]>(`/folders/${folderId}/files`);
    return response.data;
  },
);
export const fetchAllFoldersWithFiles = createAsyncThunk<IFolder[], void>(
  "folders/fetchAllFoldersWithFiles",
  async () => {
    const response = await axiosApi<IFolder[]>("/folders/with-files");
    return response.data || [];
  },
);
