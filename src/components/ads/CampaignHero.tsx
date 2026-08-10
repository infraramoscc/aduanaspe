import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout';

export interface CampaignBenefit {
    title: string;
    description: string;
}

export interface CampaignHeroProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    actions: ReactNode;
    benefits: CampaignBenefit[];
    trustNote: string;
    showBrand?: boolean;
}

export function CampaignHero({
    eyebrow,
    title,
    subtitle,
    imageSrc,
    imageAlt,
    actions,
    benefits,
    trustNote,
    showBrand = true,
}: CampaignHeroProps) {
    return (
        <section className="relative overflow-hidden border-b border-slate-800 bg-[#111827] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(56,189,248,0.13),transparent_30%),linear-gradient(135deg,#111827_0%,#171936_55%,#102a36_100%)]" />
            <div className="absolute inset-y-0 left-[7%] hidden w-px bg-white/8 xl:block" />

            <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:py-20">
                <div className="max-w-2xl">
                    {showBrand && (
                        <Link href="/" className="mb-9 inline-flex text-2xl font-black tracking-tight text-white">
                            AduanasPE<span className="text-emerald-400">.</span>
                        </Link>
                    )}
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                        <span className="h-px w-8 bg-cyan-300/70" aria-hidden="true" />
                        {eyebrow}
                    </p>
                    <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">{subtitle}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
                    <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                        {trustNote}
                    </p>
                </div>

                <div className="relative min-h-[340px] overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.38)] sm:min-h-[430px]">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 48vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/5" />
                    <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-white/25 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
                        <span>Operación internacional</span>
                        <span>AduanasPE</span>
                    </div>
                </div>
            </Container>

            <Container className="relative grid gap-px overflow-hidden border-t border-white/10 bg-white/10 sm:grid-cols-3">
                {benefits.map((benefit, index) => (
                    <div key={benefit.title} className="bg-[#111827]/95 px-6 py-6 backdrop-blur-sm">
                        <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-300/80">0{index + 1}</p>
                        <h2 className="mt-2 font-semibold text-white">{benefit.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
                    </div>
                ))}
            </Container>
        </section>
    );
}
