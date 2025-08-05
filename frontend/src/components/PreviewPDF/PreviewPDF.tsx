import axiosApi from "@/axiosApi.ts";

type Props = {
    fileUrl: string;
};

export const PreviewPDF = ({ fileUrl }: Props) => {
    const baseUrl = axiosApi.defaults.baseURL;
    const fullUrl = `${baseUrl}/${fileUrl}`;

    return (
        <div className="w-[1100px] h-[850px] border rounded shadow overflow-hidden">
            <embed
                src={fullUrl}
                type="application/pdf"
                width="100%"
                height="100%"
            />
        </div>
    );
};