import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt-utils";

const JWT_SECRET = "tu_secreto"; // ¡Cambia esto en producción!

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

// Middleware para autenticar el token JWT
function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.header("Authorization")?.split(" ")[1]; // Obtener el token del encabezado 'Authorization'

  if (!token) {
    res.status(401).json({
      error:
        "Token no proporcionado. Debes estar autenticado para acceder a esta ruta.",
    });
  } else {
    try {
      // Verificar y decodificar el token
      const decodedToken: any = verifyToken(token);
      if (!decodedToken || !decodedToken.userId) {
        res.status(401).json({
          error:
            "Token inválido. Debes estar autenticado para acceder a esta ruta.",
        });
      } else {
        // Agregar el ID del usuario autenticado al objeto 'req' para que otras rutas puedan acceder a él
        req.user = { userId: decodedToken.userId };
        next();
      }
    } catch (error) {
      console.error("Error al verificar el token:", error.message);
      res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
    }
  }
}

export { authenticateToken };
