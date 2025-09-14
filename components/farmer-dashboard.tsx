"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Warehouse,
  Truck,
  AlertTriangle,
  MapPin,
  Phone,
  User,
  Menu,
  Bell,
  ArrowRight,
  Bot,
} from "lucide-react"
import { MarketPricesView } from "./market-prices-view"
import { StorageBookingView } from "./storage-booking-view"
import { TransportBookingView } from "./transport-booking-view"
import { EmergencySOSView } from "./emergency-sos-view"
import { AIFarmingAssistantView } from "./ai-farming-assistant-view"
import { LanguageSelector } from "./language-selector"
import { type Language, useTranslation } from "@/lib/i18n"

export function FarmerDashboard() {
  const [language, setLanguage] = useState<Language>("en")
  const [currentView, setCurrentView] = useState<
    "dashboard" | "market-prices" | "storage-booking" | "transport-booking" | "emergency-sos" | "ai-assistant"
  >("dashboard")

  const { t } = useTranslation(language)

  const marketPrices = [
    { crop: t("crops.wheat"), price: "₹2,150", change: "+2.5%", trend: "up" },
    { crop: t("crops.rice"), price: "₹3,200", change: "-1.2%", trend: "down" },
    { crop: t("crops.onion"), price: "₹4,500", change: "+5.8%", trend: "up" },
    { crop: t("crops.tomato"), price: "₹3,800", change: "+3.2%", trend: "up" },
  ]

  const handleMarketPricesClick = () => {
    setCurrentView("market-prices")
  }

  const handleStorageBookingClick = () => {
    setCurrentView("storage-booking")
  }

  const handleTransportBookingClick = () => {
    setCurrentView("transport-booking")
  }

  const handleEmergencySOSClick = () => {
    setCurrentView("emergency-sos")
  }

  const handleAIAssistantClick = () => {
    setCurrentView("ai-assistant")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
  }

  if (currentView === "market-prices") {
    return <MarketPricesView language={language} onBack={handleBackToDashboard} onLanguageChange={setLanguage} />
  }

  if (currentView === "storage-booking") {
    return <StorageBookingView language={language} onBack={handleBackToDashboard} onLanguageChange={setLanguage} />
  }

  if (currentView === "transport-booking") {
    return <TransportBookingView language={language} onBack={handleBackToDashboard} onLanguageChange={setLanguage} />
  }

  if (currentView === "emergency-sos") {
    return <EmergencySOSView language={language} onBack={handleBackToDashboard} onLanguageChange={setLanguage} />
  }

  if (currentView === "ai-assistant") {
    return <AIFarmingAssistantView language={language} onBack={handleBackToDashboard} onLanguageChange={setLanguage} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="gradient-bg text-primary-foreground p-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">{t("common.title")}</h1>
              <p className="text-sm md:text-base opacity-90 font-medium">{t("common.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 backdrop-blur-sm rounded-xl md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground flex items-center">
            <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
            {t("dashboard.quickActions")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <Card
              className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-md card-gradient"
              onClick={handleMarketPricesClick}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-card-foreground mb-1">
                  {t("dashboard.marketPrices")}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">Live rates</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-md card-gradient"
              onClick={handleStorageBookingClick}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Warehouse className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-card-foreground mb-1">{t("dashboard.storage")}</h3>
                <p className="text-sm text-muted-foreground font-medium">{t("dashboard.availableNow")}</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-md card-gradient"
              onClick={handleTransportBookingClick}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Truck className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-card-foreground mb-1">{t("dashboard.transport")}</h3>
                <p className="text-sm text-muted-foreground font-medium">Book now</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100"
              onClick={handleAIAssistantClick}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-blue-900 mb-1">AI Assistant</h3>
                <p className="text-sm text-blue-700 font-medium">Ask anything</p>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100"
              onClick={handleEmergencySOSClick}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-red-900 mb-1">{t("dashboard.emergency")}</h3>
                <p className="text-sm text-red-700 font-medium">24/7 help</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center">
              <div className="w-1 h-8 bg-primary rounded-full mr-3"></div>
              {t("dashboard.currentPrices")}
            </h2>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              >
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {t("dashboard.nearbyMandi")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarketPricesClick}
                className="hover:bg-primary/10 text-primary font-semibold"
              >
                <span className="hidden md:inline">{t("common.viewAll")}</span>
                <ArrowRight className="w-4 h-4 md:ml-2" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {marketPrices.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-base md:text-lg text-card-foreground mb-2">{item.crop}</h3>
                      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{item.price}</p>
                      <p className="text-sm text-muted-foreground font-medium">{t("crops.perQuintal")}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={item.trend === "up" ? "default" : "secondary"}
                        className={`${item.trend === "up" ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"} font-semibold px-3 py-1`}
                      >
                        {item.change}
                      </Badge>
                      <div className="mt-3 flex justify-end">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${item.trend === "up" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          <TrendingUp
                            className={`w-4 h-4 ${item.trend === "up" ? "text-green-600" : "text-red-600 rotate-180"}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              className="h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-secondary border-0"
              size="lg"
              onClick={handleStorageBookingClick}
            >
              <Warehouse className="w-6 h-6 mr-3" />
              {t("dashboard.bookStorage")}
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
              size="lg"
              onClick={handleTransportBookingClick}
            >
              <Truck className="w-6 h-6 mr-3 text-primary" />
              {t("dashboard.bookTransport")}
            </Button>
            <Button
              variant="outline"
              className="h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 md:col-span-2 lg:col-span-1"
              size="lg"
            >
              <User className="w-6 h-6 mr-3 text-primary" />
              {t("dashboard.viewProfile")}
            </Button>
          </div>
        </section>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 mt-12 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-red-900 flex items-center text-lg md:text-xl font-bold">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center mr-3 shadow-md">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              {t("dashboard.emergencyHelp")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white h-16 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              size="lg"
              onClick={handleEmergencySOSClick}
            >
              <Phone className="w-6 h-6 mr-3" />
              {t("dashboard.callEmergency")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
