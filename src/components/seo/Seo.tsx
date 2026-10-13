import React from 'react';

const siteName = 'Manvvi Design Studio, Mumbai';
const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://manvvidesignstudio.in').replace(/\/$/, '');

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const toAbsoluteUrl = (value: string): string => {
  if (/^https?:\/\//i.test(value) || !siteUrl) return value;
  return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image,
  type = 'website',
  noIndex = false,
}) => {
  const canonicalUrl = path ? toAbsoluteUrl(path) : undefined;
  const imageUrl = image ? toAbsoluteUrl(image) : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </>
  );
};
