import { useEffect, useRef } from 'react'
import { ElementRectObserver } from './ElementRectObserver'

export const useElementRectObserver = (
  element: Element | HTMLElement | HTMLDivElement,
  callback: (rect: DOMRect) => void,
  container?: HTMLElement | Window | Document
) => {
  const lastElement = useRef<Element | HTMLElement | HTMLDivElement>()
  useEffect(() => {
    const resizeObserver = new ElementRectObserver((rect) => {
      if (typeof callback === 'function') callback(rect)
    }, container)
    if (element) {
      if (lastElement.current && element !== lastElement.current) {
        resizeObserver.unobserve(lastElement.current)
      }
      resizeObserver.observe(element)
      lastElement.current = element
    }
    return () => {
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  }, [element])
}

export default useElementRectObserver
