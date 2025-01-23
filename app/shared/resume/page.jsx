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

const SharedResume = () => {
  const [resume, setResume] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    setLoading(true);
    const temp = new URLSearchParams(window.location.search).get("resume_id");
    // console.log(temp);

    getOneResumeForGuest(temp).then((res) => {
      // console.log(res);
      if (!res.success) return;
      dispatch(setUserResume(res.data));
      setResume(res.data);
      setLoading(false);
    });
  }, []);

  const handlePrint = () => {
    setPrinting(true);
    // Create a style element
    const style = document.createElement("style");

    const resume = document.getElementById(
      "__final__resume__to__print__guest__"
    );

    // Append the style element to the head of the document
    // shadow-black rounded-lg border border-gray-500
    resume.classList.remove("shadow-lg");
    resume.classList.remove("shadow-black");
    resume.classList.remove("rounded-lg");
    resume.classList.remove("border");
    resume.classList.remove("mb-8");
    resume.classList.remove("border-gray-500");

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

    resume.classList.add("shadow-lg");
    resume.classList.add("shadow-black");
    resume.classList.add("rounded-lg");
    resume.classList.add("border");
    resume.classList.add("border-gray-500");
    resume.classList.add("mb-8");

    // Clean up
    document.head.removeChild(style);
    setPrinting(false);
  };

  if (loading) return <>Loading...</>;
  if (!resume) return <>No Resume Found, Please Go Back and try again</>;
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center px-2 sm:px-6 md:px-16 min-h-screen bg-gradient-to-t from-primary/60 to-white ">
      <Button
        className="bg-black min-w-48 text-lg mt-2 font-semibold active:bg-gray-900 active:scale-90 transition-all duration-200 hover:bg-white hover:text-black hover:border-black border-2"
        onClick={handlePrint}
      >
        Print
      </Button>
      <div
        id="__final__resume__to__print__guest__"
        className="w-full p-4 max-w-[210mm] min-h[297mm]  bg-white shadow-lg shadow-black rounded-lg border border-gray-500 mb-8"
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

export default SharedResume;
