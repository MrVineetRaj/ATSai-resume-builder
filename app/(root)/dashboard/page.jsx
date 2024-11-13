import { auth } from "@/auth";
import AddResume from "@/components/dashboard/AddResume";
import UserResume from "@/components/dashboard/UserResume";
import React from "react";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <section className="w-full p-2 sm:py-4 sm:px-12 md:px-20">
      <h1>My Resume</h1>
      <p>Start creating Resume to your next Job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4 md:mt-8 gap-2 min-h-full ">
        <AddResume session={session} />
        <UserResume session={session} />
      </div>
    </section>
  );
};

export default DashboardPage;
