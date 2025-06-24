'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, Moon, Star } from 'lucide-react'
import axios from 'axios'
import { set } from 'date-fns'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}



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


  const fetchDrawCard = async () => {

    try {
      setIsReading(true)
      setIsTyping(true)
      const response = await axios.get('http://127.0.0.1:8000/leitura')


      const readerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `${response.data}\n\n🔮 \n\nThis card speaks to your current path. Take some time to reflect on how this energy manifests in your life. The cards chose to reveal this message for a reason: to trust your ancient wisdom.`,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, readerMessage])

      setIsReading(false)
      setIsTyping(false)
      scrollToBottom()
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    scrollToBottom()
  }, [messages])




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
                    className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${message.isUser
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
                  onClick={fetchDrawCard}

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