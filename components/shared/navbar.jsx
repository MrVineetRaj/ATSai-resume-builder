import { auth } from "@/auth";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  if (session && session?.user) {
    console.log(session);
  }
  return (
    <nav className="flex items-center justify-between w-full px-8 py-2 border-b-2">
      <Link href={"/"} className="h1 text-primary">
        ATSai
      </Link>

      {session && session?.user ? (
        <span className="flex gap-4 items-center">
          <Link
            href={"/dashboard"}
            className="btn  smooth-animation border px-3 py-1 rounded-md hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Image
            src={session?.user?.image}
            width={40}
            height={40}
            alt={session.user?.name}
            className="size-10 rounded-full border-2 border-primary cursor-pointer btn smooth-animation"
          />
        </span>
      ) : (
        <Link
          href={"/auth/login"}
          className="btn bg-primary  text-white text-sm font-semibold px-3 rounded-md py-2 smooth-animation"
        >
          Get Started
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
