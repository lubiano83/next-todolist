import UserModel from "./models/user.model";
import { connectDB, isValidId } from "../config/mongoose.config";

export default class UserDao {

    constructor() {
        connectDB(); // Intentamos conectar a la base de datos
    }

    getUsers = async() => {
        try {
            return await UserModel.find();
        } catch (error) {
            throw new Error("Hubo un error al obtener los usuarios.." + error.message );
        }
    };

    getUserById = async( id ) => {
        try {
            if (!isValidId(id)) throw new Error("ID no válido");
            return await UserModel.findOne({ _id: id });
        } catch (error) {
            throw new Error( "Error al obtener el usuario por el id: " + error.message );
        }
    }
};