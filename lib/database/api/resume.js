import axios from "axios";

const createResume = async (email, resume_title) => {
  console.log(email, resume_title);
  try {
    const res = await axios.post(`/api/resume`, { email, resume_title });
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Broke!",
    };
  }
};

const getResumes = async (user_id) => {
  try {
    const res = await axios.get(`/api/resume?user_id=${user_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Broke!",
    };
  }
};
const getOneResume = async (resume_id, userId) => {
  // console.log("Here => ", resume_id, userId);
  try {
    const res = await axios.get(`/api/resume/${resume_id}?user_id=${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Broke!",
    };
  }
};

const updateOneResume = async (resume_id, update) => {
  try {
    const res = await axios.patch(`/api/resume/${resume_id}`, { update });
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Broke!",
    };
  }
};

const getOneResumeForGuest = async (resume_id) => {
  try {
    const res = await axios.get(`/api/resume/guest?resume_id=${resume_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Broke!",
    };
  }
};
export {
  createResume,
  getResumes,
  getOneResume,
  updateOneResume,
  getOneResumeForGuest,
};
