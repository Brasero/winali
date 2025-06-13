import React from 'react';
import {buttonVariants} from '@/components/ui/button';
import {ArrowLeft, User} from 'lucide-react';
import  Link  from 'next/link';
import BuyerParticipation from '@/components/profil/BuyerParticipation';
import {cookies} from "next/headers";

async function BuyerParticipationsPage () {
  
  // la partie concernant les cookies est nécessaire pour les requêtes API venant de components server side
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
  const rows = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/tickets`, {
    headers: {
      "Cookie": cookieHeader
    },
    cache: 'no-store'
  })
  const data = (await rows.json())
  type Ticket = {
    tickets_id: string;
    total_spent: number;
    campaign_title: string;
    purchased_at: string;
    campaign_id: string;
    is_closed: boolean;
  }
  const participation = data.map((ticket: Ticket) => ({
    id: ticket.tickets_id,
    totalSpent: ticket.total_spent,
    campaignTitle: ticket.campaign_title,
    purchaseDate: ticket.purchased_at,
    campaignId: ticket.campaign_id,
    drawResult: ticket.is_closed ? 'lost' : 'pending',
    ticketsPurchased: 1,
    is_free: ticket.total_spent === 0
  }))
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <Link href="/user/profil" className={`${buttonVariants({variant: "outline"})} mb-4 flex items-center gap-2`}>
                        <ArrowLeft className="w-4 h-4" />
                        Retour au profil
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <User className="w-8 h-8" />
                        Mes participations
                    </h1>
                    <p className="text-gray-600">Toutes vos participations aux campagnes</p>
                </div>

                <BuyerParticipation participations={participation} />
            </div>
        </div>
    );
}

export default BuyerParticipationsPage;