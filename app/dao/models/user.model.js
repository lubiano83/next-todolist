import mongoose from "mongoose";
import moment from "moment";

const collection = "users";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio'],
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, 'El apellido es obligatorio'],
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        default: ""
    },
    role: {
        type: String,
        enum: [ "slave", "boss", "chief" ],
        default: "slave"
    },
    todos: {
        type: Array,
        default: []
    },
    createdAt: {
        type: String,
        default: () => moment().format("DD/MM/YYYY")
    },
    updatedAt: {
        type: String,
        default: () => moment().format("DD/MM/YYYY")
    },
    score: {
        type: Number,
        default: 0
    }
});

// Hook pre-save para formatear `updatedAt` antes de guardar
usersSchema.pre("save", function (next) {
    this.updatedAt = moment().format("DD/MM/YYYY");
    next();
});

// Hook pre-update para formatear `updatedAt` antes de una actualización
usersSchema.pre("findOneAndUpdate", function (next) {
    this._update.updatedAt = moment().format("DD/MM/YYYY");
    next();
});

const UserModel = mongoose.models[collection] || mongoose.model(collection, usersSchema);
export default UserModel;