// routes/authRoutes.ts
import express, { Router, Request, Response } from "express";
import { login, register } from "../controllers/auth-controller";

const authRoutes: Router = express.Router();

// Ruta para registrar un nuevo usuario
authRoutes.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await register(username, password);
    return res.json(user);
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor." });
  }
});
// // Registrar un nuevo usuario
// app.post("/signup", authenticateToken, async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ error: "Faltan datos de usuario o contraseña." });
//   }

//   try {
//     const db = await dbPromise;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Verificar si el usuario ya existe
//     const existingUser = await db.get(
//       "SELECT id FROM users WHERE username = ?",
//       username
//     );
//     if (existingUser) {
//       return res.status(409).json({ error: "El usuario ya existe." });
//     }

//     // Crear el nuevo usuario en la base de datos
//     await db.run(
//       "INSERT INTO users (username, password) VALUES (?, ?)",
//       username,
//       hashedPassword
//     );

//     return res.json({ message: "Usuario registrado exitosamente." });
//   } catch (error) {
//     console.error("Error en el registro:", error.message);
//     return res
//       .status(500)
//       .json({ error: "Ha ocurrido un error en el servidor." });
//   }
// });

// Ruta para iniciar sesión y obtener el token JWT
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    return res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor." });
  }
});
// // Autenticar un usuario
// app.post("/login", authenticateToken, async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ error: "Faltan datos de usuario o contraseña." });
//   }

//   try {
//     const db = await dbPromise;

//     // Buscar al usuario en la base de datos
//     const user = await db.get(
//       "SELECT id, password FROM users WHERE username = ?",
//       username
//     );

//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado." });
//     }

//     // Comparar la contraseña ingresada con la almacenada en la base de datos
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Contraseña incorrecta." });
//     }

//     // Aquí podrías generar un token de autenticación para usar en futuras solicitudes
//     // Por simplicidad, lo dejaremos así en este punto.

//     // return res.json({ message: 'Inicio de sesión exitoso.' });
//     // Generar el token JWT
//     const token = generateToken(user.id);

//     // Devolver el token en la respuesta
//     return res.json({ token });
//   } catch (error) {
//     console.error("Error en el inicio de sesión:", error.message);
//     return res
//       .status(500)
//       .json({ error: "Ha ocurrido un error en el servidor." });
//   }
// });

export { authRoutes };
