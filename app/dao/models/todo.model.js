import mongoose from "mongoose";
import moment from "moment";

const collection = "todos";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxlength: [100, 'El título no puede tener más de 100 caracteres']
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'La categoria es obligatoria']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
        default: ""
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: () => moment().format("DD/MM/YYYY")
    },
    dueDate: {
        type: String
    }
});

todoSchema.pre("save", function (next) {
    if (this.dueDate) {
        this.dueDate = moment(this.dueDate, "DD/MM/YYYY").format("DD/MM/YYYY");
    }
    next();
});

const TodoModel = mongoose.models[collection] || mongoose.model(collection, todoSchema);
export default TodoModel;
