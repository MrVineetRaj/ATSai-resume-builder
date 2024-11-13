"use client";
import React from "react";
import { useSelector } from "react-redux";

const SkillPreview = () => {
  const resumeObj = useSelector((state) => state.resume);
  return (
    <div>
      <p className="font-semibold mt-1 border-b">Skills</p>
      {resumeObj.skills.map((skill, index) => (
        <div className="mb-2 mt-1 px-2 flex gap-2 " key={index}>
          <span className="text-xs font-semibold">
            {skill.label} {":"}
          </span>
          <span className="text-xs">{skill?.value?.join(", ")}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillPreview;
