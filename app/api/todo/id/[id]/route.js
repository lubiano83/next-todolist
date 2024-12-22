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
        const { id } = await params;
        const todo = await todoController.getTodoById( id );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justBoss);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const { id } = await params;
        const todoData = await request.json();
        const todo = await todoController.updateTodoById( id, todoData );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        // Autenticar y autorizar al usuario
        const user = await authenticateAndAuthorize(request, justChief);
        if (user instanceof NextResponse) return user;
        // Lógica del controlador
        const { id } = await params;
        const todo = await todoController.deleteTodoById( id );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}