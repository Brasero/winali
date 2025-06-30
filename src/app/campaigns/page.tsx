import Image from "next/image";
import {Progress} from "@/components/ui/progress";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {getCampaigns} from "@/lib/db/db";


export default async function  AllSales(){
  const rows = await getCampaigns()
  const activeItems = rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image_urls ? row.image_urls[0] : 'https://via.placeholder.com/500',
    ticketPrice: row.ticket_price,
    ticketsSold: row.tickets_sold,
    totalTickets: row.total_tickets,
    totalValue: row.ticket_price * row.total_tickets,
  }));

  return(
    <div className="flex flex-col gap-3 mb-8 mt-8 mx-auto container">
      <h3 className="text-2xl font-bold mb-4">Toutes les ventes en cours</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl card-hover border border-gray-100">
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-brand-purple text-white py-1 px-3 rounded-full text-sm font-medium">
                {Math.round((item.ticketsSold / item.totalTickets) * 100)}% vendu
              </div>
            </div>

            <div className="p-5">
              <h4 className="text-lg font-semibold mb-1 line-clamp-1">{item.title}</h4>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>

              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Prix du ticket</p>
                  <p className="font-semibold">{item.ticketPrice} €</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Valeur</p>
                  <p className="font-semibold">{item.totalValue.toLocaleString()} €</p>
                </div>
              </div>

              <div className="w-full mb-4">
                <Progress value={Math.round((item.ticketsSold / item.totalTickets) * 100)}/>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Reste</p>
                  <p className="text-sm">{item.totalTickets - item.ticketsSold} tickets</p>
                </div>
                <Link href={`/campaigns/${item.id}`}
                      className={`${buttonVariants({variant: "secondary"})} hover:bg-secondary/90 text-white`}>
                  Participer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}