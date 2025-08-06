import { useState } from "react";
import { SortToggle } from "@/components/SortToggle/SortToggle.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar.tsx";
import { FolderList } from "@/components/FolderList/FolderList.tsx";
import FileList from "@/components/FileList/FileList.tsx";

type Props = {
  selectedFileUrl: string | null;
  setSelectedFileUrl: (url: string | null) => void;
};

export const AppSidebar = ({ selectedFileUrl, setSelectedFileUrl }: Props) => {
  const [sortMode, setSortMode] = useState<"date" | "folder">("date");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Сортировка</SidebarGroupLabel>
          <SidebarGroupContent>
            <SortToggle onChange={setSortMode} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {sortMode === "folder" ? "Папки" : "Файлы по дате"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {sortMode === "folder" ? (
              <FolderList
                selectedFolderId={selectedFolderId}
                setSelectedFolderId={setSelectedFolderId}
                setSelectedFileUrl={setSelectedFileUrl}
              />
            ) : (
              <FileList
                selectedFileUrl={selectedFileUrl}
                setSelectedFileUrl={setSelectedFileUrl}
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
