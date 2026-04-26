import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/auth — Login
export async function POST(req) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return Response.json(
        { error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    await connectDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) {
      return Response.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return Response.json({
      token,
      user: { username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("[Auth Error]", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

// Setup route
export async function PUT(req) {
  try {
    const ADMIN_SETUP_KEY = process.env.ADMIN_SETUP_KEY;

    const { setupKey, username, password } = await req.json();

    if (!ADMIN_SETUP_KEY || setupKey !== ADMIN_SETUP_KEY) {
      return Response.json({ error: "Unauthorized." }, { status: 403 });
    }

    if (!username || !password || password.length < 8) {
      return Response.json(
        { error: "Username required and password must be at least 8 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ username: username.toLowerCase() });
    if (existing) {
      return Response.json({ error: "Admin user already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: username.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    return Response.json(
      { message: "Admin user created successfully.", username: user.username },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Setup Error]", err);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}