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
    </div>
  );
}
