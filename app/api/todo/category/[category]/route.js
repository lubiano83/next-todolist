import { NextResponse } from 'next/server';
import TodoController from '@/app/controllers/todo.controller';

const todoController = new TodoController();

export async function GET(request, { params }) {
    try {
        const { category } = await params;
        const todo = await todoController.getTodoByCategory( category );
        return NextResponse.json({ todo }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el todo por el id", error: error.message }, { status: 500 });
    }
}