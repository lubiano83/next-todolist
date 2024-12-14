import mongoose from "mongoose";

const connectDB = async () => {
    const URI = process.env.MONGO_URI;
    const options = {
        dbName: "todos-next-proyect",
        serverSelectionTimeoutMS: 30000,
    };

    try {
        await mongoose.connect(URI, options);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        console.error(error);  // Imprime el error completo
        process.exit(1); // Detener el proceso si hay un error de conexión
    }
};

// Validación de un ObjectId de MongoDB
const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id); // Devuelve true o false
};

export { connectDB, isValidId };