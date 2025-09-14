"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Bot } from "lucide-react"
import type { Language } from "@/lib/i18n"
import { LanguageSelector } from "./language-selector"

interface AIFarmingAssistantViewProps {
  language: Language
  onBack: () => void
  onLanguageChange: (language: Language) => void
}

export function AIFarmingAssistantView({ language, onBack, onLanguageChange }: AIFarmingAssistantViewProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold">AI Farming Assistant</h1>
              <p className="text-xs md:text-sm opacity-90">Ask me anything about farming</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </header>

      <div className="h-[calc(100vh-80px)]">
        <iframe
          src="https://landbot.online/v3/H-3131038-L61TKR1JW7T6Z3EB/index.html"
          className="w-full h-full border-0"
          title="AI Farming Assistant Chatbot"
          allow="microphone; camera"
        />
      </div>
    </div>
  )
}
