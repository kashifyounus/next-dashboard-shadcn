"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getCsrfToken } from "next-auth/react";

export const SignInUser = async (credential: {
  email: string;
  password: string;
  csrfToken: string;
}) => {
  try {
    //const csrfToken = await getCsrfToken();
    const res = await signIn("credentials", {
      redirect: false,
      email: credential.email,
      password: credential.password,
      csrfToken: credential.csrfToken,
    });
    //console.log("ServerAction res", res);
    return { success: true, redirectTo: "/dashboard" };
  } catch (error: any) {
    if (error instanceof AuthError) {
      console.log("error.error", error);
      console.log("error.cause.provider", error.cause?.provider);
      console.log("error.cause.code", error.cause?.code);
      console.log("error.cause?.err?.message", error.cause?.err);
      if (
        error.cause?.code === "ECONNREFUSED" &&
        error.cause?.code !== undefined
      ) {
        console.log("Authenticating server is down");
        return { error: "CredentialsSignin" };
      }
      return { error: error.cause?.err?.message };
    }
    console.log("Unknown error", error);
    return { error: "Unknown error: " + error };
  }
};
