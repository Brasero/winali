import {
  closeCampaignAndSetDraw,
  createDraw,
  getPendingCampaigns,
  getTicketByCampaignId,
  getUserById,
  query
} from "@/lib/db/db";
import {sendEmail} from "@/lib/mail";
import {
  SellerCampaignFailedEmail,
  SellerCampaignSuccessEmail,
  WinnerCampaignEmail
} from "@/components/utils/EmailTemplate";

export async function runCampaignCheck() {
  // date actuelle
  const now = new Date();
  // Récupérer les campagnes en attente
  const campaigns = await getPendingCampaigns();
  for (const campaign of campaigns) {
    // Récupérer les informations du vendeur
    const {
      id,
      min_tickets,
      end_date,
    } = campaign;
    const endDate = new Date(end_date);
    const ticketSells = await getTicketByCampaignId(id);
    if (now >= endDate && ticketSells.length < min_tickets) {
      const seller = (await getUserById(campaign.seller_id))[0];
      await closeCampaignAndSetDraw(id, false);
      await sendEmail(seller.email, SellerCampaignFailedEmail({sellerName: `${seller.first_name} ${seller.last_name}`, campaignTitle: campaign.title}), "Campagne échouée - Winali");
      
      // todo : enclenché le remboursement des tickets achetés
      console.log(`Campaign ${id} has ended without enough tickets sold. End date: ${endDate.toISOString()}, current time: ${now.toISOString()}`);
      continue;
    }
    if (now >= endDate && ticketSells.length >= min_tickets) {
      const seller = (await getUserById(campaign.seller_id))[0];
      const winnerTicket = await handleDrawAndClose(id);
      if (!winnerTicket) {
        console.log(`No tickets sold for campaign ${id}. Cannot draw a winner.`);
        continue;
      }
      const winner = (await getUserById(winnerTicket.buyer_id))[0];
      await sendEmail(seller.email, SellerCampaignSuccessEmail({sellerName: `${seller.first_name} ${seller.last_name}`, campaignTitle: campaign.title}), "Campagne réussie - Winali");
      await sendEmail(winner.email, WinnerCampaignEmail({winnerName: `${winner.first_name} ${winner.last_name}`, campaignTitle: campaign.title}), "Félicitations - Vous avez gagné une campagne Winali");
      
      console.log(`Campaign ${id} has ended with enough tickets sold. End date: ${endDate.toISOString()}, current time: ${now.toISOString()} - Winner will be drawn.`);
      continue;
    }
    console.log(`Campaign ${id} is still active. End date: ${endDate.toISOString()}, current time: ${now.toISOString()}`);
  }
}

export async function handleDrawAndClose(campaignId: string) {
  const tickets = await getTicketByCampaignId(campaignId);
  if (tickets.length === 0) {
    console.log(`No tickets sold for campaign ${campaignId}. Cannot draw a winner.`);
    return;
  }
  const winnerIndex = Math.floor(Math.random() * tickets.length);
  const winnerTicket = tickets[winnerIndex];
  const drawId = await createDraw(campaignId, winnerTicket.id);
  console.log(`Draw created for campaign ${campaignId}. Winner ticket ID: ${winnerTicket.id}, Draw ID: ${drawId}`);
  // envoi des emails aux parties concernées
  
  await query(`
    UPDATE campaigns
    SET is_closed = TRUE, is_drawn = TRUE
    WHERE id = $1
  `, [campaignId]);
  return winnerTicket;
}