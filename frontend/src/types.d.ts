export interface IFolder{
    id: string;
    name: string;
}

export interface IFile{
    id: string;
    name: string;
    path: string;
    folder: IFolder;
    uploadedAt: string;
}

export interface FolderContent {
    folders: IFolder[];
    files: IFile[];
}