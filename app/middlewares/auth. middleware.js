import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getUserFromRequest = (request) => {
  const cookieHeader = request.headers.get("cookie");
  const token = cookieHeader?.split("=")[1];

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.COOKIE_KEY);
  } catch (error) {
    return null;
  }
};

export const authenticateAndAuthorize = async (request, roleMiddleware) => {
  const user = getUserFromRequest(request);

  if (!user) {
    return NextResponse.json(
      { message: "No autenticado." },
      { status: 401 }
    );
  }

  const isAuthorized = roleMiddleware(user);
  if (isAuthorized instanceof NextResponse) {
    return isAuthorized;
  }

  return user; // Devuelve el usuario si está autorizado
};

// Roles específicos
export const soloDev = (user) => {
  if (user.role !== "developer") {
    return NextResponse.json(
      { message: "Acceso denegado. Solo para desarrolladores." },
      { status: 403 }
    );
  }
};

export const soloAdmin = (user) => {
  if (user.role !== "admin" && user.role !== "developer") {
    return NextResponse.json(
      { message: "Acceso denegado. Solo para administradores." },
      { status: 403 }
    );
  }
};

export const soloUser = (user) => {
  if (user.role !== "user" && user.role !== "developer") {
    return NextResponse.json(
      { message: "Acceso denegado. Solo para usuarios." },
      { status: 403 }
    );
  }
};