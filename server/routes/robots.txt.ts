/**
 * robots.txt generated from the configured site URL so the sitemap link is
 * always correct across environments.
 */
export default defineEventHandler((event) => {
  const siteUrl = (useRuntimeConfig().public.siteUrl as string).replace(/\/$/, '')
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
})
