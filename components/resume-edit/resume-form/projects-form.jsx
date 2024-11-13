"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../../custom/FormField";
import { Button } from "../../ui/button";
import { setUserResume } from "@/lib/redux/slices/resume";
import clsx from "clsx";
import MarkdownRenderer from "../../shared/markdown-renderer";
import { useParams } from "next/navigation";
import { updateOneResume } from "@/lib/database/api/resume";

const ProjectsForm = ({ isSaved, setIsSaved }) => {
  const params = useParams();
  const resume_id = params.resume_id;
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const resumeObj = useSelector((state) => state.resume);
  const [isInputActive, setIsInputActive] = useState(true);

  useEffect(() => {
    const { projects } = resumeObj;
    if (projects) {
      setProjects(projects);
    } else {
      setProjects([
        {
          title: "",
          company: "",
          city: "",
          state: "",
          start_date: "",
          end_date: "",
          currently_working: false,
          work_experience: "",
        },
      ]);
    }
  }, [resumeObj]);
  const handleSave = () => {
    updateOneResume(resume_id, { projects: projects }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <h2>What had you done for living ?</h2>
      <p>Let{"'"}s start with your work project</p>

      <form className="flex flex-col mt-4 gap-4">
        {projects.map((project, index) => (
          <div
            className="flex flex-col gap-4 p-4 border border-gray-400 rounded-md"
            key={project._id}
          >
            <FormField
              label="Title"
              type="text"
              defaultValue={project.title}
              handleChange={(value) => {
                setIsSaved(false);
                const temp = projects.map((item, i) => {
                  if (i === index) {
                    return { ...item, title: value };
                  }
                  return item;
                });

                setProjects(temp);
              }}
            />
            <span className="flex gap-4">
              <FormField
                label="Github Url"
                type="text"
                defaultValue={project.github}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = projects.map((item, i) => {
                    if (i === index) {
                      return { ...item, github: value };
                    }
                    return item;
                  });

                  setProjects(temp);
                }}
              />
              <FormField
                label="Demo Url"
                type="text"
                defaultValue={project.demo}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = projects.map((item, i) => {
                    if (i === index) {
                      return { ...item, demo: value };
                    }
                    return item;
                  });

                  setProjects(temp);
                }}
              />
            </span>
            <span>
              <span className="flex gap-2 items-center">
                <p className="text-sm">Description</p>
                <p
                  className={clsx(
                    "text-sm border border-b-0 p-1 cursor-pointer btn smooth-animation",
                    isInputActive && "border-primary"
                  )}
                  onClick={() => setIsInputActive(true)}
                >
                  Input
                </p>
                <p
                  className={clsx(
                    "text-sm border border-b-0 p-1  cursor-pointer btn smooth-animation",
                    !isInputActive && "border-primary"
                  )}
                  onClick={() => setIsInputActive(false)}
                >
                  Preview
                </p>
              </span>
              {isInputActive ? (
                <FormField
                  label=""
                  type="textarea"
                  defaultValue={project.description}
                  handleChange={(value) => {
                    setIsSaved(false);
                    const temp = projects.map((item, i) => {
                      if (i === index) {
                        return { ...item, description: value };
                      }
                      return item;
                    });

                    setProjects(temp);
                  }}
                />
              ) : (
                <MarkdownRenderer content={project.description} />
              )}
            </span>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            setProjects([{ Id: projects.length + 1 }, ...projects])
          }
        >
          Add More
        </Button>
        <Button
          disabled={isSaved}
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(true);
            handleSave();
            dispatch(setUserResume({ projects: projects }));
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ProjectsForm;
