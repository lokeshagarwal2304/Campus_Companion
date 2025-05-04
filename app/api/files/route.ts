import { NextResponse } from "next/server"

// Simulated file database
const files = [
  { id: 1, name: "Assignment 1.pdf", type: "pdf", size: "2.4 MB", modified: "2023-04-15", userId: 1 },
  { id: 2, name: "Lecture Notes.docx", type: "docx", size: "1.8 MB", modified: "2023-04-14", userId: 1 },
  { id: 3, name: "Project Presentation.pptx", type: "pptx", size: "5.2 MB", modified: "2023-04-13", userId: 1 },
]

export async function GET(request: Request) {
  try {
    // In a real app, we would verify the JWT token and get the userId
    const userId = 1 // Simulated authenticated user

    // Get user files
    const userFiles = files.filter((file) => file.userId === userId)

    return NextResponse.json({ success: true, files: userFiles })
  } catch (error) {
    console.error("Files error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, type, size } = await request.json()

    // In a real app, we would verify the JWT token and get  size } = await request.json();

    // In a real app, we would verify the JWT token and get the userId
    const userId = 1 // Simulated authenticated user

    // Simulate file upload
    const newFile = {
      id: files.length + 1,
      name,
      type,
      size,
      modified: new Date().toISOString().split("T")[0],
      userId,
    }

    files.push(newFile)

    return NextResponse.json({ success: true, file: newFile })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { fileId } = await request.json()

    // In a real app, we would verify the JWT token and get the userId
    const userId = 1 // Simulated authenticated user

    // Find file index
    const fileIndex = files.findIndex((file) => file.id === fileId && file.userId === userId)

    if (fileIndex === -1) {
      return NextResponse.json({ success: false, message: "File not found" }, { status: 404 })
    }

    // Remove file
    files.splice(fileIndex, 1)

    return NextResponse.json({ success: true, message: "File deleted successfully" })
  } catch (error) {
    console.error("File delete error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
