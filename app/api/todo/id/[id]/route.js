import { NextResponse } from 'next/server';
import TodoController from '@/app/controllers/todo.controller';

const todoController = new TodoController();

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const todo = await todoController.getTodoById( id );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
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
        const { id } = await params;
        const todo = await todoController.deleteTodoById( id );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}