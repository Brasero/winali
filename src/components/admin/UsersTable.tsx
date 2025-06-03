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
import { CheckCircle, XCircle, Mail, Eye } from 'lucide-react';

interface User {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    registrationDate: string;
    campaignsCount: number;
    ticketsCount: number;
    status: 'active' | 'suspended' | 'pending';
}

const UsersTable = () => {
    // Données d'exemple - à remplacer par un appel API
    const users: User[] = [
        {
            id: 'usr_001',
            email: 'jean.dupont@email.com',
            name: 'Jean Dupont',
            emailVerified: true,
            registrationDate: '2024-01-10',
            campaignsCount: 2,
            ticketsCount: 5,
            status: 'active',
        },
        {
            id: 'usr_002',
            email: 'marie.martin@email.com',
            name: 'Marie Martin',
            emailVerified: false,
            registrationDate: '2024-01-15',
            campaignsCount: 0,
            ticketsCount: 3,
            status: 'pending',
        },
        {
            id: 'usr_003',
            email: 'paul.bernard@email.com',
            name: 'Paul Bernard',
            emailVerified: true,
            registrationDate: '2024-01-12',
            campaignsCount: 1,
            ticketsCount: 8,
            status: 'active',
        },
    ];

    const getVerificationBadge = (verified: boolean) => {
        return verified ? (
            <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Vérifié
            </Badge>
        ) : (
            <Badge className="bg-red-100 text-red-800">
                <XCircle className="w-3 h-3 mr-1" />
                Non vérifié
            </Badge>
        );
    };

    const getStatusBadge = (status: User['status']) => {
        const variants = {
            active: { variant: 'secondary' as const, label: 'Actif', color: 'bg-green-100 text-green-800' },
            suspended: { variant: 'destructive' as const, label: 'Suspendu', color: 'bg-red-100 text-red-800' },
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
                        <TableHead>ID</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Email vérifié</TableHead>
                        <TableHead>Date d&apos;inscription</TableHead>
                        <TableHead>Campagnes</TableHead>
                        <TableHead>Tickets</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-mono text-sm">{user.id}</TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </TableCell>
                            <TableCell>{getVerificationBadge(user.emailVerified)}</TableCell>
                            <TableCell className="text-sm text-gray-600">
                                {user.registrationDate}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{user.campaignsCount}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{user.ticketsCount}</Badge>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="w-4 h-4 mr-1" />
                                        Voir
                                    </Button>
                                    {!user.emailVerified && (
                                        <Button variant="secondary" size="sm">
                                            <Mail className="w-4 h-4 mr-1" />
                                            Renvoyer
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

export default UsersTable;