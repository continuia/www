import { useState, useCallback } from 'react';
import type { ChatMessage, ChatConversation } from '../chat.types';

export const useChat = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  const createNewConversation = useCallback(() => {
    const newConversation: ChatConversation = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      updatedAt: new Date(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    
    return newConversation.id;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversationId) return;
    
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message immediately
    setConversations(prev => prev.map(conv => 
      conv.id === currentConversationId 
        ? { ...conv, messages: [...conv.messages, userMessage], updatedAt: new Date() }
        : conv
    ));

    setIsLoading(true);

    try {
      // Simulate API call - replace with your actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: `This is a simulated response to: "${content}"`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { ...conv, messages: [...conv.messages, assistantMessage], updatedAt: new Date() }
          : conv
      ));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentConversationId]);

  return {
    conversations,
    currentConversation,
    isLoading,
    createNewConversation,
    setCurrentConversationId,
    sendMessage,
  };
};
