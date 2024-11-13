import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const session = await auth();
  const loginOptions = ["github", "google", "facebook"];

  if (session) {
    redirect("/");
  }
  return (
    <div>
      <h1>Sign In</h1>
      <div className="flex flex-col gap-4">
        {loginOptions.map((option, index) => (
          <form
            key={index}
            action={async () => {
              "use server";
              const res = await signIn(option);
              console.log("res => ", res);
            }}
          >
            <Button type="submit" variant="outline" className="min-w-48">
              Sign in with{" "}
              <Image src={`/icons/${option}.svg`} width={20} height={40} />
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default Login;
