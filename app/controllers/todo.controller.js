import TodoDao from "../models/dao/todo.dao";

const todoDao = new TodoDao();

export default class TodoController {

    getTodos = async() => {
        try {
            const todos = await todoDao.getTodos();
            return { status: 200, todos };
        } catch (error) {
            return { status: 500, message: "Error al obtener los todos", error: error.message };
        }
    };

    getTodoById = async(id) => {
        try {
            const todo = await todoDao.getTodoById( id );
            return { status: 200, todo };
        } catch (error) {
            return { status: 500, message: "Error al obtener el todo por el id", error: error.message };
        }
    };
};