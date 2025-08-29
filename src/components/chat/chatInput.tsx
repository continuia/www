import { useState, useRef, useCallback } from "react";
import { TextField, IconButton, Box, CircularProgress, Chip, Avatar, Menu, MenuItem, Typography, Divider, Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { Send, AttachFile, Image, PictureAsPdf, Close, Delete, CameraAlt, Add, PhotoLibrary, PhotoCamera, FlipCameraAndroid } from "@mui/icons-material";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  previewUrl?: string;
}

interface ChatInputProps {
  onSendMessage: (message: string, files?: UploadedFile[]) => void;
  isLoading: boolean;
  disabled?: boolean;
  agent: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ agent, onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [filesMenuAnchor, setFilesMenuAnchor] = useState<null | HTMLElement>(null);
  const [attachMenuAnchor, setAttachMenuAnchor] = useState<null | HTMLElement>(null);

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // All existing functions remain the same...
  const uploadFile = async (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockFile: UploadedFile = {
          id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type,
          size: file.size,
          url: `https://mock-api.example.com/files/${Date.now()}/${file.name}`,
          previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        };
        resolve(mockFile);
      }, 1000);
    });
  };

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check permissions.");
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const openCamera = async () => {
    setAttachMenuAnchor(null);
    setIsCameraOpen(true);
    setCapturedImage(null);
    await startCamera();
  };

  const closeCamera = () => {
    stopCamera();
    setIsCameraOpen(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  const switchCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);

    if (stream) {
      stopCamera();
      setTimeout(async () => {
        await startCamera();
      }, 100);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const useCapturedPhoto = async () => {
    if (capturedImage) {
      setUploading(true);
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `camera-capture-${timestamp}.jpg`;
        const file = dataURLtoFile(capturedImage, fileName);

        const uploadedFile = await uploadFile(file);
        setUploadedFiles((prev) => [...prev, uploadedFile]);

        closeCamera();
      } catch (error) {
        console.error("Failed to process captured image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const retakePhoto = async () => {
    setCapturedImage(null);
    await startCamera();
  };

  const deleteFile = async (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Deleted file with ID: ${fileId}`);
        resolve();
      }, 500);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    setAttachMenuAnchor(null);

    try {
      const uploadPromises = Array.from(files).map((file) => uploadFile(file));
      const newUploadedFiles = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      setUploadedFiles((prev) => {
        const fileToRemove = prev.find((f) => f.id === fileId);
        if (fileToRemove?.previewUrl) {
          URL.revokeObjectURL(fileToRemove.previewUrl);
        }
        const newFiles = prev.filter((f) => f.id !== fileId);

        // Fix #3: Auto-close files menu when 3 or fewer files remain
        if (newFiles.length <= 3) {
          setFilesMenuAnchor(null);
        }

        return newFiles;
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || uploadedFiles.length > 0) && !isLoading && !uploading) {
      onSendMessage(message.trim(), uploadedFiles.length > 0 ? uploadedFiles : undefined);
      setMessage("");
      setUploadedFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Image fontSize="small" />;
    if (fileType === "application/pdf") return <PictureAsPdf fontSize="small" />;
    return <AttachFile fontSize="small" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const truncateFileName = (name: string, maxLength: number = 12) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const nameWithoutExt = name.substring(0, name.lastIndexOf("."));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4);
    return `${truncatedName}...${extension}`;
  };

  return (
    <Box
      sx={{
        // Mobile-first responsive design
        padding: {
          xs: "var(--space-2) var(--space-3)", // Mobile: 8px 12px
          sm: "var(--space-3) var(--space-4)", // Tablet: 12px 16px
          lg: "var(--space-3) var(--space-8)", // Large desktop: 20px 32px
        },
        backgroundColor: "var(--bg-primary)",
        borderTop: {
          xs: "0.5px solid var(--border-light)", // Thinner on mobile
          sm: "1px solid var(--border-light)",
        },
        flexShrink: 0,
        width: "100%",
        maxWidth: {
          xs: "100%", // Mobile: full width
        },
        margin: "0 auto",
        // Mobile-specific adjustments
        paddingBottom: {
          xs: "calc(var(--space-2) + env(safe-area-inset-bottom))", // iOS safe area
          sm: "var(--space-3)",
        },
        position: { xs: "sticky", sm: "relative" },
        bottom: { xs: 0, sm: "auto" },
        zIndex: { xs: "var(--z-50)", sm: "auto" },
      }}
    >
      {/* Responsive file attachments preview */}
      {uploadedFiles.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: "var(--space-1)", // Mobile: 4px
              sm: "var(--space-2)", // Tablet: 8px
              md: "var(--space-2)", // Desktop: 8px
            },
            marginBottom: {
              xs: "var(--space-2)", // Mobile: 8px
              sm: "var(--space-3)", // Tablet+: 12px
            },
            flexWrap: "wrap",
            padding: {
              xs: "var(--space-2) var(--space-3)", // Mobile: 8px 12px
              sm: "var(--space-3) var(--space-4)", // Tablet+: 12px 16px
            },
            backgroundColor: "var(--bg-secondary)",
            borderRadius: {
              xs: "var(--radius-lg)", // Mobile: 8px
              sm: "var(--radius-xl)", // Tablet+: 12px
            },
            border: "1px solid var(--border-light)",
            maxHeight: { xs: "80px", sm: "none" },
            overflowY: { xs: "auto", sm: "visible" },
          }}
        >
          {/* Show different number of files based on screen size */}
          {uploadedFiles.slice(0, 3).map((file) => (
            <Chip
              key={file.id}
              avatar={
                file.previewUrl ? (
                  <Avatar
                    src={file.previewUrl}
                    sx={{
                      width: { xs: 16, sm: 18, md: 20 },
                      height: { xs: 16, sm: 18, md: 20 },
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: { xs: 16, sm: 18, md: 20 },
                      height: { xs: 16, sm: 18, md: 20 },
                      backgroundColor: "var(--primary-100)",
                    }}
                  >
                    {getFileIcon(file.type)}
                  </Avatar>
                )
              }
              label={truncateFileName(file.name, { xs: 6, sm: 8, md: 10, lg: 12 }.md || 10)}
              onDelete={() => handleRemoveFile(file.id)}
              deleteIcon={<Close sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" } }} />}
              size="small"
              sx={{
                height: { xs: "20px", sm: "24px", md: "28px" },
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-light)",
                fontSize: { xs: "var(--text-xxs)", sm: "var(--text-xs)", md: "var(--text-sm)" },
                fontWeight: 500,
                transition: "var(--transition-fast)",
                "&:hover": {
                  backgroundColor: "var(--bg-tertiary)",
                  transform: "scale(1.02)",
                },
                "& .MuiChip-label": {
                  paddingX: { xs: "var(--space-1)", sm: "var(--space-2)" },
                },
                "& .MuiChip-avatar": {
                  marginLeft: "var(--space-px)",
                  marginRight: { xs: "-var(--space-1)", sm: "0" },
                },
                "& .MuiChip-deleteIcon": {
                  marginRight: "var(--space-px)",
                  "&:hover": {
                    color: "var(--error)",
                  },
                },
              }}
            />
          ))}

          {/* More files indicator - Only show if more than 3 files */}
          {uploadedFiles.length > 3 && (
            <Button
              size="small"
              onClick={(e) => setFilesMenuAnchor(e.currentTarget)}
              sx={{
                minWidth: "auto",
                height: { xs: "20px", sm: "24px", md: "28px" },
                padding: { xs: "0 var(--space-2)", sm: "0 var(--space-3)" },
                fontSize: { xs: "var(--text-xxs)", sm: "var(--text-xs)", md: "var(--text-sm)" },
                backgroundColor: "var(--primary-100)",
                color: "var(--primary-700)",
                borderRadius: { xs: "var(--radius-lg)", sm: "var(--radius-xl)" },
                fontWeight: 600,
                transition: "var(--transition-fast)",
                "&:hover": {
                  backgroundColor: "var(--primary-200)",
                  transform: "scale(1.05)",
                },
              }}
            >
              +{uploadedFiles.length - 3}
            </Button>
          )}
        </Box>
      )}

      {/* Fix #2: Improved responsive input container with proper alignment */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center", // Fix #2: Center align items
          gap: {
            xs: "var(--space-1)", // Mobile: 4px - tighter
            sm: "var(--space-2)", // Tablet: 8px
            md: "var(--space-3)", // Desktop: 12px - more space
          },
          backgroundColor: "var(--bg-secondary)",
          borderRadius: {
            xs: "var(--radius-2xl)", // Mobile: 16px
          },
          border: {
            xs: "1px solid var(--border-light)", // Mobile: thinner border
            sm: "2px solid var(--border-light)", // Desktop: thicker border
          },
          padding: {
            xs: "var(--space-1)", // Mobile: 4px
          },
          minHeight: {
            xs: "44px", // Mobile: minimum touch target
            sm: "48px", // Tablet+: larger
          },
          transition: "all var(--transition-fast)",
          "&:focus-within": {
            borderColor: "var(--primary-500)",
            backgroundColor: "var(--bg-primary)",
            boxShadow: {
              xs: "0 0 0 2px var(--primary-100)", // Mobile: smaller shadow
              sm: "0 0 0 4px var(--primary-100)", // Desktop: larger shadow
            },
          },
        }}
      >
        {/* Fix #1: Attachment button with proper CircularProgress alignment */}
        <IconButton
          onClick={(e) => setAttachMenuAnchor(e.currentTarget)}
          disabled={isLoading || uploading}
          sx={{
            width: { xs: 32, sm: 36, md: 40 },
            height: { xs: 32, sm: 36, md: 40 },
            margin: { xs: "var(--space-1)", sm: "var(--space-2)" },
            color: "var(--text-tertiary)",
            transition: "var(--transition-fast)",
            display: "flex", // Fix #1: Ensure flex display
            alignItems: "center", // Fix #1: Center align
            justifyContent: "center", // Fix #1: Center align
            "&:hover": {
              backgroundColor: "var(--primary-50)",
              color: "var(--primary-600)",
              transform: { xs: "none", sm: "scale(1.05)" }, // No transform on mobile
            },
            "&:disabled": {
              opacity: 0.5,
              transform: "none",
            },
          }}
        >
          {uploading ? (
            <CircularProgress
              size={20}
              sx={{
                color: "var(--primary-600)",
                display: "block",
              }}
            />
          ) : (
            <Add sx={{ fontSize: { xs: "16px", sm: "18px", md: "20px" } }} />
          )}
        </IconButton>

        {/* Fix #2: Responsive text input with proper flex properties */}
        <TextField
          multiline
          fullWidth
          disabled={isLoading || uploading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? `Connecting to ${agent}...` : uploading ? "Uploading files..." : "Type your message..."}
          variant="standard"
          sx={{
            flex: 1, // Fix #2: Take available space
            display: "flex", // Fix #2: Flex display
            alignItems: "center", // Fix #2: Center align
          }}
          slotProps={{
            input: {
              disableUnderline: true,
              sx: {
                fontSize: {
                  xs: "var(--text-sm)", // Mobile: 14px
                  sm: "var(--text-base)", // Tablet+: 16px
                },
                lineHeight: "var(--leading-normal)",
                padding: {
                  xs: "var(--space-2) var(--space-3)", // Mobile: 8px 12px
                  sm: "var(--space-3) var(--space-4)", // Tablet+: 12px 16px
                },
                minHeight: { xs: "20px", sm: "24px" },
                display: "flex", // Fix #2: Flex display
                alignItems: "center", // Fix #2: Center align content
                "& .MuiInputBase-input": {
                  padding: 0,
                  "&::placeholder": {
                    color: "var(--text-muted)",
                    opacity: 0.8,
                  },
                },
              },
            },
          }}
        />

        {/* Fix #1: Send button with proper CircularProgress alignment */}
        <IconButton
          type="submit"
          disabled={(!message.trim() && uploadedFiles.length === 0) || isLoading || uploading}
          sx={{
            width: { xs: 32, sm: 36, md: 40 },
            height: { xs: 32, sm: 36, md: 40 },
            margin: { xs: "var(--space-1)", sm: "var(--space-2)" },
            backgroundColor: "var(--primary-600)",
            color: "var(--text-inverse)",
            boxShadow: { xs: "var(--shadow-sm)", sm: "var(--shadow-md)" },
            transition: "var(--transition-fast)",
            display: "flex", // Fix #1: Ensure flex display
            alignItems: "center", // Fix #1: Center align
            justifyContent: "center", // Fix #1: Center align
            "&:hover": {
              backgroundColor: "var(--primary-700)",
              boxShadow: { xs: "var(--shadow-md)", sm: "var(--shadow-lg)" },
              transform: { xs: "none", sm: "scale(1.05)" }, // No transform on mobile
            },
            "&:disabled": {
              backgroundColor: "var(--neutral-300)",
              color: "var(--neutral-500)",
              boxShadow: "none",
              transform: "none",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{
                color: "var(--text-inverse)",
                display: "block",
              }}
            />
          ) : (
            <Send sx={{ fontSize: { xs: "14px", sm: "16px", md: "18px" } }} />
          )}
        </IconButton>
      </Box>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" multiple accept="image/*,application/pdf" onChange={handleFileSelect} style={{ display: "none" }} />

      {/* Full-screen Camera Dialog */}
      <Dialog
        open={isCameraOpen}
        onClose={closeCamera}
        maxWidth={false} // Remove maxWidth constraint
        fullWidth
        fullScreen // Make it full screen
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "var(--bg-primary)",
            borderRadius: 0, // Remove border radius for full screen
            overflow: "hidden",
            margin: 0, // Remove all margins
            maxHeight: "100vh", // Full viewport height
            maxWidth: "100vw", // Full viewport width
            height: "100vh",
            width: "100vw",
          },
        }}
      >
        <DialogContent sx={{ padding: 0, position: "relative", height: "100vh" }}>
          {!capturedImage ? (
            <Box
              sx={{
                position: "relative",
                width: "100vw", // Full viewport width
                height: "100vh", // Full viewport height
                display: "flex",
                flexDirection: "column",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // This will cover the entire area
                  backgroundColor: "#000",
                  flex: 1, // Take all available space
                }}
              />

              {/* Full-screen camera controls */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  padding: { xs: "var(--space-6)", sm: "var(--space-8)" }, // Increased padding
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: { xs: "120px", sm: "140px" }, // Ensure minimum touch area
                }}
              >
                <IconButton
                  onClick={closeCamera}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    width: { xs: 48, sm: 56 }, // Larger for easier touch
                    height: { xs: 48, sm: 56 },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <Close sx={{ fontSize: { xs: "24px", sm: "28px" } }} />
                </IconButton>

                <IconButton
                  onClick={capturePhoto}
                  sx={{
                    backgroundColor: "white",
                    color: "var(--primary-600)",
                    width: { xs: 72, sm: 80 }, // Larger capture button
                    height: { xs: 72, sm: 80 },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.9)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <PhotoCamera sx={{ fontSize: { xs: "2rem", sm: "2.2rem" } }} />
                </IconButton>

                <IconButton
                  onClick={switchCamera}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <FlipCameraAndroid sx={{ fontSize: { xs: "24px", sm: "28px" } }} />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
              }}
            >
              <img
                src={capturedImage}
                alt="Captured"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // Maintain aspect ratio while fitting
                  display: "block",
                }}
              />
            </Box>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </DialogContent>

        {capturedImage && (
          <DialogActions
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: { xs: "var(--space-4)", sm: "var(--space-6)" },
              gap: "var(--space-3)",
              flexDirection: { xs: "column", sm: "row" },
              backgroundColor: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(10px)",
              "& > button": {
                width: { xs: "100%", sm: "auto" },
              },
            }}
          >
            <Button
              onClick={retakePhoto}
              variant="outlined"
              startIcon={<PhotoCamera />}
              disabled={uploading}
              sx={{
                borderRadius: "var(--radius-xl)",
                fontSize: { xs: "var(--text-base)", sm: "var(--text-lg)" },
                padding: { xs: "var(--space-4) var(--space-6)", sm: "var(--space-3) var(--space-6)" },
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Retake
            </Button>
            <Button
              onClick={useCapturedPhoto}
              variant="contained"
              startIcon={uploading ? <CircularProgress size={16} /> : <Send />}
              disabled={uploading}
              sx={{
                backgroundColor: "var(--primary-600)",
                borderRadius: "var(--radius-xl)",
                fontSize: { xs: "var(--text-base)", sm: "var(--text-lg)" },
                padding: { xs: "var(--space-4) var(--space-6)", sm: "var(--space-3) var(--space-6)" },
                "&:hover": {
                  backgroundColor: "var(--primary-700)",
                },
              }}
            >
              {uploading ? "Processing..." : "Use Photo"}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Responsive Attachment Menu */}
      <Menu
        anchorEl={attachMenuAnchor}
        open={Boolean(attachMenuAnchor)}
        onClose={() => setAttachMenuAnchor(null)}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              minWidth: { xs: 160, sm: 200 },
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-xl)",
              boxShadow: { xs: "var(--shadow-lg)", sm: "var(--shadow-xl)" },
              overflow: "hidden",
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <MenuItem
          onClick={() => {
            fileInputRef.current?.click();
          }}
          sx={{
            padding: { xs: "var(--space-3)", sm: "var(--space-4)" },
            gap: { xs: "var(--space-2)", sm: "var(--space-3)" },
            "&:hover": {
              backgroundColor: "var(--primary-50)",
            },
          }}
        >
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--primary-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhotoLibrary sx={{ fontSize: { xs: "14px", sm: "16px" }, color: "var(--primary-600)" }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: { xs: "var(--text-sm)", sm: "var(--text-base)" }, fontWeight: 500 }}>Upload Files</Typography>
            <Typography sx={{ fontSize: { xs: "var(--text-xs)", sm: "var(--text-sm)" }, color: "var(--text-muted)" }}>Images & documents</Typography>
          </Box>
        </MenuItem>

        <MenuItem
          onClick={openCamera}
          sx={{
            padding: { xs: "var(--space-3)", sm: "var(--space-4)" },
            gap: { xs: "var(--space-2)", sm: "var(--space-3)" },
            "&:hover": {
              backgroundColor: "var(--primary-50)",
            },
          }}
        >
          <Box
            sx={{
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 },
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--primary-100)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CameraAlt sx={{ fontSize: { xs: "14px", sm: "16px" }, color: "var(--primary-600)" }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: { xs: "var(--text-sm)", sm: "var(--text-base)" }, fontWeight: 500 }}>Take Photo</Typography>
            <Typography sx={{ fontSize: { xs: "var(--text-xs)", sm: "var(--text-sm)" }, color: "var(--text-muted)" }}>Camera capture</Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* Responsive Files Menu */}
      <Menu
        anchorEl={filesMenuAnchor}
        open={Boolean(filesMenuAnchor)}
        onClose={() => setFilesMenuAnchor(null)}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              maxWidth: { xs: 280, sm: 320, md: 360 },
              maxHeight: { xs: 240, sm: 280 },
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-xl)",
              boxShadow: { xs: "var(--shadow-lg)", sm: "var(--shadow-xl)" },
            },
          },
        }}
      >
        <Box sx={{ padding: { xs: "var(--space-3)", sm: "var(--space-4)" } }}>
          <Typography
            sx={{
              fontSize: { xs: "var(--text-sm)", sm: "var(--text-base)" },
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            Attached Files ({uploadedFiles.length})
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ maxHeight: { xs: 160, sm: 200 }, overflow: "auto" }}>
          {uploadedFiles.map((file) => (
            <MenuItem
              key={file.id}
              sx={{
                padding: { xs: "var(--space-2) var(--space-3)", sm: "var(--space-3) var(--space-4)" },
                gap: { xs: "var(--space-2)", sm: "var(--space-3)" },
                minHeight: "auto",
              }}
            >
              {file.previewUrl ? (
                <Avatar src={file.previewUrl} sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }} />
              ) : (
                <Avatar
                  sx={{
                    width: { xs: 20, sm: 24 },
                    height: { xs: 20, sm: 24 },
                    backgroundColor: "var(--primary-100)",
                  }}
                >
                  {getFileIcon(file.type)}
                </Avatar>
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "var(--text-xs)", sm: "var(--text-sm)" },
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {truncateFileName(file.name, { xs: 15, sm: 20 }.sm || 20)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "var(--text-xxs)", sm: "var(--text-xs)" },
                    color: "var(--text-muted)",
                  }}
                >
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(file.id);
                }}
                sx={{
                  width: { xs: 18, sm: 20 },
                  height: { xs: 18, sm: 20 },
                  color: "var(--error)",
                }}
              >
                <Delete sx={{ fontSize: { xs: "12px", sm: "14px" } }} />
              </IconButton>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default ChatInput;
