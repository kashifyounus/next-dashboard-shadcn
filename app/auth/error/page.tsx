"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("error");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    switch (errorType) {
      case "CredentialsSignin":
        setErrorMessage("Invalid email or password.");
        break;
      case "Configuration":
        setErrorMessage("There is a configuration error.");
        break;
      case "AccessDenied":
        setErrorMessage("You do not have permission to sign in.");
        break;
      case "Verification":
        setErrorMessage("The sign-in link is no longer valid.");
        break;
      case "Server":
        setErrorMessage("Server error. Please try again later.");
        break;
      default:
        setErrorMessage("An unknown error occurred.");
    }
  }, [errorType]);

  return (
    <div>
      <h1>Sign-in Error</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <a href="/auth/signin">Go back to Sign in</a>
    </div>
  );
};

export default ErrorPage;
