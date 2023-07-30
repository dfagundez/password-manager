import bcrypt from "bcrypt";
import { User } from "../models/user";
import { generateToken } from "../utils/jwt-utils";

// Función para registrar un nuevo usuario
async function registerUser(
  username: string,
  password: string
): Promise<{ token: string }> {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("El nombre de usuario ya está registrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    createdAt: new Date(),
  });

  await newUser.save();

  const token = generateToken(newUser.id);

  return { token };
}

// Función para autenticar a un usuario
async function authenticateUser(
  username: string,
  password: string
): Promise<{ token: string }> {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta.");
  }

  const token = generateToken(user.id);

  return { token };
}

export { registerUser, authenticateUser };
