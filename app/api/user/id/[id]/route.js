import { NextResponse } from 'next/server';
import UserController from '@/app/controllers/user.controller';
import { authenticateAndAuthorize, justSlave, justBoss, justChief } from "@/app/middlewares/auth. middleware";

const userController = new UserController();

export async function GET(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justSlave);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const { id } = await params;
        const users = await userController.getUserById( id );
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justChief);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const { id } = await params;
        const userData = await request.json();
        const updatedUser = await userController.updateUserById( id, userData );
        return NextResponse.json({ updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}