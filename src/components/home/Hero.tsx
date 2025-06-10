import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from "next/link";
import {getHeroCampaign} from "@/lib/db";
import Image from "next/image";

const Hero = async () => {

    const rows = await getHeroCampaign()

    return (
        <div className="pt-28 pb-16 hero-gradient">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 animate-fade-in">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Vendez vos biens <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">autrement</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Créez une campagne, vendez par tickets, tirez au sort un gagnant.
                            Un nouveau moyen équitable de vendre vos objets de valeur.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={"/user/campaign"} className={`${buttonVariants()} hover:bg-brand-purple/90 text-white font-semibold px-6 py-6 h-auto text-xl`}>
                                Créer une vente
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link href={"/campaigns"} className={`${buttonVariants({variant: "secondary_outline"})} border-secondary text-secondary hover:bg-secondary/10 font-semibold px-6 py-6 h-auto text-xl`}>
                                Participer à un tirage
                            </Link>
                        </div>
                    </div>

                    { rows.length > 0 ? ( () => {
                        const heroCampaign = {
                            id: rows[0].id,
                            title: rows[0].title,
                            description: rows[0].description,
                            image: rows[0].image_urls ? rows[0].image_urls[0] : 'https://via.placehol.it/800',
                            ticketPrice: rows[0].ticket_price,
                            ticketsSold: rows[0].ticket_sells,
                            totalTickets: rows[0].min_tickets,
                        };
                        const totalValue = heroCampaign.ticketPrice * heroCampaign.totalTickets;
                        const progressPercentage = Math.round((heroCampaign.ticketsSold / heroCampaign.totalTickets) * 100);
                        return(<div className="lg:w-1/2 animate-fade-in" style={{animationDelay: '0.3s'}}>
                            <div className="relative">
                                <div
                                    className="absolute -top-10 -left-10 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
                                <div
                                    className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-coral/10 rounded-full filter blur-3xl"></div>

                                <div
                                    className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-8 z-9 ticket-shape">
                                    <div className="relative">
                                        <Image
                                            src={heroCampaign.image}
                                            alt={heroCampaign.title}
                                            width={800}
                                            height={450}
                                            className="w-full h-auto rounded-lg object-cover aspect-video mb-6"
                                        />
                                        <div
                                            className="absolute top-4 right-4 bg-brand-purple text-white py-1 px-3 rounded-full text-sm font-medium">
                                            {progressPercentage}% vendu
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2">{heroCampaign.title}</h3>
                                    <p className="text-gray-600 mb-4">{heroCampaign.description}</p>

                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Prix du ticket</p>
                                            <p className="text-2xl font-bold">{heroCampaign.ticketPrice} €</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Valeur commerciale</p>
                                            <p className="text-2xl font-bold">{totalValue} €</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-500">Progression</span>
                                            <span className="text-sm font-medium">{progressPercentage}%</span>
                                        </div>
                                        <Progress
                                            value={progressPercentage}
                                        />
                                    </div>

                                    <div className="dashed-border pt-6">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500">Tickets restants</p>
                                                <p className="font-semibold">{heroCampaign.totalTickets - heroCampaign.ticketsSold} / {heroCampaign.totalTickets}</p>
                                            </div>
                                            <Link href={`/campaigns/${heroCampaign.id}`} className={`${buttonVariants({variant: "secondary"})} hover:bg-brand-coral/90 text-white`}>
                                                Acheter un ticket
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)})() : (
                        <div className="lg:w-1/2 animate-fade-in" style={{animationDelay: '0.3s'}}>
                            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                                <h3 className="text-2xl font-bold mb-4">Aucune vente active pour le moment</h3>
                                <p className="text-gray-600 mb-6">Créez votre première campagne pour commencer à vendre vos biens.</p>
                                <Link href={"/user/campaign"} className={`${buttonVariants()} hover:bg-brand-purple/90 text-white font-semibold px-6 py-4`}>
                                    Créer une vente
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;