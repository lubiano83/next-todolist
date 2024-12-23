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
  console.log("user:", user)

  if (!user) {
    return NextResponse.json({ message: "No autenticado." }, { status: 401 });
  }

  const isAuthorized = roleMiddleware(user);
  if (isAuthorized instanceof NextResponse) {
    return isAuthorized;
  }

  return user; // Devuelve el usuario si está autorizado
};

// Roles específicos
export const justChief = (user) => {
  if (user.role !== "chief") {
    return NextResponse.json({ message: "Acceso denegado. Solo para el lider." }, { status: 403 });
  }
};

export const justBoss = (user) => {
  if (user.role !== "boss" && user.role !== "chief") {
    return NextResponse.json({ message: "Acceso denegado. Solo para encargados." }, { status: 403 });
  }
};

export const justSlave = (user) => {
  if (user.role !== "slave" && user.role !== "boss" && user.role !== "chief") {
    return NextResponse.json({ message: "Acceso denegado. Solo para subordinados." }, { status: 403 });
  }
};