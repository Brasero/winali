"use client";
import {Suspense, useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CampaignsTable from '@/components/admin/CampaignsTable';
import CampaignDetail from '@/components/admin/CampaignDetail';
import TransactionsTable from '@/components/admin/TransactionsTable';
import UsersTable from '@/components/admin/UsersTable';
import DrawsTable from '@/components/admin/DrawsTable';
import { Shield, Users, CreditCard, Ticket, Trophy } from 'lucide-react';
import {Skeleton} from "@/components/ui/skeleton";

const Admin = () => {
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-8 h-8 text-brand-purple" />
                        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
                    </div>
                    <p className="text-gray-600">Gestion et supervision de la plateforme</p>
                </div>

                <Tabs defaultValue="data" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 mb-8">
                        <TabsTrigger value="data" className="flex items-center gap-2">
                            <Ticket className="w-4 h-4" />
                            Campagnes
                        </TabsTrigger>
                        <TabsTrigger value="transactions" className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Transactions
                        </TabsTrigger>
                        <TabsTrigger value="users" className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Utilisateurs
                        </TabsTrigger>
                        <TabsTrigger value="draws" className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Tirages
                        </TabsTrigger>
                        <TabsTrigger value="campaign-detail" disabled={!selectedCampaignId}>
                            Détail
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="data">
                        <Card>
                            <CardHeader>
                                <CardTitle>Liste des campagnes</CardTitle>
                                <CardDescription>
                                    Gestion et supervision de toutes les campagnes de billetterie
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Suspense fallback={<Skeleton />}>
                                    <CampaignsTable onSelectCampaign={setSelectedCampaignId} />
                                </Suspense>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="campaign-detail">
                        {selectedCampaignId ? (
                            <CampaignDetail campaignId={selectedCampaignId} />
                        ) : (
                            <Card>
                                <CardContent className="p-8 text-center text-gray-500">
                                    Sélectionnez une campagne pour voir les détails
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="transactions">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transactions Stripe</CardTitle>
                                <CardDescription>
                                    Historique et statut de toutes les transactions financières
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TransactionsTable />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <CardTitle>Utilisateurs</CardTitle>
                                <CardDescription>
                                    Gestion des comptes utilisateurs et statuts de vérification
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UsersTable />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="draws">
                        <Card>
                            <CardHeader>
                                <CardTitle>Historique des tirages</CardTitle>
                                <CardDescription>
                                    Tous les tirages effectués et leurs résultats
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DrawsTable />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;