import { NextResponse } from 'next/server';
import UserController from '@/app/controllers/user.controller';

const userController = new UserController();

export async function GET(request, { params }) {
    try {
        const { email } = await params;
        const user = await userController.getUserByEmail( email );
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los todos", error: error.message }, { status: 500 });
    }
}