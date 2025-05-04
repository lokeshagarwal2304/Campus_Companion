"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Briefcase,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  BookOpen,
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Bookmark,
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Mock data for placement resources
const companies = [
  {
    id: 1,
    name: "TechCorp",
    logo: "/placeholder.svg?height=40&width=40",
    role: "Software Engineer",
    location: "Bangalore, India",
    salary: "₹12-15 LPA",
    deadline: "2023-05-30",
    skills: ["Java", "Spring Boot", "React", "AWS"],
    description:
      "TechCorp is looking for talented software engineers to join our growing team. You'll work on cutting-edge projects and collaborate with experienced developers.",
  },
  {
    id: 2,
    name: "DataSystems",
    logo: "/placeholder.svg?height=40&width=40",
    role: "Data Analyst",
    location: "Hyderabad, India",
    salary: "₹8-10 LPA",
    deadline: "2023-06-15",
    skills: ["Python", "SQL", "Tableau", "Excel"],
    description:
      "Join our data team to analyze complex datasets and provide insights that drive business decisions. You'll work with the latest data technologies.",
  },
  {
    id: 3,
    name: "CloudWave",
    logo: "/placeholder.svg?height=40&width=40",
    role: "Frontend Developer",
    location: "Remote",
    salary: "₹10-12 LPA",
    deadline: "2023-06-10",
    skills: ["JavaScript", "React", "CSS", "UI/UX"],
    description:
      "CloudWave is seeking a frontend developer to create beautiful and responsive user interfaces. You'll work closely with our design and backend teams.",
  },
]

const experiences = [
  {
    id: 1,
    student: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Google",
    role: "Software Engineer Intern",
    year: "2022",
    content:
      "My internship at Google was an incredible learning experience. I worked on the Search team and contributed to real projects that impacted millions of users. The interview process was challenging but fair - 2 technical rounds and 1 HR round. My advice: practice data structures and algorithms daily, build projects that showcase your skills, and don't be afraid to ask questions during the interview.",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    student: "Rahul Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Microsoft",
    role: "Software Development Engineer",
    year: "2021",
    content:
      "Getting placed at Microsoft was a dream come true. The placement process consisted of an online coding test, followed by 3 technical interviews and 1 HR round. They focused heavily on problem-solving skills and system design. My preparation strategy was to solve at least 5 LeetCode problems daily and understand the fundamentals of operating systems and databases. Campus placements are competitive, so start preparing early!",
    likes: 38,
    comments: 12,
  },
  {
    id: 3,
    student: "Ananya Desai",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Amazon",
    role: "Product Manager",
    year: "2022",
    content:
      "I was placed as a Product Manager at Amazon through campus placements. The process included a written test, case study presentation, and 3 rounds of interviews. They evaluated my analytical thinking, product sense, and leadership qualities. My background in computer science combined with participation in various hackathons and product competitions helped me stand out. My tip: develop a product mindset by analyzing existing products and thinking about how to improve them.",
    likes: 35,
    comments: 6,
  },
]

const resources = [
  {
    id: 1,
    title: "Resume Building Guide",
    type: "PDF",
    description: "Learn how to create an ATS-friendly resume that highlights your skills and experiences effectively.",
    link: "#",
  },
  {
    id: 2,
    title: "Technical Interview Preparation",
    type: "Video Course",
    description:
      "A comprehensive course covering data structures, algorithms, and system design concepts frequently asked in technical interviews.",
    link: "#",
  },
  {
    id: 3,
    title: "HR Interview Questions and Answers",
    type: "Article",
    description: "Common HR interview questions with sample answers to help you prepare for the final round.",
    link: "#",
  },
  {
    id: 4,
    title: "Placement Aptitude Test Practice",
    type: "Quiz",
    description:
      "Practice questions for quantitative aptitude, logical reasoning, and verbal ability sections of placement tests.",
    link: "#",
  },
]

export default function PlacementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleApply = (companyName: string) => {
    toast({
      title: "Application Submitted",
      description: `Your application for ${companyName} has been submitted successfully.`,
    })
  }

  const handleSave = (companyName: string) => {
    toast({
      title: "Job Saved",
      description: `${companyName} has been saved to your bookmarks.`,
    })
  }

  const handleLike = (experienceId: number) => {
    toast({
      title: "Experience Liked",
      description: "You have liked this placement experience.",
    })
  }

  const handleComment = () => {
    toast({
      title: "Comment Feature",
      description: "This would open a comment form in a real application.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Options",
      description: "This would show sharing options in a real application.",
    })
  }

  const handleDownload = (resourceTitle: string) => {
    toast({
      title: "Download Started",
      description: `${resourceTitle} is being downloaded.`,
    })
  }

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container px-4 md:px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Placement Resources</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Prepare for your career with placement opportunities and resources
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search companies, roles, skills..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="opportunities" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="experiences" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Student Experiences
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Preparation Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities">
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No opportunities found</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? `We couldn't find any opportunities matching "${searchQuery}"`
                    : "Check back later for new opportunities"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredCompanies.map((company) => (
                  <Card key={company.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                            <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{company.role}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1" />
                              {company.name}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          <Calendar className="h-3 w-3 mr-1" />
                          Deadline: {new Date(company.deadline).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{company.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {company.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {company.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {company.salary}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleSave(company.name)}>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={() => handleApply(company.name)}>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid grid-cols-1 gap-6">
              {experiences.map((experience) => (
                <Card key={experience.id}>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={experience.avatar || "/placeholder.svg"} alt={experience.student} />
                        <AvatarFallback>{experience.student.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{experience.student}</CardTitle>
                        <CardDescription>
                          {experience.role} at {experience.company} ({experience.year})
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{experience.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-gray-500 hover:text-primary"
                        onClick={() => handleLike(experience.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{experience.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-gray-500 hover:text-primary"
                        onClick={handleComment}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{experience.comments}</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-primary"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{resource.title}</CardTitle>
                      <Badge>{resource.type}</Badge>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleDownload(resource.title)}>
                      Download Resource
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
