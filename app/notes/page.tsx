"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, Download, Upload, Plus, Folder } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
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

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const handleDownload = (materialName: string) => {
    toast({
      title: "Download Started",
      description: `${materialName} is being downloaded.`,
    })
  }

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "This feature would allow you to upload new study materials.",
    })
  }

  const filteredSemesters = semesters
    .map((semester) => ({
      ...semester,
      subjects: semester.subjects
        .map((subject) => ({
          ...subject,
          materials: subject.materials.filter((material) =>
            material.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((subject) => subject.materials.length > 0),
    }))
    .filter((semester) => semester.subjects.length > 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container px-4 md:px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Access all your study materials organized by semester and subject
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search materials..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {searchQuery && filteredSemesters.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No materials found</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  We couldn't find any materials matching "{searchQuery}"
                </p>
              </div>
            ) : (
              filteredSemesters.map((semester) => (
                <Card key={semester.id}>
                  <CardHeader>
                    <CardTitle>{semester.name}</CardTitle>
                    <CardDescription>
                      {semester.subjects.reduce((acc, subject) => acc + subject.materials.length, 0)} materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {semester.subjects.map((subject) => (
                        <AccordionItem key={subject.id} value={subject.id}>
                          <AccordionTrigger className="hover:text-primary">
                            <div className="flex items-center">
                              <Folder className="h-4 w-4 mr-2 text-primary" />
                              {subject.name}
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                ({subject.materials.length})
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 pl-6">
                              {subject.materials.map((material) => (
                                <div
                                  key={material.id}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                    <span>{material.name}</span>
                                  </div>
                                  <Button variant="ghost" size="sm" onClick={() => handleDownload(material.name)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button variant="ghost" size="sm" className="mt-2">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Material
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No recent materials</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your recently accessed materials will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No favorite materials</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Your favorite materials will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="shared">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No shared materials</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Materials shared with you will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
