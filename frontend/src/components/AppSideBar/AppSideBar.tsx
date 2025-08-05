import { useState } from "react"
import { SortToggle } from "@/components/SortToggle"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { FolderList } from "@/components/FolderList"

export function AppSidebar() {
    const [sortMode, setSortMode] = useState<"date" | "folder">("date")

    return (
        <Sidebar className="w-64">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Сортировка</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SortToggle onChange={setSortMode} />
                    </SidebarGroupContent>
                </SidebarGroup>
                {sortMode === "folder" && <FolderList />}
            </SidebarContent>
        </Sidebar>
    )
}
