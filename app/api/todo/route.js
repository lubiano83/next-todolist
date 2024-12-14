import { NextResponse } from 'next/server';
import TodoController from '@/app/controllers/todo.controller';

const todoController = new TodoController();

export async function GET() {
    try {
        const todos = await todoController.getTodos();
        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}