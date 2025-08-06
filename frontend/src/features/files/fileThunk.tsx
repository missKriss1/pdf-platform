import { createAsyncThunk } from "@reduxjs/toolkit";
import type {IFile, IFileMutation} from "@/types";
import axiosApi from "@/axiosApi.ts";
import type {AxiosError} from "axios";

export const fetchFileGroupData = createAsyncThunk<IFile[], void>(
  "files/fetchFileGroupData",
  async () => {
    const response = await axiosApi<Record<string, IFile[]>>(
      "/files/grouped-by-date",
    );
    const grouped = response.data;

    const flatFiles = Object.values(grouped).flat();
    return flatFiles;
  },
);

export const uploadFileThunk = createAsyncThunk<
    { message: string; file: IFile },
    IFileMutation,
    {
        rejectValue: string;
    }
>(
    'files/upload',
    async ({ file, folderId, name }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderId', folderId.toString());
            if (name) formData.append('name', name);

            const response = await axiosApi.post('/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return err.response?.data?.message || "Ошибка при загрузки файла";
        }
    }
);