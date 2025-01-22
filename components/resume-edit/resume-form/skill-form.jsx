"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../../custom/FormField";
import { Button } from "../../ui/button";
import { setUserResume } from "@/lib/redux/slices/resume";
import { updateOneResume } from "@/lib/database/api/resume";
import { useParams } from "next/navigation";

const SkillForm = ({ isSaved, setIsSaved }) => {
  const params = useParams();
  const resume_id = params.resume_id;
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const resumeObj = useSelector((state) => state.resume);
  useEffect(() => {
    const { skills } = resumeObj;
    if (!skills) {
      setSkills([
        {
          label: "",
          value: "",
        },
      ]);
    }
    setSkills(skills);
  }, [resumeObj]);

  const handleSave = () => {
    updateOneResume(resume_id, { skills }).then((res) => {
      console.log("Updated");
    });
  };

  return (
    <div>
      <h2>What do you have in you sleeves ?</h2>
      <p>Get Started with your skills</p>

      <form action="" className="grid grid-cols-1 mt-4 gap-6 items-end">
        {skills?.map((skill, index) => (
          <div key={index} className="flex gap-4">
            <FormField
              label="Skill"
              type="text"
              defaultValue={skill.label}
              handleChange={(value) => {
                setIsSaved(false);
                const updatedSkills = skills.map((s, i) =>
                  i === index ? { ...s, label: value } : s
                );
                setSkills(updatedSkills);
              }}
            />
            <FormField
              label="Proficiency"
              type="text"
              defaultValue={skill.value.join(", ")}
              handleChange={(value) => {
                setIsSaved(false);
                const updatedSkills = skills.map((s, i) =>
                  i === index ? { ...s, value: value.split(", ") } : s
                );
                setSkills(updatedSkills);
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() => {
            setSkills([
              ...skills,
              {
                label: "",
                value: [],
              },
            ]);
          }}
        >
          Add Skill
        </Button>
        <Button
          disabled={isSaved}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(true);
            const resume = { ...resumeObj, skills };
            handleSave();
            dispatch(setUserResume(resume));
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default SkillForm;
