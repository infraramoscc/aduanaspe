import Image from 'next/image';
import { type EditorialImageData } from '@/content/mainPageImages';
import { cn } from '@/lib/utils';

interface EditorialMediaProps {
    image: EditorialImageData;
    priority?: boolean;
    aspect?: 'landscape' | 'compact';
    className?: string;
}

function EditorialMedia({
    image,
    priority = false,
    aspect = 'landscape',
    className,
}: EditorialMediaProps) {
    return (
        <figure className={cn('group', className)}>
            <div
                className={cn(
                    'relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-slate-100 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.55)]',
                    aspect === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/3]'
                )}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={priority}
                    sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    style={{ objectPosition: image.objectPosition ?? 'center' }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(15,23,42,0.18))]"
                />
            </div>
            <figcaption className="mt-3 flex items-center gap-3 text-sm leading-6 text-slate-600">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-cyan-600/60" />
                {image.caption}
            </figcaption>
        </figure>
    );
}

export { EditorialMedia, type EditorialMediaProps };
