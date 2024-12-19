import UserDao from "../dao/user.dao";

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
};