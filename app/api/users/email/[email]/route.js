import { NextResponse } from 'next/server';
import UserController from '@/app/controllers/user.controller';
import { authenticateAndAuthorize, justSlave, justBoss, justChief } from "@/app/middlewares/auth. middleware";

const userController = new UserController();

export async function GET(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justBoss);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const { email } = await params;
        const emailUser = await userController.getUserByEmail( email );
        return NextResponse.json({ emailUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}