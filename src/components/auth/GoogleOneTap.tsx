import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import axiosInstance from "../../api/axiosConfig";
import { useToast } from "../toastContext";

declare global {
  interface Window {
    google: any;
    handleCredentialResponse: (response: any) => void;
  }
}

const GoogleOneTap = () => {
  const loginWithToken = useAuthStore((s) => s.loginWithToken);
  const isInitialized = useRef(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  const { addToast } = useToast();

  useEffect(() => {
    if (isInitialized.current || !GOOGLE_CLIENT_ID) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => initializeGoogleOneTap();
    document.head.appendChild(script);

    isInitialized.current = true;

    return () => {
      // optional: clean up if needed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GOOGLE_CLIENT_ID]);

  const initializeGoogleOneTap = () => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    window.handleCredentialResponse = async (response: any) => {
      try {
        const result = await axiosInstance.post("/api/social-auth/google-one-tap", {
          credential: response.credential,
          clientId: GOOGLE_CLIENT_ID,
        });

        if (result.data?.user && result.data?.token) {
          loginWithToken(result.data.token, result.data.user);
        } else {
          throw new Error("Invalid Google auth response");
        }
      } catch (error: any) {
        addToast(error?.response?.data?.message || "Google authentication failed", "error");
      }
    };

    // Initialize the GSI client
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: window.handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Render a visible Google button inside our container
    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with", // shows "Continue with Google"
        logo_alignment: "left",
        width: "100%",
      });
    }

    // Also trigger the One Tap prompt (will show as a small top-right prompt if eligible)
    window.google.accounts.id.prompt();
  };

  // Container for the rendered button
  return <div ref={buttonRef} />;
};

export default GoogleOneTap;
