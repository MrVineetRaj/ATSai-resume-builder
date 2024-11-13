"use server";
// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'i will share you user details like this{\n  "resume_title": "Full Stack Developer",\n  "__v": 0,\n  "address": "City , India",\n  "email": "example@gmail.com",\n  "job_title": "Full Stack Developer",\n  "phone": "(123) 12345678",\n  "skills": [\n    {\n      "label": "Web Development",\n      "value": [\n        "React",\n        "Node.js",\n        "Express.js",\n        "MongoDB",\n        "Next Js"\n      ]\n    },\n    {\n      "label": "Programming Languages",\n      "value": [\n        "JavaScript",\n        "Python",\n        "C++",\n        "C",\n        "Typescript"\n      ],\n    },\n    {\n      "label": "Tools",\n      "value": [\n        "Git",\n        "Postman",\n        "Docker"\n      ],\n    }\n  ],\n  "first_name": "John",\n  "last_name": "Doe",\n  "experience": [\n    {\n      "title": "Full Stack Developer Intern",\n      "company_name": "XYZ Pvt Ltd",\n      "city": "New york",\n      "state": "NY",\n      "start_date": "2024-07-18",\n      "end_date": "2024-10-18",\n      "work_summary": "**- Designed** efficient and robust backend for reading objects from database along with few **Frontend** components\\n\\n**- Pointed out and solved** a bug that was causing problem to read around **20%** of data.\\n\\n**- Learned** Industry level practices for writing robust and well documented backend code.",\n    }\n  ],\n  "education": [\n    {\n      "university_name": "ABC university , India",\n      "start_date": "2022-07-12",\n      "end_date": "2026-07-12",\n      "degree": "B. Tech",\n      "major": "CSE",\n      "description": "Here i learnt few amazing courses like C++, DSA with C++, Web Development , Data communication , Cloud Computing and Object Oriented Databases.",\n    }\n  ],\n  "projects": [\n    {\n      "title": "ATSai : Resume Builder",\n      "description": "**Techstack** : *Next Js, Mongodb , Gemini*\\n\\n**- Impact** : Now it just take around few minutes to create a resume *tailored to a job description*.\\n\\n**- Features** : User can generate ATS friendly resume with power of AI and even can edit the AI generated resume and can use any ATS friendly template.\\n\\n**- Learning**: Gemini Integration.",\n    },\n    {\n      "title": "WritoCode : Blogging Website",\n      "github": "https://example.com/",\n      "demo": "https://example.com/",\n      "description": "**TechStack** : `Next JS, Mongodb`\\n\\n**- Why Created** : while learning Programming  i was going through lot\'s of bugs so i needed a platform where i can store all that info that i am learning in a well structured format.",\n      \n    }\n  ]\n}  and some job description you have to generate the resume for the user. You have to create an ATS friendly resume  and give me back only json data   , see you may modify the text but the formate structure of data should be same abd description of work experience and projects has markdown support so  make the text so that the resume emphasize more on the skills and the work done by the user for given job title',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "ok pleasse share me user details and user detail is not found then i will create a resume from above details",
        },
      ],
    },
  ],
});

const generateResumeWithAi = async (input) => {
  const result = await chatSession.sendMessage(input);
  const response = result.response.text();

  //   console.log(response);
  // extracting the json data from the response with slice function to extrcat data between ```json and ```

  const match = response.match(/```json([\s\S]*?)```/);

  const jsonText = match[1].trim(); // Get the JSON content

  return jsonText;
  //   return JSON.parse(json);
  //   return JSON.parse(json);
};

export default generateResumeWithAi;
