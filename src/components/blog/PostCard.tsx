/**
 * Blog Post Card Component
 * Displays a preview card for blog listing pages
 */

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
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
                'group block service-card overflow-hidden transition-all duration-300',
                featured ? 'service-pink' : 'service-blue',
            )}
        >
            {/* Header: Topic Icon + Category */}
            <div className="flex items-center gap-3 mb-4">
                <TopicIcon topic={post.topic} />
                <div>
                    <span className="section-badge text-xs">{post.category}</span>
                    {featured && (
                        <span className="ml-2 px-2 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
                            ⭐ Destacado
                        </span>
                    )}
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{post.readingTime}</p>
                </div>
            </div>

            {/* Title */}
            <h3 className={cn(
                'font-bold text-[var(--text-heading)] group-hover:text-[var(--purple)] transition-colors leading-tight mb-2',
                featured ? 'text-xl' : 'text-lg',
            )}>
                {post.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--text-body)] line-clamp-2 mb-4">
                {post.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mt-auto">
                <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
                <span className="service-link text-sm">
                    Leer más →
                </span>
            </div>
        </Link>
    );
}
