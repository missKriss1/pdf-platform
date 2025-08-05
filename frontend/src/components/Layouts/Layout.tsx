import { Outlet } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar.tsx"
import { AppSidebar } from "@/components/AppSideBar.tsx"
import TollBar from "@/components/Layouts/TollBar.tsx";

export default function Layout() {
    return (
        <>
            <TollBar />
            <SidebarProvider>
                <div className="flex flex-col h-screen">
                    <div className="flex flex-1 overflow-hidden">
                        <AppSidebar />
                        <main className="flex-1 p-4 overflow-auto">
                            <Outlet />
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}
