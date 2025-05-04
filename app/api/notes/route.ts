import { NextResponse } from "next/server"

// Simulated notes database
const semesters = [
  {
    id: "sem1",
    name: "Semester 1",
    subjects: [
      {
        id: "sub1",
        name: "Introduction to Programming",
        materials: [
          { id: "mat1", name: "Lecture Notes - Basics of C", type: "pdf" },
          { id: "mat2", name: "Programming Assignment 1", type: "pdf" },
          { id: "mat3", name: "Tutorial - Variables and Data Types", type: "pdf" },
        ],
      },
      {
        id: "sub2",
        name: "Digital Electronics",
        materials: [
          { id: "mat4", name: "Boolean Algebra Notes", type: "pdf" },
          { id: "mat5", name: "Logic Gates Diagrams", type: "pdf" },
        ],
      },
    ],
  },
  {
    id: "sem2",
    name: "Semester 2",
    subjects: [
      {
        id: "sub3",
        name: "Data Structures",
        materials: [
          { id: "mat6", name: "Arrays and Linked Lists", type: "pdf" },
          { id: "mat7", name: "Trees and Graphs", type: "pdf" },
          { id: "mat8", name: "Sorting Algorithms", type: "pdf" },
        ],
      },
      {
        id: "sub4",
        name: "Object-Oriented Programming",
        materials: [
          { id: "mat9", name: "Classes and Objects", type: "pdf" },
          { id: "mat10", name: "Inheritance and Polymorphism", type: "pdf" },
        ],
      },
    ],
  },
]

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const semesterId = url.searchParams.get("semester")
    const subjectId = url.searchParams.get("subject")
    const search = url.searchParams.get("search")

    let result

    if (search) {
      // Search across all materials
      const filteredSemesters = semesters
        .map((semester) => ({
          ...semester,
          subjects: semester.subjects
            .map((subject) => ({
              ...subject,
              materials: subject.materials.filter((material) =>
                material.name.toLowerCase().includes(search.toLowerCase()),
              ),
            }))
            .filter((subject) => subject.materials.length > 0),
        }))
        .filter((semester) => semester.subjects.length > 0)

      result = filteredSemesters
    } else if (semesterId && subjectId) {
      // Get materials for a specific subject in a semester
      const semester = semesters.find((sem) => sem.id === semesterId)
      if (!semester) {
        return NextResponse.json({ success: false, message: "Semester not found" }, { status: 404 })
      }

      const subject = semester.subjects.find((sub) => sub.id === subjectId)
      if (!subject) {
        return NextResponse.json({ success: false, message: "Subject not found" }, { status: 404 })
      }

      result = subject.materials
    } else if (semesterId) {
      // Get subjects for a specific semester
      const semester = semesters.find((sem) => sem.id === semesterId)
      if (!semester) {
        return NextResponse.json({ success: false, message: "Semester not found" }, { status: 404 })
      }

      result = semester.subjects
    } else {
      // Get all semesters
      result = semesters
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Notes error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, semesterId, subjectId, materialData } = await request.json()

    if (action === "addMaterial") {
      // Add a new material to a subject
      const semesterIndex = semesters.findIndex((sem) => sem.id === semesterId)
      if (semesterIndex === -1) {
        return NextResponse.json({ success: false, message: "Semester not found" }, { status: 404 })
      }

      const subjectIndex = semesters[semesterIndex].subjects.findIndex((sub) => sub.id === subjectId)
      if (subjectIndex === -1) {
        return NextResponse.json({ success: false, message: "Subject not found" }, { status: 404 })
      }

      const newMaterial = {
        id: `mat${Date.now()}`,
        name: materialData.name,
        type: materialData.type,
      }

      semesters[semesterIndex].subjects[subjectIndex].materials.push(newMaterial)

      return NextResponse.json({ success: true, material: newMaterial })
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Notes error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
