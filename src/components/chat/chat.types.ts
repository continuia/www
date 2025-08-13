export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: Date;
}
