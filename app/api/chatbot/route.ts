import { NextResponse } from "next/server"

// Simple AI chatbot responses
const responses = {
  placement: [
    "To prepare for placements, focus on data structures, algorithms, and system design concepts.",
    "Make sure your resume highlights your projects and relevant skills.",
    "Practice mock interviews with friends to improve your communication skills.",
    "Research the companies you're applying to and understand their interview process.",
    "Solve at least 2-3 coding problems daily on platforms like LeetCode or HackerRank.",
  ],
  notes: [
    "You can organize your notes by semester and subject in the Notes section.",
    "Use the search feature to quickly find specific topics in your notes.",
    "Upload your class notes and share them with friends through the platform.",
    "Create summaries of important concepts for quick revision before exams.",
    "Use color coding and highlighting to mark important information in your notes.",
  ],
  cgpa: [
    "The CGPA calculator can help you track your academic progress.",
    "Set realistic grade goals for each semester to improve your overall CGPA.",
    "Focus on subjects with higher credit values as they impact your CGPA more.",
    "Use the calculator to simulate different grade scenarios and plan accordingly.",
    "Remember that consistent effort throughout the semester is key to good grades.",
  ],
  default: [
    "How can I help you with your academic needs?",
    "You can ask me about notes organization, CGPA calculation, or placement preparation.",
    "Check out our productivity tools to improve your study habits.",
    "Is there a specific feature of Campus Companion you'd like to learn more about?",
    "I'm here to help you make the most of your academic journey!",
  ],
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Simple keyword matching for responses
    let responseCategory = "default"
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("placement") || lowerMessage.includes("interview") || lowerMessage.includes("job")) {
      responseCategory = "placement"
    } else if (lowerMessage.includes("notes") || lowerMessage.includes("study") || lowerMessage.includes("material")) {
      responseCategory = "notes"
    } else if (lowerMessage.includes("cgpa") || lowerMessage.includes("grade") || lowerMessage.includes("score")) {
      responseCategory = "cgpa"
    }

    // Get a random response from the category
    const categoryResponses = responses[responseCategory as keyof typeof responses]
    const randomIndex = Math.floor(Math.random() * categoryResponses.length)
    const response = categoryResponses[randomIndex]

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ success: true, response })
  } catch (error) {
    console.error("Chatbot error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
