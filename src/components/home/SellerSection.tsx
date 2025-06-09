import { Image, Ticket, DollarSign, Users } from 'lucide-react';

const SellerSection = () => {
    const steps = [
        {
            icon: <Image className="h-8 w-8 text-brand-purple" />,
            title: "Créez votre campagne",
            description: "Ajoutez des photos, une description et fixez la valeur de votre bien."
        },
        {
            icon: <Ticket className="h-8 w-8 text-brand-purple" />,
            title: "Fixez le prix du ticket",
            description: "Déterminez le nombre de tickets et leur prix unitaire pour optimiser vos chances de vente."
        },
        {
            icon: <Users className="h-8 w-8 text-brand-purple" />,
            title: "Regardez les ventes",
            description: "Suivez en temps réel la progression des ventes de tickets pour votre campagne."
        },
        {
            icon: <DollarSign className="h-8 w-8 text-brand-purple" />,
            title: "Recevez votre paiement",
            description: "Une fois tous les tickets vendus, le tirage a lieu et vous recevez votre paiement."
        }
    ];

    return (
        <section id="comment-ca-marche" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pour les vendeurs</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Vendez vos biens à leur juste valeur en permettant à plusieurs acheteurs de tenter leur chance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl card-hover border border-gray-100"
                        >
                            <div className="flex justify-center items-center h-16 w-16 rounded-full bg-brand-purple/10 mb-6 mx-auto">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                            <p className="text-gray-600 text-center">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-brand-purple/10 to-brand-coral/10">
                        <h3 className="text-2xl font-bold mb-4">Vous n&apos;avez pas à brader vos biens</h3>
                        <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
                            Avec Winali, vous recevez généralement entre 90% et 110% de la valeur de votre bien, selon sa popularité.
                        </p>
                        <button className="text-brand-purple font-semibold text-lg hover:underline focus:outline-none">
                            En savoir plus sur les commissions →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerSection;