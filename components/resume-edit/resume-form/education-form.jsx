"use client";
import FormField from "@/components/custom/FormField";
import { Button } from "@/components/ui/button";
import { updateOneResume } from "@/lib/database/api/resume";
import { setUserResume } from "@/lib/redux/slices/resume";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EducationForm = ({ isSaved, setIsSaved }) => {
  const params = useParams();
  const resume_id = params.resume_id;
  const [educationalDetail, setEducationalDetail] = useState([]);
  const resumeObj = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  useEffect(() => {
    const { education } = resumeObj;
    if (education) {
      setEducationalDetail(education);
    } else {
      setEducationalDetail([
        {
          _id: 0,
          university_name: "",
          degree: "",
          start_date: "",
          end_date: "",
          description: "",
          major: "",
          description: "",
        },
      ]);
    }
  }, [resumeObj]);

  const handleSave = () => {
    updateOneResume(resume_id, { education: educationalDetail }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <h2>Educational Detail</h2>
      <p>Let's take note on your educational journey</p>

      <form className="flex flex-col mt-4 gap-4">
        {educationalDetail?.map((edu, index) => (
          <div
            className="flex flex-col gap-4 border p-4 border-gray-400 rounded-md"
            key={edu._id}
          >
            <FormField
              label="University Name"
              type="text"
              defaultValue={edu.university_name}
              handleChange={(value) => {
                setIsSaved(false);
                const temp = educationalDetail.map((item, i) => {
                  if (i === index) {
                    return { ...item, university_name: value };
                  }
                  return item;
                });

                setEducationalDetail(temp);
              }}
            />
            <span className="flex gap-4">
              <FormField
                label="Degree"
                type="text"
                defaultValue={edu.degree}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = educationalDetail.map((item, i) => {
                    if (i === index) {
                      return { ...item, degree: value };
                    }
                    return item;
                  });

                  setEducationalDetail(temp);
                }}
              />
              <FormField
                label="Major"
                type="text"
                defaultValue={edu.major}
                handleChange={(value) => {
                  setIsSaved(false);
                  const temp = educationalDetail.map((item, i) => {
                    if (i === index) {
                      return { ...item, major: value };
                    }
                    return item;
                  });

                  setEducationalDetail(temp);
                }}
              />
            </span>
            <span className="flex gap-4 justify-between">
              <span className="flex gap-2 items-center w-full">
                <label htmlFor="">Start Date</label>
                <input
                  type="date"
                  className="border p-1 rounded-md"
                  defaultValue={edu.start_date}
                  onChange={(e) => {
                    setIsSaved(false);
                    const temp = educationalDetail.map((item, i) => {
                      if (i === index) {
                        return { ...item, start_date: e.target.value };
                      }
                      return item;
                    });

                    setEducationalDetail(temp);
                  }}
                />
              </span>
              <span className="flex gap-2 items-center w-full">
                <label htmlFor="">End Date</label>
                <input
                  type="date"
                  className="border p-1 rounded-md"
                  defaultValue={edu.end_date}
                  onChange={(e) => {
                    setIsSaved(false);
                    const temp = educationalDetail.map((item, i) => {
                      if (i === index) {
                        return { ...item, end_date: e.target.value };
                      }
                      return item;
                    });

                    setEducationalDetail(temp);
                  }}
                />
              </span>
            </span>

            <FormField
              label="Description"
              type="textarea"
              defaultValue={edu.description}
              handleChange={(value) => {
                setIsSaved(false);
                const temp = educationalDetail.map((item, i) => {
                  if (i === index) {
                    return { ...item, description: value };
                  }
                  return item;
                });

                setEducationalDetail(temp);
              }}
            />
          </div>
        ))}

        <Button
          type="button"
          onClick={() => setEducationalDetail([...educationalDetail, {}])}
        >
          Add More
        </Button>
        <Button
          disabled={isSaved}
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(true);
            handleSave();
            dispatch(setUserResume({ education: educationalDetail }));
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EducationForm;
