import React from 'react';
import {buttonVariants} from '@/components/ui/button';
import { ArrowLeft, Wrench, Clock, Sparkles } from 'lucide-react';
import Link from "next/link"

const Construction = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Decorative background elements */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-purple/5 rounded-full filter blur-3xl"></div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-coral/5 rounded-full filter blur-3xl"></div>

                    {/* Icon */}
                    <div className="relative mb-8">
                        <div className="w-24 h-24 bg-gradient-to-r from-brand-purple to-brand-coral rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                            <Wrench className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-coral rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
                        Page en <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">construction</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Nous travaillons activement sur cette fonctionnalité.
                        Elle sera bientôt disponible avec tout l&apos;amour du détail que vous méritez.
                    </p>

                    {/* Status indicator */}
                    <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-brand-purple/20">
                        <Clock className="w-5 h-5 text-brand-purple mr-3" />
                        <span className="text-brand-purple font-medium">En développement</span>
                        <div className="ml-3 flex space-x-1">
                            <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-brand-coral rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>

                    {/* Action button */}
                    <Link
                        href={"/"}
                        className={`${buttonVariants({variant: "link"})} hover:no-underline mx-4 bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold px-8 py-3 text-lg`}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Retour à l&apos;accueil
                    </Link>

                    {/* Additional info */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="p-4">
                            <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-6 h-6 text-brand-purple" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Expérience optimisée</h3>
                            <p className="text-sm text-gray-600">Interface pensée pour vous</p>
                        </div>
                        <div className="p-4">
                            <div className="w-12 h-12 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Clock className="w-6 h-6 text-brand-coral" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Bientôt disponible</h3>
                            <p className="text-sm text-gray-600">Développement en cours</p>
                        </div>
                        <div className="p-4">
                            <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Wrench className="w-6 h-6 text-brand-purple" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Qualité garantie</h3>
                            <p className="text-sm text-gray-600">Testé avec soin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Construction;