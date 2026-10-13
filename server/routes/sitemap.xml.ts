/**
 * Minimal sitemap. This is a single-page site today; when product detail
 * pages are added, fetch the catalogue (GET /catalog/menu) and emit a <url> for each.
 */
export default defineEventHandler((event) => {
  const siteUrl = (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '')
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = [{ loc: `${siteUrl}/`, priority: '1.0' }]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return body
})
