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

const WorkExperienceForm = ({ isSaved, setIsSaved }) => {
  const params = useParams();
  const resume_id = params.resume_id;
  const dispatch = useDispatch();
  const [workExperience, setWorkExperience] = useState([]);
  const resumeObj = useSelector((state) => state.resume);
  const [isInputActive, setIsInputActive] = useState(true);

  useEffect(() => {
    const { experience } = resumeObj;
    if (experience) {
      setWorkExperience(experience);
    } else {
      setWorkExperience([
        {
          _id:0,
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
    updateOneResume(resume_id, { experience:workExperience }).then((res) => {
      console.log("Updated");
    });
  };
  return (
    <div>
      <h2>What had you done for living ?</h2>
      <p>Let{"'"}s start with your work experience</p>

      <form className="flex flex-col mt-4 gap-4">
        {workExperience.map((exp, index) => (
          <div
            className="flex flex-col gap-4 p-4 border border-gray-400 rounded-md"
            key={exp._id}
          >
            <span className="flex gap-4">
              <FormField
                label="Title"
                type="text"
                defaultValue={exp.title}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = workExperience.map((item, i) => {
                    if (i === index) {
                      return { ...item, title: value };
                    }
                    return item;
                  });

                  setWorkExperience(temp);
                }}
              />
              <FormField
                label="Company Name"
                type="text"
                defaultValue={exp.company_name}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = workExperience.map((item, i) => {
                    if (i === index) {
                      return { ...item, company_name: value };
                    }
                    return item;
                  });

                  setWorkExperience(temp);
                }}
              />
            </span>
            <span className="flex gap-4">
              <FormField
                label="City"
                type="text"
                defaultValue={exp.city}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = workExperience.map((item, i) => {
                    if (i === index) {
                      return { ...item, city: value };
                    }
                    return item;
                  });

                  setWorkExperience(temp);
                }}
              />
              <FormField
                label="State"
                type="text"
                defaultValue={exp.state}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = workExperience.map((item, i) => {
                    if (i === index) {
                      return { ...item, state: value };
                    }
                    return item;
                  });

                  setWorkExperience(temp);
                }}
              />
            </span>
            <span className="flex gap-4 justify-between">
              <span className="flex gap-2 items-center w-full">
                <label htmlFor="">Start Date</label>
                <input
                  type="date"
                  className="border p-1 rounded-md"
                  defaultValue={exp.start_date}
                  onChange={(e) => {
                    setIsSaved(false);
                    const temp = workExperience.map((item, i) => {
                      if (i === index) {
                        return { ...item, start_date: e.target.value };
                      }
                      return item;
                    });

                    setWorkExperience(temp);
                  }}
                />
              </span>
              <span className="flex gap-2 items-center w-full">
                <label htmlFor="">End Date</label>
                <input
                  type="date"
                  className="border p-1 rounded-md"
                  defaultValue={exp.end_date}
                  onChange={(e) => {
                    setIsSaved(false);
                    const temp = workExperience.map((item, i) => {
                      if (i === index) {
                        return { ...item, end_date: e.target.value };
                      }
                      return item;
                    });

                    setWorkExperience(temp);
                  }}
                />
              </span>
            </span>
            <span className="flex gap-4 items-center">
              <label htmlFor="">Or currently working here {":"}</label>
              <input
                type="checkbox"
                defaultChecked={exp.currently_working}
                onChange={(e) => {
                  setIsSaved(false);
                  const temp = workExperience.map((item, i) => {
                    if (i === index) {
                      return { ...item, currently_working: e.target.value };
                    }
                    return item;
                  });

                  setWorkExperience(temp);
                }}
              />
            </span>
            <span>
              <span className="flex gap-2 items-center">
                <p className="text-sm">Work Experience</p>
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
                  defaultValue={exp.work_summary}
                  handleChange={(value) => {
                    setIsSaved(false);
                    const temp = workExperience.map((item, i) => {
                      if (i === index) {
                        return { ...item, work_summary: value };
                      }
                      return item;
                    });

                    setWorkExperience(temp);
                  }}
                />
              ) : (
                <MarkdownRenderer content={exp.work_summary} />
              )}
            </span>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => setWorkExperience([...workExperience, {}])}
        >
          Add More
        </Button>
        <Button
          disabled={isSaved}
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(true);
            handleSave();
            dispatch(setUserResume({ experience: workExperience }));
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default WorkExperienceForm;
