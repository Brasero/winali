import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { CheckCircle, Clock, ExternalLink, Euro } from 'lucide-react';

interface CampaignDetailProps {
    campaignId: string;
}

interface Ticket {
    id: string;
    buyer: string;
    quantity: number;
    purchaseDate: string;
    amount: number;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaignId }) => {
    // Données d'exemple - à remplacer par un appel API
    const campaign = {
        id: campaignId,
        title: 'Concert Jazz Festival 2024',
        description: 'Concert exceptionnel avec les plus grands artistes jazz',
        seller: 'EventCorp',
        status: 'en_cours',
        ticketPrice: 50,
        ticketsTarget: 100,
        ticketsSold: 75,
        totalCollected: 3750,
        drawStatus: 'en_attente' as 'fait' | 'en_attente',
        drawResult: null,
    };

    const tickets: Ticket[] = [
        {
            id: 'T001',
            buyer: 'jean.dupont@email.com',
            quantity: 2,
            purchaseDate: '2024-01-15 14:30',
            amount: 100,
        },
        {
            id: 'T002',
            buyer: 'marie.martin@email.com',
            quantity: 1,
            purchaseDate: '2024-01-16 09:15',
            amount: 50,
        },
        {
            id: 'T003',
            buyer: 'paul.bernard@email.com',
            quantity: 3,
            purchaseDate: '2024-01-16 16:45',
            amount: 150,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Détail de la campagne */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                {campaign.title}
                                <Badge variant="secondary">{campaign.status}</Badge>
                            </CardTitle>
                            <CardDescription>{campaign.description}</CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-brand-purple">
                                {campaign.totalCollected}€
                            </div>
                            <div className="text-sm text-gray-500">Total collecté</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Vendeur</div>
                            <div className="font-semibold">{campaign.seller}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Prix par ticket</div>
                            <div className="font-semibold">{campaign.ticketPrice}€</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600">Progression</div>
                            <div className="font-semibold">
                                {campaign.ticketsSold} / {campaign.ticketsTarget} tickets
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Statut du tirage */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Statut du tirage
                        {campaign.drawStatus === 'fait' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                            <Clock className="w-5 h-5 text-orange-500" />
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {campaign.drawStatus === 'fait' ? (
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                ✅ Tirage effectué
                            </Badge>
                            <Button variant="outline" size="sm">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                Voir le résultat
                            </Button>
                        </div>
                    ) : (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            ⏳ En attente
                        </Badge>
                    )}
                </CardContent>
            </Card>

            {/* Liste des tickets achetés */}
            <Card>
                <CardHeader>
                    <CardTitle>Tickets achetés</CardTitle>
                    <CardDescription>
                        Liste de tous les tickets vendus pour cette campagne
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Ticket</TableHead>
                                <TableHead>Acheteur</TableHead>
                                <TableHead>Quantité</TableHead>
                                <TableHead>Date d&apos;achat</TableHead>
                                <TableHead>Montant</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                                    <TableCell>{ticket.buyer}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{ticket.quantity}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {ticket.purchaseDate}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Euro className="w-4 h-4" />
                                            {ticket.amount}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default CampaignDetail;
// Note: This is a simplified version of the CampaignDetail component.