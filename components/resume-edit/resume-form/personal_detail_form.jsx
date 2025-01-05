"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../../custom/FormField";
import { Button } from "../../ui/button";
import { setUserResume } from "@/lib/redux/slices/resume";
import { useParams } from "next/navigation";
import { updateOneResume } from "@/lib/database/api/resume";

const PersonalDetailForm = ({ isSaved, setIsSaved }) => {
  const params = useParams();
  const resume_id = params.resume_id;
  console.log(resume_id);
  const dispatch = useDispatch();
  const [personalDetail, setPersonalDetail] = useState();
  const resumeObj = useSelector((state) => state.resume);
  useEffect(() => {
    const { first_name, last_name, address, phone, email, job_title } =
      resumeObj;
    setPersonalDetail({
      first_name,
      last_name,
      address,
      phone,
      email,
      job_title,
      links:
        resumeObj?.links.length > 0
          ? resumeObj?.links
          : [
              {
                label: "",
                url: "",
              },
            ],
    });
  }, [resumeObj]);

  const handleSave = () => {
    updateOneResume(resume_id, personalDetail).then((res) => {
      console.log(res);
    });
  };
  return (
    <div>
      <h2>Personal Detail</h2>
      <p>Get Started with basic details</p>
      <form
        action=""
        className="flex flex-col mt-4 gap-6 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSaved(true);
          const resume = { ...resumeObj, ...personalDetail };
          dispatch(setUserResume(resume));
          handleSave();
        }}
      >
        <span className="flex w-full gap-4">
          <FormField
            label="First Name"
            type="text"
            defaultValue={personalDetail?.first_name}
            handleChange={(value) => {
              setIsSaved(false);
              setPersonalDetail({ ...personalDetail, first_name: value });
            }}
          />
          <FormField
            label="Last Name"
            type="text"
            defaultValue={personalDetail?.last_name}
            handleChange={(value) => {
              setIsSaved(false);
              setPersonalDetail({ ...personalDetail, last_name: value });
            }}
          />
        </span>

        <FormField
          label="Job Title"
          type="text"
          defaultValue={personalDetail?.job_title}
          handleChange={(value) => {
            setIsSaved(false);
            setPersonalDetail({ ...personalDetail, job_title: value });
          }}
        />

        {personalDetail?.links?.map((link, index) => (
          <span key={index} className="flex w-full gap-4">
            <FormField
              label="Label"
              type="text"
              defaultValue={link.label}
              handleChange={(value) => {
                setIsSaved(false);
                const links = personalDetail.links;
                links[index].label = value;
                setPersonalDetail({ ...personalDetail, links });
              }}
            />
            <FormField
              label="URL"
              type="text"
              defaultValue={link.url}
              handleChange={(value) => {
                setIsSaved(false);
                const links = personalDetail.links;
                links[index].url = value;
                setPersonalDetail({ ...personalDetail, links });
              }}
            />
          </span>
        ))}
        <span className="flex gap-4">
          <Button
            className="btn smooth-animation min-w-64 hover:text-white bg-white text-primary border-2 font-semibold border-primary" 
            onClick={() => {
              let links = personalDetail.links.filter(
                (link) => link.label !== "" || link.url !== ""
              );
              setPersonalDetail({ ...personalDetail, links });
            }}
          >
            Remove Empty Fields
          </Button>
          <Button
            onClick={() => {
              let links = [...personalDetail.links, { label: "", url: "" }];

              setPersonalDetail({ ...personalDetail, links });
            }}
            className="btn smooth-animation min-w-64"
          >
            Add Link
          </Button>
        </span>

        <FormField
          label="Address"
          type="text"
          defaultValue={personalDetail?.address}
          handleChange={(value) => {
            setIsSaved(false);
            setPersonalDetail({ ...personalDetail, address: value });
          }}
        />
        <span className="flex w-full gap-4">
          <FormField
            label="Phone"
            type="text"
            defaultValue={personalDetail?.phone}
            handleChange={(value) => {
              setIsSaved(false);
              setPersonalDetail({ ...personalDetail, phone: value });
            }}
          />
          <FormField
            label="Email"
            type="email"
            defaultValue={personalDetail?.email}
            handleChange={(value) => {
              setIsSaved(false);
              setPersonalDetail({ ...personalDetail, email: value });
            }}
          />
        </span>
        <Button disabled={isSaved} className="btn smooth-animation min-w-64">
          Save
        </Button>
      </form>
    </div>
  );
};

export default PersonalDetailForm;
