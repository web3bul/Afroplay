import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  canonical: string;
  /** Absolute URL to the OG image (1200×630). Defaults to /og/default.svg */
  ogImage?: string;
  ogType?: 'website' | 'article';
}

/**
 * Per-page <head> metadata. Rendered via react-helmet-async — Googlebot and
 * other JS-executing crawlers pick up these tags after page render.
 * Static fallbacks (title, description) should also live in index.html.
 */
const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  canonical,
  ogImage = 'https://afroplay.org/og/default.svg',
  ogType = 'website',
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    {/* Open Graph */}
    <meta property="og:site_name" content="AfroPlay" />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* Twitter / X card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@AfroPlayHQ" />
    <meta name="twitter:creator" content="@AfroPlayHQ" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <meta name="robots" content="index, follow" />
  </Helmet>
);

export default PageMeta;

/**
 * Injects a <script type="application/ld+json"> block via Helmet.
 * Accepts any schema.org object or @graph array.
 */
export const JsonLd: React.FC<{ data: object }> = ({ data }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  </Helmet>
);
