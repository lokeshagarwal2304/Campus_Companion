"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Upload,
  FolderPlus,
  Grid,
  List,
  MoreVertical,
  File,
  FileText,
  ImageIcon,
  FileArchive,
  Download,
  Trash2,
  Share2,
  Edit,
} from "lucide-react"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const files = [
  { id: 1, name: "Assignment 1.pdf", type: "pdf", size: "2.4 MB", modified: "2023-04-15" },
  { id: 2, name: "Lecture Notes.docx", type: "docx", size: "1.8 MB", modified: "2023-04-14" },
  { id: 3, name: "Project Presentation.pptx", type: "pptx", size: "5.2 MB", modified: "2023-04-13" },
  { id: 4, name: "Study Schedule.xlsx", type: "xlsx", size: "0.9 MB", modified: "2023-04-12" },
  { id: 5, name: "Campus Map.jpg", type: "jpg", size: "3.1 MB", modified: "2023-04-11" },
  { id: 6, name: "Research Paper.pdf", type: "pdf", size: "4.7 MB", modified: "2023-04-10" },
  { id: 7, name: "Code Samples.zip", type: "zip", size: "8.3 MB", modified: "2023-04-09" },
  { id: 8, name: "Lab Report.pdf", type: "pdf", size: "2.1 MB", modified: "2023-04-08" },
]

export default function DrivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { toast } = useToast()

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "docx":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "pptx":
        return <FileText className="h-10 w-10 text-orange-500" />
      case "xlsx":
        return <FileText className="h-10 w-10 text-green-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-10 w-10 text-purple-500" />
      case "zip":
        return <FileArchive className="h-10 w-10 text-yellow-500" />
      default:
        return <File className="h-10 w-10 text-gray-500" />
    }
  }

  const handleUpload = () => {
    toast({
      title: "Upload Feature",
      description: "This feature would allow you to upload new files to your drive.",
    })
  }

  const handleCreateFolder = () => {
    toast({
      title: "Create Folder",
      description: "This feature would allow you to create a new folder.",
    })
  }

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `${fileName} is being downloaded.`,
    })
  }

  const handleDelete = (fileName: string) => {
    toast({
      title: "File Deleted",
      description: `${fileName} has been moved to trash.`,
    })
  }

  const handleShare = (fileName: string) => {
    toast({
      title: "Share Options",
      description: `Sharing options for ${fileName} would appear here.`,
    })
  }

  const handleRename = (fileName: string) => {
    toast({
      title: "Rename File",
      description: `You would be able to rename ${fileName} here.`,
    })
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container px-4 md:px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Drive</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Store and organize your personal files</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" onClick={handleCreateFolder}>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
            <TabsTrigger value="trash">Trash</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredFiles.length === 0 ? (
              <div className="text-center py-12">
                <File className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No files found</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery ? `We couldn't find any files matching "${searchQuery}"` : "Upload files to get started"}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" onClick={handleUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <Card key={file.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center justify-center w-12 h-12">{getFileIcon(file.type)}</div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownload(file.name)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(file.name)}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRename(file.name)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(file.name)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <CardTitle className="text-sm font-medium truncate">{file.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {file.size} • {new Date(file.modified).toLocaleDateString()}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-3 bg-gray-100 dark:bg-gray-800 font-medium text-sm">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-3">Modified</div>
                  <div className="col-span-1"></div>
                </div>
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="grid grid-cols-12 gap-4 p-3 border-t hover:bg-gray-50 dark:hover:bg-gray-800/50 text-sm"
                  >
                    <div className="col-span-6 flex items-center">
                      <div className="mr-3">{getFileIcon(file.type)}</div>
                      <span className="truncate">{file.name}</span>
                    </div>
                    <div className="col-span-2 flex items-center">{file.size}</div>
                    <div className="col-span-3 flex items-center">{new Date(file.modified).toLocaleDateString()}</div>
                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(file.name)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShare(file.name)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRename(file.name)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(file.name)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12">
              <File className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No recent files</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your recently accessed files will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="shared">
            <div className="text-center py-12">
              <Share2 className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No shared files</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Files shared with you will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="trash">
            <div className="text-center py-12">
              <Trash2 className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">Trash is empty</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Items in trash will be automatically deleted after 30 days
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
