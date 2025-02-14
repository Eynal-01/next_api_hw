import {todos} from "../../../../data/todos";

export default function handler(req, res){
    const {todoId} = req.query;

    const parsedTodoId = parseInt(todoId, 10);
    const requestedTodo = todos.find(todo => todo.id === parsedTodoId);

    const todoIndex = todos.findIndex(
        (todo) => todo.id === parsedTodoId
    );

    if(req.method == "GET"){
        return req.status(200).json(requestedTodo);
    }

    if(req.method == "DELETE"){
        todos.splice(todoIndex, 1);
        return res.status(204).json(requestedTodo);
    }

    if(req.method == "PUT"){
        const {title} = req.body;
        const {description} = req.body;
        const {status} = req.body;

        if(!title || typeof title !== "string"){
            res.status(400).json({error : "Invalid title for uptade list item"})
        }

        todos[todoIndex].title = title; 
        todos[todoIndex].description = description; 
        todos[todoIndex].status = status; 

        res.status(200).json(todos[todoIndex]);
    }
}