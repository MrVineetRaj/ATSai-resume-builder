import { model, models, Schema } from "mongoose";
const userResumeSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resume_title: {
    type: String,
    required: true,
    trim: true,
  },
  job_title: {
    type: String,
    required: false,
    trim: true,
  },
  first_name: {
    type: String,
    required: false,
    trim: true,
  },
  last_name: {
    type: String,
    required: false,
    trim: true,
  },
  links: [
    {
      label: String,
      url: String,
    },
  ],
  address: {
    type: String,
    required: false,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },
  skills: [
    {
      label: String,
      value: [String],
    },
  ],
  experience: [
    {
      title: {
        type: String,
        required: false,
        trim: true,
      },
      company_name: {
        type: String,
        required: false,
        trim: true,
      },
      city: {
        type: String,
        required: false,
        trim: true,
      },
      state: {
        type: String,
        required: false,
        trim: true,
      },
      start_date: {
        type: String,
        required: false,
        trim: true,
      },
      end_date: {
        type: String,
        trim: true,
      },
      currently_working: {
        type: Boolean,
        required: false,
      },
      work_summary: {
        type: String,
        required: false,
        trim: true,
      },
    },
  ],
  projects: [
    {
      title: {
        type: String,
        required: false,
        trim: true,
      },
      github: {
        type: String,
        required: false,
        trim: true,
      },
      demo: {
        type: String,
        required: false,
        trim: true,
      },
      description: {
        type: String,
        required: false,
        trim: true,
      },
    },
  ],
  education: [
    {
      university_name: {
        type: String,
        required: false,
        trim: true,
      },
      start_date: {
        type: String,
        required: false,
        trim: true,
      },
      end_date: {
        type: String,
        required: false,
        trim: true,
      },
      degree: {
        type: String,
        required: false,
        trim: true,
      },
      major: {
        type: String,
        required: false,
        trim: true,
      },
      description: {
        type: String,
        required: false,
        trim: true,
      },
    },
  ],
  certifications: [
    {
      title: {
        type: String,
        required: false,
        trim: true,
      },
      organization: {
        type: String,
        required: false,
        trim: true,
      },
      verification_url: {
        type: String,
        required: false,
        trim: true,
      },
      certification_summary: {
        type: String,
        required: false,
        trim: true,
      },
    },
  ],
});

const UserResumeModel =
  models.UserResume || model("UserResume", userResumeSchema);

export default UserResumeModel;
