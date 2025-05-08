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
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    username: "gamer123",
    bio: "Free Fire enthusiast and competitive player.",
  })

  const [subscriptions, setSubscriptions] = useState({
    blogUpdates: true,
    gameUpdates: true,
    tournaments: true,
    communityEvents: false,
    marketing: false,
  })

  const [communities, setCommunities] = useState({
    discord: false,
    whatsapp: true,
    telegram: false,
    facebook: false,
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

  const handleSubscriptionChange = (name: string) => {
    setSubscriptions((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
  }

  const handleCommunityChange = (name: string) => {
    setCommunities((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }))
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
            <Tabs defaultValue="subscriptions" className="w-full">
              <TabsList className="bg-gray-800 border-b border-gray-700 w-full rounded-t-lg p-0">
                <TabsTrigger
                  value="subscriptions"
                  className="py-3 px-6 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none rounded-tl-lg"
                >
                  Subscriptions
                </TabsTrigger>
                <TabsTrigger
                  value="communities"
                  className="py-3 px-6 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none"
                >
                  Communities
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="py-3 px-6 data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-none"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="subscriptions" className="mt-0">
                <Card className="bg-gray-800 border-red-500/20 border-t-0 rounded-t-none">
                  <CardContent className="p-6">
                    <h3 className="font-gaming text-xl text-white mb-4">Manage Your Subscriptions</h3>
                    <p className="text-gray-400 mb-6">
                      Choose what types of updates and notifications you'd like to receive from FF Arena.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Blog Updates</h4>
                          <p className="text-gray-400 text-sm">
                            Receive notifications when new blog posts are published
                          </p>
                        </div>
                        <Switch
                          checked={subscriptions.blogUpdates}
                          onCheckedChange={() => handleSubscriptionChange("blogUpdates")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Game Updates</h4>
                          <p className="text-gray-400 text-sm">Get notified about Free Fire updates and patch notes</p>
                        </div>
                        <Switch
                          checked={subscriptions.gameUpdates}
                          onCheckedChange={() => handleSubscriptionChange("gameUpdates")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Tournament Announcements</h4>
                          <p className="text-gray-400 text-sm">Stay updated on upcoming tournaments and competitions</p>
                        </div>
                        <Switch
                          checked={subscriptions.tournaments}
                          onCheckedChange={() => handleSubscriptionChange("tournaments")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Community Events</h4>
                          <p className="text-gray-400 text-sm">Get notifications about community meetups and events</p>
                        </div>
                        <Switch
                          checked={subscriptions.communityEvents}
                          onCheckedChange={() => handleSubscriptionChange("communityEvents")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Marketing & Promotions</h4>
                          <p className="text-gray-400 text-sm">
                            Receive special offers, promotions, and marketing emails
                          </p>
                        </div>
                        <Switch
                          checked={subscriptions.marketing}
                          onCheckedChange={() => handleSubscriptionChange("marketing")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Save Subscription Preferences</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communities" className="mt-0">
                <Card className="bg-gray-800 border-red-500/20 border-t-0 rounded-t-none">
                  <CardContent className="p-6">
                    <h3 className="font-gaming text-xl text-white mb-4">Join Our Communities</h3>
                    <p className="text-gray-400 mb-6">
                      Connect with other Free Fire players and stay updated through our community channels.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#5865F2] rounded-full flex items-center justify-center mr-4">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.89 4.21 14.76 4.48 14.67 4.7C13.06 4.47 11.46 4.47 9.85 4.7C9.76 4.48 9.63 4.21 9.52 4C8.02 4.26 6.58 4.71 5.25 5.33C2.05 10.11 1.28 14.78 1.67 19.38C3.47 20.76 5.2 21.63 6.91 22.21C7.29 21.69 7.63 21.13 7.91 20.54C7.25 20.3 6.62 20 6.02 19.65C6.14 19.56 6.25 19.47 6.36 19.38C9.69 20.96 13.31 20.96 16.61 19.38C16.72 19.47 16.84 19.56 16.95 19.65C16.35 20 15.72 20.3 15.06 20.54C15.34 21.13 15.68 21.69 16.06 22.21C17.77 21.63 19.5 20.76 21.3 19.38C21.76 14.11 20.55 9.48 19.27 5.33ZM7.89 16.44C6.85 16.44 6 15.48 6 14.3C6 13.12 6.83 12.16 7.89 12.16C8.95 12.16 9.8 13.13 9.78 14.3C9.78 15.48 8.93 16.44 7.89 16.44ZM16.11 16.44C15.07 16.44 14.22 15.48 14.22 14.3C14.22 13.12 15.05 12.16 16.11 12.16C17.17 12.16 18.02 13.13 18 14.3C18 15.48 17.17 16.44 16.11 16.44Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Discord Community</h4>
                            <p className="text-gray-400 text-sm">
                              Join our Discord server for live discussions and events
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={communities.discord}
                          onCheckedChange={() => handleCommunityChange("discord")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mr-4">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.6 6.32C16.12 4.82 14.12 4 12 4C7.72 4 4.23 7.5 4.23 11.78C4.23 13.38 4.67 14.94 5.48 16.29L4.17 19.83L7.81 18.55C9.13 19.29 10.57 19.68 12.03 19.68H12.04C16.32 19.68 19.77 16.18 19.77 11.9C19.77 9.78 18.97 7.82 17.6 6.32ZM12.04 18.34C10.74 18.34 9.47 17.96 8.35 17.25L8.1 17.1L5.82 17.9L6.64 15.68L6.47 15.42C5.69 14.26 5.28 12.93 5.28 11.57C5.28 8.2 8.28 5.44 12.03 5.44C13.78 5.44 15.43 6.11 16.67 7.34C17.91 8.58 18.71 10.23 18.71 12.01C18.72 15.38 15.71 18.34 12.04 18.34ZM15.63 13.34C15.4 13.22 14.24 12.66 14.03 12.58C13.82 12.5 13.67 12.46 13.5 12.69C13.33 12.92 12.9 13.43 12.76 13.58C12.61 13.74 12.47 13.75 12.24 13.63C11.3 13.18 10.65 12.82 10 11.57C9.81 11.25 10.2 11.27 10.57 10.53C10.65 10.38 10.61 10.25 10.55 10.14C10.5 10.03 10.11 8.87 9.93 8.41C9.75 7.97 9.57 8.03 9.41 8.02C9.27 8.01 9.12 8.01 8.97 8.01C8.82 8.01 8.57 8.06 8.36 8.29C8.15 8.52 7.56 9.09 7.56 10.24C7.56 11.39 8.39 12.5 8.5 12.68C8.62 12.86 10.11 15.14 12.36 16.15C13.57 16.73 14.13 16.79 14.83 16.68C15.26 16.61 16.21 16.12 16.39 15.57C16.58 15.03 16.58 14.57 16.52 14.46C16.47 14.35 16.32 14.29 16.09 14.17L15.63 13.34Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">WhatsApp Group</h4>
                            <p className="text-gray-400 text-sm">Get updates and chat with other players on WhatsApp</p>
                          </div>
                        </div>
                        <Switch
                          checked={communities.whatsapp}
                          onCheckedChange={() => handleCommunityChange("whatsapp")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center mr-4">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4476 14.0069 10.4043 14 10.36C13.97 10.26 13.89 10.23 13.83 10.21C13.76 10.21 13.65 10.24 13.56 10.27C13.46 10.31 12.17 11.12 9.71 12.71C9.24 13.03 8.81 13.18 8.43 13.17C8.01 13.16 7.2 12.94 6.61 12.76C5.89 12.53 5.32 12.41 5.36 12C5.38 11.78 5.67 11.56 6.21 11.34C8.83 10.19 10.58 9.42 11.45 9.04C14 7.94 14.56 7.72 14.93 7.72C15.01 7.72 15.2 7.74 15.33 7.85C15.43 7.94 15.46 8.05 15.47 8.13C15.5 8.22 15.5 8.4 15.5 8.54L16.64 8.8Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Telegram Channel</h4>
                            <p className="text-gray-400 text-sm">Follow our Telegram channel for instant updates</p>
                          </div>
                        </div>
                        <Switch
                          checked={communities.telegram}
                          onCheckedChange={() => handleCommunityChange("telegram")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center mr-4">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.9 2H3.1C2.5 2 2 2.5 2 3.1V20.9C2 21.5 2.5 22 3.1 22H12.7V14.2H10.1V11.2H12.7V9C12.7 6.4 14.4 5 16.8 5C17.9 5 18.9 5.1 19.2 5.1V7.8H17.5C16.2 7.8 15.9 8.4 15.9 9.3V11.2H19.1L18.7 14.2H15.9V22H20.9C21.5 22 22 21.5 22 20.9V3.1C22 2.5 21.5 2 20.9 2Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Facebook Group</h4>
                            <p className="text-gray-400 text-sm">
                              Join our Facebook community for discussions and updates
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={communities.facebook}
                          onCheckedChange={() => handleCommunityChange("facebook")}
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Save Community Preferences</Button>
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
