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

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await fetch(`${serverURL}/api/Vacancy/${+sessionStorage.getItem("vacancyId")
                    }/Vacancy`, {
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
            <JobHeader data={jobData} />
            <div className="job-posting__content">
                <JobRequirements data={jobData} />
                <JobBenefits data={jobData} />
                <JobApplyButton data={jobData} />
            </div>
        </div>
    );
};

export default JobPosting;
