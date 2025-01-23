import UserResumeModel from "@/lib/database/models/user-resume.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const resume_id = new URL(req.url).searchParams.get("resume_id");

  if (!resume_id) {
    return NextResponse.json({
      success: false,
      message: `No resume id found`,
    });
  }

  console.log("resume_id ", resume_id);
  
  const resume = await UserResumeModel.findById(resume_id).lean();

  // console.log("resume_id ", resume);

  if (!resume) {
    return NextResponse.json({
      success: false,
      message: `No resume found with id ${resume_id}`,
    });
  }

  return NextResponse.json({
    success: true,
    message: `Resume loaded!`,
    data: resume,
  });
}
