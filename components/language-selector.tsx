"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Languages, Check } from "lucide-react"
import { type Language, languages } from "@/lib/i18n"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  className?: string
}

export function LanguageSelector({ currentLanguage, onLanguageChange, className }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language)
    setIsOpen(false)
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary-foreground hover:bg-primary-foreground/20"
      >
        <Languages className="w-4 h-4 mr-1" />
        {currentLang?.nativeName}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <Card className="w-64 shadow-lg">
            <CardContent className="p-2">
              <div className="space-y-1">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant="ghost"
                    className="w-full justify-between text-left h-auto p-3"
                    onClick={() => handleLanguageSelect(language.code as Language)}
                  >
                    <div>
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-sm text-muted-foreground">{language.name}</div>
                    </div>
                    {currentLanguage === language.code && <Check className="w-4 h-4 text-primary" />}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
