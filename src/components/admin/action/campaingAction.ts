"use server";
export async function fetchCampaigns(page: number, amount: number) {
  const { getAdminCampaigns } = await import('@/lib/db/adminCampaigns');
  try {
    const campaigns = await getAdminCampaigns(page, amount);
    return campaigns;
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes:', error);
    throw error;
  }
}

export async function fetchCampaignQuantity() {
  const { getAdminCampaignQuantity } = await import('@/lib/db/adminCampaigns');
  try {
    const quantity = await getAdminCampaignQuantity();
    return quantity;
  } catch (error) {
    console.error('Erreur lors de la récupération de la quantité de campagnes:', error);
    throw error;
  }
}