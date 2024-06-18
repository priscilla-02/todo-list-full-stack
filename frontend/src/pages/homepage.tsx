import React from 'react'
import { useEffect, useState } from "react";
import { useNotification } from "@/hooks/useNotifcation";
import { useProfile } from "@/hooks/useProfile";
import TodoItem from "./component/todoItem";
import StyledButton from "./component/styledButton";
import Logout from "./component/logout";
import NotificationsPopup from "./component/notificatipnPopup";
import { TiPlus, TiTick } from "react-icons/ti";

export interface IToDo {
  id: number;
  item: string;
  completed?: boolean;
}

const HomePage = () => {
  const [todoList, setTodoList] = useState<IToDo[] | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");
  const [clickToAdd, setClickToAdd] = useState<boolean>(false);
  const { setNotification } = useNotification()
  const { profile } = useProfile()

  useEffect(() => {
    fetchTodos();
  }, [profile]);

  const fetchTodos = async () => {

    if (profile && profile.user_id && profile.email) {
      try {
        const res = await fetch(`http://localhost:5000/fetchToDo?user_id=${profile.user_id}&email=${profile.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
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
      const res = await fetch("http://localhost:5000/addToDo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item: newTodo, user_id: profile?.user_id, email: profile?.email }),
      });

      const data = await res.json()


      if (!res.ok) {
        setNotification({ text: data.error[0].message })
        throw new Error("Failed to add to-do item");
      }

      setClickToAdd(true);
      setTimeout(() => {
        setClickToAdd(false);
      }, 2000);

      setNewTodo("");
      fetchTodos()
    } catch (error) {
      console.error("Error adding to-do item:", error);
    }

  };


  return (
    <div className="bg-gray-500 min-h-screen">
      <NotificationsPopup />
      <Logout />

      <section className="flex flex-col justify-center items-center gap-10 pt-28">
        <header>To-Do List</header>
        <div className="flex gap-4">
          <input
            className="px-4 text-gray-600 rounded-lg"
            type="text"
            onBlur={handleInputBlur}
            placeholder="Add a new to-do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <StyledButton onClick={() => handleAddItem()} customStyle={"bg-sky-500 hover:bg-sky-700 flex justify-center items-center"}>
            {clickToAdd ? <TiTick size={30} /> : <TiPlus size={25} />}
          </StyledButton>
        </div>
      </section>

      <section className="w-full flex justify-center">
        <div className=" bg-gray-600 mt-16 w-[80vw] tablet:w-[30vw] flex flex-col justify-center items-center rounded-lg">

          {todoList && todoList.length > 0 ? (
            todoList.map((todo: IToDo) => (
              <TodoItem fetchTodos={fetchTodos} todo={todo} setTodoList={setTodoList} key={todo.id} />
            ))
          ) : (
            <h1 className="flex flex-row justify-between items-center m-4">No To-Do Items...</h1>
          )}

        </div>
      </section>
    </div>
  );
};

export default HomePage;