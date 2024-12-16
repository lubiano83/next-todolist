import TodoDao from "../models/dao/todo.dao";

const todoDao = new TodoDao();

export default class TodoController {

    getTodos = async() => {
        try {
            const todos = await todoDao.getTodos();
            return { status: 200, todos };
        } catch (error) {
            return { status: 500, message: "Error al obtener las tareas", error: error.message };
        }
    };

    getTodoById = async( id ) => {
        try {
            const todo = await todoDao.getTodoById( id );
            if(!todo) return { status: 404, message: "Esa tarea no existe" };
            return { status: 200, todo };
        } catch (error) {
            return { status: 500, message: "Error al obtener la tarea por el id", error: error.message };
        }
    };

    getTodoByCategory = async( category ) => {
        try {
            const todo = await todoDao.getTodoByProperty({ category });
            if(!todo) return { status: 404, message: "Ese campo no existe" }
            return { status: 200, todo }
        } catch (error) {
            return { status: 500, message: "Error al obtener las tarea por ese campo", error: error.message };
        }
    }

    createTodo = async ( todoData ) => {
        try {
            const existingTodo = await todoDao.getTodoByProperty({ title: todoData.title });
            if (existingTodo) return { status: 400, message: "Ese título ya existe" };
            const createdTodo = await todoDao.createTodo( todoData );
            return { status: 200, message: "Tarea creada con éxito", createdTodo };
        } catch (error) {
            return { status: 500, message: "Error al crear la tarea", error: error.message };
        }
    };    
    
    updateTodoById = async( id, todoData ) => {
        try {
            const todo = await todoDao.getTodoById( id );
            if(!todo) return { status: 404, message: "Esa tarea no existe" };
            const updatedTodo = await todoDao.updateTodoById( id, todoData );
            return { status: 200, message: "Tarea modificada con exito", updatedTodo };
        } catch (error) {
            return { status: 500, message: "Error al modificar la tarea", error: error.message };
        }
    }

    deleteTodoById = async( id ) => {
        try {
            const todo = await todoDao.getTodoById( id );
            if(!todo) return { status: 404, message: "Esa tarea no existe" };
            await todoDao.deleteTodoById( id );
            return { status: 200, message: "Tarea eliminada con exito" };
        } catch (error) {
            return { status: 500, message: "Error al eliminar la tarea", error: error.message };
        }
    }
};