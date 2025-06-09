import { buttonVariants} from '@/components/ui/button';
import {getBuyerSectionCampaigns, getTwoLastWinner} from "@/lib/db";
import {Progress} from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";

const BuyerSection = async () => {
    const rows = await getBuyerSectionCampaigns()
    const winnersRows = await getTwoLastWinner()
    if (rows.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Aucune vente active</h1>
                    <p className="text-gray-600">Revenez plus tard pour découvrir nos prochaines ventes.</p>
                </div>
            </div>
        );
    }
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

    const winners = winnersRows.map((winner) => ({
        name: winner.first_name + ' ' + winner.last_name[0].toUpperCase(),
        item: winner.item,
        image: winner.image ? winner.image : 'https://via.placeholder.com/100',
        ticketNumber: winner.ticket_number,
        date: new Date(winner.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
    }));


    return (
        <section id="ventes-actives" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pour les acheteurs</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Tentez votre chance de gagner des produits exceptionnels à une fraction de leur prix.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3">
                        <h3 className="text-2xl font-bold mb-8">Ventes actives</h3>

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

                        <div className="mt-10 text-center">
                            <Link href={"/campaigns"} className={`${buttonVariants({variant: "primary_outline"})} hover:bg-primary/10`}>
                                Voir toutes les ventes
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-1/3" id="gagnants">
                        <h3 className="text-2xl font-bold mb-8">Derniers gagnants</h3>

                        <div className="space-y-6">
                            {winners.length ? winners.map((winner, index) => (
                                <div key={index} className="bg-white rounded-xl p-5 shadow-md border border-gray-100 flex items-center gap-4">
                                    <Image
                                        src={winner.image}
                                        alt={`${winner.name} winner`}
                                        width={80}
                                        height={80}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{winner.name}</h4>
                                        <p className="text-brand-purple font-medium">{winner.item}</p>
                                        <p className="text-sm text-gray-500">
                                            Ticket #{winner.ticketNumber} • {winner.date}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center">
                                    <p className="text-gray-500">Aucun gagnant récent</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gradient-to-r from-brand-purple/10 to-brand-coral/10 rounded-xl p-6 mt-8">
                            <h4 className="text-xl font-semibold mb-3">Et si c&apos;était vous?</h4>
                            <p className="text-gray-600 mb-4">
                                Nos gagnants ont souvent participé pour la première fois. La chance sourit aux audacieux!
                            </p>
                            <Link href={"/campaigns"} className={`${buttonVariants()} w-full hover:bg-primary/90`}>
                                Tenter ma chance
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuyerSection;