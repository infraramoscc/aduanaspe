/**
 * Blog Post Card Component
 * Displays a preview card for blog listing pages
 */

import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import type { BlogPostCard } from '@/lib/blog/types';
import { TopicIcon } from './MdxEnhanced';

interface PostCardProps {
    post: BlogPostCard;
    featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
    const previewTags = post.tags.slice(0, featured ? 4 : 3);

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(
                'group flex h-full min-w-0 flex-col rounded-[28px] border p-5 shadow-sm transition-[transform,box-shadow,border-color,background-color,color] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4',
                'hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]',
                featured
                    ? 'border-slate-900 bg-slate-950 text-white lg:flex-row lg:gap-6 lg:p-7'
                    : 'border-slate-200 bg-white hover:border-slate-300'
            )}
        >
            <div className={cn('min-w-0', featured ? 'lg:flex lg:w-[38%] lg:flex-col lg:justify-between' : '')}>
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className={cn(
                            'shrink-0 rounded-2xl border p-1',
                            featured ? 'border-white/15 bg-white/10' : 'border-slate-200 bg-slate-50'
                        )}>
                            <div className="origin-center scale-[0.72]">
                                <TopicIcon topic={post.topic} />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <span className={cn(
                                'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                                featured
                                    ? 'border border-white/15 bg-white/10 text-white'
                                    : 'border border-slate-200 bg-slate-50 text-slate-700'
                            )}>
                                {post.category}
                            </span>
                            <p className={cn(
                                'mt-2 text-xs',
                                featured ? 'text-slate-300' : 'text-slate-500'
                            )}>
                                {formatDate(new Date(post.date))} · {post.readingTime}
                            </p>
                        </div>
                    </div>

                    {featured && (
                        <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                            Destacado
                        </span>
                    )}
                </div>

                {previewTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {previewTags.map((tag) => (
                            <span
                                key={tag}
                                className={cn(
                                    'rounded-full px-2.5 py-1 text-[11px] font-medium',
                                    featured
                                        ? 'border border-white/15 bg-white/10 text-slate-200'
                                        : 'border border-slate-200 bg-white text-slate-600'
                                )}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className={cn('flex min-w-0 flex-1 flex-col', featured ? 'lg:border-l lg:border-white/10 lg:pl-6' : 'mt-5')}>
                <h3 className={cn(
                    'text-xl font-bold leading-tight transition-colors',
                    featured ? 'text-white group-hover:text-slate-100' : 'text-slate-950 group-hover:text-slate-700'
                )}>
                    {post.title}
                </h3>

                <p className={cn(
                    'mt-3 text-sm leading-7',
                    featured ? 'max-w-[58ch] text-slate-300' : 'line-clamp-2 text-slate-600'
                )}>
                    {post.description}
                </p>

                <div className={cn(
                    'mt-6 flex items-center justify-between border-t pt-4 text-sm',
                    featured ? 'border-white/10 text-slate-200' : 'border-slate-200 text-slate-600'
                )}>
                    <span className="truncate pr-3">
                        {post.author}
                    </span>
                    <span className={cn(
                        'inline-flex items-center gap-2 font-semibold',
                        featured ? 'text-white' : 'text-slate-900'
                    )}>
                        Leer articulo
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
