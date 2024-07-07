import React from "react";

type Props = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
