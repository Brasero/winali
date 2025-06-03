import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Play } from 'lucide-react';

interface Campaign {
    id: string;
    title: string;
    seller: string;
    status: 'en_cours' | 'termine' | 'clos';
    ticketsSold: number;
    ticketsTarget: number;
}

interface CampaignsTableProps {
    onSelectCampaign: (id: string) => void;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ onSelectCampaign }) => {
    // Données d'exemple - à remplacer par un appel API
    const campaigns: Campaign[] = [
        {
            id: '1',
            title: 'Concert Jazz Festival 2024',
            seller: 'EventCorp',
            status: 'en_cours',
            ticketsSold: 75,
            ticketsTarget: 100,
        },
        {
            id: '2',
            title: 'Match PSG vs OM',
            seller: 'SportEvents',
            status: 'termine',
            ticketsSold: 100,
            ticketsTarget: 100,
        },
        {
            id: '3',
            title: 'Théâtre - Hamlet',
            seller: 'CulturePlus',
            status: 'clos',
            ticketsSold: 45,
            ticketsTarget: 80,
        },
    ];

    const getStatusBadge = (status: Campaign['status']) => {
        const variants = {
            en_cours: { variant: 'default' as const, label: 'En cours' },
            termine: { variant: 'secondary' as const, label: 'Terminé' },
            clos: { variant: 'destructive' as const, label: 'Clos' },
        };

        const { variant, label } = variants[status];
        return <Badge variant={variant}>{label}</Badge>;
    };

    const getProgressPercentage = (sold: number, target: number) => {
        return (sold / target) * 100;
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Vendeur</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Tickets vendus</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {campaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                            <TableCell className="font-mono text-sm">{campaign.id}</TableCell>
                            <TableCell className="font-medium">{campaign.title}</TableCell>
                            <TableCell>{campaign.seller}</TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                            <TableCell>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>{campaign.ticketsSold} / {campaign.ticketsTarget}</span>
                                        <span>{Math.round(getProgressPercentage(campaign.ticketsSold, campaign.ticketsTarget))}%</span>
                                    </div>
                                    <Progress
                                        value={getProgressPercentage(campaign.ticketsSold, campaign.ticketsTarget)}
                                        className="h-2"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onSelectCampaign(campaign.id)}
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        Détail
                                    </Button>
                                    {campaign.status === 'clos' && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-brand-coral hover:bg-brand-coral/90 text-white"
                                        >
                                            <Play className="w-4 h-4 mr-1" />
                                            Forcer tirage
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CampaignsTable;