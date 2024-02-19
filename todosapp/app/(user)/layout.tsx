"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Iuser } from "@/libs/types";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

export default function UserRootLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Iuser[]>([]);
  const [navbar, setNavbar] = useState<boolean>(false);
  console.log(user);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://todos-porto-backend.vercel.app/api/v18/todos/account/get-current",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result: { user: Iuser } = await response.data;
      console.log(result);
      setUser([result.user]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div className=" w-screen h-screen bg-slate-200">
      {navbar ? (
        <div className=" absolute z-50 top-0 w-full h-full bg-slate-50">
          <div
            onClick={() => setNavbar(!navbar)}
            className=" cursor-pointer absolute right-3 top-3"
          >
            <IoMdClose size={25} />
          </div>
          {user.map((item) => {
            return (
              <div
                key={item._id}
                className=" flex flex-col items-center w-full gap-16 pt-16 font-figtree"
              >
                <div className=" flex items-center flex-col gap-3 text-black">
                  <div className=" bg-slate-200 w-[70px] h-[70px] rounded-full">
                    {item.avatar !== "" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt="avatar"
                        src={item.avatar}
                        className=" w-full h-full rounded-full object-cover"
                      />
                    ) : null}
                  </div>
                  <p className=" text-sm">Edit Avatar</p>
                </div>
                <div className=" flex flex-col gap-5">
                  <div className=" w-[265px] flex justify-between items-center text-sm">
                    <p>Username:</p>
                    <input
                      type="text"
                      placeholder={"username"}
                      value={item.username}
                      className=" bg-transparent border-b focus:outline-none"
                    />
                  </div>
                  <div className=" w-[265px] flex justify-between items-center text-sm">
                    <p>Email:</p>
                    <input
                      type="text"
                      placeholder={"username"}
                      value={item.email}
                      className=" bg-transparent border-b focus:outline-none"
                    />
                  </div>
                  <div className=" w-[265px] flex gap-20 items-center text-sm">
                    <p>Avatar:</p>
                    <input
                      type="file"
                      className=" text-sm bg-transparent border-b focus:outline-none"
                    />
                  </div>
                </div>
                <div className=" w-16 text-center bg-slate-200 p-1 rounded-xl">
                  <button className=" text-sm ">Save</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {user.map((item) => {
        return (
          <>
            <div key={item._id} className=" w-full h-full  pl-6 pr-6">
              <div className=" flex justify-between  font-figtree h-16 items-center">
                {item.avatar !== "" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="avatar"
                    src={item.avatar}
                    className=" w-[45px] h-[45px] rounded-2xl object-cover"
                  />
                ) : null}
                <h1>Hello {item.username}</h1>
                <div
                  onClick={() => setNavbar(!navbar)}
                  className=" cursor-pointer bg-slate-50 p-1 rounded-xl"
                >
                  <GiHamburgerMenu size={30} />
                </div>
              </div>
              {children}
            </div>
          </>
        );
      })}
    </div>
  );
}
