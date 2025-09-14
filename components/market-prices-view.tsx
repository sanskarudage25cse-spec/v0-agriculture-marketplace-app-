"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  TrendingUp,
  Search,
  MapPin,
  Clock,
  Building2,
  Users,
  Languages,
  BarChart3,
  RefreshCw,
  X,
  Phone,
  MessageCircle,
  Star,
  CheckCircle,
  ArrowUpDown,
} from "lucide-react"

interface MarketPricesViewProps {
  language: "en" | "hi"
  onBack: () => void
  onLanguageChange: (lang: "en" | "hi") => void
}

export function MarketPricesView({ language, onBack, onLanguageChange }: MarketPricesViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMandi, setSelectedMandi] = useState("all")
  const [showComparison, setShowComparison] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"price" | "distance" | "rating">("price")

  const text = {
    en: {
      title: "Market Prices",
      subtitle: "Live rates from mandis & buyers",
      search: "Search crops...",
      govtPrices: "Govt Mandi",
      buyerOffers: "Buyer Offers",
      priceHistory: "Price History",
      allMandis: "All Mandis",
      nearbyMandis: "Nearby Mandis",
      wheat: "Wheat",
      rice: "Rice",
      onion: "Onion",
      tomato: "Tomato",
      sugarcane: "Sugarcane",
      cotton: "Cotton",
      soybean: "Soybean",
      maize: "Maize",
      perQuintal: "/quintal",
      lastUpdated: "Last updated",
      minutesAgo: "min ago",
      verified: "Verified",
      govtRate: "Govt Rate",
      bestOffer: "Best Offer",
      offers: "offers",
      compare: "Compare",
      refresh: "Refresh",
      location: "Location",
      distance: "km away",
      compareSelected: "Compare Selected",
      selectToCompare: "Select crops to compare",
      priceComparison: "Price Comparison",
      contactBuyer: "Contact Buyer",
      callNow: "Call Now",
      whatsapp: "WhatsApp",
      rating: "Rating",
      sortBy: "Sort by",
      price: "Price",
      highToLow: "High to Low",
      lowToHigh: "Low to High",
      nearest: "Nearest",
      topRated: "Top Rated",
      clearAll: "Clear All",
      addToCompare: "Add to Compare",
      removeFromCompare: "Remove from Compare",
      viewDetails: "View Details",
      minOrder: "Min Order",
      paymentTerms: "Payment Terms",
      deliveryTime: "Delivery Time",
      advance: "Advance",
      onDelivery: "On Delivery",
      days: "days",
      quintals: "quintals",
    },
    hi: {
      title: "बाज़ार भाव",
      subtitle: "मंडी और खरीदारों से लाइव रेट",
      search: "फसल खोजें...",
      govtPrices: "सरकारी मंडी",
      buyerOffers: "खरीदार ऑफर",
      priceHistory: "भाव इतिहास",
      allMandis: "सभी मंडियां",
      nearbyMandis: "नजदीकी मंडियां",
      wheat: "गेहूं",
      rice: "चावल",
      onion: "प्याज",
      tomato: "टमाटर",
      sugarcane: "गन्ना",
      cotton: "कपास",
      soybean: "सोयाबीन",
      maize: "मक्का",
      perQuintal: "/क्विंटल",
      lastUpdated: "अंतिम अपडेट",
      minutesAgo: "मिनट पहले",
      verified: "सत्यापित",
      govtRate: "सरकारी दर",
      bestOffer: "सर्वोत्तम ऑफर",
      offers: "ऑफर",
      compare: "तुलना करें",
      refresh: "रिफ्रेश",
      location: "स्थान",
      distance: "किमी दूर",
      compareSelected: "चयनित की तुलना करें",
      selectToCompare: "तुलना के लिए फसल चुनें",
      priceComparison: "मूल्य तुलना",
      contactBuyer: "खरीदार से संपर्क करें",
      callNow: "अभी कॉल करें",
      whatsapp: "व्हाट्सऐप",
      rating: "रेटिंग",
      sortBy: "क्रमबद्ध करें",
      price: "मूल्य",
      highToLow: "अधिक से कम",
      lowToHigh: "कम से अधिक",
      nearest: "निकटतम",
      topRated: "टॉप रेटेड",
      clearAll: "सभी साफ़ करें",
      addToCompare: "तुलना में जोड़ें",
      removeFromCompare: "तुलना से हटाएं",
      viewDetails: "विवरण देखें",
      minOrder: "न्यूनतम ऑर्डर",
      paymentTerms: "भुगतान शर्तें",
      deliveryTime: "डिलीवरी समय",
      advance: "अग्रिम",
      onDelivery: "डिलीवरी पर",
      days: "दिन",
      quintals: "क्विंटल",
    },
  }

  const currentText = text[language]

  // Enhanced mock data with more details for comparison
  const govtPrices = [
    {
      id: "govt-wheat-1",
      crop: currentText.wheat,
      price: "₹2,150",
      priceValue: 2150,
      change: "+2.5%",
      trend: "up",
      mandi: "Kaithal Mandi",
      location: "Haryana",
      distance: "12",
      lastUpdated: "5",
      rating: 4.2,
      minOrder: "50",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "2",
    },
    {
      id: "govt-rice-1",
      crop: currentText.rice,
      price: "₹3,200",
      priceValue: 3200,
      change: "-1.2%",
      trend: "down",
      mandi: "Karnal Mandi",
      location: "Haryana",
      distance: "8",
      lastUpdated: "3",
      rating: 4.5,
      minOrder: "100",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "1",
    },
    {
      id: "govt-onion-1",
      crop: currentText.onion,
      price: "₹4,500",
      priceValue: 4500,
      change: "+5.8%",
      trend: "up",
      mandi: "Nashik Mandi",
      location: "Maharashtra",
      distance: "45",
      lastUpdated: "7",
      rating: 4.0,
      minOrder: "25",
      paymentTerms: currentText.advance,
      deliveryTime: "3",
    },
    {
      id: "govt-tomato-1",
      crop: currentText.tomato,
      price: "₹3,800",
      priceValue: 3800,
      change: "+3.2%",
      trend: "up",
      mandi: "Pune Mandi",
      location: "Maharashtra",
      distance: "52",
      lastUpdated: "4",
      rating: 3.8,
      minOrder: "30",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "2",
    },
    {
      id: "govt-sugarcane-1",
      crop: currentText.sugarcane,
      price: "₹350",
      priceValue: 350,
      change: "+1.8%",
      trend: "up",
      mandi: "Muzaffarnagar",
      location: "UP",
      distance: "28",
      lastUpdated: "6",
      rating: 4.1,
      minOrder: "200",
      paymentTerms: currentText.advance,
      deliveryTime: "1",
    },
    {
      id: "govt-cotton-1",
      crop: currentText.cotton,
      price: "₹6,200",
      priceValue: 6200,
      change: "-0.5%",
      trend: "down",
      mandi: "Guntur Mandi",
      location: "Andhra Pradesh",
      distance: "180",
      lastUpdated: "8",
      rating: 4.3,
      minOrder: "20",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "4",
    },
  ]

  // Enhanced buyer offers with more details
  const buyerOffers = [
    {
      id: "buyer-wheat-1",
      crop: currentText.wheat,
      price: "₹2,200",
      priceValue: 2200,
      change: "+4.8%",
      trend: "up",
      buyer: "AgriCorp Ltd",
      offers: "12",
      verified: true,
      location: "Panipat",
      distance: "15",
      rating: 4.6,
      phone: "+91-9876543210",
      minOrder: "100",
      paymentTerms: "50% " + currentText.advance,
      deliveryTime: "1",
    },
    {
      id: "buyer-wheat-2",
      crop: currentText.wheat,
      price: "₹2,180",
      priceValue: 2180,
      change: "+3.2%",
      trend: "up",
      buyer: "Grain Masters",
      offers: "8",
      verified: true,
      location: "Rohtak",
      distance: "25",
      rating: 4.4,
      phone: "+91-9876543211",
      minOrder: "75",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "2",
    },
    {
      id: "buyer-rice-1",
      crop: currentText.rice,
      price: "₹3,350",
      priceValue: 3350,
      change: "+3.5%",
      trend: "up",
      buyer: "Rice Mills Co",
      offers: "8",
      verified: true,
      location: "Kurukshetra",
      distance: "22",
      rating: 4.7,
      phone: "+91-9876543212",
      minOrder: "150",
      paymentTerms: "30% " + currentText.advance,
      deliveryTime: "1",
    },
    {
      id: "buyer-rice-2",
      crop: currentText.rice,
      price: "₹3,280",
      priceValue: 3280,
      change: "+1.8%",
      trend: "up",
      buyer: "Premium Rice Ltd",
      offers: "5",
      verified: false,
      location: "Ambala",
      distance: "18",
      rating: 4.2,
      phone: "+91-9876543213",
      minOrder: "200",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "3",
    },
    {
      id: "buyer-onion-1",
      crop: currentText.onion,
      price: "₹4,650",
      priceValue: 4650,
      change: "+8.2%",
      trend: "up",
      buyer: "Veggie Traders",
      offers: "15",
      verified: false,
      location: "Delhi",
      distance: "35",
      rating: 3.9,
      phone: "+91-9876543214",
      minOrder: "50",
      paymentTerms: "25% " + currentText.advance,
      deliveryTime: "2",
    },
    {
      id: "buyer-tomato-1",
      crop: currentText.tomato,
      price: "₹4,100",
      priceValue: 4100,
      change: "+10.5%",
      trend: "up",
      buyer: "Fresh Foods",
      offers: "6",
      verified: true,
      location: "Gurgaon",
      distance: "18",
      rating: 4.8,
      phone: "+91-9876543215",
      minOrder: "40",
      paymentTerms: currentText.onDelivery,
      deliveryTime: "1",
    },
  ]

  const filteredGovtPrices = govtPrices
    .filter((item) => item.crop.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.priceValue - a.priceValue
        case "distance":
          return Number.parseInt(a.distance) - Number.parseInt(b.distance)
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const filteredBuyerOffers = buyerOffers
    .filter((item) => item.crop.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.priceValue - a.priceValue
        case "distance":
          return Number.parseInt(a.distance) - Number.parseInt(b.distance)
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const handleToggleComparison = (cropId: string) => {
    setSelectedCrops((prev) => {
      if (prev.includes(cropId)) {
        return prev.filter((id) => id !== cropId)
      } else if (prev.length < 4) {
        return [...prev, cropId]
      }
      return prev
    })
  }

  const getComparisonData = () => {
    const allItems = [...govtPrices, ...buyerOffers]
    return selectedCrops.map((id) => allItems.find((item) => item.id === id)).filter(Boolean)
  }

  const handleRefreshPrices = async () => {
    try {
      const response = await fetch("/api/market-prices?refresh=true")
      const data = await response.json()
      console.log("[v0] Refreshed market prices:", data)
    } catch (error) {
      console.error("[v0] Error refreshing prices:", error)
    }
  }

  const handleContactBuyer = (buyer: string, phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`
    } else {
      console.log("[v0] Contacting buyer:", buyer)
    }
  }

  const handleWhatsAppContact = (phone: string, crop: string, price: string) => {
    const message = `Hi, I'm interested in selling ${crop} at ${price}/quintal. Please share more details.`
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const ComparisonModal = () => {
    const comparisonData = getComparisonData()

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-4 md:p-6 border-b flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">{currentText.priceComparison}</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowComparison(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-4 md:p-6">
            {comparisonData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{currentText.selectToCompare}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Crop</th>
                      <th className="text-left p-3 font-semibold">{currentText.price}</th>
                      <th className="text-left p-3 font-semibold">Source</th>
                      <th className="text-left p-3 font-semibold">{currentText.location}</th>
                      <th className="text-left p-3 font-semibold">{currentText.rating}</th>
                      <th className="text-left p-3 font-semibold">{currentText.minOrder}</th>
                      <th className="text-left p-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={item?.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{item?.crop}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{item?.price}</span>
                            <Badge
                              variant={item?.trend === "up" ? "default" : "secondary"}
                              className={
                                item?.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {item?.change}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {item?.buyer ? (
                              <>
                                <Users className="w-4 h-4" />
                                <span>{item.buyer}</span>
                                {item.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                              </>
                            ) : (
                              <>
                                <Building2 className="w-4 h-4" />
                                <span>{item?.mandi}</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {item?.location} • {item?.distance}km
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{item?.rating}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          {item?.minOrder} {currentText.quintals}
                        </td>
                        <td className="p-3">
                          {item?.phone ? (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleContactBuyer(item.buyer!, item.phone)}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleWhatsAppContact(item.phone!, item.crop, item.price)}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline">
                              {currentText.viewDetails}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

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
              className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg md:text-xl font-bold">{currentText.title}</h1>
              <p className="text-xs md:text-sm opacity-90">{currentText.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(language === "en" ? "hi" : "en")}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Languages className="w-4 h-4 mr-1" />
              {language === "en" ? "हिं" : "EN"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={handleRefreshPrices}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={currentText.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base md:text-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <Button
                variant={selectedMandi === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMandi("all")}
                className="whitespace-nowrap"
              >
                {currentText.allMandis}
              </Button>
              <Button
                variant={selectedMandi === "nearby" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMandi("nearby")}
                className="whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 mr-1" />
                {currentText.nearbyMandis}
              </Button>
            </div>

            <div className="flex gap-2 items-center w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "price" | "distance" | "rating")}
                className="px-3 py-2 border rounded-md text-sm bg-background"
              >
                <option value="price">{currentText.highToLow}</option>
                <option value="distance">{currentText.nearest}</option>
                <option value="rating">{currentText.topRated}</option>
              </select>

              {selectedCrops.length > 0 && (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowComparison(true)}
                    className="whitespace-nowrap"
                  >
                    <ArrowUpDown className="w-4 h-4 mr-1" />
                    {currentText.compareSelected} ({selectedCrops.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCrops([])}
                    className="whitespace-nowrap"
                  >
                    {currentText.clearAll}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Comparison Tabs */}
        <Tabs defaultValue="govt" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="govt" className="text-xs md:text-sm">
              <Building2 className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">{currentText.govtPrices}</span>
              <span className="md:hidden">Govt</span>
            </TabsTrigger>
            <TabsTrigger value="buyers" className="text-xs md:text-sm">
              <Users className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">{currentText.buyerOffers}</span>
              <span className="md:hidden">Buyers</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs md:text-sm">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">{currentText.priceHistory}</span>
              <span className="md:hidden">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="govt" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredGovtPrices.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCrops.includes(item.id)}
                          onChange={() => handleToggleComparison(item.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <h3 className="font-semibold text-base md:text-lg text-card-foreground">{item.crop}</h3>
                          <p className="text-2xl md:text-3xl font-bold text-primary">{item.price}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{currentText.perQuintal}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={item.trend === "up" ? "default" : "secondary"}
                          className={item.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {item.change}
                        </Badge>
                        <div className="mt-2 flex items-center gap-2">
                          <TrendingUp
                            className={`w-5 h-5 ${item.trend === "up" ? "text-green-600" : "text-red-600 rotate-180"}`}
                          />
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{item.mandi}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {item.lastUpdated} {currentText.minutesAgo}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {item.location} • {item.distance} {currentText.distance}
                          </span>
                        </div>
                        <span>
                          {currentText.minOrder}: {item.minOrder} {currentText.quintals}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>
                          {currentText.paymentTerms}: {item.paymentTerms}
                        </span>
                        <span>
                          {currentText.deliveryTime}: {item.deliveryTime} {currentText.days}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleToggleComparison(item.id)}>
                        {selectedCrops.includes(item.id) ? currentText.removeFromCompare : currentText.addToCompare}
                      </Button>
                      <Button size="sm" variant="secondary">
                        {currentText.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="buyers" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredBuyerOffers.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCrops.includes(item.id)}
                          onChange={() => handleToggleComparison(item.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <h3 className="font-semibold text-base md:text-lg text-card-foreground">{item.crop}</h3>
                          <p className="text-2xl md:text-3xl font-bold text-secondary">{item.price}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{currentText.perQuintal}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={item.trend === "up" ? "default" : "secondary"}
                          className={item.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {item.change}
                        </Badge>
                        <div className="mt-2 flex items-center gap-2">
                          <TrendingUp
                            className={`w-5 h-5 ${item.trend === "up" ? "text-green-600" : "text-red-600 rotate-180"}`}
                          />
                          {item.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{item.buyer}</span>
                          {item.verified && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              {currentText.verified}
                            </Badge>
                          )}
                        </div>
                        <div className="text-primary font-medium">
                          {item.offers} {currentText.offers}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {item.location} • {item.distance} {currentText.distance}
                          </span>
                        </div>
                        <span>
                          {currentText.minOrder}: {item.minOrder} {currentText.quintals}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>
                          {currentText.paymentTerms}: {item.paymentTerms}
                        </span>
                        <span>
                          {currentText.deliveryTime}: {item.deliveryTime} {currentText.days}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleComparison(item.id)}
                        className="text-xs"
                      >
                        {selectedCrops.includes(item.id) ? "Remove" : "Compare"}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs"
                        onClick={() => handleContactBuyer(item.buyer, item.phone)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                        onClick={() => handleWhatsAppContact(item.phone, item.crop, item.price)}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {currentText.priceHistory}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Price history charts will be displayed here</p>
                  <p className="text-sm mt-2">Select a crop to view 7-day and 30-day trends</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {showComparison && <ComparisonModal />}
    </div>
  )
}
