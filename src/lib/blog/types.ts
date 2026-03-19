/**
 * Blog System - Core Types
 * Unified type system for MDX and Sanity posts
 */

export type BlogSource = 'mdx' | 'sanity';

export type BlogTopic =
    | 'agenciamiento-aduanas'
    | 'agencia-carga'
    | 'transporte'
    | 'resguardo'
    | 'consultoria'
    | 'clasificacion-arancelaria'
    | 'importacion'
    | 'exportacion'
    | 'courier-vs-carga'
    | 'fiscalizacion'
    | 'comercio-exterior';

export type LeadTemperature = 'frio' | 'tibio' | 'caliente';

export const BLOG_CATEGORIES = [
    'Aduanas',
    'Carga Internacional',
    'Transporte',
    'Consultoría',
    'Importación',
    'Exportación',
    'Comercio Exterior',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogFrontmatter {
    title: string;
    description: string;
    date: string;
    updatedAt?: string;
    author?: string;
    category: BlogCategory;
    topic: BlogTopic;
    tags: string[];
    image?: string;
    imageAlt?: string;
    featured?: boolean;
    draft?: boolean;
}

export interface BlogPost {
    slug: string;
    source: BlogSource;
    title: string;
    description: string;
    date: string;
    updatedAt?: string;
    author: string;
    category: BlogCategory;
    topic: BlogTopic;
    tags: string[];
    image?: string;
    imageAlt?: string;
    featured: boolean;
    readingTime: string;
    content?: React.ReactElement;
}

export type BlogPostCard = Omit<BlogPost, 'content'>;
