import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const session = await auth();
  const loginOptions = ["github"];

  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col justify-center h-screen bg-primary w-full">
      <div className="min-w-96 mx-auto max-w-[600px] p-4 bg-white rounded-md shadow-md">
        <h1 className=" text-primary ">Sign In</h1>
        <h3 className="my-4">
          Welcome Abroad user! thankyou for trusting with us for your resume
          building
        </h3>
        <div className="flex flex-col gap-4 w-full mt-4">
          {loginOptions.map((option, index) => (
            <form
              key={index}
              action={async () => {
                "use server";
                const res = await signIn(option);
                // console.log("res => ", res);
              }}
            >
              <Button
                type="submit"
                variant="outline"
                className="min-w-48 w-full border-2 border-primary hover:bg-primary hover:text-white"
              >
                Sign in with{" "}
                <Image src={`/icons/${option}.svg`} width={20} height={40} />
              </Button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
