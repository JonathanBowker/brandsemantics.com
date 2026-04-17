import { SITE_URL } from '../../lib/seo/site';
import { buildDataFeed } from '../../lib/seo/feeds';

export const prerender = true;

export async function GET() {
  const feedUrl = `${SITE_URL}/feeds/index.jsonld`;

  const payload = buildDataFeed({
    feedUrl,
    name: 'Advanced Analytica Feeds',
    description: 'Schema.org DataFeeds for Use Cases, Opinions, and Resources.',
    items: [
      {
        url: `${SITE_URL}/feeds/use-cases.jsonld`,
        title: 'Use Cases Feed',
        description: 'Latest use cases from Advanced Analytica.',
        itemType: 'DataFeed'
      },
      {
        url: `${SITE_URL}/feeds/opinions.jsonld`,
        title: 'Opinions Feed',
        description: 'Latest opinions from Advanced Analytica.',
        itemType: 'DataFeed'
      },
      {
        url: `${SITE_URL}/feeds/resources.jsonld`,
        title: 'Resources Feed',
        description: 'Latest resources from Advanced Analytica.',
        itemType: 'DataFeed'
      }
    ]
  });

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8'
    }
  });
}
