"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Coffee,
  BookOpen,
  Clock,
  RotateCcw,
  Music,
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Mock data for LoFi tracks
const lofiTracks = [
  { id: 1, title: "Chill Study Beats", artist: "LoFi Dreamer", duration: 183 },
  { id: 2, title: "Coffee Shop Ambience", artist: "Ambient Vibes", duration: 210 },
  { id: 3, title: "Late Night Coding", artist: "Code Beats", duration: 195 },
  { id: 4, title: "Rainy Day Reading", artist: "Book Sounds", duration: 240 },
  { id: 5, title: "Focus Flow", artist: "Deep Concentration", duration: 225 },
]

// Motivational quotes
const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
]

export default function ProductivityPage() {
  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState<"focus" | "shortBreak" | "longBreak">("focus")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
  })

  // Music Player State
  const [currentTrack, setCurrentTrack] = useState(lofiTracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  // Quote State
  const [currentQuote, setCurrentQuote] = useState(quotes[0])

  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio (in a real app, this would be actual audio files)
  useEffect(() => {
    audioRef.current = new Audio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      const nextMode = getNextTimerMode()
      handleTimerComplete(nextMode)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const getNextTimerMode = () => {
    if (timerMode === "focus") {
      // After focus, determine if it should be a short or long break
      const nextPomodoroCount = pomodoroCount + 1
      if (nextPomodoroCount % settings.longBreakInterval === 0) {
        return "longBreak"
      } else {
        return "shortBreak"
      }
    } else {
      // After any break, go back to focus mode
      return "focus"
    }
  }

  const handleTimerComplete = (nextMode: "focus" | "shortBreak" | "longBreak") => {
    // Play notification sound
    const audio = new Audio("/notification.mp3")
    audio.play()

    // Update pomodoro count if completing a focus session
    if (timerMode === "focus") {
      setPomodoroCount(pomodoroCount + 1)
    }

    // Show notification
    toast({
      title: `${timerMode === "focus" ? "Focus session" : "Break"} completed!`,
      description: `Time for ${nextMode === "focus" ? "focus" : "a break"}!`,
    })

    // Set the next timer mode
    setTimerMode(nextMode)

    // Reset timer based on the next mode
    if (nextMode === "focus") {
      setTimeLeft(settings.focusTime * 60)
    } else if (nextMode === "shortBreak") {
      setTimeLeft(settings.shortBreakTime * 60)
    } else {
      setTimeLeft(settings.longBreakTime * 60)
    }
  }

  const startTimer = () => {
    setIsActive(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)

    // Reset time based on current mode
    if (timerMode === "focus") {
      setTimeLeft(settings.focusTime * 60)
    } else if (timerMode === "shortBreak") {
      setTimeLeft(settings.shortBreakTime * 60)
    } else {
      setTimeLeft(settings.longBreakTime * 60)
    }
  }

  const changeTimerMode = (mode: "focus" | "shortBreak" | "longBreak") => {
    setIsActive(false)
    setTimerMode(mode)

    // Set time based on selected mode
    if (mode === "focus") {
      setTimeLeft(settings.focusTime * 60)
    } else if (mode === "shortBreak") {
      setTimeLeft(settings.shortBreakTime * 60)
    } else {
      setTimeLeft(settings.longBreakTime * 60)
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage for the circular timer
  const calculateProgress = () => {
    let totalTime
    if (timerMode === "focus") {
      totalTime = settings.focusTime * 60
    } else if (timerMode === "shortBreak") {
      totalTime = settings.shortBreakTime * 60
    } else {
      totalTime = settings.longBreakTime * 60
    }

    return ((totalTime - timeLeft) / totalTime) * 100
  }

  // Music player functions
  const playPauseMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    } else {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const currentIndex = lofiTracks.findIndex((track) => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % lofiTracks.length
    setCurrentTrack(lofiTracks[nextIndex])
    setCurrentTime(0)

    // If already playing, play the next track
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const prevTrack = () => {
    const currentIndex = lofiTracks.findIndex((track) => track.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + lofiTracks.length) % lofiTracks.length
    setCurrentTrack(lofiTracks[prevIndex])
    setCurrentTime(0)

    // If already playing, play the previous track
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }

    // If volume is set to 0, mute; otherwise unmute
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }

  // Change quote every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      setCurrentQuote(quotes[randomIndex])
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container px-4 md:px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Productivity Tools</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Boost your focus and productivity with our tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pomodoro Timer</CardTitle>
              <CardDescription>Use the Pomodoro Technique to improve your focus and productivity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <Tabs value={timerMode} className="w-full" onValueChange={(value) => changeTimerMode(value as any)}>
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="focus" className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Focus
                      </TabsTrigger>
                      <TabsTrigger value="shortBreak" className="flex items-center">
                        <Coffee className="h-4 w-4 mr-2" />
                        Short Break
                      </TabsTrigger>
                      <TabsTrigger value="longBreak" className="flex items-center">
                        <Coffee className="h-4 w-4 mr-2" />
                        Long Break
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="relative w-64 h-64 mb-8">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      className="text-gray-200 dark:text-gray-700"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                      className="text-primary"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - calculateProgress() / 100)}`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{formatTime(timeLeft)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
                      {timerMode === "focus" ? "Focus Time" : timerMode === "shortBreak" ? "Short Break" : "Long Break"}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4 mb-8">
                  <Button variant="outline" size="icon" onClick={resetTimer} className="h-12 w-12 rounded-full">
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                  {isActive ? (
                    <Button size="icon" onClick={pauseTimer} className="h-12 w-12 rounded-full">
                      <Pause className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button size="icon" onClick={startTimer} className="h-12 w-12 rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const nextMode = getNextTimerMode()
                      changeTimerMode(nextMode)
                    }}
                    className="h-12 w-12 rounded-full"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Completed Pomodoros: {pomodoroCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LoFi Music Player</CardTitle>
              <CardDescription>Study with ambient music to improve focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <Music className="h-16 w-16 text-primary opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentTrack.artist}</p>
                </div>

                <div className="space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(currentTrack.duration)}</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon" onClick={prevTrack} className="h-10 w-10 rounded-full">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={playPauseMusic} className="h-12 w-12 rounded-full">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextTrack} className="h-10 w-10 rounded-full">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Slider
                    value={[volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weekly Motivation</CardTitle>
            <CardDescription>Inspirational quotes to keep you motivated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-primary/5 rounded-lg text-center">
              <blockquote className="text-xl italic font-medium">"{currentQuote.text}"</blockquote>
              <cite className="mt-2 block text-sm text-gray-500 dark:text-gray-400">— {currentQuote.author}</cite>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
