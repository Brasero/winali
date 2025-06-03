"use client"
import {useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar, Shield, LogOut, Settings, ShoppingCart, Store, ExternalLink } from 'lucide-react';
import Link  from 'next/link';
import SellerCampaigns from '@/components/profil/SellerCampaigns';

const Profile = () => {
    // Données d'exemple - à remplacer par des données réelles
    const userProfile = {
        email: 'user@example.com',
        registrationDate: '2024-01-15',
        emailVerified: true,
        isSeller: true,
        termsAccepted: true,
        termsAcceptedDate: '2024-01-15'
    };
    const [isSellerEnabled, setIsSellerEnabled] = useState(userProfile.isSeller);



    const handlePasswordChange = () => {
        console.log('Modifier mot de passe');
    };

    const handleLogout = () => {
        console.log('Déconnexion');
    };

    const handleSellerToggle = (enabled: boolean) => {
        setIsSellerEnabled(enabled);
        console.log('Statut vendeur:', enabled);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
                    <p className="text-gray-600">Gérez vos informations personnelles et vos activités</p>
                </div>

                {/* Informations générales */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Informations générales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Adresse e-mail</p>
                                    <p className="font-medium">{userProfile.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Date d&apos;inscription</p>
                                    <p className="font-medium">{new Date(userProfile.registrationDate).toLocaleDateString('fr-FR')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Statut e-mail</p>
                                <Badge variant={userProfile.emailVerified ? "default" : "destructive"}>
                                    {userProfile.emailVerified ? "✅ Vérifié" : "❌ Non vérifié"}
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="outline" onClick={handlePasswordChange}>
                                Modifier mot de passe
                            </Button>
                            <Button className={"text-white"} variant="destructive" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Se déconnecter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Section Acheteur */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                Mes achats
                            </div>
                            <Link href="/user/participations">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Voir toutes mes participations
                                </Button>
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 text-center py-4">
                            Consultez l&apos;historique complet de vos participations aux campagnes
                        </p>
                    </CardContent>
                </Card>

                {/* Paramètres du compte */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Paramètres du compte</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Je souhaite vendre des biens</p>
                                <p className="text-sm text-gray-500">Active les droits &quot;vendeur&quot; dans votre compte</p>
                            </div>
                            <Switch
                                checked={isSellerEnabled}
                                onCheckedChange={handleSellerToggle}
                            />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{
                                userProfile.termsAccepted ? `✅ Conditions d'utilisation acceptées le ${new Date(userProfile.termsAcceptedDate).toLocaleDateString('fr-FR')}` :
                                    "❌ Conditions d&apos;utilisation non acceptées"
                            }</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Section Vendeur */}
                {isSellerEnabled && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Store className="w-5 h-5" />
                                Mes campagnes de vente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SellerCampaigns />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Profile;