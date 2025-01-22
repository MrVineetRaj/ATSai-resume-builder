"use client";
import React, { useState } from "react";
import ResumeFormConfig from "./resume-form/resume-form-config";
import PersonalDetailForm from "./resume-form/personal_detail_form";
import SkillForm from "./resume-form/skill-form";
import WorkExperienceForm from "./resume-form/work-experience-form";
import EducationForm from "./resume-form/education-form";
import ProjectsForm from "./resume-form/projects-form";
import CertificationForm from "./resume-form/certification-form";

const ResumeForm = () => {
  const [activeSection, setActiveSection] = useState("personal_details");

  const [isSaved, setIsSaved] = useState(true);
  return (
    <div className="min-h-[600px] flex flex-col  overflow-hidden">
      <ResumeFormConfig
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSaved={isSaved}
      />
      <div className="border rounded-md h-full w-full border-t-primary border-t-4 p-4">
        {activeSection === "personal_details" && (
          <PersonalDetailForm isSaved={isSaved} setIsSaved={setIsSaved} />
        )}
        {activeSection === "skills" && (
          <SkillForm isSaved={isSaved} setIsSaved={setIsSaved} />
        )}
        {activeSection === "work_experience" && (
          <WorkExperienceForm isSaved={isSaved} setIsSaved={setIsSaved} />
        )}
        {activeSection === "education" && (
          <EducationForm isSaved={isSaved} setIsSaved={setIsSaved} />
        )}
        {activeSection === "projects" && (
          <ProjectsForm isSaved={isSaved} setIsSaved={setIsSaved} />
        )}
        {activeSection === "certifications" && (
          <CertificationForm isSaved={isSaved} setIsSaved={setIsSaved} />
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
