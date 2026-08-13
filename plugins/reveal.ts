/**
 * Global `v-reveal` directive: elements carrying the `.reveal` class fade and
 * slide up the first time they enter the viewport. Accepts an optional number
 * value as a transition delay in ms, useful for staggering siblings.
 * Respects prefers-reduced-motion by revealing instantly.
 */
type RevealElement = HTMLElement & { __revealCleanup?: () => void }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: RevealElement, binding) {
      const delay = typeof binding.value === 'number' ? binding.value : 0

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-revealed')
        return
      }

      if (delay) el.style.transitionDelay = `${delay}ms`

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            io.disconnect()
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -36px 0px' },
      )
      io.observe(el)

      // Free the observer when the element leaves the DOM.
      el.__revealCleanup = () => io.disconnect()
    },
    unmounted(el: RevealElement) {
      el.__revealCleanup?.()
    },
  })
})
