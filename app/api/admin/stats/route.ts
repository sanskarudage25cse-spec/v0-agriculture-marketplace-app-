import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, this would connect to your database
    const stats = {
      totalFarmers: 1247,
      activeBookings: 89,
      emergencyAlerts: 3,
      totalRevenue: 2847500,
      storageUtilization: 78,
      transportRequests: 156,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
