import UserResumeModel from "@/lib/database/models/user-resume.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const resume_id = (await params).resume_id;
  const user_id = new URL(req.url).searchParams.get("user_id");
  console.log(resume_id, user_id);
  try {
    const resume = await UserResumeModel.findOne({
      _id: resume_id,
      user: user_id,
    });

    return NextResponse.json({
      message: "Your Resume",
      success: true,
      data: resume,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
}

export async function PATCH(req, { params }) {
  const resume_id = (await params).resume_id;
  const body = await req.json();
  try {
    const { update } = body;

    console.log(update.certifications);

    const resume = await UserResumeModel.findByIdAndUpdate(resume_id, update, {
      new: true,
    });

    const updatedResume = await UserResumeModel.findById(resume_id);
    return NextResponse.json({
      message: "Resume Updated",
      success: true,
      data: updatedResume,
    });
  } catch (err) {
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
}
