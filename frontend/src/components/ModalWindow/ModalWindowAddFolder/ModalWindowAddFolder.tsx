import { useState } from "react";
import type { IFolderMutation } from "@/types";
import {Button} from "@/components/ui/button.tsx";

type ModalWindowAddFolderProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (folderName: IFolderMutation) => Promise<string | null | void>;
};

const initialState: IFolderMutation = {
  name: "",
};

const ModalWindowAddFolder = ({
  isOpen,
  onClose,
  onSave,
}: ModalWindowAddFolderProps) => {
  const [folderName, setFolderName] = useState<string>(initialState.name);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (folderName.trim() === "") {
      setErrorMessage("Введите имя папки");
      return;
    }

    const error = await onSave({ name: folderName.trim() });

    if (error) {
      setErrorMessage(error);
    } else {
      setFolderName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <form onSubmit={onSubmitForm}>
          <h2 className="text-xl font-semibold mb-4">Добавить новую папку</h2>
          {errorMessage && (
            <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
          )}
          <input
            type="text"
            name="folderName"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Имя папки"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => {
                setFolderName("");
                setErrorMessage(null);
                onClose();
              }}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded bg-gray-600 text-white"
            >
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWindowAddFolder;
