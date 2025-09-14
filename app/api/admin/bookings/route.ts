import { NextResponse } from "next/server"

export async function GET() {
  try {
    const bookings = [
      {
        id: "1",
        farmerName: "राम कुमार",
        type: "storage",
        facility: "Meerut Mandi Godown",
        date: "2024-01-20",
        status: "confirmed",
        amount: 15000,
      },
      {
        id: "2",
        farmerName: "सुरेश पटेल",
        type: "transport",
        facility: "Indore to Delhi Transport",
        date: "2024-01-22",
        status: "pending",
        amount: 8500,
      },
    ]

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
