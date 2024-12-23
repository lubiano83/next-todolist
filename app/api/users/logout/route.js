import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import UserController from "@/app/controllers/user.controller";

const userController = new UserController();

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
        const controllerResponse = await userController.logoutUser(token);
        const { status, message, cookie } = controllerResponse;
        const response = NextResponse.json({ message }, { status });
        if (cookie) response.cookies.set(cookie.name, cookie.value, cookie.options);
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error al procesar el logout", error: error.message }, { status: 500 });
    }
}
