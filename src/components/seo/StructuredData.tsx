import { generateLocalBusinessSchema } from '@/lib/schema';

export function StructuredData() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: generateLocalBusinessSchema(),
            }}
        />
    );
}
