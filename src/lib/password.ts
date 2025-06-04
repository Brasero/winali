import bcryptjs from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
}

export async function isSamePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(password, hashedPassword);
}