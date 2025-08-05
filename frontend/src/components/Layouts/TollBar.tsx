import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const TollBar = () => {
    return (
        <div className="flex items-center px-4 py-2 border-b bg-white shadow-sm">
            <h1 className="text-xl font-semibold">Файлы</h1>
            <Button className="ml-auto" onClick={() => console.log("Открыть модалку")}>
                <Plus className="w-4 h-4 mr-2" /> Добавить папку
            </Button>
        </div>
    )
}

export default TollBar;