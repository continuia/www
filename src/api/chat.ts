import { DateTime } from "luxon";
import axiosInstance from './axiosConfig';

export const fetchMessagesFromAPI = async (agentName: string, sessionId: string) => {
  try {
    const url = `/agents/${agentName}/messages?session_id=${sessionId}&all=true&batch=200&include_welcome=true&bare=true`;
    const response = await axiosInstance.get(url);
    return response.data.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role === "agent" ? "assistant" : "user",
      timestamp: DateTime.fromISO(msg.timestamp, { zone: "utc" }).toLocal().toISO(),
    }));
  } catch (error: any) {
    throw error.response;
  }
};
