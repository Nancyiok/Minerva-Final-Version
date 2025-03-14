import React from "react";

const JobRequirements = ({ data }) => {
    const decodedContent = decodeBase64(data.vacancy_file);

    return (
        <div className="job-posting__requirements-responsibilities">
            {decodedContent ? (
                <p dangerouslySetInnerHTML={{ __html: decodedContent }} />
            ) : (
                <p>Не вдалося завантажити вимоги та обов'язки.</p>
            )}
        </div>
    );
};

function decodeBase64(base64String) {
    try {
        if (!base64String) {
            throw new Error("Порожній файл");
        }
        const binaryString = atob(base64String);
        const bytes = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
        return new TextDecoder("utf-8").decode(bytes);
    } catch (e) {
        console.error("Ошибка декодирования Base64:", e);
        return "";
    }
}

export default JobRequirements;
