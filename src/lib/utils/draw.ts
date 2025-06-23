import {createDraw, getPendingCampaigns, getTicketByCampaignId, query} from "@/lib/db";

export async function runCampaignCheck() {
  const now = new Date();
  const campaigns = await getPendingCampaigns();
  for (const campaign of campaigns) {
    const {
      id,
      min_tickets,
      end_date,
    } = campaign;
    const endDate = new Date(end_date);
    const ticketSells = await getTicketByCampaignId(id);
    if (now >= endDate && ticketSells.length < min_tickets) {
      // Fermer la campagne
      // Prevenir le vendeur par mail
      // enclenché le remboursmement des tickets achetés
      console.log(`Campaign ${id} has ended without enough tickets sold. End date: ${endDate.toISOString()}, current time: ${now.toISOString()}`);
      continue;
    }
    if (now >= endDate && ticketSells.length >= min_tickets) {
      const winnerTicket = await handleDrawAndClose(id);
      if (!winnerTicket) {
        console.log(`No tickets sold for campaign ${id}. Cannot draw a winner.`);
        continue;
      }
      // todo : Envoi d'un email au gagnant et au vendeur
      
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
  `)
  return winnerTicket;
}