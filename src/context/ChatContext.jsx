import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { sendChatMessage } from '../services/api'

const ChatContext = createContext(null)

function makeSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2, 11)
}

export function ChatProvider({ children }) {
  const [sessionId] = useState(makeSessionId)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm your Spice Route ordering assistant. Tell me what you're craving.",
    },
  ])
  const [dishes, setDishes] = useState([])
  const [outlets, setOutlets] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [cart, setCart] = useState([])
  const [requiresLocation, setRequiresLocation] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const sendMessage = useCallback(
    async (text, coords) => {
      if (!text.trim()) return
      setMessages((prev) => [...prev, { role: 'user', text }])
      setIsSending(true)
      try {
        const response = await sendChatMessage({
          sessionId,
          message: text,
          latitude: coords?.latitude,
          longitude: coords?.longitude,
        })
        setMessages((prev) => [...prev, { role: 'assistant', text: response.reply }])
        setDishes(response.dishes || [])
        setOutlets(response.outlets || [])
        setRecommendations(response.recommendations || [])
        setCart(response.cart || [])
        setRequiresLocation(!!response.requires_location)
        return response
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: "Sorry, I couldn't reach the kitchen — please try again.", isError: true },
        ])
      } finally {
        setIsSending(false)
      }
    },
    [sessionId],
  )

  const value = useMemo(
    () => ({
      sessionId,
      messages,
      dishes,
      outlets,
      recommendations,
      cart,
      setCart,
      requiresLocation,
      isSending,
      sendMessage,
    }),
    [sessionId, messages, dishes, outlets, recommendations, cart, requiresLocation, isSending, sendMessage],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within a ChatProvider')
  return ctx
}
