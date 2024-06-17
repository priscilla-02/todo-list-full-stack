import React, { useEffect, useState } from "react";
import TodoItem from "./component/todoItem";
import { useNotification } from "@/hooks/useNotifcation";
import { useProfile } from "@/hooks/useProfile";

export interface IToDo {
  id: number;
  item: string;
  completed?: boolean;
}

const HomePage = () => {
  const [todoList, setTodoList] = useState<IToDo[] | null>(null);
  const [newTodo, setNewTodo] = useState<string>("");
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

      setNewTodo("");
      fetchTodos()
    } catch (error) {
      console.error("Error adding to-do item:", error);
    }

  };


  return (
    <div className="bg-gray-500 min-h-screen">
      <header className="flex flex-col justify-center items-center gap-4 pt-20">
        <h1 className="text-3xl">To-do Lists</h1>
        <div className="flex gap-4">
          <input
            className="px-4 text-gray-600 rounded-lg"
            type="text"
            onBlur={handleInputBlur}
            placeholder="Add a new to-do"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-sky-500 rounded-lg px-4 py-2"
            onClick={handleAddItem}
          >
            Add
          </button>
        </div>
      </header>
      <section className="bg-gray-700 mt-20 w-full flex justify-center items-center">
        <ul>
          {todoList && todoList.length > 0 ? (
            todoList.map((todo: IToDo) => (
              <TodoItem fetchTodos={fetchTodos} todo={todo} setTodoList={setTodoList} key={todo.id} />
            ))
          ) : (
            <div>No to-do items</div>
          )}
        </ul>
      </section>
    </div>
  );
};
export default HomePage;