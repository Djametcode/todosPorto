import Link from "next/link";

export default function HomeComponent() {
  return (
    <div className=" w-screen h-screen bg-black text-white font-figtree flex flex-col gap-2 justify-center items-center">
      <h1 className=" text-xl">Welcome to todos app</h1>
      <div>
        <Link href={"/auth/login"} className=" border p-1 rounded-xl">
          Login
        </Link>
      </div>
    </div>
  );
}
