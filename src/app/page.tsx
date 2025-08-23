"use client"

import { useState, useMemo } from "react"
import TinderCard from "react-tinder-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, RotateCcw, Phone, ChevronRight, Search } from "lucide-react"

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

const mockSubscriptions = [
  {
    id: 1,
    name: "Netflix",
    cost: 16.99,
    description: 'Your monthly dose of "I\'ll just watch one more episode" lies',
    isKnownPartner: false,
    logo: "/netflix-inspired-logo.png",
  },
  {
    id: 2,
    name: "Spotify Premium",
    cost: 10.99,
    description: "Because ads between your sad songs hit different",
    isKnownPartner: false,
    logo: "/spotify-logo.png",
  },
  {
    id: 3,
    name: "Sobeys Delivery",
    cost: 9.99,
    description: "Groceries delivered while you binge Netflix",
    isKnownPartner: true,
    logo: "/sobeys-logo.png",
  },
  {
    id: 4,
    name: "Disney+",
    cost: 11.99,
    description: "Adulting is hard, let's watch cartoons instead",
    isKnownPartner: false,
    logo: "/disney-plus-logo.png",
  },
  {
    id: 5,
    name: "MysteryApp Pro",
    cost: 29.99,
    description: "Wait... what is this? When did I sign up for this?",
    isKnownPartner: false,
    logo: "/mysterious-app-icon.png",
  },
  {
    id: 6,
    name: "Home Hardware Plus",
    cost: 4.99,
    description: "For all your DIY disasters and weekend projects",
    isKnownPartner: true,
    logo: "/home-hardware-logo.png",
  },
]

function ScotiaBankingHomepage({ onLaunchScotiaSwipe }: { onLaunchScotiaSwipe: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-red-600">
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
      <div className="bg-red-600 px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white font-bold text-xl">S</div>
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
            <Button
              onClick={onLaunchScotiaSwipe}
              className="w-full bg-white text-red-600 hover:bg-gray-100 font-medium"
            >
              Start Swiping
            </Button>
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
                  <span className="text-xs">+</span>
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
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
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

export default function App() {
  const [currentView, setCurrentView] = useState<"homepage" | "scotiaswipe">("homepage")
  const [currentIndex, setCurrentIndex] = useState(mockSubscriptions.length - 1)
  const [lastDirection, setLastDirection] = useState<string>()
  const [swipedSubscriptions, setSwipedSubscriptions] = useState<{
    kept: typeof mockSubscriptions
    cancelled: typeof mockSubscriptions
  }>({ kept: [], cancelled: [] })
  const [showResults, setShowResults] = useState(false)

  const currentIndexRef = useMemo(() => currentIndex, [currentIndex])
  const canGoBack = currentIndex < mockSubscriptions.length - 1
  const canSwipe = currentIndex >= 0

  if (currentView === "homepage") {
    return <ScotiaBankingHomepage onLaunchScotiaSwipe={() => setCurrentView("scotiaswipe")} />
  }

  const swiped = (direction: string, subscription: (typeof mockSubscriptions)[0], index: number) => {
    console.log("[v0] Swiped:", direction, subscription.name)
    setLastDirection(direction)
    setCurrentIndex(index - 1)

    if (direction === "right") {
      setSwipedSubscriptions((prev) => ({
        ...prev,
        kept: [...prev.kept, subscription],
      }))
    } else if (direction === "left") {
      setSwipedSubscriptions((prev) => ({
        ...prev,
        cancelled: [...prev.cancelled, subscription],
      }))
    }

    // Show results when all cards are swiped
    if (index === 0) {
      setTimeout(() => setShowResults(true), 500)
    }
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
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={goBackToHomepage}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              ← Back to Scotia Banking
            </Button>
            <h1 className="text-3xl font-bold text-primary mb-2">ScotiaSwipe Results</h1>
            <p className="text-muted-foreground">Here's what you decided this month</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Keeping ({swipedSubscriptions.kept.length})
              </h2>
              <div className="space-y-2">
                {swipedSubscriptions.kept.map((sub) => (
                  <Card key={sub.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={sub.logo || "/placeholder.svg"} alt={sub.name} className="w-8 h-8 rounded" />
                        <span className="font-medium">{sub.name}</span>
                      </div>
                      <Badge variant="secondary">${sub.cost}/mo</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                Cancelled ({swipedSubscriptions.cancelled.length})
              </h2>
              <div className="space-y-2">
                {swipedSubscriptions.cancelled.map((sub) => (
                  <Card key={sub.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={sub.logo || "/placeholder.svg"} alt={sub.name} className="w-8 h-8 rounded" />
                        <span className="font-medium">{sub.name}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">${sub.cost}/mo</Badge>
                        {!sub.isKnownPartner && (
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            Fraud: 1-800-4SCOTIA
                          </div>
                        )}
                        {sub.isKnownPartner && (
                          <div className="text-xs text-accent-foreground mt-1">Scene+ Partner ✓</div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-lg font-semibold text-foreground mb-2">
                Monthly Savings: ${swipedSubscriptions.cancelled.reduce((sum, sub) => sum + sub.cost, 0).toFixed(2)}
              </p>
              <Button onClick={resetStack} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Review Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <Button variant="ghost" onClick={goBackToHomepage} className="mb-4 text-muted-foreground hover:text-foreground">
          ← Back to Scotia Banking
        </Button>
        <h1 className="text-4xl font-bold text-primary mb-2">ScotiaSwipe</h1>
        <p className="text-muted-foreground">Swipe right to keep, left to cancel</p>
        <p className="text-sm text-muted-foreground mt-1">
          {currentIndex + 1} of {mockSubscriptions.length} subscriptions
        </p>
      </div>

      {/* Card Stack */}
      <div className="relative h-96 max-w-sm mx-auto mb-8">
        {mockSubscriptions.map((subscription, index) => (
          <TinderCard
            key={subscription.id}
            onSwipe={(dir) => swiped(dir, subscription, index)}
            onCardLeftScreen={() => outOfFrame(subscription.name, index)}
            preventSwipe={["up", "down"]}
            data-testid={`card-${index}`}
            className="absolute inset-0"
          >
            <Card className="h-full w-full cursor-grab active:cursor-grabbing shadow-lg border-2">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="text-center">
                  <img
                    src={subscription.logo || "/placeholder.svg"}
                    alt={subscription.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                  <h2 className="text-2xl font-bold text-foreground mb-2">{subscription.name}</h2>
                  <div className="text-3xl font-bold text-primary mb-4">
                    ${subscription.cost}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{subscription.description}</p>

                  {subscription.isKnownPartner && (
                    <Badge variant="secondary" className="mb-2">
                      Scene+ Partner ✓
                    </Badge>
                  )}

                  {!subscription.isKnownPartner && subscription.cost > 0 && (
                    <div className="text-xs text-muted-foreground">Unknown subscription - potential fraud?</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TinderCard>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 px-4 mb-8">
        <Button
          variant="destructive"
          size="lg"
          onClick={() => swipe("left")}
          disabled={!canSwipe}
          className="rounded-full w-16 h-16"
        >
          <X className="w-6 h-6" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={goBack}
          disabled={!canGoBack}
          className="rounded-full w-16 h-16 bg-transparent"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>

        <Button
          variant="default"
          size="lg"
          onClick={() => swipe("right")}
          disabled={!canSwipe}
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90"
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center px-4 text-sm text-muted-foreground">
        <p>Swipe or tap the buttons to manage your subscriptions</p>
        <p className="mt-1">❤️ Keep • ✕ Cancel • ↻ Undo</p>
      </div>
    </div>
  )
}
