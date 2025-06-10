import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, User } from 'lucide-react';
import Link from 'next/link';

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <Card className="text-center">
                    <CardHeader className="pb-4">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl text-green-600 mb-2">
                            Paiement réussi !
                        </CardTitle>
                        <p className="text-gray-600">
                            Votre transaction a été traitée avec succès
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800 font-medium">
                                ✅ Votre paiement a été confirmé
                            </p>
                            <p className="text-green-600 text-sm mt-1">
                                Vous recevrez un email de confirmation sous peu
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="font-semibold text-gray-900">Prochaines étapes :</h3>
                            <div className="text-left space-y-2 text-gray-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Vérifiez votre email pour le reçu de paiement
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Votre commande sera traitée dans les plus brefs délais
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Vous pouvez consulter vos participations dans votre profil
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Link href="/" className="flex-1">
                                <Button variant="outline" className="w-full flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    Retour à l&apos;accueil
                                </Button>
                            </Link>
                            <Link href="/user/profil" className="flex-1">
                                <Button className="w-full flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Mon profil
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentSuccess;