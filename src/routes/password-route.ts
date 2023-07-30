// routes/passwordRoutes.ts
import express, { Router, Request, Response } from "express";
import {
  addPassword,
  getPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
} from "../controllers/password-controller";
import { authenticateToken } from "../middlewares";

const passwordRoutes: Router = express.Router();

// Ruta para agregar una nueva contraseña (requiere autenticación)
passwordRoutes.post(
  "/",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
      return res
        .status(400)
        .json({ error: "Faltan datos de sitio web, usuario o contraseña." });
    }

    try {
      // Aquí podrías agregar autenticación adicional para asegurarte de que el usuario esté autorizado
      // a agregar una contraseña.

      const passwordEntry = await addPassword(website, username, password);
      return res.json(passwordEntry);
    } catch (error) {
      console.error("Error al agregar contraseña:", error.message);
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error en el servidor." });
    }
  }
);

// Ruta para ver todas las contraseñas (requiere autenticación)
passwordRoutes.get(
  "/",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      // Aquí podrías agregar autenticación adicional para asegurarte de que el usuario esté autorizado
      // a ver las contraseñas.

      const passwords = getAllPasswords();
      return res.json(passwords);
    } catch (error) {
      console.error("Error al obtener contraseñas:", error.message);
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error en el servidor." });
    }
  }
);

// Ruta para ver una contraseña específica (requiere autenticación)
passwordRoutes.get(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      // Aquí podrías agregar autenticación adicional para asegurarte de que el usuario esté autorizado
      // a ver esta contraseña.

      const passwordEntry = getPassword(id);
      if (!passwordEntry) {
        return res.status(404).json({ error: "Contraseña no encontrada." });
      }
      return res.json(passwordEntry);
    } catch (error) {
      console.error("Error al obtener la contraseña:", error.message);
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error en el servidor." });
    }
  }
);

// Ruta para actualizar una contraseña existente (requiere autenticación)
passwordRoutes.put(
  "/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { website, username, password } = req.body;

    if (!website || !username || !password) {
      return res
        .status(400)
        .json({ error: "Faltan datos de sitio web, usuario o contraseña." });
    }

    try {
      // Aquí podrías agregar autenticación adicional para asegurarte de que el usuario esté autorizado
      // a actualizar esta contraseña.

      const updatedPassword = await updatePassword(
        id,
        website,
        username,
        password
      );
      if (!updatedPassword) {
        return res.status(404).json({ error: "Contraseña no encontrada." });
      }
      return res.json(updatedPassword);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error.message);
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error en el servidor." });
    }
  }
);

// Ruta para eliminar una contraseña (requiere autenticación)
passwordRoutes.delete(
  "/passwords/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      // Aquí podrías agregar autenticación adicional para asegurarte de que el usuario esté autorizado
      // a eliminar esta contraseña.

      const deleted = deletePassword(id);
      if (!deleted) {
        return res.status(404).json({ error: "Contraseña no encontrada." });
      }
      return res.json({ message: "Contraseña eliminada correctamente." });
    } catch (error) {
      console.error("Error al eliminar la contraseña:", error.message);
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error en el servidor." });
    }
  }
);

export { passwordRoutes };
