import type { MediaItem, Product } from '~/domain/types'

/**
 * Turns a YouTube / Vimeo watch URL into an embeddable one and returns null
 * for anything that is not a recognised streaming link (so the caller can
 * fall back to a raw <video> tag for mp4 files).
 */
export function toEmbedUrl(url: string): string | null {
  // youtu.be/<id>
  const short = url.match(/youtu\.be\/([\w-]+)/)
  if (short) return `https://www.youtube.com/embed/${short[1]}`

  // youtube.com/watch?v=<id>
  const watch = url.match(/youtube\.com\/watch\?v=([\w-]+)/)
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`

  // Already an embed URL
  if (/youtube\.com\/embed\//.test(url)) return url

  // vimeo.com/<id>
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  if (/player\.vimeo\.com\/video\//.test(url)) return url

  return null
}

/** True when the video should render inside an <iframe> rather than <video>. */
export function isEmbeddable(url: string): boolean {
  return toEmbedUrl(url) !== null
}

/** Best available poster for a YouTube link (used when no thumbnail is set). */
function youtubePoster(url: string): string | null {
  const embed = toEmbedUrl(url)
  const id = embed?.match(/embed\/([\w-]+)/)?.[1]
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}

/**
 * Builds the ordered preview gallery for a product:
 *   1. the video (if any) comes first,
 *   2. followed by every gallery image,
 *   3. with thumbnail_url used as an image only when nothing else exists.
 * Each item carries a `poster` so the thumbnail strip always has something
 * to show — including a frame grab for YouTube videos.
 */
export function buildMediaGallery(product: Product): MediaItem[] {
  const items: MediaItem[] = []
  const fallbackPoster = product.thumbnail_url || ''

  if (product.video_url) {
    items.push({
      kind: 'video',
      src: product.video_url,
      poster: product.thumbnail_url || youtubePoster(product.video_url) || '',
    })
  }

  for (const img of product.images ?? []) {
    items.push({ kind: 'image', src: img, poster: img })
  }

  // Ensure there is always at least the cover image to look at.
  if (items.length === 0 && fallbackPoster) {
    items.push({ kind: 'image', src: fallbackPoster, poster: fallbackPoster })
  }

  return items
}

/** Does this product have anything worth opening the preview for? */
export function hasPreview(product: Product): boolean {
  return buildMediaGallery(product).length > 0
}
