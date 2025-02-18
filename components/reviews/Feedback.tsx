'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

const Feedback = ({ feedback }: { feedback: string }) => {
  const [showBrief, setShowBrief] = useState(true)
  const isShortText = feedback.length <= 130

  return (
    <p className="text-xs mt-4">
      {showBrief ? feedback.slice(0, 130) : feedback}
      {!isShortText && (
        <Button
          variant={'link'}
          className="p-0 h-0 capitalize text-muted-foreground text-xs"
          onClick={() => setShowBrief(!showBrief)}
        >
          {showBrief ? 'read more' : 'show less'}
        </Button>
      )}
    </p>
  )
}
export default Feedback
