"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PersonalDetailsPreview = () => {
  const resume_obj = useSelector((state) => state.resume);

  return (
    <div className="w-full flex flex-col items-center border-b border-b-black">
      <p className="font-semibold text-base ">
        {resume_obj?.first_name} {resume_obj?.last_name}
      </p>
      <p className="text-xs">{resume_obj?.job_title}</p>
      <div className="flex justify-between w-full">
        <p className="text-xs">{resume_obj?.phone}</p>
        {resume_obj?.links.map((link, index) => (
          <a className="text-xs" key={index} href={link.url} target="_blank">
            {link.label}
          </a>
        ))}
        <p className="text-xs">{resume_obj?.email}</p>
      </div>
    </div>
  );
};

export default PersonalDetailsPreview;
