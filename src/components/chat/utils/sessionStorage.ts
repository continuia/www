// Modified sessionStorage.ts - only stores session metadata, no messages
interface StoredSessionData {
  sessionId: string;
  agentId: string;
  agentName: string;
  timestamp: number;
  lastActivity: number;
}

// Helper to get a unique key for each agent
const getStorageKey = (agentName: string) => `chatSession_${agentName}`;

const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
const ACTIVITY_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

export const storeSession = (agentName: string, sessionData: any) => {
  const key = getStorageKey(agentName);
  const dataToStore: StoredSessionData = {
    sessionId: sessionData.sessionId,
    agentId: sessionData.agentId,
    agentName: agentName,
    timestamp: Date.now(),
    lastActivity: Date.now(),
    // No messages stored here
  };
  sessionStorage.setItem(key, JSON.stringify(dataToStore));
};

export const getStoredSession = (agentName: string): StoredSessionData | null => {
  const key = getStorageKey(agentName);
  try {
    const stored = sessionStorage.getItem(key);
    if (!stored) return null;
    const sessionData = JSON.parse(stored);
    return sessionData;
  } catch (error) {
    console.error("Error retrieving stored session:", error);
    return null;
  }
};

export const updateLastActivity = (agentName: string) => {
  const stored = getStoredSession(agentName);
  if (stored) {
    stored.lastActivity = Date.now();
    const key = getStorageKey(agentName);
    sessionStorage.setItem(key, JSON.stringify(stored));
  }
};

export const isSessionValid = (session: StoredSessionData): boolean => {
  const timeSinceCreation = Date.now() - session.timestamp;
  const timeSinceLastActivity = Date.now() - session.lastActivity;
  return timeSinceCreation < SESSION_EXPIRY && timeSinceLastActivity < ACTIVITY_TIMEOUT;
};

export const clearStoredSession = (agentName: string) => {
  const key = getStorageKey(agentName);
  sessionStorage.removeItem(key);
};
