import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/auth-service";

// Función para registrar un nuevo usuario
async function register(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;
    const result = await registerUser(username, password);
    return res.json(result);
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor." });
  }
}

// Función para autenticar a un usuario
async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;
    const result = await authenticateUser(username, password);
    return res.json(result);
  } catch (error) {
    console.error("Error al autenticar usuario:", error.message);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor." });
  }
}

export { register, login };
