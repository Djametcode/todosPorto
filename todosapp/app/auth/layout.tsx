import { useState } from "react";

export default function Authlayout({
  login,
  signup,
}: {
  login: React.ReactNode;
  signup: React.ReactNode;
}) {
  const isRegistered = true;

  return <>{isRegistered ? login : signup}</>;
}
