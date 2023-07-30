// app.ts
import express, { Express } from "express";
import { initDatabase } from "./database";
import { authRoutes, passwordRoutes } from "./routes";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

// Inicializar la base de datos
const dbPromise = initDatabase();

// Rutas de autenticación
app.use("/auth", authRoutes);

// Rutas de gestión de contraseñas
app.use("/passwords", passwordRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
