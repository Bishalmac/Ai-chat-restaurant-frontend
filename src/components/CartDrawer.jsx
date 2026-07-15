import { useState } from 'react'
import {
  Box, Button, Drawer, IconButton, Stack, Typography, useMediaQuery, Alert, Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleDialog from './ScheduleDialog'
import { useCart } from '../context/CartContext'

function TicketContent() {
  const {
    cart, subtotal, selectedOutlet, canPlaceOrder, placeOrder, isPlacing, placeError, lastOrder,
  } = useCart()

  if (lastOrder) {
    return (
      <Box className="ticket" sx={{ p: 2.5 }}>
        <Stack spacing={1} alignItems="center" sx={{ py: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 36, color: 'var(--accent-teal)' }} />
          <Typography sx={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20 }}>
            Order placed
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            #{lastOrder.id.slice(0, 8)}
          </Typography>
        </Stack>
        <Divider sx={{ borderColor: 'var(--paper-line)', my: 1.5 }} />
        {lastOrder.items.map((line) => (
          <Box className="ticket-row" key={line.menu_item_id} sx={{ mb: 0.5 }}>
            <span className="name">{line.quantity}× {line.name}</span>
            <span className="leader" />
            <span>₹{line.line_total.toFixed(2)}</span>
          </Box>
        ))}
        <Divider sx={{ borderColor: 'var(--paper-line)', my: 1.5 }} />
        <Box className="ticket-row" sx={{ fontWeight: 700 }}>
          <span className="name">Total</span>
          <span className="leader" />
          <span>₹{lastOrder.total.toFixed(2)}</span>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'var(--text-muted)' }}>
          {lastOrder.outlet_name} · {lastOrder.fulfillment_type} · {lastOrder.scheduled_date} at {lastOrder.scheduled_time}
        </Typography>
      </Box>
    )
  }

  return (
    <Box className="ticket" sx={{ p: 2.5 }}>
      <Typography className="eyebrow" sx={{ color: 'var(--text-muted)' }}>
        Order Ticket
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'var(--text-muted)', py: 3, textAlign: 'center' }}>
          Your ticket is empty. Ask the assistant for something tasty.
        </Typography>
      ) : (
        <Stack spacing={0.75} sx={{ mt: 1.5 }}>
          {cart.map((line) => (
            <Box key={line.menu_item_id}>
              <Box className="ticket-row">
                <span className="name">{line.quantity}× {line.name}</span>
                <span className="leader" />
                <span>₹{line.line_total.toFixed(2)}</span>
              </Box>
              {line.customizations?.length > 0 && (
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', pl: 1.5 }}>
                  {line.customizations.join(', ')}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      )}

      <Divider sx={{ borderColor: 'var(--paper-line)', my: 1.5 }} />

      <Box className="ticket-row" sx={{ fontWeight: 700 }}>
        <span className="name">Subtotal</span>
        <span className="leader" />
        <span>₹{subtotal.toFixed(2)}</span>
      </Box>

      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'var(--text-muted)' }}>
        {selectedOutlet ? selectedOutlet.name : 'No outlet selected yet'}
      </Typography>

      {cart.length > 0 && (
        <>
          <Divider sx={{ borderColor: 'var(--paper-line)', my: 1.5 }} />
          <ScheduleDialog />
        </>
      )}

      {placeError && (
        <Alert severity="error" sx={{ mt: 1.5 }}>
          {placeError}
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={!canPlaceOrder || isPlacing}
        onClick={placeOrder}
        sx={{ mt: 2 }}
      >
        {isPlacing ? 'Placing order…' : 'Place order'}
      </Button>
    </Box>
  )
}

export default function CartDrawer() {
  const isMobile = useMediaQuery('(max-width:900px)')
  const [open, setOpen] = useState(false)
  const { cart, subtotal } = useCart()

  if (!isMobile) {
    return (
      <Box sx={{ width: 340, flexShrink: 0, p: 2, overflowY: 'auto' }}>
        <TicketContent />
      </Box>
    )
  }

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10,
          bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider',
          px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <ReceiptLongIcon fontSize="small" />
          <Typography variant="body2">{cart.length} item{cart.length !== 1 ? 's' : ''}</Typography>
        </Stack>
        <Typography variant="body2" sx={{ fontFamily: 'var(--font-mono)' }}>
          ₹{subtotal.toFixed(2)}
        </Typography>
      </Box>
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, maxHeight: '85vh', overflowY: 'auto' }}>
          <IconButton onClick={() => setOpen(false)} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
          <TicketContent />
        </Box>
      </Drawer>
    </>
  )
}
