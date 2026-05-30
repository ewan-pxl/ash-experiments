import { onMounted, onUnmounted } from 'vue'

// Arrow / Space / PageUp-PageDown navigation between `.slide` sections.
// Used by every deck in the project.
export function useDeckNav() {
  let onKeydown = null

  onMounted(() => {
    const slides = [...document.querySelectorAll('.slide')]
    const current = () => {
      const mid = window.scrollY + window.innerHeight / 2
      let best = 0,
        bd = Infinity
      slides.forEach((s, i) => {
        const c = s.offsetTop + s.offsetHeight / 2
        const d = Math.abs(c - mid)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      return best
    }
    onKeydown = (e) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        const n = Math.min(current() + 1, slides.length - 1)
        slides[n].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        const n = Math.max(current() - 1, 0)
        slides[n].scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    if (onKeydown) removeEventListener('keydown', onKeydown)
  })
}
