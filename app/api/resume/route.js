import dbConnect from "@/lib/database/connection";
import UserResumeModel from "@/lib/database/models/user-resume.model";
import UserModel from "@/lib/database/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  try {
    const { email, resume_title } = data;

    console.log(email, resume_title);
    if (!email || !resume_title) {
      return NextResponse.json({
        status: "Error",
        message: "Please Fill all required fields",
      });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: `No user found with email ${email}`,
      });
    }

    // console.log(user);
    const new_resume = new UserResumeModel({
      user: user._id,
      resume_title: resume_title,
    });

    await new_resume.save();

    return NextResponse.json({
      success: true,
      message: `Resume loaded!`,
      data: new_resume,
    });
  } catch (error) {
    console.log("Message=> ", error.message);
    console.log("Stack=> ", error.stack);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function GET(req) {
  await dbConnect();
  // const { user_id } = req.query;
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id"); // Extract the 'user_id' query parameter

  try {
    const resumes = await UserResumeModel.find({ user: user_id }).sort({
      _id: -1,
    });
    return NextResponse.json({
      success: true,
      message: `Resume loaded!`,
      data: resumes,
    });
  } catch (error) {
    console.log("Message=> ", error.message);
    console.log("Stack=> ", error.stack);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
