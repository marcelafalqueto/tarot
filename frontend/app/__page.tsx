'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, Moon, Star } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const tarotCards = [
  { name: "The Fool", meaning: "New beginnings, innocence, adventure" },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, power" },
  { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine" },
  { name: "The Empress", meaning: "Fertility, femininity, beauty, nature" },
  { name: "The Emperor", meaning: "Authority, establishment, structure, father figure" },
  { name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs, conformity" },
  { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment" },
  { name: "The Chariot", meaning: "Control, willpower, success, determination" },
  { name: "Strength", meaning: "Strength, courage, persuasion, influence" },
  { name: "The Hermit", meaning: "Soul searching, introspection, inner guidance" },
  { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny" },
  { name: "Justice", meaning: "Justice, fairness, truth, cause and effect" },
  { name: "The Hanged Man", meaning: "Suspension, restriction, letting go" },
  { name: "Death", meaning: "Endings, beginnings, change, transformation" },
  { name: "Temperance", meaning: "Balance, moderation, patience, purpose" },
  { name: "The Devil", meaning: "Bondage, addiction, sexuality, materialism" },
  { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation" },
  { name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality" },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition" },
  { name: "The Sun", meaning: "Positivity, fun, warmth, success, vitality" },
  { name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution" },
  { name: "The World", meaning: "Completion, integration, accomplishment, travel" }
]

const tarotResponses = [
  "The cards whisper of a transformative journey ahead...",
  "I see shifting energies surrounding you...",
  "The universe is aligning to bring you clarity...",
  "Your spiritual guides have much to reveal...",
  "The veil between worlds grows thin, and wisdom flows through..."
]

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome, seeker. I am Luna, your mystical guide through the realm of tarot. The cards are ready to reveal their secrets to you. What wisdom do you seek today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateTarotReading = () => {
    if (isReading) return

    setIsReading(true)
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: "Please draw a card for me and provide guidance.",
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false)
      
      // Select random card and response
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
      const randomResponse = tarotResponses[Math.floor(Math.random() * tarotResponses.length)]
      
      const readerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `${randomResponse}\n\n🔮 **${randomCard.name}** 🔮\n\n${randomCard.meaning}\n\nThis card speaks to your current path. Take time to reflect on how this energy manifests in your life. The cards have chosen to reveal this message for a reason - trust in their ancient wisdom.`,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, readerMessage])
      setIsReading(false)
    }, 2000 + Math.random() * 2000) // Random delay between 2-4 seconds
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 relative overflow-hidden">
      {/* Mystical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-purple-200 animate-pulse">
          <Star size={24} />
        </div>
        <div className="absolute top-40 right-20 text-indigo-200 animate-pulse" style={{ animationDelay: '1s' }}>
          <Moon size={20} />
        </div>
        <div className="absolute bottom-40 left-20 text-pink-200 animate-pulse" style={{ animationDelay: '2s' }}>
          <Sparkles size={18} />
        </div>
        <div className="absolute bottom-20 right-10 text-purple-200 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Star size={16} />
        </div>
        <div className="absolute top-1/2 left-1/4 text-indigo-100 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Sparkles size={14} />
        </div>
        <div className="absolute top-1/3 right-1/3 text-pink-100 animate-pulse" style={{ animationDelay: '3s' }}>
          <Moon size={22} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Moon className="text-purple-600" size={32} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Mystic Luna
            </h1>
            <Star className="text-purple-600" size={32} />
          </div>
          <p className="text-purple-700 text-lg font-medium">
            Your Personal Tarot Reader
          </p>
        </div>

        {/* Chat Container */}
        <Card className="h-[70vh] bg-white/80 backdrop-blur-sm border border-purple-200 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white ml-4'
                        : 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-900 mr-4 border border-purple-100'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {message.text.split('**').map((part, index) => 
                        index % 2 === 0 ? (
                          <span key={index}>{part}</span>
                        ) : (
                          <strong key={index} className="font-bold text-purple-700">{part}</strong>
                        )
                      )}
                    </div>
                    <div className={`text-xs mt-2 ${message.isUser ? 'text-purple-100' : 'text-purple-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-900 mr-4 border border-purple-100 p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <span>Luna is consulting the cards</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-purple-100">
              <div className="flex items-center gap-4">
                <Button
                  onClick={generateTarotReading}
                  disabled={isReading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                >
                  <Sparkles className="mr-2" size={20} />
                  {isReading ? 'Reading the Cards...' : 'Draw a Tarot Card'}
                </Button>
              </div>
              <p className="text-center text-purple-600 text-sm mt-3">
                Click to receive mystical guidance from the ancient tarot
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-600 text-sm">
            ✨ The cards reveal what the heart already knows ✨
          </p>
        </div>
      </div>
    </div>
  )
}