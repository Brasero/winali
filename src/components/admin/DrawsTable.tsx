import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, User } from 'lucide-react';

interface Draw {
    id: string;
    campaign: string;
    winningTicket: string;
    winner: {
        name: string;
        email: string;
    };
    drawDate: string;
    status: 'completed' | 'disputed' | 'verified';
    totalTickets: number;
}

const DrawsTable = () => {
    // Données d'exemple - à remplacer par un appel API
    const draws: Draw[] = [
        {
            id: 'draw_001',
            campaign: 'Concert Jazz Festival 2024',
            winningTicket: 'T045',
            winner: {
                name: 'Jean Dupont',
                email: 'jean.dupont@email.com',
            },
            drawDate: '2024-01-20 15:00',
            status: 'completed',
            totalTickets: 100,
        },
        {
            id: 'draw_002',
            campaign: 'Match PSG vs OM',
            winningTicket: 'T023',
            winner: {
                name: 'Marie Martin',
                email: 'marie.martin@email.com',
            },
            drawDate: '2024-01-18 14:30',
            status: 'verified',
            totalTickets: 150,
        },
        {
            id: 'draw_003',
            campaign: 'Théâtre - Hamlet',
            winningTicket: 'T012',
            winner: {
                name: 'Paul Bernard',
                email: 'paul.bernard@email.com',
            },
            drawDate: '2024-01-16 16:00',
            status: 'disputed',
            totalTickets: 80,
        },
    ];

    const getStatusBadge = (status: Draw['status']) => {
        const variants = {
            completed: { variant: 'secondary' as const, label: 'Terminé', color: 'bg-green-100 text-green-800' },
            disputed: { variant: 'destructive' as const, label: 'Contesté', color: 'bg-red-100 text-red-800' },
            verified: { variant: 'default' as const, label: 'Vérifié', color: 'bg-blue-100 text-blue-800' },
        };

        const { label, color } = variants[status];
        return <Badge className={color}>{label}</Badge>;
    };

    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Tirage</TableHead>
                        <TableHead>Campagne</TableHead>
                        <TableHead>Ticket gagnant</TableHead>
                        <TableHead>Gagnant</TableHead>
                        <TableHead>Date du tirage</TableHead>
                        <TableHead>Total tickets</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {draws.map((draw) => (
                        <TableRow key={draw.id}>
                            <TableCell className="font-mono text-sm">{draw.id}</TableCell>
                            <TableCell className="font-medium">{draw.campaign}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="font-mono">
                                    <Trophy className="w-3 h-3 mr-1" />
                                    {draw.winningTicket}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <div>
                                        <div className="font-medium">{draw.winner.name}</div>
                                        <div className="text-sm text-gray-500">{draw.winner.email}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                                {draw.drawDate}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{draw.totalTickets}</Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(draw.status)}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Trophy className="w-4 h-4 mr-1" />
                                        Détails
                                    </Button>
                                    {isDevelopment && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-1" />
                                            Re-tirer
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {isDevelopment && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                        <strong>Mode développement :</strong> Le bouton &quot;Re-tirer&quot;qqq est disponible pour les tests.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DrawsTable;