import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAllFiles } from "@/features/files/fileThunk";
import { selectFile } from "@/features/files/fileSlice";
import { useEffect } from "react";

type Props = {
    selectedFileUrl: string | null;
    setSelectedFileUrl: (url: string | null) => void;
};

export const FolderList = ({ selectedFileUrl, setSelectedFileUrl }: Props) => {
    const dispatch = useAppDispatch();
    const files = useAppSelector(selectFile);

    useEffect(() => {
        dispatch(fetchAllFiles());
    }, [dispatch]);

    if (!files.length) return <div>Нет папок</div>;

    return (
        <div className="space-y-4 p-2">
            {files.map((file) => (
                <div
                    key={file.id}
                    onClick={() => setSelectedFileUrl(file.path)}
                    className={`cursor-pointer rounded-md border p-3 transition
                        ${
                        selectedFileUrl === file.path
                            ? 'border-blue-500 bg-blue-100'
                            : 'border-gray-300 hover:bg-gray-100'
                    }
                    `}
                    title={`${file.name} — папка: ${file.folder.name}`}
                >
                    <div className="text-sm text-gray-500 font-medium mb-1">📁 {file.folder.name}</div>
                    <div className="font-semibold text-gray-900 truncate">{file.name}</div>
                </div>
            ))}

        </div>
    );
};
