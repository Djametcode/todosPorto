import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function HomeComponent() {
  return (
    <>
      <div className=" w-screen h-screen bg-slate-100 font-figtree pl-7 pt-14 pr-7 flex flex-col gap-12">
        <div className=" max-w-[300px]">
          <h1 className=" text-4xl leading-8">
            Welcome to{" "}
            <span className=" text-blue-400 font-extrabold text-2xl">
              todosApp
            </span>
          </h1>
        </div>
        <div className=" grid grid-flow-col overflow-scroll gap-x-6 w-full snap-x">
          <div className=" snap-center snap-always bg-indigo-400 w-[275px] h-[250px] p-5 font-figtree text-white rounded-3xl text-2xl whitespace-normal">
            <h1 className=" max-w-[150px]">Manage your activity</h1>
            <p className=" text-sm pt-3">never waste your time anymore</p>
          </div>
          <div className=" snap-center snap-always bg-teal-500 w-[275px] h-[250px] p-5 font-figtree text-white rounded-3xl text-2xl whitespace-normal">
            <h1 className=" max-w-[150px]">Forget to do something?</h1>
            <p className=" text-sm pt-3">never waste your time anymore</p>
          </div>
          <div className=" snap-center snap-always bg-yellow-400 w-[275px] h-[250px] p-5 font-figtree text-white rounded-3xl text-2xl whitespace-normal">
            <h1 className=" max-w-[150px]">Never lose time</h1>
            <p className=" text-sm pt-3">discipline is must</p>
          </div>
        </div>
      </div>
      <Link href={"/auth"} className=" fixed bottom-0 w-full">
        <div className=" bg-black text-white flex gap-5 items-center h-[75px] pl-5">
          <p>Start managing time</p>
          <GoArrowRight size={20} />
        </div>
      </Link>
    </>
  );
}
