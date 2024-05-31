import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // eslint-disable-next-line no-unused-vars
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let edit = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(edit[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });

    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompeleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompeleted = !newTodos[index].isCompeleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded bg-violet-100 p-5 min-h-[80vh] md:w-1/3">
        <h1 className="font-bold text-center text-2xl">
          iTask - Manage your todos at once place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-center md:text-start">
            Add a Todo
          </h2>
          <div className="flex">
            {" "}
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-full px-5 py-1"
            />
            <button
              className="bg-violet-800 hover:bg-violet-950 p-4 py-2
       disabled:bg-violet-700 cursor-pointer text-sm font-bold mx-2 text-white rounded-full"
              onClick={handleAdd}
              disabled={todo.length <= 3}
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex gap-2 my-4">
          {" "}
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            id="show"
            className="cursor-pointer"
          />
          <label className="cursor-pointer" htmlFor="show">
            Show Finished
          </label>
        </div>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5"> No Todos to display </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompeleted) && (
                <>
                  <div key={item.id} className="todo flex justify-between my-3">
                    <div className="flex gap-5">
                      {" "}
                      <input
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={item.isCompeleted}
                        name={item.id}
                        id=""
                      />
                      <div className={item.isCompeleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full">
                      {" "}
                      <button
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1
        text-sm font-bold text-white rounded-md mx-1"
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-violet-800 hover:bg-violet-950 p-2 py-1
        text-sm font-bold text-white rounded-md mx-1"
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
