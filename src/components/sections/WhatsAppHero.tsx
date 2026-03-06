import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout';
import { WhatsAppLink } from '@/components/tracking';

interface WhatsAppHeroProps {
    title: string;
    subtitle: string;
    ctaText?: string;
    messageKey?: string;
    customNumber?: string;
    badges?: string[];
    features?: { icon: ReactNode; title: string; desc: string }[];
}

export function WhatsAppHero({
    title,
    subtitle,
    ctaText = '👉 Cotizar por WhatsApp Ahora',
    messageKey = 'ads_primera_importacion',
    customNumber,
    badges = [],
    features = []
}: WhatsAppHeroProps) {
    return (
        <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden py-16 md:py-24">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl mix-blend-screen" />
            </div>

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badges */}
                    {badges.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                            {badges.map((badge, i) => (
                                <span key={i} className="px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full border border-white/20">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Titulo y subtitulo */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto font-medium">
                        {subtitle}
                    </p>

                    {/* Gran CTA de WhatsApp - THE MAIN EVENT */}
                    <div className="pt-8 pb-4">
                        <WhatsAppLink
                            messageKey={messageKey}
                            customNumber={customNumber}
                            variant="button"
                            className="text-xl md:text-2xl px-10 md:px-14 py-5 md:py-6 shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 animate-pulse-glow w-full sm:w-auto justify-center"
                        >
                            {ctaText}
                        </WhatsAppLink>
                        <p className="text-sm text-indigo-200 mt-4 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                            Asesores en línea - Respuesta Rápida
                        </p>
                    </div>

                    {/* Features/Beneficios Rapidos */}
                    {features.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-12 border-t border-white/10">
                            {features.map((feature, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                                    <div className="text-3xl mb-3 text-blue-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-indigo-200">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
