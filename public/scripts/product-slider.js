export function initializeProductSliders(root = document) {
  for (const slider of root.querySelectorAll('[data-product-slider]')) {
    const tabs = Array.from(slider.querySelectorAll('[data-slide-tab]'))
    const panels = Array.from(slider.querySelectorAll('[data-slide-panel]'))

    const selectSlide = (index, moveFocus = false) => {
      tabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index
        tab.setAttribute('aria-selected', String(selected))
        tab.tabIndex = selected ? 0 : -1
        panels[tabIndex].hidden = !selected
      })
      if (moveFocus) tabs[index].focus()
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectSlide(index))
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        event.preventDefault()
        const direction = event.key === 'ArrowRight' ? 1 : -1
        selectSlide((index + direction + tabs.length) % tabs.length, true)
      })
    })
  }
}

if (typeof document !== 'undefined') initializeProductSliders()
