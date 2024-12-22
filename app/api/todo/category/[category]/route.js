import { NextResponse } from 'next/server';
import TodoController from '@/app/controllers/todo.controller';
import { authenticateAndAuthorize, justSlave, justBoss, justChief } from "@/app/middlewares/auth. middleware";

const todoController = new TodoController();

export async function GET(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justSlave);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const { category } = await params;
        const todo = await todoController.getTodoByCategory( category );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}