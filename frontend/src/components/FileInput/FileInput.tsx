import React, { useState } from "react";

type Props = {
    onFileSelect: (file: File | null) => void;
};

const FileInput: React.FC<Props> = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileName(file ? file.name : null);
        onFileSelect(file);
    };

    return (
        <div>
            <input
                type="file"
                accept="application/pdf"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleChange}
            />
            <button
                type="button"
                onClick={handleClick}
                className="w-full border px-3 py-2 rounded text-sm text-left"
            >
                {fileName ?? "Выберите файл"}
            </button>
        </div>
    );
};

export default FileInput;
