import { generateAdsMetadata } from '@/lib/seo';

export const metadata = generateAdsMetadata(
    'Landing Page',
    'Página de aterrizaje para campañas publicitarias'
);

export default function AdsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-white">
            {children}
        </main>
    );
}
