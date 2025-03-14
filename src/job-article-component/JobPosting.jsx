import React from "react";
import JobHeader from "./JobHeader";
import JobRequirements from "./JobRequirements";
import JobBenefits from "./JobBenefits";
import JobApplyButton from "./JobApplyButton";

const JobPosting = () => (
    <div className="job-posting">
        <JobHeader />
        <div className="job-posting__content">
            <JobRequirements />
            <JobBenefits />
            <JobApplyButton />
        </div>
    </div >
);

export default JobPosting;
