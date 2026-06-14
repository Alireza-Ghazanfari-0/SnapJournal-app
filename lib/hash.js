import { hash, compare } from "bcryptjs";
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(enteredPassword, hashedPassword) {
  const isValid = await compare(enteredPassword, hashedPassword);
  return isValid;
}
