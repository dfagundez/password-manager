// src/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDatabase() {
  try {
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database,
    });

    // Crear la tabla 'users' si no existe
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    console.log('Base de datos inicializada correctamente.');
    return db;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
    process.exit(1);
  }
}
