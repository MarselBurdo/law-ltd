import type { APIRoute } from 'astro';
import { site as content } from '../data/site';
import { withBase } from '../lib/paths';

export const GET: APIRoute = ({ site }) => {
  const canIndex = Boolean(site) && !content.isDemo;
  const body = canIndex
    ? `User-agent: *\nAllow: /\nSitemap: ${new URL(withBase('/sitemap-index.xml'), site)}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
