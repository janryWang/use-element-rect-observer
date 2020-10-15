import ResizeObserver from 'resize-observer-polyfill'

type RectListener = (rect: DOMRect) => void

export class ElementRectObserver {
  listener: RectListener
  contentWindow: Window
  target: Element
  animationFrame: number | null
  resizeObserver: any
  intersectionObserver: IntersectionObserver
  mutationObserver: MutationObserver

  constructor(listener: RectListener, contentWindow: Window = window) {
    this.listener = listener
    this.contentWindow = contentWindow
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
    this.contentWindow.addEventListener('resize', this.onChange)
    this.contentWindow.addEventListener('scroll', this.onChange)
  }

  unobserve(element: Element) {
    this.target = null
    this.resizeObserver.unobserve(element)
    this.intersectionObserver.unobserve(element)
    this.mutationObserver.disconnect()
    this.contentWindow.removeEventListener('resize', this.onChange)
    this.contentWindow.removeEventListener('scroll', this.onChange)
  }
}
