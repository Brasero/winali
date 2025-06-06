"use client"

import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Euro, ExternalLink, Target, TrendingUp} from 'lucide-react';
import Link from "next/link";
import {use} from "react";

interface Campaign {
    id: string;
    title: string;
    ticket_price: number;
    min_tickets: number;
    ticket_sells: number;
    is_closed: boolean;
    created_at: string;
    collected: number;
}


const SellerCampaigns = ({campaigns}) => {
    // Données d'exemple - à remplacer par des données réelles
    const data: Campaign[] = use(campaigns)
    const commission = 0.06;

    const getStatusBadge = (status: Campaign['is_closed']) => {
        const variants = {
            false: {variant: 'default' as const, label: '🔄 En cours'},
            true: {variant: 'secondary' as const, label: '⏹️ Terminée'},
            tirage_fait: {variant: 'outline' as const, label: '✅ Tirage fait'}
        };

        const {variant, label} = variants[status];

        if (status === 'tirage_fait') {
            return <Badge variant={variant} className="border-green-500 text-semibold text-green-600 ">{label}</Badge>;
        }

        return <Badge variant={variant}>{label}</Badge>;
    };

    const getProgressPercentage = (sold: number, target: number) => {
        return Math.min((sold / target) * 100, 100);
    };

    const totalRevenue = data.reduce((sum, campaign) => {
        const brut = campaign.ticket_sells * campaign.ticket_price
        return sum + brut - (brut * commission)
    }, 0)

    return (<div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5"/>
                    Mes campagnes ({data.length})
                </h3>
            </div>

            {/* Résumé des revenus */}
            <Card className="hero-gradient-20">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                        <Euro className="w-6 h-6 text-primary"/>
                        <div>
                            <p className="text-sm text-gray-600">Revenus totaux (net)</p>
                            <p className="text-2xl font-bold text-primary">{totalRevenue.toFixed(2)}€</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {data.length === 0 ? (<Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-gray-500">Aucune campagne créée pour le moment</p>
                    </CardContent>
                </Card>) : (
                    <div className="space-y-4">
                    {data.map((campaign) => (<Card key={campaign.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="font-semibold text-lg">{campaign.title}</h4>
                                            {getStatusBadge(campaign.is_closed)}
                                        </div>

                                        {/* Progression */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium flex items-center gap-1">
                                                    <Target className="w-4 h-4"/>
                                                        Progression
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {campaign.ticket_sells} / {campaign.min_tickets} tickets
                                                </span>
                                            </div>
                                            <Progress
                                                value={getProgressPercentage(campaign.ticket_sells, campaign.min_tickets)}
                                                className="h-3"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {Math.round(getProgressPercentage(campaign.ticket_sells, campaign.min_tickets))}%
                                                de l&apos;objectif atteint
                                            </p>
                                        </div>

                                        {/* Revenus */}
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Revenus bruts</p>
                                                <p className="font-semibold">{(campaign.ticket_sells * campaign.ticket_price).toFixed(2)}€</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Revenus nets</p>
                                                <p className="font-semibold text-green-600">{((campaign.ticket_sells * campaign.ticket_price) - (campaign.ticket_sells * campaign.ticket_price) * commission).toFixed(2)}€</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href={`/campaigns/${campaign.id}`}
                                            className={`${buttonVariants({variant: "outline", size: "sm"})} flex items-center gap-2`}
                                        >
                                            <ExternalLink className="w-4 h-4"/>
                                            Voir la page publique
                                        </Link>

                                        <p className="text-xs text-gray-500 text-center">
                                            Créée le {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>))}
                </div>)}
        </div>);
};

export default SellerCampaigns;