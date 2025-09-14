"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  AlertTriangle,
  Phone,
  MapPin,
  Camera,
  MessageSquare,
  CheckCircle,
  Languages,
  Shield,
  Users,
  Zap,
  Navigation,
  Send,
} from "lucide-react"

interface EmergencySOSViewProps {
  language: "en" | "hi"
  onBack: () => void
  onLanguageChange: (lang: "en" | "hi") => void
}

export function EmergencySOSView({ language, onBack, onLanguageChange }: EmergencySOSViewProps) {
  const [sosStep, setSosStep] = useState<"main" | "active" | "details" | "success">("main")
  const [emergencyType, setEmergencyType] = useState("")
  const [description, setDescription] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [location, setLocation] = useState("Getting location...")
  const [locationShared, setLocationShared] = useState(false)
  const [locationError, setLocationError] = useState("")
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  const text = {
    en: {
      title: "Emergency SOS",
      subtitle: "24/7 emergency assistance",
      emergencySOS: "EMERGENCY SOS",
      tapForHelp: "Tap for immediate help",
      emergencyActive: "Emergency Alert Active",
      helpOnWay: "Help is on the way",
      emergencyType: "Emergency Type",
      description: "Description (Optional)",
      emergencyContact: "Emergency Contact",
      contactName: "Contact Name",
      contactPhone: "Contact Phone",
      currentLocation: "Current Location",
      shareLocation: "Share Location",
      takePhoto: "Take Photo",
      sendSMS: "Send SMS Alert",
      callSupport: "Call Support",
      cancelSOS: "Cancel SOS",
      confirmSOS: "Confirm SOS",
      sosActivated: "SOS Activated!",
      alertSent: "Alert sent successfully",
      supportTeam: "Support Team",
      policeStation: "Police Station",
      hospital: "Hospital",
      fireStation: "Fire Station",
      roadAccident: "Road Accident",
      medicalEmergency: "Medical Emergency",
      vehicleBreakdown: "Vehicle Breakdown",
      theft: "Theft/Robbery",
      naturalDisaster: "Natural Disaster",
      other: "Other",
      locationShared: "Location shared with emergency contacts",
      photoTaken: "Photo attached to alert",
      smsAlertSent: "SMS alert sent to contacts",
      supportCalled: "Support team notified",
      estimatedArrival: "Estimated arrival",
      minutes: "minutes",
      sosId: "SOS ID",
      backToMain: "Back to Main",
      quickActions: "Quick Actions",
      emergencyContacts: "Emergency Contacts",
      addContact: "Add Contact",
      editContact: "Edit Contact",
      testSOS: "Test SOS (Safe)",
      sosHistory: "SOS History",
      settings: "Settings",
      autoLocation: "Auto-share location",
      autoSMS: "Auto-send SMS",
      autoCall: "Auto-call support",
      lowBandwidthMode: "Low bandwidth mode",
    },
    hi: {
      title: "आपातकालीन SOS",
      subtitle: "24/7 आपातकालीन सहायता",
      emergencySOS: "आपातकालीन SOS",
      tapForHelp: "तत्काल सहायता के लिए टैप करें",
      emergencyActive: "आपातकालीन अलर्ट सक्रिय",
      helpOnWay: "सहायता आ रही है",
      emergencyType: "आपातकाल का प्रकार",
      description: "विवरण (वैकल्पिक)",
      emergencyContact: "आपातकालीन संपर्क",
      contactName: "संपर्क नाम",
      contactPhone: "संपर्क फोन",
      currentLocation: "वर्तमान स्थान",
      shareLocation: "स्थान साझा करें",
      takePhoto: "फोटो लें",
      sendSMS: "SMS अलर्ट भेजें",
      callSupport: "सपोर्ट को कॉल करें",
      cancelSOS: "SOS रद्द करें",
      confirmSOS: "SOS पुष्टि करें",
      sosActivated: "SOS सक्रिय!",
      alertSent: "अलर्ट सफलतापूर्वक भेजा गया",
      supportTeam: "सपोर्ट टीम",
      policeStation: "पुलिस स्टेशन",
      hospital: "अस्पताल",
      fireStation: "फायर स्टेशन",
      roadAccident: "सड़क दुर्घटना",
      medicalEmergency: "चिकित्सा आपातकाल",
      vehicleBreakdown: "वाहन खराबी",
      theft: "चोरी/डकैती",
      naturalDisaster: "प्राकृतिक आपदा",
      other: "अन्य",
      locationShared: "आपातकालीन संपर्कों के साथ स्थान साझा किया गया",
      photoTaken: "अलर्ट के साथ फोटो संलग्न",
      smsAlertSent: "संपर्कों को SMS अलर्ट भेजा गया",
      supportCalled: "सपोर्ट टीम को सूचित किया गया",
      estimatedArrival: "अनुमानित आगमन",
      minutes: "मिनट",
      sosId: "SOS ID",
      backToMain: "मुख्य पर वापस",
      quickActions: "त्वरित कार्य",
      emergencyContacts: "आपातकालीन संपर्क",
      addContact: "संपर्क जोड़ें",
      editContact: "संपर्क संपादित करें",
      testSOS: "SOS परीक्षण (सुरक्षित)",
      sosHistory: "SOS इतिहास",
      settings: "सेटिंग्स",
      autoLocation: "स्वचालित स्थान साझाकरण",
      autoSMS: "स्वचालित SMS",
      autoCall: "स्वचालित सपोर्ट कॉल",
      lowBandwidthMode: "कम बैंडविड्थ मोड",
    },
  }

  const currentText = text[language]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("Village Kaithal, Haryana, India (28.4089°N, 76.3869°E)")
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      setLocation("Location not available")
      return
    }

    setLocation("Getting location...")
    setLocationError("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoordinates({ lat: latitude, lng: longitude })

        reverseGeocode(latitude, longitude)
      },
      (error) => {
        console.error("Geolocation error:", error)
        let errorMessage = "Unable to get location"

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }

        setLocationError(errorMessage)
        setLocation("Location not available")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      )

      if (response.ok) {
        const data = await response.json()
        const address = data.display_name || `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`
        setLocation(address)
      } else {
        setLocation(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`)
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error)
      setLocation(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`)
    }
  }

  const handleSOSActivation = () => {
    setSosStep("active")
    setCountdown(5) // 5 second countdown
  }

  const handleSOSCancel = () => {
    setSosStep("main")
    setCountdown(0)
  }

  const handleSOSConfirm = () => {
    setCountdown(0)
    setSosStep("success")
  }

  const handleSOSDetails = () => {
    setSosStep("details")
  }

  const handleShareLocation = async () => {
    if (!coordinates) {
      getCurrentLocation()
      return
    }

    try {
      setLocationShared(true)

      if (navigator.share) {
        await navigator.share({
          title: "My Current Location - Emergency",
          text: `I need help! My location: ${location}`,
          url: `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}`,
        })
      } else {
        const locationText = `Emergency Location: ${location}\nCoordinates: ${coordinates.lat}, ${coordinates.lng}\nGoogle Maps: https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}`

        if (navigator.clipboard) {
          await navigator.clipboard.writeText(locationText)
          alert("Location copied to clipboard!")
        } else {
          const textArea = document.createElement("textarea")
          textArea.value = locationText
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          alert("Location copied to clipboard!")
        }
      }
    } catch (error) {
      console.error("Error sharing location:", error)
      alert("Unable to share location. Please try again.")
    }
  }

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported")
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoordinates({ lat: latitude, lng: longitude })
        reverseGeocode(latitude, longitude)
      },
      (error) => {
        console.error("Location tracking error:", error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000, // 1 minute
      },
    )

    return watchId
  }

  const emergencyContacts = [
    { name: "Rajesh Kumar (Brother)", phone: "+91-9876543210", relation: "Family" },
    { name: "Village Sarpanch", phone: "+91-9876543211", relation: "Community" },
    { name: "Dr. Sharma", phone: "+91-9876543212", relation: "Medical" },
  ]

  if (sosStep === "success") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-destructive text-destructive-foreground p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSosStep("main")}
                className="text-destructive-foreground hover:bg-destructive-foreground/20 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{currentText.sosActivated}</h1>
                <p className="text-sm opacity-90">{currentText.alertSent}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">{currentText.sosActivated}</h2>
              <p className="text-green-700 mb-4">{currentText.helpOnWay}</p>
              <Badge className="bg-green-100 text-green-800">
                {currentText.sosId}: #SOS{Date.now().toString().slice(-6)}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Alert Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">{currentText.locationShared}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">{currentText.smsAlertSent}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800">{currentText.supportCalled}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Services Notified</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{currentText.supportTeam}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{currentText.estimatedArrival}</p>
                  <p className="font-semibold text-blue-600">15-20 {currentText.minutes}</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span className="font-medium">{currentText.policeStation}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{currentText.estimatedArrival}</p>
                  <p className="font-semibold text-red-600">10-15 {currentText.minutes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacts Notified</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={() => setSosStep("main")}>
            {currentText.backToMain}
          </Button>
        </div>
      </div>
    )
  }

  if (sosStep === "details") {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-destructive text-destructive-foreground p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSosStep("main")}
                className="text-destructive-foreground hover:bg-destructive-foreground/20 p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Emergency Details</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emergency-type">{currentText.emergencyType}</Label>
                <Select value={emergencyType} onValueChange={setEmergencyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road-accident">{currentText.roadAccident}</SelectItem>
                    <SelectItem value="medical">{currentText.medicalEmergency}</SelectItem>
                    <SelectItem value="breakdown">{currentText.vehicleBreakdown}</SelectItem>
                    <SelectItem value="theft">{currentText.theft}</SelectItem>
                    <SelectItem value="disaster">{currentText.naturalDisaster}</SelectItem>
                    <SelectItem value="other">{currentText.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">{currentText.description}</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the emergency situation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>{currentText.currentLocation}</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{currentText.emergencyContact}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-name">{currentText.contactName}</Label>
                <Input
                  id="contact-name"
                  placeholder="Enter contact name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">{currentText.contactPhone}</Label>
                <Input
                  id="contact-phone"
                  placeholder="Enter phone number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent">
              <Camera className="w-4 h-4 mr-2" />
              {currentText.takePhoto}
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Send className="w-4 h-4 mr-2" />
              {currentText.sendSMS}
            </Button>
          </div>

          <Button className="w-full bg-destructive hover:bg-destructive/90" size="lg" onClick={handleSOSConfirm}>
            <AlertTriangle className="w-5 h-5 mr-2" />
            {currentText.confirmSOS}
          </Button>
        </div>
      </div>
    )
  }

  if (sosStep === "active") {
    return (
      <div className="min-h-screen bg-destructive text-destructive-foreground">
        <header className="p-4 text-center">
          <h1 className="text-2xl font-bold">{currentText.emergencyActive}</h1>
          <p className="text-sm opacity-90">Activating in {countdown} seconds</p>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-destructive-foreground/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <AlertTriangle className="w-16 h-16" />
            </div>

            <div className="text-6xl font-bold mb-4">{countdown}</div>
            <p className="text-xl mb-8">{currentText.helpOnWay}</p>

            <div className="space-y-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
                onClick={handleSOSCancel}
              >
                {currentText.cancelSOS}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-destructive-foreground text-destructive-foreground hover:bg-destructive-foreground/20 bg-transparent"
                onClick={handleSOSDetails}
              >
                Add Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-destructive text-destructive-foreground p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-destructive-foreground hover:bg-destructive-foreground/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{currentText.title}</h1>
              <p className="text-sm opacity-90">{currentText.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(language === "en" ? "hi" : "en")}
              className="text-destructive-foreground hover:bg-destructive-foreground/20"
            >
              <Languages className="w-4 h-4 mr-1" />
              {language === "en" ? "हिं" : "EN"}
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-8 text-center">
            <div
              className="w-24 h-24 bg-destructive rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-105 transition-transform"
              onClick={handleSOSActivation}
            >
              <AlertTriangle className="w-12 h-12 text-destructive-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-destructive mb-2">{currentText.emergencySOS}</h2>
            <p className="text-muted-foreground mb-6">{currentText.tapForHelp}</p>
            <Button
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              size="lg"
              onClick={handleSOSActivation}
            >
              <Zap className="w-5 h-5 mr-2" />
              ACTIVATE SOS
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {currentText.quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-transparent">
                <Phone className="w-4 h-4 mr-2" />
                {currentText.callSupport}
              </Button>
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={handleShareLocation}
                disabled={!coordinates}
              >
                <Navigation className="w-4 h-4 mr-2" />
                {currentText.shareLocation}
              </Button>
              <Button variant="outline" className="bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                {currentText.sendSMS}
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Camera className="w-4 h-4 mr-2" />
                {currentText.takePhoto}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {currentText.emergencyContacts}
              </div>
              <Button variant="outline" size="sm">
                {currentText.addContact}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {contact.relation}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start bg-transparent">
                <Shield className="w-5 h-5 mr-3 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">{currentText.policeStation}</p>
                  <p className="text-sm text-muted-foreground">100 • Local: +91-1234567890</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <Phone className="w-5 h-5 mr-3 text-red-600" />
                <div className="text-left">
                  <p className="font-medium">{currentText.hospital}</p>
                  <p className="text-sm text-muted-foreground">108 • Local: +91-1234567891</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <AlertTriangle className="w-5 h-5 mr-3 text-orange-600" />
                <div className="text-left">
                  <p className="font-medium">{currentText.fireStation}</p>
                  <p className="text-sm text-muted-foreground">101 • Local: +91-1234567892</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {currentText.currentLocation}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Navigation className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <span className="text-sm">{location}</span>
                {locationError && <p className="text-xs text-destructive mt-1">{locationError}</p>}
                {coordinates && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={handleShareLocation}
                disabled={!coordinates}
              >
                <Navigation className="w-4 h-4 mr-2" />
                {currentText.shareLocation}
              </Button>
              <Button variant="outline" className="bg-transparent" onClick={getCurrentLocation}>
                <MapPin className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            {locationShared && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">Location shared successfully</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
