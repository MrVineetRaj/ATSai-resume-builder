# Next Auth

go to [Auth.js](https://authjs.dev/getting-started/installation?framework=Next.js)

## Run commands

```bash
npm install next-auth@beta
npx auth secret
```

1. Start by creating a new `auth.ts` file at the `root` of your app with the following content.

   ```ts
   import NextAuth from "next-auth";

   export const { handlers, signIn, signOut, auth } = NextAuth({
     providers: [],
   });
   ```

2. Add a Route Handler under `/app/api/auth/[...nextauth]/route.ts.`

   ```ts
   import { handlers } from "@/auth"; // Referring to the auth.ts we just created

   export const { GET, POST } = handlers;
   ```

## Setting up Providers

- **Github ->**
  After going to [url](https://authjs.dev/getting-started/providers/github) Followed the commands to create an Github App and placed the Callback URL
  ```bash
  https://example.com/api/auth/callback/github
  ```
  And got completed setup for `.env.local` variables
  ```.env
  AUTH_GITHUB_ID
  AUTH_GITHUB_SECRET
  ```
- Update the `./auth.ts`

  example;

  ```ts
  import NextAuth from "next-auth";
  import GitHub from "next-auth/providers/github";

  export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
      async signIn({ user, account }) {
        try {
          await dbConnect();
          const { name, email, image } = user;

          const is_existing_user = await UserModel.findOne({ email: email });

          if (is_existing_user) {
            return true;
          }

          const new_user = new UserModel({
            name,
            email,
            image,
          });

          await new_user.save();

          return true;
        } catch (error) {
          return false;
        }
      },
    },
    // many more attributes are available refer official website
  });
  ```

## Using it for sign-in

```js
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
              // console.log("res => ", res);
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
```
