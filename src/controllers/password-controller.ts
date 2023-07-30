import bcrypt from "bcrypt";
// import { PasswordEntry, encryptPassword, verifyPassword } from './passwordManager';

export interface PasswordEntry {
  id: number;
  website: string;
  username: string;
  encryptedPassword: string;
}

const SALT_ROUNDS = 10;

export async function encryptPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

let passwords: PasswordEntry[] = [];

export async function addPassword(
  website: string,
  username: string,
  password: string
): Promise<PasswordEntry> {
  const encryptedPassword = await encryptPassword(password);
  const id = passwords.length + 1;
  const passwordEntry: PasswordEntry = {
    id,
    website,
    username,
    encryptedPassword,
  };
  passwords.push(passwordEntry);
  return passwordEntry;
}

export function getPassword(id: number): PasswordEntry | undefined {
  return passwords.find((entry) => entry.id === id);
}

export function getAllPasswords(): PasswordEntry[] {
  return passwords;
}

export async function updatePassword(
  id: number,
  website: string,
  username: string,
  password: string
): Promise<PasswordEntry | undefined> {
  const passwordEntry = getPassword(id);
  if (!passwordEntry) {
    return undefined;
  }

  passwordEntry.website = website;
  passwordEntry.username = username;
  passwordEntry.encryptedPassword = await encryptPassword(password);
  return passwordEntry;
}

export function deletePassword(id: number): boolean {
  const initialLength = passwords.length;
  passwords = passwords.filter((entry) => entry.id !== id);
  return passwords.length !== initialLength;
}
