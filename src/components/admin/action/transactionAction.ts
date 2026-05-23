"use server";
export async function fetchTransactions(page: number, amount: number) {
  const { getAdminTransactions } = await import('@/lib/db/adminTransactions');
  try {
    const transactions = await getAdminTransactions(page, amount);
    return transactions;
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
    throw error;
  }
}