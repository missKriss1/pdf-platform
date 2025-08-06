import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSideBar/AppSideBar.tsx";
import TollBar from "@/components/TollBar/TollBar.tsx";
import { PreviewPDF } from "@/components/PreviewPDF/PreviewPDF.tsx";
import ModalWindowAddFolder from "@/components/ModalWindowAddFolder/ModalWindowAddFolder.tsx";
import type { IFolderMutation } from "@/types";
import { useAppDispatch } from "@/app/hooks.ts";
import {
  createFolderThunk,
  fetchAllFoldersWithFiles,
} from "@/features/folders/folderThunk.tsx";
import type { AxiosError } from "axios";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveFolder = async (newFolder: IFolderMutation) => {
    try {
      await dispatch(createFolderThunk(newFolder)).unwrap();
      await dispatch(fetchAllFoldersWithFiles());
      setIsModalOpen(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error("Ошибка при создании папки:", err);
      return err.response?.data?.message || "Ошибка при создании папки";
    }
  };

  return (
    <>
      <TollBar onAddFolderClick={handleOpenModal} />
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
    </>
  );
}
