import { connectDB } from "@/lib/db";
import Booking from "@/models/Booking";

// UPDATE booking (status change)
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const { status } = await req.json();

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return Response.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, booking: updated });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// DELETE booking
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}