"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <div className=" flex flex-col gap-16 h-screen w-screen items-center justify-center bg-slate-100">
      <div className=" absolute top-24">
        <div className=" font-figtree text-2xl w-full flex justify-center">
          <p>Welcome to todosApp</p>
        </div>
      </div>
      <div className="">{children}</div>
      <div className=" absolute bottom-10">
        <p className=" text-sm">
          Do not have account ?{" "}
          <Link className=" text-blue-600" href={"/auth/signup"}>
            create account
          </Link>
        </p>
      </div>
    </div>
  );
}
