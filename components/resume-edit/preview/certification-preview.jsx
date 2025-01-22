"use client";
import React from "react";
import { useSelector } from "react-redux";

const CertificationPreview = () => {
  const resumeObj = useSelector((state) => state.resume);
  return (
    <div>
      <p className="font-semibold mt-1 border-b-2">Certifications</p>
      {resumeObj?.certifications?.map((certificate, index) => (
        <div className="mb-2 mt-1 px-2" key={index}>
          <p className="text-sm">
            <strong>{certificate?.title}</strong>
            {", "}
            <span>{certificate?.organization}</span>
          </p>
          <p className="text-xs">{certificate?.certification_summary}</p>
        </div>
      ))}
    </div>
  );
};

export default CertificationPreview;
