import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import { useCart } from '../context/CartContext'

export default function OutletList({ outlets }) {
  const { selectedOutlet, setSelectedOutlet } = useCart()

  if (!outlets?.length) return null

  return (
    <Stack spacing={1} sx={{ my: 1 }}>
      {outlets.map((outlet) => {
        const isSelected = selectedOutlet?.id === outlet.id
        return (
          <Box
            key={outlet.id}
            onClick={() => setSelectedOutlet(outlet)}
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: isSelected ? 'primary.main' : 'rgba(243,236,224,0.14)',
              bgcolor: isSelected ? 'rgba(227,160,8,0.08)' : 'background.paper',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {outlet.name}
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.25 }}>
                  <PlaceIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {outlet.address} · {outlet.distance_km} km
                  </Typography>
                </Stack>
              </Box>
              <Chip
                size="small"
                label={outlet.is_open ? 'Open' : 'Closed'}
                sx={{
                  bgcolor: outlet.is_open ? 'rgba(47,110,95,0.25)' : 'rgba(193,64,31,0.2)',
                  color: outlet.is_open ? 'secondary.main' : 'error.main',
                  fontWeight: 600,
                  height: 20,
                }}
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              ~{outlet.eta_minutes} min · {outlet.supports_delivery ? 'Delivery' : ''}
              {outlet.supports_delivery && outlet.supports_pickup ? ' & ' : ''}
              {outlet.supports_pickup ? 'Pickup' : ''}
            </Typography>
          </Box>
        )
      })}
    </Stack>
  )
}
