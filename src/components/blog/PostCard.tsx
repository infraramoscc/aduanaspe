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
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={cn(
                'group flex h-full flex-col rounded-[28px] border p-6 shadow-sm transition-[transform,box-shadow,border-color,background-color,color] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-4',
                'hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]',
                featured
                    ? 'border-slate-900 bg-slate-950 text-white hover:shadow-[0_28px_48px_rgba(15,23,42,0.2)]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
            )}
        >
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        'rounded-2xl border p-1',
                        featured ? 'border-white/15 bg-white/10' : 'border-slate-200 bg-slate-50'
                    )}>
                        <div className="origin-center scale-[0.72]">
                            <TopicIcon topic={post.topic} />
                        </div>
                    </div>
                    <div>
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
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                        Destacado
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col">
                <h3 className={cn(
                    'text-xl font-bold leading-tight transition-colors',
                    featured ? 'text-white group-hover:text-slate-100' : 'text-slate-950 group-hover:text-slate-700'
                )}>
                    {post.title}
                </h3>

                <p className={cn(
                    'mt-3 line-clamp-3 text-sm leading-7',
                    featured ? 'text-slate-300' : 'text-slate-600'
                )}>
                    {post.description}
                </p>

                <div className={cn(
                    'mt-6 flex items-center justify-between border-t pt-4 text-sm font-semibold',
                    featured ? 'border-white/10 text-white' : 'border-slate-200 text-slate-900'
                )}>
                    <span>{post.author}</span>
                    <span className="inline-flex items-center gap-2 transition-transform group-hover:translate-x-1">
                        Leer artículo
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
