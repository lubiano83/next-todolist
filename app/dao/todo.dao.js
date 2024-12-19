import TodoModel from "../dao/models/todo.model.js";
import { connectDB, isValidId } from "@/app/config/mongoose.config";

export default class TodoDao {

    constructor() {
        connectDB(); // Intentamos conectar a la base de datos
    }

    getTodos = async( filter = {} ) => {
        try {
            return await TodoModel.find( filter );
        } catch (error) {
            throw new Error("Hubo un error al obtener los todos.." + error.message );
        }
    };

    getTodoById = async( id ) => {
        try {
            if (!isValidId(id)) throw new Error("ID no válido");
            return await TodoModel.findOne({ _id: id });
        } catch (error) {
            throw new Error( "Error al obtener el todo por el id: " + error.message );
        }
    }

    getTodoByProperty = async( doc ) => {
        try {
            return await TodoModel.find( doc );
        } catch (error) {
            throw new Error( "Error al obtener el todo por el id: " + error.message );
        }
    }

    createTodo = async( doc ) => {
        try {
            const todo = await TodoModel( doc );
            todo.save();
            return todo;
        } catch (error) {
            throw new Error( "Error al crear una tarea: " + error.message );
        }
    }

    updateTodoById = async( id, doc ) => {
        try {
            if (!isValidId(id)) throw new Error("ID no válido");
            const todo = await this.getTodoById( id );
            if(!todo) throw new Error("Producto no encontrado");
            return await TodoModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
        } catch (error) {
            throw new Error(`Error al actualizar una tarea por el id: ${error.message}`);
        }
    }

    deleteTodoById = async( id ) => {
        try {
            if (!isValidId(id)) throw new Error("ID no válido");
            const todo = await this.getTodoById( id );
            if(!todo) throw new Error("Producto no encontrado");
            return await TodoModel.findByIdAndDelete( id );
        } catch (error) {
            throw new Error("Error al eliminar un producto por el id: " + error.message);
        }
    }
};