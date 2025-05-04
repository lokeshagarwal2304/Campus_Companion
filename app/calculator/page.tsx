"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, Save, Download, Trash2 } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

export default function CalculatorPage() {
  const { toast } = useToast()

  // CGPA Calculator
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", credits: 4, grade: "A" },
    { id: 2, name: "Course 2", credits: 3, grade: "B+" },
    { id: 3, name: "Course 3", credits: 3, grade: "A-" },
    { id: 4, name: "Course 4", credits: 4, grade: "B" },
  ])
  const [newCourse, setNewCourse] = useState({ name: "", credits: 3, grade: "A" })
  const [cgpa, setCgpa] = useState<number | null>(null)

  // Internal Marks Calculator
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Subject 1", internal1: 18, internal2: 19, assignment: 9, attendance: 5 },
    { id: 2, name: "Subject 2", internal1: 16, internal2: 17, assignment: 8, attendance: 4 },
  ])
  const [newSubject, setNewSubject] = useState({ name: "", internal1: 0, internal2: 0, assignment: 0, attendance: 0 })

  const gradePoints: Record<string, number> = {
    "A+": 10,
    A: 9,
    "A-": 8,
    "B+": 7,
    B: 6,
    "B-": 5,
    "C+": 4,
    C: 3,
    "C-": 2,
    D: 1,
    F: 0,
  }

  const calculateCGPA = () => {
    let totalCredits = 0
    let totalGradePoints = 0

    courses.forEach((course) => {
      totalCredits += course.credits
      totalGradePoints += course.credits * gradePoints[course.grade]
    })

    const calculatedCGPA = totalGradePoints / totalCredits
    setCgpa(Number.parseFloat(calculatedCGPA.toFixed(2)))

    toast({
      title: "CGPA Calculated",
      description: `Your CGPA is ${calculatedCGPA.toFixed(2)}`,
    })
  }

  const addCourse = () => {
    if (!newCourse.name) {
      toast({
        title: "Error",
        description: "Please enter a course name",
        variant: "destructive",
      })
      return
    }

    setCourses([...courses, { ...newCourse, id: courses.length + 1 }])
    setNewCourse({ name: "", credits: 3, grade: "A" })

    toast({
      title: "Course Added",
      description: `${newCourse.name} has been added to your courses`,
    })
  }

  const removeCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))

    toast({
      title: "Course Removed",
      description: "The course has been removed from your list",
    })
  }

  const addSubject = () => {
    if (!newSubject.name) {
      toast({
        title: "Error",
        description: "Please enter a subject name",
        variant: "destructive",
      })
      return
    }

    setSubjects([...subjects, { ...newSubject, id: subjects.length + 1 }])
    setNewSubject({ name: "", internal1: 0, internal2: 0, assignment: 0, attendance: 0 })

    toast({
      title: "Subject Added",
      description: `${newSubject.name} has been added to your subjects`,
    })
  }

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))

    toast({
      title: "Subject Removed",
      description: "The subject has been removed from your list",
    })
  }

  const calculateTotalInternal = (subject: (typeof subjects)[0]) => {
    return subject.internal1 + subject.internal2 + subject.assignment + subject.attendance
  }

  const saveCalculation = () => {
    toast({
      title: "Calculation Saved",
      description: "Your calculation has been saved successfully",
    })
  }

  const downloadCalculation = () => {
    toast({
      title: "Download Started",
      description: "Your calculation is being downloaded as a PDF",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container px-4 md:px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Academic Calculators</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Calculate your CGPA and internal marks</p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={saveCalculation}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={downloadCalculation}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cgpa" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="cgpa">CGPA Calculator</TabsTrigger>
            <TabsTrigger value="internal">Internal Marks Calculator</TabsTrigger>
          </TabsList>

          <TabsContent value="cgpa">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>CGPA Calculator</CardTitle>
                  <CardDescription>Add your courses, credits, and grades to calculate your CGPA</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                      <div className="col-span-5">Course Name</div>
                      <div className="col-span-2">Credits</div>
                      <div className="col-span-3">Grade</div>
                      <div className="col-span-2"></div>
                    </div>

                    {courses.map((course) => (
                      <div key={course.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-5">
                          <Input
                            value={course.name}
                            onChange={(e) => {
                              const updatedCourses = [...courses]
                              const index = updatedCourses.findIndex((c) => c.id === course.id)
                              updatedCourses[index] = { ...course, name: e.target.value }
                              setCourses(updatedCourses)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={course.credits}
                            onChange={(e) => {
                              const updatedCourses = [...courses]
                              const index = updatedCourses.findIndex((c) => c.id === course.id)
                              updatedCourses[index] = { ...course, credits: Number.parseInt(e.target.value) || 0 }
                              setCourses(updatedCourses)
                            }}
                          />
                        </div>
                        <div className="col-span-3">
                          <select
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={course.grade}
                            onChange={(e) => {
                              const updatedCourses = [...courses]
                              const index = updatedCourses.findIndex((c) => c.id === course.id)
                              updatedCourses[index] = { ...course, grade: e.target.value }
                              setCourses(updatedCourses)
                            }}
                          >
                            {Object.keys(gradePoints).map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCourse(course.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-5">
                        <Input
                          placeholder="New Course"
                          value={newCourse.name}
                          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={newCourse.credits}
                          onChange={(e) =>
                            setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="col-span-3">
                        <select
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={newCourse.grade}
                          onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                        >
                          {Object.keys(gradePoints).map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <Button onClick={addCourse} className="w-full">
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button size="lg" onClick={calculateCGPA}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate CGPA
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                  <CardDescription>Your calculated CGPA and grade summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Your CGPA</div>
                      <div className="text-5xl font-bold text-primary mt-2">{cgpa !== null ? cgpa : "—"}</div>
                      {cgpa !== null && (
                        <div className="mt-2 text-sm font-medium">
                          {cgpa >= 9
                            ? "Outstanding"
                            : cgpa >= 8
                              ? "Excellent"
                              : cgpa >= 7
                                ? "Very Good"
                                : cgpa >= 6
                                  ? "Good"
                                  : cgpa >= 5
                                    ? "Average"
                                    : "Needs Improvement"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Total Courses</span>
                          <span className="font-medium">{courses.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Total Credits</span>
                          <span className="font-medium">
                            {courses.reduce((sum, course) => sum + course.credits, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Highest Grade</span>
                          <span className="font-medium">
                            {courses.length > 0
                              ? courses.reduce(
                                  (max, course) => (gradePoints[course.grade] > gradePoints[max] ? course.grade : max),
                                  courses[0].grade,
                                )
                              : "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="internal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Internal Marks Calculator</CardTitle>
                  <CardDescription>Calculate your internal marks for each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                      <div className="col-span-3">Subject</div>
                      <div className="col-span-2">Internal 1 (20)</div>
                      <div className="col-span-2">Internal 2 (20)</div>
                      <div className="col-span-2">Assignment (10)</div>
                      <div className="col-span-2">Attendance (5)</div>
                      <div className="col-span-1"></div>
                    </div>

                    {subjects.map((subject) => (
                      <div key={subject.id} className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3">
                          <Input
                            value={subject.name}
                            onChange={(e) => {
                              const updatedSubjects = [...subjects]
                              const index = updatedSubjects.findIndex((s) => s.id === subject.id)
                              updatedSubjects[index] = { ...subject, name: e.target.value }
                              setSubjects(updatedSubjects)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            value={subject.internal1}
                            onChange={(e) => {
                              const updatedSubjects = [...subjects]
                              const index = updatedSubjects.findIndex((s) => s.id === subject.id)
                              updatedSubjects[index] = { ...subject, internal1: Number.parseInt(e.target.value) || 0 }
                              setSubjects(updatedSubjects)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            value={subject.internal2}
                            onChange={(e) => {
                              const updatedSubjects = [...subjects]
                              const index = updatedSubjects.findIndex((s) => s.id === subject.id)
                              updatedSubjects[index] = { ...subject, internal2: Number.parseInt(e.target.value) || 0 }
                              setSubjects(updatedSubjects)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={subject.assignment}
                            onChange={(e) => {
                              const updatedSubjects = [...subjects]
                              const index = updatedSubjects.findIndex((s) => s.id === subject.id)
                              updatedSubjects[index] = { ...subject, assignment: Number.parseInt(e.target.value) || 0 }
                              setSubjects(updatedSubjects)
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            min="0"
                            max="5"
                            value={subject.attendance}
                            onChange={(e) => {
                              const updatedSubjects = [...subjects]
                              const index = updatedSubjects.findIndex((s) => s.id === subject.id)
                              updatedSubjects[index] = { ...subject, attendance: Number.parseInt(e.target.value) || 0 }
                              setSubjects(updatedSubjects)
                            }}
                          />
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSubject(subject.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <Input
                          placeholder="New Subject"
                          value={newSubject.name}
                          onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0-20"
                          value={newSubject.internal1 || ""}
                          onChange={(e) =>
                            setNewSubject({ ...newSubject, internal1: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0-20"
                          value={newSubject.internal2 || ""}
                          onChange={(e) =>
                            setNewSubject({ ...newSubject, internal2: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0-10"
                          value={newSubject.assignment || ""}
                          onChange={(e) =>
                            setNewSubject({ ...newSubject, assignment: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="0"
                          max="5"
                          placeholder="0-5"
                          value={newSubject.attendance || ""}
                          onChange={(e) =>
                            setNewSubject({ ...newSubject, attendance: Number.parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                      <div className="col-span-1">
                        <Button onClick={addSubject} className="w-full">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>Your calculated internal marks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="p-4 bg-primary/5 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{subject.name}</h4>
                          <span className="text-lg font-bold text-primary">{calculateTotalInternal(subject)}/55</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${(calculateTotalInternal(subject) / 55) * 100}%` }}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Internal 1:</span>
                            <span>{subject.internal1}/20</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Internal 2:</span>
                            <span>{subject.internal2}/20</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Assignment:</span>
                            <span>{subject.assignment}/10</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Attendance:</span>
                            <span>{subject.attendance}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {subjects.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-500 dark:text-gray-400">Add subjects to see your internal marks</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}
