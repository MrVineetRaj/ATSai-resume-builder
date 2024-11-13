"use client";
import MarkdownRenderer from "@/components/shared/markdown-renderer";
import React from "react";
import { useSelector } from "react-redux";

const ProjectPreview = () => {
  const resumeObj = useSelector((state) => state.resume);
  return (
    <div className="flex flex-col ">
      {resumeObj?.projects?.length > 0 && (
        <p className="font-semibold mt-1 border-b">Projects</p>
      )}
      {resumeObj?.projects?.map((project) => (
        <div key={project._id} className="mt-1 mb-3 px-2">
          <span className="flex items-end justify-between">
            <p className="text-sm font-semibold">{project.title}</p>
            <span className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs underline"
                >
                  Github
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs underline"
                >
                  Demo
                </a>
              )}
            </span>
          </span>

          <MarkdownRenderer content={project.description} />
        </div>
      ))}
    </div>
  );
};

export default ProjectPreview;
