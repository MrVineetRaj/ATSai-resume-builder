"use client";
import CertificationPreview from "@/components/resume-edit/preview/certification-preview";
import EducationalPreview from "@/components/resume-edit/preview/educational-preview";
import ExperiencePreview from "@/components/resume-edit/preview/experience-preview";
import PersonalDetailsPreview from "@/components/resume-edit/preview/personal-details-preview";
import ProjectPreview from "@/components/resume-edit/preview/project-preview";
import SkillPreview from "@/components/resume-edit/preview/skills-preview";
import { Button } from "@/components/ui/button";
import { getOneResumeForGuest } from "@/lib/database/api/resume";
import { setUserResume } from "@/lib/redux/slices/resume";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [resume, setResume] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const temp = new URLSearchParams(window.location.search).get("resume_id");
    console.log(temp);

    getOneResumeForGuest(temp).then((res) => {
      console.log(res);
      if (!res.success) return;
      dispatch(setUserResume(res.data));
      setResume(res.data);
      setLoading(false);
    });
  }, []);

  const handlePrint = () => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      #__final__resume__to__print__guest__,
      #__final__resume__to__print__guest__ * {
        visibility: visible;
      }
      #__final__resume__to__print__guest__ {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  `;
    document.head.appendChild(style);

    window.print();

    // Clean up
    document.head.removeChild(style);
  };

  if (loading) return <>Loading...</>;
  if (!resume) return <>No Resume Found, Please Go Back and try again</>;
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center px-2 sm:px-6 md:px-16 bg-primary min-h-screen">
      <Button
        className="mt-4 bg-white text-black min-w-64 hover:bg-black hover:text-white"
        onClick={handlePrint}
      >
        Print
      </Button>
      <div
        id="__final__resume__to__print__guest__"
        className="w-full p-4 max-w-[210mm]  bg-white"
      >
        <PersonalDetailsPreview />
        <SkillPreview />
        <ExperiencePreview />
        <EducationalPreview />
        <ProjectPreview />
        <CertificationPreview />
      </div>
    </div>
  );
};

export default Page;
