import {selectFolder} from "@/features/folders/foldersSlice.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {useEffect} from "react";
import {fetchAllFolders} from "@/features/folders/folderThunk.tsx";

export const FolderList = () => {
    const dispatch = useAppDispatch();
    const folders = useAppSelector(selectFolder);

    useEffect(() => {
        dispatch(fetchAllFolders());
    }, [dispatch]);

    if (!folders.length) return <div>Нет папок</div>;

    return (
        <div className="space-y-4">
            {folders.map((folder) => (
                <div key={folder.id}>
                    <h2 className="text-lg font-semibold">{folder.name}</h2>
                </div>
            ))}
        </div>
    );
};