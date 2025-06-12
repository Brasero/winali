import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {buttonVariants} from '@/components/ui/button';
import { ExternalLink, Ticket, Calendar } from 'lucide-react';
import Link from "next/link";

interface Participation {
    id: string;
    campaignTitle: string;
    campaignId: string;
    ticketsPurchased: number;
    purchaseDate: string;
    drawResult: 'won' | 'lost' | 'pending';
    totalSpent: number;
    is_free: boolean;
}

const BuyerParticipation = ({participations}) => {

    const getResultBadge = (result: Participation['drawResult']) => {
        const variants = {
            won: { variant: 'default' as const, label: '🏆 Gagné', className: 'bg-green-500 hover:bg-green-600' },
            lost: { variant: 'secondary' as const, label: '❌ Perdu', className: '' },
            pending: { variant: 'outline' as const, label: '⏳ En attente', className: 'border-orange-500 text-orange-600' }
        };

        const { variant, label, className } = variants[result];
        return <Badge variant={variant} className={className}>{label}</Badge>;
    };


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    Mes participations ({participations.length})
                </h3>
            </div>

            {participations.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-gray-500">Aucune participation pour le moment</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {participations.map((participation) => (
                        <Card key={participation.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-lg mb-2">{participation.campaignTitle}</h4>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Ticket className="w-4 h-4 text-gray-500" />
                                                <span>{participation.ticketsPurchased} ticket{participation.ticketsPurchased > 1 ? 's' : ''} {participation.is_free ? "offert": "acheté"}{participation.ticketsPurchased > 1 ? 's' : ''}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <span>{new Date(participation.purchaseDate).toLocaleDateString('fr-FR')}</span>
                                            </div>

                                            <div>
                                                <span className="font-medium">{participation.totalSpent}€ dépensés</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        {getResultBadge(participation.drawResult)}

                                        <Link
                                            className={`${buttonVariants({variant: "outline", size: "sm"})} flex items-center gap-2`}
                                            href={`/campaign/${participation.campaignId}`}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Voir la campagne
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BuyerParticipation;