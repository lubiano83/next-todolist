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
        enum: [ "user", "admin", "developer" ],
        default: "user"
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

usersSchema.pre("save", function (next) {
    if (this.updatedAt) {
        this.updatedAt = moment(this.updatedAt, "DD/MM/YYYY").format("DD/MM/YYYY");
    }
    next();
});

const UserModel = mongoose.models[collection] || mongoose.model(collection, usersSchema);
export default UserModel;