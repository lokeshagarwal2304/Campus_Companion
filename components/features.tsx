import { BookOpen, Search, HardDrive, Calculator, Clock, Music, Briefcase, MessageSquare } from "lucide-react"

export default function Features() {
  const features = [
    {
      id: "notes",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Organized Study Material",
      description:
        "Access all your study materials organized semester-wise and subject-wise. No more scattered PDFs or lost notes.",
    },
    {
      id: "search",
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Smart Search",
      description: "Search through all your uploaded files using keywords. Find what you need in seconds.",
    },
    {
      id: "drive",
      icon: <HardDrive className="h-10 w-10 text-primary" />,
      title: "Personal Cloud Storage",
      description: "Store and organize your personal files on your own cloud-like storage. Access them from anywhere.",
    },
    {
      id: "calculator",
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: "CGPA & Internal Calculator",
      description: "Calculate your CGPA and internal marks with our easy-to-use calculators. Plan your academic goals.",
    },
    {
      id: "productivity",
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Pomodoro Timer",
      description:
        "Boost your productivity with our Pomodoro timer. Study with focus and take breaks at the right time.",
    },
    {
      id: "music",
      icon: <Music className="h-10 w-10 text-primary" />,
      title: "LoFi Music Player",
      description: "Study with our built-in LoFi music player. Create the perfect ambiance for focused learning.",
    },
    {
      id: "placement",
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Placement Resources",
      description: "Access placement tips and real student experiences to prepare for your career journey.",
    },
    {
      id: "chatbot",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Study Assistant",
      description: "Get quick answers to your academic questions with our AI-powered study assistant.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to <span className="text-primary">Excel</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Campus Companion brings all your academic tools together in one place, helping you study smarter, not
            harder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              id={feature.id}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-primary/10 rounded-full inline-block mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
