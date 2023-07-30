// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor en ejecución en http://localhost:${PORT}`);
// });

// // app.ts
// import express, { Express, Request, Response, NextFunction } from "express";
// import bcrypt from "bcrypt";
// import { initDatabase } from "./database";

// import jwt from "jsonwebtoken";

// // Definir una interfaz personalizada para extender Request
// interface CustomRequest extends Request {
//   user?: { userId: number }; // Podemos definir otros campos aquí si es necesario
// }

// const app: Express = express();
// const PORT: number = 3000;
// const JWT_SECRET = "fakeSecretKey"; // ¡Cambia esto en producción!

// app.use(express.json());

// // Inicializar la base de datos
// const dbPromise = initDatabase();

// function generateToken(userId: number): string {
//   const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
//   return token;
// }

// function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: "No se proporcionó un token de autenticación." });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: "Token inválido o expirado." });
//     }

//     // Podemos acceder a la información del usuario autenticado a través de 'user.userId'
//     // Por simplicidad, almacenaremos el ID de usuario en 'req.user' para futuras rutas.
//     req.user = user;
//     next();
//   });
// }

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor en ejecución en http://localhost:${PORT}`);
// });
