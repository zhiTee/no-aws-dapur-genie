"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const languages = {
  en: "EN",
  ms: "BM", 
  zh: "中文"
}

export default function LanguageToggle() {
  const [language, setLanguage] = useState<keyof typeof languages>("en")
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-black/10 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {languages[language]}
        <ChevronDown className="h-3 w-3" />
      </button>
      {showDropdown && (
        <div className="absolute top-10 right-0 bg-white border border-black/10 rounded-lg shadow-lg z-10 min-w-[80px]">
          {Object.entries(languages).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setLanguage(key as keyof typeof languages)
                setShowDropdown(false)
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}