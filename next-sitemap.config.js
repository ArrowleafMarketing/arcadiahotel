/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://stayarcadia.com',
  generateRobotsTxt: true,
  sitemapSize: 50000,
  autoLastmod: true,
  trailingSlash: false, // match your routing style
  exclude: [
    '/admin',
    '/api/*',
    '/private/*',
    '/drafts/*',
    '/404',
    '/500',
    '/_not-found',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/private', '/drafts'] },
    ],
  },

  // Automatically set priority and changefreq based on path
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;         // homepage = highest priority
      changefreq = 'daily';
    } else if (path.startsWith('/explore-boise')) {
      priority = 0.9;         // Explore Boise index/posts = high priority
      changefreq = 'daily';
    } else if (
      path === '/about' ||
      path === '/contact' ||
      path === '/services' ||
      path === '/process' ||
      path === '/why-us'
    ) {
      priority = 0.6;         // static info pages
      changefreq = 'monthly';
    } else if (
      path.includes('legal') ||
      path.includes('privacy') ||
      path.includes('terms')
    ) {
      priority = 0.3;         // legal pages
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};