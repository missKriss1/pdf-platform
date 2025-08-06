import React, { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { uploadFileThunk } from '@/features/files/fileThunk';
import { Button } from '@/components/ui/button.tsx';
import type { IFileMutation } from '@/types';
import FileInput from '@/components/FileInput/FileInput';
import {toast} from "sonner";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    folderOptions: { id: string; name: string }[];
};

const ModalWindowAddFile: React.FC<Props> = ({ isOpen, onClose, folderOptions }) => {
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [folderId, setFolderId] = useState<string | null>(null);
    const [customName, setCustomName] = useState('');

    const [error, setError] = useState<string | null>(null);

    const validate = () => {
        if (!selectedFile) {
            setError('Пожалуйста, выберите файл');
            return false;
        }
        if (selectedFile.type !== 'application/pdf') {
            setError('Можно загружать только PDF файлы');
            return false;
        }
        if (!folderId) {
            setError('Пожалуйста, выберите папку');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        const fileData: IFileMutation = {
            file: selectedFile!,
            folderId: folderId!,
            name: customName || undefined,
        };

        dispatch(uploadFileThunk(fileData))
            .unwrap()
            .then(() => {
                onClose();
                setSelectedFile(null);
                setFolderId(null);
                setCustomName('');
            })
            .catch((err) => {
                setError('Ошибка загрузки файла');
                console.error('Ошибка загрузки:', err);
            });
        toast("Файл успешно добавлен.")
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
            >
                <h2 className="text-xl font-semibold mb-4">Загрузить файл</h2>

                {error && (
                    <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Файл (только PDF)</label>
                    <FileInput onFileSelect={setSelectedFile} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Папка</label>
                    <select
                        className="w-full border px-3 py-2 rounded text-sm"
                        value={folderId ?? ''}
                        onChange={(e) => setFolderId(e.target.value)}
                    >
                        <option value="" disabled>
                            -- Выбрать папку --
                        </option>
                        {folderOptions.map((folder) => (
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Имя файла (опционально)</label>
                    <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full border px-3 py-2 rounded text-sm"
                        placeholder="По умолчанию"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <Button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        type="button"
                        onClick={() => {
                            setSelectedFile(null);
                            setFolderId(null);
                            setCustomName('');
                            setError(null);
                            onClose();
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 rounded bg-gray-600 text-white"
                    >
                        Загрузить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ModalWindowAddFile;
