import ResizeObserver from 'resize-observer-polyfill'

type RectListener = (rect: DOMRect) => void

export class ElementRectObserver {
  listener: RectListener
  container: HTMLElement | Window | Document
  target: Element
  animationFrame: number | null
  resizeObserver: any
  intersectionObserver: IntersectionObserver
  mutationObserver: MutationObserver

  constructor(
    listener: RectListener,
    container: HTMLElement | Window | Document = window
  ) {
    this.listener = listener
    this.container = container
    this.resizeObserver = new ResizeObserver(this.onChange)
    this.intersectionObserver = new IntersectionObserver(this.onChange)
    this.mutationObserver = new MutationObserver(this.onChange)
  }

  onChange = () => {
    this.listener(this.target?.getBoundingClientRect())
  }

  observe(element: Element) {
    this.target = element
    this.resizeObserver.observe(element)
    this.intersectionObserver.observe(element)
    this.mutationObserver.observe(element?.parentNode, {
      childList: true,
    })
    if (this.container?.toString()?.indexOf('Window') === -1) {
      this.resizeObserver.observe(this.container)
    } else {
      this.container.addEventListener('resize', this.onChange)
    }
    this.container.addEventListener('scroll', this.onChange)
  }

  unobserve(element: Element) {
    this.target = null
    this.resizeObserver.unobserve(element)
    this.intersectionObserver.unobserve(element)
    this.mutationObserver.disconnect()
    if (this.container?.toString()?.indexOf('Window') === -1) {
      this.resizeObserver.unobserve(this.container)
    } else {
      this.container.removeEventListener('resize', this.onChange)
    }
    this.container.removeEventListener('scroll', this.onChange)
  }
}
