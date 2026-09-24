const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const analyzeResume = async (resumeFile, jobDescription) => {
    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    const response = await fetch(
        `${API_BASE_URL}/api/analyze`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Resume analysis failed."
        );
    }

    return data;
};