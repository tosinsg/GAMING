"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    username: "gamer123",
    bio: "Free Fire enthusiast and competitive player.",
  })

  // If the user is not logged in, redirect to the login page
  if (status === "unauthenticated") {
    redirect("/login")
  }

  if (status === "loading") {
    return (
      <div className="py-12 bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your API
    setIsEditing(false)
  }

  return (
    <div className="py-12 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-gaming text-4xl md:text-5xl text-white mb-8">
          Your <span className="text-red-500">Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="bg-gray-800 border-red-500/20">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-32 h-32 relative mb-4">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={session?.user?.image || "/images/avatars/default.png"} alt="Profile" />
                    <AvatarFallback className="bg-red-500/20 text-red-500 text-2xl">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-xl font-gaming text-white mb-1">{session?.user?.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{profileData.username}</p>
                <div className="w-full mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-red-500/20 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Game Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Rank</p>
                    <p className="text-white font-medium">Diamond II</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">K/D Ratio</p>
                    <p className="text-white font-medium">2.45</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Win Rate</p>
                    <p className="text-white font-medium">18%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Matches</p>
                    <p className="text-white font-medium">1,245</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="bg-gray-800 border-b border-gray-700 w-full rounded-t-lg p-0">
                <TabsTrigger
                  value="activity"
                  className="py-3 px-6 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none rounded-tl-lg"
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="py-3 px-6 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none"
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  className="py-3 px-6 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none"
                >
                  Friends
                </TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="mt-0">
                <Card className="bg-gray-800 border-red-500/20 border-t-0 rounded-t-none">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="border-b border-gray-700 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mr-3">
                            🏆
                          </div>
                          <div>
                            <p className="text-white">Won a Ranked Match</p>
                            <p className="text-gray-400 text-sm">2 hours ago</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mt-2">Secured a victory in Bermuda with 8 kills and 2 assists.</p>
                      </div>
                      <div className="border-b border-gray-700 pb-4">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mr-3">
                            🔫
                          </div>
                          <div>
                            <p className="text-white">Unlocked New Character</p>
                            <p className="text-gray-400 text-sm">Yesterday</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mt-2">Unlocked Alok character with DJ abilities.</p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mr-3">
                            📝
                          </div>
                          <div>
                            <p className="text-white">Commented on a Blog Post</p>
                            <p className="text-gray-400 text-sm">3 days ago</p>
                          </div>
                        </div>
                        <p className="text-gray-300 mt-2">
                          "Great tips! I've been using the M1014 shotgun with these settings and it's amazing."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <Card className="bg-gray-800 border-red-500/20 border-t-0 rounded-t-none">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300">
                          Username
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          value={profileData.username}
                          onChange={handleChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-300">
                          Bio
                        </Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={session?.user?.email || ""}
                          disabled
                          className="bg-gray-700 border-gray-600 text-white opacity-70"
                        />
                        <p className="text-gray-400 text-xs">Email cannot be changed</p>
                      </div>
                      <div className="pt-2">
                        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="friends" className="mt-0">
                <Card className="bg-gray-800 border-red-500/20 border-t-0 rounded-t-none">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b border-gray-700 pb-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={`/images/avatars/avatar-${i}.png`} alt="Friend" />
                              <AvatarFallback className="bg-red-500/20 text-red-500">F{i}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white font-medium">Friend {i}</p>
                              <p className="text-gray-400 text-sm">Online 2h ago</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                          >
                            Message
                          </Button>
                        </div>
                      ))}
                      <div className="text-center pt-4">
                        <Button variant="link" className="text-red-500 hover:text-red-400">
                          View All Friends
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
