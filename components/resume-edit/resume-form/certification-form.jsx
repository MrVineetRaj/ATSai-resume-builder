"use client";
import FormField from "@/components/custom/FormField";
import { Button } from "@/components/ui/button";
import { updateOneResume } from "@/lib/database/api/resume";
import { setUserResume } from "@/lib/redux/slices/resume";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CertificationForm = ({ isSaved, setIsSaved }) => {
  const params = useParams();
  const resume_id = params.resume_id;
  const [certificationDetails, setCertificationDetails] = useState([]);
  const resumeObj = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  useEffect(() => {
    const { certifications } = resumeObj;
    if (certifications) {
      setCertificationDetails(certifications);
    } else {
      setEducationalDetail([
        {
          title: "",
          organization: "",
          certification_summary: "",
        },
      ]);
    }
  }, [resumeObj]);

  const handleSave = () => {
    let tempCertificationDetails = certificationDetails.filter(
      (certification) =>
        certification.title !== "" &&
        certification.organization !== "" &&
        certification.certification_summary !== ""
    );

    dispatch(setUserResume({ certifications: tempCertificationDetails }));
    updateOneResume(resume_id, {
      certifications: tempCertificationDetails,
    }).then((res) => {
      console.log("Saved");
    });
  };
  return (
    <div>
      <h2>Certification Details</h2>
      <p>Let{"'"}s take note on your educational journey</p>

      <form className="flex flex-col mt-4 gap-4">
        {certificationDetails?.map((certification, index) => (
          <div
            className="flex flex-col gap-4 border p-4 border-gray-400 rounded-md"
            key={certification._id || index}
          >
            <FormField
              label="Title"
              type="text"
              defaultValue={certification.title}
              handleChange={(value) => {
                setIsSaved(false);
                const temp = certificationDetails.map((item, i) => {
                  if (i === index) {
                    return { ...item, title: value };
                  }
                  return item;
                });

                setCertificationDetails(temp);
              }}
            />
            <FormField
              label="Organization"
              type="text"
              defaultValue={certification.organization}
              handleChange={(value) => {
                setIsSaved(false);
                const temp = certificationDetails.map((item, i) => {
                  if (i === index) {
                    return { ...item, organization: value };
                  }
                  return item;
                });

                setCertificationDetails(temp);
              }}
            />
            <FormField
              label="Certification Summary"
              type="text"
              defaultValue={certification.certification_summary}
              handleChange={(value) => {
                setIsSaved(false);
                const temp = certificationDetails.map((item, i) => {
                  if (i === index) {
                    return { ...item, certification_summary: value };
                  }
                  return item;
                });

                setCertificationDetails(temp);
              }}
            />
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            setCertificationDetails([
              ...certificationDetails,
              {
                title: "",
                organization: "",
                certification_summary: "",
              },
            ])
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
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default CertificationForm;
