import { ChatProvider } from './context/ChatContext'
import { CartProvider } from './context/CartContext'
import OrderingPage from './pages/OrderingPage'

export default function App() {
  return (
    <ChatProvider>
      <CartProvider>
        <OrderingPage />
      </CartProvider>
    </ChatProvider>
  )
}
