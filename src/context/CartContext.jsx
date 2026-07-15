import React, { createContext, useContext, useMemo, useState } from 'react'
import { placeOrder as placeOrderApi } from '../services/api'
import { useChat } from './ChatContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { sessionId, cart, setCart } = useChat()

  const [selectedOutlet, setSelectedOutlet] = useState(null)
  const [fulfillmentType, setFulfillmentType] = useState('delivery')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [lastOrder, setLastOrder] = useState(null)
  const [isPlacing, setIsPlacing] = useState(false)
  const [placeError, setPlaceError] = useState(null)

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.line_total, 0),
    [cart],
  )

  const canPlaceOrder =
    cart.length > 0 &&
    !!selectedOutlet &&
    !!scheduledDate &&
    !!scheduledTime &&
    (fulfillmentType === 'pickup' || deliveryAddress.trim().length > 0)

  async function placeOrder() {
    if (!canPlaceOrder) return
    setIsPlacing(true)
    setPlaceError(null)
    try {
      const order = await placeOrderApi({
        session_id: sessionId,
        outlet_id: selectedOutlet.id,
        fulfillment_type: fulfillmentType,
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        delivery_address: fulfillmentType === 'delivery' ? deliveryAddress : undefined,
      })
      setLastOrder(order)
      setCart([])
      return order
    } catch (err) {
      setPlaceError(err?.response?.data?.detail || 'Could not place the order — please try again.')
    } finally {
      setIsPlacing(false)
    }
  }

  const value = {
    cart,
    subtotal,
    selectedOutlet,
    setSelectedOutlet,
    fulfillmentType,
    setFulfillmentType,
    scheduledDate,
    setScheduledDate,
    scheduledTime,
    setScheduledTime,
    deliveryAddress,
    setDeliveryAddress,
    canPlaceOrder,
    placeOrder,
    isPlacing,
    placeError,
    lastOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
