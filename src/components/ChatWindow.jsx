import { useEffect, useRef, useState } from 'react'
import { Box, Button, IconButton, Stack, TextField, Typography, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import MessageBubble from './MessageBubble'
import DishCard from './DishCard'
import OutletList from './OutletList'
import { useChat } from '../context/ChatContext'
import { useGeolocation } from '../hooks/useGeolocation'

export default function ChatWindow() {
  const { messages, dishes, outlets, recommendations, requiresLocation, isSending, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const { coords, status, request } = useGeolocation()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, dishes, outlets])

  useEffect(() => {
    // Once location is granted after being requested, auto re-send the intent.
    if (status === 'granted' && requiresLocation && coords) {
      sendMessage('find outlets near me', coords)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  function handleSend() {
    if (!input.trim() || isSending) return
    sendMessage(input, coords)
    setInput('')
  }

  function handleAddDish(dish) {
    sendMessage(`add ${dish.name}`, coords)
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <Box ref={scrollRef} sx={{ flexGrow: 1, overflowY: 'auto', px: { xs: 2, md: 3 }, py: 2 }}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} isError={m.isError} />
        ))}

        {dishes.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1.25, overflowX: 'auto', pb: 1, mb: 1 }}>
            {dishes.map((d) => (
              <DishCard key={d.id} dish={d} onAdd={handleAddDish} />
            ))}
          </Box>
        )}

        {recommendations.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" className="eyebrow">
              Goes well with your order
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.25, overflowX: 'auto', pt: 0.75 }}>
              {recommendations.map((d) => (
                <DishCard key={d.id} dish={d} onAdd={handleAddDish} />
              ))}
            </Box>
          </Box>
        )}

        {outlets.length > 0 && <OutletList outlets={outlets} />}

        {requiresLocation && (
          <Button
            startIcon={<MyLocationIcon />}
            variant="outlined"
            size="small"
            onClick={request}
            disabled={status === 'pending'}
            sx={{ mt: 0.5 }}
          >
            {status === 'pending' ? 'Locating…' : 'Share my location'}
          </Button>
        )}

        {isSending && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1, ml: 0.5 }}>
            <CircularProgress size={14} sx={{ color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Thinking…
            </Typography>
          </Stack>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="I want a spicy grilled chicken burger under ₹400…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend} disabled={isSending || !input.trim()}>
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  )
}
