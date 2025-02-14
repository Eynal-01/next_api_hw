// import axios from "axios";
// import { useState } from "react";
// import { FiEdit, FiTrash } from "react-icons/fi"; 

// const TodosPage = () => {
//   const [todos, setTodos] = useState([]);

//   const fetchTodos = async () => {
//     const response = await axios.get("/api/todos");
//     setTodos(response.data);
//   };

//   const addNewTodo = async () => {
//     await axios.post("/api/todos", {
//       title: "New Todo",
//       description: "Description of todo",
//       status: "Pending",
//       id: Date.now(),
//     });
//     fetchTodos();
//   };

//   const deleteTodo = async (id) => {
//     await axios.delete(`/api/todos/${id}`);
//     fetchTodos();
//   };

//   const editTodo = async (id) => {
//     const response = await axios.put(`/api/todos/${id}`, {
//       title: "Edited Todo",
//     });
//     fetchTodos();
//     console.log('response.data', response.data)
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">To-Do List</h1>

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={fetchTodos}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
//         >
//           Fetch Todos
//         </button>
//         <button
//           onClick={addNewTodo}
//           className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
//         >
//           + Add New Todo
//         </button>
//       </div>

//       <ul className="w-full max-w-2xl">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className="bg-white p-5 rounded-lg shadow-md mb-4 flex justify-between items-center transition duration-300 hover:shadow-lg"
//           >
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {todo.title}
//               </h3>
//               <p className="text-gray-600">{todo.description}</p>
//               <span
//                 className={`text-sm font-bold px-2 py-1 rounded-md ${
//                   todo.status === "Completed"
//                     ? "bg-green-200 text-green-800"
//                     : "bg-yellow-200 text-yellow-800"
//                 }`}
//               >
//                 {todo.status}
//               </span>
//             </div>

//             <div className="flex gap-3">

//               <button
//                 onClick={() => editTodo(todo.id)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition duration-300 flex items-center gap-1"
//               >
//                 <FiEdit size={18} /> Edit
//               </button>

//               <button
//                 onClick={() => deleteTodo(todo.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-300 flex items-center gap-1"
//               >
//                 <FiTrash size={18} /> Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodosPage;








import axios from "axios";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; 

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoData, setEditTodoData] = useState(null); 

  const fetchTodos = async () => {
    const response = await axios.get("/api/todos");
    setTodos(response.data);
  };

  const addNewTodo = async () => {
    await axios.post("/api/todos", {
      title: "New Todo",
      description: "Description of todo",
      status: "Pending",
      id: Date.now(),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  const updateTodo = async (event) => {
    event.preventDefault(); 

    const { id, title, status, description } = editTodoData;

    await axios.put(`/api/todos/${id}`, { title, status, description });
    
    setEditTodoData(null); 
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">To-Do List</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchTodos}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
        >
          Fetch Todos
        </button>
        <button
          onClick={addNewTodo}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full shadow-md transition duration-300"
        >
          + Add New Todo
        </button>
      </div>

      <ul className="w-full max-w-2xl">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-white p-5 rounded-lg shadow-md mb-4 flex justify-between items-center transition duration-300 hover:shadow-lg"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <span
                className={`text-sm font-bold px-2 py-1 rounded-md ${
                  todo.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {todo.status}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditTodoData(todo)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition duration-300 flex items-center gap-1"
              >
                <FiEdit size={18} /> Edit
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-300 flex items-center gap-1"
              >
                <FiTrash size={18} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editTodoData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form onSubmit={updateTodo} className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={editTodoData.title}
              onChange={(e) => setEditTodoData({ ...editTodoData, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Description</label>
            <input
              type="text"
              value={editTodoData.description}
              onChange={(e) => setEditTodoData({ ...editTodoData, description: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Status</label>
            <select
              value={editTodoData.status}
              onChange={(e) => setEditTodoData({ ...editTodoData, status: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setEditTodoData(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodosPage;

