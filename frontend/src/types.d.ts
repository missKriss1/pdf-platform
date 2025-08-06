export interface IFolder {
  id: string;
  name: string;
  files: IFile[];
}

export interface IFile {
  id: string;
  name: string;
  path: string;
  folder: IFolder;
  uploadedAt: string;
}

export interface IFolderMutation {
  name: string;
}
export interface IFileMutation{
  file: File;
  folderId: string;
  name?: string;
}