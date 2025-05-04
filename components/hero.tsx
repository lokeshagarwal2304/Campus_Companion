import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, HardDrive } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="py-20 md:py-28">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-500">
              Campus Companion
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Your all-in-one personal academic assistant. Organize study materials, calculate grades, boost
              productivity, and more.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" className="gap-1">
              Get Started <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Organized Notes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Access study materials semester-wise & subject-wise
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <HardDrive className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personal Drive</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Store and organize your files on your own cloud-like storage
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Productivity Tools</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Boost focus with Pomodoro timer & LoFi music player
              </p>
            </div>
          </div>

          <div className="mt-16 relative w-full max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-lg blur-3xl opacity-30"></div>
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden">
              <div className="h-[400px] w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=800"
                  alt="Campus Companion Dashboard Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
