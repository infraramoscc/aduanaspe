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

export type BlogCategory =
    | 'Aduanas'
    | 'Carga Internacional'
    | 'Transporte'
    | 'Consultoría'
    | 'Importación'
    | 'Exportación'
    | 'Comercio Exterior';

/** Frontmatter fields in MDX files */
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

/** Unified blog post type used across the system */
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
    /** Only present for MDX posts when content is loaded */
    content?: React.ReactElement;
}

/** Post card data (lighter, for listing pages) */
export type BlogPostCard = Omit<BlogPost, 'content'>;
