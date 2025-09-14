import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In production, this would query your database
    const farmers = [
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
      {
        id: "2",
        name: "सुरेश पटेल",
        phone: "+91 98765 43211",
        location: "Indore, MP",
        crops: ["Cotton", "Soybean"],
        joinedDate: "2024-01-10",
        status: "active",
        totalBookings: 8,
      },
    ]

    return NextResponse.json(farmers)
  } catch (error) {
    console.error("Error fetching farmers:", error)
    return NextResponse.json({ error: "Failed to fetch farmers" }, { status: 500 })
  }
}
