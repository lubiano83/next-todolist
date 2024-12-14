import TodoModel from "../todo.model";
import { connectDB, isValidId } from "@/app/config/mongoose.config";

export default class TodoDao {

    constructor() {
        connectDB(); // Intentamos conectar a la base de datos
    }

    getTodos = async() => {
        try {
            return await TodoModel.find();
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
};