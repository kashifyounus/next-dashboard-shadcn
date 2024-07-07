"use client";
import { SignInUser } from "@/actions/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { AuthError } from "next-auth";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const submitHanlder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setError(null); // reset error
      const csrfToken = await getCsrfToken();
      const res = await SignInUser({ email, password, csrfToken });
      console.log("res", res);
      if (res?.error) {
        setError(res.error);
      } else {
        console.log("Successfully logged in");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log("sign-in page error", error.type);
      if (error instanceof AuthError) {
        console.log("AuthError", error);
      }
    }
  };
  useEffect(() => {
    const health = async () => {
      //   const res = await axios.get("https://localhost:7092/health");
      //   console.log("health", res.data);

      const response = await axios.post("https://localhost:7092/login", {
        email: "user@example.com",
        password: "User@123",
      });
      console.log("response", response.data);
    };
    //health();
  }, []);
  return (
    <form onSubmit={submitHanlder}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        {error && (
          <div className="bg-destructive text-red-500 p-3 rounded-md">
            {error}
          </div>
        )}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
