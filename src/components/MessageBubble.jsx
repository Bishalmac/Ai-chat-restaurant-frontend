import { Box, Typography } from '@mui/material'

export default function MessageBubble({ role, text, isError }) {
  const isUser = role === 'user'
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          maxWidth: '78%',
          px: 2,
          py: 1.25,
          borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          bgcolor: isUser ? 'primary.main' : 'background.paper',
          color: isUser ? 'primary.contrastText' : isError ? 'error.main' : 'text.primary',
          border: isUser ? 'none' : '1px solid rgba(243,236,224,0.12)',
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  )
}
