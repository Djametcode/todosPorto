"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginComponent() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (type: string, data: string) => {
    if (type === "username") {
      setUsername(data);
    }

    if (type === "email") {
      setEmail(data);
    }

    if (type === "password") {
      setPassword(data);
    }
  };

  const resetField = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todos-porto-backend.vercel.app/api/v18/todos/register",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      const result = await response.data;
      console.log(result);
      resetField();
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col gap-8">
      <form className=" font-figtree flex flex-col w-[375px] gap-5" action="">
        <div className=" flex flex-col gap-2">
          <label className=" text-sm" htmlFor="">
            Username
          </label>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("username", e.target.value)
            }
            className=" bg-slate-50 border p-3 rounded-lg focus:outline-none placeholder:text-sm text-sm"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label className=" text-sm" htmlFor="">
            Email
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("email", e.target.value)
            }
            className=" bg-slate-50 border p-3 rounded-lg focus:outline-none placeholder:text-sm text-sm"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label className=" text-sm" htmlFor="">
            Password
          </label>
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("password", e.target.value)
            }
            className=" bg-slate-50 border p-3 rounded-lg focus:outline-none placeholder:text-sm text-sm"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className=" flex items-center justify-center">
          <button
            onClick={registerUser}
            className=" bg-slate-50 p-2 rounded-lg w-[100px] border text-sm"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className=" flex h-4 items-center gap-4">
        <hr className=" w-full h-1" />
        <p className=" text-sm">OR</p>
        <hr className=" w-full h-1" />
      </div>
      <div className=" flex items-center gap-3 p-3 justify-center rounded-lg bg-slate-50 border">
        <FcGoogle size={25} />
        <p className=" text-sm">Sign up With Google</p>
      </div>
    </div>
  );
}
