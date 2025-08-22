// chat/chat.types.ts
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  messages: ChatMessage[];
  updatedAt: Date;
  // Session-related fields
  sessionId?: string;
  agentId?: string;
}
