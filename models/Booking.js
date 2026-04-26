import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      enum: [
        "Swedish Massage",
        "Deep Tissue Massage",
        "Hot Stone Therapy",
        "Aromatherapy",
        "Facial Treatment",
        "Body Scrub",
        "Couple's Massage",
        "Foot Reflexology",
      ],
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// prevent duplicate bookings (date + time)
BookingSchema.index({ date: 1, time: 1 }, { unique: true });

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);