import { connectDB } from "../../../lib/db";
import Booking from "../../../models/Booking";

export async function POST(req) {
  try {
    await connectDB();

    const { name, service, date, time, phone, notes } = await req.json();

    // ✅ Validation
    if (!name || !service || !date || !time || !phone) {
      return Response.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Allowed time slots
    const allowedTimes = [
      "09:00","10:00","11:00","12:00",
      "13:00","14:00","15:00","16:00",
      "17:00","18:00","19:00","20:00"
    ];

    if (!allowedTimes.includes(time)) {
      return Response.json(
        { error: "Invalid time slot" },
        { status: 400 }
      );
    }

    // Prevent double booking
    const exists = await Booking.findOne({ date, time });

    if (exists) {
      return Response.json(
        { error: "Time slot already booked" },
        { status: 400 }
      );
    }

    // ✅ Create booking
    const booking = await Booking.create({
      name,
      service,
      date,
      time,
      phone,
      notes,
    });

    return Response.json({
      success: true,
      booking,
    });

  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// GET all bookings
export async function GET() {
  try {
    await connectDB();
    const data = await Booking.find().sort({ createdAt: -1 });

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}