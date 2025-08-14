// chat/utils/sessionStorage.ts
interface StoredSessionData {
    sessionId: string;
    agentId: string;
    agentName: string;
    timestamp: number;
    lastActivity: number;
    messages?: any[];
}

const STORAGE_KEY = 'chatSession';
const SESSION_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
const ACTIVITY_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

// Utility function to ensure timestamp is a proper Date object
const ensureDate = (timestamp: any): Date => {
    if (timestamp instanceof Date) {
        return timestamp;
    }

    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        const date = new Date(timestamp);
        return isNaN(date.getTime()) ? new Date() : date;
    }

    return new Date(); // Fallback to current date
};

export const storeSession = (sessionData: any, messages: any[] = []) => {
    const dataToStore: StoredSessionData = {
        sessionId: sessionData.sessionId,
        agentId: sessionData.agentId,
        agentName: sessionData.agentName,
        timestamp: Date.now(),
        lastActivity: Date.now(),
        messages: messages,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
};

export const getStoredSession = (): StoredSessionData | null => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const sessionData = JSON.parse(stored);

        // Convert timestamp strings back to Date objects for messages
        if (sessionData.messages && Array.isArray(sessionData.messages)) {
            sessionData.messages = sessionData.messages.map((message: any) => ({
                ...message,
                timestamp: ensureDate(message.timestamp) // Convert string/number to Date
            }));
        }

        return sessionData;
    } catch (error) {
        console.error('Error retrieving stored session:', error);
        return null;
    }
};

export const updateLastActivity = () => {
    const stored = getStoredSession();
    if (stored) {
        stored.lastActivity = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }
};

export const isSessionValid = (session: StoredSessionData): boolean => {
    const timeSinceCreation = Date.now() - session.timestamp;
    const timeSinceLastActivity = Date.now() - session.lastActivity;

    return timeSinceCreation < SESSION_EXPIRY &&
        timeSinceLastActivity < ACTIVITY_TIMEOUT;
};

export const clearStoredSession = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const storeMessages = (messages: any[]) => {
    const stored = getStoredSession();
    if (stored) {
        // Ensure messages have proper Date objects before storing
        const messagesWithDates = messages.map(message => ({
            ...message,
            timestamp: ensureDate(message.timestamp)
        }));

        stored.messages = messagesWithDates;
        stored.lastActivity = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }
};
