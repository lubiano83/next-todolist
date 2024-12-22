import UserDao from "../dao/user.dao";
import { createHash, isValidPassword } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const userDao = new UserDao();

export default class UserController {

    getUsers = async() => {
        try {
            const payload = await userDao.getUsers();
            return { status: 200, payload };
        } catch (error) {
            return { status: 500, message: "Error al obtener los usuarios", error: error.message };
        }
    };

    getUserById = async( id ) => {
        try {
            const payload = await userDao.getUserById( id );
            if( !payload ) return { status: 404, message: "Ese usuario no existe" };
            return { status: 200, payload };
        } catch (error) {
            return { status: 500, message: "Error al obtener el usuario por el id", error: error.message };
        }
    };

    getUserByEmail = async( email ) => {
        try {
            const payload = await userDao.getUserByEmail({ email });
            if( !payload ) return { status: 404, message: "Ese usuario no existe" };
            return { status: 200, payload };
        } catch (error) {
            return { status: 500, message: "Error al obtener el usuario por el id", error: error.message };
        }
    };

    registerUser = async( userData ) => {
        try {
            const user = await userDao.getUserByEmail({ email: userData.email })
            if( user ) {
                return { message: "Ese email ya esta registrado" };
            } else {
                const { first_name, last_name, email, password } = userData;
                if(!first_name || !last_name || !email || !password) return { message: "Todos los campos son requeridos" };
                if (password.length < 6 || password.length > 10) return { status: 400, message: "La contraseña debe tener entre 6 y 10 caracteres." };
                const hashedPassword = await createHash(password);
                const newUserData = { first_name, last_name, email, password: hashedPassword };
                const payload = await userDao.createUser(newUserData);
                return { status: 201, message: "Usuario registrado con exito", payload };
            }
        } catch (error) {
            return { status: 500, message: "Error al registrar un usuario", error: error.message };
        }
    };

    loginUser = async( userData ) => {
        try {
            const { email, password } = userData;
            if ( !email || !password ) return { status: 400, message: "El email y contraseña son requeridos" };
            const user = await userDao.getUserByEmail({ email });
            if ( !user ) return { status: 404, message: "El usuario no está registrado" };
            const passwordMatch = await isValidPassword( user, password );
            if ( !passwordMatch ) return { status: 401, message: "La contraseña es incorrecta" };
            const token = jwt.sign({ email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role, todos: user.todos, id: user._id.toString() }, process.env.COOKIE_KEY, { expiresIn: "1h" });
            return { status: 200, message: "Usuario logeado con éxito", payload: token };
        } catch (error) {
            return { message: "Error al iniciar un sesion", error: error.message };
        }
    }

    logoutUser = async (token) => {
        try {
            if (!token) return { status: 401, message: "Token no encontrado, sesión cerrada" };
            try {
                const decoded = jwt.verify(token, process.env.COOKIE_KEY);
                console.log("Token decodificado:", decoded);
            } catch (error) {
                return { status: 401, message: "Token inválido o expirado" };
            }
            return { status: 200, message: "Sesión cerrada con éxito", cookie: { name: "coderCookieToken", value: "", options: { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: -1, path: "/" }}};
        } catch (error) {
            return { status: 500, message: "Error al cerrar sesión", error: error.message };
        }
    };
    
    updateUserById = async( id, userData ) => {
        try {
            const user = await userDao.getUserById( id );
            if( !user ) return { status: 404, message: "Ese usuario no existe" };
            const { first_name, last_name } = userData;
            const updatedData = { first_name, last_name, updatedAt: moment().format("DD/MM/YYYY")};
            const payload = await userDao.updateUserById( id, updatedData);
            return { status: 200, payload }
        } catch (error) {
            return { status: 500, message: "Error al modificar el usuario", error: error.message };
        }
    };
};