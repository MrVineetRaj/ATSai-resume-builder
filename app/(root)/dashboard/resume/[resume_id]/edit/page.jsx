"use client";
import ResumePreview from "@/components/resume-edit/resume-preview";
import ResumeForm from "@/components/resume-edit/resume_foem";
import { getOneResume } from "@/lib/database/api/resume";
import dummy from "@/lib/dummy";
import { setUserResume } from "@/lib/redux/slices/resume";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ResumeEditPage = ({ params }) => {
  const dispatch = useDispatch();
  const resume_id = params.resume_id;
  const [resume, setResume] = useState();
  const userObj = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (userObj?._id) {
      getOneResume(resume_id, userObj?._id).then((res) => {
        if (res.success) {
          setResume(res.data);
          dispatch(setUserResume(res.data));
        }
        setLoading(false);
      });
    }
  }, [resume_id, userObj]);
  if (loading) return <>Loading...</>;
  if (!resume) return <>No Resume Found, Please Go Back and try again</>;
  return (
    <div className="w-full px-2 sm:px-6 md:px-16">
      <h2>{resume.resume_title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-2 mt-4">
        <ResumeForm />
        <ResumePreview />
      </div>
    </div>
  );
};

export default ResumeEditPage;
