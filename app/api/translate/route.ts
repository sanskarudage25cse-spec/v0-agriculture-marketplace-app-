import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { text, targetLanguage, sourceLanguage = "en" } = await request.json()

    // This would integrate with Google Translate API, Microsoft Translator, or similar service
    // For now, returning a mock response
    const translatedText = await translateText(text, sourceLanguage, targetLanguage)

    return NextResponse.json({
      translatedText,
      sourceLanguage,
      targetLanguage,
      confidence: 0.95,
    })
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}

async function translateText(text: string, source: string, target: string): Promise<string> {
  // Example integration with Google Translate API
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          source: source,
          target: target,
          format: "text",
        }),
      },
    )

    const data = await response.json()
    return data.data.translations[0].translatedText
  } catch (error) {
    console.error("Google Translate API error:", error)
    // Fallback to mock translation for demo
    return `[${target.toUpperCase()}] ${text}`
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action === "languages") {
    // Return supported languages
    const supportedLanguages = [
      { code: "en", name: "English", nativeName: "English" },
      { code: "hi", name: "Hindi", nativeName: "हिंदी" },
      { code: "te", name: "Telugu", nativeName: "తెలుగు" },
      { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
      { code: "bn", name: "Bengali", nativeName: "বাংলা" },
      { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
      { code: "mr", name: "Marathi", nativeName: "मराठी" },
      { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
    ]

    return NextResponse.json({ languages: supportedLanguages })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
