"use client";

import axios from "axios";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  console.log(email);
  console.log(password);

  const handleChange = (type: string, data: string) => {
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
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v18/todos/login",
        {
          email: email,
          password: password,
        }
      );
      const result: { token: string } = await response.data;
      Cookies.set("token", result.token);

      resetField();
      console.log(result);
      router.push("/landing");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col gap-10">
      <form className=" font-figtree flex flex-col w-[375px] gap-5" action="">
        <div className=" flex flex-col gap-2">
          <label className=" text-sm" htmlFor="">
            Continue with email
          </label>
          <input
            value={email}
            className=" bg-slate-50 border p-3 rounded-lg focus:outline-none placeholder:text-sm text-sm"
            type="text"
            placeholder="Enter your email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("email", e.target.value)
            }
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label className=" text-sm" htmlFor="">
            Password
          </label>
          <input
            value={password}
            className=" bg-slate-50 border p-3 rounded-lg focus:outline-none placeholder:text-sm text-sm"
            type="password"
            placeholder="Enter your password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("password", e.target.value)
            }
          />
        </div>
        <div className=" flex items-center justify-center">
          <button
            onClick={(e) => loginHandler(e)}
            className=" bg-slate-50 p-2 rounded-lg w-[100px] border text-sm"
          >
            Login
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
        <p className=" text-sm">Sign in With Google</p>
      </div>
    </div>
  );
}
