import { NextResponse } from "next/server"

export async function GET() {
  try {
    const alerts = [
      {
        id: "1",
        farmerName: "सुरेश पटेल",
        location: "Lat: 28.9845, Lng: 77.7064",
        type: "Transport Emergency",
        timestamp: "2024-01-20T10:30:00Z",
        status: "active",
        description: "Vehicle breakdown on highway",
      },
    ]

    return NextResponse.json(alerts)
  } catch (error) {
    console.error("Error fetching emergency alerts:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}
