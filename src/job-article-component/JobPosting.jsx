import React, { useState, useEffect } from "react";
import JobHeader from "./JobHeader";
import JobRequirements from "./JobRequirements";
import JobBenefits from "./JobBenefits";
import JobApplyButton from "./JobApplyButton";
import serverURL from "../../web/js/global/server-url.js";

const JobPosting = () => {
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageSrc, setImageSrc] = useState("./img/job-article-photo.jpg");
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await fetch(`${serverURL}/api/Vacancy/${+sessionStorage.getItem("vacancyId")}/Vacancy`, {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    setError(errorMessage);
                    console.log(errorMessage);
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setJobData(data);

                if (data?.vacancy_photo) {
                    try {
                        const photoResponse = await fetch(`${serverURL}${data.vacancy_photo}`, {
                            headers: {
                                "ngrok-skip-browser-warning": "true",
                            },
                        });

                        if (photoResponse.ok) {
                            const blob = await photoResponse.blob();
                            const url = URL.createObjectURL(blob);
                            setImageSrc(url);
                        } else {
                            console.warn("Не вдалося завантажити фото, використовується стандартне");
                        }
                    } catch (photoErr) {
                        console.warn("Помилка під час завантаження фото:", photoErr);
                    }
                }

                setLoading(false);
            } catch (err) {
                setError("Error fetching the job posting");
                console.log("Помилка отримання вакансії", err);
                setLoading(false);
            }
        };

        fetchJobData();
    }, []);


    if (loading) {
        return <div className="window-loading__spinner"></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="job-posting">
            <JobHeader data={jobData} imageSrc={imageSrc} />
            <div className="job-posting__content">
                <JobRequirements data={jobData} />
                <JobBenefits data={jobData} />
                <JobApplyButton data={jobData} />
            </div>
        </div>
    );
};

export default JobPosting;
