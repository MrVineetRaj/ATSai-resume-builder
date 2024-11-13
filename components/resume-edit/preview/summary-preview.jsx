"use client";
import React from "react";
import { useSelector } from "react-redux";

const SummaryPreview = () => {
  const resume_obj = useSelector((state) => state.resume);

  return <div className="text-xs text-center">{resume_obj.summary}</div>;
};

export default SummaryPreview;
