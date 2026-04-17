import { BRANDO_SCHEMA_URL, IBOM, ORGANisaTION, SITE_NAME, SITE_URL } from './site';

type Breadcrumb = {
  name: string;
  url: string;
};

type ArticleMeta = {
  title: string;
  description: string;
  publishedAt: Date;
  modifiedAt?: Date;
  author?: string;
  tags?: string[];
  section?: string;
  url: string;
};

type PageMeta = {
  title: string;
  description: string;
  url: string;
  breadcrumbs: Breadcrumb[];
  isArticle?: boolean;
  article?: ArticleMeta;
};

const ensure = (condition: boolean, message: string) => {
  if (!condition) {
    throw new Error(`SEO graph error: ${message}`);
  }
};

const ensureUrl = (value: string, label: string) => {
  try {
    new URL(value);
  } catch {
    throw new Error(`SEO graph error: ${label} must be a valid absolute URL`);
  }
};

export const buildGraph = (page: PageMeta) => {
  ensure(Boolean(page.title), 'title is required');
  ensure(Boolean(page.description), 'description is required');
  ensure(Boolean(page.url), 'url is required');
  ensure(page.breadcrumbs?.length > 0, 'breadcrumbs are required');
  ensure(Boolean(BRANDO_SCHEMA_URL), 'Brando Schema URL must be set');

  ensureUrl(page.url, 'page.url');
  page.breadcrumbs.forEach((crumb, index) => {
    ensure(Boolean(crumb.name), `breadcrumb[${index}].name is required`);
    ensure(Boolean(crumb.url), `breadcrumb[${index}].url is required`);
    ensureUrl(crumb.url, `breadcrumb[${index}].url`);
  });

  const organisationId = `${SITE_URL}#organisation`;
  const websiteId = `${SITE_URL}#website`;
  const serviceId = `${IBOM.url}#service`;
  const brandoId = `${BRANDO_SCHEMA_URL}#project`;
  const pageId = `${page.url}#webpage`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organisation',
      '@id': organisationId,
      name: ORGANisaTION.name,
      url: ORGANisaTION.url,
      description: ORGANisaTION.description,
      knowsAbout: [serviceId, brandoId]
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': organisationId }
    },
    {
      '@type': 'WebPage',
      '@id': pageId,
      name: page.title,
      description: page.description,
      url: page.url,
      isPartOf: { '@id': websiteId },
      about: [{ '@id': serviceId }],
      breadcrumb: { '@id': `${page.url}#breadcrumb` }
    },
    {
      '@type': 'Service',
      '@id': serviceId,
      name: IBOM.name,
      description: IBOM.description,
      url: IBOM.url,
      provider: { '@id': organisationId },
      isBasedOn: { '@id': brandoId }
    },
    {
      '@type': 'CreativeWork',
      '@id': brandoId,
      name: 'Brando Schema',
      url: BRANDO_SCHEMA_URL,
      creator: { '@id': organisationId }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${page.url}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
  ];

  if (page.isArticle && page.article) {
    ensureUrl(page.article.url, 'article.url');
    graph.push({
      '@type': 'TechArticle',
      '@id': `${page.article.url}#article`,
      headline: page.article.title,
      description: page.article.description,
      datePublished: page.article.publishedAt.toISOString(),
      dateModified: (page.article.modifiedAt ?? page.article.publishedAt).toISOString(),
      author: {
        '@type': 'Organisation',
        name: page.article.author ?? ORGANisaTION.name,
        url: ORGANisaTION.url
      },
      publisher: { '@id': organisationId },
      mainEntityOfPage: { '@id': pageId },
      keywords: page.article.tags?.join(', '),
      articleSection: page.article.section,
      about: [{ '@id': serviceId }]
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
};

export type { PageMeta, ArticleMeta, Breadcrumb };
