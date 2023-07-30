import mongoose, { Schema, Document } from "mongoose";

// Interfaz para definir la estructura de un documento de usuario
interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

// Definir el esquema del usuario
const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

// Crear y exportar el modelo 'User'
const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
