"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../ui/button";
import { Printer, StarsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormField from "@/components/custom/FormField";
import { getResumes, updateOneResume } from "@/lib/database/api/resume";
import { useDispatch, useSelector } from "react-redux";
import generateResumeWithAi from "@/lib/config/ai";
import { setUserResume } from "@/lib/redux/slices/resume";

const ResumeFormConfig = ({ activeSection, setActiveSection, isSaved }) => {
  const resumeObj = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const resume_section_option = [
    {
      value: "personal_details",
      label: "Personal Details",
    },
    {
      value: "skills",
      label: "Skills",
    },
    {
      value: "work_experience",
      label: "Work Experience",
    },
    {
      value: "education",
      label: "Education",
    },
    {
      value: "projects",
      label: "Projects",
    },
    {
      value: "certifications",
      label: "Certifications",
    },
  ];

  const template_option = [
    {
      value: "template_1",
      label: "Template 1",
    },
    {
      value: "template_2",
      label: "Template 2",
    },
    {
      value: "template_3",
      label: "Template 3",
    },
  ];

  const handlePrint = () => {
    // Create a style element
    const style = document.createElement("style");
    style.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }
      .__final__resume__to__print__,
      .__final__resume__to__print__ * {
        visibility: visible;
      }
      .__final__resume__to__print__ {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  `;
    document.head.appendChild(style);

    window.print();

    // Clean up
    document.head.removeChild(style);
  };

  const handleGenerateResumeWithAI = () => {
    setIsLoading(true);
    getResumes(resumeObj?.user).then((res) => {
      // console.log(res.data[0] || {});

      const resume_string = JSON.stringify(res.data[1] || {});
      const complete_input = `${resume_string} customize it for ${jobDescription} please sort all project according to it's relevance to the job description`;

      // console.log("Resume Received", complete_input);
      generateResumeWithAi(complete_input).then(async (res) => {
        try {
          const json_resume = JSON.parse(res);
          // console.log(json_resume);
          updateOneResume(resumeObj._id, json_resume);
          dispatch(setUserResume(json_resume));
        } catch (e) {
          console.log(e);
        }

        setIsDialogOpen(false);
        setIsLoading(false);
      });
    });
  };
  return (
    <div className="flex justify-between px-4 py-2">
      <span className="flex gap-2">
        <Select>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            {template_option.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={isDialogOpen}>
          <DialogTrigger
            className="flex bg-primary btn rounded-md text-white items-center justify-center px-2 smooth-animation gap-2"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            Generate <StarsIcon className="size-4" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Let AI handle Your Resume Generation !</DialogTitle>
              <DialogDescription>
                <span className="w-full flex flex-col items-end mt-4">
                  <FormField
                    label="Job Description"
                    type="textarea"
                    handleChange={(value) => {
                      setJobDescription(value);
                    }}
                    defaultValue={""}
                  />
                  <Button
                    className="btn smooth-animation"
                    onClick={handleGenerateResumeWithAI}
                    disabled={isLoading}
                  >
                    Generate
                  </Button>
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          className="btn smooth-animation"
          variant="outline"
          onClick={() => {
            handlePrint();
          }}
        >
          Print <Printer />
        </Button>
      </span>

      <Select
        value={activeSection}
        defaultValue="skills"
        onValueChange={(value) => {
          setActiveSection(value);
        }}
        disabled={!isSaved}
      >
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Section" />
        </SelectTrigger>
        <SelectContent>
          {resume_section_option.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ResumeFormConfig;
