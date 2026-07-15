import { Box, Stack, Typography } from '@mui/material'
import ChatWindow from '../components/ChatWindow'
import CartDrawer from '../components/CartDrawer'

export default function OrderingPage() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="baseline" spacing={1.5}>
          <Typography sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>
            Spice Route
          </Typography>
          <Typography variant="caption" className="eyebrow">
            AI Ordering Assistant
          </Typography>
        </Stack>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ flexGrow: 1, minHeight: 0 }}>
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <ChatWindow />
        </Box>
        <CartDrawer />
      </Stack>
    </Box>
  )
}
