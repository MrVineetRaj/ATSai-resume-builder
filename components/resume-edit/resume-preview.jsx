"use client";
import React, { useEffect } from "react";
import PersonalDetailsPreview from "./preview/personal-details-preview";
import SummaryPreview from "./preview/summary-preview";
import ExperiencePreview from "./preview/experience-preview";
import EducationalPreview from "./preview/educational-preview";
import SkillPreview from "./preview/skills-preview";
import { useSelector } from "react-redux";
import ProjectPreview from "./preview/project-preview";
import CertificationPreview from "./preview/certification-preview";
const ResumePreview = () => {
  const resume = useSelector((state) => state.resume);
  useEffect(() => {
    console.log(resume);
  }, [resume]);
  return (
    <div className="min-h-[300px] border rounded-md overflow-hidden">
      <h2 className="border-b px-2 bg-primary/50 text-white">Preview</h2>
      <div className="p-2 __final__resume__to__print__">
        {/* Personal Details */}
        <PersonalDetailsPreview />
        {/* Summary */}
        {/* <SummaryPreview /> */}

        {/* Skills */}
        <SkillPreview />
        {/* Professional Experience */}
        <ExperiencePreview />
        {/* Educational  */}
        <EducationalPreview />
        {/* Projects */}
        <ProjectPreview />
        {/* Certifications */}
        <CertificationPreview />
      </div>
    </div>
  );
};

export default ResumePreview;
