import { Box, Paper, Typography, Avatar } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import type { ChatMessage as ChatMessageType } from './chat.types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <Box 
      display="flex" 
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      mb={2}
    >
      <Box 
        display="flex" 
        alignItems="flex-start" 
        gap={1.5}
        maxWidth="70%"
        flexDirection={isUser ? 'row-reverse' : 'row'}
      >
        <Avatar sx={{ 
          width: 32, 
          height: 32,
          backgroundColor: isUser ? 'var(--primary-600)' : 'var(--neutral-200)',
          color: isUser ? 'var(--text-inverse)' : 'var(--text-primary)',
        }}>
          {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
        </Avatar>
        
        <Paper sx={{
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: isUser ? 'var(--primary-500)' : 'var(--bg-secondary)',
          color: isUser ? 'var(--text-inverse)' : 'var(--text-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {message.content}
          </Typography>
          
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: 'var(--text-xs)',
              opacity: 0.7,
              display: 'block',
              mt: 0.5,
            }}
          >
            {message.timestamp.toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatMessage;
