/**
 * Blog Lead API Route
 * Receives lead form submissions from blog posts
 */

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, phone, service, topic, source } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 },
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 },
            );
        }

        // Log the lead (in production, send to CRM/email service)
        console.log('[Blog Lead]', {
            name,
            email,
            phone,
            service,
            topic,
            source,
            timestamp: new Date().toISOString(),
        });

        // TODO: Integrate with your email service or CRM
        // For example, send to the same email service as the contact form:
        // await sendEmail({ ... })

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Blog Lead] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
