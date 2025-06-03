import React from 'react';
import {buttonVariants} from '@/components/ui/button';
import {ArrowLeft, User} from 'lucide-react';
import  Link  from 'next/link';
import BuyerParticipation from '@/components/profil/BuyerParticipation';

const BuyerParticipationsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <Link href="/user/profil" className={`${buttonVariants({variant: "outline"})} mb-4 flex items-center gap-2`}>
                            <ArrowLeft className="w-4 h-4" />
                            Retour au profil
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <User className="w-8 h-8" />
                        Mes participations
                    </h1>
                    <p className="text-gray-600">Toutes vos participations aux campagnes</p>
                </div>

                <BuyerParticipation />
            </div>
        </div>
    );
};

export default BuyerParticipationsPage;