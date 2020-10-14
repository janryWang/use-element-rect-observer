# use-element-rect-observer

> This is a React Hook, which is specifically used to monitor the Bounding Rect of the element in real time.

## Install

```bash
npm install use-element-rect-observer
```

## Usage

```jsx
import React,{useRef} from 'react'
import { useElementRectObserver } from 'use-element-rect-observer'

export const App = ()=>{
  const ref = useRef()
  useElementRectObserver(ref.current,(rect)=>{
    console.log(rect)
  })
  return <div ref={ref}>element</div>
}

```