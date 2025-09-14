"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  ArrowLeft,
  Warehouse,
  Search,
  MapPin,
  Thermometer,
  Shield,
  Star,
  CalendarIcon,
  Languages,
  RefreshCw,
  Building2,
  Truck,
  Phone,
  CheckCircle,
} from "lucide-react"

interface StorageBookingViewProps {
  language: "en" | "hi"
  onBack: () => void
  onLanguageChange: (lang: "en" | "hi") => void
}

export function StorageBookingView({ language, onBack, onLanguageChange }: StorageBookingViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedDuration, setSelectedDuration] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("")
  const [bookingStep, setBookingStep] = useState<"browse" | "details" | "confirm">("browse")
  const [selectedStorage, setSelectedStorage] = useState<any>(null)

  const text = {
    en: {
      title: "Storage Booking",
      subtitle: "Find & book storage facilities",
      search: "Search storage facilities...",
      mandis: "Mandi Godowns",
      warehouses: "Private Warehouses",
      coldStorage: "Cold Storage",
      allStorage: "All Storage",
      nearbyStorage: "Nearby Storage",
      available: "Available",
      capacity: "Capacity",
      rate: "Rate",
      perQuintalPerDay: "/quintal/day",
      distance: "km away",
      rating: "Rating",
      amenities: "Amenities",
      bookNow: "Book Now",
      selectDate: "Select Date",
      duration: "Duration (days)",
      quantity: "Quantity (quintals)",
      cropType: "Crop Type",
      bookingDetails: "Booking Details",
      confirmBooking: "Confirm Booking",
      totalCost: "Total Cost",
      securityDeposit: "Security Deposit",
      payNow: "Pay Now",
      backToBrowse: "Back to Browse",
      wheat: "Wheat",
      rice: "Rice",
      onion: "Onion",
      tomato: "Tomato",
      dryStorage: "Dry Storage",
      coldChain: "Cold Chain",
      pestControl: "Pest Control",
      insurance: "Insurance",
      loading: "Loading/Unloading",
      security: "24/7 Security",
      bookingSuccess: "Booking Confirmed!",
      bookingId: "Booking ID",
      contactOwner: "Contact Owner",
    },
    hi: {
      title: "भंडारण बुकिंग",
      subtitle: "भंडारण सुविधाएं खोजें और बुक करें",
      search: "भंडारण सुविधाएं खोजें...",
      mandis: "मंडी गोदाम",
      warehouses: "निजी गोदाम",
      coldStorage: "कोल्ड स्टोरेज",
      allStorage: "सभी भंडारण",
      nearbyStorage: "नजदीकी भंडारण",
      available: "उपलब्ध",
      capacity: "क्षमता",
      rate: "दर",
      perQuintalPerDay: "/क्विंटल/दिन",
      distance: "किमी दूर",
      rating: "रेटिंग",
      amenities: "सुविधाएं",
      bookNow: "अभी बुक करें",
      selectDate: "तारीख चुनें",
      duration: "अवधि (दिन)",
      quantity: "मात्रा (क्विंटल)",
      cropType: "फसल का प्रकार",
      bookingDetails: "बुकिंग विवरण",
      confirmBooking: "बुकिंग पुष्टि करें",
      totalCost: "कुल लागत",
      securityDeposit: "सिक्योरिटी डिपॉजिट",
      payNow: "अभी भुगतान करें",
      backToBrowse: "ब्राउज़ पर वापस",
      wheat: "गेहूं",
      rice: "चावल",
      onion: "प्याज",
      tomato: "टमाटर",
      dryStorage: "सूखा भंडारण",
      coldChain: "कोल्ड चेन",
      pestControl: "कीट नियंत्रण",
      insurance: "बीमा",
      loading: "लोडिंग/अनलोडिंग",
      security: "24/7 सुरक्षा",
      bookingSuccess: "बुकिंग पुष्टि!",
      bookingId: "बुकिंग आईडी",
      contactOwner: "मालिक से संपर्क करें",
    },
  }

  const currentText = text[language]

  // Mock storage facilities data
  const storageData = [
    {
      id: 1,
      name: "Kaithal Mandi Godown",
      type: "mandi",
      location: "Kaithal, Haryana",
      distance: "12",
      capacity: "500",
      available: "320",
      rate: "₹8",
      rating: 4.5,
      amenities: ["dryStorage", "pestControl", "security", "loading"],
      phone: "+91-9876543210",
      verified: true,
    },
    {
      id: 2,
      name: "AgriStore Warehouse",
      type: "warehouse",
      location: "Panipat, Haryana",
      distance: "18",
      capacity: "1000",
      available: "750",
      rate: "₹12",
      rating: 4.8,
      amenities: ["dryStorage", "coldChain", "insurance", "security", "loading"],
      phone: "+91-9876543211",
      verified: true,
    },
    {
      id: 3,
      name: "FreshKeep Cold Storage",
      type: "cold",
      location: "Sonipat, Haryana",
      distance: "25",
      capacity: "300",
      available: "180",
      rate: "₹25",
      rating: 4.7,
      amenities: ["coldChain", "insurance", "security", "loading"],
      phone: "+91-9876543212",
      verified: true,
    },
    {
      id: 4,
      name: "Kurukshetra Grain Storage",
      type: "mandi",
      location: "Kurukshetra, Haryana",
      distance: "22",
      capacity: "800",
      available: "600",
      rate: "₹10",
      rating: 4.3,
      amenities: ["dryStorage", "pestControl", "security"],
      phone: "+91-9876543213",
      verified: false,
    },
  ]

  const filteredStorage = storageData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "dryStorage":
        return <Warehouse className="w-4 h-4" />
      case "coldChain":
        return <Thermometer className="w-4 h-4" />
      case "pestControl":
        return <Shield className="w-4 h-4" />
      case "insurance":
        return <Shield className="w-4 h-4" />
      case "loading":
        return <Truck className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getAmenityText = (amenity: string) => {
    const amenityMap = {
      dryStorage: currentText.dryStorage,
      coldChain: currentText.coldChain,
      pestControl: currentText.pestControl,
      insurance: currentText.insurance,
      loading: currentText.loading,
      security: currentText.security,
    }
    return amenityMap[amenity as keyof typeof amenityMap] || amenity
  }

  const handleBookStorage = (storage: any) => {
    setSelectedStorage(storage)
    setBookingStep("details")
  }

  const handleConfirmBooking = () => {
    setBookingStep("confirm")
  }

  const handleContactOwner = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handlePayment = async (amount: number, bookingId: string) => {
    try {
      const response = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, bookingId, type: "storage" }),
      })
      const data = await response.json()
      console.log("[v0] Payment initiated:", data)
    } catch (error) {
      console.error("[v0] Payment error:", error)
    }
  }

  const handleRefreshStorage = async () => {
    try {
      const response = await fetch("/api/storage/facilities?refresh=true")
      const data = await response.json()
      console.log("[v0] Refreshed storage facilities:", data)
    } catch (error) {
      console.error("[v0] Error refreshing storage:", error)
    }
  }

  const calculateTotalCost = () => {
    if (!selectedStorage || !selectedDuration || !selectedQuantity) return 0
    const rate = Number.parseInt(selectedStorage.rate.replace("₹", ""))
    const duration = Number.parseInt(selectedDuration)
    const quantity = Number.parseInt(selectedQuantity)
    return rate * duration * quantity
  }

  if (bookingStep === "confirm") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookingStep("browse")}
                className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{currentText.confirmBooking}</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4">
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">{currentText.bookingSuccess}</h2>
              <p className="text-muted-foreground mb-4">
                {currentText.bookingId}: #KB{Date.now().toString().slice(-6)}
              </p>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">{selectedStorage?.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedStorage?.location}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{currentText.quantity}:</span>
                    <span className="ml-2 font-medium">{selectedQuantity} quintals</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{currentText.duration}:</span>
                    <span className="ml-2 font-medium">{selectedDuration} days</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{currentText.totalCost}:</span>
                    <span className="ml-2 font-medium">₹{calculateTotalCost()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  <a href={`tel:${selectedStorage?.phone}`} className="flex items-center">
                    {currentText.contactOwner}: {selectedStorage?.phone}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                  onClick={() => setBookingStep("browse")}
                >
                  {currentText.backToBrowse}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (bookingStep === "details") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookingStep("browse")}
                className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{currentText.bookingDetails}</h1>
                <p className="text-sm opacity-90">{selectedStorage?.name}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedStorage?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="crop">{currentText.cropType}</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">{currentText.wheat}</SelectItem>
                      <SelectItem value="rice">{currentText.rice}</SelectItem>
                      <SelectItem value="onion">{currentText.onion}</SelectItem>
                      <SelectItem value="tomato">{currentText.tomato}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">{currentText.quantity}</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quintals"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{currentText.selectDate}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white hover:bg-gray-50 border-border"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border shadow-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="rounded-md"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="duration">{currentText.duration}</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Enter days"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  />
                </div>
              </div>

              {selectedQuantity && selectedDuration && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>{currentText.totalCost}:</span>
                    <span className="text-2xl font-bold text-primary">₹{calculateTotalCost()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{currentText.securityDeposit}:</span>
                    <span>₹{Math.round(calculateTotalCost() * 0.1)}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const totalAmount = calculateTotalCost() + Math.round(calculateTotalCost() * 0.1)
                  handlePayment(totalAmount, `SB${Date.now()}`)
                  handleConfirmBooking()
                }}
                disabled={!selectedCrop || !selectedQuantity || !selectedDuration || !selectedDate}
              >
                {currentText.payNow} - ₹{calculateTotalCost() + Math.round(calculateTotalCost() * 0.1)}
              </Button>
            </CardContent>
          </Card>
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
              onClick={handleRefreshStorage}
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
        </div>

        {/* Storage Type Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs md:text-sm">
              <span className="hidden md:inline">{currentText.allStorage}</span>
              <span className="md:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger value="mandi" className="text-xs md:text-sm">
              <Building2 className="w-3 h-3 mr-1" />
              <span className="hidden md:inline">{currentText.mandis}</span>
              <span className="md:hidden">Mandi</span>
            </TabsTrigger>
            <TabsTrigger value="warehouse" className="text-xs md:text-sm">
              <Warehouse className="w-3 h-3 mr-1" />
              <span className="hidden md:inline">{currentText.warehouses}</span>
              <span className="md:hidden">Warehouse</span>
            </TabsTrigger>
            <TabsTrigger value="cold" className="text-xs md:text-sm">
              <Thermometer className="w-3 h-3 mr-1" />
              <span className="hidden md:inline">{currentText.coldStorage}</span>
              <span className="md:hidden">Cold</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredStorage.map((storage) => (
                <Card key={storage.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base md:text-lg">{storage.name}</h3>
                          {storage.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {storage.location} • {storage.distance} {currentText.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{storage.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-primary">{storage.rate}</p>
                        <p className="text-xs text-muted-foreground">{currentText.perQuintalPerDay}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                      <div>
                        <span className="text-muted-foreground">{currentText.capacity}:</span>
                        <span className="ml-2 font-medium">{storage.capacity} quintals</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.available}:</span>
                        <span className="ml-2 font-medium text-green-600">{storage.available} quintals</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.amenities}:</p>
                      <div className="flex flex-wrap gap-2">
                        {storage.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 hidden md:inline">{getAmenityText(amenity)}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleBookStorage(storage)}>
                        {currentText.bookNow}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactOwner(storage.phone)}>
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mandi" className="space-y-4 mt-6">
            {filteredStorage
              .filter((s) => s.type === "mandi")
              .map((storage) => (
                <Card key={storage.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base md:text-lg">{storage.name}</h3>
                          {storage.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {storage.location} • {storage.distance} {currentText.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{storage.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-primary">{storage.rate}</p>
                        <p className="text-xs text-muted-foreground">{currentText.perQuintalPerDay}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                      <div>
                        <span className="text-muted-foreground">{currentText.capacity}:</span>
                        <span className="ml-2 font-medium">{storage.capacity} quintals</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.available}:</span>
                        <span className="ml-2 font-medium text-green-600">{storage.available} quintals</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.amenities}:</p>
                      <div className="flex flex-wrap gap-2">
                        {storage.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 hidden md:inline">{getAmenityText(amenity)}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleBookStorage(storage)}>
                        {currentText.bookNow}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactOwner(storage.phone)}>
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="warehouse" className="space-y-4 mt-6">
            {filteredStorage
              .filter((s) => s.type === "warehouse")
              .map((storage) => (
                <Card key={storage.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base md:text-lg">{storage.name}</h3>
                          {storage.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {storage.location} • {storage.distance} {currentText.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{storage.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-primary">{storage.rate}</p>
                        <p className="text-xs text-muted-foreground">{currentText.perQuintalPerDay}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                      <div>
                        <span className="text-muted-foreground">{currentText.capacity}:</span>
                        <span className="ml-2 font-medium">{storage.capacity} quintals</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.available}:</span>
                        <span className="ml-2 font-medium text-green-600">{storage.available} quintals</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.amenities}:</p>
                      <div className="flex flex-wrap gap-2">
                        {storage.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 hidden md:inline">{getAmenityText(amenity)}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleBookStorage(storage)}>
                        {currentText.bookNow}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactOwner(storage.phone)}>
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="cold" className="space-y-4 mt-6">
            {filteredStorage
              .filter((s) => s.type === "cold")
              .map((storage) => (
                <Card key={storage.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base md:text-lg">{storage.name}</h3>
                          {storage.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {storage.location} • {storage.distance} {currentText.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{storage.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-primary">{storage.rate}</p>
                        <p className="text-xs text-muted-foreground">{currentText.perQuintalPerDay}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                      <div>
                        <span className="text-muted-foreground">{currentText.capacity}:</span>
                        <span className="ml-2 font-medium">{storage.capacity} quintals</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.available}:</span>
                        <span className="ml-2 font-medium text-green-600">{storage.available} quintals</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.amenities}:</p>
                      <div className="flex flex-wrap gap-2">
                        {storage.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 hidden md:inline">{getAmenityText(amenity)}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleBookStorage(storage)}>
                        {currentText.bookNow}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactOwner(storage.phone)}>
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
