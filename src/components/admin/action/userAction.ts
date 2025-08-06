"use server";
export const fetchAdminUsers = async (page: number, amount: number) => {
  const { getAdminUsers } = await import('@/lib/db/adminUsers');
  try {
    const users = await getAdminUsers(page, amount);
    return users;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
}