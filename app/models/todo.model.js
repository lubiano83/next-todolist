import mongoose from "mongoose";

const collection = "todos";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [100, 'El título no puede tener más de 100 caracteres']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    }
});

const TodoModel = mongoose.models[collection] || mongoose.model(collection, todoSchema);
export default TodoModel;