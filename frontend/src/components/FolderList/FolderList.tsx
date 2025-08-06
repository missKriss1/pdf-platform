import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchAllFoldersWithFiles } from "@/features/folders/folderThunk";
import {
  selectFolder,
  selectFolderFiles,
} from "@/features/folders/foldersSlice";
import { fetchFilesInFolder } from "@/features/folders/folderThunk";
import { useEffect } from "react";

type Props = {
  selectedFolderId: string | null;
  setSelectedFolderId: (id: string | null) => void;
  setSelectedFileUrl: (url: string | null) => void;
};

export const FolderList = ({
  selectedFolderId,
  setSelectedFolderId,
  setSelectedFileUrl,
}: Props) => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(selectFolder);
  const filesInFolder = useAppSelector(selectFolderFiles);

  useEffect(() => {
    dispatch(fetchAllFoldersWithFiles());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFolderId) {
      dispatch(fetchFilesInFolder(selectedFolderId));
    }
  }, [dispatch, selectedFolderId]);

  if (!folders.length)
    return <div className="p-4 text-gray-500">Нет папок</div>;

  return (
    <div className="space-y-2 p-2">
      {folders.map((folder) => (
        <div key={folder.id} className="border rounded-md overflow-hidden">
          <div
            onClick={() =>
              setSelectedFolderId(
                selectedFolderId === folder.id ? null : folder.id,
              )
            }
            className={`cursor-pointer p-3 transition flex justify-between items-center
                            ${selectedFolderId === folder.id ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"}
                        `}
          >
            <div className="flex items-center">
              <span className="mr-2">📁</span>
              <span className="font-medium">{folder.name}</span>
            </div>
            <span className="text-gray-400">
              {selectedFolderId === folder.id ? "▼" : "▶"}
            </span>
          </div>

          {selectedFolderId === folder.id && (
            <div className="bg-gray-50 p-2">
              {filesInFolder.length === 0 ? (
                <div className="text-gray-400 text-sm p-2">
                  Нет файлов в этой папке
                </div>
              ) : (
                filesInFolder.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFileUrl(file.path)}
                    className="cursor-pointer p-2 text-sm rounded hover:bg-gray-100 flex items-center"
                  >
                    <span className="mr-2">📄</span>
                    <span className="truncate">{file.name}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
