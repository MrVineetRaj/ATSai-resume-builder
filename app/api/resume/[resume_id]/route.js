import UserResumeModel from "@/lib/database/models/user-resume.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const resume_id = (await params).resume_id;
  try {
    const resume = await UserResumeModel.findById(resume_id);

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
    const resume = await UserResumeModel.findByIdAndUpdate(resume_id, update, {
      new: true,
    });

    return NextResponse.json({
      message: "Resume Updated",
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
