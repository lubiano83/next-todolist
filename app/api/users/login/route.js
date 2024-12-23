import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import UserController from "@/app/controllers/user.controller";

const userController = new UserController();

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        console.log("cookies enviadas:", cookieStore)
        const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
        if (token) return NextResponse.json({ message: "El usuario ya está logeado" }, { status: 200 });
        const userData = await request.json();
        const userResponse = await userController.loginUser(userData);
        if (userResponse.status !== 200) {
            return NextResponse.json({ message: userResponse.message }, { status: userResponse.status });
        }
        const response = NextResponse.json({ message: userResponse.message, payload: userResponse.payload });
        response.cookies.set(process.env.COOKIE_NAME, userResponse.payload, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 3600, path: "/" });
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error al realizar el login", error: error.message }, { status: 500 });
    }
}