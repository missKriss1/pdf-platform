import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type TollBarProps = {
  onAddFolderClick: () => void;
};

const TollBar = ({ onAddFolderClick }: TollBarProps) => {
  return (
    <div className="flex items-center px-4 py-2 border-b bg-white shadow-sm">
      <Button className="ml-auto" onClick={onAddFolderClick}>
        <Plus className="w-4 h-4 mr-2" /> Добавить папку
      </Button>
    </div>
  );
};

export default TollBar;
