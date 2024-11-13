import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main className="body">
      <p className="text-5xl font-bold text-center mt-20 ">
        Generate Your ATS friendly Resume <br />
        Today! with <span className="text-primary">ATSai</span>{" "}
      </p>
      <Button
        className="mt-8 min-w-[180px] text-lg font-semibold btn smooth-animation"
        variant={session?.user ? "outline" : ""}
      >
        {session?.user ? (
          <Link href="/dashboard" className="w-full h-full">
            Dashboard
          </Link>
        ) : (
          "Get Started"
        )}
      </Button>
      <div className="w-[80svw] my-8 relative">
        <img
          src="/images/hero.png"
          alt="hero"
          className="w-full  border-primary border-2 border-t-8 rounded-xl py-4 border-b-0 "
        />
        <div className="absolute left-auto -bottom-8 bg-gradient-to-b from-white to-black/20 blur-lg  h-72 w-[80svw]" />
      </div>
    </main>
  );
}
