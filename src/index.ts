import { useEffect, useCallback } from 'react'
import { ElementRectObserver } from './ElementRectObserver'

export const useElementRectObserver = (
  element: Element | HTMLElement | HTMLDivElement,
  callback: (rect: DOMRect) => void,
  contentWindow?: Window
) => {
  const observer = useCallback(callback, [])
  useEffect(() => {
    const resizeObserver = new ElementRectObserver((rect) => {
      observer(rect)
    }, contentWindow)
    if (element) {
      resizeObserver.observe(element)
    }
    return () => {
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  }, [element])
}

export default useElementRectObserver