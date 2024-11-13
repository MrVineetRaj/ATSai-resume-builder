"use selector";
import MarkdownRenderer from "@/components/shared/markdown-renderer";
import React from "react";
import { useSelector } from "react-redux";

const ExperiencePreview = () => {
  const resumeObj = useSelector((state) => state.resume);
  return (
    <div>
      <p className="font-semibold mt-1 border-b border-black">Experience</p>
      {resumeObj.experience.map((exp, index) => (
        <div className="mt-1 mb-2 px-2 " key={index}>
          <div className="flex justify-between border-b border-gray-400 mb-1">
            <p className="text-xs ">
              <span className="font-semibold">
                {exp.title} , {exp.company_name} ,{" "}
              </span>
              {exp.city}, {exp.state}
            </p>

            <p className="text-xs">
              {exp.start_date} -{" "}
              {exp.currently_working ? "Present" : exp.end_date}
            </p>
          </div>
          <MarkdownRenderer content={exp.work_summary} />
          {/* <p className="text-xs">{exp.work_summary}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
