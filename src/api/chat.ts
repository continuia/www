import { DateTime } from "luxon";
import axiosInstance from './axiosConfig';

export const fetchMessagesFromAPI = async (agentName: string) => {
  try {
    const url = `/agents/${agentName}/messages`;
    const response = await axiosInstance.get(url );
    return response.data.messages.map((msg: any) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role === "agent" ? "assistant" : "user",
      timestamp: DateTime.fromISO(msg.timestamp, { zone: "utc" }).toLocal().toISO(),
    }));
  } catch (error: any) {
    throw error.response;
  }
};
