import jwt from "jsonwebtoken";

const JWT_SECRET = "tu_secreto"; // ¡Cambia esto en producción!

// Función para generar un token JWT
function generateToken(userId: number): string {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

// Función para verificar y decodificar un token JWT
function verifyToken(token: string): any {
  const decodedToken = jwt.verify(token, JWT_SECRET);
  return decodedToken;
}

export { generateToken, verifyToken };
