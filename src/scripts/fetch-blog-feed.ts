import type { default as Feed } from '@json-feed-types/1_1';
import { datocmsFetch } from '../lib/datocms-fetch.ts';

type BlogFeedResponse = {
  data: {
    allBlogPosts: Array<{
      title: string;
      slug: string;
      publishDate: string;
      introTitle: string;
      social: {
        description: string;
      };
    }>;
  };
};

export const fetchBlogFeed = () => {
  const baseUrl = process.env.BASE_URL;

  return datocmsFetch({
    query: `
      query BlogFeed {
        allBlogPosts(first: 10, orderBy: publishDate_DESC, filter: {published: {eq: true}}) {
          title
          slug
          publishDate
          introTitle
          social {
            description
          }
        }
      }
    `
  })
    .then(({ data }: BlogFeedResponse): Feed => ({
      version: 'https://jsonfeed.org/version/1.1',
      title: 'De Voorhoede Blog',
      favicon: new URL('/images/voorhoede-logo.svg', baseUrl).toString(),
      description: 'Find out how we approach our projects and what techniques we use.',
      language: 'en',
      feed_url: new URL('/blog/feed.json', baseUrl).toString(),
      home_page_url: baseUrl,
      items: data.allBlogPosts.map((item) => ({
        id: item.slug,
        url: new URL(`/en/blog/${item.slug}`, baseUrl).toString(),
        date_published: new Date(item.publishDate).toISOString(),
        title: item.title,
        summary: item.social.description,
        content_text: item.introTitle,
      })),
    }))
};
