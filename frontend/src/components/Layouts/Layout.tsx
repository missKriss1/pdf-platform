import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSideBar/AppSideBar.tsx";
import TollBar from "@/components/Layouts/TollBar.tsx";
import { PreviewPDF } from '@/components/PreviewPDF/PreviewPDF.tsx';

export default function Layout() {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

    return (
        <>
            <TollBar />
            <SidebarProvider>
                <div className="flex flex-col h-screen">
                    <div className="flex flex-1 overflow-hidden">
                        <AppSidebar selectedFileUrl={selectedFileUrl} setSelectedFileUrl={setSelectedFileUrl} />
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
        </>
    );
}
