import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Euro, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface Transaction {
    id: string;
    user: string;
    campaign: string;
    type: 'payment' | 'refund' | 'payout';
    amount: number;
    commission: number;
    netAmount: number;
    status: 'success' | 'failed' | 'pending';
    date: string;
}

const TransactionsTable = () => {
    // Données d'exemple - à remplacer par un appel API
    const transactions: Transaction[] = [
        {
            id: 'txn_001',
            user: 'jean.dupont@email.com',
            campaign: 'Concert Jazz Festival',
            type: 'payment',
            amount: 100,
            commission: 5,
            netAmount: 95,
            status: 'success',
            date: '2024-01-15 14:30',
        },
        {
            id: 'txn_002',
            user: 'marie.martin@email.com',
            campaign: 'Match PSG vs OM',
            type: 'refund',
            amount: 50,
            commission: 0,
            netAmount: -50,
            status: 'success',
            date: '2024-01-16 09:15',
        },
        {
            id: 'txn_003',
            user: 'EventCorp',
            campaign: 'Concert Jazz Festival',
            type: 'payout',
            amount: 1000,
            commission: 50,
            netAmount: 950,
            status: 'pending',
            date: '2024-01-16 16:45',
        },
    ];

    const getTypeIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'payment':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'refund':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            case 'payout':
                return <ArrowRight className="w-4 h-4 text-blue-500" />;
        }
    };

    const getTypeBadge = (type: Transaction['type']) => {
        const variants = {
            payment: { variant: 'secondary' as const, label: 'Paiement', color: 'bg-green-100 text-green-800' },
            refund: { variant: 'destructive' as const, label: 'Remboursement', color: 'bg-red-100 text-red-800' },
            payout: { variant: 'default' as const, label: 'Versement', color: 'bg-blue-100 text-blue-800' },
        };

        const { label, color } = variants[type];
        return <Badge className={color}>{label}</Badge>;
    };

    const getStatusBadge = (status: Transaction['status']) => {
        const variants = {
            success: { variant: 'secondary' as const, label: 'Réussi', color: 'bg-green-100 text-green-800' },
            failed: { variant: 'destructive' as const, label: 'Échec', color: 'bg-red-100 text-red-800' },
            pending: { variant: 'default' as const, label: 'En attente', color: 'bg-orange-100 text-orange-800' },
        };

        const { label, color } = variants[status];
        return <Badge className={color}>{label}</Badge>;
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Transaction</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Campagne</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Commission</TableHead>
                        <TableHead>Net reversé</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                            <TableCell>{transaction.user}</TableCell>
                            <TableCell className="font-medium">{transaction.campaign}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {getTypeIcon(transaction.type)}
                                    {getTypeBadge(transaction.type)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Euro className="w-4 h-4" />
                                    {transaction.amount}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1 text-red-600">
                                    <Euro className="w-4 h-4" />
                                    {transaction.commission}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className={`flex items-center gap-1 ${transaction.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    <Euro className="w-4 h-4" />
                                    {transaction.netAmount}
                                </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className="text-sm text-gray-600">
                                {transaction.date}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TransactionsTable;