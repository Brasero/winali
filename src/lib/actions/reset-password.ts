import {hashPassword} from "@/lib/password";
import {query} from "@/lib/db";

export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{success: boolean, error?: string}> {
  const hashedPassword = await hashPassword(newPassword);
  const result = await query<{id: string}[]>(`
    UPDATE users SET password_hash = $1, validation_token = NULL, updated_at = NOW()
    WHERE validation_token = $2
    RETURNING id
  `, [hashedPassword, token]);

  if (result.length === 0) {
    return { success: false, error: 'Token invalide ou expiré' };
  }

  return { success: true };
}