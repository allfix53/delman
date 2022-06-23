import { MutableRefObject, useLayoutEffect, useState } from 'react'

const overflowDetector = (ref) => {
  const [isOverflow, setIsOverflow] = useState(false)
  const { current } = ref

  useLayoutEffect(() => {
    if (current) setIsOverflow(current.scrollWidth > current.clientWidth)
  }, [current])

  return isOverflow
}

export default overflowDetector
