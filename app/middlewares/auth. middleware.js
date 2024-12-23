import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';

export const getUserFromRequest = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
    console.log("Cookies disponibles:", cookieStore.getAll()); // Muestra todas las cookies disponibles
    if (!token) {
      console.error("Token no encontrado en las cookies.");
      return null;
    }
    const decoded = jwt.verify(token, process.env.COOKIE_KEY);
    console.log("Token decodificado:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
};


export const authenticateAndAuthorize = async (request, roleMiddleware) => {
  try {
    const user = await getUserFromRequest(); // Elimina el argumento `request`
    console.log("este es el token:", user);
  
    if (!user) {
      console.error("No autenticado: Token inválido o no presente.");
      return NextResponse.json({ message: "No autenticado." }, { status: 401 });
    }
  
    console.log("Usuario autenticado:", user);
  
    const isAuthorized = roleMiddleware(user);
    if (isAuthorized instanceof NextResponse) {
      return isAuthorized; // Retorna el error de autorización
    }
  
    return user; // Devuelve el usuario si está autenticado y autorizado
  } catch (error) {
    console.error("Error al verificar el user:", error);
    return null;
  }
};

export const justChief = (user) => {
  if (user.role !== "chief") {
    console.error(`Acceso denegado: Usuario con rol "${user.role}" intentó acceder a un recurso de "chief".`);
    return NextResponse.json({ message: "Acceso denegado. Solo para el líder." }, { status: 403 });
  }
};

export const justBoss = (user) => {
  if (user.role !== "boss" && user.role !== "chief") { // Permite solo "boss" y "chief"
    console.error(`Acceso denegado: Usuario con rol "${user.role}" intentó acceder a un recurso de "boss".`);
    return NextResponse.json({ message: "Acceso denegado. Solo para encargados." }, { status: 403 });
  }
};

export const justSlave = (user) => {
  if (user.role !== "slave" && user.role !== "boss" && user.role !== "chief") { // Permite "slave", "boss" y "chief"
    console.error(`Acceso denegado: Usuario con rol "${user.role}" intentó acceder a un recurso de "slave".`);
    return NextResponse.json({ message: "Acceso denegado. Solo para subordinados." }, { status: 403 });
  }
};