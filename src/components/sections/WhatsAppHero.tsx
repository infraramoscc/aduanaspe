import { ReactNode } from 'react';
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
    ctaText = 'Cotizar por WhatsApp',
    messageKey = 'ads_primera_importacion',
    customNumber,
    badges = [],
    features = [],
}: WhatsAppHeroProps) {
    return (
        <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#172033_0%,#22314a_100%)] py-16 text-white md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_left,rgba(15,159,110,0.12),transparent_22%)]" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    {badges.length > 0 && (
                        <div className="mb-6 flex flex-wrap justify-center gap-3">
                            {badges.map((badge, i) => (
                                <span
                                    key={i}
                                    className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-semibold text-slate-100"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                        {title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                        {subtitle}
                    </p>

                    <div className="pb-4 pt-8">
                        <WhatsAppLink
                            messageKey={messageKey}
                            customNumber={customNumber}
                            variant="button"
                            className="w-full justify-center px-10 py-5 text-lg shadow-xl sm:w-auto"
                        >
                            {ctaText}
                        </WhatsAppLink>
                        <p className="mt-4 text-sm text-slate-300">
                            Respuesta por WhatsApp en horario de atención
                        </p>
                    </div>

                    {features.length > 0 && (
                        <div className="mt-12 grid grid-cols-1 gap-5 border-t border-white/10 pt-10 md:grid-cols-3">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-white/10 bg-white/6 p-5 text-center backdrop-blur-sm"
                                >
                                    <div className="mb-3 text-3xl text-emerald-300">{feature.icon}</div>
                                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
