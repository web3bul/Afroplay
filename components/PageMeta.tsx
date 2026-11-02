import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  /** Absolute, self-referencing URL on https://afroplay.org. Omit only on the 404 page. */
  canonical?: string;
  /** Set on pages that must not be indexed (the 404 page). */
  noindex?: boolean;
  /** Absolute URL to a 1200×630 PNG/JPG OG image (X, Facebook and LinkedIn
   *  don't render SVG). Defaults to /og/default.png. */
  ogImage?: string;
  ogImageAlt?: string;
  /** Pixel size of ogImage; defaults to the 1200×630 default card. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: 'website' | 'article' | 'video.other';
}

export const DEFAULT_OG_IMAGE = 'https://afroplay.org/og/default.png';
export const DEFAULT_OG_IMAGE_ALT =
  'Onchain Africa by AfroPlay: live interviews with African Web3 founders and builders';

/**
 * Per-page <head> metadata. Rendered via react-helmet-async — Googlebot and
 * other JS-executing crawlers pick up these tags after page render.
 * Static fallbacks (title, description) should also live in index.html.
 */
const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = 'website',
  noindex = false,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}

    {/* Open Graph */}
    <meta property="og:site_name" content="AfroPlay" />
    <meta property="og:type" content={ogType} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {canonical && <meta property="og:url" content={canonical} />}
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content={String(ogImageWidth)} />
    <meta property="og:image:height" content={String(ogImageHeight)} />
    <meta property="og:image:alt" content={ogImageAlt} />

    {/* Twitter / X card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@AfroPlayHQ" />
    <meta name="twitter:creator" content="@AfroPlayHQ" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />
    <meta name="twitter:image:alt" content={ogImageAlt} />

    <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
  </Helmet>
);

export default PageMeta;

/**
 * Renders a <script type="application/ld+json"> block inline, so it is part of
 * the prerendered HTML (crawlers that don't run JS see it). Rendered with
 * dangerouslySetInnerHTML because React would otherwise HTML-escape the JSON;
 * `<` is escaped as < so a value can never close the script tag early.
 */
export const JsonLd: React.FC<{ data: object }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);
