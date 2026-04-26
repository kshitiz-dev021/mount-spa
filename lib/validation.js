// lib/validation.js
// Booking input validation helpers

const SERVICES = [
  "Swedish Massage",
  "Deep Tissue Massage",
  "Hot Stone Therapy",
  "Aromatherapy",
  "Facial Treatment",
  "Body Scrub",
  "Couple's Massage",
  "Foot Reflexology",
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
];

const PHONE_REGEX = /^(\+977)?[0-9]{10}$/;

export { SERVICES, TIME_SLOTS };

/**
 * Validates booking payload.
 * Returns { valid: true } or { valid: false, message: "..." }
 */
export function validateBooking({ service, date, time, phone, name }) {
  if (!name || name.trim().length < 2) {
    return { valid: false, message: "Name must be at least 2 characters." };
  }

  if (!service || !SERVICES.includes(service)) {
    return { valid: false, message: "Please select a valid service." };
  }

  if (!date) {
    return { valid: false, message: "Please select a date." };
  }

  // Must not be in the past
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return { valid: false, message: "Booking date cannot be in the past." };
  }

  // Max 30 days in advance
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  if (selectedDate > maxDate) {
    return { valid: false, message: "Bookings can only be made up to 30 days in advance." };
  }

  if (!time || !TIME_SLOTS.includes(time)) {
    return { valid: false, message: "Please select a valid time slot (9AM–8PM)." };
  }

  if (!phone || !PHONE_REGEX.test(phone.replace(/\s/g, ""))) {
    return {
      valid: false,
      message: "Please enter a valid Nepali phone number (10 digits, optionally starting with +977).",
    };
  }

  return { valid: true };
}
