"use client";

import { getResumes } from "@/lib/database/api/resume";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserResume = ({ session }) => {
  const router = useRouter();
  const [resumes, setResumes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session?.user?.id) {
      getResumes(session.user.id)
        .then((res) => {
          setResumes(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching resumes:", err);
          setIsLoading(false);
        });
    }
  }, [session?.user?.id]); // Add dependency to ensure proper updates

  if (!resumes) return;
  if (isLoading) {
    return <p className="text-black">Loading...</p>; // Show a loading state
  }

  return (
    <div className=" col-span-1 md:col-span-2 lg:col-span-4   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {resumes.map((resume, index) => (
        <div
          key={index}
          className="w-full flex flex-col justify-between items-center h-full bg-primary/50 rounded-md overflow-hidden btn cursor-pointer smooth-animation relative"
          onClick={() => {
            router.push(`/dashboard/resume/${resume._id}/edit`);
          }}
        >
          <span className="h-full w-full flex items-center justify-center">
            <Image
              src={"/images/cv.png"}
              width={120}
              height={1200}
              alt="cv"
              className=""
            />
          </span>
          <p className="bg-pink-500 w-full text-center py-1 font-semibold  text-white">
            {resume.resume_title}
          </p>
          <p
            className="absolute top-4 right-4 p-2 bg-white rounded-md cursor-pointer hover:bg-black hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/resume/guest?resume_id=${resume._id}`);
            }}
          >
            {"<>"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserResume;
