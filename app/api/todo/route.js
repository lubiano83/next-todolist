import { NextResponse } from 'next/server';
import TodoController from '@/app/controllers/todo.controller';

const todoController = new TodoController();

export async function GET(request, { params }) {
    try {
        const filter = await params;
        const todos = await todoController.getTodos( filter );
        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const todoData = await request.json();
        const todo = await todoController.createTodo( todoData );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}