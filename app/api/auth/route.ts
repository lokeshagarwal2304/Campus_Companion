import { NextResponse } from "next/server"

// Simulated user database
const users = [{ id: 1, name: "Test User", email: "test@example.com", password: "password123" }]

export async function POST(request: Request) {
  try {
    const { action, email, password, name } = await request.json()

    if (action === "login") {
      // Simulate login
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        return NextResponse.json({
          success: true,
          user: { id: user.id, name: user.name, email: user.email },
          token: "simulated-jwt-token",
        })
      } else {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
      }
    } else if (action === "signup") {
      // Check if user already exists
      const existingUser = users.find((u) => u.email === email)

      if (existingUser) {
        return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 })
      }

      // Simulate user creation
      const newUser = { id: users.length + 1, name, email, password }
      users.push(newUser)

      return NextResponse.json({
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token: "simulated-jwt-token",
      })
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
