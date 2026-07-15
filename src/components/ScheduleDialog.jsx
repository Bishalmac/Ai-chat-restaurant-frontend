import { Box, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useCart } from '../context/CartContext'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function ScheduleDialog() {
  const {
    fulfillmentType,
    setFulfillmentType,
    scheduledDate,
    setScheduledDate,
    scheduledTime,
    setScheduledTime,
    deliveryAddress,
    setDeliveryAddress,
  } = useCart()

  return (
    <Stack spacing={1.25}>
      <Typography variant="caption" className="eyebrow" sx={{ color: 'var(--text-muted)' }}>
        Schedule
      </Typography>

      <ToggleButtonGroup
        exclusive
        fullWidth
        size="small"
        value={fulfillmentType}
        onChange={(e, val) => val && setFulfillmentType(val)}
      >
        <ToggleButton value="delivery">Delivery</ToggleButton>
        <ToggleButton value="pickup">Pickup</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction="row" spacing={1}>
        <TextField
          type="date"
          size="small"
          fullWidth
          label="Date"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today() }}
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
        />
        <TextField
          type="time"
          size="small"
          fullWidth
          label="Time"
          InputLabelProps={{ shrink: true }}
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
        />
      </Stack>

      {fulfillmentType === 'delivery' && (
        <TextField
          size="small"
          fullWidth
          label="Delivery address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      )}
    </Stack>
  )
}
