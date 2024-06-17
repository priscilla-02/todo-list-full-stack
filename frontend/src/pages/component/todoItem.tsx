import { IToDo } from "@/pages/homepage";
import { TiTick } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useProfile } from "@/hooks/useProfile";


interface IProps {
  fetchTodos: () => Promise<void>;
  todo: IToDo;
  setTodoList: React.Dispatch<React.SetStateAction<IToDo[] | null>>;
  key: number
}

const TodoItem: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { profile } = useProfile()


  const removeToDoItem = async (id: number) => {

    if (profile && profile.user_id && profile.email) {
      try {
        const res = await fetch(`http://localhost:5000/deleteItem/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: profile.user_id, email: profile.email }),
        });
        if (!res.ok) {
          throw new Error("Failed to delete to-do item");
        }

        props.fetchTodos()
      } catch (error) {
        console.error("Error deleting to-do item:", error);
      }
    }
  };

  const markAsComplete = async (id: number) => {

    if (profile && profile.user_id && profile.email) {
      try {
        const res = await fetch(`/api/completeItem/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true, user_id: profile.user_id, email: profile.email }),
        });
        if (!res.ok) {
          throw new Error("Failed to update to-do item");
        }

        props.fetchTodos()
      } catch (error) {
        console.error("Error updating to-do item:", error);
      }
    }

  };


  const markAsIncomplete = async (id: number) => {
    if (profile && profile.email && profile.user_id) {
      try {
        const res = await fetch(`/api/completeItem/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: false, user_id: profile.user_id, email: profile.email }),
        });
        if (!res.ok) {
          throw new Error("Failed to update to-do item");
        }

        props.fetchTodos()
      } catch (error) {
        console.error("Error updating to-do item:", error);
      }
    }
  };


  return (
    <div
      className="flex flex-row w-full justify-between items-center py-4 px-8"
      key={props.todo.id}
    >
      <div className="flex items-center">
        <button
          className={`rounded-lg cursor-pointer m-2 bg-white hover:bg-gray-400 h-8 w-8 flex items-center justify-center`}
          onClick={() =>
            props.todo.completed
              ? markAsIncomplete(props.todo.id)
              : markAsComplete(props.todo.id)
          }
        >
          {props.todo.completed ? <TiTick size={30} color="green" /> : ""}
        </button>
        <span> {props.todo.item}</span>
      </div>
      <div className="flex">
        <button
          className="bg-red-500 hover:bg-red-700 justify-center items-center rounded-lg cursor-pointer p-2 m-2"
          onClick={() => removeToDoItem(props.todo.id)}
        >
          <RiDeleteBin2Line size={20} />
        </button>
      </div>
    </div>
  );
};
export default TodoItem;