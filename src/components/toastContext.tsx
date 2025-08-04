// ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";
export type ToastSeverity = "success" | "error" | "warning" | "info";
export interface ToastMessage {
  message: string;
  severity: ToastSeverity;
  key: number;
}

interface ToastContextType {
  addToast: (message: string, severity: ToastSeverity) => void;
}

//   <button onClick={() => addToast("Action succeeded!", "success")}>Show Success</button>
//   <button onClick={() => addToast("Something went wrong.", "error")}>Show Error</button>
//   <button onClick={() => addToast("Proceed with caution.", "warning")}>Show Warning</button>

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [snackPack, setSnackPack] = useState<ToastMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<ToastMessage | undefined>(undefined);

  const addToast = useCallback((message: string, severity: ToastSeverity) => {
    setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
  }, []);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo(snackPack[0]);
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Snackbar
        key={messageInfo?.key}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        slotProps={{
          transition: { onExited: handleExited },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={messageInfo?.severity} variant="filled" sx={{ width: "100%" }}>
          {messageInfo?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
