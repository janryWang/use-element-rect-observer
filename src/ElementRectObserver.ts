import ResizeObserver from 'resize-observer-polyfill'
import IntersectionObserver from 'intersection-observer'

type RectListener = (rect: DOMRect) => void

export class ElementRectObserver {
  listener: RectListener
  contentWindow: Window
  target: Element
  animationFrame: number | null
  resizeObserver: any
  intersectionObserver: IntersectionObserver

  constructor(listener: RectListener, contentWindow: Window = window) {
    this.listener = listener
    this.contentWindow = contentWindow
    this.resizeObserver = new ResizeObserver(this.onChange)
    this.intersectionObserver = new IntersectionObserver(
      this.onChange
    )
  }

  onChange = () => {
    this.listener(this.target?.getBoundingClientRect())
  }

  observe(element: Element) {
    this.target = element
    this.resizeObserver.observe(element)
    this.intersectionObserver.observe(element)
    this.contentWindow.addEventListener('resize', this.onChange)
    this.contentWindow.addEventListener('scroll', this.onChange)
  }

  unobserve(element: Element) {
    this.target = null
    this.resizeObserver.unobserve(element)
    this.intersectionObserver.unobserve(element)
    this.contentWindow.removeEventListener('resize', this.onChange)
    this.contentWindow.removeEventListener('scroll', this.onChange)
  }
}
