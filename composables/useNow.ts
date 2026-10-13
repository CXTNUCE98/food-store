/**
 * A shared "now" (ms) that ticks every second on the client — drives the
 * flash-sale countdowns and expires flash prices without a reload.
 * The server renders with its own clock; the client takes over after mount.
 */
let started = false

export function useNow() {
  const now = useState('now', () => Date.now())
  if (import.meta.client && !started) {
    started = true
    setInterval(() => (now.value = Date.now()), 1000)
  }
  return now
}

/** "02:15:09" / "1 ngày 03:00:00" until `target`. */
export function formatCountdown(target: string | number, now: number): string {
  let s = Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000))
  const d = Math.floor(s / 86_400)
  s %= 86_400
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d ? `${d} ngày ` : ''}${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
}
