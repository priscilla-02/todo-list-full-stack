import { Profile } from "@/hooks/useProfile";
import { IToDo } from "@/pages/homepage";
import { TiTick } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";



interface IProps {
  fetchTodos: () => Promise<void>;
  todo: IToDo;
  setTodoList: React.Dispatch<React.SetStateAction<IToDo[] | null>>;
  key: number
  profile: Profile | undefined
}

const TodoItem: React.FC<IProps> = (props: IProps): JSX.Element => {

  const removeToDoItem = async (id: number) => {

    if (props.profile && props.profile.user_id && props.profile.email) {
      try {
        const res = await fetch(`http://localhost:5000/todos/deleteItem/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: props.profile.user_id, email: props.profile.email }),
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

    if (props.profile && props.profile.user_id && props.profile.email) {
      try {
        const res = await fetch(`http://localhost:5000/todos/completeItem/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true, user_id: props.profile.user_id, email: props.profile.email }),
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
    if (props.profile && props.profile.email && props.profile.user_id) {
      try {
        const res = await fetch(`http://localhost:5000/todos/completeItem/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: false, user_id: props.profile.user_id, email: props.profile.email }),
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
      className="flex flex-row w-full justify-between items-center py-4 px-8 break-words"
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
        <p className="m-2 w-[30vw] tablet:w-[36vw] desktop:w-[17vw]">{props.todo.item}</p>
      </div>
      <div className="flex">
        <button
          className="bg-red-500 hover:bg-red-700 h-10 w-10 flex justify-center items-center rounded-lg cursor-pointer"
          onClick={() => removeToDoItem(props.todo.id)}
        >
          <RiDeleteBin2Line size={20} />
        </button>
      </div>
    </div>
  );
};
export default TodoItem;