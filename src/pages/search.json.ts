import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const staticPages = [
    {
      title: 'Home',
      description: 'Brand Semantics overview and IBOM introduction.',
      url: '/',
      type: 'Page'
    },
    {
      title: 'Services',
      description: 'Operational brand systems and frameworks.',
      url: '/services',
      type: 'Page'
    },
    {
      title: 'IBOM™',
      description: 'Intelligent Brand Operating Model overview.',
      url: '/services/ibom',
      type: 'Page'
    },
    {
      title: 'Enterprise',
      description: 'Enterprise governance and deployment for IBOM.',
      url: '/enterprise',
      type: 'Page'
    },
    {
      title: 'Developers',
      description: 'Developer resources for MCP servers and integration.',
      url: '/developers',
      type: 'Page'
    },
    {
      title: 'MCP Servers',
      description: 'Model Context Protocol servers overview.',
      url: '/developers/mcp-servers',
      type: 'Page'
    },
    {
      title: 'Quickstart',
      description: 'Get started with IBOM integration.',
      url: '/developers/quickstart',
      type: 'Page'
    },
    {
      title: 'Use Cases',
      description: 'Real-world examples of IBOM™ in action.',
      url: '/use-cases',
      type: 'Page'
    },
    {
      title: 'Opinions',
      description: 'Opinionated perspectives on operating brand as policy-aware systems.',
      url: '/blog',
      type: 'Page'
    },
    {
      title: 'Resources',
      description: 'Guides, checklists, and templates.',
      url: '/resources',
      type: 'Page'
    },
    {
      title: 'Company',
      description: 'About Brand Semantics.',
      url: '/company/about',
      type: 'Page'
    },
    {
      title: 'Contact',
      description: 'Get in touch with Brand Semantics.',
      url: '/company/contact',
      type: 'Page'
    },
    {
      title: 'Security',
      description: 'Security and governance standards.',
      url: '/company/security',
      type: 'Page'
    }
  ];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const blog = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    url: `/blog/${post.slug}`,
    type: 'Blog'
  }));

  const caseStudies = await getCollection('caseStudies', ({ data }) => !data.draft);
  const studies = caseStudies.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    url: `/use-cases/${post.slug}`,
    type: 'Use Case'
  }));

  const resources = await getCollection('resources', ({ data }) => !data.draft);
  const resourceItems = resources.map((res) => ({
    title: res.data.title,
    description: res.data.description,
    tags: res.data.tags,
    url: `/resources/${res.slug}`,
    type: 'Resource'
  }));

  return new Response(JSON.stringify([...staticPages, ...blog, ...studies, ...resourceItems]), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
