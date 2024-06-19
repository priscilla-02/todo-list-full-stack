import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Routes } from "@/constants/routes";
import { useNotification } from "@/hooks/useNotifcation";
import { useProfile } from "@/hooks/useProfile";
import TodoItem from "./component/todoItem";
import StyledButton from "./component/styledButton";
import Logout from "./component/logout";
import NotificationsPopup from "./component/notificatipnPopup";
import { TiPlus, TiTick } from "react-icons/ti";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

export interface IToDo {
  id: number;
  item: string;
  completed?: boolean;
}

const HomePage = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const [todoList, setTodoList] = useState<IToDo[] | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");
  const [clickToAdd, setClickToAdd] = useState<boolean>(false);
  const { setNotification } = useNotification();

  useEffect(() => {
    fetchTodos();
  }, [profile]);

  const fetchTodos = async () => {
    if (profile && profile.user_id && profile.email) {
      try {
        const res = await fetch(
          `http://localhost:5000/todos/fetchToDo?user_id=${profile.user_id}&email=${profile.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await res.json();
        setTodoList(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddItem = async () => {
    try {
      const res = await fetch("http://localhost:5000/todos/addToDo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: newTodo,
          user_id: profile?.user_id,
          email: profile?.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNotification({ text: data.error[0].message });
        throw new Error("Failed to add to-do item");
      }

      setClickToAdd(true);
      setTimeout(() => {
        setClickToAdd(false);
      }, 2000);

      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding to-do item:", error);
    }
  };

  return (
    <div className="bg-gray-500 min-h-screen">
      <NotificationsPopup />

      {profile ? (
        <>
          <Logout />

          <section className="flex flex-col justify-center items-center gap-10 pt-28">
            <header>To-Do List</header>
            <div className="flex gap-4 px-4">
              <input
                className="px-4 text-gray-600 rounded-lg"
                type="text"
                onBlur={handleInputBlur}
                placeholder="Add a new to-do"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <StyledButton
                loading={true}
                onClick={() => handleAddItem()}
                customStyle={
                  "bg-sky-500 hover:bg-sky-700 flex justify-center items-center max-w-[40px]"
                }
              >
                {clickToAdd ? <TiTick size={30} /> : <TiPlus size={25} />}
              </StyledButton>
            </div>
          </section>

          <section className="w-full flex justify-center pb-20">
            <div className=" bg-gray-600 mt-16 w-[80vw] tablet:w-[60vw] desktop:w-[30vw] flex flex-col justify-center items-center rounded-lg">
              {todoList && todoList.length > 0 ? (
                todoList.map((todo: IToDo) => (
                  <TodoItem
                    fetchTodos={fetchTodos}
                    todo={todo}
                    setTodoList={setTodoList}
                    key={todo.id}
                    profile={profile}
                  />
                ))
              ) : (
                <h1 className="flex flex-row justify-between items-center m-4">
                  No To-Do Items...
                </h1>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="flex flex-col justify-center items-center gap-20 pt-28 px-2 text-center">
          <header>To-Do List</header>
          <div className="bg-gray-600 rounded-lg py-8 flex flex-col justify-center items-center gap-8 w-[80vw] max-w-[400px]">
            <p>Please login to access To-Do List</p>
            <StyledButton
              loading={true}
              onClick={() => router.push(Routes.LANDINGPAGE)}
              customStyle="max-w-[60px] h-[50px] bg-sky-500 hover:bg-sky-700 flex justify-center items-center"
            >
              <MdOutlinePersonAddAlt1 size={20} />
            </StyledButton>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
