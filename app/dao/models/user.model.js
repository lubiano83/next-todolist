import mongoose from "mongoose";

const collection = "users";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    todos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todos",
    },
    createdAt: {
        type: String,
        default: () => moment().format("DD/MM/YYYY")
    },
    updatedAt: {
        type: String
    },
});

usersSchema.pre("save", function (next) {
    if (this.updatedAt) {
        this.updatedAt = moment(this.updatedAt, "DD/MM/YYYY").format("DD/MM/YYYY");
    }
    next();
});

const UserModel = mongoose.models[collection] || mongoose.model(collection, usersSchema);
export default UserModel;