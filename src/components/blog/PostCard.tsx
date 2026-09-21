/**
 * Blog Post Card Component
 * Displays a preview card for blog listing pages
 */

import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import type { BlogPostCard } from '@/lib/blog/types';

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
                'group flex h-full min-w-0 flex-col rounded-[1.5rem] border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C3794] focus-visible:ring-offset-4',
                featured
                    ? 'bg-gradient-to-br from-[#3C3794] via-[#2F2B77] to-[#0E7490] border-transparent p-6 text-white shadow-lg hover:-translate-y-2 hover:shadow-2xl lg:flex-row lg:gap-8 lg:p-8'
                    : 'border-[var(--home-border-soft)] bg-white p-6 shadow-md hover:-translate-y-2 hover:border-[#3C3794] hover:shadow-2xl sm:p-8'
            )}
        >
            <div className={cn('min-w-0', featured ? 'lg:flex lg:w-[38%] lg:flex-col lg:justify-between' : '')}>
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
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
                                {formatDate(post.date)} · {post.readingTime}
                            </p>
                        </div>
                    </div>

                    {featured && (
                        <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                            Análisis destacado
                        </span>
                    )}
                </div>
            </div>

            <div className={cn('flex min-w-0 flex-1 flex-col', featured ? 'lg:border-l lg:border-white/10 lg:pl-6' : 'mt-2')}>
                <h3 className={cn(
                    'text-xl font-bold leading-tight transition-colors',
                    featured ? 'text-white group-hover:text-slate-100' : 'text-slate-950 group-hover:text-slate-800'
                )}>
                    {post.title}
                </h3>

                <p className={cn(
                    'mt-3 text-sm leading-7',
                    featured ? 'max-w-[58ch] text-slate-300' : 'line-clamp-2 text-slate-600'
                )}>
                    {post.description}
                </p>

                {previewTags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {previewTags.map((tag) => (
                            <span
                                key={tag}
                                className={cn(
                                    'rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
                                    featured
                                        ? 'text-slate-400'
                                        : 'text-slate-500 bg-slate-50 border border-slate-100 hover:border-slate-200'
                                )}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className={cn(
                    'mt-auto flex items-center justify-between border-t pt-4 text-sm',
                    featured ? 'border-white/10 text-slate-200' : 'border-slate-200 text-slate-600'
                )}>
                    <span className="truncate pr-3">
                        {post.author}
                    </span>
                    <span className={cn(
                        'inline-flex items-center gap-2 font-semibold transition-colors',
                        featured ? 'text-emerald-300 group-hover:text-emerald-400' : 'text-[#3C3794] group-hover:text-[#2F2B77]'
                    )}>
                        Leer análisis
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">{'->'}</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}
