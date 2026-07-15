import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'

export default function DishCard({ dish, onAdd }) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 220,
        maxWidth: 220,
        borderColor: 'rgba(243,236,224,0.14)',
        bgcolor: 'background.paper',
        flexShrink: 0,
      }}
    >
      <CardActionArea onClick={() => onAdd?.(dish)} sx={{ p: 1.5, height: '100%' }}>
        <Stack spacing={0.75} sx={{ height: '100%' }}>
          <Typography
            variant="subtitle2"
            sx={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.25 }}
          >
            {dish.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}>
            {dish.description}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 0.5 }}>
            <Typography variant="body2" sx={{ fontFamily: 'var(--font-mono)', color: 'primary.main' }}>
              ₹{dish.price.toFixed(0)}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {dish.is_vegetarian && (
                <EnergySavingsLeafIcon sx={{ fontSize: 16, color: 'secondary.main' }} titleAccess="Vegetarian" />
              )}
              {dish.spice_level > 0 && (
                <Stack direction="row" spacing={-0.3}>
                  {Array.from({ length: dish.spice_level }).map((_, i) => (
                    <LocalFireDepartmentIcon key={i} sx={{ fontSize: 15, color: 'error.main' }} />
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
