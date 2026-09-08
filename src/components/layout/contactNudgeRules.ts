export const CONTACT_NUDGE_DELAY_MS = 6000;

function normalizePathname(pathname: string): string {
    if (!pathname || pathname === '/') return '/';

    return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function shouldEnableContactNudge(pathname: string): boolean {
    const normalized = normalizePathname(pathname);

    // These pages already offer direct contact paths; don't cover them with a timed overlay.
    if (normalized.startsWith('/servicios')) return false;

    return !['/', '/contacto', '/quienes-somos'].includes(normalized);
}
