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
import {useEffect, useState} from "react";
import {TAdminUser} from "@/lib/db/types";
import {fetchAdminUsers} from "@/components/admin/action/userAction";

const UsersTable = () => {
    const [users, setUsers] = useState<TAdminUser[]>([])
    
    useEffect(() => {
        fetchAdminUsers(1, 10).then(fetchedUsers => {
            console.log('Utilisateurs récupérés:', fetchedUsers);
            setUsers(fetchedUsers);
        })
        return () => {
            setUsers([]);
        };
    }, []);
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

    const getStatusBadge = (status: TAdminUser['status']) => {
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
                        <TableHead>Total dépensé</TableHead>
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
                            <TableCell>{getVerificationBadge(user.email_verified)}</TableCell>
                            <TableCell className="text-sm text-gray-600">
                                {new Date(user.registration_date).toLocaleDateString('fr-FR', {})} {new Date(user.registration_date).toLocaleTimeString()}
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{user.campaigns_count}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{user.tickets_count}</Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-gray-600">€</span>
                                    <span className="font-medium">{user.total_spent}</span>
                                </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="w-4 h-4 mr-1" />
                                        Voir
                                    </Button>
                                    {!user.email_verified && (
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