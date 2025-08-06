import axiosApi from "@/axiosApi.ts";
import { useAppSelector } from "@/app/hooks.ts";
import { selectFile } from "@/features/files/fileSlice.tsx";

type Props = {
  fileUrl: string;
};

export const PreviewPDF = ({ fileUrl }: Props) => {
  const baseUrl = axiosApi.defaults.baseURL;
  const fullUrl = `${baseUrl}/${fileUrl}`;
  const files = useAppSelector(selectFile);

  const currentFile = files.find((file) => file.path === fileUrl);

  return (
    <div className="w-[1100px] h-[850px] border rounded shadow overflow-hidden flex flex-col">
      <div className="p-2 font-semibold text-gray-800">
        {currentFile ? currentFile.name : "Неизвестный файл"}
      </div>
      <div className="flex-1">
        <embed
          src={fullUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
