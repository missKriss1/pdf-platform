import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectFile } from "@/features/files/fileSlice";
import { useEffect } from "react";
import { fetchAllFiles } from "@/features/files/fileThunk";

type Props = {
    selectedFileUrl: string | null;
    setSelectedFileUrl: (url: string | null) => void;
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const FileList = ({ selectedFileUrl, setSelectedFileUrl }: Props) => {
    const dispatch = useAppDispatch();
    const files = useAppSelector(selectFile);

    useEffect(() => {
        dispatch(fetchAllFiles());
    }, [dispatch]);

    if (!files.length)
        return (
            <div className="text-center text-gray-500 mt-6">
                Нет файлов для отображения
            </div>
        );

    return (
        <div className="space-y-4 p-2">
            <div className="space-y-3">
                {files.map((file) => (
                    <div
                        key={file.id}
                        onClick={() => setSelectedFileUrl(file.path)}
                        className={`flex items-center justify-between p-3 border rounded-md cursor-pointer 
                            ${
                            selectedFileUrl === file.path
                                ? 'bg-blue-200 border-blue-400'
                                : 'hover:bg-gray-100 border-transparent'
                        }
                        `}
                        title={`Загружен: ${formatDate(file.uploadedAt)}`}
                    >
                        <div className="flex items-center space-x-2 truncate">
                            <span className="text-xl">📄</span>
                            <span className="font-medium text-gray-900 truncate">
                                {file.name}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 whitespace-nowrap">
                            {formatDate(file.uploadedAt)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileList;
