import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import UserController from "@/app/controllers/user.controller";
import { authenticateAndAuthorize, justSlave, justBoss, justChief } from "@/app/middlewares/auth. middleware";

const userController = new UserController();

export async function POST(request) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justSlave);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const cookieStore = await cookies();
        const token = cookieStore.get("coderCookieToken")?.value;
        if ( !token ) return NextResponse.json({ message: "Token no encontrado, sesión cerrada" }, { status: 401 });
        const controllerResponse = await userController.logoutUser(token);
        const { status, message, cookie } = controllerResponse;
        const response = NextResponse.json({ message }, { status });
        if (cookie) response.cookies.set(cookie.name, cookie.value, cookie.options);
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error al procesar el logout", error: error.message }, { status: 500 });
    }
}
