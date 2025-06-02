"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail, Users, Gift, Clock } from 'lucide-react';
import {useIsMobile} from "@/hook/useIsMobile";
import {setLazyProp} from "next/dist/server/api-utils";

const PreLaunchHero = () => {
    const isMobile = useIsMobile();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState<string>("")
    const [countdown, setCountdown] = useState({
        days: 15,
        hours: 12,
        minutes: 30,
        seconds: 45
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email}),
            });
            const data = await res.json()
            if (!res.ok) {
                setStatus("error");
                setMessage(data.error || "Erreur inconnue");
            } else {
                setMessage(data.message);
                setStatus("success");
            }
        } catch {
            setStatus("error");
            setMessage("Echec de la requête");
        } finally {
            setEmail("");
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-16 hero-gradient flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 animate-fade-in text-center lg:text-left">
                        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-brand-purple/20">
                            <Clock className="w-4 h-4 text-brand-purple mr-2" />
                            <span className="text-sm font-medium text-brand-purple">Bientôt disponible</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Révolutionnez vos <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">ventes</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Préparez-vous à découvrir une nouvelle façon de vendre vos objets de valeur.
                            Créez des campagnes, vendez par tickets et tirez au sort vos gagnants de manière équitable.
                        </p>

                        {/* Countdown Timer */}
                        <div className="grid grid-cols-4 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
                            <div className="bg-white rounded-lg p-4 shadow-md text-center">
                                <div className="text-2xl font-bold text-brand-purple">{countdown.days}</div>
                                <div className="text-xs text-gray-500 uppercase">{isMobile ? "J" : "Jours"}</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-md text-center">
                                <div className="text-2xl font-bold text-brand-purple">{countdown.hours}</div>
                                <div className="text-xs text-gray-500 uppercase">{isMobile ? "H" : "Heures"}</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-md text-center">
                                <div className="text-2xl font-bold text-brand-purple">{countdown.minutes}</div>
                                <div className="text-xs text-gray-500 uppercase">{isMobile ? "M":"Minutes"}</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-md text-center">
                                <div className="text-2xl font-bold text-brand-purple">{countdown.seconds}</div>
                                <div className="text-xs text-gray-500 uppercase">{isMobile ? "S":"Secondes"}</div>
                            </div>
                        </div>

                        {/* Email Signup */}
                        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-1 mb-6 max-w-md mx-auto lg:mx-0">
                            <div className={"flex flex-col sm:flex-row gap-3 mb-1 max-w-md mx-auto lg:mx-0"}>
                                <Input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 h-12 bg-background"
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold px-6 h-12"
                                    disabled={status === "loading"}
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    {status === "loading" ? "Envoi..." : "Être notifié"}
                                </Button>
                            </div>
                            {
                                status === "success" && <p className={"text-green-600"}>{message}</p>
                            }
                            {
                                status === "error" && <p className="text-red-600">{message}</p>
                            }
                        </form>

                        <p className="text-sm text-gray-500 mb-8">
                            Soyez les premiers informés du lancement et recevez des avantages exclusifs.
                        </p>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
                            <div className="flex flex-col items-center lg:items-start">
                                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-2">
                                    <Users className="w-6 h-6 text-brand-purple" />
                                </div>
                                <div className="text-sm font-medium">Accès anticipé</div>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <div className="w-12 h-12 bg-brand-coral/10 rounded-full flex items-center justify-center mb-2">
                                    <Gift className="w-6 h-6 text-brand-coral" />
                                </div>
                                <div className="text-sm font-medium">Bonus exclusifs</div>
                            </div>
                            <div className="flex flex-col items-center lg:items-start">
                                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mb-2">
                                    <ArrowRight className="w-6 h-6 text-brand-purple" />
                                </div>
                                <div className="text-sm font-medium">Inscription facile</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-3xl"></div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-coral/10 rounded-full filter blur-3xl"></div>

                            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-8 z-10 ticket-shape">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-brand-purple to-brand-coral rounded-full mx-auto mb-6 flex items-center justify-center">
                                        <Gift className="w-10 h-10 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4">Bientôt disponible</h3>
                                    <p className="text-gray-600 mb-6">
                                        Découvrez une nouvelle façon de vendre et d&apos;acheter qui révolutionne le commerce en ligne.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm font-medium">Ventes par tickets</span>
                                            <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm font-medium">Tirages équitables</span>
                                            <div className="w-2 h-2 bg-brand-coral rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm font-medium">Interface intuitive</span>
                                            <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreLaunchHero