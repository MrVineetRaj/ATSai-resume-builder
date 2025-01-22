"use client";
import { setUser } from "@/lib/redux/slices/user";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Loaduser = ({ session }) => {
  //   setUser;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    // console.log(session?.user);
    if (session && session?.user) {
      console.log(session?.user?.id);
      dispatch(
        setUser({
          _id: session.user.id,
          isLogged: true,
        })
      );
    } else if (
      pathName.includes("/dashboard/resume/guest")
    ) {
      window.document.title = "User Resume";
      console.log("redirecting");
    }else{
      router.push("/");
    }
  }, [session]);
  //   dispatch(setUser(user));
};

export default Loaduser;
