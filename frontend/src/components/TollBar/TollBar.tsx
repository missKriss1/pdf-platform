import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

type TollBarProps = {
    onAddFolderClick: () => void;
    onUploadFileClick: () => void;
};

const TollBar = ({ onAddFolderClick, onUploadFileClick }: TollBarProps) => {
    return (
        <div className="flex flex-col items-end px-4 py-2 border-b bg-white shadow-sm space-y-3">
            <Button
                onClick={onAddFolderClick}
                className="flex items-center justify-center min-w-[150px]"
                aria-label="Добавить новую папку"
                title="Создать новую папку"
            >
                <Plus className="w-4 h-4 mr-2" />
                Добавить папку
            </Button>
            <Button
                onClick={onUploadFileClick}
                className="flex items-center justify-center min-w-[150px]"
                aria-label="Загрузить файл"
                title="Загрузить PDF файл"
            >
                <Upload className="w-4 h-4 mr-2" />
                Загрузить файл
            </Button>
        </div>
    );
};

export default TollBar;
