import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import UserController from "@/app/controllers/user.controller";

const userController = new UserController();

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("coderCookieToken")?.value;
        if (token) return NextResponse.json({ message: "El usuario ya está logeado" }, { status: 200 });
        const userData = await request.json();
        const userResponse = await userController.loginUser(userData);
        if (userResponse.status !== 200) {
            NextResponse.json({ message: userResponse.message }, { status: userResponse.status });
        }
        const response = NextResponse.json({ message: userResponse.message, payload: userResponse.payload });
        response.cookies.set("coderCookieToken", userResponse.payload, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 3600, path: "/" });
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error al realizar el login", error: error.message }, { status: 500 });
    }
}