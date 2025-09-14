"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Package, Truck, AlertTriangle, TrendingUp, MapPin, Phone } from "lucide-react"

interface AdminStats {
  totalFarmers: number
  activeBookings: number
  emergencyAlerts: number
  totalRevenue: number
  storageUtilization: number
  transportRequests: number
}

interface Farmer {
  id: string
  name: string
  phone: string
  location: string
  crops: string[]
  joinedDate: string
  status: "active" | "inactive"
  totalBookings: number
}

interface Booking {
  id: string
  farmerName: string
  type: "storage" | "transport"
  facility: string
  date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  amount: number
}

interface EmergencyAlert {
  id: string
  farmerName: string
  location: string
  type: string
  timestamp: string
  status: "active" | "resolved"
  description: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const [statsRes, farmersRes, bookingsRes, alertsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/farmers"),
        fetch("/api/admin/bookings"),
        fetch("/api/admin/emergency-alerts"),
      ])

      const statsData = await statsRes.json()
      const farmersData = await farmersRes.json()
      const bookingsData = await bookingsRes.json()
      const alertsData = await alertsRes.json()

      setStats(statsData)
      setFarmers(farmersData)
      setBookings(bookingsData)
      setEmergencyAlerts(alertsData)
    } catch (error) {
      console.error("Error fetching admin data:", error)
      // Fallback to demo data if API fails
      setStats({
        totalFarmers: 1247,
        activeBookings: 89,
        emergencyAlerts: 3,
        totalRevenue: 2847500,
        storageUtilization: 78,
        transportRequests: 156,
      })
      setFarmers([
        {
          id: "1",
          name: "राम कुमार",
          phone: "+91 98765 43210",
          location: "Meerut, UP",
          crops: ["Wheat", "Rice"],
          joinedDate: "2024-01-15",
          status: "active",
          totalBookings: 12,
        },
      ])
      setBookings([
        {
          id: "1",
          farmerName: "राम कुमार",
          type: "storage",
          facility: "Meerut Mandi Godown",
          date: "2024-01-20",
          status: "confirmed",
          amount: 15000,
        },
      ])
      setEmergencyAlerts([
        {
          id: "1",
          farmerName: "सुरेश पटेल",
          location: "Lat: 28.9845, Lng: 77.7064",
          type: "Transport Emergency",
          timestamp: "2024-01-20T10:30:00Z",
          status: "active",
          description: "Vehicle breakdown on highway",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleEmergencyResponse = async (alertId: string, action: "resolve" | "escalate") => {
    try {
      await fetch(`/api/admin/emergency-alerts/${alertId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      fetchAdminData() // Refresh data
    } catch (error) {
      console.error("Error handling emergency:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Agriculture Marketplace Management</p>
            </div>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.totalFarmers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.activeBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Emergency Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.emergencyAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats?.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Storage Usage</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.storageUtilization}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Transport Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.transportRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="farmers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="farmers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farmer Management</CardTitle>
                <CardDescription>Manage registered farmers and their profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmers.map((farmer) => (
                    <div key={farmer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{farmer.name}</h3>
                          <p className="text-sm text-gray-600">{farmer.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{farmer.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={farmer.status === "active" ? "default" : "secondary"}>{farmer.status}</Badge>
                        <p className="text-sm text-gray-600 mt-1">{farmer.totalBookings} bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>Monitor and manage storage and transport bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {booking.type === "storage" ? (
                            <Package className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Truck className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{booking.farmerName}</h3>
                          <p className="text-sm text-gray-600">{booking.facility}</p>
                          <p className="text-xs text-gray-500">{booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : booking.status === "completed"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                        <p className="text-sm font-medium mt-1">₹{booking.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Alerts</CardTitle>
                <CardDescription>Monitor and respond to farmer emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg border-red-200 bg-red-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-red-900">{alert.farmerName}</h3>
                            <p className="text-sm text-red-700">{alert.type}</p>
                            <p className="text-xs text-red-600 mt-1">{alert.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <MapPin className="h-3 w-3 text-red-500" />
                              <span className="text-xs text-red-600">{alert.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEmergencyResponse(alert.id, "resolve")}
                          >
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleEmergencyResponse(alert.id, "escalate")}
                          >
                            Escalate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Platform usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Daily Active Users</span>
                      <span className="font-medium">847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Storage Bookings (This Month)</span>
                      <span className="font-medium">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Transport Bookings (This Month)</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Emergency Alerts (This Month)</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Financial performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Revenue</span>
                      <span className="font-medium">₹4,56,780</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Storage Revenue</span>
                      <span className="font-medium">₹2,84,560</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Transport Revenue</span>
                      <span className="font-medium">₹1,72,220</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Commission Earned</span>
                      <span className="font-medium">₹45,678</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
