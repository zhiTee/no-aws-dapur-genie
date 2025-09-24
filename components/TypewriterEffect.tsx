"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export default function TypewriterEffect({ text, speed = 30, onComplete }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Extract plain text from HTML
  const getPlainText = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const plainText = getPlainText(text)

  useEffect(() => {
    if (currentIndex < plainText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + plainText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete) {
        onComplete()
      }
    }
  }, [currentIndex, plainText, speed, onComplete, isComplete])

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
    setIsComplete(false)
  }, [text])

  return (
    <div className="prose prose-sm max-w-none">
      {isComplete ? (
        <div dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <div className="whitespace-pre-wrap">{displayedText}<span className="animate-pulse">|</span></div>
      )}
    </div>
  )
}