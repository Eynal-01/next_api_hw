import { todos } from "../../../../data/todos";

export default function handler(req, res) {
  if (req.method == "GET") {
    return res.status(200).json(todos);
  }

  if (req.method == "POST") {
    console.log(req.body);
    const newTodo = {
      ...req.body,
      id: Date.now(),
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
  }
}
