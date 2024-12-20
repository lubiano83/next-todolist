import { NextResponse } from 'next/server';
import UserController from '@/app/controllers/user.controller';

const userController = new UserController();

export async function GET(request, { params }) {
    try {
        const filter = await params;
        const users = await userController.getUsers( filter );
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const userData = await request.json();
        const user = await userController.registerUser( userData );
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}
