import { NextResponse } from 'next/server';
import TodoController from '@/app/controllers/todo.controller';
import { authenticateAndAuthorize, justSlave, justBoss, justChief } from "@/app/middlewares/auth. middleware";

const todoController = new TodoController();

export async function GET(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justChief);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const filter = await params;
        const todos = await todoController.getTodos( filter );
        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justBoss);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const todoData = await request.json();
        const todo = await todoController.createTodo( todoData );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}