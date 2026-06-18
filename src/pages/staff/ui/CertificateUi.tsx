import type React from "react";


interface Props {
    label: string;
    value: string;
}


const CertificateUi: React.FC<Props> = ({ label, value }) => {
    return (
        <div className="flex text-xs flex-col py-2 px-3">
            <label className="text-secondary/50">{label}</label>
            <label className="text-xs font-bold text-secondary/70">{value}</label>
        </div>
    );
}

export default CertificateUi;