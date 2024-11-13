"use client";
import React from "react";
import { useSelector } from "react-redux";

const EducationalPreview = () => {
  const resumeObj = useSelector((state) => state.resume);
  return (
    <div>
      <p className="font-semibold mt-1 border-b">Education</p>
      {resumeObj.education.map((edu, index) => (
        <div className="mb-2 mt-1 px-2" key={index}>
          <div className="flex justify-between">
            <p className="text-xs">
              <span className="font-semibold">
                {edu.degree} in {edu.major} ,{" "}
              </span>
              {edu.university_name}
            </p>

            <p className="text-xs">
              {edu.start_date} - {edu.end_date}
            </p>
          </div>
          <p className="text-xs">{edu.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationalPreview;
