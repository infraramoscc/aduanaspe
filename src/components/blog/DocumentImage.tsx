import Image from 'next/image';

interface DocumentImageProps {
    src: string;
    alt: string;
    width: number | string;
    height: number | string;
}

/** Preserve document proportions and offer the full-resolution scan for reading. */
export function DocumentImage({src, alt, width, height}: DocumentImageProps) {
    return (
        <a href={src} target="_blank" rel="noopener noreferrer"
            aria-label={`${alt}: abrir imagen original en una pestaña nueva`}
            className="my-8 block rounded-xl border border-slate-200 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
            <Image src={src} alt={alt} width={Number(width)} height={Number(height)} unoptimized
                className="mx-auto h-auto max-w-full" loading="lazy" />
        </a>
    );
}
