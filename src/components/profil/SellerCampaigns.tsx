import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Euro, ExternalLink, Target, TrendingUp} from 'lucide-react';
import Link from "next/link";

interface Campaign {
    id: string;
    title: string;
    ticketsSold: number;
    ticketsTarget: number;
    status: 'en_cours' | 'terminee' | 'tirage_fait';
    totalRevenue: number;
    netRevenue: number;
    createdDate: string;
}

const SellerCampaigns = () => {
    // Données d'exemple - à remplacer par des données réelles
    const campaigns: Campaign[] = [{
        id: '1',
        title: 'Tour PC AMD Rizen 7',
        ticketsSold: 75,
        ticketsTarget: 125,
        status: 'en_cours',
        totalRevenue: 1125,
        netRevenue: 1012.50,
        createdDate: '2024-01-10'
    }, {
        id: '2',
        title: 'Peugeot 205 turbo',
        ticketsSold: 325,
        ticketsTarget: 250,
        status: 'tirage_fait',
        totalRevenue: 3450,
        netRevenue: 3400,
        createdDate: '2024-01-05'
    }, {
        id: '3',
        title: 'Nintendo Switch OLED',
        ticketsSold: 45,
        ticketsTarget: 80,
        status: 'terminee',
        totalRevenue: 675,
        netRevenue: 607.50,
        createdDate: '2024-01-01'
    }];

    const getStatusBadge = (status: Campaign['status']) => {
        const variants = {
            en_cours: {variant: 'default' as const, label: '🔄 En cours'},
            terminee: {variant: 'secondary' as const, label: '⏹️ Terminée'},
            tirage_fait: {variant: 'outline' as const, label: '✅ Tirage fait'}
        };

        const {variant, label} = variants[status];

        if (status === 'tirage_fait') {
            return <Badge variant={variant} className="border-green-500 text-semibold text-green-600 ">{label}</Badge>;
        }

        return <Badge variant={variant}>{label}</Badge>;
    };

    const getProgressPercentage = (sold: number, target: number) => {
        return Math.min((sold / target) * 100);
    };

    const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.netRevenue, 0);

    return (<div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5"/>
                    Mes campagnes ({campaigns.length})
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

            {campaigns.length === 0 ? (<Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-gray-500">Aucune campagne créée pour le moment</p>
                    </CardContent>
                </Card>) : (
                    <div className="space-y-4">
                    {campaigns.map((campaign) => (<Card key={campaign.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="font-semibold text-lg">{campaign.title}</h4>
                                            {getStatusBadge(campaign.status)}
                                        </div>

                                        {/* Progression */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium flex items-center gap-1">
                                                    <Target className="w-4 h-4"/>
                                                        Progression
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {campaign.ticketsSold} / {campaign.ticketsTarget} tickets
                                                </span>
                                            </div>
                                            <Progress
                                                value={getProgressPercentage(campaign.ticketsSold, campaign.ticketsTarget)}
                                                className="h-3"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                {Math.round(getProgressPercentage(campaign.ticketsSold, campaign.ticketsTarget))}%
                                                de l&apos;objectif atteint
                                            </p>
                                        </div>

                                        {/* Revenus */}
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Revenus bruts</p>
                                                <p className="font-semibold">{campaign.totalRevenue.toFixed(2)}€</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Revenus nets</p>
                                                <p className="font-semibold text-green-600">{campaign.netRevenue.toFixed(2)}€</p>
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
                                            Créée le {new Date(campaign.createdDate).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>))}
                </div>)}
        </div>);
};

export default SellerCampaigns;