import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const ADMIN_USER = "deepak";
    const ADMIN_PASS = "984400";

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({ username });

    const res = Response.json({ success: true });

    res.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict`
    );

    return res;
  } catch (error) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}