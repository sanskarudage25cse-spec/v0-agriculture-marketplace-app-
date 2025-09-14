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
  Truck,
  Search,
  MapPin,
  Star,
  CalendarIcon,
  Languages,
  RefreshCw,
  Users,
  Phone,
  CheckCircle,
  Navigation,
  Shield,
  Package,
  Route,
} from "lucide-react"

interface TransportBookingViewProps {
  language: "en" | "hi"
  onBack: () => void
  onLanguageChange: (lang: "en" | "hi") => void
}

export function TransportBookingView({ language, onBack, onLanguageChange }: TransportBookingViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedQuantity, setSelectedQuantity] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [bookingStep, setBookingStep] = useState<"browse" | "details" | "confirm" | "tracking">("browse")
  const [selectedTransport, setSelectedTransport] = useState<any>(null)

  const text = {
    en: {
      title: "Transport Booking",
      subtitle: "Book transport for your crops",
      search: "Search transporters...",
      singleLoad: "Single Load",
      sharedLoad: "Shared Load",
      allTransport: "All Transport",
      nearbyTransport: "Nearby Transport",
      available: "Available",
      capacity: "Capacity",
      rate: "Rate",
      perKm: "/km",
      perQuintal: "/quintal",
      distance: "km away",
      rating: "Rating",
      features: "Features",
      bookNow: "Book Now",
      selectDate: "Select Date",
      quantity: "Quantity (quintals)",
      cropType: "Crop Type",
      pickupLocation: "Pickup Location",
      dropLocation: "Drop Location",
      bookingDetails: "Booking Details",
      confirmBooking: "Confirm Booking",
      totalCost: "Total Cost",
      estimatedTime: "Estimated Time",
      payNow: "Pay Now",
      backToBrowse: "Back to Browse",
      wheat: "Wheat",
      rice: "Rice",
      onion: "Onion",
      tomato: "Tomato",
      liveTracking: "Live Tracking",
      insurance: "Insurance",
      loading: "Loading/Unloading",
      gpsTracking: "GPS Tracking",
      bookingSuccess: "Transport Booked!",
      bookingId: "Booking ID",
      contactDriver: "Contact Driver",
      trackVehicle: "Track Vehicle",
      driverName: "Driver",
      vehicleNumber: "Vehicle No",
      estimatedArrival: "ETA",
      currentLocation: "Current Location",
      loadSharing: "Load Sharing Available",
      shareWith: "Share with other farmers",
      costSaving: "Save up to 40%",
      hours: "hours",
      minutes: "min",
    },
    hi: {
      title: "परिवहन बुकिंग",
      subtitle: "अपनी फसल के लिए परिवहन बुक करें",
      search: "ट्रांसपोर्टर खोजें...",
      singleLoad: "एकल लोड",
      sharedLoad: "साझा लोड",
      allTransport: "सभी परिवहन",
      nearbyTransport: "नजदीकी परिवहन",
      available: "उपलब्ध",
      capacity: "क्षमता",
      rate: "दर",
      perKm: "/किमी",
      perQuintal: "/क्विंटल",
      distance: "किमी दूर",
      rating: "रेटिंग",
      features: "सुविधाएं",
      bookNow: "अभी बुक करें",
      selectDate: "तारीख चुनें",
      quantity: "मात्रा (क्विंटल)",
      cropType: "फसल का प्रकार",
      pickupLocation: "पिकअप स्थान",
      dropLocation: "ड्रॉप स्थान",
      bookingDetails: "बुकिंग विवरण",
      confirmBooking: "बुकिंग पुष्टि करें",
      totalCost: "कुल लागत",
      estimatedTime: "अनुमानित समय",
      payNow: "अभी भुगतान करें",
      backToBrowse: "ब्राउज़ पर वापस",
      wheat: "गेहूं",
      rice: "चावल",
      onion: "प्याज",
      tomato: "टमाटर",
      liveTracking: "लाइव ट्रैकिंग",
      insurance: "बीमा",
      loading: "लोडिंग/अनलोडिंग",
      gpsTracking: "GPS ट्रैकिंग",
      bookingSuccess: "परिवहन बुक हो गया!",
      bookingId: "बुकिंग आईडी",
      contactDriver: "ड्राइवर से संपर्क करें",
      trackVehicle: "वाहन ट्रैक करें",
      driverName: "ड्राइवर",
      vehicleNumber: "वाहन नंबर",
      estimatedArrival: "पहुंचने का समय",
      currentLocation: "वर्तमान स्थान",
      loadSharing: "लोड शेयरिंग उपलब्ध",
      shareWith: "अन्य किसानों के साथ साझा करें",
      costSaving: "40% तक बचत करें",
      hours: "घंटे",
      minutes: "मिनट",
    },
  }

  const currentText = text[language]

  // Mock transport data
  const transportData = [
    {
      id: 1,
      name: "Haryana Transport Co.",
      type: "single",
      location: "Kaithal, Haryana",
      distance: "8",
      capacity: "10",
      available: "8",
      rate: "₹15",
      rateType: "perKm",
      rating: 4.6,
      features: ["liveTracking", "insurance", "loading", "gpsTracking"],
      phone: "+91-9876543210",
      driver: "Rajesh Kumar",
      vehicleNumber: "HR-05-AB-1234",
      verified: true,
      estimatedTime: "3-4",
    },
    {
      id: 2,
      name: "Punjab Logistics",
      type: "shared",
      location: "Panipat, Haryana",
      distance: "15",
      capacity: "15",
      available: "6",
      rate: "₹8",
      rateType: "perKm",
      rating: 4.4,
      features: ["liveTracking", "loading", "gpsTracking"],
      phone: "+91-9876543211",
      driver: "Sukhdev Singh",
      vehicleNumber: "PB-03-CD-5678",
      verified: true,
      estimatedTime: "4-5",
      loadSharing: true,
      costSaving: "35%",
    },
    {
      id: 3,
      name: "Express Cargo",
      type: "single",
      location: "Kurukshetra, Haryana",
      distance: "22",
      capacity: "12",
      available: "12",
      rate: "₹18",
      rateType: "perKm",
      rating: 4.8,
      features: ["liveTracking", "insurance", "loading", "gpsTracking"],
      phone: "+91-9876543212",
      driver: "Amit Sharma",
      vehicleNumber: "HR-01-EF-9012",
      verified: true,
      estimatedTime: "2-3",
    },
    {
      id: 4,
      name: "Kisan Transport",
      type: "shared",
      location: "Sonipat, Haryana",
      distance: "25",
      capacity: "20",
      available: "8",
      rate: "₹12",
      rateType: "perKm",
      rating: 4.2,
      features: ["loading", "gpsTracking"],
      phone: "+91-9876543213",
      driver: "Mohan Lal",
      vehicleNumber: "HR-02-GH-3456",
      verified: false,
      estimatedTime: "5-6",
      loadSharing: true,
      costSaving: "40%",
    },
  ]

  const filteredTransport = transportData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "liveTracking":
        return <Navigation className="w-4 h-4" />
      case "insurance":
        return <Shield className="w-4 h-4" />
      case "loading":
        return <Package className="w-4 h-4" />
      case "gpsTracking":
        return <Route className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getFeatureText = (feature: string) => {
    const featureMap = {
      liveTracking: currentText.liveTracking,
      insurance: currentText.insurance,
      loading: currentText.loading,
      gpsTracking: currentText.gpsTracking,
    }
    return featureMap[feature as keyof typeof featureMap] || feature
  }

  const handleBookTransport = (transport: any) => {
    setSelectedTransport(transport)
    setBookingStep("details")
  }

  const handleConfirmBooking = () => {
    setBookingStep("confirm")
  }

  const handleStartTracking = () => {
    setBookingStep("tracking")
  }

  const handleContactDriver = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handlePayment = async (amount: number, bookingId: string) => {
    try {
      const response = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, bookingId, type: "transport" }),
      })
      const data = await response.json()
      console.log("[v0] Payment initiated:", data)
    } catch (error) {
      console.error("[v0] Payment error:", error)
    }
  }

  const handleRefreshTransport = async () => {
    try {
      const response = await fetch("/api/transport/services?refresh=true")
      const data = await response.json()
      console.log("[v0] Refreshed transport services:", data)
    } catch (error) {
      console.error("[v0] Error refreshing transport:", error)
    }
  }

  const handleLiveTracking = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/transport/track/${bookingId}`)
      const data = await response.json()
      console.log("[v0] Live tracking data:", data)
    } catch (error) {
      console.error("[v0] Tracking error:", error)
    }
  }

  const calculateTotalCost = () => {
    if (!selectedTransport || !selectedQuantity) return 0
    const rate = Number.parseInt(selectedTransport.rate.replace("₹", ""))
    const quantity = Number.parseInt(selectedQuantity)
    const estimatedDistance = 50 // Mock distance
    return rate * estimatedDistance
  }

  if (bookingStep === "tracking") {
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
                <h1 className="text-lg md:text-xl font-bold">{currentText.trackVehicle}</h1>
                <p className="text-xs md:text-sm opacity-90">#{Date.now().toString().slice(-6)}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
          {/* Live Tracking Map Placeholder */}
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="bg-muted rounded-lg h-48 md:h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Navigation className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <p className="text-muted-foreground">Live tracking map will be displayed here</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.currentLocation}</p>
                  <p className="font-semibold">Panipat, Haryana</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.estimatedArrival}</p>
                  <p className="font-semibold text-primary">
                    2 {currentText.hours} 30 {currentText.minutes}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Vehicle En Route</span>
                </div>
                <p className="text-sm text-green-700">Your transport is on the way to pickup location</p>
              </div>
            </CardContent>
          </Card>

          {/* Driver & Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Truck className="w-5 h-5" />
                {currentText.driverName} & {currentText.vehicleNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.driverName}</p>
                  <p className="font-semibold">{selectedTransport?.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{currentText.vehicleNumber}</p>
                  <p className="font-semibold">{selectedTransport?.vehicleNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{selectedTransport?.rating}</span>
                <span className="text-sm text-muted-foreground">• Verified Driver</span>
              </div>

              <Button className="w-full" size="lg" onClick={() => handleContactDriver(selectedTransport?.phone)}>
                <Phone className="w-5 h-5 mr-2" />
                {currentText.contactDriver}: {selectedTransport?.phone}
              </Button>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pickup:</span>
                <span className="font-medium">{pickupLocation || "Farm Location"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Drop:</span>
                <span className="font-medium">{dropLocation || "Mandi Location"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{currentText.quantity}:</span>
                <span className="font-medium">{selectedQuantity} quintals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{currentText.totalCost}:</span>
                <span className="font-medium text-primary">₹{calculateTotalCost()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
                <h1 className="text-lg md:text-xl font-bold">{currentText.confirmBooking}</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl md:text-2xl font-bold text-green-600 mb-2">{currentText.bookingSuccess}</h2>
              <p className="text-muted-foreground mb-4">
                {currentText.bookingId}: #TB{Date.now().toString().slice(-6)}
              </p>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">{selectedTransport?.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedTransport?.location}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{currentText.quantity}:</span>
                    <span className="ml-2 font-medium">{selectedQuantity} quintals</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{currentText.estimatedTime}:</span>
                    <span className="ml-2 font-medium">
                      {selectedTransport?.estimatedTime} {currentText.hours}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{currentText.totalCost}:</span>
                    <span className="ml-2 font-medium">₹{calculateTotalCost()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{currentText.driverName}:</span>
                    <span className="ml-2 font-medium">{selectedTransport?.driver}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    handleLiveTracking(`TB${Date.now()}`)
                    handleStartTracking()
                  }}
                >
                  <Navigation className="w-5 h-5 mr-2" />
                  {currentText.trackVehicle}
                </Button>
                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  size="lg"
                  onClick={() => handleContactDriver(selectedTransport?.phone)}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {currentText.contactDriver}: {selectedTransport?.phone}
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
                <h1 className="text-lg md:text-xl font-bold">{currentText.bookingDetails}</h1>
                <p className="text-xs md:text-sm opacity-90">{selectedTransport?.name}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedTransport?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="pickup">{currentText.pickupLocation}</Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup address"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="drop">{currentText.dropLocation}</Label>
                  <Input
                    id="drop"
                    placeholder="Enter drop address"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>{currentText.selectDate}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {selectedTransport?.loadSharing && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">{currentText.loadSharing}</span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">{currentText.shareWith}</p>
                  <Badge className="bg-green-100 text-green-800">
                    {currentText.costSaving}: {selectedTransport.costSaving}
                  </Badge>
                </div>
              )}

              {selectedQuantity && pickupLocation && dropLocation && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>{currentText.totalCost}:</span>
                    <span className="text-2xl font-bold text-primary">₹{calculateTotalCost()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{currentText.estimatedTime}:</span>
                    <span>
                      {selectedTransport?.estimatedTime} {currentText.hours}
                    </span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const totalAmount = calculateTotalCost()
                  handlePayment(totalAmount, `TB${Date.now()}`)
                  handleConfirmBooking()
                }}
                disabled={!selectedCrop || !selectedQuantity || !pickupLocation || !dropLocation || !selectedDate}
              >
                {currentText.payNow} - ₹{calculateTotalCost()}
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
              onClick={handleRefreshTransport}
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

        {/* Transport Type Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="text-xs md:text-sm">
              <span className="hidden md:inline">{currentText.allTransport}</span>
              <span className="md:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger value="single" className="text-xs md:text-sm">
              <Truck className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">{currentText.singleLoad}</span>
              <span className="md:hidden">Single</span>
            </TabsTrigger>
            <TabsTrigger value="shared" className="text-xs md:text-sm">
              <Users className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">{currentText.sharedLoad}</span>
              <span className="md:hidden">Shared</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredTransport.map((transport) => (
                <Card key={transport.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-base md:text-lg">{transport.name}</h3>
                          {transport.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {transport.loadSharing && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Users className="w-3 h-3 mr-1" />
                              <span className="hidden md:inline">{currentText.loadSharing}</span>
                              <span className="md:hidden">Shared</span>
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {transport.location} • {transport.distance} {currentText.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{transport.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-primary">{transport.rate}</p>
                        <p className="text-xs text-muted-foreground">{currentText.perKm}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                      <div>
                        <span className="text-muted-foreground">{currentText.capacity}:</span>
                        <span className="ml-2 font-medium">{transport.capacity} tons</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.available}:</span>
                        <span className="ml-2 font-medium text-green-600">{transport.available} tons</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.estimatedTime}:</span>
                        <span className="ml-2 font-medium">
                          {transport.estimatedTime} {currentText.hours}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{currentText.driverName}:</span>
                        <span className="ml-2 font-medium">{transport.driver}</span>
                      </div>
                    </div>

                    {transport.loadSharing && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">{currentText.costSaving}</span>
                          <Badge className="bg-green-100 text-green-800">{transport.costSaving}</Badge>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.features}:</p>
                      <div className="flex flex-wrap gap-2">
                        {transport.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {getFeatureIcon(feature)}
                            <span className="ml-1 hidden md:inline">{getFeatureText(feature)}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleBookTransport(transport)}>
                        {currentText.bookNow}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactDriver(transport.phone)}>
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="single" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredTransport
                .filter((t) => t.type === "single")
                .map((transport) => (
                  <Card key={transport.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base md:text-lg">{transport.name}</h3>
                            {transport.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {transport.location} • {transport.distance} {currentText.distance}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{transport.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl md:text-2xl font-bold text-primary">{transport.rate}</p>
                          <p className="text-xs text-muted-foreground">{currentText.perKm}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                        <div>
                          <span className="text-muted-foreground">{currentText.capacity}:</span>
                          <span className="ml-2 font-medium">{transport.capacity} tons</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{currentText.available}:</span>
                          <span className="ml-2 font-medium text-green-600">{transport.available} tons</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{currentText.estimatedTime}:</span>
                          <span className="ml-2 font-medium">
                            {transport.estimatedTime} {currentText.hours}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{currentText.driverName}:</span>
                          <span className="ml-2 font-medium">{transport.driver}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.features}:</p>
                        <div className="flex flex-wrap gap-2">
                          {transport.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {getFeatureIcon(feature)}
                              <span className="ml-1 hidden md:inline">{getFeatureText(feature)}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => handleBookTransport(transport)}>
                          {currentText.bookNow}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleContactDriver(transport.phone)}>
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {filteredTransport
                .filter((t) => t.type === "shared")
                .map((transport) => (
                  <Card key={transport.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-base md:text-lg">{transport.name}</h3>
                            {transport.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              <Users className="w-3 h-3 mr-1" />
                              <span className="hidden md:inline">{currentText.loadSharing}</span>
                              <span className="md:hidden">Shared</span>
                            </Badge>
                          </div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {transport.location} • {transport.distance} {currentText.distance}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{transport.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl md:text-2xl font-bold text-primary">{transport.rate}</p>
                          <p className="text-xs text-muted-foreground">{currentText.perKm}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-xs md:text-sm">
                        <div>
                          <span className="text-muted-foreground">{currentText.capacity}:</span>
                          <span className="ml-2 font-medium">{transport.capacity} tons</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{currentText.available}:</span>
                          <span className="ml-2 font-medium text-green-600">{transport.available} tons</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{currentText.estimatedTime}:</span>
                          <span className="ml-2 font-medium">
                            {transport.estimatedTime} {currentText.hours}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">{currentText.driverName}:</span>
                          <span className="ml-2 font-medium">{transport.driver}</span>
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-800">{currentText.costSaving}</span>
                          <Badge className="bg-green-100 text-green-800">{transport.costSaving}</Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">{currentText.features}:</p>
                        <div className="flex flex-wrap gap-2">
                          {transport.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {getFeatureIcon(feature)}
                              <span className="ml-1 hidden md:inline">{getFeatureText(feature)}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => handleBookTransport(transport)}>
                          {currentText.bookNow}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleContactDriver(transport.phone)}>
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
