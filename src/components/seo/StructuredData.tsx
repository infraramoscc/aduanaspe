import { JsonLd } from './JsonLd';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';

export function StructuredData() {
    return (
        <>
            <JsonLd json={generateOrganizationSchema()} />
            <JsonLd json={generateWebSiteSchema()} />
        </>
    );
}
