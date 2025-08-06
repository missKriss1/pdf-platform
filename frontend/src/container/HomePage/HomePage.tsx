import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSideBar/AppSideBar.tsx";
import TollBar from "@/components/TollBar/TollBar.tsx";
import { PreviewPDF } from "@/components/PreviewPDF/PreviewPDF.tsx";
import ModalWindowAddFolder from "@/components/ModalWindow/ModalWindowAddFolder/ModalWindowAddFolder.tsx";
import type { IFolderMutation} from "@/types";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {
  createFolderThunk,
  fetchAllFoldersWithFiles,
} from "@/features/folders/folderThunk.tsx";
import type { AxiosError } from "axios";
import ModalWindowAddFile from "@/components/ModalWindow/ModalWindowAddFile/ModalWindowAddFile.tsx";
import {selectFolder} from "@/features/folders/foldersSlice.tsx";
import {toast} from "sonner";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalAddFile, setIsOpenModalAddFile] = useState(false);
  const folders = useAppSelector(selectFolder);

  useEffect(() => {
    dispatch(fetchAllFoldersWithFiles());
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const openModalFile =() => setIsOpenModalAddFile(true);
  const closeModalFile =() => setIsOpenModalAddFile(false);


  const handleSaveFolder = async (newFolder: IFolderMutation) => {
    try {
      await dispatch(createFolderThunk(newFolder)).unwrap();
      toast("Папка успешно создана.")
      await dispatch(fetchAllFoldersWithFiles());
      setIsModalOpen(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return err.response?.data?.message || "Ошибка при создании папки";
    }
  };

  const folderOptions = folders.map(folder => ({
    id: folder.id,
    name: folder.name,
  }));


  return (
    <>
      <TollBar onAddFolderClick={handleOpenModal} onUploadFileClick={openModalFile} />
      <SidebarProvider>
        <div className="flex flex-col h-screen">
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar
              selectedFileUrl={selectedFileUrl}
              setSelectedFileUrl={setSelectedFileUrl}
            />
            <main className="flex-1 p-4 overflow-auto">
              {selectedFileUrl ? (
                <PreviewPDF fileUrl={selectedFileUrl} />
              ) : (
                <div className="text-gray-500">Выберите файл слева</div>
              )}
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>

      <ModalWindowAddFolder
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveFolder}
      />
      <ModalWindowAddFile
          isOpen={isOpenModalAddFile}
          onClose={closeModalFile}
          folderOptions={folderOptions}
      />
    </>
  );
}
