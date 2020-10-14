import { useEffect, useCallback, useRef } from 'react'
import { ElementRectObserver } from './ElementRectObserver'

export const useElementRectObserver = (
  element: Element | HTMLElement | HTMLDivElement,
  callback: (rect: DOMRect) => void,
  contentWindow?: Window
) => {
  const observer = useCallback(callback, [])
  const lastElement = useRef<Element | HTMLElement | HTMLDivElement>()
  useEffect(() => {
    const resizeObserver = new ElementRectObserver((rect) => {
      observer(rect)
    }, contentWindow)
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
