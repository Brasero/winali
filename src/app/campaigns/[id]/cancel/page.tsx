import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PaymentError = ({params}: { params: {id: string}}) => {
    // retrieve the id in URL server side
    const { id } = params;
    const backLink = `/campaigns/${id}`;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
            <div className="container mx-auto px-4 max-w-2xl">
                <Card className="text-center">
                    <CardHeader className="pb-4">
                        <div className="flex justify-center mb-4">
                            <XCircle className="w-16 h-16 text-red-500" />
                        </div>
                        <CardTitle className="text-2xl text-red-600 mb-2">
                            Échec du paiement
                        </CardTitle>
                        <p className="text-gray-600">
                            Votre transaction n&apos;a pas pu être traitée
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-800 font-medium">
                                ❌ Le paiement a été refusé ou annulé
                            </p>
                            <p className="text-red-600 text-sm mt-1">
                                Aucune charge n&apos;a été effectuée sur votre carte
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="font-semibold text-gray-900">Que faire maintenant :</h3>
                            <div className="text-left space-y-2 text-gray-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Vérifiez les informations de votre carte bancaire
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Assurez-vous d&apos;avoir suffisamment de fonds disponibles
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Contactez votre banque si le problème persiste
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    Essayez avec une autre méthode de paiement
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
                            <Link href={backLink} className="flex-1">
                                <Button
                                    className="flex-1 flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Retour à la vente
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentError;