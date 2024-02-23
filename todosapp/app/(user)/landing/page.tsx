/* eslint-disable react/jsx-key */
"use client";

import { Itodos } from "@/libs/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoCheckmarkCircle } from "react-icons/io5";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";

export default function LandingComponent() {
  const [todo, setTodos] = useState<Itodos[]>([]);
  const [newTodos, setNewTodos] = useState<boolean>(true);

  const [count, setCount] = useState<number>(0);
  console.log(todo);
  const [update, setUpdate] = useState<boolean>(false);

  const completedTodos = todo.filter((item) => item.isCompleted === true);
  const uncompletedTodos = todo.filter((item) => item.isCompleted === false);
  console.log(completedTodos);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://todos-porto-backend.vercel.app/api/v18/todos/account/get-my-todo",
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
      setUpdate(true);
      const response = await axios.put(
        `https://todos-porto-backend.vercel.app/api/v18/todos/origin/finish-todo/${todoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const result = await response.data;
      console.log(result);
      setUpdate(false);
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const unfinishTodos = async (todoId: string) => {
    try {
      setUpdate(true);
      const response = await axios.put(
        `https://todos-porto-backend.vercel.app/api/v18/todos/origin/unfinish-todo/${todoId}`,
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
      setUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [count]);
  return (
    <div className=" pb-20">
      {newTodos ? null : null}
      <div className=" flex w-full justify-between items-center h-[125px]">
        <div>
          <h1 className=" font-figtree text-3xl max-w-[200px] pb-1">
            Hi User!
          </h1>
          <p className=" font-figtree text-2xl font-extralight">Good Night</p>
        </div>
        <div className=" h-full flex items-center">
          <div className=" bg-indigo-400/20 p-[15px] rounded-xl">
            <GoSearch size={30} />
          </div>
        </div>
      </div>
      <div className=" flex gap-3 text-black/80 font-figtree pt-4">
        <div className=" flex items-center justify-center bg-indigo-400 w-full h-[50px] rounded-3xl text-white">
          <p>To do</p>
        </div>
        <div className=" flex items-center justify-center bg-pink-300/60 w-full rounded-3xl">
          <p>In progress</p>
        </div>
        <div className=" flex items-center justify-center bg-orange-200 w-full rounded-3xl">
          <p>Done</p>
        </div>
      </div>
      {/* <div className=" pt-2 flex flex-col gap-5">
        <p className=" font-figtree">{todo.length} Task Available</p>
        <div className=" z-0 relative w-full h-[175px] bg-slate-50 rounded-xl">
          <div className=" flex flex-col gap-1 font-figtree h-full w-full pl-7 pt-9 font-extrabold">
            <h1>Your Task Growth</h1>
            <p className=" text-xs font-montserat">
              {completedTodos.length} task completed
            </p>
          </div>
          <div className=" absolute top-0 left-0 z-20 w-full">
            <hr className=" h-1 w-full" />
          </div>
        </div>
      </div> */}
      <div className=" font-figtree pt-6 w-full flex flex-col gap-4">
        <div className="  snap-x snap-mandatory flex justify-start gap-5 w-full overflow-scroll">
          {uncompletedTodos.length === 0 ? (
            <div className=" bg-slate-50 shadow-sm rounded-2xl font-figtree h-[175px] flex flex-col gap-1 justify-center items-center w-full">
              <p className=" text-sm">All Todos finished</p>
              <div className=" text-xs flex items-center gap-1">
                create new one <FaPlus size={15} />
              </div>
            </div>
          ) : (
            uncompletedTodos.map((item, index) => {
              return update ? (
                <div
                  className={` ${
                    index % 2 == 0 ? "bg-indigo-400" : " bg-teal-400"
                  } snap-center z-30 relative shadow-md flex flex-col bg-indigo-400 h-[250px] p-5 rounded-3xl whitespace-nowrap`}
                  key={item._id}
                >
                  <div className=" flex justify-between">
                    <div className=" bg-orange-400 text-white w-[50px] flex items-center justify-center text-sm rounded-xl">
                      <h1>New</h1>
                    </div>
                    <div className=" text-white">
                      <GoArrowUpRight size={25} />
                    </div>
                  </div>
                  <div className=" relative z-30 w-[175px] whitespace-normal flex flex-col gap-5 items-start justify-start h-full pt-7 text-white">
                    <h1 className=" font-figtree font-bold text-xl max-w-[150px]">
                      {item.title.slice(0, 1).toUpperCase() +
                        item.title.slice(1, 16) +
                        "..."}
                    </h1>
                    <p className=" font-montserat text-xs">{item.todos}</p>
                  </div>
                  <div className=" flex">
                    <div className=" w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-2 border w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-4 border w-[25px] h-[25px] bg-white rounded-full"></div>
                  </div>
                  {/* <div
                  onClick={() => finishTodos(item._id)}
                  className=" cursor-pointer absolute z-30 top-3 right-3 flex items-center gap-2 p-1"
                >
                  <GoArrowUpRight size={25} />
                </div> */}
                </div>
              ) : (
                <div
                  className={` ${
                    index % 2 == 0 ? "bg-indigo-400" : " bg-teal-400"
                  } snap-center z-30 relative shadow-md flex flex-col bg-indigo-400 h-[250px] p-5 rounded-3xl whitespace-nowrap`}
                  key={item._id}
                >
                  <div className=" flex justify-between">
                    <div className=" bg-orange-400 text-white w-[50px] flex items-center justify-center text-sm rounded-xl">
                      <h1>New</h1>
                    </div>
                    <div
                      onClick={() => finishTodos(item._id)}
                      className=" text-white cursor-pointer"
                    >
                      <GoArrowUpRight size={25} />
                    </div>
                  </div>
                  <div className=" relative z-30 w-[175px] whitespace-normal flex flex-col gap-5 items-start justify-start h-full pt-7 text-white">
                    <h1 className=" font-figtree font-bold text-xl max-w-[150px]">
                      {item.title.slice(0, 1).toUpperCase() +
                        item.title.slice(1, 16) +
                        "..."}
                    </h1>
                    <p className=" font-montserat text-xs">{item.todos}</p>
                  </div>
                  <div className=" flex">
                    <div className=" w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-2 border w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-4 border w-[25px] h-[25px] bg-white rounded-full"></div>
                  </div>
                  {/* <div
                    onClick={() => finishTodos(item._id)}
                    className=" cursor-pointer absolute z-30 top-3 right-3 flex items-center gap-2 p-1"
                  >
                    <GoArrowUpRight size={25} />
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className=" font-figtree pt-9">
        <h1 className=" text-xl">Finished Todo</h1>
        <div className=" flex justify-start gap-5 w-full overflow-scroll mt-5">
          {completedTodos.length === 0 ? (
            <div className=" w-full h-[175px] flex justify-center items-center">
              <p className=" font-montserat text-base ">No finished todo</p>
            </div>
          ) : (
            completedTodos.map((item, index) => {
              return update ? (
                <div
                  className={` ${
                    index % 2 == 0 ? "bg-indigo-400" : " bg-teal-400"
                  } snap-center z-30 relative shadow-md flex flex-col bg-indigo-400 h-[250px] p-5 rounded-3xl whitespace-nowrap`}
                  key={item._id}
                >
                  <div className=" flex justify-between">
                    <div className=" bg-orange-400 text-white w-[50px] flex items-center justify-center text-sm rounded-xl">
                      <h1>New</h1>
                    </div>
                    <div
                      onClick={() => unfinishTodos(item._id)}
                      className=" cursor-pointer text-white"
                    >
                      <GoArrowUpRight size={25} />
                    </div>
                  </div>
                  <div className=" relative z-30 w-[175px] whitespace-normal flex flex-col gap-5 items-start justify-start h-full pt-7 text-white">
                    <h1 className=" font-figtree font-bold text-xl max-w-[150px]">
                      {item.title.slice(0, 1).toUpperCase() +
                        item.title.slice(1, 16) +
                        "..."}
                    </h1>
                    <p className=" font-montserat text-xs">{item.todos}</p>
                  </div>
                  <div className=" flex">
                    <div className=" w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-2 border w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-4 border w-[25px] h-[25px] bg-white rounded-full"></div>
                  </div>
                  {/* <div
                  onClick={() => finishTodos(item._id)}
                  className=" cursor-pointer absolute z-30 top-3 right-3 flex items-center gap-2 p-1"
                >
                  <GoArrowUpRight size={25} />
                </div> */}
                </div>
              ) : (
                <div
                  className={` ${
                    index % 2 == 0 ? "bg-indigo-400" : " bg-teal-400"
                  } snap-center z-30 relative shadow-md flex flex-col bg-indigo-400 h-[250px] p-5 rounded-3xl whitespace-nowrap`}
                  key={item._id}
                >
                  <div className=" flex justify-between">
                    <div className=" bg-orange-400 text-white w-[50px] flex items-center justify-center text-sm rounded-xl">
                      <h1>New</h1>
                    </div>
                    <div className=" text-white">
                      <GoArrowUpRight size={25} />
                    </div>
                  </div>
                  <div className=" relative z-30 w-[175px] whitespace-normal flex flex-col gap-5 items-start justify-start h-full pt-7 text-white">
                    <h1 className=" font-figtree font-bold text-xl max-w-[150px]">
                      {item.title.slice(0, 1).toUpperCase() +
                        item.title.slice(1, 16) +
                        "..."}
                    </h1>
                    <p className=" font-montserat text-xs">{item.todos}</p>
                  </div>
                  <div className=" flex">
                    <div className=" w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-2 border w-[25px] h-[25px] bg-white rounded-full"></div>
                    <div className=" -translate-x-4 border w-[25px] h-[25px] bg-white rounded-full"></div>
                  </div>
                  {/* <div
                    onClick={() => finishTodos(item._id)}
                    className=" cursor-pointer absolute z-30 top-3 right-3 flex items-center gap-2 p-1"
                  >
                    <GoArrowUpRight size={25} />
                  </div> */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
