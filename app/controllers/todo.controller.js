import TodoDao from "../dao/todo.dao.js";

const todoDao = new TodoDao();

export default class TodoController {

    getTodos = async() => {
        try {
            const payload = await todoDao.getTodos();
            return { status: 200, payload };
        } catch (error) {
            return { status: 500, message: "Error al obtener las tareas", error: error.message };
        }
    };

    getTodoById = async( id ) => {
        try {
            const payload = await todoDao.getTodoById( id );
            if(!payload) return { status: 404, message: "Esa tarea no existe" };
            return { status: 200, payload };
        } catch (error) {
            return { status: 500, message: "Error al obtener la tarea por el id", error: error.message };
        }
    };

    getTodoByCategory = async( category ) => {
        try {
            const payload = await todoDao.getTodoByProperty({ category });
            if(!payload) return { status: 404, message: "Ese campo no existe" };
            return { status: 200, payload };
        } catch (error) {
            return { status: 500, message: "Error al obtener las tarea por ese campo", error: error.message };
        }
    }

    createTodo = async ( todoData ) => {
        try {
            const existingTodo = await todoDao.getTodoByProperty({ title: todoData.title, category: todoData.category });
            if (existingTodo.length > 0) return { status: 400, message: "Ese título ya existe en esa categoría" };
            const { title, category, dueDate } = todoData;
            if(!category || !title || !dueDate) return { message: "Los campos category, title y dueDate son requeridos" };
            const payload = await todoDao.createTodo( todoData );
            return { status: 200, message: "Tarea creada con éxito", payload };
        } catch (error) {
            return { status: 500, message: "Error al crear la tarea", error: error.message };
        }
    };
    
    updateTodoById = async( id, todoData ) => {
        try {
            const todo = await todoDao.getTodoById( id );
            if(!todo) return { status: 404, message: "Esa tarea no existe" };
            const { title, category, description, priority, completed, dueDate } = todoData;
            const payload = await todoDao.updateTodoById( id, { title, category, description, priority, completed, dueDate } );
            return { status: 200, message: "Tarea modificada con exito", payload };
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