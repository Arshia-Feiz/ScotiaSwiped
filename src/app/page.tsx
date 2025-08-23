"use client"

import { useState, useMemo } from "react"
import TinderCard from "react-tinder-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Heart,
  X,
  RotateCcw,
  Phone,
  ChevronRight,
  Search,
  AlertTriangle,
  TrendingUp,
  Plus,
  Calendar,
  ChevronLeft,
  Play,
  Pause,
  ArrowLeft,
  Trash2,
} from "lucide-react"

const scenePartners = [
  // Grocers
  "Sobeys",
  "Safeway",
  "Foodland",
  "FreshCo",
  "Chalo! FreshCo",
  "Thrifty Foods",
  "IGA",
  "Rachelle Béry",
  "Les Marchés Tradition",
  "Voilà by Sobeys",
  "Voilà by Safeway",
  "Voilà par IGA",
  // Home Hardware
  "Home Hardware",
  "Home Building Centre",
  "Home Hardware Building Centre",
  "Home Furniture",
  "homehardware.ca",
]

const bigKnownCompanies = [
  { name: "Netflix", unsubscribeUrl: "https://www.netflix.com/cancelplan" },
  { name: "Spotify Premium", unsubscribeUrl: "https://www.spotify.com/us/account/subscription/" },
  { name: "Disney+", unsubscribeUrl: "https://www.disneyplus.com/account/subscription" },
  { name: "YouTube Premium", unsubscribeUrl: "https://www.youtube.com/paid_memberships" },
  { name: "Amazon Prime", unsubscribeUrl: "https://www.amazon.com/mc/yourprimemembership" },
]

const mockSubscriptions = [
  {
    id: 1,
    name: "Netflix",
    cost: 16.99,
    description:
      "Looking for someone who won't judge my 3am true crime binges. Must love long walks through endless scrolling and commitment issues with finishing series.",
    isKnownPartner: false,
    isBigCompany: true,
    logo: "/netflix-inspired-logo.png",
    flags: ["recurring_12_months"],
    monthsActive: 24,
  },
  {
    id: 2,
    name: "Spotify Premium",
    cost: 10.99,
    description:
      "Music lover seeking someone who appreciates my 47 different playlists for every mood. Warning: I will judge your Spotify Wrapped.",
    isKnownPartner: false,
    isBigCompany: true,
    logo: "/spotify-logo.png",
    flags: ["recurring_12_months"],
    monthsActive: 18,
  },
  {
    id: 3,
    name: "Sobeys Delivery",
    cost: 9.99,
    description:
      "Grocery delivery enthusiast who's given up on adulting. Looking for someone who understands that cereal counts as dinner. Scene+ points included! 💎",
    isKnownPartner: true,
    isBigCompany: false,
    logo: "/sobeys-logo.png",
    flags: ["scene_partner"],
    monthsActive: 6,
    scenePointsMonthly: 150,
  },
  {
    id: 4,
    name: "Disney+",
    cost: 11.99,
    description:
      "Seeking someone who won't judge me for crying during Pixar movies. Must be okay with my extensive Disney+ watchlist and occasional princess sing-alongs.",
    isKnownPartner: false,
    isBigCompany: true,
    logo: "/disney-plus-logo.png",
    flags: ["recurring_6_months"],
    monthsActive: 8,
  },
  {
    id: 5,
    name: "MysteryApp Pro",
    cost: 29.99,
    description:
      "Red flag alert! 🚩 I literally have no idea what this is or when I signed up. Probably happened during a late-night online shopping spree. Help?",
    isKnownPartner: false,
    isBigCompany: false,
    logo: "/mysterious-app-icon.png",
    flags: ["suspicious", "new_transaction", "high_cost"],
    monthsActive: 1,
  },
  {
    id: 6,
    name: "Home Hardware Plus",
    cost: 4.99,
    description:
      "DIY disaster specialist looking for someone who won't laugh at my crooked shelves. Scene+ partner with benefits (literally - points!)! 🔨✨",
    isKnownPartner: true,
    isBigCompany: false,
    logo: "/home-hardware-logo.png",
    flags: ["scene_partner"],
    monthsActive: 3,
    scenePointsMonthly: 75,
  },
  {
    id: 7,
    name: "FitnessPal Premium",
    cost: 19.99,
    description:
      "Gym membership for my phone. Been paying for 8 months, used it twice. Looking for motivation or someone to cancel this for me.",
    isKnownPartner: false,
    isBigCompany: false,
    logo: "/placeholder-z666r.png",
    flags: ["price_increase"],
    monthsActive: 8,
    previousCost: 14.99,
  },
]

const scotiaWrappedStories = [
  {
    id: 1,
    title: "Your 2024 Spending",
    content: "You spent $2,847.52 on subscriptions this year",
    subtitle: "That's like buying 142 coffees ☕",
    background: "bg-gradient-to-br from-red-600 via-red-700 to-black",
  },
  {
    id: 2,
    title: "Most Expensive",
    content: "MysteryApp Pro",
    subtitle: "$29.99/month • You questioned this 47 times",
    background: "bg-gradient-to-br from-black via-red-900 to-red-600",
  },
  {
    id: 3,
    title: "Scene+ Champion",
    content: "You earned 2,700 Scene+ points",
    subtitle: "From Sobeys & Home Hardware subscriptions",
    background: "bg-gradient-to-br from-red-500 via-black to-red-800",
  },
  {
    id: 4,
    title: "Swipe Stats",
    content: "You swiped right 73% of the time",
    subtitle: "Commitment issues? We don't judge 💅",
    background: "bg-gradient-to-br from-black via-red-600 to-red-900",
  },
  {
    id: 5,
    title: "Biggest Save",
    content: "Cancelled FitnessPal Premium",
    subtitle: "Saved $240/year • Your wallet thanks you",
    background: "bg-gradient-to-br from-red-700 via-black to-red-500",
  },
]

function ScotiaBankingHomepage({
  onLaunchScotiaSwipe,
  onShowYearRecap,
  onShowScotiaWrapped,
}: {
  onLaunchScotiaSwipe: () => void
  onShowYearRecap: () => void
  onShowScotiaWrapped: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white max-w-sm mx-auto">
      {/* iPhone Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-medium">11:43</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">LTE</span>
          <div className="bg-red-500 text-white px-1 rounded text-xs ml-1">96</div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-red-600 px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white font-bold text-2xl">S</div>
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-4 py-2 text-sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Search & chat
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-white">Good morning, Arshia</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-4">
        {/* ScotiaSwipe Feature Card */}
        <Card className="bg-gradient-to-r from-red-600 to-red-700 border-0 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">ScotiaSwipe</h3>
                <p className="text-red-100 text-sm">Manage your subscriptions the fun way</p>
              </div>
              <Badge className="bg-yellow-400 text-black text-xs">NEW</Badge>
            </div>
            <div className="space-y-2">
              <Button
                onClick={onLaunchScotiaSwipe}
                className="w-full bg-white text-red-600 hover:bg-gray-100 font-medium"
              >
                Start Swiping
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={onShowYearRecap}
                  variant="outline"
                  className="flex-1 border-white text-white hover:bg-white/10 bg-transparent"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Year Recap
                </Button>
                <Button
                  onClick={onShowScotiaWrapped}
                  variant="outline"
                  className="w-12 h-12 border-2 border-yellow-400 text-white hover:bg-white/10 bg-transparent rounded-full p-0 relative"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Accounts */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-red-400 font-medium">My accounts</h3>
              <h3 className="text-gray-400">My updates</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-red-400 font-medium">Banking (1)</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="ml-4 space-y-2">
                <div className="text-white">Student Banking Advantage Plan</div>
                <div className="text-gray-400 text-sm">$***</div>
              </div>

              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal">
                <span className="mr-2">Open account</span>
                <div className="w-5 h-5 border border-blue-400 rounded-full flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Credit Cards */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-red-400 font-medium">Credit Cards (1)</div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-white">Scene+ Visa card (4019)</div>
                <div className="text-gray-400 text-sm">$496.11</div>
              </div>

              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal">
                <span className="mr-2">Add card</span>
                <div className="w-5 h-5 border border-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other Services */}
        <div className="space-y-3">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs">$</div>
                <div>
                  <div className="text-white">Borrowing (0)</div>
                </div>
              </div>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal">
                <span className="mr-2">Start borrowing</span>
                <div className="w-5 h-5 border border-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-xs">📈</div>
                <div>
                  <div className="text-white">Investments (0)</div>
                </div>
              </div>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal">
                <span className="mr-2">Start investing</span>
                <div className="w-5 h-5 border border-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <div className="text-white">Scene+ rewards</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white">My balances</div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-gray-400 text-sm">I have</div>
                  <div className="text-white text-xl font-bold">$235.16</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">I owe</div>
                  <div className="text-white text-xl font-bold">$496.11</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 max-w-sm mx-auto">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-red-600 rounded"></div>
            <span className="text-xs text-red-400 mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <span className="text-xs text-gray-400 mt-1">Move Money</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <span className="text-xs text-gray-400 mt-1">Advice+</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <span className="text-xs text-gray-400 mt-1">Scene+</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 bg-gray-600 rounded"></div>
            <span className="text-xs text-gray-400 mt-1">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function YearRecapViewComponent({ onBack, onManageTrusted }: { onBack: () => void; onManageTrusted: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white max-w-sm mx-auto">
      {/* iPhone Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-medium">11:43</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">LTE</span>
          <div className="bg-red-500 text-white px-1 rounded text-xs ml-1">96</div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-red-600 px-4 py-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 text-white hover:bg-white/10 p-2">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Scotia Banking
        </Button>
        <h1 className="text-3xl font-bold text-white mb-2">Year Recap</h1>
        <p className="text-red-100">Here's a summary of your subscriptions for the year</p>
      </div>

      {/* Year Recap Content */}
      <div className="px-4 py-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Total Spending</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-4">$2,847.52</div>
            <p className="text-gray-300 text-sm">Spent on subscriptions this year</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Most Expensive Subscription</h2>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-4">MysteryApp Pro</div>
            <p className="text-gray-300 text-sm">$29.99/month</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Scene+ Points Earned</h2>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-4">2,700</div>
            <p className="text-gray-300 text-sm">From Sobeys & Home Hardware subscriptions</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Swipe Stats</h2>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-4">15 Kept • 7 Cancelled</div>
            <p className="text-gray-300 text-sm">Total subscriptions managed</p>
          </div>
        </div>

        {/* Trusted Subscriptions */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Trusted Subscriptions</h2>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 mb-4">
            <div className="text-center mb-2">
              <span className="text-2xl font-bold text-red-400">3 Apps</span>
            </div>
            <p className="text-sm text-gray-300 text-center mb-3">Won't appear in ScotiaSwipe for 6 months</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white">Netflix</span>
                <span className="text-gray-400">$15.99/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Spotify Premium</span>
                <span className="text-gray-400">$9.99/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">Adobe Creative Suite</span>
                <span className="text-gray-400">$52.99/month</span>
              </div>
            </div>
          </div>
          <Button
            onClick={onManageTrusted}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
          >
            Manage Trusted List
          </Button>
        </div>

        <div className="text-center pt-6">
          <p className="text-gray-400 text-sm">
            Great job managing your subscriptions! You saved $420 this year by cancelling unused services.
          </p>
        </div>
      </div>
    </div>
  )
}

function ScotiaWrappedViewComponent({ onBack, onFinish }: { onBack: () => void; onFinish: () => void }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextStory = () => {
    if (currentStoryIndex < scotiaWrappedStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
      setProgress(0)
    } else {
      onFinish()
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
      setProgress(0)
    }
  }

  const currentStory = scotiaWrappedStories[currentStoryIndex]

  useState(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory()
            return 0
          }
          return prev + 2
        })
      }
    }, 100)

    return () => clearInterval(timer)
  })

  return (
    <div className="min-h-screen bg-black text-white max-w-sm mx-auto relative overflow-hidden">
      {/* iPhone Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black/50 absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-medium">11:43</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">LTE</span>
          <div className="bg-red-500 text-white px-1 rounded text-xs ml-1">96</div>
        </div>
      </div>

      {/* Story Progress Bars */}
      <div className="absolute top-16 left-4 right-4 z-20 flex gap-1">
        {scotiaWrappedStories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentStoryIndex ? "100%" : index === currentStoryIndex ? `${progress}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Story Header */}
      <div className="absolute top-20 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center font-bold">
            S
          </div>
          <div>
            <div className="font-semibold">ScotiaWrapped</div>
            <div className="text-xs text-white/70">Your 2024 story</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setIsPaused(!isPaused)} className="text-white hover:bg-white/10 p-2">
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10 p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Story Content */}
      <div className={`${currentStory.background} min-h-screen flex items-center justify-center p-8 pt-32`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{currentStory.title}</h1>
          <div className="text-4xl font-black mb-6 leading-tight">{currentStory.content}</div>
          <p className="text-lg text-white/80">{currentStory.subtitle}</p>
        </div>
      </div>

      {/* Touch Areas for Navigation */}
      <div className="absolute inset-0 flex">
        <div className="flex-1" onClick={prevStory}></div>
        <div className="flex-1" onClick={nextStory}></div>
      </div>

      {/* Story Navigation Hint */}
      <div className="absolute bottom-8 left-4 right-4 text-center">
        <p className="text-white/60 text-sm">
          Tap to continue • {currentStoryIndex + 1} of {scotiaWrappedStories.length}
        </p>
      </div>
    </div>
  )
}

function TrustedListView({ onBack }: { onBack: () => void }) {
  const [trustedList, setTrustedList] = useState([
    { id: 1, name: "Netflix", cost: 15.99, addedDate: "2023-06-15" },
    { id: 2, name: "Spotify Premium", cost: 9.99, addedDate: "2023-08-22" },
    { id: 3, name: "Adobe Creative Suite", cost: 52.99, addedDate: "2023-09-10" },
  ])

  const availableSubscriptions = mockSubscriptions.filter(
    (sub) => !trustedList.some((trusted) => trusted.name === sub.name),
  )

  const removeTrusted = (id: number) => {
    setTrustedList((prev) => prev.filter((item) => item.id !== id))
  }

  const addToTrusted = (subscription: (typeof mockSubscriptions)[0]) => {
    const newTrusted = {
      id: Date.now(),
      name: subscription.name,
      cost: subscription.cost,
      addedDate: new Date().toISOString().split("T")[0],
    }
    setTrustedList((prev) => [...prev, newTrusted])
  }

  return (
    <div className="min-h-screen bg-black text-white max-w-sm mx-auto">
      {/* iPhone Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-medium">11:43</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">LTE</span>
          <div className="bg-red-500 text-white px-1 rounded text-xs ml-1">96</div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-gray-800 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">Trusted Subscriptions</h1>
        <div className="w-9"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Trusted List */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-red-400">Currently Trusted</h2>
          <div className="space-y-2">
            {trustedList.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-400">
                    ${item.cost}/month • Added {item.addedDate}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTrusted(item.id)}
                  className="text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Add from Current Subscriptions */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-red-400">Add to Trusted</h2>
          <div className="space-y-2">
            {availableSubscriptions.slice(0, 5).map((subscription) => (
              <div key={subscription.name} className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={subscription.logo || "/placeholder.svg"}
                    alt={subscription.name}
                    className="w-8 h-8 rounded"
                  />
                  <div>
                    <div className="font-medium">{subscription.name}</div>
                    <div className="text-sm text-gray-400">${subscription.cost}/month</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addToTrusted(subscription)}
                  className="text-green-400 hover:bg-green-900/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center mt-6">
          Trusted subscriptions won't appear in ScotiaSwipe for 6 months
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [currentView, setCurrentView] = useState<
    "homepage" | "scotiaswipe" | "yearrecap" | "scotiaWrapped" | "trustedlist"
  >("homepage")
  const [currentIndex, setCurrentIndex] = useState(mockSubscriptions.length - 1)
  const [lastDirection, setLastDirection] = useState<string>()
  const [swipedSubscriptions, setSwipedSubscriptions] = useState<{
    kept: typeof mockSubscriptions
    cancelled: typeof mockSubscriptions
  }>({ kept: [], cancelled: [] })
  const [showResults, setShowResults] = useState(false)

  const [showUnknownModal, setShowUnknownModal] = useState(false)
  const [showSceneModal, setShowSceneModal] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState<(typeof mockSubscriptions)[0] | null>(null)

  const currentIndexRef = useMemo(() => currentIndex, [currentIndex])
  const canGoBack = currentIndex < mockSubscriptions.length - 1
  const canSwipe = currentIndex >= 0

  if (currentView === "homepage") {
    return (
      <ScotiaBankingHomepage
        onLaunchScotiaSwipe={() => setCurrentView("scotiaswipe")}
        onShowYearRecap={() => setCurrentView("yearrecap")}
        onShowScotiaWrapped={() => setCurrentView("scotiaWrapped")}
      />
    )
  }

  if (currentView === "yearrecap") {
    return (
      <YearRecapViewComponent
        onBack={() => setCurrentView("homepage")}
        onManageTrusted={() => setCurrentView("trustedlist")}
      />
    )
  }

  if (currentView === "scotiaWrapped") {
    return (
      <ScotiaWrappedViewComponent
        onBack={() => setCurrentView("homepage")}
        onFinish={() => setCurrentView("yearrecap")}
      />
    )
  }

  if (currentView === "trustedlist") {
    return <TrustedListView onBack={() => setCurrentView("scotiaswipe")} />
  }

  const swiped = (direction: string, subscription: (typeof mockSubscriptions)[0], index: number) => {
    console.log("[v0] Swiped:", direction, subscription.name)
    setLastDirection(direction)

    if (direction === "right") {
      setSwipedSubscriptions((prev) => ({
        ...prev,
        kept: [...prev.kept, subscription],
      }))
      setCurrentIndex(index - 1)
    } else if (direction === "left") {
      // Always immediately add to cancelled list and remove card
      setSwipedSubscriptions((prev) => ({
        ...prev,
        cancelled: [...prev.cancelled, subscription],
      }))
      setCurrentIndex(index - 1)

      // Set current subscription for modal handling
      setCurrentSubscription(subscription)

      // Handle different swipe left scenarios with modals but don't redirect
      if (subscription.isBigCompany) {
        // Big company - no modal, just cancelled
        // Links will be shown in summary page
      } else if (subscription.isKnownPartner) {
        // Scene+ partner - show points loss modal for information only
        setShowSceneModal(true)
      } else {
        // Unknown/small business - show recognition modal for information only
        setShowUnknownModal(true)
      }
    }

    // Show results when all cards are swiped
    if (index === 0) {
      setTimeout(() => setShowResults(true), 500)
    }
  }

  const handleUnknownRecognize = (recognized: boolean) => {
    if (currentSubscription) {
      if (recognized) {
        // Treat as keep
        setSwipedSubscriptions((prev) => ({
          ...prev,
          kept: [...prev.kept, currentSubscription],
        }))
      } else {
        // Treat as cancel with fraud warning
        setSwipedSubscriptions((prev) => ({
          ...prev,
          cancelled: [...prev.cancelled, currentSubscription],
        }))
      }
      setCurrentIndex(currentIndex - 1)
    }
    setShowUnknownModal(false)
    setCurrentSubscription(null)
  }

  const handleSceneConfirm = (confirmed: boolean) => {
    if (currentSubscription) {
      if (confirmed) {
        // Cancel Scene+ partner
        setSwipedSubscriptions((prev) => ({
          ...prev,
          cancelled: [...prev.cancelled, currentSubscription],
        }))
        setCurrentIndex(currentIndex - 1)
      } else {
        // Keep Scene+ partner
        setSwipedSubscriptions((prev) => ({
          ...prev,
          kept: [...prev.kept, currentSubscription],
        }))
        setCurrentIndex(currentIndex - 1)
      }
    }
    setShowSceneModal(false)
    setCurrentSubscription(null)
  }

  const outOfFrame = (name: string, idx: number) => {
    console.log("[v0] Card out of frame:", name, idx)
    currentIndexRef === idx && setCurrentIndex(idx - 1)
  }

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < mockSubscriptions.length) {
      const cardElement = document.querySelector(`[data-testid="card-${currentIndex}"]`) as any
      if (cardElement && cardElement.swipe) {
        await cardElement.swipe(dir)
      }
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    setCurrentIndex(newIndex)
    setLastDirection(undefined)
  }

  const resetStack = () => {
    setCurrentIndex(mockSubscriptions.length - 1)
    setSwipedSubscriptions({ kept: [], cancelled: [] })
    setShowResults(false)
    setLastDirection(undefined)
  }

  const goBackToHomepage = () => {
    setCurrentView("homepage")
    resetStack()
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-900 text-white max-w-sm mx-auto">
        {/* iPhone Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-black">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-medium">11:43</div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
            </div>
            <span className="ml-1">LTE</span>
            <div className="bg-red-500 text-white px-1 rounded text-xs ml-1">96</div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-red-600 px-4 py-6">
          <Button variant="ghost" onClick={goBackToHomepage} className="mb-4 text-white hover:bg-white/10 p-2">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Scotia Banking
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">ScotiaSwipe Results</h1>
          <p className="text-red-100">Here's what you decided this month</p>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Keeping ({swipedSubscriptions.kept.length})
            </h2>
            <div className="space-y-2">
              {swipedSubscriptions.kept.map((sub) => (
                <Card key={sub.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={sub.logo || "/placeholder.svg"} alt={sub.name} className="w-8 h-8 rounded" />
                        <span className="font-medium text-white">{sub.name}</span>
                      </div>
                      <Badge className="bg-red-600 text-white">${sub.cost}/mo</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-red-500" />
              Cancelled ({swipedSubscriptions.cancelled.length})
            </h2>
            <div className="space-y-2">
              {swipedSubscriptions.cancelled.map((sub) => (
                <Card key={sub.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={sub.logo || "/placeholder.svg"} alt={sub.name} className="w-8 h-8 rounded" />
                        <span className="font-medium text-white">{sub.name}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">${sub.cost}/mo</Badge>
                        {sub.isBigCompany && (
                          <div className="text-xs text-blue-400 mt-1">
                            <a
                              href={bigKnownCompanies.find((c) => c.name === sub.name)?.unsubscribeUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-blue-300"
                            >
                              Cancel subscription
                            </a>
                          </div>
                        )}
                        {!sub.isKnownPartner && !sub.isBigCompany && (
                          <div className="text-xs text-gray-400 mt-1 space-y-1">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <a
                                href="https://www.scotiabank.com/ca/en/personal/contact-us/report-fraud.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-gray-300"
                              >
                                Report Fraud: 1-800-4SCOTIA
                              </a>
                            </div>
                          </div>
                        )}
                        {sub.isKnownPartner && <div className="text-xs text-yellow-400 mt-1">Scene+ Partner ✓</div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-lg font-semibold text-white mb-2">
              Monthly Savings: ${swipedSubscriptions.cancelled.reduce((sum, sub) => sum + sub.cost, 0).toFixed(2)}
            </p>
            <Button onClick={resetStack} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Review Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white max-w-sm mx-auto">
      {/* iPhone Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-medium">11:43</div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
          <span className="ml-1">LTE</span>
          <div className="bg-red-500 text-white px-1 rounded text-xs ml-1">96</div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-red-600 px-4 py-6">
        <Button variant="ghost" onClick={goBackToHomepage} className="mb-4 text-white hover:bg-white/10 p-2">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Scotia Banking
        </Button>
        <h1 className="text-4xl font-bold text-white mb-2">ScotiaSwipe</h1>
        <p className="text-red-100">Swipe right to keep, left to cancel</p>
        <p className="text-sm text-red-200 mt-1">
          {currentIndex + 1} of {mockSubscriptions.length} subscriptions
        </p>
      </div>

      {/* Card Stack */}
      <div className="relative h-96 mx-auto mb-8 px-4">
        {mockSubscriptions.map((subscription, index) => (
          <TinderCard
            key={subscription.id}
            onSwipe={(dir) => swiped(dir, subscription, index)}
            onCardLeftScreen={() => outOfFrame(subscription.name, index)}
            preventSwipe={["up", "down"]}
            swipeThreshold={80}
            swipeRequirementType="position"
            data-testid={`card-${index}`}
            className="absolute inset-0"
          >
            <Card className="h-full w-full cursor-grab active:cursor-grabbing shadow-lg border-2 bg-gray-800 border-gray-700 text-white">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="text-center">
                  <img
                    src={subscription.logo || "/placeholder.svg"}
                    alt={subscription.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">{subscription.name}</h2>
                  <div className="text-3xl font-bold text-red-400 mb-4">
                    ${subscription.cost}
                    <span className="text-sm text-gray-400">/month</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {subscription.flags.includes("suspicious") && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Suspicious
                      </Badge>
                    )}
                    {subscription.flags.includes("price_increase") && (
                      <Badge className="text-xs bg-yellow-600 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Price ↑ ${subscription.previousCost} → ${subscription.cost}
                      </Badge>
                    )}
                    {subscription.flags.includes("new_transaction") && (
                      <Badge className="text-xs bg-blue-600 text-white">
                        <Plus className="w-3 h-3 mr-1" />
                        New This Month
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{subscription.description}</p>

                  {subscription.isKnownPartner && (
                    <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-lg mb-2">
                      <Badge className="mb-2 bg-white text-red-600">✨ Scene+ Partner ✨</Badge>
                      <p className="text-xs">Earn {subscription.scenePointsMonthly} Scene+ points monthly!</p>
                    </div>
                  )}

                  {subscription.flags.includes("suspicious") && (
                    <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded">
                      ⚠️ Unrecognized subscription - potential fraud?
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TinderCard>
        ))}
      </div>

      {/* Bottom Action Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8">
        <Button
          onClick={() => {
            console.log("[v0] Left button clicked, attempting swipe left")
            if (currentIndex < mockSubscriptions.length) {
              swipe("left")
            }
          }}
          disabled={!canSwipe}
          className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white border-2 border-red-400"
        >
          <X className="w-7 h-7" />
        </Button>
        <Button
          onClick={() => {
            console.log("[v0] Right button clicked, attempting swipe right")
            if (currentIndex < mockSubscriptions.length) {
              swipe("right")
            }
          }}
          disabled={!canSwipe}
          className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white border-2 border-green-400"
        >
          <Heart className="w-7 h-7" />
        </Button>
      </div>

      {/* Unknown Subscription Modal */}
      <Dialog open={showUnknownModal} onOpenChange={setShowUnknownModal}>
        <DialogContent className="max-w-xs mx-auto bg-gray-800 border-gray-700 text-white p-3">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-sm">Do you recognize this subscription?</DialogTitle>
          </DialogHeader>
          <div className="text-center py-1">
            {currentSubscription && (
              <>
                <img
                  src={currentSubscription.logo || "/placeholder.svg"}
                  alt={currentSubscription.name}
                  className="w-10 h-10 mx-auto mb-2 rounded-lg"
                />
                <h3 className="font-bold text-sm mb-1 text-white">{currentSubscription.name}</h3>
                <p className="text-gray-400 text-xs mb-2">${currentSubscription.cost}/month</p>
              </>
            )}
          </div>
          <DialogFooter className="flex-col gap-2">
            <div className="flex gap-2 w-full">
              <Button
                onClick={() => handleUnknownRecognize(true)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 text-xs h-7"
              >
                Yes, I recognize this
              </Button>
              <Button
                onClick={() => handleUnknownRecognize(false)}
                variant="destructive"
                className="flex-1 py-1 text-xs h-7"
              >
                No, this looks suspicious
              </Button>
            </div>
            <div className="text-xs text-center text-gray-400 mt-2 p-2 bg-gray-900 rounded">
              <Phone className="w-3 h-3 inline mr-1" />
              <div className="text-xs">
                Fraud Dept: <span className="font-mono">1-800-4SCOTIA (1-800-472-6842)</span>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scene+ Modal */}
      <Dialog open={showSceneModal} onOpenChange={setShowSceneModal}>
        <DialogContent className="max-w-xs mx-auto bg-gray-800 border-gray-700 text-white p-3">
          <DialogHeader>
            <DialogTitle className="text-white text-center text-sm">Cancel Scene+ Partner?</DialogTitle>
          </DialogHeader>
          <div className="text-center py-1">
            {currentSubscription && (
              <>
                <img
                  src={currentSubscription.logo || "/placeholder.svg"}
                  alt={currentSubscription.name}
                  className="w-8 h-8 mx-auto mb-2 rounded"
                />
                <h3 className="font-bold text-sm mb-2 text-white">{currentSubscription.name}</h3>
                <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-1.5 rounded text-xs mb-2 max-w-48 mx-auto">
                  <p className="text-xs">You'll lose</p>
                  <p className="text-sm font-bold">{currentSubscription.scenePointsMonthly} Scene+ points</p>
                  <p className="text-xs">
                    per month (${(currentSubscription.scenePointsMonthly! * 0.01).toFixed(2)} value)
                  </p>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="flex flex-col gap-2 items-start">
            <Button onClick={() => handleSceneConfirm(true)} variant="destructive" className="w-32 h-8 text-xs">
              Yes, cancel subscription
            </Button>
            <Button
              onClick={() => handleSceneConfirm(false)}
              className="w-32 h-8 bg-red-600 hover:bg-red-700 text-white text-xs"
            >
              Keep my Scene+ points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
