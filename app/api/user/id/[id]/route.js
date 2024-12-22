import { NextResponse } from 'next/server';
import UserController from '@/app/controllers/user.controller';

const userController = new UserController();

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const users = await userController.getUserById( id );
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const userData = await request.json();
        const user = await userController.updateUserById( id, userData );
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}