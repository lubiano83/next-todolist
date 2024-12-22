import { NextResponse } from "next/server";
import UserController from "@/app/controllers/user.controller";
import { authenticateAndAuthorize, justSlave, justBoss, justChief } from "@/app/middlewares/auth. middleware";

const userController = new UserController();

export async function GET(request) {
  try {
    // Autenticar y autorizar al usuario
    const user = await authenticateAndAuthorize(request, justSlave);
    if (user instanceof NextResponse) return user;
    // Lógica del controlador
    const users = await userController.getUsers({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener los usuarios.", error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    const userCreated = await userController.registerUser(userData);
    return NextResponse.json({ user: userCreated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error al registrar el usuario.", error: error.message }, { status: 500 });
  }
}
