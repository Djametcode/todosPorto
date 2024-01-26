"use client";

import { Itodos } from "@/libs/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoCheckmarkCircle } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";

export default function LandingComponent() {
  const [todo, setTodos] = useState<Itodos[]>([]);
  const [count, setCount] = useState<number>(0);
  console.log(todo);

  const completedTodos = todo.filter((item) => item.isCompleted === true);
  const uncompletedTodos = todo.filter((item) => item.isCompleted === false);
  console.log(completedTodos);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v18/todos/account/get-my-todo",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result: { todos: Itodos[] } = await response.data;
      console.log(result);
      setTodos(result.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const finishTodos = async (todoId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v18/todos/origin/finish-todo/${todoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const unfinishTodos = async (todoId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v18/todos/origin/unfinish-todo/${todoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [count]);
  return (
    <div className=" pt-7">
      <h1 className=" font-figtree text-xl max-w-[200px] pb-3">
        Manage your activity right now
      </h1>
      <div className=" pt-2 flex flex-col gap-5">
        <p className=" font-figtree">{todo.length} Task Available</p>
        <div className=" z-0 relative w-full h-[175px] shadow-sm bg-black rounded-xl">
          <div className=" flex flex-col gap-1 text-white font-figtree h-full w-full pl-7 pt-9">
            <h1>Your Task Growth</h1>
            <p className=" text-xs font-montserat">
              {completedTodos.length} task completed
            </p>
          </div>
          <div className=" absolute top-0 left-0 z-20 w-full">
            <hr className=" h-1 w-full" />
          </div>
        </div>
      </div>
      <div className=" font-figtree pt-6 w-full flex flex-col gap-4">
        <h1>Your Task</h1>
        <div className="  snap-x snap-mandatory flex justify-start gap-5 w-full overflow-scroll">
          {uncompletedTodos.length === 0 ? (
            <div className=" bg-slate-50 shadow-sm rounded-2xl font-figtree h-[175px] flex flex-col gap-1 justify-center items-center w-full">
              <p className=" text-sm">All Todos finished</p>
              <div className=" text-xs flex items-center gap-1">
                create new one <FaPlus size={15} />
              </div>
            </div>
          ) : (
            uncompletedTodos.map((item) => {
              return (
                <div
                  className=" snap-center z-30 relative shadow-md flex flex-col gap-3 bg-white text-black h-[175px] p-5 items-center rounded-xl whitespace-nowrap"
                  key={item._id}
                >
                  <div className=" relative z-30 w-[225px] flex flex-col items-start justify-start h-full">
                    <h1 className=" font-figtree font-bold">{item.title}</h1>
                    <p className=" font-montserat text-xs">{item.todos}</p>
                  </div>
                  <div
                    onClick={() => finishTodos(item._id)}
                    className=" cursor-pointer absolute z-30 top-3 right-3 flex items-center gap-2 bg-slate-50 text-black p-1 rounded-full"
                  >
                    <IoCheckmarkCircle size={25} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className=" font-figtree pt-6">
        <h1>Finished Task</h1>
        <div className=" flex justify-start gap-5 w-full overflow-scroll mt-5">
          {completedTodos.length === 0 ? (
            <div className=" w-full h-[175px] flex justify-center items-center">
              <p className=" font-montserat text-sm italic">No finished todo</p>
            </div>
          ) : (
            completedTodos.map((item) => {
              return (
                <div
                  className=" relative shadow-md flex flex-col gap-3 bg-slate-50/40 h-[175px] p-5 items-center rounded-xl whitespace-nowrap"
                  key={item._id}
                >
                  <div className=" font-figtree w-[225px] h-full flex flex-col items-center justify-center pt-7 pl-3 text-gray-500">
                    <h1 className=" text-sm font-bold line-through">
                      {item.title}
                    </h1>
                    <p className=" text-xs line-through">{item.todos}</p>
                  </div>
                  <div
                    onClick={() => unfinishTodos(item._id)}
                    className=" cursor-pointer absolute right-5 top-5"
                  >
                    <VscDebugRestart size={25} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}