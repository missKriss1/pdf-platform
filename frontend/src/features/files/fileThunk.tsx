import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IFile } from "@/types";
import axiosApi from "@/axiosApi.ts";

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
