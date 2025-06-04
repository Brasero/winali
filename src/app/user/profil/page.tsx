
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Button, buttonVariants} from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Mail, Calendar, Shield, LogOut, Settings, ShoppingCart, Store, ExternalLink } from 'lucide-react';
import Link  from 'next/link';
import SellerCampaigns from '@/components/profil/SellerCampaigns';
import {auth, signOut} from "@/auth";
import {query} from "@/lib/db";
import {revalidatePath} from "next/cache";
type UserProfile = {
    email: string;
    registrationDate: string;
    emailVerified: boolean;
    isSeller: boolean;
    termsAccepted: boolean;
    termsAcceptedDate: string;
}

const Profile = async () => {
    const session = await auth()
    console.log(session)
    if (!session || !session.user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
                    <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
                    <Link href={"/authentification/login"} className={buttonVariants({variant: "default"})}>Se connecter</Link>
                </div>
            </div>
        );
    }
    //get user profile from database
    const rows = await query(`
        SELECT 
            email,
            created_at AS registrationDate,
            is_email_verified AS emailVerified,
            is_seller,
            TRUE AS termsAccepted,
            created_at AS termsAcceptedDate,
            first_name,
            last_name,
            birth_date
        FROM users
        WHERE id = $1
    `, [session?.user?.id as string]);
    if (rows.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Profil non trouvé</h1>
                    <p className="text-gray-600">Aucun profil associé à cet utilisateur.</p>
                    <Link href={"/authentification/signup"} className={buttonVariants({variant: "default"})}>S&apos;inscrire</Link>
                </div>
            </div>
        );
    }
    const userProfile: UserProfile = {
        email: rows[0].email,
        registrationDate: rows[0].registrationdate as string,
        emailVerified: rows[0].emailverified as boolean,
        isSeller: rows[0].is_seller as boolean,
        termsAccepted: rows[0].termsaccepted,
        termsAcceptedDate: rows[0].termsaccepteddate
    };
    const handleSellerToggle = async (formData: FormData) => {
        "use server";
        const isSeller = formData.get("isSeller") === "on";
        const result = await query(`
            UPDATE users
            SET is_seller = $1
            WHERE id = $2
            RETURNING *
        `, [!isSeller, session?.user?.id as string]);
        if (result.length === 0) {
            throw new Error("Erreur lors de la mise à jour du statut vendeur");
        }
        console.log("Statut vendeur mis à jour :", result[0]);
        revalidatePath("/user/profil");
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
                            <Button variant="outline">
                                Modifier mot de passe
                            </Button>
                            <form action={async () => {
                                "use server"
                                await signOut({redirectTo: "/authentification/login"});
                            }}>
                                <Button className={"text-white"} variant="destructive">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Se déconnecter
                                </Button>
                            </form>
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
                            <form action={handleSellerToggle}>
                                <Switch
                                    checked={userProfile.isSeller}
                                    name={"isSeller"}
                                    type={"submit"}
                                />
                            </form>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{
                                userProfile.termsAccepted ? `✅ Conditions d'utilisation acceptées le ${new Date(userProfile.termsAcceptedDate).toLocaleDateString('fr-FR')}` :
                                    "❌ Conditions d'utilisation non acceptées"
                            }</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Section Vendeur */}
                {userProfile.isSeller && (
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